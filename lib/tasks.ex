defmodule Tasks do
  use Application

  def main(args) do
    args |> parse_args |> setup
    |> process_requests |> print_results
  end

  defp parse_args(args) do
    {options, _, _} = OptionParser.parse(args, [
      switches: [url: :string, mul: :integer, loop: :integer],
      aliases: [u: :url, m: :mul, l: :loop]
    ])
    parse_options(options)
  end

  defp parse_options([url: url, mul: mul, loop: loop]), do: {url, mul, loop}
  defp parse_options([url: url, mul: mul]), do: {url, mul, 10} # loop defaults to 10
  defp parse_options(_), do: nil

  defp setup(nil), do: IO.puts "Please specify both url and multiplier\ne.g: ./tasks --url=http://example.com --mul=10"

  # larger loop_num amount means larger consistency
  #################################################
  ##          Insert !!non-caching!! url         ##
  #################################################
  defp setup({url, mul, loop_num}) when loop_num > 0 and mul <= 1000 do
    IO.puts "no. urls: #{mul}\nno. loops: #{Integer.to_string(loop_num)}\nprocessing requests..."

    # https://github.com/edgurgel/httpoison/issues/73
    # default is 50
    # https://github.com/benoitc/hackney/blob/d6676c6c447d933796c53c4aa4ce30cc084a5a47/src/hackney.app.src
    :ok = :hackney_pool.start_pool(:first_pool, [timeout: 15000, max_connections: 1000])
    HTTPoison.start
    # There's a small overhead for the first request which might skew the timing results
    HTTPoison.get(url)  # we ignore this, due to dns lookup?

    {List.duplicate(url, mul), loop_num}
  end

  defp process_requests({urls, loop_num}) do
    {process_sync_requests(urls, loop_num), process_async_requests(urls, loop_num)}
  end

  defp process_sync_requests(urls, loop_num) do
    {total_sync_micros, has_status_200} = :timer.tc fn ->
      Enum.reduce(1..loop_num, false, fn(_x, acc) ->
        urls
          |> Enum.map(fn(url) -> HTTPoison.get(url) end)
          |> Enum.map(fn({status, result}) ->
            if (status == :ok) do
              result.status_code
            else
              result.reason
            end
          end)
          |> Enum.reduce(false, fn(x, acc) -> x == 200 || acc end)
          |> Kernel.||(acc)
      end)
    end
    check_status_code(:sync, has_status_200)
    each_sync_micros = total_sync_micros/loop_num
    "sync took an avg #{Float.round(each_sync_micros/1000000, 4)} seconds"
  end

  defp process_async_requests(urls, loop_num) do
    {total_async_micros, has_status_200} = :timer.tc fn ->
      Enum.reduce(1..loop_num, false, fn(_x, acc) ->
        urls
          |> Enum.map(fn(url) -> Task.async(fn -> HTTPoison.get(url) end) end)
          |> Enum.map(&Task.await(&1, 30000))
          |> Enum.map(fn({status, result}) ->
            if (status == :ok) do
              result.status_code
            else
              result.reason
            end
          end)
          |> Enum.reduce(false, fn(x, acc) -> x == 200 || acc end)
          |> Kernel.||(acc)
      end)
    end
    check_status_code(:async ,has_status_200)
    each_async_micros = total_async_micros/loop_num
    "async took an avg #{Float.round(each_async_micros/1000000, 4)} seconds"
  end

  defp check_status_code(type, false) do
    IO.puts "!Warning: #{Atom.to_string(type)} request, cannot find at least 1 HTTP status 200"
  end
  defp check_status_code(_, true) do end

  defp print_results({sync_print, async_print}) do
    IO.puts sync_print
    IO.puts async_print
  end

end

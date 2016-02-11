defmodule Tasks do
  def main(_args) do

    # https://github.com/edgurgel/httpoison/issues/73
    # default is 50
    # https://github.com/benoitc/hackney/blob/d6676c6c447d933796c53c4aa4ce30cc084a5a47/src/hackney.app.src
    :ok = :hackney_pool.start_pool(:first_pool, [timeout: 15000, max_connections: 1000])
    HTTPoison.start

    loop_num = 10 # larger amount means larger consistency

    ####################################
    ##   Insert !!non-caching!! urls  ##
    ####################################
    # e.g: urls = ["https://whatever", "https://whatever", "https://whatever"]
    # Note: make sure that this list does not go beyond 1000 in size.
    # If it does, increase hackney_pool, max_connections!
    urls = [
    ]

    IO.puts "number of urls: #{Enum.count(urls)}"

    # There's a small overhead for the first request which might skew the timing results
    if Enum.count(urls) > 0, do: HTTPoison.get(List.first(urls))  # we ignore this, due to dns lookup?

    {total_micros, _} = :timer.tc fn ->
      Enum.each(1..loop_num, fn _x ->
        urls
          |> Enum.map(fn(url) -> HTTPoison.get(url) end)
          # Uncomment below to check http status
          # |> Enum.map(fn({status, result}) ->
          #   if (status == :ok) do
          #     Integer.to_string(result.status_code)
          #   else
          #     result.reason
          #   end
          # end)
          # |> IO.inspect
      end)
    end
    each_micros = total_micros/loop_num
    IO.puts "sync took an avg #{Float.round(each_micros/1000000, 4)} seconds"

    {total_micros, _} = :timer.tc fn ->
      Enum.each(1..loop_num, fn _x ->
        urls
          |> Enum.map(fn(url) -> Task.async(fn -> HTTPoison.get(url) end) end)
          |> Enum.map(&Task.await(&1, 30000))
          # Uncomment below to check http status
          # |> Enum.map(fn({status, result}) ->
          #   if (status == :ok) do
          #     Integer.to_string(result.status_code)
          #   else
          #     result.reason
          #   end
          # end)
          # |> IO.inspect
      end)
    end
    each_micros = total_micros/loop_num
    IO.puts "async took an avg #{Float.round(each_micros/1000000, 4)} seconds"

  end
end

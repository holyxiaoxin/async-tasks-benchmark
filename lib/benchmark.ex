defmodule Mix.Tasks.Benchmark do
  use Mix.Task

  def run(args) do
    Mix.Task.run "app.start", []

    f = File.open!("benchmark_results/test.csv", [:write])
    IO.write(f, CSVLixir.write_row(["mul", "loop", "sync", "async"]))
    File.close(f)

    url = parse_args(args)
    muls = [50, 100, 150, 200, 250, 300]
    loop_nums = [1, 10, 50]

    Enum.map(loop_nums, fn(loop_num) ->
      Enum.map(muls, fn(mul) ->
        {sync_result, async_result} = Tasks.run_benchmark({url, mul, loop_num})
        IO.inspect {sync_result, async_result}

        f = File.open!("benchmark_results/test.csv", [:append])
        IO.write(f, CSVLixir.write_row([mul, loop_num, sync_result, async_result]))
        File.close(f)
      end)
      f = File.open!("benchmark_results/test.csv", [:append])
      IO.write(f, CSVLixir.write_row([]))
      File.close(f)
    end)
    # File.read!("test.csv") |> IO.inspect
  end

  defp parse_args(args) do
    {options, _, _} = OptionParser.parse(args, [
      strict: [url: :string],
      aliases: [u: :url]
    ])
    options[:url]
  end

end

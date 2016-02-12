# Tasks
Simple Benchmark script to test `Task.async` and `Task.await` in elixir.

## Installation (single benchmark)
  1. clone repo
  2. `mix deps.get`
  3. cd `lib`
  4. `mix escript.build && ./tasks -u http:<some non-caching>.url -m 10 -l 10`

### Options
- `-u`: url - provide a non-caching url which a reasonable pool size
- `-m`: multiplier - the length of urls, size of jobs
- `-l`: loop - how many times the same job is tests; results will be more accurate with higher loops

### Exceptions
- Depending on app server's pool size, results of `Task.async` might vary.
- If the url doesn't return status code 200, the results might not be accurate. Therefore a tiny warning is thrown.

<br>


## Batch Benchmark
  1. cd `lib`
  2. `mix benchmark -u http:<some non-caching>.url`
<br>

Load is set to:
```
muls = [50, 100, 150, 200, 250, 300]  
loop_nums = [1, 10, 50]
```

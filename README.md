# Tasks

Simple Benchmark script to test `Task.async` and `Task.await` in elixir.

## Installation

  1. clone repo
  2. `mix deps.get`
  3. cd `lib/tasks.ex` and add non-caching urls to the list of urls
  4. `mix escript.build && ./tasks -u http:<some non-caching>.url -m 10 -l 10`

### Options
- `-u`: url - provide a non-caching url which a reasonable pool size
- `-m`: multiplier - the length of urls, size of jobs
- `-l`: loop - how many times the same job is tests; results will be more accurate with higher loops

### Exceptions
- Depending on app server's pool size, results of `Task.async` might vary.
- If the url doesn't return status code 200, the results might not be accurate. Therefore a tiny warning is thrown.

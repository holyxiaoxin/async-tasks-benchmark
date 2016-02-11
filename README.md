# Tasks

Simple Benchmark script to test `Task.async` and `Task.await` in elixir.

## Installation

  1. clone repo
  2. `mix deps.get`
  3. cd `lib/tasks.ex` and add non-caching urls to the list of urls
  4. `mix escript.build && ./tasks`

### Options
- You can change `loop_num` to improve consistency.

### Exceptions
- Depending on app server's pool size, results of `Task.async` might vary.

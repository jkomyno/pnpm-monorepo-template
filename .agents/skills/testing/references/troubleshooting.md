# Test Troubleshooting

Open this reference for fake timers, hanging tests, state pollution, flaky behavior, or test-review decisions.

## Time And Async Work

Use fake timers for delays, retries, debouncing, and scheduling behavior. Install and restore them within the owning test or hooks, advance only the time required by the scenario, and await resulting asynchronous work.

Avoid arbitrary sleeps. A test that waits for wall-clock time is slower and still vulnerable to scheduler variance.

## Classify A Failing Test

| Keep and fix                                   | Delete or raise the test level                           |
| ---------------------------------------------- | -------------------------------------------------------- |
| Verifies public behavior or a domain invariant | Checks only internal function call arguments             |
| Caught a real regression                       | Duplicates behavior covered by a stronger test           |
| Asserts a stable contract                      | Breaks during routine refactors with no behavior change  |
| Covers a tricky edge case                      | Re-tests framework behavior rather than project behavior |

Update fixtures and assertions when product behavior changed intentionally. Remove an implementation-coupled test only when the behavior remains covered at an appropriate level.

## Common Issues

- Mock does not apply: check import timing and Vitest mock hoisting. Prefer constructing and injecting a dependency or spying on it directly.
- Module pollution: call `vi.resetModules()` in the isolated test and import after the reset.
- State pollution: reset in-memory stores, temporary directories, globals, environment variables, and fake timers in hooks.
- Hanging test: look for unresolved promises, open handles, unclosed servers, pending timers, or callbacks that never settle.
- Flaky ordering: remove shared mutable fixtures and make each test construct its own state.
- Unexpected integration traffic: verify the test project, environment, and boundary mock before weakening assertions.
- Snapshot churn: replace a broad snapshot with focused assertions when unrelated details change frequently.

---
name: testing
description: Vitest testing guide for this TypeScript monorepo. Use when writing or updating unit or integration tests, fixing failing or hanging tests, improving coverage, setting up spies or mocks, testing async behavior, reviewing test quality, or changing Vitest configuration and fixtures.
---

# Testing

## Core Posture

Follow root `AGENTS.md` for repository-wide test layout and verification. Inspect the owning package's scripts and `vitest.config.ts` before choosing a command, project, environment, or fixture pattern.

Start with the narrowest command that exercises the behavior, then broaden before handoff when the change affects shared code or public package contracts. Use the package's actual name and scripts:

```bash
pnpm --filter @scope/package test:unit
pnpm --filter @scope/package exec vitest run __tests__/unit/example.test.ts
```

## Test Shape

Use the existing layout before adding a new one.

| Kind           | Location                             | Purpose                                                                      |
| -------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| Unit           | `__tests__/unit/**/*.test.ts`        | Pure logic and simulated boundaries; no network or real clock                |
| Integration    | `__tests__/integration/**/*.test.ts` | Package interactions, real adapters, or explicitly expected external systems |
| Package config | `packages/*/vitest.config.ts`        | Package projects extending the shared root defaults                          |

Ship behavior changes with tests in the same change. Test through the public API when behavior crosses a package boundary; use lower-level tests only for isolated edge cases.

## Principles

1. Assert externally observable behavior: returned values, thrown errors, emitted messages, persisted state, or public type contracts.
2. Prefer integration-level assertions over tests that only verify internal call plumbing.
3. Mock controllable boundaries: clocks, random sources, network clients, persistence, process environment, browser globals, and external SDKs.
4. Avoid mocking internal modules merely to assert which helper was called.
5. Keep unit tests deterministic. Do not use live network, real-time sleeps, unseeded randomness, or process-wide state that leaks between tests.
6. Assert the complete scenario unconditionally. Do not hide assertions inside branches that may silently skip them.
7. Keep regression tests explicit and small. Use parameterized tests when several examples prove the same invariant.
8. Prefer stable values and focused assertions over broad snapshots. Review intentional snapshot changes as contract changes.
9. After repeated failed fixes, classify whether the test exposes a product bug, a stale assertion, an incorrect fixture, or implementation coupling before editing again.

## Reference Map

Open only the reference needed for the current task:

| File                                                  | Open when                                                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [`vitest-basics.md`](references/vitest-basics.md)     | Writing plain Vitest tests, hooks, spies, globals, async assertions, or module-isolation fixtures       |
| [`troubleshooting.md`](references/troubleshooting.md) | Handling fake timers, hanging tests, pollution, flaky tests, or deciding whether to keep a failing test |

## Handoff

Run the relevant broader package or repository checks before finishing behavioral, public API, or shared configuration changes. Use the full handoff command set from root `AGENTS.md` when the change warrants it.

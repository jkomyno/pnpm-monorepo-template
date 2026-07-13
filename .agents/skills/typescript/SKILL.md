---
name: typescript
description: Guide strict TypeScript work in this pnpm monorepo. Use when fixing typecheck, isolatedDeclarations, isolatedModules, or verbatimModuleSyntax errors; designing or reviewing exported APIs; changing package boundaries or project references; or handling unknown, any, assertions, type-only imports, and declaration emit. Do not use for routine edits that only follow nearby code.
---

# TypeScript

## Scope

Follow root `AGENTS.md` for repository-wide tooling, testing, and verification rules. Add this guidance for typecheck failures, public API design, unsafe boundary cleanup, declaration emit, and workspace package boundaries.

## Start With Evidence

- Read the owning package's `package.json`, applicable `tsconfig*.json` files, public entrypoint, and nearby code before changing a TypeScript pattern.
- Confirm whether the file belongs to production, tests, build configuration, or tooling; each may use a different root config.
- Reproduce type errors with the narrowest owning-package typecheck before changing code.
- Let oxfmt and oxlint decide formatting and import ordering.

## Types And Type Safety

- Let TypeScript infer local implementation details. Add explicit exported value and return types when `isolatedDeclarations` requires them or when they clarify the public contract.
- Prefer `unknown` for untrusted values, then narrow or decode before use. Avoid `any`; when compatibility requires it, confine it to the smallest boundary and convert it immediately.
- Prefer `Record<string, unknown>` to vague `object` types for generic records.
- Use `interface` for extensible object-shaped public inputs and service contracts. Use `type` for unions, intersections, mapped types, conditional types, and aliases.
- Model variants with discriminated unions instead of parallel booleans, loose strings, or meaningless optional values.
- Prefer `as const satisfies SomeShape` when a literal must retain narrow values while checking its shape.
- Replace broad assertions and non-null assertions with narrowing when practical. Keep unavoidable assertions beside the evidence that makes them safe.
- Prefer `@ts-expect-error` to `@ts-ignore`, add a short reason, and remove the directive when the underlying incompatibility disappears.

## Imports, Exports, And Packages

- Use `import type { ... }` for type-only imports under `verbatimModuleSyntax`.
- Prefer named exports for library code. Use default exports only where a configuration or framework convention benefits from them.
- Export public symbols from the package entrypoint and consume other workspace packages through their declared exports.
- Do not bypass a package's `exports` map with relative paths into its source or build directories.
- Update project references, package dependencies, and export maps together when a package boundary changes.
- Search for existing package-local or shared helpers before adding a duplicate guard, parser, normalizer, or utility type.

## Code Structure

- Keep functions small enough that inputs, outputs, and failure behavior remain obvious.
- Prefer option objects and destructuring when a call has several parameters or likely extension points.
- Name domain-significant constants instead of scattering magic strings or numbers.
- Keep environment, clock, random, network, filesystem, and process access behind explicit boundaries when deterministic tests need control.
- Pair public behavior changes with the [`testing` skill](../testing/SKILL.md).

## Verification

Run the narrowest package typecheck while iterating. Before handoff for code changes, use the full verification set in root `AGENTS.md`.

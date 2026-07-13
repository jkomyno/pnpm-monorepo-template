# Repository Guidance

`AGENTS.md` is the canonical repository-wide AI guidance file. `CLAUDE.md` is a symlink to this file so Claude Code and other agents read the same instructions without duplication.

## Guidance Hierarchy

Treat every `AGENTS.md` as a binding contract for its subtree. Before editing, read the guidance files from the repository root down to the target path. The closest file controls local details without weakening parent rules.

After meaningful changes, update the closest owning guidance when purpose, durable structure, contracts, workflows, verification, or generated artifacts change. Keep guidance concise and operational.

## Child Guidance Index

| Path                                                   | Scope                                                   |
| ------------------------------------------------------ | ------------------------------------------------------- |
| [`.agents/skills/AGENTS.md`](.agents/skills/AGENTS.md) | Repository-local skills, references, and agent metadata |

## Project Identity

This repository is a pragmatic TypeScript monorepo template built around pnpm workspaces, Turborepo, Vitest, tsdown, oxfmt, oxlint, Changesets, and mise. Preserve its value as a reusable starting point: examples should teach a pattern without assuming a specific product domain.

## Tooling Rules

- Treat `.mise.toml` as the source of truth for Node.js and pnpm versions. Keep the root `packageManager` version aligned with it.
- Use pnpm for dependency and workspace commands. Reuse existing root and package scripts before inventing ad hoc commands.
- Keep shared configuration at the repository root and package-specific configuration beside the owning package.
- Let oxfmt and oxlint enforce formatting and lint style.
- Do not edit generated output, dependency directories, or lockfile sections by hand.

## TypeScript Rules

- Follow the strict compiler options and project-reference structure already defined by the root `tsconfig*.json` files.
- Preserve package boundaries. Import through public workspace entrypoints instead of reaching into another package's internals.
- Design exported APIs deliberately and keep declaration emit valid under `isolatedDeclarations`, `isolatedModules`, and `verbatimModuleSyntax`.
- Use the repository-local [`typescript` skill](.agents/skills/typescript/SKILL.md) for typecheck failures, exported API design, unsafe boundaries, or non-trivial TypeScript changes.

## Testing Rules

- Put unit tests in `__tests__/unit` and integration tests in `__tests__/integration`.
- Keep unit tests deterministic and free of live network, real-time waits, and leaked process-wide state.
- Test behavior through public APIs when the contract crosses a package boundary.
- Use the repository-local [`testing` skill](.agents/skills/testing/SKILL.md) when adding, changing, debugging, or reviewing tests.

## Verification

Run the narrowest relevant check while iterating. Before handing off code or configuration changes, run:

```bash
pnpm lint:ci
pnpm typecheck
pnpm test
pnpm build
```

For documentation-only changes, `pnpm lint:ci` is sufficient unless the documentation describes executable commands or configuration that also needs validation.

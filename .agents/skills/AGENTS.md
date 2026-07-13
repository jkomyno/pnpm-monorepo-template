# Agent Skill Guidance

## Purpose

This subtree contains repository-local skills that teach agents how to work in monorepos created from this template without overloading the root guidance.

## Local Contracts

- Keep each `SKILL.md` focused. Move detailed examples or troubleshooting catalogs into first-level `references/` files.
- Keep trigger descriptions precise so unrelated work does not load a skill.
- Write instructions that remain useful after consumers replace the example package names and npm scope.
- Verify commands against the scripts and configuration that ship with this template.
- Keep `agents/openai.yaml` synchronized with its skill's name, purpose, and default prompt.

## Verification

Validate every changed skill with the skill validator, then run `pnpm lint:ci` for repository formatting and Markdown checks.

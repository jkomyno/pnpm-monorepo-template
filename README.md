# pnpm-monorepo-template

[![Github Actions](https://github.com/jkomyno/pnpm-monorepo-template/actions/workflows/ci.yaml/badge.svg?branch=main)](https://github.com/jkomyno/pnpm-monorepo-template/actions/workflows/ci.yaml)

> Pragmatic template for a `TypeScript` monorepo with [`pnpm`](https://pnpm.io), [`turborepo`](https://turborepo.org), and [`vitest`](https://vitest.dev/).

The development toolchain is pinned in [`.mise.toml`](./.mise.toml), with tool artifacts locked in [`mise.lock`](./mise.lock).

---

## Table of Contents

- [Getting Started](#getting-started)
- [What's Included](#whats-included)
- [Available Scripts](#available-scripts)
- [Publishing (OIDC)](#publishing-oidc)
- [Test Structure](#test-structure)
- [FAQ](#faq)
- [Author](#-author)
- [Show your support](#-show-your-support)
- [License](#-license)

## Getting Started

Use this repository as a template when you want a fresh `TypeScript` monorepo with `pnpm`, `turborepo`, `vitest`, `oxfmt`, `oxlint`, Changesets, and GitHub Actions already wired together.

There are two common ways to create your own repository from it.

### Create a Repository from GitHub

1. Open [`jkomyno/pnpm-monorepo-template`](https://github.com/jkomyno/pnpm-monorepo-template).
2. Click **Use this template**.
3. Choose **Create a new repository**.
4. Pick the owner, repository name, visibility, and whether you want to include all branches.
5. Click **Create repository**.
6. Clone your new repository:

```bash
git clone git@github.com:<your-github-user-or-org>/<your-new-repo>.git
cd <your-new-repo>
```

### Create a Repository with `gh`

If you prefer the GitHub CLI, create and clone the new repository in one command:

```bash
gh repo create <your-github-user-or-org>/<your-new-repo> \
  --template jkomyno/pnpm-monorepo-template \
  --private \
  --clone

cd <your-new-repo>
```

Use `--public` instead of `--private` if the repository should be public.

### Set Up the Project Locally

This template pins Node.js and pnpm in [`.mise.toml`](./.mise.toml). Install [mise](https://mise.jdx.dev/getting-started.html), then let it provision the repository toolchain:

```bash
mise trust
mise install
pnpm install
pnpm build
pnpm test
```

Use mise as the source of truth when changing tool versions, and run `mise lock` after an update to refresh the locked tool artifacts. The `packageManager` field in [`package.json`](./package.json) mirrors the pnpm pin for compatibility with package-manager-aware tooling.

After that, make the template yours:

1. Replace the `@jkomyno/*` package scope in the local `package.json` files with your own npm scope.
2. Update the `name`, `description`, `repository`, `author`, and package visibility fields in the root and package-level `package.json` files.
3. Update README badges, author details, trusted-publisher examples, and links so they point to your new GitHub repository.
4. Remove, rename, or replace the example packages in [`packages/`](packages/) once you know what your monorepo should contain.

At this point the repository is ready for normal development. Use `pnpm build`, `pnpm test`, `pnpm lint:ci`, and `pnpm changeset` as the main day-to-day commands.

## What's Included

- `pnpm` workspace, whose configuration is stored in [`pnpm-workspace.yaml`](./pnpm-workspace.yaml). Two example packages are included, [`common-utils`](packages/common-utils) and [`example`](packages/example), with the latter importing `common-utils` as a dependency. All local packages are decorated with a `@jkomyno/*` scope (you may want to substitute these instances in the `name` entries of any `package.json` with yours or your company's name).
- `tsdown` bundler, whose configuration is stored in [`tsdown.config.base.ts`](./tsdown.config.base.ts).
- `turborepo`, whose configuration is stored in [`turbo.json`](./turbo.json)
- centralized dependency versions through the `pnpm` catalog in [`pnpm-workspace.yaml`](./pnpm-workspace.yaml), plus install hardening with release-age gating and targeted transitive dependency overrides.
- the `vitest` test engine, whose shared configuration is stored in [`vitest.config.base.ts`](./vitest.config.base.ts). Workspace imports in tests resolve to TypeScript sources through the `@jkomyno/source` export condition (mirroring the `customConditions` tsconfig setting), so running tests never requires building dependency packages first.
- opinionated formatting and linting setups via [`oxfmt`](https://oxc.rs/docs/guide/usage/formatter.html) and [`oxlint`](https://oxc.rs/docs/guide/usage/linter.html), whose configurations are defined in the [`.oxfmtrc.jsonc`](./.oxfmtrc.jsonc) and [`.oxlintrc.jsonc`](./.oxlintrc.jsonc) files. [`Lefthook`](https://github.com/evilmartians/lefthook) runs the `lint-staged` checks before each commit.
- [**Changesets**](https://github.com/changesets/changesets) for versioning and changelogs; the **Release** workflow opens a "Version Packages" PR when changesets land on `main`, and publishes to npm when that PR is merged using [npm trusted publishing (OIDC)](https://docs.npmjs.com/trusted-publishers)—no long-lived tokens. See [Publishing (OIDC)](#publishing-oidc) below.
- [**pkg.pr.new**](https://pkg.pr.new) for continuous preview releases: each PR gets installable preview packages (install the [GitHub App](https://github.com/apps/pkg-pr-new) on the repo first).
- shared AI-agent guidance through [`AGENTS.md`](./AGENTS.md) and its [`CLAUDE.md`](./CLAUDE.md) symlink, plus repository-local TypeScript and testing skills under [`.agents/skills`](./.agents/skills).

## Available Scripts

- `pnpm install`: install the dependencies needed for each package.
- `pnpm build`: typecheck and transpile the local TypeScript packages to JavaScript.
- `pnpm build:watch`: transpile the local TypeScript packages to JavaScript, and watch for changes.
- `pnpm check:exports`: check that the `exports` field in the `package.json` files of each exported package is correctly set, using [`@arethetypeswrong/cli`](https://www.npmjs.com/package/@arethetypeswrong/cli).
- `pnpm typecheck`: run type checks for packages that define a `typecheck` script.
- `pnpm format:ci`: check that the code follows the `oxfmt` guidelines.
- `pnpm format`: check that the code follows the `oxfmt` guidelines, and override it to follow them if possible.
- `pnpm lint:ci`: check that the code follows the `oxfmt` and `oxlint` guidelines.
- `pnpm lint`: check that the code follows the `oxfmt` and `oxlint` guidelines, and override it to follow them if possible.
- `pnpm lint:fix`: same as `pnpm lint`; included as a clearer alias.
- `pnpm test:unit`: run unit tests.
- `pnpm test:integration`: run integration tests.
- `pnpm test`: run all tests.
- `pnpm bench`: run benchmarks for packages that define a `bench` script.
- `pnpm bench:watch`: run benchmarks in watch mode for packages that define `bench:watch`.
- `pnpm changeset`: add a new changeset (version bump + changelog entry).
- `pnpm version-packages`: apply changesets (bump versions, update changelogs, then `pnpm install`). Used by the Release workflow.

## Publishing (OIDC)

Releases use [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC), so you **do not** need an `NPM_TOKEN` secret. You configure npm to trust this repo's workflow once per package:

> Template note: the release workflow is scaffolded but disabled by default in [`release.yaml`](./.github/workflows/release.yaml). After you configure npm trusted publishing (OIDC), remove `if: false` and uncomment the Changesets step in that file.

1. **Publish the package manually once** (if it has never been published), so it exists on npm.
2. On [npmjs.com](https://www.npmjs.com), open the package → **Package settings** → **Trusted Publisher**.
3. Choose **GitHub Actions** and set:
   - **Organization or user**: your GitHub org or username (e.g. `jkomyno`)
   - **Repository**: this repo name (e.g. `pnpm-monorepo-template`)
   - **Workflow filename**: `release.yaml` (must match exactly, including extension)
4. Save. Future publishes from the **Release** workflow will use OIDC; no tokens required.

Repeat for each publishable package in the monorepo. Optional: under **Publishing access**, enable “Require two-factor authentication and disallow tokens” so only the trusted workflow can publish.

## Test Structure

We follow an opinionated convention for storing and running tests.
All tests should be written in the `__tests__` directory of a local package.
Moreover, unit tests should be placed in the `__tests__/unit` folder; similarly, integration tests should be placed in the `__tests__/integration` folder.
This allows for easily running groups of tests (for instance, you might want to run unit tests locally, while deferring integration tests - that will probably need access to external services like Docker containers - to the CI only).

## FAQ

1. How do I add a new package to the local workspace?

- Create a folder in [`packages/`](packages/) with a `package.json` and `tsconfig.json`. Extend [`tsconfig.src.json`](./tsconfig.src.json) for publishable source builds and [`tsconfig.test.json`](./tsconfig.test.json) for packages that typecheck source and tests together. Use [`common-utils`](packages/common-utils) as the publishable-library example and [`example`](packages/example) as the private-package example.

2. How do I add a new dependency that should be available to each package in the local workspace?

> `pnpm add -w $dependencyName`

## 👤 Author

Hi, I'm **Alberto Schiabel**, you can follow me on:

- Github: [@jkomyno](https://github.com/jkomyno)
- Twitter: [@jkomyno](https://twitter.com/jkomyno)

## 🦄 Show your support

Give a ⭐️ if this project helped or inspired you!

## 📝 License

Built with ❤️ by [Alberto Schiabel](https://github.com/jkomyno).<br />
This project is [MIT](https://github.com/jkomyno/pnpm-monorepo-template/blob/main/LICENSE) licensed.

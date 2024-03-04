# Contributing

We welcome contributions to this project. Please read the following guidelines before submitting a pull request.

## ⚙️ Setup

After cloning the repository you need to install all dependencies. We use [PNPM](https://pnpm.io/) to manage dependencies:

```bash
pnpm install
```

## 🤖 Scripts

The `package.json` file contains a set of scripts you can run, most notably:

- `pnpm build` - Build the plugin.
- `pnpm clean` - Clean temporary / cache related folders. This does not remove the `node_modules` folder.
  - `pnpm clean:build` - Clean the build output.
  - `pnpm clean:cache` - Clean the tooling cache (Typescript and Prettier).
- `pnpm format` - Run prettier.
  - `pnpm format:prettier` - Run code formatting with Prettier.
- `pnpm lint` - Run all code linters.
  - `pnpm lint:prettier` - Run Prettier in check mode.
  - `pnpm lint:typescript` - Run Typescript type checking.
- `pnpm test` - Run tests in watch mode.

## 📝 Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure consistent commit messages. This allows us to automatically generate a changelog and enforce a consistent style.

## 🙌 Pull Requests

When submitting a pull request, please make sure your changes are covered by tests. We use [Vitest](https://vitest.dev), for testing.

Also, make sure your code is self-documenting and any documentation in the `README.md` is updated.

## 🚀 Releases

We use [`release-it`](https://github.com/release-it/release-it) to manage our releases. This tool will look at the commit messages and will bump the version and generate a changelog accordingly.

To execute releases, you first need to create a personal access token on Github with the `repo` scope. If you use [this link](https://github.com/settings/tokens/new?scopes=repo&description=Remark%20Github%20Admonitions%20to%20Directives%20-%20release-it) the right scope is selected automatically.

If you generated the token, you need to copy your `.env.example` to `.env` and fill in the `GITHUB_TOKEN` variable.

Beside generating a Github token, you also need to authenticate yourself with NPM, by running:

```bash
npm login
```

After you've setup authentication with both Github and NPM you can run:

```bash
pnpm release
```

This will kickstart `release-it` and guide you through the process of releasing a new version.

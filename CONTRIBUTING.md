# Contributing

```bash
bun install
bun run build
bun run dev
bun run typecheck
bun run lint
bun run test
```

Tests: Vitest + Testing Library + happy-dom. Coverage includes export completeness, component smoke tests, theme utilities, and CSS light/dark selectors.

## Publishing

Merge to `main` → CI → **Publish npm** if CI succeeded. Changes under `src/**`, `package.json`, or `README.md` trigger a publish. If that version is already on npm, CI bumps the patch, publishes, and commits `package.json` with `[skip publish]`.

Needs GitHub secret `NPM_TOKEN` (granular npm token with publish permission for `@iantroisi/ui`).

```bash
gh secret set NPM_TOKEN --repo Cincinnatus101010/TroisiUI
gh secret set CROSS_REPO_GITHUB_TOKEN --repo Cincinnatus101010/TroisiUI
```

To copy `NPM_TOKEN` onto **steddy** or **sickmaps**, run Actions → **Copy NPM_TOKEN to steddy and sickmaps** (needs both secrets above).

Manual publish: Actions → **Publish npm** → **Run workflow**, or `npm publish --access public --otp=…`. Skip auto-publish with `[skip publish]` in the commit message.

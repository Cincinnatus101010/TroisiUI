# Troisi UI (`@iantroisi/ui`)

Open-source React component library with a **from-scratch CSS design system** — no Tailwind. Full **light / dark / system** theme support.

## Install

Published on npm as **`@iantroisi/ui`** (requires React 19):

```bash
npm install @iantroisi/ui
# or: bun add @iantroisi/ui   |   pnpm add @iantroisi/ui
```

Until the first npm release, install from GitHub:

```bash
npm install github:Cincinnatus101010/TroisiUI
```

```tsx
import "@iantroisi/ui/styles.css";
import { Button, ThemeProvider } from "@iantroisi/ui";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="troisi-root">
        <ThemeProvider defaultTheme="system" storageKey="troisi-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Next.js: add `transpilePackages: ["@iantroisi/ui"]` in `next.config`.

## Theming

| Mode | How |
|------|-----|
| **System** (default) | No `data-troisi-theme` on `<html>` — follows `prefers-color-scheme` |
| **Light** | `data-troisi-theme="light"` on `<html>` or `.troisi-root` |
| **Dark** | `data-troisi-theme="dark"` |

```tsx
import { ThemeProvider, useTheme, applyTheme } from "@iantroisi/ui";

// React API
const { theme, setTheme, resolvedTheme } = useTheme();

// Imperative (e.g. Storybook)
applyTheme(document.documentElement, "dark");
```

CSS uses semantic tokens (`--troisi-bg`, `--troisi-fg`, …) and `color-scheme` for native controls.

## Publishing (maintainers)

The package scope **`@iantroisi`** matches the npm user — no org setup required.

**Automatic:** pushing to `main` with changes under `src/components/`, `src/styles/`, exports, hooks, or theme runs the **Publish npm** workflow. If the current `version` is already on npm, CI bumps the **patch** version, publishes, and commits `package.json` with `[skip publish]` so it does not loop.

**One-time setup:** add a [granular npm token](https://www.npmjs.com/settings/iantroisi/tokens) (publish access to `@iantroisi/ui`) as the GitHub repo secret **`NPM_TOKEN`**.

**Manual:** `npm publish --access public --otp=…` locally, or create a [GitHub Release](https://github.com/Cincinnatus101010/TroisiUI/releases/new) to publish the checked-in version (useful for minor/major bumps you set in `package.json` first).

Skip auto-publish for a commit by including **`[skip publish]`** in the commit message.

## Development

```bash
bun install
bun run build
bun run dev
bun run typecheck
bun run lint
bun run test          # unit tests
bun run test:watch
bun run test:coverage
```

## Testing

Vitest + Testing Library + happy-dom:

- **Export completeness** — every public runtime symbol
- **Component smoke** — render + key interactions (tabs, modal, toast, command palette)
- **Theme utilities** — `applyTheme`, `resolveTheme`, `ThemeProvider`
- **CSS** — light/dark selectors in `tokens.css` and bundled `styles.css`

## Component inventory

| Category | Components |
|----------|------------|
| **Theme** | `ThemeProvider`, `useTheme`, `applyTheme`, `resolveTheme` |
| **Tokens** | CSS variables, `troisiTokens` |
| **Typography** | `Typography` (display, headings, body, caption, code) |
| **Layout** | `Box`, `Container`, `Grid`, `Stack`, `Divider`, `Spacer` |
| **Forms** | `Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `FileInput`, `DateInput`, `ColorInput`, `SearchInput`, `Form`, `FormField`, `Label`, `FieldHelper`, `FieldError` |
| **Navigation** | `Link`, `Navbar`, `Sidebar`, `Tabs`, `Breadcrumb`, `Pagination`, `Stepper`, `Menu`, `CommandPalette` |
| **Feedback** | `Alert`, `Spinner`, `Skeleton`, `Progress`, `Modal`, `Drawer`, `ToastProvider` / `useToast`, `Tooltip`, `Popover` |
| **Data** | `Table`, `Card`, `List`, `Badge`, `Tag`, `Chip`, `Avatar`, `Stat`, `Timeline`, `Accordion`, `Carousel`, `EmptyState`, `Code`, `CodeBlock` |
| **Media** | `Image`, `Video`, `Lightbox` |
| **Utility** | `Portal`, `VisuallyHidden`, `FocusTrap`, `ClickOutside`, `ScrollArea`, `ResizeObserverBox`, `Icon`, `joinClasses` |
| **Hooks** | `useClickOutside`, `useFocusTrap`, `useResizeObserver` |

## License

MIT © Ian Troisi

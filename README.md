# Troisi UI (`@troisi/ui`)

Open-source React component library with a **from-scratch CSS design system** — no Tailwind. Full **light / dark / system** theme support.

## Install

```bash
bun add @troisi/ui
```

```tsx
import "@troisi/ui/styles.css";
import { Button, ThemeProvider } from "@troisi/ui";

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

Next.js: add `transpilePackages: ["@troisi/ui"]` in `next.config`.

## Theming

| Mode | How |
|------|-----|
| **System** (default) | No `data-troisi-theme` on `<html>` — follows `prefers-color-scheme` |
| **Light** | `data-troisi-theme="light"` on `<html>` or `.troisi-root` |
| **Dark** | `data-troisi-theme="dark"` |

```tsx
import { ThemeProvider, useTheme, applyTheme } from "@troisi/ui";

// React API
const { theme, setTheme, resolvedTheme } = useTheme();

// Imperative (e.g. Storybook)
applyTheme(document.documentElement, "dark");
```

CSS uses semantic tokens (`--troisi-bg`, `--troisi-fg`, …) and `color-scheme` for native controls.

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

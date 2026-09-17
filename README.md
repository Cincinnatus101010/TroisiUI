# Troisi UI (`@iantroisi/ui`)

React 19 component library with a from-scratch CSS design system — no Tailwind. Light, dark, and system themes.

## Install

```bash
npm install @iantroisi/ui
# or: bun add @iantroisi/ui   |   pnpm add @iantroisi/ui
```

Peer dependency: React 19.

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
import { ThemeProvider, ThemeToggle, useTheme, applyTheme } from "@iantroisi/ui";

const { theme, setTheme, resolvedTheme } = useTheme();

// Imperative (e.g. Storybook)
applyTheme(document.documentElement, "dark");
```

CSS uses semantic tokens (`--troisi-bg`, `--troisi-fg`, …) and `color-scheme` for native controls. `<ThemeToggle />` cycles light / dark / system.

## Components

| Category | Components |
|----------|------------|
| **Theme** | `ThemeProvider`, `ThemeToggle`, `useTheme`, `applyTheme`, `resolveTheme` |
| **Typography** | `Typography` (display, headings, body, caption, code) |
| **Layout** | `AppShell`, `Box`, `Center`, `Container`, `Grid`, `Stack`, `Divider`, `Spacer`, `Section`, `PageHeader`, `Hero`, `Footer`, `Toolbar` |
| **Forms** | `Button`, `ButtonGroup`, `Input`, `InputGroup`, `Textarea`, `Select`, `Combobox`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `FileInput`, `DateInput`, `ColorInput`, `SearchInput`, `Form`, `FormField`, `Fieldset`, `Label`, `FieldHelper`, `FieldError` |
| **Navigation** | `Link`, `Navbar`, `NavbarLink`, `Sidebar`, `Tabs`, `Breadcrumb`, `Pagination`, `Stepper`, `Menu`, `MobileNav`, `CommandPalette` |
| **Feedback** | `Alert`, `Banner`, `Callout`, `Spinner`, `Skeleton`, `Progress`, `Modal`, `Drawer`, `ToastProvider` / `useToast`, `Tooltip`, `Popover` |
| **Data** | `Table`, `Card`, `Panel`, `List`, `Badge`, `Tag`, `Chip`, `Avatar`, `AvatarGroup`, `Stat`, `Timeline`, `Accordion`, `Carousel`, `EmptyState`, `Code`, `CodeBlock`, `CopyButton`, `DescriptionList`, `Kbd` |
| **Media** | `Image`, `Video`, `Lightbox` |
| **Utility** | `Portal`, `VisuallyHidden`, `FocusTrap`, `ScrollArea`, `Icon`, `joinClasses` |
| **Hooks** | `useClickOutside`, `useFocusTrap`, `useDisclosure`, `useMediaQuery`, `useLocalStorage` |

## License

MIT © Ian Troisi

# Apple-Inspired Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply an Apple-inspired design language to jorge-moreira.dev — steel blue accent, tighter typography, restrained shadows, and clean neutral surfaces — without changing any layout, routing, or data logic.

**Architecture:** All colour values live as HSL triples in the `@theme` block of `src/index.css`; components consume them via Tailwind token utilities (`text-primary`, `bg-accent`, etc.). No hardcoded hex or pixel values anywhere in TSX files. Changes split into two waves: Wave 1 updates the token foundation (CSS + badge component), Wave 2 updates all components and pages in parallel once tokens are stable.

**Tech Stack:** React 19, TypeScript, Tailwind v4 (`@tailwindcss/vite`), shadcn/ui (new-york style), FontAwesome icons.

**Spec:** `docs/superpowers/specs/2026-05-05-apple-inspired-redesign.md`

---

## Parallelisation Map

```
Wave 1 (run in parallel):
  Task 1 — src/index.css (color tokens + radius + typography utilities)
  Task 2 — src/components/ui/badge.tsx

Wave 2 (run in parallel, after Wave 1 is merged):
  Task 3 — src/components/Navbar.tsx
  Task 4 — src/components/Footer.tsx
  Task 5 — src/pages/Home.tsx
  Task 6 — src/pages/Projects.tsx
  Task 7 — src/pages/Contact.tsx
  Task 8 — src/pages/CV.tsx

Wave 3 (after all above):
  Task 9 — Build verification + full visual smoke test
```

---

## Shared Reference

All agents must read this before making changes.

### Color tokens (HSL triples for @theme block)

**Light mode:**
```css
--color-background: 0 0% 100%;
--color-navbar: 0 0% 96%;
--color-foreground: 0 0% 11%;
--color-card: 0 0% 100%;
--color-card-foreground: 0 0% 11%;
--color-popover: 0 0% 100%;
--color-popover-foreground: 0 0% 11%;
--color-primary: 211 74% 40%;
--color-primary-foreground: 0 0% 100%;
--color-secondary: 0 0% 96%;
--color-secondary-foreground: 0 0% 11%;
--color-muted: 0 0% 96%;
--color-muted-foreground: 0 0% 44%;
--color-accent: 0 0% 91%;
--color-accent-foreground: 0 0% 23%;
--color-destructive: 0 84.2% 60.2%;
--color-destructive-foreground: 0 0% 100%;
--color-border: 0 0% 88%;
--color-input: 0 0% 88%;
--color-ring: 211 74% 40%;
--radius: 0.625rem;
```

**Dark mode (.dark class):**
```css
--color-background: 0 0% 11%;
--color-navbar: 0 0% 8%;
--color-foreground: 0 0% 96%;
--color-card: 0 0% 11%;
--color-card-foreground: 0 0% 96%;
--color-popover: 0 0% 11%;
--color-popover-foreground: 0 0% 96%;
--color-primary: 207 72% 56%;
--color-primary-foreground: 0 0% 100%;
--color-secondary: 0 0% 17%;
--color-secondary-foreground: 0 0% 96%;
--color-muted: 0 0% 17%;
--color-muted-foreground: 0 0% 60%;
--color-accent: 0 0% 17%;
--color-accent-foreground: 0 0% 68%;
--color-destructive: 0 62.8% 30.6%;
--color-destructive-foreground: 0 0% 96%;
--color-border: 0 0% 17%;
--color-input: 0 0% 17%;
--color-ring: 207 72% 56%;
```

### No pixel values rule
**Never** write `px` values in any `.tsx` or `.css` file. Use Tailwind rem-scale utilities (`rounded-[0.625rem]`, `text-[1.0625rem]`, etc.) or named utilities (`rounded-md`, `text-lg`). The only exception is `@theme` HSL triples which are unit-less by Tailwind v4 convention.

### No hardcoded colours rule
**Never** write hex (`#1a6fb5`), `rgb()`, or `hsl()` values in `.tsx` files. Use token utilities only: `text-primary`, `bg-accent`, `border-border`, etc.

---

## Wave 1

### Task 1 — Color tokens, radius, and typography utilities (`src/index.css`)

**Owner:** Sub-agent 1  
**Files:**
- Modify: `src/index.css`

This task ONLY touches `src/index.css`. Do not touch any TSX files.

- [ ] **Step 1: Read the current file**

Read `src/index.css` in full before making any changes.

- [ ] **Step 2: Replace the `@theme` block**

Replace the entire `@theme { ... }` block (lines 4–27 in the current file) with:

```css
@theme {
  /* Light mode */
  --color-background: 0 0% 100%;
  --color-navbar: 0 0% 96%;
  --color-foreground: 0 0% 11%;
  --color-card: 0 0% 100%;
  --color-card-foreground: 0 0% 11%;
  --color-popover: 0 0% 100%;
  --color-popover-foreground: 0 0% 11%;
  --color-primary: 211 74% 40%;
  --color-primary-foreground: 0 0% 100%;
  --color-secondary: 0 0% 96%;
  --color-secondary-foreground: 0 0% 11%;
  --color-muted: 0 0% 96%;
  --color-muted-foreground: 0 0% 44%;
  --color-accent: 0 0% 91%;
  --color-accent-foreground: 0 0% 23%;
  --color-destructive: 0 84.2% 60.2%;
  --color-destructive-foreground: 0 0% 100%;
  --color-border: 0 0% 88%;
  --color-input: 0 0% 88%;
  --color-ring: 211 74% 40%;
  --radius: 0.625rem;
}
```

- [ ] **Step 3: Replace the `.dark` block**

Replace the entire `.dark { ... }` block (lines 29–50 in the current file) with:

```css
.dark {
  --color-background: 0 0% 11%;
  --color-navbar: 0 0% 8%;
  --color-foreground: 0 0% 96%;
  --color-card: 0 0% 11%;
  --color-card-foreground: 0 0% 96%;
  --color-popover: 0 0% 11%;
  --color-popover-foreground: 0 0% 96%;
  --color-primary: 207 72% 56%;
  --color-primary-foreground: 0 0% 100%;
  --color-secondary: 0 0% 17%;
  --color-secondary-foreground: 0 0% 96%;
  --color-muted: 0 0% 17%;
  --color-muted-foreground: 0 0% 60%;
  --color-accent: 0 0% 17%;
  --color-accent-foreground: 0 0% 68%;
  --color-destructive: 0 62.8% 30.6%;
  --color-destructive-foreground: 0 0% 96%;
  --color-border: 0 0% 17%;
  --color-input: 0 0% 17%;
  --color-ring: 207 72% 56%;
}
```

- [ ] **Step 4: Replace the custom utility classes**

Replace the block from `.social-icon {` to the end of the file with:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in;
}
```

The `.social-icon`, `.social-icon:hover`, `.dark .social-icon:hover`, `.nav-link.text-muted-foreground:hover`, and `.dark .nav-link.text-muted-foreground:hover` blocks are all removed. Hover behaviour is handled in the components via Tailwind utilities in Wave 2.

- [ ] **Step 5: Verify build compiles**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1 | tail -20
```

Expected: build succeeds (TypeScript errors about removed CSS classes are OK at this stage — they will be fixed in Wave 2). Build should not crash.

- [ ] **Step 6: Commit**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add src/index.css
git commit -m "style: update design tokens to Apple-inspired palette and radius"
```

---

### Task 2 — Badge component (`src/components/ui/badge.tsx`)

**Owner:** Sub-agent 2  
**Files:**
- Modify: `src/components/ui/badge.tsx`

This task ONLY touches `src/components/ui/badge.tsx`. Do not touch any TSX page files.

- [ ] **Step 1: Read the current file**

Read `src/components/ui/badge.tsx` in full.

- [ ] **Step 2: Update the default variant**

The `default` variant currently has `shadow` in its class string. Remove `shadow` and update the colours to use accent tokens. Replace the `cva(...)` call with:

```tsx
const badgeVariants = cva(
  "inline-flex items-center rounded-[0.375rem] border px-2.5 py-0.5 text-xs font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent text-accent-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
```

Key changes:
- `rounded-md` → `rounded-[0.375rem]` (smaller than card radius, no px)
- `font-semibold` → `font-normal`
- default variant: `bg-primary text-primary-foreground shadow hover:bg-primary/80` → `bg-accent text-accent-foreground` (no shadow, no hover color change — badges are not interactive)

- [ ] **Step 3: Verify build compiles**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add src/components/ui/badge.tsx
git commit -m "style: update badge to accent tokens, remove shadow, reduce radius"
```

---

## Wave 2

> Run Tasks 3–8 in parallel. Each touches a single file. None of them touch `src/index.css` or `src/components/ui/badge.tsx`.

---

### Task 3 — Navbar (`src/components/Navbar.tsx`)

**Owner:** Sub-agent 3  
**Files:**
- Modify: `src/components/Navbar.tsx`

**Context:** Wave 1 must be complete before this runs. The `.social-icon` and `.nav-link` CSS classes have been removed from `index.css`. This task replaces them with Tailwind utilities.

- [ ] **Step 1: Read the current file**

Read `src/components/Navbar.tsx` in full.

- [ ] **Step 2: Remove shadow from the nav element**

Find:
```tsx
<nav className="sticky top-0 z-50 w-full shadow-sm dark:shadow backdrop-blur-md"
```

Replace with:
```tsx
<nav className="sticky top-0 z-50 w-full backdrop-blur-md border-b border-border"
```

- [ ] **Step 3: Update inactive nav link classes**

Find all instances of the nav link `className` that reference `nav-link`:
```tsx
className={`text-sm font-medium nav-link transition-colors ${isActive(link.path)
  ? 'text-foreground'
  : 'text-muted-foreground'
  }`}
```

Replace both occurrences (desktop and mobile) with:
```tsx
className={`text-sm font-medium transition-colors hover:text-foreground ${isActive(link.path)
  ? 'text-foreground'
  : 'text-muted-foreground'
  }`}
```

- [ ] **Step 4: Verify build compiles**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 5: Commit**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add src/components/Navbar.tsx
git commit -m "style: remove shadow from navbar, replace nav-link class with Tailwind hover"
```

---

### Task 4 — Footer (`src/components/Footer.tsx`)

**Owner:** Sub-agent 4  
**Files:**
- Modify: `src/components/Footer.tsx`

**Context:** Wave 1 must be complete. The `.social-icon` CSS class has been removed from `index.css`.

- [ ] **Step 1: Read the current file**

Read `src/components/Footer.tsx` in full.

- [ ] **Step 2: Update the footer element**

Find:
```tsx
<footer>
  <div className="container mx-auto px-4 py-6">
```

Replace with:
```tsx
<footer className="bg-secondary border-t border-border">
  <div className="container mx-auto px-4 py-6">
```

- [ ] **Step 3: Update social icon links**

Find the LinkedIn anchor element's `className`:
```tsx
className="social-icon transition-colors"
```

Replace both social icon anchor `className` values (LinkedIn and GitHub) with:
```tsx
className="text-muted-foreground hover:text-foreground transition-colors"
```

- [ ] **Step 4: Update copyright text colour**

Find:
```tsx
<p className="text-gray-400">© {currentYear} Jorge Moreira</p>
```

Replace with:
```tsx
<p className="text-muted-foreground text-sm">© {currentYear} Jorge Moreira</p>
```

- [ ] **Step 5: Verify build compiles**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add src/components/Footer.tsx
git commit -m "style: footer parchment bg, border-top, replace social-icon class"
```

---

### Task 5 — Home page (`src/pages/Home.tsx`)

**Owner:** Sub-agent 5  
**Files:**
- Modify: `src/pages/Home.tsx`

**Context:** Wave 1 must be complete. No CSS class changes needed beyond what's in this file.

- [ ] **Step 1: Read the current file**

Read `src/pages/Home.tsx` in full.

- [ ] **Step 2: Update primary CTA button (View CV)**

Find:
```tsx
className="inline-flex items-center justify-center px-6 py-2.5 rounded-md text-base font-normal transition-colors bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-100"
```

Replace with:
```tsx
className="inline-flex items-center justify-center px-6 py-2.5 rounded-[0.625rem] text-base font-normal transition-colors bg-primary text-primary-foreground hover:bg-primary/90"
```

- [ ] **Step 3: Update secondary CTA button (Check Projects)**

Find:
```tsx
className="inline-flex items-center justify-center px-6 py-2.5 rounded-md text-base font-normal transition-colors bg-slate-500 text-white hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
```

Replace with:
```tsx
className="inline-flex items-center justify-center px-6 py-2.5 rounded-[0.625rem] text-base font-normal transition-colors border border-primary text-primary bg-transparent hover:bg-primary/10"
```

- [ ] **Step 4: Update sidebar Separator**

Find:
```tsx
<Separator className="bg-slate-300 dark:bg-slate-600" />
```

Replace with:
```tsx
<Separator className="bg-border" />
```

- [ ] **Step 5: Update social links**

Find all social link anchor elements. They currently have:
```tsx
className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground social-icon transition-colors"
```

Replace with:
```tsx
className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
```

- [ ] **Step 6: Verify build compiles**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add src/pages/Home.tsx
git commit -m "style: update Home CTAs to primary accent, ghost outline secondary"
```

---

### Task 6 — Projects page (`src/pages/Projects.tsx`)

**Owner:** Sub-agent 6  
**Files:**
- Modify: `src/pages/Projects.tsx`

**Context:** Wave 1 (tokens) and Wave 1 Task 2 (badge) must be complete before this runs.

- [ ] **Step 1: Read the current file**

Read `src/pages/Projects.tsx` in full.

- [ ] **Step 2: Update Card className**

Find the `Card` component's `className` prop:
```tsx
className={`flex flex-col h-full transition-all duration-200 border-slate-300 dark:border-slate-600 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 ${!project.link ? "hover:shadow-lg hover:-translate-y-1" : ""}`}
```

Replace with:
```tsx
className={`flex flex-col h-full transition-all duration-200 border-border group-hover:shadow-md group-hover:-translate-y-1 ${!project.link ? "hover:shadow-md hover:-translate-y-1" : ""}`}
```

- [ ] **Step 3: Update company label**

Find:
```tsx
<p className="text-base font-light dark:text-blue-200">{project.company}</p>
```

Replace with:
```tsx
<p className="text-base font-light text-primary">{project.company}</p>
```

- [ ] **Step 4: Remove Badge overrides**

Find:
```tsx
<Badge key={index} className="text-xs font-normal border-0 !bg-slate-200 !text-slate-700 dark:!bg-slate-600 dark:!text-slate-100">
```

Replace with:
```tsx
<Badge key={index}>
```

The badge now uses `bg-accent text-accent-foreground` from the updated default variant — no overrides needed.

- [ ] **Step 5: Verify build compiles**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 6: Commit**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add src/pages/Projects.tsx
git commit -m "style: Projects — token-driven borders/badges, accent company label, hover-only shadow"
```

---

### Task 7 — Contact page (`src/pages/Contact.tsx`)

**Owner:** Sub-agent 7  
**Files:**
- Modify: `src/pages/Contact.tsx`

**Context:** Wave 1 must be complete.

- [ ] **Step 1: Read the current file**

Read `src/pages/Contact.tsx` in full.

- [ ] **Step 2: Update Card className**

Find:
```tsx
className="transition-all duration-200 border-slate-300 dark:border-slate-600 shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer"
```

Replace with:
```tsx
className="transition-all duration-200 border-border hover:shadow-md hover:-translate-y-1 cursor-pointer"
```

- [ ] **Step 3: Verify build compiles**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add src/pages/Contact.tsx
git commit -m "style: Contact — token-driven border, hover-only shadow"
```

---

### Task 8 — CV page (`src/pages/CV.tsx`)

**Owner:** Sub-agent 8  
**Files:**
- Modify: `src/pages/CV.tsx`

**Context:** Wave 1 (tokens) and Wave 1 Task 2 (badge) must be complete.

- [ ] **Step 1: Read the current file**

Read `src/pages/CV.tsx` in full.

- [ ] **Step 2: Update the Download button**

Find:
```tsx
className="gap-2 bg-slate-500 text-white hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-500"
```

Replace with:
```tsx
className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
```

- [ ] **Step 3: Update the DropdownMenuContent**

Find:
```tsx
className="bg-slate-400 dark:bg-slate-500 border-slate-400 dark:border-slate-500 p-0 min-w-[var(--radix-dropdown-menu-trigger-width)]"
```

Replace with:
```tsx
className="bg-secondary border-border p-0 min-w-[var(--radix-dropdown-menu-trigger-width)]"
```

- [ ] **Step 4: Update DropdownMenuItems**

Find the first `DropdownMenuItem` (PDF):
```tsx
className="text-white focus:bg-slate-500 dark:focus:bg-slate-600 cursor-pointer rounded-none pl-4"
```

Replace with:
```tsx
className="text-foreground focus:bg-accent cursor-pointer rounded-none pl-4"
```

Find the second `DropdownMenuItem` (ATS friendly) — same replacement:
```tsx
className="text-white focus:bg-slate-500 dark:focus:bg-slate-600 cursor-pointer rounded-none pl-4"
```

Replace with:
```tsx
className="text-foreground focus:bg-accent cursor-pointer rounded-none pl-4"
```

- [ ] **Step 5: Update company label in experience timeline**

Find:
```tsx
<p className="text-lg font-light dark:text-blue-200">{exp.company}</p>
```

Replace with:
```tsx
<p className="text-lg font-light text-primary">{exp.company}</p>
```

- [ ] **Step 6: Update institution label in education**

Find:
```tsx
<p className="text-sm font-light dark:text-blue-200">{edu.institution}</p>
```

Replace with:
```tsx
<p className="text-sm font-light text-primary">{edu.institution}</p>
```

- [ ] **Step 7: Update the timeline dot colour**

Find the `companyColors` array and `getCompanyColor` function at the top of the file:
```tsx
const companyColors = [
  'bg-blue-500 shadow-blue-500/50',
  ...
];

const getCompanyColor = (company: string): string => {
  const hash = company.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return companyColors[hash % companyColors.length];
};
```

Remove both (the array and the function entirely). Also remove the `getCompanyColor` call inside the map:
```tsx
const dotColor = getCompanyColor(exp.company);
```
And remove `dotColor` from the `TimelineItem` props:
```tsx
<TimelineItem key={exp.id} dotColor={dotColor} isLast={isLast}>
```
Replace with:
```tsx
<TimelineItem key={exp.id} isLast={isLast}>
```

Then read `src/components/Timeline.tsx` (or wherever `TimelineItem` is defined) and update the dot to use `bg-primary` instead of accepting a dynamic colour prop. The `dotColor` prop can be removed from `TimelineItem`'s props interface; replace `className={dotColor}` (or equivalent) with `className="bg-primary"` on the dot element.

- [ ] **Step 8: Remove Badge overrides**

Find all Badge usages in CV.tsx that have override classes:
```tsx
<Badge key={idx} className="text-xs font-normal border-0 !bg-slate-200 !text-slate-700 dark:!bg-slate-600 dark:!text-slate-100">
```

Replace all of them with:
```tsx
<Badge key={idx}>
```

There are two such usages: one in the experience tags loop and one in the skills section.

- [ ] **Step 9: Verify build compiles**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1 | tail -20
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 10: Commit**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add src/pages/CV.tsx src/components/Timeline.tsx
git commit -m "style: CV — primary accent button/dropdown, token badges, single-colour timeline dot"
```

---

## Wave 3

### Task 9 — Build verification

**Owner:** Sub-agent 9 (or coordinator)  
**Files:** None modified.

- [ ] **Step 1: Run full build**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run build 2>&1
```

Expected: clean build, no TypeScript errors, no Tailwind errors.

- [ ] **Step 2: Run tests**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && bun run test 2>&1
```

Expected: all tests pass. Tests are unit/integration level and don't assert CSS classes, so no test changes are needed.

- [ ] **Step 3: Check for any remaining hardcoded colours in TSX files**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && grep -rn "slate-[0-9]\|blue-200\|gray-400\|#[0-9a-fA-F]\{3,6\}" src --include="*.tsx" | grep -v "node_modules"
```

Expected: no matches. If any are found, fix them to use the appropriate token utility before proceeding.

- [ ] **Step 4: Check for pixel values in TSX files**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io && grep -rn "[0-9]px" src --include="*.tsx" | grep -v "node_modules"
```

Expected: no matches. If any are found, convert to rem-based Tailwind utilities.

- [ ] **Step 5: Final commit if any fixes made**

```bash
cd /Users/jorge.moreira/Developer/jorge-moreira.github.io
git add -A
git commit -m "style: fix remaining hardcoded colour and px value stragglers"
```

Only run Step 5 if Steps 3 or 4 found issues that needed fixing. Skip otherwise.

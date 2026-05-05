# Navbar Brand Icon — Design Spec

**Date:** 2026-05-05

## Goal

Add a small personal logo icon to the navbar brand link (`jorge-moreira.dev`), replacing the existing `</>` text symbol with a custom SVG that adapts to the site's color theme.

## Design Decisions

- **Icon source:** `public/logo-navbar.svg` — user's own custom mark
- **Color treatment:** Monochrome / foreground — icon uses `currentColor` at ~75% opacity, blending subtly with the brand text rather than using the accent blue
- **Sizing:** `18×18px` — consistent with FontAwesome icon sizes used elsewhere in the navbar
- **Theme behavior:** `currentColor` inherits from the parent element, so it naturally adapts to light (`#1c1c1c`) and dark (`#f0f0f0`) modes without any extra logic

## Implementation

### 1. Update `public/logo-navbar.svg`

Remove hardcoded fills and stroke colors, replace with `currentColor`:

```svg
<path d="..." style="fill:currentColor" />
```

Or set `fill="currentColor"` on the `<svg>` element and remove per-path fill overrides.

### 2. Update `src/components/Navbar.tsx`

Replace the `<span>` containing `</>` with an inline SVG component.

The brand link currently reads:
```tsx
<span className="text-primary font-light tracking-tighter text-lg leading-none select-none">&lt;/&gt;</span>
jorge-moreira.dev
```

Replace with:
```tsx
<svg
  viewBox="0 0 1770 1549"
  fill="currentColor"
  className="w-[18px] h-[18px] shrink-0 opacity-75"
  style={{ fillRule: 'evenodd', clipRule: 'evenodd' }}
  aria-hidden="true"
>
  <g transform="matrix(1,0,0,1,-139,-250)">
    <path d="M1576,1799L1576,1052L1348,1281L349,282L382,250L787,250L1348,811L1909,250L1909,1799L1576,1799Z"/>
  </g>
  <g transform="matrix(1,0,0,1,-139,-250)">
    <path d="M139,492L154,478L1152,1477L831,1798L139,1799L139,1327L276,1465L670,1465L139,934L139,492Z"/>
  </g>
</svg>
```

No changes needed to the mobile menu or theme toggle logic.

## Out of Scope

- Nav link icons (CV, Projects, Contact) — not requested
- Animated logo or hover effects
- Any changes to the mobile menu layout

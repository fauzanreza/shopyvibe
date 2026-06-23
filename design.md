# ShopyVibe — Design System

> **Version** 1.0 · Last updated: June 2025  
> The single source of truth for all visual decisions in ShopyVibe.

---

## 1. Brand Identity

ShopyVibe is a digital storefront builder for Indonesian UMKM. The brand feel is:

- **Trustworthy** — not startup-flashy, not corporate-cold
- **Warm & approachable** — like talking to a knowledgeable friend
- **Focused** — minimal chrome, maximum content

---

## 2. Typography

### Typefaces

| Role | Family | Fallback |
|---|---|---|
| UI & Body | **Plus Jakarta Sans** | `system-ui, -apple-system, sans-serif` |
| Code / Monospace | **JetBrains Mono** | `'Fira Code', monospace` |

### Type Scale

| Token | Size | Weight | Use |
|---|---|---|---|
| Display | `clamp(1.75rem, 4vw, 2.5rem)` | 800 | Page heroes |
| Title | `clamp(1.375rem, 3vw, 1.875rem)` | 700 | Section headings |
| Heading | `clamp(1.125rem, 2vw, 1.375rem)` | 700 | Card titles |
| Base | `15px` | 400 | Body copy |
| Small | `13px` | 400–500 | Labels, metadata |
| XSmall | `11px` | 600–700 caps | Badges, section labels |
| Mono | `0.875em` | 400 | URLs, code |

### Rules
- Headings: `letter-spacing: -0.025em`
- Body: `letter-spacing: -0.01em`
- Caps labels: `letter-spacing: 0.06em; text-transform: uppercase`

---

## 3. Color System

### Brand Violet (Primary)

| Token | Hex | Use |
|---|---|---|
| `--brand-50`  | `#f0edff` | Hover bg, badge bg |
| `--brand-100` | `#e0d9ff` | Focus ring, badge border |
| `--brand-500` | `#6550f5` | **Primary action**, active nav |
| `--brand-600` | `#5240d4` | Hover on primary |
| `--brand-900` | `#191042` | Deep dark |

### Warm Gray (Neutrals)

| Token | Hex | Use |
|---|---|---|
| `--gray-0`   | `#ffffff` | Surfaces, cards |
| `--gray-50`  | `#fafaf9` | Page background |
| `--gray-100` | `#f5f4f2` | Subtle bg, tabs |
| `--gray-150` | `#edecea` | Dividers, borders (light) |
| `--gray-200` | `#e5e3e0` | Borders (standard) |
| `--gray-500` | `#7c786f` | Secondary text |
| `--gray-700` | `#3d3a33` | Body text |
| `--gray-900` | `#1a1714` | Maximum contrast |

### Accent Amber

| Token | Hex | Use |
|---|---|---|
| `--accent-500` | `#f59e0b` | Highlights, warnings |
| `--accent-600` | `#d97706` | Hover |

---

## 4. Spacing (8-point grid)

| Token | Value | Use |
|---|---|---|
| `--space-1`  | 4px  | Micro |
| `--space-2`  | 8px  | Tight gap |
| `--space-3`  | 12px | Component inner |
| `--space-4`  | 16px | Standard |
| `--space-6`  | 24px | Card padding |
| `--space-8`  | 32px | Section gap |
| `--space-10` | 40px | Canvas padding |
| `--space-16` | 64px | Page separation |

---

## 5. Border Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm`  | 6px   | Chips, small buttons |
| `--radius-md`  | 10px  | Inputs, nav links |
| `--radius-lg`  | 16px  | Standard cards |
| `--radius-xl`  | 24px  | Feature cards |
| `--radius-2xl` | 32px  | Full-bleed |
| `--radius-full` | 9999px | Pills, avatars |

---

## 6. Elevation / Shadow

| Token | Use |
|---|---|
| `--shadow-xs` | Subtle lift (inputs) |
| `--shadow-sm` | Cards at rest |
| `--shadow-md` | Cards on hover |
| `--shadow-lg` | Modals, dropdowns |
| `--shadow-xl` | Overlays, panels |
| `--shadow-brand` | Primary CTA buttons |

---

## 7. Motion

| Token | Value | Use |
|---|---|---|
| `--ease-smooth` | `cubic-bezier(0.16, 1, 0.3, 1)` | Standard transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bounce interactions |
| `--duration-fast` | 140ms | Hover, colors |
| `--duration-base` | 220ms | Elevation, panels |
| `--duration-slow` | 380ms | Page transitions |

**Rules:** Never animate `width`/`height`. Use `transform: scale()`. Respect `prefers-reduced-motion`.

---

## 8. Component Patterns

### Buttons
```
Primary:     bg-brand-500, shadow-brand, hover: translateY(-1px)
Ghost:       transparent bg, gray-200 border, hover: bg-gray-100
Destructive: bg-red-500
```

### Cards
```
Default:   white, gray-150 border, shadow-sm, rounded-xl
Hoverable: + translateY(-2px) shadow-lg
```

### Nav Links
```
Default: text-gray-600, rounded-md, px-3 py-2
Hover:   bg-gray-100, text-gray-900
Active:  bg-brand-50, text-brand-600, font-600
```

### Inputs
```
Border:       gray-200 → brand-500 on focus
Height:       40px compact / 44px standard
Font:         14px / Plus Jakarta Sans
Radius:       10px
```

---

## 9. Layout System

| Layout | Route | Description |
|---|---|---|
| **Hub Grid** | `/vibes` | Template row + document grid (Google Docs style) |
| **Split Panel** | `/onboarding` | 400px sidebar + preview canvas |
| **Sidebar + Main** | `/dashboard/[id]` | 256px sidebar + content |
| **Auth Card** | `/login`, `/register` | Centered card, max-width 440px |

---

## 10. Preview Frame Specs

### Desktop Browser
- Aspect ratio: **16:10**
- Chrome: macOS traffic lights + URL bar + tab strip with favicon
- Shadow: `shadow-xl`

### Mobile Phone
- Aspect ratio: **9:19.5** (modern smartphone)
- Frame: Dark gradient with physical buttons
- Dynamic Island at top
- Inner screen border-radius: 30px

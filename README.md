# EWS UI Template

Dark military dashboard design system - Neon Genesis Evangelion / NERV aesthetic.
Pure CSS + TypeScript. No UI framework required.

```
black background · orange (#FFAA00) for info · red (#E60003) for alerts
```

## Stack

- **TypeScript 5** + **Webpack 5**
- `css-loader`, `style-loader`, `mini-css-extract-plugin`, `html-webpack-plugin`

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # → dist/
```

## Project Structure

```
src/
├── index.html
├── styles/
│   ├── index.css          # root import (controls load order)
│   ├── base.css           # CSS variables + body reset
│   ├── fonts.css          # Roboto Condensed (Google) + DS-Digital (local)
│   ├── animations.css     # @keyframes + utility classes
│   ├── stripe-bar.css     # animated diagonal hazard stripes
│   ├── components.css     # cards, borders, shapes, markers
│   ├── variants.css       # .ews-text-*, .ews-btn-*, .ews-input, etc.
│   ├── hex-grid.css       # honeycomb layout styles
│   ├── hex-shape.css      # hex SVG background helpers
│   └── status.css         # status node / rib-cage layout
└── ts/
    ├── index.ts           # entry point + live showcase
    ├── StripeBar.ts       # animated stripe component
    ├── Card.ts            # card panel component
    └── HexGrid.ts         # honeycomb layout engine
public/
└── fonts/                 # drop DS-Digital .ttf files here
static/
└── images/                # optional image assets for cards, backgrounds, etc.
```

## CSS Tokens

| Variable | Value | Use |
|---|---|---|
| `--orange` | `#FFAA00` | info / normal state |
| `--red` | `#E60003` | danger / alert state |
| `--text-color` | `#FFAA00` | default body text |
| `--danger-text-color` | `#FF2233` | alert text |
| `--glow-rgb` | `255, 102, 0` | orange glow |
| `--danger-glow-rgb` | `255, 0, 0` | red glow |
| `--gutter-size` | `8px` | border-radius unit |

## Key Classes

**Cards** — `.ews-card` `.bordered` `.bordered-red` `.ews-card-header` `.ews-card-content` `.ews-card-footer` `.ews-card-float`

**Typography** — `.ews-text` `.ews-text-glow` `.ews-text-digital` `.ews-text-blink` `.ews-title` `.text-glow` `.text-glow-red`

**Buttons** — `.ews-btn` + `.ews-btn-primary` / `.ews-btn-danger` / `.ews-btn-outline` / `.ews-btn-outline-danger` / `.ews-btn-ghost` / `.ews-btn-skew` / `.ews-btn-alert` + `.ews-btn-sm` / `.ews-btn-lg`

**Inputs** — `.ews-input` `.ews-select` `.ews-textarea` — add `.danger` or `.underline` as modifiers. `.toggle-switch` + `.toggle-slider` for toggles.

**Shapes** — `.parallelogram` `.hex-flat-top` `.hex-pointy-top` `.hex-hive` `.hex-cell-flat` `.hex-status-cell` `.hex-stripe-cell` `.hex-shape`

**Animations** — `.blink` `.blink-fast` `.fade-in` `.slide-in-left` `.slide-fade-in` `.glow-effect` `.loop-stripe` `.loop-stripe-reverse` `.animation-delay-1/2/3/4` `.anim-duration-5/10/20`

**Misc** — `.scanline` `.neon-glow` `.neon-box` `.backgroundline` `.loader` `.circles` `.overlay-bg`

## TypeScript Components

**`StripeBar`**
```ts
import { StripeBar } from "./ts/StripeBar";

const bar = new StripeBar({ color: "red", loop: true, reverse: true, duration: 20 });
bar.setContent(labelEl); // optional windowed-text overlay
el.appendChild(bar.element);
```

**`Card`**
```ts
import { Card } from "./ts/Card";

const card = new Card({ title: "STATUS", borderColor: "red", stripeHeader: true });
card.setContent(bodyEl);
card.setFooter("LAST UPDATE: 00:04:12");
document.body.appendChild(card.element);
```

**`HexGrid`**
```ts
import { HexGrid } from "./ts/HexGrid";

// Automatically re-layouts on resize / child mutations
const grid = new HexGrid(containerEl, { variant: "pointy", hexWidth: 72, hexHeight: 83, gap: 4 });
grid.destroy(); // disconnect observers when done
```

## DS-Digital Font

Not included — requires a license. Options:

1. Purchase from [dafont.com/ds-digital.font](https://www.dafont.com/ds-digital.font) and place `.TTF` files in `public/fonts/`.
2. Swap in any monospaced LCD-style font and update `fonts.css`.
3. Skip it — the system works fine without it, falling back to system monospace.

## Design Rules

- Background is always `#000000` — no exceptions
- Orange = informational / normal · Red = danger / alert
- No green, no blue as primary UI colors
- Animations communicate live data — never purely decorative

# EWS UI Template — TypeScript + Webpack

A framework-agnostic template that replicates the **EWS Concept** design system
(dark military dashboard, Neon Genesis Evangelion / NERV aesthetic) using
pure CSS + TypeScript.

## Stack

| Tool | Role |
|---|---|
| TypeScript 5 | Type-safe JS |
| Webpack 5 | Bundler + dev server |
| css-loader | CSS modules pipeline |
| html-webpack-plugin | Injects bundle into HTML |
| mini-css-extract-plugin | Extracts CSS in production |

No UI framework required — the design is CSS-only.

## Quick Start

```bash
npm install
npm run dev    # starts dev server on http://localhost:3000
npm run build  # production build → dist/
```

## Project Structure

```
src/
├── index.html          # HTML template
├── styles/
│   ├── index.css       # Root import (imports all modules in order)
│   ├── base.css        # CSS variables (:root) + body reset
│   ├── fonts.css       # Roboto Condensed (Google) + DS-Digital (local)
│   ├── animations.css  # @keyframes + utility classes
│   ├── stripe-bar.css  # Animated diagonal stripe pattern
│   ├── components.css  # Cards, borders, hex, parallelogram, markers
│   └── variants.css    # .ews-text-*, .ews-btn-*, .ews-input
└── ts/
    ├── index.ts        # Entry point — imports CSS + wires demo
    ├── StripeBar.ts    # Stripe bar component class
    ├── Card.ts         # Card panel component class
    └── HexGrid.ts      # Honeycomb layout engine
public/
└── fonts/              # Drop DS-Digital .ttf files here
    ├── ds_digital.ttf
    ├── ds_digitalbold.ttf
    ├── ds_digitalital.ttf
    └── ds_digitalboldital.ttf
```

## CSS Design Tokens (base.css)

| Variable | Value | Purpose |
|---|---|---|
| `--orange` | `#FFAA00` | Primary info color |
| `--red` | `#E60003` | Danger / alert color |
| `--text-color` | `#FFAA00` | Default body text |
| `--danger-text-color` | `#FF2233` | Alert text |
| `--glow-rgb` | `255, 102, 0` | Orange glow (box-shadow) |
| `--danger-glow-rgb` | `255, 0, 0` | Red glow |
| `--gutter-size` | `8px` | Border-radius unit |

## Key CSS Classes

### Cards & Borders
- `.ews-card` — base panel (black bg)
- `.bordered` — 3px orange border
- `.bordered-red` — 3px red border
- `.ews-card-header` / `.ews-card-content` / `.ews-card-footer`
- `.custom-scrollbar` — dark track + red thumb

### Typography
- `.ews-text` — Roboto Condensed, uppercase, orange
- `.ews-text-glow` — text-shadow glow
- `.ews-text-digital` — DS-Digital LCD font
- `.ews-text-blink` — blinking text
- `.ews-title` — large display heading

### Buttons
- `.ews-btn` — base (always combine with a variant)
- `.ews-btn-primary` / `.ews-btn-danger` / `.ews-btn-outline` / `.ews-btn-outline-danger`
- `.ews-btn-ghost` / `.ews-btn-skew` / `.ews-btn-alert`
- `.ews-btn-sm` / `.ews-btn-lg`

### Inputs
- `.ews-input` / `.ews-input.danger` / `.ews-input.underline`
- `.ews-select` / `.ews-textarea`
- `.toggle-switch` + `.toggle-slider`

### Animations
- `.blink` / `.blink-fast`
- `.show-pop-up` / `.close-pop-up`
- `.slide-in-left` / `.fade-in` / `.vertical-reveal`
- `.glow-effect`
- `.loop-stripe` / `.loop-stripe-reverse`
- `.animation-delay-1/2/3/4`
- `.anim-duration-5/10/20`

### Shapes
- `.parallelogram` / `.parallelogram.danger`
- `.hex-flat-top` / `.hex-pointy-top` (clip-path)
- `.hex-hive` / `.hex-hive.bg-hex` / `.hex-hive.hex-danger` / `.hex-hive.hex-warn`

## TypeScript Classes

### `StripeBar`
```ts
import { StripeBar } from "./ts/StripeBar";

const bar = new StripeBar({ color: "red", loop: true, reverse: true, duration: 20 });
headerEl.appendChild(bar.element);
bar.setContent(myLabel); // optional windowed-text overlay
```

### `Card`
```ts
import { Card } from "./ts/Card";

const card = new Card({ title: "STATUS", borderColor: "red", stripeHeader: true });
card.setContent(myContentEl);
card.setFooter("LAST UPDATE: 00:04:12");
document.body.appendChild(card.element);
```

### `HexGrid`
```ts
import { HexGrid } from "./ts/HexGrid";

const grid = new HexGrid(containerEl, { variant: "pointy", hexWidth: 72, hexHeight: 83, gap: 4 });
// Automatically re-layouts on container resize
```

## Adding DS-Digital Font

The DS-Digital font is not included (it requires a license). Options:
1. Purchase from [dafont.com/ds-digital.font](https://www.dafont.com/ds-digital.font) and place `.ttf` files in `public/fonts/`.
2. Use any monospaced LCD-style font and update `fonts.css`.
3. Skip it entirely — the design system works fine without it.

## Design Rules (from the style guide)

- **Never** introduce any background color other than black (`#000000`)
- **Never** use green or blue as primary UI colors
- Orange = informational / normal state
- Red = danger / alert state
- All animations communicate live data — never purely decorative
- Every deviation from black/orange/red weakens the aesthetic

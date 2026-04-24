# Design Brief

## Direction

KRPL Premier League 2026 — Premium cricket tournament showcase with luxury cinema aesthetics and bold sports event energy.

## Tone

Bold maximalism with jewel-tone depth — deep blue/purple gradients with aggressive gold accents, dramatic lighting effects, and cinematic layering create prestige and excitement.

## Differentiation

Animated gold-bordered container with shine effect, layered card depth through glow shadows, and selective gold highlights create a premium sports event presence that commands attention.

## Color Palette

| Token      | OKLCH        | Role                           |
| ---------- | ------------ | ------------------------------ |
| background | 0.10 0.05 270| Deep navy base with gradient   |
| foreground | 0.95 0.02 0  | High contrast white text       |
| card       | 0.12 0.04 270| Deep card surface              |
| primary    | 0.82 0.18 65 | Gold accent for borders/CTA    |
| accent     | 0.82 0.18 65 | Same as primary for highlights |
| destructive| 0.60 0.25 20 | Red for entry fee pill         |
| muted      | 0.25 0.05 270| Subtle dividers & secondary    |

## Typography

- Display: Space Grotesk — bold headings, tournament title, prize amounts
- Body: DM Sans — descriptive text, rules, contact info
- Scale: Hero `text-5xl font-900 tracking-tight`, h2 `text-3xl font-bold`, labels `text-sm font-semibold tracking-widest`, body `text-base`

## Elevation & Depth

Layered surfaces with gold borders and glow shadows create depth: main container elevated with 4px gold border and inset shine, cards receive lift-on-hover with gold glow.

## Structural Zones

| Zone    | Background          | Border            | Notes                           |
| ------- | ------------------- | ----------------- | ------------------------------- |
| Header  | bg-gradient-primary | border-gold 4px   | Main container with shine anim  |
| Content | bg-card nested      | border-gold 2px   | Prize cards, info panels        |
| Footer  | bg-muted/20         | border-t gold 1px | Contact grid with white cards   |

## Spacing & Rhythm

Large gap between sections (40px), tight card padding (25px), micro-spacing (5-10px) for typography hierarchy. Section dividers use gold borders at 1px opacity.

## Component Patterns

- Buttons: Gradient red pill (entry fee), gold gradient button (register), white text on dark, 50px border-radius
- Cards: 2px gold borders, 20px radius, dark gradient background, hover lifts 10px with gold glow
- Badges: Gold text on dark background, caps, 1rem font-weight

## Motion

- Entrance: Cards fade-in on load with slight delay
- Hover: Cards lift 10px with gold glow shadow, buttons scale 1.05
- Decorative: Shine animation across border (6s loop), gold text gradient

## Constraints

- No login/authentication required
- All Hindi text as provided
- Preserve exact color values from user spec: #10173a (blue), #3a1c71 (purple), #fdbb2d (gold)
- Dark mode only — no light theme variant
- Mobile responsive (card layout shifts to column on small screens)

## Signature Detail

Animated shine effect that traverses the gold border every 6 seconds, creating a premium cinema-projection aesthetic and reinforcing the luxury sports event positioning.

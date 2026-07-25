# Optimization Changelog

This file is reserved for Task B Lighthouse and optimization notes.

## Initial build

- Built as a static HTML/CSS/JS site with no backend dependency.
- Used semantic landmarks and accessible form labels.
- Kept interactions lightweight and deferred JavaScript from first paint.

## Desktop performance tuning

- Removed external Google Fonts requests and switched to local font stacks to reduce render-blocking work.
- Simplified the sticky header paint path by removing the blur effect.
- Reduced a heavy hero panel shadow to trim initial rendering cost.

## Mobile performance tuning

- Inlined critical above-the-fold styles for the header and hero to reduce first render delay on mobile.
- Changed the main stylesheet to a preload-plus-onload pattern so full styling arrives without blocking the first paint as heavily.
- Marked below-the-fold sections with deferred rendering using `content-visibility` and intrinsic sizing.
- Hid the non-essential hero insight panel on small screens and removed heavy mobile shadows to lower first-load paint cost.

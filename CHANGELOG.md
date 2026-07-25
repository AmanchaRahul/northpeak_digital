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

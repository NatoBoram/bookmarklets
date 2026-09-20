# Copilot instructions

This repository contains standalone browser bookmarklets. Each file in `src/` is copied into a browser bookmark and runs in the active page; there is no application bundle or runtime package.

## Repository layout

- `src/*.js` contains independent bookmarklets.
- `src/window_open/*.js` contains related viewport-sized window helpers.
- `README.md` lists user-facing bookmarklets and explains installation in a browser.
- `.github/instructions/javascript.instructions.md` contains the detailed JavaScript conventions.

Preserve the existing file grouping when adding a bookmarklet and add a link in `README.md` when it is user-facing.

## Development workflow

Install dependencies with `pnpm install`. Use `pnpm run lint:fix` for automatic fixes. Do not use `pnpm run lint` as it is for CI only.

There is no test suite or build step.

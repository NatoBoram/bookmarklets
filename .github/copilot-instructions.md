# Copilot Instructions

This is a collection of browser bookmarklets - small JavaScript snippets that run in the browser's bookmark bar. Bookmarklets are standalone IIFE functions that execute in the context of the current web page.

## Code Structure

- #file:../src : Contains all bookmarklet JavaScript files
  - Flat files are standalone bookmarklets
  - Subdirectories group related bookmarklets by function

## Development Workflow

- **Install**: `pnpm install`
- **Format**: `pnpm run format` (runs Prettier write)
- **Fix**: `pnpm run lint:fix` (auto-fixes linting and formatting issues)
- **Lint**: `pnpm run lint` (runs ESLint, markdownlint-cli2, and Prettier checks)

CI automatically commits fixes on failures (lockfile, format, lint) unless triggered by merge queue.

## Dependencies

No runtime dependencies - bookmarklets run in browser context only.

Dev dependencies: ESLint, Prettier, TypeScript (for type checking), markdownlint-cli2.

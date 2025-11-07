---
applyTo: **/*.js
---

# JavaScript Instructions

## Pattern

Use a minimal IIFE wrapper:

```js
(() => {
	"use strict";
	/* code */
})();
```

Async flow:

```js
(async () => {
	"use strict";
	/* await operations */
})();
```

## Tooling & Typing

- TypeScript strict checking via `tsconfig.eslint.json` with `checkJs: true`.
- Use JSDoc for types: `/** @type {HTMLFormElement[]} */` etc (see `archive_github_notifications.js`).
- No type assertions: rely on guards (`if (el instanceof HTMLFormElement) { ... }`).

## Style Rules

- Top-level helper definitions must use `function` declarations (ESLint `func-style`).
- Prefer readable names; avoid one-letter identifiers.
- Keep side effects inside the IIFE; do not leak globals.
- Tabs for indentation; Prettier: `arrowParens: avoid`, `trailingComma: all`.
- Inline `//` comments are forbidden (they can truncate code when pasted as a bookmark URL). Use terminated block comments `/* ... */` only.

## Runtime Context

- Code runs in the active page; do not import modules or depend on bundling.
- Assume modern DOM APIs (`querySelectorAll`, `requestSubmit`, `checkVisibility`).
- Avoid external network calls unless essential; bookmarklets should be instant.

## Iteration & DOM Patterns

From `archive_github_notifications.js`:

```js
const notifications = document.querySelectorAll("li.notifications-list-item");
const filtered = notifications.values().filter(n => /* condition */);
const checkboxes = filtered.map(n => n.querySelector('input[type="checkbox"]')).toArray();
```

- Use iterator helper chains (`values().filter().map().toArray()`) for clarity.
- After batch DOM interaction, pause with `await new Promise(r => setTimeout(r, 1000))` to let the page react.
- Prefer `element.requestSubmit()` over manually triggering click on submit buttons.

## Logging

- Use `console.log` for progress, `console.info` for completion messages.
- Keep logs short; bookmarklets may be copied verbatim into the URL field.

## Performance & Safety

- Avoid infinite loops; cap retries (see `for (let archived = await fn(); archived >= 10; ...)`).
- Gate optional actions with existence checks (`checkbox?.click()`).

## Adding a New Bookmarklet

1. Create `src/<purpose>.js` or place in a subdirectory if related.
2. Implement IIFE pattern + strict mode.
3. Add JSDoc types where non-trivial.
4. Auto-fix issues with `pnpm run lint:fix` then manually fix issues raised by `pnpm run lint`.
5. Add link to `README.md` if user-facing.

## Common Mistakes to Avoid

- Arrow function at top level (breaks style rule).
- Type assertion (`/** @type {HTMLElement} */ (x)`): use guards instead.
- Omitting `"use strict"`.
- Leaving long-running intervals without a stop condition.

Refer back to `archive_github_notifications.js` for complex DOM sequences and `window_open/*.js` for minimal patterns.

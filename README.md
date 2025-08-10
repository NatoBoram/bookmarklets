# Bookmarklets

[![Node.js CI](https://github.com/NatoBoram/bookmarklets/actions/workflows/node.js.yaml/badge.svg)](https://github.com/NatoBoram/bookmarklets/actions/workflows/node.js.yaml) [![CodeQL](https://github.com/NatoBoram/bookmarklets/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/NatoBoram/bookmarklets/actions/workflows/github-code-scanning/codeql) [![Dependabot Updates](https://github.com/NatoBoram/bookmarklets/actions/workflows/dependabot/dependabot-updates/badge.svg)](https://github.com/NatoBoram/bookmarklets/actions/workflows/dependabot/dependabot-updates)

My personal collection of bookmarklets.

## Bookmarklets

- Open the current page in a new window with a specific resolution:
  - [1080p](./src/window_open/1080p.js)
  - [720p](./src/window_open/720p.js)
  - [640p](./src/window_open/640p.js)
  - [Feature graphic (1024x500)](./src/window_open/feature_graphic.js)
- [Archive GitHub notifications](./src/archive_github_notifications.js)

## Usage

1. Copy the code from the desired bookmarklet file
2. Create a new bookmark in your browser
3. In the URL field, type `javascript:` then paste the bookmarklet's code

The bookmarklet should look like this:

```log
javascript:(() => {  "use strict";  window.open(location.href, "1080p", "width=1920,height=1080"); })();
```

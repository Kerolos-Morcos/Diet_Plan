# Diet Planner PWA

Static mobile-first PWA for diet programs, meds, water, weight, snack photos, local backup, dark mode, and local notifications.

## What changed

- Only two languages: Egyptian Arabic (default) and English.
- No Modern Standard Arabic mode.
- RTL/LTR switches automatically.
- Dark mode toggle.
- Lightweight CSS animations with `prefers-reduced-motion` support.
- Snack photo upload with browser-side compression and local storage.
- P1 included, and you can add P2/P3 from the app.

## Run locally

Do not open `index.html` directly. Use a local server:

```bash
npx serve .
```

or VS Code Live Server.

## GitHub Pages

Upload the files to your repository and enable GitHub Pages from Settings → Pages.

## Important notification note

Web notifications on mobile depend on browser/OS support. Best result: open from GitHub Pages, install using Add to Home Screen, and allow notifications.

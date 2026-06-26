# Kerolos Diet Planner PWA

Static mobile-first diet, medication, water and snack-image planner.

## Features
- P1 built in from the doctor's instructions.
- Add/edit P2, P3... with the same alarm/task structure.
- Save all actions locally in the browser via localStorage.
- Upload snack/cheese images and save them locally after compression.
- Daily checkboxes, 12-cup water tracker, weight records.
- PWA support for GitHub Pages.
- Browser notifications via Notification API + Service Worker.

## Important notification note
Mobile browsers have limitations. Notifications work best after:
1. Deploying on HTTPS, such as GitHub Pages.
2. Opening the site on mobile.
3. Pressing “تثبيت” / Add to Home Screen.
4. Allowing notifications from the browser/system.

Without a backend push server, alarms may not fire reliably while the app is fully closed on every phone/browser. They will work best when the PWA is installed and recently active.

## Deploy to GitHub Pages
1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Go to Settings → Pages.
4. Source: Deploy from branch.
5. Branch: main / root.
6. Open the generated github.io link.

## Local test
Open `index.html` directly, or run a static server:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

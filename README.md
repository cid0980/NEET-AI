# NEET AI Tutor — hosted copy

Single-file study app (NEET-UG 2028, one student) served as a GitHub Page.

- `index.html` — the whole app. The tutor key is a placeholder (`__OR_KEY__`) in git.
- `.github/workflows/deploy.yml` — on every push, injects the repository secret
  `OPENROUTER_KEY` into a build copy and deploys it to GitHub Pages.
  **The key is never stored in this repository.**
- `sw.js` — service worker: offline cache + one-tap install on Android.

## Updating the app
Replace `index.html` with a newer build (key replaced by `__OR_KEY__`), commit, push.
The site rebuilds itself in about a minute.

## Changing the tutor key
Repository → Settings → Secrets and variables → Actions → `OPENROUTER_KEY`.

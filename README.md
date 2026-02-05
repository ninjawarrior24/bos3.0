BeOne Sports — Static Site

Project structure
- index.html — main site
- css/style.css — main stylesheet
- js/ — JavaScript files (`app.min.js`, `reveal.js`, `hp-reveal.js`, `hamburger.js`, `sw.js`)
- images/ — image assets
- videos/ — video assets

Quick local preview
1. Open a terminal in the project root.
2. Run a simple HTTP server (Python 3):

```powershell
python -m http.server 8000
```

3. Open http://localhost:8000 in your browser.

Notes about cleanup performed
- Removed duplicated nested `<picture>` tags and simplified image markup.
- Replaced the NOS video grid with a single centered `images/Computer2.png` image.
- Adjusted reveal animations and observer sensitivity (`js/reveal.js`) for earlier, cleaner reveals.
- Tuned `.webapplanding-video` and `.nos-centered-image` sizing for better desktop and mobile balance.

Recommended next steps (optional)
- Run a code formatter (Prettier) and a CSS linter to normalize styles.
- Add a `package.json` and a small build step if you plan to add tooling.
- Review CSS for duplicate/responsive rules and consolidate where appropriate.

If you want, I can now run a more thorough reformatting and lint pass (adds `package.json` and dev-deps) — tell me if you'd like that.
# ITRG-ZL-SSO

Static prototype of the Info-Tech **CIO Analytics** dashboard, with a **Zluri's SaaS Management Platform**
entry added to the side nav and a blank page behind it.

Built from a saved copy of the live page (`reference/`), so the shell, CSS and JS are the real ones.

## Run it

```bash
npm start          # builds, then serves http://localhost:4050
```

Or just `npm run build` and open `public/index.html` in a browser — every path is relative, so
`file://` works too.

## Layout

```
src/layout.html      page shell: <head>, header, side nav, footer. Holds <!--CONTENT-->.
src/pages/*.html     the bit that goes inside <main>. One file per page.
src/assets/          CSS, JS and SVGs lifted from the saved page.
build.mjs            stitches layout + page, sets <title>, marks the active nav link.
public/              build output (gitignored).
reference/           the original saved page, untouched.
```

## Add a page

1. Drop `src/pages/<slug>.html` — just the content, no shell.
2. Add a nav link in `src/layout.html` (copy the Zluri `<li>`, change the `id`, label and `href`).
3. Register it in `PAGES` in `build.mjs` with its `title` and the nav link's `id`.

The active-page highlight comes from `aria-current="page"`, which `build.mjs` sets on the link id
you register. The nav `id` must exist in the layout or the build fails loudly.

## Known gaps

- The charts on the home page are the saved snapshot. Their `turbo-frame src` attributes were
  stripped, otherwise Turbo would re-fetch them from the live site, hit the login wall and blank
  them out. They're static pictures now, not live data.
- Every other nav link still points at `us.app.cioanalytics.ai`. Only **Metrics** (home) and
  **Zluri's SaaS Management Platform** stay local.
- `logo-infotech.jpg` was missing from the saved copy, so the sidebar logo falls back to
  `info-tech-logo-blue-a9dd7c97.svg`.

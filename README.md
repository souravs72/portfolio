# Portfolio Website

Static personal portfolio for Sourav Singh, deployed on GitHub Pages.

## Description
- Single-page site with sections for about, skills, projects, and contact.
- Contact form uses Web3Forms; the access key is injected at deploy time via GitHub Actions.

## Tech Stack
- HTML, CSS, Vanilla JavaScript
- GitHub Pages for hosting
- Web3Forms for contact form submissions

## Local Development
Open `index.html` in a browser, or serve locally:
```bash
python3 -m http.server 8080
```

## Deployment
- Automatic on push to `main` via `.github/workflows/pages.yml`.
- The workflow replaces `__WEB3FORMS_ACCESS_KEY__` using the `WEB3FORMS_ACCESS_KEY` repository secret and publishes to GitHub Pages.

## License
- Code: MIT (see `LICENSE`).
- Content (text), media (images), and resume: Copyright © Sourav Singh. All rights reserved unless otherwise noted.

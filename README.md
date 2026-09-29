# Codebreakers Consultancy website

Static website for Codebreakers Consultancy.

## Site files

- `index.html` — home page
- `about.html` — company and services overview
- `appointments.html` — consultation request page
- `styles.css` — shared layout, colours and responsive styling
- `script.js` — mobile navigation and appointment request behaviour
- `logo-cc.svg` — CC data-themed brand mark
- `favicon.svg` — browser icon

All website files are kept at the repository root so the site works cleanly on GitHub Pages without nested page folders.

## Running locally

Open `index.html` in a browser, or use a local development server such as the VS Code Live Server extension.

## Editing the site

Page content is stored in the three HTML files. Shared styling is in `styles.css`, while `script.js` handles the responsive navigation and appointment request form.

The appointments page does not use Acuity or another scheduling platform. Visitors can enter their preferred date, time and message, then the site opens their email application with a consultation request pre-filled for `Jo@CodebreakersConsultancy.onmicrosoft.com`.

The website itself does not store appointment form data.

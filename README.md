# Find My Fork landing page

This is a dependency-free static site. The original seven app screens are kept separately in the workspace under `assets/screens/`; only the privacy-safe, optimized previews in this folder are intended for the public page.

## Preview locally

From this folder, run `python3 -m http.server 4173` and visit `http://localhost:4173`.

## Activate the waitlist

The form is intentionally in preview mode until a free endpoint is connected. Create a free Formspree form, then replace `YOUR_FORM_ID` in `main.js` with the form ID from its endpoint URL. The bilingual form will then submit email addresses to that endpoint.

No account creation or password-reset flow is advertised; the form is only a launch-interest waitlist.

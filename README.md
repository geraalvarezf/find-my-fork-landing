# Find My Fork landing page

This is a dependency-free static site. The original seven app screens are kept separately in the workspace under `assets/screens/`; only the privacy-safe, optimized previews in this folder are intended for the public page.

## Preview locally

From this folder, run `python3 -m http.server 4173` and visit `http://localhost:4173`.

## Activate the waitlist

The form uses Formspree and stays in preview mode until its ID is configured. Create a free form, then replace `YOUR_FORM_ID` in `main.js` with the ID from its endpoint URL. The form submits the required email, optional name and city, plus a honeypot and email subject. With JavaScript enabled, visitors see an inline confirmation or localized error; with JavaScript disabled, the native `POST` form submits directly to Formspree.

The current Formspree Free plan lists 50 submissions per month. That limit can change, so confirm the plan before relying on it for a launch target.

No account creation or password-reset flow is advertised; the form is only a launch-interest waitlist.

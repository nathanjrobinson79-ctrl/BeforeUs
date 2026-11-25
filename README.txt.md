# Before Us

A responsive, multi-page genealogy and family-history consulting website built with HTML, CSS and vanilla JavaScript. No build step or package installation is required.

## Run locally

Open `index.html` in a browser, or serve this folder with a local static server:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Push the site files to the repository's `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Wait for the Pages deployment to finish. The project site URL will be shown in the Pages settings.
5. Test the live home page and every navigation link. Add a custom domain in Pages settings if desired, then configure the DNS records requested by GitHub.

The site includes `.nojekyll` and a custom `404.html`. Update `sitemap.xml` and the canonical URLs in each page after confirming the final production domain. Keep HTTPS enabled.

## Deploy to a commercial static host

The site has no build step: its publish directory is the repository root, and the entry page is `index.html`.

1. In the hosting provider's dashboard, connect the GitHub repository and select the production branch.
2. Set the publish/output directory to the repository root. Leave build and install commands empty.
3. Configure the provider's custom-domain DNS instructions and enable HTTPS before sharing the site.
4. If the provider offers a not-found or error-page setting, select `404.html`.
5. After deployment, test all ten pages, responsive navigation and the form on the provider's domain. Replace the placeholder canonical URLs and sitemap origin with that exact HTTPS domain.

## Enquiry form setup

By default, the contact form opens the visitor's email app with their details addressed to `beforeusancestry@gmail.com`. It does not send the message; the visitor must review and send it from their email app.

To send enquiries directly from the site instead, choose a reputable hosted form provider (for example Formspree) or a serverless endpoint managed on your hosting platform:

1. Create a form with the provider and verify your business email and published domain.
2. Configure spam protection, rate limiting, email notifications and data-retention controls in the provider dashboard. Prefer a CAPTCHA or equivalent managed challenge where appropriate.
3. In `assets/js/site.js`, set `FORM_ENDPOINT` to the provider's HTTPS submission endpoint. The public form endpoint is not a secret; **never put API keys, passwords or private credentials in browser code**.
4. Keep the form's `_gotcha` honeypot field enabled. Test a valid submission, invalid fields, provider errors, spam controls and mobile layout before launch.
5. Update the privacy notice and consent language to identify the actual provider, data collected, purpose, retention and contact details. Obtain independent privacy/legal advice for the business's circumstances.

Do not request sensitive identity documents or detailed information about living relatives in the initial enquiry. Collect only what is needed and agree on a secure transfer method before sharing research materials.

## Before launch

- The provided business contact email is `beforeusancestry@gmail.com`. Verify any other public business details and replace the privacy/form setup notices with the actual business and service information.
- Confirm service scope, availability, turnaround estimates, pricing and applicable terms. Package descriptions intentionally do not promise a fixed price or result.
- The sitemap and canonical URLs are configured for `https://beforeus.com.au/`; update them if the production domain changes.
- Check that image-hosting choices, form-provider terms and the privacy statement suit the business. The hero image is loaded from Unsplash and requires an internet connection.
- Check the deployed site on current desktop and mobile browsers, and submit a test enquiry after form setup.

## Site pages

- `index.html` — Home
- `about.html` — About Us
- `services.html` — Genealogy Services
- `packages.html` — Research Packages
- `family-trees.html` — Family Trees
- `family-histories.html` — Family Histories
- `records.html` — Historical Records
- `faq.html` — Frequently Asked Questions
- `contact.html` — Contact
- `privacy.html` — Privacy Policy

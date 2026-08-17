# Badesha Electrical website

Production website for Badesha Electrical Ltd., built with Next.js and hosted on Netlify.

## Business details

- Website: `https://badeshaelectrical.com`
- Netlify fallback: `https://badesha-electrical.netlify.app`
- Phone: `604-780-6000`
- Project inquiries: `projects@badeshaelectrical.com`
- General inquiries: `info@badeshaelectrical.com`
- Office: `12777 76A Ave Unit 1A, Surrey, BC V3W 1S9`
- Office hours: Monday to Friday, 7:00 a.m. to 5:00 p.m.

## Local development

Requires Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm test
git diff --check
```

`npm test` creates a production build and verifies rendered routes, metadata, schema, contact details and delivery configuration.

## Contact form

The project inquiry form uses Netlify Forms. No separate database or form server is required.

- Form name: `project-inquiry`
- Visible form: `/contact`
- Static Netlify form definition: `/public/forms.html`
- Success fallback: `/thank-you`
- Spam protection: honeypot field
- Submission storage: Netlify project dashboard under **Forms**
- Notification recipient: `projects@badeshaelectrical.com`

Do not remove `public/forms.html`; Netlify's Next.js runtime uses it to discover the form during deployment.

## Analytics

Analytics is handled by Netlify Web Analytics at the hosting layer. It does not add a client-side tracking script or cookie banner requirement. View reports under **Logs & Metrics → Analytics** in the Netlify project.

## SEO and local discovery

The repository includes page-specific metadata and canonicals, Open Graph and social cards, robots.txt, sitemap.xml, Electrician/LocalBusiness schema, service and project schema, location landing pages, redirects for legacy URLs, accessible image descriptions and a custom 404 page.

The production canonical domain is set in `app/content.ts`. Update it there first if the primary domain changes.

## Deployment

The site is connected to:

- GitHub repository: `gurnoorbassi/badesha-electrical-website`
- Netlify project: `badesha-electrical`
- Netlify project ID: `35454e58-00f6-4cd6-b180-8384938e6ed3`
- Production branch: `main`

Netlify builds with `npm run build` and publishes the Next.js output from `.next`.

## Client transfer checklist

1. Invite the client to the GitHub repository and transfer repository ownership when ready.
2. Invite the client to the Netlify team/project with Owner access.
3. Confirm the client's domain registrar and DNS access.
4. Confirm `badeshaelectrical.com` is the primary Netlify domain and HTTPS is active.
5. Confirm `projects@badeshaelectrical.com` receives a real form notification.
6. Show the client where submissions and analytics live in Netlify.
7. Remove AG Digital access only after the client confirms GitHub, Netlify, DNS and email access.

No secrets are stored in this repository.

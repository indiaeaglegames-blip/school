# SciSphere | Virtual Labs for Learning Science

A responsive, low-bandwidth learning website for high school students. The eight subject pathways are Physics, Chemistry, Biology, Mathematics, History, Yoga, Sports, and Robotics. Each pathway includes five modules, lesson explanations, key points, activities, module knowledge checks, project challenges, and a glossary.

## Included

- 40 subject modules with 120 lesson activities.
- Six lightweight interactive labs: Ohm’s Law, pH Explorer, Cell Explorer, Gentle Breathing Awareness, Reaction-Time Mini Test, and Robot Path Planning.
- Lesson completion and quiz scores saved in this browser’s local storage. Progress does not sync to other devices.
- Responsive mobile navigation, keyboard access for subject cards and lab controls, and reduced-motion support.
- Contact form that opens a draft in the visitor’s email app addressed to **djs07760@gmail.com**. The website cannot confirm sending or delivery.
- Suggestion box saved only in the current browser under `urx96-suggestions`. It is not sent to the team or visible from other devices.

## Run locally

1. Keep `index.html`, `style.css`, `content.js`, and `script.js` together.
2. Open `index.html` in a current browser. For consistent local storage behavior, run a static server from this folder:

   ```sh
   python -m http.server 8000
   ```

3. Visit `http://localhost:8000`. This static server supports the site’s local learning features; account deletion runs through the deployed Vercel API. To exercise it locally, run the project with `vercel dev` and local environment variables (never commit them).

No package install or build step is needed. The styles use system-font fallbacks; the site does not fetch external fonts, images, APIs, or libraries.

## Accounts (Supabase setup required)

The account screen supports email/password registration, login/logout, email-verification and password-reset links, a personal dashboard, a browser-progress privacy toggle, and confirmed account deletion. Registration and login stay disabled with a setup notice until a Supabase project is connected. Passwords are sent directly to Supabase Auth; they are never saved by the website.

1. Create a Supabase project and enable email/password sign-in. Keep email confirmation enabled.
2. In Supabase Authentication URL settings, set the site URL to `https://school-one-sable.vercel.app` and add `https://school-one-sable.vercel.app/**` as a redirect URL. Add your local development URL (for example `http://localhost:8000/**`) while testing.
3. Configure a trusted SMTP sender in Supabase if verification and password-reset messages must reach student addresses reliably.
4. Copy the project's **Project URL** and **publishable/anon key** into `auth-config.js`. These are public browser settings; never put a service-role or secret key there.
5. In Vercel Project → Settings → Environment Variables, add `SUPABASE_URL` and either `SUPABASE_SECRET_KEY` (recommended) or `SUPABASE_SERVICE_ROLE_KEY` for the server-side account deletion function. Keep that key only in Vercel’s server-side environment variables, then redeploy. Never commit it.
6. After deployment, register a test account, verify its email, log in, request a password reset, and use the delete-account confirmation flow. Do not use a real student's account during setup.

The delete endpoint uses the official Supabase server SDK to verify the caller's access token before deleting that same authenticated user. The secret/service-role key is used only in the Vercel function. Local progress is optional and controlled by the dashboard privacy setting; suggestions and problem reports remain separate local-only demo data. Account deletion does not erase those browser-local records. For shared progress or feedback across devices, add database tables with row-level security and an explicit retention policy.

Vercel automatically deploys Node.js functions placed under the repository-root `api/` directory. The included endpoint is `/api/account/delete`.

## Contact and suggestions

The contact form validates the required email, subject, and message, then prepares a `mailto:` draft. The visitor must review and send it. No frontend API key or password is used, and the site does not report delivery success. The project email is linked in the contact section and footer.

The suggestion form validates a non-empty message and stores the optional name/email, user type, category, rating, and date locally. A thank-you message states that the suggestion remains on this device and has not been sent to the team. Clearing browser storage can erase it. This prototype has no shared database, admin page, or cross-device review.

For shared submissions later, connect a backend or hosted form service, add server-side validation and spam protection, describe privacy and retention, and protect any team review page with real authentication and server-side authorization. Never put service keys in browser code.

## Hosting

Deploy the folder containing `index.html` to a static HTTPS host such as GitHub Pages, Netlify, or Vercel. There is no build command; the publish directory is the folder containing `index.html`. The current GitHub Pages address is <https://indiaeaglegames-blip.github.io/school/>. Keep `style.css`, `content.js`, and `script.js` next to `index.html` when uploading. A custom domain can be connected through the host’s domain settings.

## Educational safety and limits

All simulations are simplified learning models. The breathing animation is not instruction to hold or force a breath and is not medical advice. The reaction-time activity is an on-screen mini test, not a sports assessment. The robot path activity does not control hardware. Real yoga or sports activity should be optional, adapted, and appropriately supervised. Real robotics and chemistry work must follow teacher direction, equipment documentation, protective measures, and local safety rules.

## Customize

Edit `content.js` to add or revise subjects. Each subject has `outcomes`, `modules`, `projects`, and `glossary`; lessons include `title`, `content`, `points`, and `activity`. Keep subject IDs unique and add a matching accent color and tint in `script.js`.


## Support, problem reports, reviews, and status tracking

The support area includes an FAQ, a problem report form, locally saved reviews and ratings, and a reference lookup. The problem report and review forms use browser Local Storage. Each saved report gets a reference number; the tracker can find it only in the same browser profile and on the same device. It shows the local save date, not a team response or review status. Suggestions also receive a reference number for this lookup.

The Email the project team link opens a pre-addressed email draft to **djs07760@gmail.com**. The visitor must send the email. The site cannot confirm delivery. No support submissions, reviews, or suggestions are publicly visible or shared with the project team in this prototype. Clearing browser storage can remove local records.

To enable real cross-device support and feedback tracking, replace the local-storage handlers with a backend or hosted form service. Store records server-side, return opaque reference IDs, and expose status updates only through an authenticated support dashboard or a protected user lookup. Add consent, retention, access controls, server-side validation, rate limiting, and spam protection before collecting real student data.


## Branding

The website brand is SciSphere, with a text-based wordmark and a lightweight SVG favicon. The tagline is “Explore Science. Experiment. Discover.” Internal browser storage key names retain their original identifiers so returning learners do not lose locally saved progress or suggestions.

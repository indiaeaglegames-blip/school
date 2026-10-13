# URX96 Virtual Labs

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

3. Visit `http://localhost:8000`.

No package install or build step is needed. The styles use system-font fallbacks; the site does not fetch external fonts, images, APIs, or libraries.

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

# ASHWINI School Virtual Labs

A lightweight, single-page learning site for high school students. It runs in a browser without accounts, external APIs, or downloaded libraries. The HTML file contains the styles, illustrations, simulations, quizzes, and local progress features.

## Run the site

1. Keep `rural-virtual-labs.html` and this README in the same folder.
2. Open `rural-virtual-labs.html` in a current browser. The simulations work directly from the downloaded file.
3. For a local web-server demonstration, open a terminal in this folder and run:

   ```sh
   python -m http.server 8000
   ```

4. Open `http://localhost:8000/rural-virtual-labs.html` in the browser.

No build step, login, or network connection is required after the files are available. Saved worksheets, recorded readings, quiz results, and completion status use this browser's local storage. They do not sync to other devices and can be cleared by clearing browser site data.

## Project structure

- `rural-virtual-labs.html` — the complete application: page structure, responsive styles, experiment definitions, interactive models, quiz bank, worksheets, and local progress tracking.
- `index.html` — a small hosting entry point that forwards the site root to the complete application.
- `README.md` — setup and exhibition guide.

## Contact Us and Suggestion Box

- The Contact Us form validates the required email, subject, and message, then opens the visitor's email app using `mailto:` addressed to **djs07760@gmail.com**. The visitor reviews and sends the draft in their own email app. The website cannot verify whether it was sent or delivered, and it does not display a delivery success claim.
- Suggestions are saved to the browser's `localStorage` under `ashwini-suggestions`. The confirmation explicitly says they are saved only on the current device. They are not sent to the project team and cannot be reviewed from other devices.
- Name and email in the suggestion form are optional. Students should avoid entering private information. Clearing browser site data may delete locally saved suggestions.
- This prototype has no shared suggestion database or protected admin page. Do not use it to collect suggestions across devices until a backend, access controls, and a retention policy are configured.

### Adding a different team email

Update `TEAM_EMAIL` in the final inline script in `rural-virtual-labs.html` and the footer `mailto:` address. The `mailto:` flow uses the visitor's email client; it does not need API keys. For reliable server-side delivery, use a trusted form/email service or serverless function. Keep provider credentials in server-side environment variables, never in the HTML or browser JavaScript.

### Future shared suggestions and admin review

For cross-device submissions, replace the local-storage handler with a server endpoint or a managed database such as Supabase. Validate and rate-limit submissions on the server, restrict stored personal information, and define who can access it. Build the admin view behind real authentication and server-side authorization; filter by category and store review status (`New`, `Reviewed`, `Resolved`) in the database. Never rely on a hidden frontend route or a password embedded in JavaScript as admin protection. Keep service-role keys on the server only.

## Hosting and mobile access

The current folder is a static-site source. To publish it, deploy the folder containing `index.html` and `rural-virtual-labs.html` to a static host over HTTPS:

- **GitHub Pages:** place both site files at the repository root, then enable Pages for the chosen branch and root folder in repository settings.
- **Netlify:** deploy the folder containing `index.html` using Netlify's site deploy flow, or connect a repository for automatic updates.
- **Vercel:** import the repository as a static project and deploy the directory containing `index.html`.

After publishing, open the HTTPS URL on a phone and desktop and follow the testing checklist below. A custom domain can be connected later through the hosting provider's domain settings. This workspace has not been connected to a hosting project, so no public deployment URL is configured yet.

The navigation includes a touch-friendly mobile menu. The layouts collapse to one column on narrow screens; simulation controls use native range and select inputs. The page uses no external libraries, fonts, or images, which keeps its download small. It can be opened from a local download without network access; local-storage support depends on the browser, so use the local HTTP-server option when demonstrating persistence.

## First version features

- **Physics:** simple pendulum, Ohm's law, and reflection of light.
- **Chemistry:** pH indicator, separating mixtures, and states of matter.
- **Biology:** microscope explorer and a photosynthesis factors model.
- **Mathematics:** an adjustable linear-equation graph.
- **History:** source comparison and a community-history timeline prompt.
- Experiment library search and subject/difficulty filters.
- Step-by-step instructions, virtual apparatus, model observations, explanations, and recorded result tables.
- Five-question quizzes with instant feedback and saved best scores.
- Worksheets, completion progress, and a teacher discussion mode.

## Testing checklist

Open the site and check the following:

1. Home subject cards open the library with the selected subject filter.
2. Search text and subject/difficulty filters change the experiment cards; clear the search to restore the list.
3. Open each of the eight science experiments and move every slider or select a different option. Confirm the result and illustration update.
4. Record two readings in an experiment and confirm both appear in its table and in the Worksheet page.
5. Reset the experiment and confirm controls return to their starting values.
6. Try each subject quiz, select answers, check feedback and score, then reload and confirm progress/results remain on that browser.
7. Save a worksheet, change to another experiment and back, and confirm the saved fields return.
8. Resize to a phone-sized viewport and confirm navigation, cards, controls, and tables remain usable.
9. Disconnect from the network and reopen the local HTML file. Core content and simulations should remain available.
10. Submit the Contact Us form with missing and malformed values; confirm validation. With valid values, confirm the email app opens a prefilled draft and the site says it cannot confirm delivery.
11. Submit a valid suggestion, confirm the thank-you message says it is local only, reload, and verify the saved-device count. Try an invalid optional email and an empty suggestion.
12. On a phone-sized screen, open and close the Menu button and follow each subject/contact/suggestion link.

## Exhibition demonstration

1. Open the site before presenting and start on the Home page.
2. Filter for Physics and demonstrate the pendulum or Ohm's law model. Change one control, predict the next result, and record two trials.
3. Demonstrate the Chemistry indicator and Biology microscope or photosynthesis model. Explain that the simulations are simplified educational models.
4. Open Mathematics to connect an equation with its graph, then use History to discuss how sources can offer different perspectives.
5. Complete a short quiz and show the score, progress tracker, and saved worksheet.
6. Explain that notes and progress are stored only in the current browser. They are not a student account or cloud backup.

## Notes for teachers

These models support learning and discussion; they are not substitutes for supervised lab work or safety instructions. The pH examples are illustrative. The separation, particle, cell, pendulum, circuit, and photosynthesis visuals simplify real systems. Ask learners to compare a model's predictions with evidence and to identify what it leaves out.

# CareerQuest

CareerQuest is a career-planning workspace for exploring technology roles and turning a selected career into a trackable skills plan. Learners can assess their interests, save a career target, compare their skills with career requirements, build a roadmap, find learning resources, organize tasks and notes, and review completed assessments.

## Requirements

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm
- An internet connection for authentication, career data, and learning-resource searches

## Install and Run

From the project root:

```sh
npm ci
npm run dev
```

Vite serves the app at `http://127.0.0.1:5173`. The configured port is strict; stop another process using that port before starting the app.

Production verification:

```sh
npm run build
npm run lint
npm run preview
```

`npm run build` runs TypeScript project builds followed by the Vite production bundle. `npm run lint` runs Oxlint. There is currently no dedicated automated test script in `package.json`.

## Product Areas

| Route | Screen | Main capability |
| --- | --- | --- |
| `/` | Home | Product overview and links into sign-up, sign-in, and career exploration |
| `/signin` | Sign in | Authenticate an existing account |
| `/signup` | Sign up | Create an account and start a session |
| `/dashboard` | Dashboard | Current task totals, target-roadmap completion, saved profile-skill count, upcoming skills, and workspace links |
| `/careers` | Career Explorer | Search ESCO occupations, save careers, and choose a target |
| `/careers/:careerId` | Career details | Review an occupation and its essential/optional skills; save it or make it the target |
| `/assessment` | Career Assessment | Complete the career-interest questionnaire |
| `/skill-gap` | Skill Gap | Compare profile skills with the selected target career's skills |
| `/roadmap` | My Roadmap | Create and update a checklist from the target career's essential skills |
| `/tasks` | My Tasks | Search, filter, create, edit, complete, and delete learning tasks |
| `/notes` | Notes | Create, search, edit, and delete personal notes |
| `/resources` | Learning Resources | Search Dev.to articles by skill, including profile-skill suggestions |
| `/history` | Assessment History | Review saved completed assessments and remove history entries |
| `/profile` | My Profile | Edit the account name and profile skills; view target and roadmap progress |
| `/settings` | Settings | Review account/session details and sign out |
| Any unmatched path | Not found | Display the public not-found screen, including when signed out |

All product workspace routes require an authenticated session. The home, sign-in, sign-up, and not-found routes are public. The `/api-test` developer page is not part of the product and is not registered.

## Typical Learner Journey

1. Create an account on `/signup`. The sign-up form validates required fields, an eight-character minimum password, and matching password confirmation. A successful registration starts a session and opens the dashboard.
2. To verify a separate sign-in, sign out from `/settings`, then authenticate at `/signin`.
3. Open `/careers`, search for a role, open its details, save it, and select it as the target career.
4. Open `/profile` and add comma-separated skills you already have.
5. Review `/skill-gap` to compare those skills against the target occupation.
6. Create a skills checklist at `/roadmap` and update roadmap items as you work through them.
7. Search for a skill at `/resources` to find related articles.
8. Use `/tasks` and `/notes` to create, update, complete, search, and remove personal learning items.
9. Complete `/assessment`, then inspect the saved attempt on `/history`.
10. Revisit `/profile` and `/settings`, and sign out.

The dashboard reads the same task list used by the Tasks page, the persisted target career and matching roadmap, and profile skills. Completion counts and percentages update when those records change; unavailable data is shown as an empty/zero state rather than invented learning hours or a fabricated track.

## Data and Integrations

- **Authentication:** the public Platzi Fake Store API at `https://api.escuelajs.co/api/v1` handles demo registration, login, profile loading, and name updates. Credentials are sent to that external service. Account availability, validation rules, and uptime are controlled by the service, not CareerQuest.
- **Career search and skills:** the European Commission ESCO API at `https://ec.europa.eu/esco/api` supplies occupation and essential/optional skill data.
- **Learning resources:** the Dev.to API at `https://dev.to/api` supplies article search results by skill tag.
- No environment variables are required for the current configuration. API base URLs are defined in `src/lib/apiConfig.ts`.
- Authentication session data is stored in `sessionStorage` and ends when the browser session is cleared or the user signs out.
- Tasks, notes, saved careers, target career, and profile skills are stored in browser `localStorage`. Roadmap and assessment state/history are persisted by Zustand in browser storage. These are browser-local demo data, not synchronized between devices or accounts.
- A browser with network access is required for registration/sign-in, ESCO career lookups, and Dev.to article lookups. API outages, CORS restrictions, or rate limits may affect those screens; the UI reports loading, empty, and error states.

## Project Structure

```text
src/
  app/                 App providers
  components/          Shared workspace shell and components
  data/                Local question and initial task definitions
  features/             Assessment feature UI
  hooks/                API query and browser-storage hooks
  lib/                  Axios instance and API configuration
  pages/                Route-level screens and page styles
  routes/               Route definitions and access control
  services/             Authentication, career, and resource integrations
  store/                Persisted Zustand assessment and roadmap state
  types/                Shared domain types
```

Page-level styles live beside their page components. `src/index.css` contains document-wide resets, font setup, shared design tokens, shared animation keyframes, and the global reduced-motion rule. The public landing page and sign-in page have dedicated `HomePage.css` and `SignInPage.css` stylesheets; sign-in also uses shared auth-form rules from `SignUpPage.css`.

## Route and Journey Verification

After starting the dev server, check every route directly in the address bar. Use a valid demo account and network connection for protected screens and external data workflows.

| Check | Expected result |
| --- | --- |
| `/` | Home page renders; primary links navigate to sign-up/sign-in |
| `/signin` | Sign-in form renders; invalid credentials show an error; valid credentials open the dashboard |
| `/signup` | Form validation is visible; successful registration opens the dashboard |
| `/dashboard` | Signed-in user sees data-backed task and roadmap totals |
| `/careers` | Career search/recommendations render or a clear API error state appears |
| `/careers/:careerId` | A selected career's details render from ESCO, with save and target actions |
| `/assessment` | Assessment questions and navigation render; completion is recorded |
| `/skill-gap` | Current profile skills are compared with the selected career when available |
| `/roadmap` | A roadmap can be created from the target career and its skills updated |
| `/tasks` | Task search/filter and create/edit/complete/delete actions work |
| `/notes` | Note search and create/edit/delete actions work |
| `/resources` | Skill search returns articles or a clear empty/error state |
| `/history` | Completed assessment appears, can be reviewed, and can be removed |
| `/profile` | Name and skills can be edited; career and progress reflect current data |
| `/settings` | Account/session summary renders; sign-out clears the session and returns home |
| `/invalid-route` | Not-found screen renders whether signed in or signed out |

Then perform the full journey in order: **Sign up → Sign out → Sign in → Dashboard → Career Explorer → Search career → Career Details → Save career → Set target → Profile: add skills → Skill Gap → Roadmap → Complete roadmap skills → Resources → Tasks CRUD → Notes CRUD → Assessment → Assessment History → Profile / Settings → Sign out.** Confirm dashboard values change after task and roadmap updates. Browser-local records persist across page navigation and reloads in the same browser profile.

## Accessibility and Responsive Behavior

Forms have labels and validation feedback; route and task controls use semantic buttons/links; mobile workspace navigation has open/close controls; progress indicators expose ARIA progress values; and the global reduced-motion preference disables motion effects.
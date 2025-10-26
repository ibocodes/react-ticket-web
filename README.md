# TicketApp — React implementation (Stage 2)

This repository contains the React implementation for the HNG Stage 2 Ticket Web App.

## What is included

- A React + TypeScript app scaffolded with Vite.
- Features: Landing, Authentication (signup/login), Dashboard, Ticket management (CRUD).
- Simple simulated authentication using `localStorage` with key `ticketapp_session`.

## Quick start

1. Install dependencies

```powershell
cd "c:\Users\User PC\Desktop\HNG-INTER\stage2-framework\my-app"
npm install
```

2. Run development server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

## Example test credentials

- Username: `user@example.com`
- Password: `password123`

> Note: Authentication is simulated — any non-empty username/password will succeed and create a session token in `localStorage` under the key `ticketapp_session`.

## Project layout (key files)

- `src/App.tsx` — application root, routes and layout.
- `src/pages/landing.tsx` — Landing page (wave hero + decorative circles).
- `src/pages/authlogin.tsx`, `src/pages/authsignup.tsx` — Login and Signup screens (form validation, redirects).
- `src/pages/dashboard.tsx` — Dashboard with summary stats.
- `src/pages/tickets.tsx` — Ticket management page (Create, Read, Update, Delete).
- `src/components/Toast.tsx` — toast notifications UI.
- `src/utils/auth.ts` and `src/utils/storage.ts` — simple auth and storage helpers.
- `public/assets/wave.svg` — hero wave SVG used on the landing page.

## How auth & protected routes work

- On login/signup the app sets a token in `localStorage` named `ticketapp_session`.
- `ProtectedRoute` checks for this token and redirects to `/auth/login` if missing.

## Accessibility & design notes

- The app uses semantic HTML and includes focus-visible styles for keyboard users.
- The layout is centered with `max-width: 1440px` and responsive breakpoints applied.
- Status colors: `open` → green, `in_progress` → amber, `closed` → gray.

## Known limitations

- This repository contains only the React implementation. Vue and Twig implementations are not included.
- Authentication and persistence are simulated for the purpose of the task.

If you want, I can also create a short checklist file that maps each Stage 2 requirement to the file/line where it is implemented.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

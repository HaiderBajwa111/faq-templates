# FAQ Templates Showcase — Setup & Run

This document explains how to set up, run and test the Next.js + Prisma FAQ Templates Showcase locally.

## Prerequisites
- Node.js 18+ (recommended). Verify with `node -v`.
- npm (or yarn/pnpm) installed.
- A local PostgreSQL server running and accessible. Create a database named `faq_templates` (or update `DATABASE_URL`).

On Debian/Ubuntu you can install Postgres with:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE DATABASE faq_templates;"
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD 'password';"
```

Adjust the above as needed for your environment.

## Files created by the project
- `prisma/schema.prisma` — Prisma model for `Template`.
- `.env.example` — example env file (copy to `.env`).
- `prisma/seed.ts` — seed script creating starter templates.
- `lib/prisma.ts`, `lib/helpers.ts` — Prisma client and helper.

## 1) Copy env and configure
Copy `.env.example` to `.env` and set values. At minimum update `DATABASE_URL` and `ADMIN_PASSWORD`.

```bash
cp .env.example .env
# Edit .env with your editor and adjust values
```

Expected `.env` keys:
- `DATABASE_URL` — Example: `postgresql://postgres:password@localhost:5432/faq_templates`
- `ADMIN_PASSWORD` — simple admin password used for the admin login and cookie (store a safe value locally).

## 2) Install dependencies

```bash
npm install
```

Notes:
- If you prefer yarn or pnpm, run the equivalent (`yarn` or `pnpm install`).

## 3) Prisma: generate client and push schema
Generate the Prisma client so `lib/prisma.ts` can import it:

```bash
npx prisma generate
# push schema to the database (creates tables) without migrations:
npx prisma db push
```

Alternatively, use migrations:

```bash
npx prisma migrate dev --name init
```

## 4) Seed the database
The project includes a seed script at `prisma/seed.ts`. Run the seed to populate starter templates:

```bash
npm run prisma:seed
```

This will insert 4 example templates into the `Template` table.

## 5) Tailwind CSS setup (quick)
The project includes Tailwind directives in `app/globals.css` but may not yet include a Tailwind config. To enable Tailwind CSS fully, run:

```bash
npx tailwindcss init -p
```

Then update `tailwind.config.js` `content` to include the `app` and `components` folders; example config:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

If you want the exact PostCSS config, create `postcss.config.js` with:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```

After that, restart the dev server so Tailwind can pick up config.

## 6) Run development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 7) Admin panel
- Visit: `http://localhost:3000/admin`
- Login with the password you set in `.env` as `ADMIN_PASSWORD`.
- After logging in, you can add, edit, delete, and publish templates.

Notes on auth/security:
- The current auth implementation stores the admin password value in an `httpOnly` cookie named `admin_auth` (simple by spec). For production use replace this with a secure session/token (signed cookie, JWT, or server-side session store) and enable cookie `secure` and proper SameSite settings.

## 8) Build for production

```bash
npm run build
npm start
```

Ensure environment variables are set for the production environment (DATABASE_URL, ADMIN_PASSWORD, NODE_ENV=production, etc.).

## Troubleshooting
- Missing dependencies / types: If your editor complains about missing types (React/Next types), run `npm install --save-dev @types/node` and ensure `react`/`next` are installed. The `package.json` included earlier lists Next 14 and React 18.
- Database connection: If Prisma cannot connect, double-check `DATABASE_URL` and Postgres server status. Use `psql $DATABASE_URL` or `PGPASSWORD=... psql -h host -U user -d dbname` to test connectivity.
- Prisma client errors: run `npx prisma generate` after changing `schema.prisma`.

## Useful commands summary

```bash
# install deps
npm install

# run dev
npm run dev

# generate prisma client
npx prisma generate

# push schema (no migrations)
npx prisma db push

# run seed
npm run prisma:seed

# build for prod
npm run build
npm start
```

## Next steps (optional suggestions)
- Wire up publish/delete actions in the admin table UI (client fetch + optimistic update).
- Replace plain cookie auth with a signed/session-based auth for production.
- Add E2E tests for the admin workflows.

If you'd like, I can also add a ready-to-go `tailwind.config.js` and `postcss.config.js` to the repo and wire the admin table action buttons to the API (delete/toggle publish). Which should I do next?

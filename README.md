# jorge-moreira.github.io

Personal portfolio website built with modern web technologies, available at [jorge-moreira.dev](https://jorge-moreira.dev).

## 🚀 Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **Package Manager:** Bun
- **UI Library:** shadcn/ui components (Button, Card, Badge, Separator, DropdownMenu)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **PDF Generation:** @react-pdf/renderer
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions
- **Deployment:** GitHub Pages (custom domain: `jorge-moreira.dev`)

## 📦 Prerequisites

- [Bun](https://bun.sh) v1.3+ installed

## 🛠️ Development

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Run tests
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with UI
bun run test:ui

# Run linter
bun run lint
```

## 🏗️ Project Structure

```
├── src/
│   ├── components/      # React components
│   │   ├── ui/         # shadcn/ui components
│   │   ├── CVPdfTemplate.tsx  # PDF template
│   │   ├── Navbar.tsx
│   │   └── Timeline.tsx
│   ├── pages/          # Page components (Home, CV, Projects, Contact)
│   ├── models/         # TypeScript interfaces (Profile, Experience, Skill, etc.)
│   ├── repositories/   # Data access layer (repository pattern)
│   ├── hooks/          # Custom React hooks (theme)
│   └── lib/            # Utilities (PDF generation, ATS resume generation)
├── public/
│   ├── data/           # JSON data files (profile, experiences, skills, etc.)
│   └── CNAME           # Custom domain for GitHub Pages
├── .github/
│   └── workflows/      # CI/CD pipelines (ci.yml, deploy.yml)
└── old/                # Previous implementation (preserved)
```

## 🎨 Features

- ✅ Single Page Application (SPA) with React Router
- ✅ Dark/Light mode with system preference detection
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Styled PDF CV export
- ✅ ATS-friendly plain-text resume export
- ✅ Download split button (PDF + ATS dropdown)
- ✅ Repository pattern for data management
- ✅ Comprehensive test suite (87 tests)
- ✅ Automated CI/CD with GitHub Actions
- ✅ Custom domain via `public/CNAME`
- ✅ SEO optimized with meta tags

## 📄 Pages

- **Home** — Introduction with bio, "What I stand for", "Beyond the keyboard" sidebar, social links, and profile info
- **CV** — Professional experience timeline with location and dates, skills grouped by category, education, and download options (PDF + ATS)
- **Projects** — Portfolio of projects; cards with link open the full project on click
- **Contact** — Social links and contact information

## 🧪 Testing

The project includes a comprehensive test suite with 87 tests covering:
- Data repositories (JSONDataSource)
- PDF generation utilities
- ATS resume generation
- Page components (Home, CV)
- Navigation component
- Theme functionality

All tests run with Vitest and React Testing Library.

## 🚢 Deployment

The site automatically deploys to [jorge-moreira.dev](https://jorge-moreira.dev) when changes are pushed to the `main` branch via GitHub Actions.

- **CI Pipeline:** Runs on PRs and non-main branch pushes (lint, test, build)
- **Deploy Pipeline:** Runs on `main` branch pushes (build + deploy to GitHub Pages)
- **Custom domain:** Persisted via `public/CNAME` — survives every deploy

## 📝 Data Management

Content is managed through JSON files in `public/data/`:
- `profile.json` — Personal info, bio, focus areas, social links, "What I stand for", and "Beyond the keyboard" interests
- `experiences.json` — Work history with location, month/year dates, descriptions, and tech stack
- `skills.json` — Technical skills grouped by category
- `education.json` — Educational background
- `projects.json` — Project portfolio with tech stacks and links
- `languages.json` — Spoken languages and levels

Edit these files to update site content without touching any code.

## ⚠️ Important Notes

**Always use Bun** — This project uses Bun exclusively:
- Use `bun add` instead of `npm install`
- Use `bunx` instead of `npx`
- Use `bun run` instead of `npm run`
- CI/CD pipelines use Bun (`oven-sh/setup-bun@v2`)

## 📜 License

Personal portfolio — all rights reserved.


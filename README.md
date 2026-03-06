# jorge-moreira.github.io

Personal portfolio website built with modern web technologies.

## 🚀 Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **Package Manager:** Bun
- **UI Library:** shadcn/ui components
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **PDF Generation:** @react-pdf/renderer
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions
- **Deployment:** GitHub Pages

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
│   │   └── ui/         # shadcn/ui components
│   ├── pages/          # Page components (Home, CV, Projects, Contact)
│   ├── models/         # TypeScript interfaces
│   ├── repositories/   # Data access layer
│   ├── hooks/          # Custom React hooks (theme)
│   └── lib/            # Utilities (PDF generation, etc.)
├── public/
│   └── data/           # JSON data files (profile, experiences, skills, etc.)
├── .github/
│   └── workflows/      # CI/CD pipelines
└── old/                # Previous implementation (preserved)
```

## 🎨 Features

- ✅ Single Page Application (SPA) with React Router
- ✅ Dark/Light mode with system preference detection
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ PDF CV export
- ✅ Repository pattern for data management
- ✅ Comprehensive test suite (76 tests)
- ✅ Automated CI/CD with GitHub Actions
- ✅ SEO optimized with meta tags

## 📄 Pages

- **Home** - Introduction with bio, social links, and profile info
- **CV** - Professional experience timeline, skills, and education
- **Projects** - Portfolio of projects with tech stacks
- **Contact** - Social links and contact information

## 🧪 Testing

The project includes a comprehensive test suite with 76 tests covering:
- Data repositories (JSONDataSource)
- PDF generation utilities
- Page components (Home, CV)
- Navigation component
- Theme functionality

All tests run with Vitest and React Testing Library.

## 🚢 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

- **CI Pipeline:** Runs on PRs and branch pushes (lint, test, build)
- **Deploy Pipeline:** Runs on main branch (build + deploy to GitHub Pages)

## 📝 Data Management

Content is managed through JSON files in `public/data/`:
- `profile.json` - Personal information and bio
- `experiences.json` - Work history
- `skills.json` - Technical skills grouped by category
- `education.json` - Educational background
- `projects.json` - Project portfolio

Edit these files to update site content.

## ⚠️ Important Notes

**Always use Bun** - This project uses Bun exclusively:
- Use `bun add` instead of `npm install`
- Use `bunx` instead of `npx`
- Use `bun run` instead of `npm run`
- CI/CD pipelines use Bun (`oven-sh/setup-bun@v2`)

## 📜 License

Personal portfolio - all rights reserved.


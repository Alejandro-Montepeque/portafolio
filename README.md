# Portafolio — Alejandro Montepeque

Portafolio personal en React + TypeScript + Vite + Tailwind con dark mode,
i18n (ES/EN) y formulario validado con Zod. Despliega a Google Cloud Run vía
GitHub Actions con Workload Identity Federation.

## Stack

- React 18 + Vite 5 + TypeScript
- TailwindCSS 3
- Framer Motion
- Zod
- react-icons

## Estructura

```
src/
  components/        Navbar, BackgroundFX, LangToggle, SectionHeader, SkillIcon
  sections/          Hero, About, Skills, Projects, Experience, Contact, Footer
  data/              skills.ts, projects.ts, contact.ts
  i18n/              I18nContext.tsx, translations.ts
  validation/        contactSchema.ts
public/
  cv.pdf             CV descargable
  avatar.png         Foto del About
```

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build        # tsc -b && vite build
npm run lint
npm run format
```

Pre-commit hooks (husky + lint-staged) corren eslint y prettier sobre los
archivos staged automáticamente.

## Personalización

- `src/data/contact.ts` — email, github, linkedin, teléfono, ubicación.
- `src/data/projects.ts` — proyectos a mostrar.
- `src/data/skills.ts` — stack agrupado por categoría.
- `src/i18n/translations.ts` — textos ES/EN.
- `public/cv.pdf` — CV descargable.
- `public/avatar.png` — foto del About.

## Despliegue

Ver [DEPLOY.md](./DEPLOY.md) para deploy manual y [CICD.md](./CICD.md) para
auto-deploy con GitHub Actions.

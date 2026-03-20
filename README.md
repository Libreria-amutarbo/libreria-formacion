# DCX NG Components

Angular component library and demo application built in an Nx workspace.

## Overview

This repository contains:

- `dcx-ng-lib`: reusable Angular UI components.
- `dcx-ng-components`: demo app used to preview and test components.
- Storybook setup for component documentation.

## Tech Stack

- Angular 20
- Nx
- TypeScript
- Storybook
- Jest
- SCSS

## Project Structure

```text
libreria-formacion/
│
├── libs/dcx-ng-lib/                          # 📚 LIBRARY (your components live here)
│   ├── src/lib/
│   │   ├── dcx-ng-components/                # Library components
│   │   ├── core/
│   │   │   ├── interfaces/                   # Component types and interfaces
│   │   │   └── mock/                         # Mock data for tests and Storybook
│   │   ├── services/                         # Services (IconService, DialogService)
│   │   └── stories/                          # Storybook stories
│   └── src/scss/                             # Style system (tokens, variables, mixins)
│
├── src/                                      # 🖥️ DEMO APPLICATION
│   ├── app/pages/                            # Demo pages to test each component
│   ├── app/app.routes.ts                     # App routes
│   └── app/core/constants/                   # Route constants
│
└── .github/workflows/                        # ⚙️ CI/CD (GitHub Actions)
```

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

```bash
git clone https://github.com/Libreria-amutarbo/libreria-formacion.git
cd libreria-formacion
npm install
```

### Run Demo App

```bash
npm start
```

Default URL: `http://localhost:4200`

## Scripts

```bash
npm start
npm test
npm run start-storybook
npm run lint
npm run lint-fix
npx nx build dcx-ng-lib
npx nx build dcx-ng-components
```

## Component Development

Library components are created under:

`libs/dcx-ng-lib/src/lib/dcx-ng-components/`

Generate a component:

```bash
npx nx g c dcx-ng-COMPONENT_NAME
```

To preview it in the demo app, create a page component and register it in routes:

- `src/app/core/constants/app-routes.ts`
- `src/app/app.routes.ts`

## Storybook

Stories location:

`libs/dcx-ng-lib/src/lib/stories/`

Run locally:

```bash
npm run start-storybook
```

Online Storybook:

- Develop: https://libreria-amutarbo.github.io/libreria-formacion/develop/
- Main: https://libreria-amutarbo.github.io/libreria-formacion/main/

## Testing

Run all tests:

```bash
npm test
```

Run library tests only:

```bash
npx nx test dcx-ng-lib
```

Coverage:

```bash
npx nx test dcx-ng-lib --coverage
```

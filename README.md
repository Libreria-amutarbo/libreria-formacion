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

To generate a component, the first step is to navigate to the library folder _libs/dcx-ng-lib/src/lib/dcx-ng-components_, and run the command:

`libs/dcx-ng-lib/src/lib/stories/`

Run locally:

```bash
npm run start-storybook
```

Then you select the option **@nx/angular:component**. We will create it in the folder associated with that component (_e.g., dcx-ng-button/dcx-ng-button_) and with the name of the component to be developed (_e.g., button)_.

## Consulta de la librería

[Develop](https://libreria-amutarbo.github.io/libreria-formacion/develop/?path=/docs/dcxlibrary-breadcrumb-class-based--docs)
[Main](https://libreria-amutarbo.github.io/libreria-formacion/main/?path=/docs/dcxlibrary-breadcrumb-class-based--docs)

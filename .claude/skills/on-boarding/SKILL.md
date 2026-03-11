---
name: on-boarding
description: Helps a new developer understand the project structure, stack, workflows and conventions. Use when a developer asks to understand the project, get started, or learn how it works.
---

When helping a new developer onboard to this project:

1. Run the following commands to gather context:
   - `ls libs/dcx-ng-lib/src/lib/dcx-ng-components/` to list all available components
   - `cat README.md` to read the project overview
   - `cat package.json` to identify the tech stack and available scripts
   - `git log --oneline -10` to understand recent activity

2. Present the onboarding guide using this format:

---

## Project Overview
Brief description of what this project is and its purpose.

## Tech Stack
- List the main technologies, frameworks and tools used
- Include versions where relevant

## Project Structure
Explain the monorepo layout:
- `src/` — App entry point and shell
- `libs/dcx-ng-lib/src/lib/`
  - `core/` — Core utilities and base classes
  - `dcx-ng-components/` — All Angular UI components (one folder per component)
  - `services/` — Shared services
  - `stories/` — Storybook stories for each component

## Available Components
List the components found under `dcx-ng-components/`, grouped by category if possible.

## Key Commands
| Command | Description |
|---|---|
| `npx nx serve dcx-ng-components` | Start the dev server |
| `npm run start-storybook` | Start Storybook (component docs/preview) |
| `npm test` | Run all tests with coverage |
| `npm run lint` | Lint the library |
| `npm run lint-fix` | Lint and auto-fix issues |
| `npx nx build dcx-ng-components` | Build for production |
| `npx nx g c` (from `libs/dcx-ng-lib/src/lib/dcx-ng-components`) | Generate a new component |

## How to Create a New Component
1. Navigate to `libs/dcx-ng-lib/src/lib/dcx-ng-components/`
2. Run `npx nx g c` and select `@nx/angular:component`
3. Place it in a dedicated folder: `dcx-ng-<name>/dcx-ng-<name>/`
4. Name the component after the element (e.g., `button`)
5. Add a Storybook story in `libs/dcx-ng-lib/src/lib/stories/`

## CI/CD
- GitLab CI runs on `main` and merge requests
- Pipeline runs: `lint`, `test`, and `build` on affected projects via Nx Cloud
- Storybook is deployed to GitHub Pages: `main` → `/main/` and `develop` → `/develop/`

## Code Good Practices
- **Arrow Functions**: use always arrow functions. `()=>{}`
- **Early return**: Dont use if-else if u can use a condition with early return
- **Constructor effect**: Dont use constructor, u can create the effects for the signals outside the constrcutors.
- **Unsubscribe**: Unsubscribe always.
- **Mocks**: Use mocks for testing. `libs\dcx-ng-lib\src\lib\core\mock`
- **Types**: Try to use the standard types on `libs\dcx-ng-lib\src\lib\core\interfaces`

## Code Quality
- **Linting**: ESLint with Angular and TypeScript rules
- **Formatting**: Prettier (auto-applied on commit via Husky + lint-staged)
- **Pre-commit hook**: ESLint + Prettier run automatically on `.ts`, `.html`, `.scss` files

## Live Documentation
- Develop branch: https://libreria-amutarbo.github.io/libreria-formacion/develop/
- Main branch: https://libreria-amutarbo.github.io/libreria-formacion/main/

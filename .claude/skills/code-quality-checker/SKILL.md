---
name: code-quality-checker
description: Reviews code quality before a PR. Runs lint, tests and checks code good practices. Use when creating a PR or when the user asks to check code quality.
---

When checking code quality:

1. Run the following commands to gather results:
   - `npm run lint` to check linting errors
   - `nx run-many --target=test --all -- --coverage --coverageDirectory='coverage/libs'` to run tests with coverage

2. Analyze changed files on this branch with `git diff main...HEAD --name-only` and review them against the project's good practices:
   - **Arrow functions**: use always arrow functions `()=>{}`
   - **Early return**: avoid if-else when an early return can be used
   - **Constructor effects**: do not use constructor, create effects for signals outside constructors
   - **Unsubscribe**: always unsubscribe from observables
   - **Mocks**: use mocks for testing from `libs/dcx-ng-lib/src/lib/core/mock`
   - **Types**: use standard types from `libs/dcx-ng-lib/src/lib/core/interfaces`

3. Report findings using this format:

---

## Code Quality Report

### Lint
✅ No errors / ❌ Errors found — list them

### Tests
✅ All passing (coverage: X%) / ❌ Failing tests — list them

### Good Practices Review
For each changed file, flag any violations:
- **File**: `path/to/file.ts`
  - Issue description and suggested fix

### Summary
Overall assessment and recommended actions before merging.

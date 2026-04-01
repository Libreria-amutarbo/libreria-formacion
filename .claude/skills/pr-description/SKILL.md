---
name: pr-description
description: Writes pull request descriptions following the project template. Use when creating a PR, writing a PR description, or when the user asks to summarize changes for a pull request.
---

When writing a PR description:

1. Run these commands to gather context:
   - `git diff develop...HEAD --name-only` to see changed files
   - `git log develop...HEAD --oneline` to see all commits on this branch
   - `git diff develop...HEAD` to review the actual changes

2. Fill in the PR template below based on what you found. Be concise and specific — avoid generic descriptions.

3. For the **ticket**, extract the `LC-XXX` reference from branch name or commit messages if present.

4. For the **type of change**, check only the relevant boxes based on the commits (use the conventional commit types: feat, fix, test, refactor, chore, docs, style).

5. For **cambios realizados**, list the most meaningful changes grouped by file or concern — not a dump of every commit.

6. For **cómo se ha probado**, check the appropriate boxes based on whether test files were changed.

7. For the **PR title**, follow the linter format: `feat|fix|test: LC-000 Short title in Spanish`

---

Output the filled template ready to paste, followed by the suggested PR title:

```
## 📋 Descripción

<one paragraph explaining what this PR does and why>

## 🔗 Ticket relacionado

Refs: <LC-XXX or "N/A">

## 🧩 Tipo de cambio

- [x] `<type>` — <label>

## ✅ Cambios realizados

- <change 1>
- <change 2>
- <change 3>

## 🧪 ¿Cómo se ha probado?

- [x or empty] Tests unitarios añadidos / actualizados
- [x or empty] Probado manualmente en Storybook
- [x or empty] Sin cambios que requieran tests

## 📝 Checklist

- [x] El título sigue el formato: `feat|fix|test: LC-000 Título`
- [x] El código sigue las buenas prácticas del proyecto
- [x] No hay `console.log` olvidados
- [x] El lint pasa sin errores
```

**Título sugerido:** `<type>: LC-XXX Título descriptivo`

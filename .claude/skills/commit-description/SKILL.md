---
name: commit-description
description: Writes commit messages. Use when creating a commit, writing a commit message, or when the user asks to summarize staged changes for a commit.
tools: execute, read, browser, edit, search
---

When writing a commit message:

1. Run `git diff --cached` to see all staged changes
2. If nothing is staged, run `git diff HEAD` to see unstaged changes
3. Write a commit message following the Conventional Commits format:

**Title:** `<type>(<scope>): <short summary>` — max 72 chars

- Types: `feat`, `fix`, `test`, `refactor`, `chore`, `docs`, `style`
- Scope is optional: the module or area affected (e.g. `auth`, `ui`, `api`)
- Example: `feat(auth): add JWT refresh token support`

**Body (optional):** Add a blank line after the title, then explain:

- What changed and why (not how)
- Any breaking changes: prefix with `BREAKING CHANGE:`
- Reference tickets if applicable: `Refs: LC-123`

4. Propose the final commit command:

```
git commit -m "<title>" -m "<body>"
```

---
name: spec-driven-development
description: Guides the Spec Driven Development workflow. Use when starting any new feature, component, or significant change. Writes a spec first, waits for approval, then implements. Can also be invoked to write a spec for existing work.
tools: read, edit, write, search, execute
---

# Spec Driven Development (SDD)

The task or feature to spec is: **$ARGUMENTS**

SDD workflow: **Spec → Approval → Implementation**. Never write production code before the spec is approved.

---

## Phase 1 — Write the Spec

### 1.1 Gather context

Before writing anything:

1. Read relevant existing files (components, types, scss tokens, routes) to understand the current state.
2. If a Figma URL or design reference was provided, read it.
3. Identify what already exists vs. what needs to be created.

### 1.2 Create the spec document

Create or update the file:

```
specs/{kebab-case-feature-name}.spec.md
```

Use this template:

```markdown
# Spec: {Feature Name}

**Status:** Draft | Approved | In Progress | Done
**Date:** {today}
**Author:** Claude Code

---

## 1. Overview

Brief description of what this feature/component does and why it exists.

---

## 2. Acceptance Criteria

A checklist of conditions that must be true for this spec to be considered complete:

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

---

## 3. API / Interface

### Inputs (Angular `input()` signals)

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `propName` | `Type` | `default` | Yes/No | What it controls |

### Outputs (Angular `output()` signals)

| Name | Emitted Type | Description |
|------|-------------|-------------|
| `eventName` | `EventType` | When it fires |

### Public Methods (if any)

| Method | Signature | Description |
|--------|-----------|-------------|

---

## 4. Visual States & Variants

List all visual states this component must handle:

- **Default** — description
- **Disabled** — description
- **[Variant X]** — description

If a Figma design exists, reference it here.

---

## 5. SCSS / Tokens

List design tokens or SCSS variables that will be used or created:

- `$token-name` — purpose

---

## 6. Accessibility (a11y)

- ARIA roles / attributes required
- Keyboard navigation behavior
- Screen reader considerations

---

## 7. Test Cases

Unit test scenarios to cover:

- [ ] should create the component
- [ ] should render correctly with default inputs
- [ ] should emit `[event]` when [action]
- [ ] should apply `[class]` when `[condition]`

---

## 8. Out of Scope

What this spec explicitly does NOT cover:

- Item 1

---

## 9. Open Questions

Questions that need answers before or during implementation:

- [ ] Question 1

---

## 10. Implementation Plan

High-level steps (to be filled after approval):

1. Step 1
2. Step 2
```

---

## Phase 2 — Present & Wait for Approval

After creating the spec file, output a summary to the user:

```
## Spec ready: {Feature Name}

📄 File: specs/{kebab-case-feature-name}.spec.md

### Summary
{2-3 sentence summary of what will be built}

### Key decisions in this spec:
- {Decision 1}
- {Decision 2}

### Open questions (if any):
- {Question}

---
**Review the spec and reply with one of:**
- ✅ **Approved** — proceed with implementation
- ✏️ **Changes needed** — describe what to adjust
- ❌ **Rejected** — explain why
```

**STOP HERE. Do not write any implementation code until the user explicitly approves the spec.**

---

## Phase 3 — Implementation (only after approval)

Once the user approves:

1. Update spec status to `In Progress`.
2. Implement following the spec exactly.
3. If you discover something that requires deviating from the spec, **stop and ask** before proceeding.
4. After implementation, update spec status to `Done` and check off completed acceptance criteria.

---

## Rules

- **Never skip Phase 2.** Even for "small" changes.
- If the user says "just do it" or "skip the spec", remind them of the SDD rule and ask if they want to override it explicitly.
- If the task is a bug fix with no design decisions, the spec can be minimal (Overview + Acceptance Criteria + Test Cases only).
- Keep specs up to date: if implementation deviates from spec, update the spec to reflect the final design.

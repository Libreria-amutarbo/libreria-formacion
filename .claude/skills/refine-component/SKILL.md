---
name: refine-component
description: Orchestrates the full refinement workflow for a DCX NG Library component. Covers WCAG AA audit, spec creation, implementation (TS/HTML/SCSS/tests), Storybook update (Spanish argTypes) and page demo update. Use when the user asks to refine, review or improve a component (e.g. /refine-component badge).
---

# Refine Component

The component to refine is: **$ARGUMENTS**

Derive naming variables from the input (e.g. `badge`):

| Variable       | Example (`badge`)       | Example (`scroll-top-down`)         |
|----------------|-------------------------|--------------------------------------|
| `kebab`        | `badge`                 | `scroll-top-down`                    |
| `PascalCase`   | `Badge`                 | `ScrollTopDown`                      |
| `selector`     | `dcx-ng-badge`          | `dcx-ng-scroll-top-down`             |
| `lib_folder`   | `dcx-ng-badge`          | `dcx-ng-scroll-top-down`             |
| `story_folder` | `Badge`                 | `ScrollTopDown`                      |
| `page_folder`  | `dcx-ng-page-badge`     | `dcx-ng-page-scroll-top-down`        |
| `spec_folder`  | `badge-refinement`      | `scroll-top-down-refinement`         |

---

## Phase 1 — Discovery & Analysis

**Spawn an `Explore` sub-agent** with the following brief (fill in the component variables):

> Analyze the `dcx-ng-{kebab}` component in the DCX NG Library.
>
> Read ALL of these files in parallel:
> - `libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-{kebab}/` — all 4 files (ts, html, scss, spec.ts)
> - `libs/dcx-ng-lib/src/lib/core/interfaces/{kebab}.ts` (if exists)
> - `libs/dcx-ng-lib/src/lib/core/defaults/{kebab}.ts` (if exists)
> - `libs/dcx-ng-lib/src/lib/stories/{PascalCase}/ClassBased.stories.ts`
> - `src/app/pages/dcx-ng-page-{kebab}/` — all files (ts, html, scss, spec.ts)
> - `designs/` — any HTML file matching `*{kebab}*`
>
> Also grep the `src/app/` directory for any other usage of the component class or selector.
>
> Report the following (be specific, include file names and line numbers):
>
> **1. Current API**
> - All `input()` signals: name, type, default value
> - All `output()` signals: name, emitted type
> - Public methods (if any)
> - Interface fields (DcxNg{PascalCase}Item or similar)
> - Mock/default data names and whether content is realistic or placeholder
>
> **2. WCAG AA issues** — check each item explicitly:
> - Interactive elements use native HTML (`<button>`, `<input>`, etc.) or have `role` + keyboard handlers
> - `aria-expanded`, `aria-selected`, `aria-checked`, `aria-disabled` where applicable
> - `aria-label` or visible text for icon-only elements
> - `focus-visible` CSS state is styled (not relying on browser default only)
> - `disabled` uses native attribute, not just CSS opacity/class
> - Decorative icons have `aria-hidden="true"`
> - No `tabindex > 0` used
> - Color contrast: does the design ensure ≥4.5:1 for normal text, ≥3:1 for large text?
> - If it renders a list of items, is `role="list"` / `<ul>` / `<ol>` used?
> - Heading levels: are they semantic (not used for visual sizing)?
>
> **3. Storybook stories**
> - List all exported stories
> - Are argType `category` values in Spanish (`Atributos`, `Eventos`, `Métodos`)?
> - Are descriptions in Spanish?
> - Is there a story for every significant variant/state?
> - Are there missing stories?
>
> **4. Page demo**
> - Does it use `.demo-page` / `.demo-page-header` / `.demo-section` classes from `src/styles/page-demo.scss`?
> - Are all Storybook stories covered by a numbered example?
> - Any inconsistencies (duplicate numbers, missing examples)?
>
> **5. Code quality**
> - Duplicate or conflicting CSS declarations
> - Module-level mutable state (e.g. `let counter = 0`)
> - Constructor usage vs `effect()` for signals
> - Any `any` types that could be typed properly
> - Missing `ChangeDetectionStrategy.OnPush`
> - Style duplication between inline `[style]` and SCSS
>
> Return a structured report with all findings. Be exhaustive — this drives the spec.

Wait for the sub-agent report before proceeding.

---

## Phase 2 — WCAG AA Full Checklist

After receiving the analysis, run this fixed checklist mentally against the report and add any issues not already found:

### Interactive components (buttons, inputs, selects, toggles, accordions…)
- [ ] Native `<button>` / `<input>` / `<select>` used (not `<div>` with `role="button"`)
- [ ] `aria-expanded` on trigger elements that show/hide content
- [ ] `aria-controls` pointing to the controlled panel's ID
- [ ] `aria-labelledby` or `aria-label` on panels/regions
- [ ] `role="region"` on content panels that expand/collapse
- [ ] `disabled` attribute (native) rather than CSS-only
- [ ] Keyboard: `Enter`/`Space` activate; `Escape` closes overlays; arrow keys navigate lists
- [ ] Focus ring visible via `:focus-visible { outline: 2px solid var(--border-focus) }`
- [ ] No `tabindex > 0`

### Display-only components (badge, chip, tag, icon…)
- [ ] Decorative icons/images have `aria-hidden="true"`
- [ ] Color is not the only differentiator (e.g. error badge needs icon or text, not just red)
- [ ] If status-bearing, includes `role="status"` or `role="alert"` where appropriate

### All components
- [ ] `id` generation is instance-safe (no module-level counter)
- [ ] Angular `ChangeDetectionStrategy.OnPush` set
- [ ] `aria-hidden` on collapsed/hidden content (instead of or in addition to CSS)

---

## Phase 3 — Spec Creation

Create the spec file at `specs/{spec_folder}/{spec_folder}.spec.md`.

Use this exact template:

```markdown
# Spec: {PascalCase} Refinement

**Status:** Draft
**Date:** {today}
**Author:** Claude Code

---

## 1. Overview
Brief description of what the component does and why this refinement is needed.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos
| # | Criterio | Problema actual | Solución |

### 2.2 WCAG AA — Recomendados
| # | Criterio | Descripción |

### 2.3 Bugs de lógica
| # | Descripción |

### 2.4 Mejoras de UX / coherencia
| # | Descripción |

---

## 3. API / Interface
List inputs, outputs, public methods. Note: BREAKING vs ADDITIVE changes.

### Inputs (`input()` signals)
| Name | Type | Default | Required | Descripción |

### Outputs (`output()` signals)
| Name | Emitted Type | Descripción |

### Public Methods
| Method | Signature | Descripción |

---

## 4. Visual States & Variants
- **Default** — description
- **Disabled** — description
- **[Other states]** — description
Reference design file if it exists.

---

## 5. SCSS / Tokens
List tokens used or created. Note fixes to duplicate/conflicting rules.

---

## 6. Accesibilidad (WCAG AA)
ARIA structure, keyboard interaction table, screen reader notes.

---

## 7. Test Cases
- [ ] should create the component
- [ ] [WCAG cases]
- [ ] [Functional cases]

---

## 7b. Decisión: componentes de librería vs HTML nativo
Justify any choice between using DcxNg* components vs native HTML elements.

---

## 8. Out of Scope
List explicitly what is NOT being changed.

---

## 9. Open Questions
- [ ] Question (if any)

---

## 10. Implementation Plan
1. Step 1
2. Step 2
…
```

---

## Phase 4 — Present Spec & Wait for Approval

Output the spec summary and **STOP**. Do not write any production code until the user explicitly approves.

Format:

```
## Spec lista: {PascalCase} Refinement

📄 Fichero: specs/{spec_folder}/{spec_folder}.spec.md

### Resumen
{2-3 sentences}

### Decisiones clave:
- {decision}
- {decision}

### Preguntas abiertas:
- {question if any}

---
Responde con:
- ✅ Aprobado — procedo con la implementación
- ✏️ Cambios necesarios — describe qué ajustar
- ❌ Rechazado — explica por qué
```

---

## Phase 5 — Implementation (only after explicit approval)

Update the spec status to `In Progress`. Then follow this exact order:

### 5.1 Interface & Defaults
- `libs/dcx-ng-lib/src/lib/core/interfaces/{kebab}.ts` — add/update types
- `libs/dcx-ng-lib/src/lib/core/defaults/{kebab}.ts` — realistic mock content, new mocks if needed
- Verify barrel exports (`core/interfaces/index.ts`, `core/defaults/index.ts`, `src/index.ts`)

### 5.2 Component TS
- Add new `input()` / `output()` signals
- Use `inject(ElementRef)` instead of `@ViewChild` for DOM queries
- Use `computed()` for derived class strings
- Remove module-level mutable state
- Use `untracked()` to avoid unintended reactive dependencies in `effect()`
- Arrow functions everywhere
- No constructor code — use `effect()` for signal reactions

### 5.3 Component HTML
- Replace `<div role="button">` with `<button>`
- Add `aria-hidden="true"` to decorative icons
- Add `[attr.aria-label]`, `[attr.aria-expanded]`, `[attr.aria-controls]` etc.
- Use `[attr.aria-hidden]="condition"` on collapsible regions
- Use `[disabled]="condition || null"` on buttons (native disabled)

### 5.4 Component SCSS
- Remove duplicate/conflicting rules
- Add `:focus-visible` outline if missing
- Add any new variant class (e.g. `&.component--flush`)
- Use design tokens with fallbacks: `var(--token, #hardcoded-fallback)`

### 5.5 Spec.ts (unit tests)
Add tests for every new/changed feature. Minimum coverage:
- Structural: verify native HTML elements, ARIA attributes
- Functional: inputs change output, outputs emit correctly
- New features: each new input/method has dedicated tests
- WCAG: `aria-expanded`, `aria-hidden`, `disabled`, `focus-visible` class

### 5.6 Storybook Stories
Update `libs/dcx-ng-lib/src/lib/stories/{PascalCase}/ClassBased.stories.ts`:

**argTypes format** (ALWAYS Spanish — this is the project standard):
```typescript
argTypes: {
  inputName: {
    name: 'inputName',
    control: { type: 'select' | 'text' | 'boolean' | 'number' | 'object' },
    options: ImportedList, // select only
    description: 'Descripción en español.',
    table: {
      category: 'Atributos',          // ← always Spanish
      type: { summary: 'TypeName' },
      defaultValue: { summary: 'value' },
    },
  },
  outputName: {
    name: 'outputName',
    action: 'outputName',
    description: 'Se emite cuando…',
    table: {
      category: 'Eventos',            // ← always Spanish
      type: { summary: '(value: Type) => void' },
    },
  },
  methodName: {
    name: 'methodName()',
    description: 'Descripción del método.',
    control: false,
    table: {
      category: 'Métodos',            // ← always Spanish
      type: { summary: '() => void' },
    },
  },
},
```

**Stories to include** (minimum):
- `Default` — basic usage
- One story per significant variant/state
- If publicly controllable → `ExternalControl` story
- If has expand/collapse all → `ExpandCollapseAll` story
- If has variant (flush, etc.) → one story per variant

### 5.7 Page Demo
Update `src/app/pages/dcx-ng-page-{kebab}/`:

**HTML structure** — use `page-demo.scss` classes:
```html
<div class="demo-page">
  <header class="demo-page-header">
    <p class="demo-page-header__kicker">Components</p>
    <h1 class="demo-page-header__title">{ComponentName}</h1>
    <p class="demo-page-header__desc">Brief description in Spanish.</p>
    <hr class="demo-page-header__divider" />
  </header>

  <!-- One block per story -->
  <div class="demo-section">
    <div class="demo-section__header">
      <span class="demo-section__num">01</span>
      <span class="demo-section__title">Default</span>
    </div>
    <p class="demo-section__desc">Optional note.</p>  <!-- omit if not needed -->
    <div class="demo-section__body">
      <!-- component here -->
    </div>
  </div>
</div>
```

**Rules:**
- One `demo-section` per Storybook story, in the same order
- Numbers zero-padded: `01`, `02`, … `09`, `10`, `11`…
- `demo-section__desc` is optional — only add when it explains something non-obvious
- SCSS file: just a comment `// page-demo styles are provided globally via src/styles.scss`
- TS file: minimal — only data and helper methods, no layout logic

---

## Phase 6 — Verification

Run tests:
```bash
npx nx test dcx-ng-lib --testFile=libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-{kebab}/dcx-ng-{kebab}.component.spec.ts --no-coverage
```

If tests fail, fix them before reporting completion.

Also check for TypeScript diagnostics in modified files (the IDE will show errors after each edit).

---

## Phase 7 — Close Out

1. Update spec status to `Done`
2. Check off acceptance criteria in the spec
3. Report:

```
## Refinamiento completado: {ComponentName}

### Cambios aplicados
- **WCAG**: [list changes]
- **API**: [new inputs/methods]
- **SCSS**: [fixes]
- **Tests**: X/Y passing
- **Storybook**: [new stories]
- **Page demo**: [examples added]

### Pendiente (si aplica)
- [anything deferred]
```

---

## Reference: Accordion as Gold Standard

The `dcx-ng-accordion` component is the first fully-refined component. Use it as reference for:
- HTML structure (h3 > button pattern, aria attributes)
- SCSS patterns (focus-visible, flush variant, token fallbacks)
- Test structure (WCAG describe block)
- Storybook argTypes (Spanish, three categories)
- Page demo format (demo-page / demo-section classes)

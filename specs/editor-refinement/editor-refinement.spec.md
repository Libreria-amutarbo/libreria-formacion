# Spec: Editor Refinement

**Status:** Done
**Date:** 2026-06-09
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-editor` es un editor de texto enriquecido basado en `contenteditable` con barra de herramientas de formato (negrita, cursiva, subrayado, listas y limpiar formato). Implementa `ControlValueAccessor` para integración con Angular Forms. El componente está bien construido — `ChangeDetectionStrategy.OnPush`, señales, sanitización XSS — y no tiene fallos críticos de WCAG. Esta refinación es principalmente de **coherencia**: traducir las categorías de Storybook al español, renombrar stories a PascalCase, añadir 2 stories nuevas (toolbar personalizado + uso con `ariaLabel` sin `<label>` visible), y restructurar la página demo con `demo-page/demo-section`.

**Referencia de diseño:** `designs/dcx-ng-page-textarea-editor-file-upload.html`

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

_(ninguno)_

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | 3.3.2 Labels or Instructions | `ariaLabel` y `ariaDescribedBy` en Storybook no tienen `description` — usuario no sabe para qué sirven |

### 2.3 Bugs de lógica

_(ninguno)_

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 1 | Storybook: categorías en inglés (`Attributes`, `Accessibility`, `Styles`, `Events`) → traducir a español (`Atributos`, `Accesibilidad`, `Eventos`) |
| 2 | Storybook: `minHeight` es un input, no un estilo CSS del consumidor → mover a categoría `Atributos` |
| 3 | Storybook: `ClassBased` → renombrar a `Default`; stories en camelCase → PascalCase |
| 4 | Storybook: añadir `description` y `defaultValue.summary` a todos los argTypes que les falte |
| 5 | Storybook: añadir story `ToolbarVariant` (toolbar reducida a solo bold/italic/underline) |
| 6 | Storybook: añadir story `WithAriaLabel` (sin `<label>` visible, solo `ariaLabel` para screen readers) |
| 7 | Page demo: restructurar con `demo-page/demo-section`; añadir sección "Disabled" que falta; añadir secciones para las 2 stories nuevas |
| 8 | Page demo TS: eliminar `CommonModule` (no necesario en standalone) y `DcxNgDividerComponent` (ya no se usa) |

---

## 3. API / Interface

Sin cambios en la API — todos los cambios son de presentación (Storybook / page demo).

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `id` | `string` | autogenerado | — | ID único del editor (para `for`/`aria-labelledby`) |
| `value` | `string` | `''` | — | Contenido HTML del editor (`model()` two-way binding) |
| `label` | `string` | `''` | — | Etiqueta visible sobre el editor |
| `placeholder` | `string` | `''` | — | Texto de guía cuando el editor está vacío |
| `disabled` | `boolean` | `false` | — | Deshabilita el editor y la toolbar |
| `readonly` | `boolean` | `false` | — | Solo lectura: toolbar y edición desactivadas |
| `required` | `boolean` | `false` | — | Marca el campo como obligatorio |
| `isInvalid` | `boolean` | `false` | — | Activa el estado de error |
| `errorMessage` | `string` | `''` | — | Mensaje de error visible bajo el editor |
| `ariaLabel` | `string \| null` | `null` | — | Label accesible cuando no se usa `label` visible |
| `ariaDescribedBy` | `string \| null` | `null` | — | ID externo adicional para `aria-describedby` |
| `minHeight` | `string` | `'160px'` | — | Altura mínima del área editable |
| `toolbarActions` | `DcxEditorToolbarAction[]` | todas (6) | — | Acciones visibles en la barra de herramientas |

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `valueChange` | `string` | Emitido en cada cambio de contenido (también como `model()`) |
| `blurEvent` | `void` | El editor pierde el foco |
| `focusEvent` | `void` | El editor recibe el foco |

---

## 4. Visual States & Variants

- **Default** — editor vacío con barra de herramientas completa
- **Con placeholder** — muestra texto guía en el área vacía (via CSS `::before`)
- **Con valor** — HTML enriquecido precargado, herramientas de formato activas
- **Read only** — toolbar y área no interactivas; cursor `default`
- **Disabled** — toolbar desactivada (botones `disabled`), `contenteditable="false"`, opacidad reducida
- **Invalid** — borde rojo, mensaje de error visible, `aria-invalid="true"`
- **Toolbar reducida** — solo el subconjunto de acciones configurado via `toolbarActions`
- **Sin label visible** — `ariaLabel` como etiqueta accesible, sin `<label>` en el DOM

Referencia: `designs/dcx-ng-page-textarea-editor-file-upload.html`

---

## 5. SCSS / Tokens

Sin cambios en SCSS del componente.

---

## 6. Accesibilidad (WCAG AA)

El componente ya cumple WCAG AA:

- `role="toolbar"` + `aria-label="Formato"` en la barra
- Cada botón de toolbar tiene `ariaLabel` descriptivo en español
- `aria-multiline="true"` + `aria-labelledby` / `aria-label` en el área editable
- `aria-required` / `aria-invalid` / `aria-describedby` (enlaza con el mensaje de error)
- `contenteditable="false"` + `tabindex` eliminado cuando disabled
- Sanitización XSS con `DomSanitizer.sanitize(SecurityContext.HTML, ...)`

**Nota sobre placeholder**: `contenteditable` nativo no soporta el atributo `placeholder`, por lo que se usa `data-placeholder` + CSS `::before`. Es el patrón estándar para editores de texto enriquecido y es aceptable — el label/ariaLabel describe el campo.

---

## 7. Test Cases

- [x] should create the component
- [x] should render label
- [x] should render content
- [x] should apply bold command
- [x] should apply italic command
- [x] should apply underline command
- [x] should apply orderedList command
- [x] should apply unorderedList command
- [x] should handle removeFormat command
- [x] should emit valueChange when content changes
- [x] should not emit valueChange when content didn't change
- [x] should handle selection changes
- [x] should save and restore selection
- [x] should disable toolbar buttons when editor is disabled
- [x] should call onChange when value changes
- [x] should handle writeValue
- [x] should call setDisabledState
- [x] should sanitize HTML content
- [x] should show error message when isInvalid is true

_(todos ya passing — no se añaden tests nuevos, los cambios son solo en Storybook y page demo)_

---

## 7b. Decisión: componentes de librería vs HTML nativo

No aplica — no se modifica la estructura del componente.

---

## 8. Out of Scope

- Lógica interna del editor (selección, `execCommand`, `Range`, `DomSanitizer`)
- `private viewReady = false` — flag de lifecycle correcto para `ngAfterViewInit`, no es estado reactivo
- `::ng-deep` para estilos de `dcx-ng-button` en toolbar — necesario por encapsulación
- Renombrar el tipo `DcxEditorToolbarAction` o `DcxEditorToolbarItem`
- Añadir nuevas acciones de toolbar (headers, links, etc.)

---

## 9. Open Questions

_(ninguna)_

---

## 10. Implementation Plan

1. **Storybook `ClassBased.stories.ts`** — traducir categorías; renombrar stories a PascalCase; añadir descriptions y defaultValue a argTypes; añadir stories `ToolbarVariant` y `WithAriaLabel`
2. **Page demo TS** — eliminar `CommonModule` y `DcxNgDividerComponent`; simplificar a solo lo necesario
3. **Page demo HTML** — restructurar con `demo-page/demo-section`; 7 secciones (una por story)
4. **Page demo SCSS** — limpiar a comentario estándar
5. **Verificar que los tests siguen pasando** (no se toca lógica)

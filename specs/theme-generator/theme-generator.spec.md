# Spec: Theme Generator

**Status:** In Progress
**Date:** 2026-03-17
**Author:** Claude Code

---

## 1. Overview

El **Theme Generator** es un componente Angular standalone que permite a un cliente visualizar la paleta de tokens de diseño de la librería DCX-NG y personalizarla de forma interactiva. Una vez configurada, el componente genera y exporta un archivo `theme-client.css` listo para ser incluido antes de los estilos de la librería, sobreescribiendo los tokens con la identidad visual del cliente.

El componente vivirá dentro de la librería (`dcx-ng-lib`) y tendrá su propia story en Storybook, de forma que sirva a la vez como herramienta funcional y como documentación viva del sistema de theming.

---

## 2. Acceptance Criteria

- [ ] El componente muestra todos los tokens de color de `capgemini-tokens.css` agrupados por categoría (Fondo, Texto, Bordes, Semánticos).
- [ ] Cada token de color tiene un color picker + campo de texto hex editable.
- [ ] El componente muestra una preview en tiempo real con los colores modificados aplicados sobre un conjunto de componentes DCX-NG de muestra (botón, input, badge de estado).
- [ ] Existe un botón **"Descargar CSS"** que genera y descarga el archivo `theme-client.css` con solo los tokens modificados (no los que no han cambiado).
- [ ] Existe un botón **"Copiar CSS"** que copia el CSS generado al portapapeles.
- [ ] Existe un botón **"Restablecer"** que vuelve a los valores por defecto de Capgemini.
- [ ] El CSS generado sigue el formato exacto de `theme-client.css` (`:root { /* tokens */ }`).
- [ ] Los tokens no modificados **no** aparecen en el CSS generado (solo se exportan overrides).
- [ ] El componente es completamente standalone, sin dependencias externas más allá de `@angular/core` y `@angular/forms`.
- [ ] Tiene su story en Storybook bajo la categoría `Tools/Theme Generator`.

---

## 3. API / Interface

### Inputs (Angular `input()` signals)

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `tokens` | `ThemeToken[]` | tokens de `capgemini-tokens.css` | No | Lista de tokens a mostrar y editar. Si no se pasa, usa los tokens por defecto de Capgemini. |
| `showPreview` | `boolean` | `true` | No | Muestra/oculta la sección de preview en tiempo real. |
| `downloadFileName` | `string` | `'theme-client.css'` | No | Nombre del archivo al descargar. |

### Outputs (Angular `output()` signals)

| Name | Emitted Type | Description |
|------|-------------|-------------|
| `themeChanged` | `ThemeToken[]` | Emite la lista completa de tokens cada vez que el usuario modifica un valor. |
| `cssGenerated` | `string` | Emite el CSS generado cuando el usuario pulsa "Descargar CSS" o "Copiar CSS". |

### Tipos públicos

```typescript
interface ThemeToken {
  name: string;        // e.g. '--bg-primary'
  value: string;       // valor actual (hex u otro)
  defaultValue: string;// valor original de Capgemini
  label: string;       // nombre legible e.g. 'Fondo primario'
  group: ThemeTokenGroup;
}

type ThemeTokenGroup =
  | 'background'
  | 'text'
  | 'border'
  | 'semantic'
  | 'spacing'
  | 'typography'
  | 'radius'
  | 'shadow';
```

---

## 4. Visual States & Variants

- **Default** — Paleta Capgemini cargada, sin modificaciones. El botón "Restablecer" está deshabilitado.
- **Modified** — Al menos un token ha sido cambiado. El botón "Restablecer" se habilita. Los tokens modificados se resaltan visualmente (badge o borde de color).
- **Preview visible** — Sección inferior muestra componentes reales con los tokens aplicados via CSS custom properties en el host element.
- **Preview oculta** — `showPreview = false`, la sección de preview no se renderiza.

### Layout propuesto

```
┌─────────────────────────────────────────────────────────┐
│  Theme Generator                         [Restablecer]   │
├──────────────┬──────────────────────────────────────────┤
│  GRUPOS      │  TOKENS DEL GRUPO SELECCIONADO            │
│  ○ Fondo     │  ┌────────────────────────────────────┐  │
│  ○ Texto     │  │ Fondo primario  [████] #0058ab      │  │
│  ○ Bordes    │  │ Fondo hover     [████] #f7f8fa      │  │
│  ○ Semántico │  │ ...                                 │  │
│              │  └────────────────────────────────────┘  │
├──────────────┴──────────────────────────────────────────┤
│  PREVIEW (componentes DCX-NG de muestra)                 │
│  [Botón primario]  [Botón secundario]  ● Input  ✓ Check │
├─────────────────────────────────────────────────────────┤
│  [Copiar CSS]                        [Descargar CSS]     │
└─────────────────────────────────────────────────────────┘
```

---

## 5. SCSS / Tokens

El componente aplica los cambios directamente como CSS custom properties en su `:host` element, por lo que los componentes de preview dentro de él heredan los valores modificados automáticamente. No se crea ningún archivo SCSS nuevo para los tokens.

El componente sí tiene su propio `_theme-generator.scss` para los estilos de la UI (layout, color pickers, grupos, etc.).

---

## 6. Accessibility (a11y)

- Los `<input type="color">` tienen su `<label>` asociado via `for`/`id`.
- Los campos hex tienen `aria-label` con el nombre del token.
- El botón "Restablecer" tiene `aria-disabled="true"` cuando no hay cambios.
- Los grupos de tokens usan `role="tablist"` / `role="tab"` si se implementan como tabs, o `<fieldset>` + `<legend>` si son secciones.
- El área de preview tiene `aria-label="Vista previa del tema"`.

---

## 7. Test Cases

- [ ] should create the component
- [ ] should render all color tokens grouped by category
- [ ] should update a token value when color picker changes
- [ ] should update a token value when hex input changes
- [ ] should mark token as modified when its value differs from default
- [ ] should emit `themeChanged` when any token is modified
- [ ] should emit `cssGenerated` when "Copiar CSS" is triggered
- [ ] should generate CSS with only modified tokens (not all tokens)
- [ ] should reset all tokens to default when "Restablecer" is clicked
- [ ] should disable "Restablecer" button when no tokens are modified
- [ ] should not render preview when `showPreview` is `false`
- [ ] should use `downloadFileName` input for the downloaded file name

---

## 8. Out of Scope

- Edición de tokens de **tipografía, spacing, radius y sombras** en esta primera versión (solo colores).
- Gestión de múltiples temas guardados / historial de cambios.
- Importar un `theme-client.css` existente para cargarlo en el editor.
- Dark mode del propio componente Theme Generator.
- Sincronización con Figma variables.

---

## 9. Open Questions

- [ ] ¿El componente vive en `dcx-ng-lib` como un componente exportado de la librería, o se crea como una app separada (e.g. `apps/theme-generator`) dentro del monorepo?
- [ ] ¿Los tokens de colores semánticos (success, warning, error, info) deben mostrar también su variante `-bg`?
- [ ] ¿Qué componentes DCX-NG concretos aparecen en la preview? (Propuesta: Button, Input, Checkbox, Message)

---

## 10. Implementation Plan

_(Se completa tras aprobación)_

1. Definir los tipos `ThemeToken` y `ThemeTokenGroup` en `core/interfaces/`.
2. Crear el fichero `core/mock/theme-tokens.mock.ts` con los tokens por defecto de `capgemini-tokens.css`.
3. Scaffolding del componente con `/add-component theme-generator`.
4. Implementar el template: grupos laterales + lista de tokens con color picker + hex input.
5. Implementar la lógica de generación de CSS (solo tokens modificados).
6. Implementar la preview en tiempo real vía CSS custom properties en `:host`.
7. Implementar la descarga y copia al portapapeles.
8. Escribir la story de Storybook bajo `Tools/Theme Generator`.
9. Escribir los tests unitarios.

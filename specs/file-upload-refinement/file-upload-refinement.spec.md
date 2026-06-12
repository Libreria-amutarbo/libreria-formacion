# Spec: FileUpload Refinement

**Status:** Done
**Date:** 2026-06-10
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-file-upload` es un campo de selección de archivos con dos modos: botón clásico y zona de arrastre (`dragAndDrop`). Admite selección múltiple, filtrado por tipo MIME/extensión, auto-subida y mensajes de error de validación. El componente está técnicamente bien construido (señales, `OnPush`, sin `any`, sin estado mutable en módulo), pero tiene problemas de accesibilidad en la lista de archivos y en el campo input, las categorías de Storybook están en inglés, y la página demo no usa el patrón `demo-page`/`demo-section`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|-----------------|----------|
| 1 | 1.3.1 Info and Relationships | La lista de archivos seleccionados usa `<div>` sin semántica de lista | Cambiar a `<ul>` con `<li>` por cada archivo |
| 2 | 1.3.1 Info and Relationships | El `<input type="file">` oculto no tiene label accesible — los lectores de pantalla no saben para qué sirve el campo | Añadir `[attr.aria-label]` al `DcxNgInputComponent` o un `<label>` visualmente oculto |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | 4.1.2 Name, Role, Value | La zona de arrastre (`dragAndDrop`) carece de `role` y `aria-label`: los usuarios de lector de pantalla no saben que existe. Añadir `role="region"` + `aria-label="Zona de arrastre de archivos"` |
| 2 | 1.4.11 Non-text Contrast | El estado `disabled` usa solo `opacity: 0.6/0.5`. Complementar con `cursor: not-allowed` y asegurar que el botón recibe el atributo nativo `disabled` |

### 2.3 Bugs de lógica

_(ninguno)_

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|-------------|
| 1 | Storybook: categorías en inglés (`Attributes`, `Events`) → traducir a español (`Atributos`, `Eventos`) |
| 2 | Storybook: añadir story `Disabled` |
| 3 | Storybook: añadir story `WithValidationError` (simula error de tipo de archivo) |
| 4 | Page demo: refactorizar con `demo-page`/`demo-section`; añadir secciones para Disabled y WithValidationError |
| 5 | Interfaz `DcxFileUploadItem`: eliminar campo `dropzoneSize?` que no se usa en el componente |

---

## 3. API / Interface

Sin cambios en la API pública. Todos los cambios son de WCAG, Storybook y page demo.

### Inputs (`input()` signals)

| Name | Type | Default | Required | Descripción |
|------|------|---------|----------|-------------|
| `label` | `string` | `'Choose file'` | — | Texto del botón que abre el selector de archivos |
| `accept` | `string` | `''` | — | Tipos de archivo permitidos (MIME o extensiones, ej: `.pdf,image/*`) |
| `disabled` | `boolean` | `false` | — | Desactiva toda la interacción |
| `placeholder` | `string` | `'No file selected'` | — | Texto cuando no hay archivo seleccionado |
| `dragAndDrop` | `boolean` | `false` | — | Activa la zona de arrastre |
| `dropzoneSize` | `DcxFileUploadDropzoneSize` | `'small'` | — | Tamaño visual de la dropzone (`'small'` \| `'large'`) |
| `multiple` | `boolean` | `false` | — | Permite seleccionar múltiples archivos |
| `autoUpload` | `boolean` | `false` | — | Emite `uploadClicked` automáticamente al seleccionar |

### Outputs (`output()` signals)

| Name | Emitted Type | Descripción |
|------|--------------|-------------|
| `fileSelected` | `DcxFileUploadValue` | Se emite al seleccionar o limpiar archivos |
| `uploadClicked` | `DcxFileUploadValue` | Se emite al pulsar "Upload" o con `autoUpload` |

---

## 4. Visual States & Variants

- **Default** — botón + campo de texto con placeholder
- **Con archivo seleccionado** — muestra nombre del archivo + botón eliminar + botón upload
- **Multiple** — lista de archivos seleccionados con botón eliminar por archivo
- **DragAndDrop (small)** — zona de arrastre compacta + botón
- **DragAndDrop (large)** — zona de arrastre grande con icono
- **Drag-over** — zona activa durante el arrastre (`is-dragging-over`)
- **AutoUpload** — al seleccionar, se emite `uploadClicked` automáticamente
- **Disabled** — botón desactivado, zona no interactiva
- **Con error de validación** — mensaje de error bajo el componente

Referencia: `designs/dcx-ng-page-textarea-editor-file-upload.html`

---

## 5. SCSS / Tokens

Sin cambios en el SCSS del componente.

Únicamente se añade/corrige en la page demo:
- Eliminar `dcx-ng-page-file-upload.component.scss` custom grid → comentario estándar

---

## 6. Accesibilidad (WCAG AA)

### Estructura ARIA resultante

```html
<!-- Input oculto con label accesible -->
<dcx-ng-input type="file" [attr.aria-label]="label()" ... />

<!-- Zona de arrastre (cuando dragAndDrop=true) -->
<div class="dcx-file-upload__dropzone"
     role="region"
     aria-label="Zona de arrastre de archivos"
     ...>
  ...
</div>

<!-- Lista de archivos seleccionados -->
<ul class="dcx-file-upload__file-list" role="list">
  @for (item of selectedFileItems(); ...) {
    <li class="dcx-file-upload__file-item">
      ...
    </li>
  }
</ul>
```

### Interacción con teclado

| Tecla | Acción |
|-------|--------|
| `Tab` | Navega al botón "Choose file" |
| `Enter` / `Space` | Abre el selector de archivos (vía botón nativo) |
| `Tab` | Navega a cada botón "Eliminar" de la lista de archivos |
| `Enter` / `Space` | Elimina el archivo correspondiente |

> La zona de arrastre no requiere navegación de teclado propia porque el botón proporciona la alternativa accesible requerida por WCAG 2.5.1.

---

## 7. Test Cases

- [x] should create the component
- [x] should emit fileSelected when a file is selected
- [x] should emit fileSelected with null when file is cleared
- [x] should emit uploadClicked when upload button is clicked
- [x] should auto-emit uploadClicked when autoUpload is true
- [x] should filter files based on accept input
- [x] should handle drag-and-drop events
- [x] should disable interaction when disabled input is true
- [x] WCAG — should render file list as `<ul>` with `<li>` items when files are selected
- [x] WCAG — should render `aria-label` on the file input matching the label input
- [x] WCAG — should render `role="region"` and `aria-label` on the dropzone when dragAndDrop is true

---

## 7b. Decisión: componentes de librería vs HTML nativo

- **Lista de archivos** → `<ul>`/`<li>` HTML nativo. No existe `DcxNgList` en la librería.
- **Zona de arrastre** → `<div>` con `role="region"` es la solución correcta; no hay componente de región en la librería.
- **Input file** → se mantiene `DcxNgInputComponent` con atributo `aria-label` pasado desde fuera.

---

## 8. Out of Scope

- Lógica de subida real (no existe, el componente emite el archivo al consumidor)
- Soporte de teclado para drag-and-drop — WCAG 2.5.1 queda cubierto por el botón
- Traducción de los textos por defecto (`'Choose file'`, `'No file selected'`) — son responsabilidad del consumidor
- Rediseño del estilo del dropzone o la lista de archivos
- `DcxFileUploadItem.dropzoneSize` — se elimina de la interfaz al ser campo no usado

---

## 9. Open Questions

_(ninguna)_

---

## 10. Implementation Plan

1. **Interfaz** — eliminar `dropzoneSize?` de `DcxFileUploadItem` en `interfaces/file-upload.ts`
2. **Component HTML** — tres cambios:
   - `<ul role="list">` + `<li>` para la lista de archivos
   - `[attr.aria-label]="label()"` en el `DcxNgInputComponent` (input file)
   - `role="region"` + `[attr.aria-label]="'Zona de arrastre de archivos'"` en el div dropzone
3. **Spec.ts** — añadir 3 tests WCAG nuevos
4. **Storybook** — traducir categorías a `Atributos`/`Eventos`; añadir stories `Disabled` y `WithValidationError`
5. **Page demo TS** — simplificar a clase vacía (ya no necesita lógica si usamos señales en el template)
6. **Page demo HTML** — refactorizar con `demo-page`/`demo-section`; 8 secciones numeradas
7. **Page demo SCSS** — comentario estándar
8. **Verificar tests**: `npx nx test dcx-ng-lib --testFile=...dcx-ng-file-upload.component.spec.ts --no-coverage`

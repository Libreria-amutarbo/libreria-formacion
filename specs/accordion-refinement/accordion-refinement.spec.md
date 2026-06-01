## 1. Overview

Refinamiento del componente `dcx-ng-accordion` para corregir incumplimientos de WCAG AA,
mejorar la coherencia visual respecto al design de referencia
(`designs/dcx-ng-page-accordion.html`) y solucionar bugs detectados en la implementación actual.

El componente solo se usa en la página demo `src/app/pages/dcx-ng-page-accordion/` y en las stories de Storybook. No hay uso en producción fuera de la librería.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| #   | Criterio                         | Problema actual                                                                                                                                                                  | Solución                                                                                                                     |
| --- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | **4.1.2 Name, Role, Value**      | El header usa `<div role="button">` en lugar de un elemento nativo `<button>` dentro de un `<h3>`. Los lectores de pantalla anuncian `<button>` mucho mejor que `role="button"`. | Refactorizar a `<h3><button aria-expanded>…</button></h3>`                                                                   |
| 2   | **1.3.1 Info and Relationships** | El panel de contenido colapsado tiene `max-height:0; overflow:hidden` pero no `aria-hidden`. Algunos lectores de pantalla leen contenido oculto via CSS.                         | Añadir `[attr.aria-hidden]="!isExpanded(item.id)"` al panel (se descarta `[hidden]` porque deshabilita las transiciones CSS) |
| 3   | **2.4.3 Focus Order**            | El header div captura el foco con `tabindex`, pero sin `<button>` nativo el foco puede perderse cuando el item se expande/colapsa.                                               | El `<button>` nativo gestiona el foco correctamente por sí solo                                                              |

### 2.2 WCAG AA — Recomendados (nivel "should" del APG)

| #   | Criterio            | Descripción                                                                                         |
| --- | ------------------- | --------------------------------------------------------------------------------------------------- |
| 4   | Keyboard navigation | Flechas Arriba/Abajo, Home y End deben mover el foco entre headers (WAI-ARIA APG Accordion pattern) |

### 2.3 Bugs de lógica

| #   | Descripción                                                                                                                                                                                                                   |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5   | `_initEffect` se re-ejecuta en **cada cambio de `items` o `expandedIds`**, reseteando el estado expandido aunque el usuario ya haya interactuado con el acordeón. Se debe separar la inicialización de la reacción a cambios. |
| 6   | Doble scroll: `.accordion-content-wrapper` tiene `overflow-y:auto` cuando expanded Y `.accordion-content` también tiene `overflow-y:auto; max-height:600px`. Esto crea una barra de scroll dentro de otra.                    |
| 7   | Duplicación de estilos en `.accordion-header`: combina declaraciones directas (`display:flex`, `padding`) con mixins `@include flex-between` y `@include padding(m)` que probablemente hacen lo mismo.                        |

### 2.4 Mejoras de UX / coherencia

| #   | Descripción                                                                                                                                                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8   | El mock `DcxAccordionDefault` usa `content: 'Content 1'` — texto de placeholder sin valor. Deben ser textos realistas en los mocks para que la demo y Storybook sean coherentes con el design.                      |
| 9   | El mock `DcxAccordionItemsWithExpanded` tiene los 3 ítems con `expanded: true` pero `closeOthers: true` por defecto, con lo que solo quedará abierto el último. Es confuso.                                         |
| 10  | Falta `description` en la interfaz `DcxNgAccordionItem`. El design de referencia no lo muestra, pero es un campo habitual en accordions reales para añadir un subtítulo o texto de apoyo bajo el título del header. |

---

## 3. API / Interface

Sin cambios de ruptura. Solo adiciones:

### Interfaz `DcxNgAccordionItem` — añadir `description`

```ts
export interface DcxNgAccordionItem {
  id: string;
  title: string;
  description?: string;        // NUEVO — subtítulo opcional en el header
  content?: string;
  contentTemplate?: TemplateRef<any>;
  disabled?: boolean;
  disabledContent?: boolean;
  icon?: string;
  expanded?: boolean;
}
```

### Inputs (sin cambios)

| Name          | Type                     | Default    | Description                   |
| ------------- | ------------------------ | ---------- | ----------------------------- |
| `items`       | `DcxNgAccordionItem[]`   | `[]`       | Items del acordeón            |
| `transition`  | `DcxAccordionTransition` | `'smooth'` | Velocidad de la transición    |
| `closeOthers` | `boolean`                | `true`     | Colapsa el resto al abrir uno |
| `expandedIds` | `string[]`               | `[]`       | IDs expandidos por defecto    |

### Outputs (sin cambios)

| Name            | Emitted Type         | Description      |
| --------------- | -------------------- | ---------------- |
| `itemToggled`   | `DcxNgAccordionItem` | Cualquier cambio |
| `itemExpanded`  | `DcxNgAccordionItem` | Al expandir      |
| `itemCollapsed` | `DcxNgAccordionItem` | Al colapsar      |

### Métodos públicos (sin cambios)

| Method             | Signature               | Description                 |
| ------------------ | ----------------------- | --------------------------- |
| `expandItemById`   | `(id: string): void`    | Expande por ID externamente |
| `collapseItemById` | `(id: string): void`    | Colapsa por ID externamente |
| `isExpanded`       | `(id: string): boolean` | Consulta estado             |

---

## 4. Visual States & Variants

Alineado con `designs/dcx-ng-page-accordion.html`:

| Estado               | Descripción                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| **Default**          | Fondo blanco, borde `#e5e7eb`, header con texto dark                      |
| **Hover**            | Header fondo `#f7f8fa`                                                    |
| **Expanded**         | Header fondo `#f7f8fa`, chevron rotado 180°, contenido visible            |
| **Disabled**         | 45% opacity, cursor `not-allowed`, sin hover, `tabindex="-1"` en el botón |
| **Content Disabled** | Panel visible pero con `opacity:0.5; pointer-events:none`                 |
| **Focus Visible**    | Outline `2px solid #1db8f2` con `outline-offset:-2px` en el botón         |

No se añaden variantes visuales nuevas (el diseño no las contempla).

---

## 5. SCSS / Tokens

Tokens usados (sin cambios):

- `--bg-default` / `--bg-hover` / `--bg-primary`
- `--border-light`, `--border-focus`
- `--text-dark`, `--text-muted`, `--text-disabled`
- `--sp-3`, `--sp-4`, `--sp-5`
- `--r-lg`, `--fs-base`, `--fw-medium`

Cambios en SCSS:

- Eliminar la duplicación de `display:flex` / `padding` en `.accordion-header`
- Eliminar `overflow-y: auto` del `.accordion-content-wrapper` (mantener solo en `.accordion-content` si se quiere scroll interno) o del `.accordion-content`; no en ambos

---

## 6. Accessibility (WCAG AA)

### Estructura HTML objetivo (APG Accordion pattern)

```html
<div class="accordion">
  <div class="accordion-item">
    <h3 class="accordion-heading">
      <button
        class="accordion-trigger"
        [id]="'accordion-header-' + item.id"
        [attr.aria-expanded]="isExpanded(item.id)"
        [attr.aria-controls]="'accordion-content-' + item.id"
        [disabled]="item.disabled || null"
        (click)="toggleItem(item)"
        (keydown)="onHeaderKeydown($event, item)"
      >
        <dcx-ng-icon *ngIf="item.icon" … />
        <span class="accordion-title">{{ item.title }}</span>
        <span *ngIf="item.description" class="accordion-description">{{ item.description }}</span>
        <dcx-ng-icon class="accordion-chevron" … />
      </button>
    </h3>
    <div
      class="accordion-panel"
      [id]="'accordion-content-' + item.id"
      role="region"
      [attr.aria-labelledby]="'accordion-header-' + item.id"
      [hidden]="!isExpanded(item.id)"
    >
      …content…
    </div>
  </div>
</div>
```

### Keyboard interaction

| Tecla             | Comportamiento                      |
| ----------------- | ----------------------------------- |
| `Enter` / `Space` | Toggle del item con foco            |
| `↓`               | Foco al siguiente header (circular) |
| `↑`               | Foco al header anterior (circular)  |
| `Home`            | Foco al primer header               |
| `End`             | Foco al último header               |

> Los items disabled se saltan en la navegación con flechas.

### Notas adicionales

- El `[hidden]` en el panel elimina el contenido del árbol de accesibilidad cuando está colapsado, evitando que lectores de pantalla lo lean accidentalmente.
- El `<button>` nativo tiene el rol `button` implícito, no necesita `role="button"` explícito.
- El atributo `disabled` nativo en el `<button>` hace que sea ignorado por AT de forma nativa, no necesita `tabindex="-1"` adicional.

---

## 7. Test Cases

El spec `.spec.ts` ya existe y tiene buena cobertura. Se añaden/actualizan los siguientes casos:

### Casos nuevos a cubrir

- [ ] El header renderiza un elemento `<button>` nativo (no un `<div>`)
- [ ] El `<button>` tiene el atributo `aria-expanded="false"` por defecto
- [ ] El `<button>` tiene el atributo `aria-expanded="true"` tras expandir
- [ ] El panel de contenido tiene `hidden` cuando está colapsado
- [ ] El panel de contenido NO tiene `hidden` cuando está expandido
- [ ] `disabled` nativo está en el `<button>` para items deshabilitados
- [ ] La tecla `ArrowDown` mueve el foco al siguiente header habilitado
- [ ] La tecla `ArrowUp` mueve el foco al header anterior habilitado
- [ ] La tecla `Home` mueve el foco al primer header habilitado
- [ ] La tecla `End` mueve el foco al último header habilitado
- [ ] Los items con `description` muestran el subtítulo en el header
- [ ] `_initEffect` no resetea el estado cuando el usuario interactúa después de la inicialización

### Casos existentes que hay que actualizar

- `should set aria-expanded attribute correctly` → seleccionar `button` en lugar de `.accordion-header`
- `should disable button for disabled items` → verificar `disabled` nativo en lugar de `tabindex="-1"` y clase `.disabled`

---

## 7b. Decisión: `<button>` nativo vs `DcxNgButtonComponent`

Se usa **`<button>` nativo** en lugar de `DcxNgButtonComponent` por los siguientes motivos:

1. `DcxNgButtonComponent` es un botón de acción standalone con estilos propios: padding por tamaño, variantes visuales (primary/secondary/ghost/danger), ancho fijo. No está diseñado para layouts inline de ancho completo.
2. El trigger del accordion es un patrón de "fila expandible" — ocupa el 100% del ancho, tiene `justify-content: space-between`, y su apariencia no coincide con ninguna variante del botón de la librería.
3. Adaptar `DcxNgButtonComponent` requeriría sobreescribir prácticamente todo su CSS o añadir una variante "unstyled/flat" que borrosaría el propósito del componente.
4. La especificación WAI-ARIA APG usa exactamente `<button>` nativo para este patrón.

No se modifica `DcxNgButtonComponent`.

---

## 8. Out of Scope

- Animaciones de altura con JavaScript (grid trick / ResizeObserver) — el `max-height` hack es suficiente para AA
- Variantes visuales adicionales (flush, pills, etc.)
- Drag & drop de items
- Items anidados (sub-accordions)
- `innerHTML` sanitización adicional (Angular ya lo hace automáticamente)
- Nivel de heading configurable (`headingLevel` input) — se usa `<h3>` como valor razonable por defecto

---

## 9. Open Questions

- [ ] ¿Se quiere mantener `disabledContent` (panel visible pero no interactivo)? Es un caso de uso inusual. Si se elimina, simplifica el componente.
- [ ] ¿El `description` en el header debe estar dentro o fuera del `<button>`? (dentro tiene mejor accesibilidad ya que lo lee el AT como parte del nombre accesible)
- [ ] ¿El nivel del heading (`<h3>`) debe ser configurable como input `headingLevel: 2 | 3 | 4 | 5 | 6`?

---

## 10. Implementation Plan

1. **Refactorizar HTML** — Cambiar `<div role="button">` a `<h3><button …></button></h3>` con `[hidden]` en el panel
2. **Actualizar TS** — Añadir `onHeaderKeydown` con soporte para flechas, Home, End; corregir `_initEffect` con `untracked`
3. **Actualizar SCSS** — Eliminar duplicaciones; renombrar clases de `accordion-header` a `accordion-trigger` para claridad; fix doble scroll
4. **Actualizar interfaz** — Añadir `description?: string` a `DcxNgAccordionItem`
5. **Actualizar mocks** — Contenido realista en `DcxAccordionDefault`; fix `DcxAccordionItemsWithExpanded`
6. **Actualizar spec** — Añadir casos WCAG y descripción; actualizar casos existentes
7. **Actualizar stories** — Añadir story `WithDescription`; corregir story `WithComponents` (botones sin bind)
8. **Actualizar página demo** — Coherencia con los nuevos mocks

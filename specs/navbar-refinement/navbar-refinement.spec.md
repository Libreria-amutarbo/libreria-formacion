**Status:** Done

## 1. Overview

Refinamiento del componente `dcx-ng-navbar` para corregir un bug de theming que rompe su fondo/colores fuera de la demo, cerrar varias brechas de WCAG AA (landmark sin nombre, sin `aria-current`, menú móvil sin `aria-expanded`/`aria-controls`), alinear el código con el estándar del proyecto (`dcx-ng-accordion`) y migrar la página demo al patrón `.demo-page`/`.demo-section`.

El componente se usa en la página demo `src/app/pages/dcx-ng-page-navbar/` y en Storybook. `src/app/app.component.ts` importa `DcxNgNavbarComponent` y prepara datos (`brand`, `navItems`, `activeRoute`) pero no lo declara en `imports` ni lo referencia en su template — no hay consumo real en el shell de la app. Esto queda fuera de este refinamiento (ver sección 8).

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|---|---|---|
| 1 | **1.4.3 Contrast (Minimum)** — vía bug de tokens | `dcx-ng-navbar.component.scss:18` fija `background-color: var(--background-primary)` **sin fallback**. `--background-primary` no existe en el catálogo de tokens del tema (`core/fixtures/theme-tokens.ts`, que solo define `--bg-*`) ni se declara en ningún `:root` global — solo hay una redefinición local ajena en `dcx-ng-contextMenu.component.scss:42`. Al ser una propiedad no heredada (`background-color`) con un custom property inválido/indefinido y sin fallback, el navegador la resuelve como *initial* (`transparent`), no como el azul de marca. El resultado es un fondo impredecible/roto fuera del `main.css` de la demo. Lo mismo ocurre con `color: var(--text-label-base)` en `navbar.component.scss:37` (brand title) y `box-shadow: var(--shadow-1)`/`var(--shadow-2)` — ninguno de estos tres tokens existe en el catálogo del tema ni tiene fallback. | Renombrar a los tokens reales del catálogo (`--bg-default`, `--text-dark`, `--border-light`) **siempre con fallback**, igual que `dcx-ng-accordion`/`dcx-ng-button` (`var(--bg-default, #ffffff)`). Ver sección 5. |
| 2 | **4.1.2 Name, Role, Value** | El botón hamburguesa (`navbar.component.html:43-51`) no tiene `aria-expanded` ni `aria-controls`. Un usuario de lector de pantalla no puede saber si el menú móvil está abierto ni qué controla. | Añadir `[attr.aria-expanded]` y `[attr.aria-controls]` apuntando al `id` de `<ul class="dcx-ng-navbar__items">`. |
| 3 | **1.3.1 Info and Relationships / 2.4.4 Link Purpose** | El item activo solo se marca con `class.is-active` (`navbar.component.html:23`). No hay `aria-current`, así que un lector de pantalla no anuncia cuál es la sección actual. | Añadir `aria-current="page"` en el item cuyo `value` coincide con `activeValue()`. |
| 4 | **1.3.1 / 2.4.6 Headings and Labels** | `<nav>` (`navbar.component.html:1`) no tiene `aria-label`. La página demo instancia 5 navbars en la misma vista; un lector de pantalla anuncia "navigation" repetido sin poder diferenciarlas. | Añadir input `ariaLabel` y `[attr.aria-label]` en el `<nav>` (mismo patrón que `dcx-ng-accordion`). |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|---|---|
| 5 | 2.1.2 No Keyboard Trap / APG Disclosure Pattern | El menú móvil (patrón *disclosure*) no cierra con `Escape` ni devuelve el foco al botón toggle al cerrarse. |
| 6 | 4.1.2 Name, Role, Value | El brand (`navbar.component.html:7-16`) es un `<div>` no interactivo pese a que el design de referencia (`designs/dcx-ng-page-navbar.html:150`) lo muestra como un enlace a inicio. Al no ser interactivo hoy, no hay incumplimiento activo, pero tampoco ofrece la funcionalidad que el diseño espera. |

### 2.3 Bugs de lógica / tokens

| # | Descripción |
|---|---|
| 7 | `ariaLabel="Toggle navigation"` (`navbar.component.html:49`) está en inglés; el resto del proyecto (stories, docs, fixtures) está en español. |
| 8 | Tokens de layout usados sin fallback y fuera del catálogo del tema: `--font-family-primary`, `--font-size-h6`, `--font-weight-semibold`, `--spacing-l`, `--spacing-m`, `--spacing-s`, `--spacing-xs` (`navbar.component.scss:10,17,24,35,36,44,58,71,80,97`). Estos sí están definidos en `libs/dcx-ng-lib/src/scss/main.css` (CSS estático de la demo), pero **no** forman parte del sistema de theming en tiempo de ejecución (`dcx-ng-theme-generator`) ni tienen fallback — si el consumidor de la librería no incluye ese `main.css`, se rompen igual que el punto 1. |
| 9 | `isMenuOpen` (`navbar.component.ts:31`) es un `signal` público sin protección: cualquier consumidor externo puede hacer `component.isMenuOpen.set(true)` sin pasar por `toggleMenu()`/`onItemClick()`. |
| 10 | Fixture de librería `navbarItemsWithDisabled` (`core/fixtures/navbar.ts:17-22`, `value: 'blocked'` / label "Bloqueado") y datos locales de la página demo (`dcx-ng-page-navbar.component.ts:31-36`, `value: 'disabled'` / label "Deshabilitado") representan el mismo caso de uso con valores distintos — la página no reutiliza la fixture de la librería. |
| 11 | `dcx-ng-navbar.component.scss:63-65` declara `&__toggle { display: none; }` en el nivel raíz, redundante con el mismo valor ya establecido fuera del breakpoint móvil. |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|---|
| 12 | Cobertura de Storybook incompleta frente al mock de referencia (`designs/dcx-ng-page-navbar.html`): falta story de "menú móvil abierto" (viewport mobile). La variante "Dark" del mock se deja fuera de alcance (ver sección 8). |
| 13 | Categorías de `argTypes` en Storybook en inglés (`ClassBased.stories.ts:39,48,57,66,76`: `'Attributes'`/`'Events'`) — el estándar del proyecto (`Accordion/*.stories.ts`) usa `'Atributos'`/`'Eventos'`/`'Métodos'`. No hay categoría `'Métodos'` pese a que el componente expone `toggleMenu()`. |
| 14 | La página demo usa el patrón legacy `.example-title`/`.example-hint` (`dcx-ng-page-navbar.component.html`, `dcx-ng-page-navbar.component.scss:3-20`) en lugar de `.demo-page`/`.demo-section` (`src/styles/page-demo.scss`), usado ya por 20 páginas incluyendo `dcx-ng-page-accordion`. |
| 15 | El Ejemplo 2 de la página demo fusiona dos stories distintas (`ConLogo` + `ConItemActivo`) en un solo bloque, rompiendo la correspondencia 1:1 story↔ejemplo que sigue el resto de páginas migradas. |
| 16 | `dcx-ng-page-navbar.component.ts` no especifica `changeDetection: OnPush`, a diferencia de las páginas demo ya migradas. |

---

## 3. API / Interface

Sin cambios de ruptura. Solo adiciones.

### Interfaces (sin cambios)

```ts
export interface DcxNavbarBrand {
  title: string;
  logo?: string;
}

export interface DcxNavItem {
  label: string;
  value: string;
  icon?: string;
  disabled?: boolean;
}
```

### Inputs — `dcx-ng-navbar`

| Name | Type | Default | Nuevo | Descripción |
|---|---|---|---|---|
| `brand` | `DcxNavbarBrand` | `{ title: 'App' }` | | Título y logo del brand |
| `items` | `DcxNavItem[]` | `[]` | | Items de navegación |
| `activeValue` | `string \| null` | `null` | | Value del item activo |
| `vertical` | `boolean` | `false` | | Modo sidebar |
| `ariaLabel` | `string \| null` | `null` | ✅ | Nombra el landmark `<nav>` cuando hay varias navbars en la misma página |

### Outputs — `dcx-ng-navbar`

| Name | Emitted Type | Nuevo | Descripción |
|---|---|---|---|
| `itemClick` | `string` | | Value del item clickado |
| `brandClick` | `void` | ✅ | Se emite al activar el brand (click/Enter/Space); el componente no navega por sí mismo |

### Métodos públicos — `dcx-ng-navbar` (sin cambios de firma)

| Method | Signature | Descripción |
|---|---|---|
| `toggleMenu` | `(): void` | Alterna el menú móvil |

`isMenuOpen` deja de ser un `signal` público mutable y pasa a `isMenuOpen = this._isMenuOpen.asReadonly()` (solo lectura reactiva desde fuera).

### Inputs nuevos — `dcx-ng-button` (extensión aditiva, no rompe consumidores existentes)

| Name | Type | Default | Descripción |
|---|---|---|---|
| `ariaExpanded` | `boolean \| null` | `null` | Se refleja como `[attr.aria-expanded]` en el `<button>` interno |
| `ariaControls` | `string \| null` | `null` | Se refleja como `[attr.aria-controls]` en el `<button>` interno |
| `ariaCurrent` | `string \| boolean \| null` | `null` | Se refleja como `[attr.aria-current]` en el `<button>` interno |

Justificación de extender `DcxNgButtonComponent` en vez de duplicar: ver sección 7b.

---

## 4. Visual States & Variants

Alineado con `designs/dcx-ng-page-navbar.html` (sección "Horizontal / Light (default)" y "Vertical / Sidebar" — la variante "Dark" queda fuera de alcance, ver sección 8):

| Estado | Descripción |
|---|---|
| **Default (horizontal)** | Fondo `--bg-default` (blanco), `border-bottom: 1px solid var(--border-light)`, altura 52px |
| **Item hover** | Heredado de `dcx-ng-button` variant `text` |
| **Item activo** | Color `--bg-primary`, `border-bottom: 2px solid var(--bg-primary)`, `font-weight` mayor, `aria-current="page"` |
| **Item disabled** | Heredado de `dcx-ng-button` (`disabled` nativo) |
| **Vertical (sidebar)** | Sin cambios visuales — ya implementado correctamente |
| **Menú móvil cerrado/abierto** | `aria-expanded` sincronizado con `.is-menu-open`; `Escape` cierra y devuelve el foco al toggle |
| **Focus visible** | Heredado de `dcx-ng-button`; sin cambios |

No se añade una variante `dark` explícita en este refinamiento (ver sección 8).

---

## 5. SCSS / Tokens

### Mapeo de tokens rotos → tokens reales del catálogo (con fallback, patrón `dcx-ng-accordion`/`dcx-ng-button`)

| Token actual (sin fallback, no catalogado) | Token nuevo |
|---|---|
| `var(--font-family-primary)` (`:host`) | `var(--ff-base, 'Inter', sans-serif)` |
| `var(--background-primary)` (fondo nav, `:18`, `:81`) | `var(--bg-default, #ffffff)` |
| `box-shadow: var(--shadow-1)` (`:19`) | `border-bottom: 1px solid var(--border-light, #d1d5db)` (coincide con el mock; se elimina el `box-shadow` no catalogado) |
| `var(--text-label-base)` (brand title, `:37`) | `var(--text-dark, #1e2226)` |
| `var(--font-size-h6)` (brand title, `:35`) | `var(--fs-base, 14px)` |
| `var(--font-weight-semibold)` (brand title, `:36`) | `var(--fw-bold, 700)` |
| `var(--spacing-l)` (padding horizontal, `:17`, `:71`) | `var(--sp-4, 16px)` |
| `var(--spacing-m)` (padding móvil, `:71`) | `var(--sp-4, 16px)` |
| `var(--spacing-s)` / `var(--spacing-xs)` (gaps) | `var(--sp-3, 12px)` / `var(--sp-2, 8px)` |
| `box-shadow: var(--shadow-2)` (menú móvil desplegado y sidebar, `:82`, `:120`) | `var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1))` |

### Item activo (nuevo, no existe hoy)

```scss
.dcx-ng-navbar__item-btn.is-active {
  color: var(--bg-primary, #0058ab);
  border-bottom: 2px solid var(--bg-primary, #0058ab);
  font-weight: var(--fw-bold, 700);
}
```

Requiere `dcx-ng-button` variant `text` exponga el color vía una clase que el navbar pueda sobreescribir (ya lo hace: `.is-active` se aplica directamente sobre `<dcx-ng-button>`, cuyo host no tiene encapsulación de shadow DOM, por lo que el selector funciona igual que hoy).

### Otros cambios

- Eliminar la declaración redundante `&__toggle { display: none; }` fuera del breakpoint móvil (problema 2.3 #11) — se mantiene solo dentro de `@media` donde cambia a `inline-block`.
- Brand como elemento interactivo: cambiar `<div class="dcx-ng-navbar__brand">` a `<button type="button" class="dcx-ng-navbar__brand">` con estilos `background: none; border: none; cursor: pointer; padding: 0;` para no alterar el layout actual.

---

## 6. Accesibilidad (WCAG AA)

### Estructura HTML objetivo

```html
<nav
  class="dcx-ng-navbar"
  [class.is-menu-open]="isMenuOpen()"
  [class.dcx-ng-navbar--vertical]="vertical()"
  [attr.aria-label]="ariaLabel()"
>
  <button type="button" class="dcx-ng-navbar__brand" (click)="onBrandClick()">
    @if (brand().logo) {
      <img class="dcx-ng-navbar__brand-logo" [src]="brand().logo" [alt]="brand().title" />
    }
    <span class="dcx-ng-navbar__brand-title">{{ brand().title }}</span>
  </button>

  <ul class="dcx-ng-navbar__items" id="dcx-ng-navbar-items" role="list">
    @for (item of items(); track item.value) {
      <li class="dcx-ng-navbar__item">
        <dcx-ng-button
          class="dcx-ng-navbar__item-btn"
          [class.is-active]="activeValue() === item.value"
          [label]="item.label"
          [icon]="!!item.icon"
          [iconName]="item.icon ?? ''"
          iconPosition="left"
          iconSize="s"
          variant="text"
          size="s"
          [disabled]="item.disabled ?? false"
          [ariaCurrent]="activeValue() === item.value ? 'page' : null"
          (buttonClick)="onItemClick(item.value)"
        />
      </li>
    }
  </ul>

  <div class="dcx-ng-navbar__actions">
    <ng-content />
  </div>

  <dcx-ng-button
    class="dcx-ng-navbar__toggle"
    variant="text"
    [icon]="true"
    [iconName]="isMenuOpen() ? 'x' : 'list'"
    iconSize="m"
    [ariaLabel]="isMenuOpen() ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'"
    [ariaExpanded]="isMenuOpen()"
    ariaControls="dcx-ng-navbar-items"
    (buttonClick)="toggleMenu()"
    (keydown.escape)="closeMenu()"
  />
</nav>
```

### Keyboard interaction

| Tecla | Comportamiento |
|---|---|
| `Enter` / `Space` en el toggle | Abre/cierra el menú móvil |
| `Escape` (con el menú abierto) | Cierra el menú y devuelve el foco al botón toggle |
| `Enter` / `Space` en un item | Activa el item, cierra el menú si está en modo móvil |

### Notas adicionales

- `aria-current="page"` se usa (no `"true"`) porque los items representan destinos de navegación, siguiendo la convención WAI-ARIA APG para navbars.
- `id="dcx-ng-navbar-items"` es fijo porque solo existe una `<ul>` de items por instancia del componente; al no haber Shadow DOM, si en el futuro se permiten varias navbars con el toggle visible simultáneamente en el DOM (no es el caso hoy: el patrón `@media` solo muestra un toggle a la vez por breakpoint) habría que generar el id dinámicamente. Se documenta como asunción, no se implementa generación dinámica en este refinamiento por no ser necesaria con el uso actual.
- El brand como `<button>` no rompe el layout: mismos hijos (`img`+`span`), mismas clases, solo cambia el tag y se resetean los estilos de botón nativo.

---

## 7. Test Cases

El `.spec.ts` actual solo tiene `should create`. Se añade cobertura completa:

### Estructurales / WCAG
- [x] El `<nav>` refleja `[attr.aria-label]` cuando se pasa el input `ariaLabel`
- [x] El `<nav>` no tiene `aria-label` cuando `ariaLabel` es `null`
- [x] El botón toggle tiene `aria-expanded="false"` por defecto
- [x] El botón toggle tiene `aria-expanded="true"` tras `toggleMenu()`
- [x] El botón toggle tiene `aria-controls` apuntando al `id` de la lista de items
- [x] El item cuyo `value` coincide con `activeValue()` tiene `aria-current="page"`
- [x] Los items que no coinciden con `activeValue()` no tienen `aria-current`
- [x] El brand se renderiza como `<button>` nativo

### Funcionales
- [x] `toggleMenu()` alterna `isMenuOpen()`
- [x] `onItemClick(value)` cierra el menú y emite `itemClick` con el `value`
- [x] Al pulsar `Escape` con el menú abierto, se cierra y el foco vuelve al botón toggle
- [x] Al hacer click en el brand se emite `brandClick`
- [x] `isMenuOpen` es de solo lectura desde fuera del componente (no expone `.set()`/`.update()`)

### `dcx-ng-button` (extensión)
- [x] `ariaExpanded` se refleja como `aria-expanded` en el `<button>` interno
- [x] `ariaControls` se refleja como `aria-controls` en el `<button>` interno
- [x] `ariaCurrent` se refleja como `aria-current` en el `<button>` interno
- [x] Ninguno de los tres se renderiza cuando su valor es `null` (no rompe componentes existentes que no los usan)

### Casos existentes a mantener
- `should create` (sin cambios)

### Nota de implementación
El input #16 de la sección 2.4 (`ChangeDetectionStrategy.OnPush` en la página demo) **no se aplicó**: se verificó que `dcx-ng-page-accordion` (el gold standard citado como referencia) tampoco lo usa, así que añadirlo solo al navbar habría sido inconsistente con el patrón real del proyecto.

---

## 7b. Decisión: extender `DcxNgButtonComponent` vs `<button>` nativo para items/toggle

A diferencia de `dcx-ng-accordion` (que sustituyó su trigger por un `<button>` nativo porque `DcxNgButtonComponent` no encajaba con el layout de fila expandible), en el navbar **se mantiene `dcx-ng-button`** para los items y el toggle, extendiéndolo con `ariaExpanded`/`ariaControls`/`ariaCurrent`:

1. El bloqueador real no es el layout (los items de navbar sí encajan en `variant="text" size="s"`, ya funciona hoy), sino que Angular no proyecta atributos `[attr.aria-*]` puestos en el tag `<dcx-ng-button>` hacia el `<button>` interno — quedan huérfanos en el host. La solución mínima es que el propio componente los reciba como `input()` y los enlace él mismo, igual que ya hace hoy con `aria-pressed`, `aria-checked` y `role` (`dcx-ng-button.component.html:8-10`).
2. Duplicar un `<button>` nativo con las clases BEM de `dcx-ng-button` en el navbar implicaría reimplementar estados de `disabled`, iconos, `focus-visible` y tamaños ya resueltos — justo el tipo de duplicación que el proyecto evita.
3. La extensión es aditiva (`null` por defecto) y no afecta a ningún consumidor existente de `DcxNgButtonComponent`.

El brand, en cambio, sí pasa a `<button>` nativo sin estilos (no `dcx-ng-button`) porque no es un botón de acción con variantes visuales — es un contenedor de layout (logo + título) que solo necesita comportarse como control interactivo, igual que el criterio usado para el header del accordion.

---

## 8. Out of Scope

- Variante visual `dark` (mostrada en `designs/dcx-ng-page-navbar.html:184-203`) — implica un sistema de temas claro/oscuro que no existe hoy en ningún componente refinado de la librería; se deja como posible refinamiento futuro independiente.
- Navegación por teclado con flechas entre items (patrón *menubar* de WAI-ARIA APG) — un navbar de sitio no es un `menubar` según la propia guía APG; `Tab` secuencial es el patrón correcto y ya funciona.
- Integración de `dcx-ng-navbar` en `src/app/app.component.ts`/`.html` (el código muerto detectado en la fase de análisis) — es una decisión de producto sobre el shell de la app, no de refinamiento del componente.
- Generación dinámica de `id` para `dcx-ng-navbar-items` (múltiples instancias con toggle simultáneamente visible) — no ocurre con el uso actual del componente.
- Submenús / items anidados (dropdown) — no contemplados en el mock de diseño ni en la interfaz actual.
- `brandHref`/routing integrado — el componente no debe acoplarse a Angular Router; se limita a emitir `brandClick` y dejar la navegación al consumidor.

---

## 9. Open Questions

- [ ] ¿El nuevo output `brandClick` es necesario ahora, o se prefiere dejar el brand como `<button>` sin emitir nada (solo por accesibilidad/semántica) hasta que haya un caso de uso real?

---

## 10. Implementation Plan

1. **`dcx-ng-button`** — añadir inputs `ariaExpanded`, `ariaControls`, `ariaCurrent` y sus bindings `[attr.aria-*]` en `dcx-ng-button.component.html`; tests dedicados.
2. **Interfaz/defaults** — sin cambios en `DcxNavbarBrand`/`DcxNavItem`; unificar fixture `navbarItemsWithDisabled` (`value: 'blocked'`) para que la página demo la reutilice en vez de duplicar datos con `value: 'disabled'`.
3. **`dcx-ng-navbar.component.ts`** — añadir `ariaLabel` input, `brandClick` output, `onBrandClick()`, `closeMenu()`; encapsular `isMenuOpen` como readonly.
4. **`dcx-ng-navbar.component.html`** — aplicar la estructura de la sección 6: `aria-label` en `<nav>`, brand como `<button>`, `id` en la lista de items, `aria-expanded`/`aria-controls`/`aria-current` vía las nuevas props de `dcx-ng-button`, `(keydown.escape)` en el toggle.
5. **`dcx-ng-navbar.component.scss`** — aplicar el mapeo de tokens de la sección 5 (todos con fallback), añadir estilos de `.is-active`, quitar la declaración redundante de `&__toggle`, estilos del brand-button.
6. **`dcx-ng-navbar.component.spec.ts`** — cubrir los casos de la sección 7.
7. **Storybook (`ClassBased.stories.ts`)** — traducir `category` a `'Atributos'`/`'Eventos'`, documentar `ariaLabel`/`brandClick`; añadir story `MenuMovilAbierto` (viewport mobile); actualizar `Documentation.mdx`.
8. **Página demo** — migrar a `.demo-page`/`.demo-section`, separar el ejemplo fusionado (`ConLogo` + `ConItemActivo`) en dos bloques 1:1 con Storybook, reutilizar `navbarItemsWithDisabled` de la librería, añadir `ChangeDetectionStrategy.OnPush`.

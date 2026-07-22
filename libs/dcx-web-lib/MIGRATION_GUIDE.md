# Guía de migración: Angular → Web Components (Lit)

Esta guía explica cómo portar un componente de la librería Angular (`dcx-ng-lib`)
a la librería de Web Components (`dcx-web-lib`, basada en [Lit](https://lit.dev)).

Está pensada para que cualquier persona del equipo —o alguien que entre nuevo—
pueda migrar un componente siguiendo un patrón consistente. El componente de
referencia (“gold standard”) es el **accordion**.

---

## 1. Contexto: las dos librerías

| | `dcx-ng-lib` (origen) | `dcx-web-lib` (destino) |
|---|---|---|
| Tecnología | Angular 20 (standalone + signals) | Lit (`LitElement`) |
| Selector / tag | `dcx-ng-accordion` | `dcx-web-accordion` |
| Estilos | SCSS externo + `src/scss` global | CSS-in-JS (`css\`\`` en `*.styles.ts`), Shadow DOM |
| Reactividad | `signal` / `computed` / `effect` | `@property` / `@state` / `willUpdate` |
| Salidas | `output()` + `.emit()` | `dispatchEvent(new CustomEvent(...))` |
| Storybook | `@storybook/angular` | `@storybook/web-components-vite` |
| Consumo | Solo apps Angular | Cualquier framework o HTML plano |

**Objetivo de la transición:** que la librería deje de depender de Angular y
pueda usarse en cualquier stack. Por eso NO se debe importar nada de `@angular/*`
en `dcx-web-lib`.

---

## 2. Estructura de ficheros de un componente

Cada componente vive en `src/lib/dcx-web-components/dcx-web-<nombre>/` y **SIEMPRE**
consta de estos **4 ficheros** (estructura obligatoria e idéntica para todos):

```
dcx-web-<nombre>/
├── dcx-web-<nombre>.component.ts          # Clase LitElement
├── dcx-web-<nombre>.component.styles.ts   # export const styles = css`...`
├── dcx-web-<nombre>.component.html.ts       # export const template = (host) => html`...`
└── dcx-web-<nombre>.component.spec.ts      # tests
```

**Convenciones de nombres (obligatorias, sin excepciones):**

- **Estilos:** ``export const styles = css`...` `` (siempre `styles`, nunca
  `dcxWeb<Nombre>Styles` ni `<nombre>Styles`). En el componente:
  `static override styles = styles;`.
- **Template:** el render vive SIEMPRE en el `.component.html.ts` como
  `export const template = (host: DcxWeb<Nombre>) => html\`...\``, y el
  componente hace `override render() { return template(this); }`.
- **`host`** es siempre el nombre del parámetro del template (nunca `component`,
  `context`, `input`, etc.).
- Cualquier método/getter/estado que use el template debe ser **público**
  (sin `private`, sin prefijo `_`). Los helpers puramente internos siguen
  `private` con prefijo `_`.

Los tipos, `enum`s, `defaults` y `fixtures` van a `src/lib/core/`
(`interfaces/`, `defaults/`, `fixtures/`, `tokens/`), igual que en Angular.
**Nunca** definas `type`/`interface`/mocks/consts de datos dentro del
`.component.ts`.

---

## 3. Tabla de equivalencias Angular → Lit

| Angular (`dcx-ng-lib`) | Lit (`dcx-web-lib`) |
|---|---|
| `@Component({ selector: 'dcx-ng-x' })` | `@customElement('dcx-web-x')` |
| `input<T>(def)` | `@property({ type: T }) accessor prop = def;` |
| `input<T>()` con atributo kebab | `@property({ type: T, attribute: 'close-others' }) accessor closeOthers` |
| `input` de objeto/array complejo | `@property({ attribute: false }) accessor value` (no se serializa a atributo) |
| `output<T>()` + `this.x.emit(v)` | `this.dispatchEvent(new CustomEvent('x', { detail: v, bubbles: true, composed: true }))` |
| `signal<T>()` privado | `@state() private accessor _x` |
| `computed(() => ...)` | `get x() { return ... }` (getter) o `@state` recalculado en `willUpdate` |
| `effect(() => ...)` sobre inputs | `willUpdate(changed) { if (changed.has('prop')) {...} }` |
| `templateUrl` / `styleUrl` | `render()` con `html\`\`` + `static styles = css\`\`` |
| `*ngIf` | `cond ? html\`...\` : nothing` |
| `*ngFor` | `items.map(item => html\`...\`)` |
| `[class.x]` / `[ngClass]` | `classMap({ x: cond })` (`lit/directives/class-map.js`) |
| `[style.x]` / `[ngStyle]` | `styleMap({ ... })` (`lit/directives/style-map.js`) |
| `[innerHTML]` | `unsafeHTML(str)` (`lit/directives/unsafe-html.js`) |
| `[attr.x]="v"` | `x="${v ?? nothing}"` |
| `(click)="fn()"` | `@click="${() => this.fn()}"` |
| `@ViewChild` / `ElementRef` | `this.shadowRoot?.querySelector(...)` |
| DI `inject(Service)` | instanciar la clase, o helper sin DI (ver `icon.service.ts` web) |

> **Convención de eventos:** se emiten en `camelCase` (`valueChange`, `itemToggled`,
> `buttonClick`). Siempre con `bubbles: true, composed: true` para que crucen el
> Shadow DOM. Es útil un helper `emit(name, detail)` en la clase (ver `input`).

---

## 4. Anatomía de un componente (patrón)

```ts
import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { DcxWebXItem, DcxWebXVariant } from '../../core/interfaces';
import { styles } from './dcx-web-x.component.styles';

@customElement('dcx-web-x')
export class DcxWebX extends LitElement {
  // 1) Inputs públicos → @property con accessor
  @property({ type: Array }) accessor items: DcxWebXItem[] = [];
  @property({ type: String }) accessor variant: DcxWebXVariant = 'default';
  @property({ type: Boolean, attribute: 'close-others' }) accessor closeOthers = true;

  // 2) Estado interno → @state
  @state() private accessor _expanded = new Set<string>();

  // 3) Estilos
  static override styles = styles;

  // 4) Derivar estado de inputs (equivalente a effect)
  override willUpdate(changed: Map<PropertyKey, unknown>) {
    if (changed.has('items')) {
      // recalcular estado derivado
    }
  }

  // 5) Métodos + emisión de eventos
  private toggle(item: DcxWebXItem) {
    // ...mutar _expanded creando un Set NUEVO (inmutable) para forzar re-render
    this._expanded = new Set(this._expanded);
    this.dispatchEvent(
      new CustomEvent('itemToggled', { detail: item, bubbles: true, composed: true }),
    );
  }

  // 6) Render
  override render() {
    return html`
      <div class="${classMap({ 'dcx-x': true, 'dcx-x--flush': this.variant === 'flush' })}">
        ${this.items.map(item => html`...`)}
      </div>
    `;
  }
}

// 7) Tipado global del tag
declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-x': DcxWebX;
  }
}
```

### Puntos clave / trampas frecuentes

- **`accessor` es obligatorio** con los decoradores de Lit en este proyecto
  (usa TC39 decorators + `useDefineForClassFields`).
- **Inmutabilidad para re-render:** al mutar `Set`/`Map`/arrays de `@state`,
  reasigna una copia nueva (`this._x = new Set(this._x)`); mutar en sitio no
  dispara actualización. Si mutas dentro de un método complejo puedes forzar con
  `this.requestUpdate()`.
- **Atributos vs propiedades:** los primitivos (string/number/boolean) se
  reflejan como atributos; usa `attribute: 'kebab-case'` si el nombre lleva
  mayúsculas. Objetos/arrays: usa `@property({ attribute: false })`.
- **`ariaLabel` y `id`** que existen en `HTMLElement` requieren `override accessor`.
- **Shadow DOM por defecto.** Los estilos van encapsulados en `styles`. Solo
  usa `createRenderRoot() { return this; }` (Light DOM) si hay una razón fuerte
  (el `icon` lo hace por los Bootstrap Icons — ver §7, es una excepción a revisar).

---

## 5. Estilos (`*.styles.ts`)

- Se exporta ``export const styles = css`...` `` y se asigna en
  `static override styles = styles;`.
- Se usan **CSS custom properties con fallback** para el theming:
  `var(--background-default, #ffffff)`.
- Traduce el SCSS de Angular a CSS plano: nada de anidamiento SCSS, `$vars` ni
  mixins. Las clases pasan a nomenclatura BEM (`dcx-accordion__header--expanded`).

> ⚠️ **Los colores DEBEN usar los tokens de Capgemini** definidos en `dcx-ng-lib`
> (ver §11). No inventes nombres de variable ni colores nuevos.

---

## 11. Tokens de diseño (Capgemini) — fuente de verdad y deuda pendiente

La **fuente de verdad** son los tokens definidos en
`libs/dcx-ng-lib/src/scss/base/` (`_color.scss`, `_spacing.scss`,
`_typography.scss`, `_radius.scss`, `_shadows.scss`). El fichero
`utils/_variables.scss` los emite como CSS custom properties en `:root`:

| Familia | Nombres canónicos |
|---|---|
| Fondo | `--background-{default,primary,primary-hover,primary-pressed,secondary,secondary-light,pressed,disabled,hover,off,error}` |
| Contenido | `--content-{default-white,default-dark,primary,hover,terciary,disabled,disabled-dark,error-text,error}` |
| Borde | `--border-{primary,default,hover,terciary,disabled,focus,error}` |
| Texto | `--text-{title,body,label-default,label-base,disabled,disabled-dark,link,error}` |
| Estado | `--status-{success,warning,error,info}` |
| Radio | `--radius-{xs,sm,md,lg,xl,pill,full}` |
| Sombra | `--shadow-{none,sm,md,lg}` |
| Fuente | `--font-family-{primary,secondary,system}`, `--font-weight-{light,regular,medium,semibold,bold}`, `--font-size-{h1..h6,body-large,body,body-small,caption,overline}` |
| Espaciado | `--spacing-{base,xs,s,m,l,xl}` |

### ⚠️ Deuda detectada (auditoría)

Los `.styles.ts` actuales usan un **esquema de nombres inventado** que NO existe
en Capgemini, y además **los tokens `:root` no se cargan en el Storybook web**
(`.storybook/preview-head.html` solo carga Roboto + bootstrap-icons). Efecto:
hoy todo se pinta con los **hex de fallback**, no con los tokens reales.

**Mapeo directo (renombrado seguro):**

| Web-lib (inventado) | Capgemini canónico |
|---|---|
| `--bg-*` | `--background-*` |
| `--r-*` | `--radius-*` |
| `--fw-*` | `--font-weight-*` |
| `--ff-base` | `--font-family-primary` |
| `--shadow-0` | `--shadow-none` |
| `--border-{focus,error,default,hover,disabled}` | ya coinciden ✓ |
| `--status-*`, `--color-{success,warning,error,info}` | ya coinciden ✓ |

**Sin equivalente 1:1 (requieren decisión de diseño):**

- **Espaciado:** web usa escala numérica `--sp-1..16`; Capgemini usa nombres
  `--spacing-{base,xs,s,m,l,xl}`.
- **Tamaño de fuente:** web usa `--fs-{xs,sm,base,md,lg,xl,2xl}`; Capgemini usa
  semánticos `--font-size-{h1..h6,body,body-small,…}`.
- **Inventados sin token:** `--bg-surface`, `--border-light`, `--border-input`,
  `--text-muted`, `--text-placeholder`, `--text-dark`, `--text-white`.

### Plan pendiente (no aplicado aún)

1. Generar el CSS `:root` de tokens Capgemini desde el SCSS y cargarlo en el
   Storybook web y para los consumidores (si no, se seguirán usando fallbacks).
2. Aplicar los renombrados directos de la tabla en todos los `.styles.ts`.
3. Decidir con diseño el mapeo de espaciado, tamaños de fuente y los inventados.
4. Caso aparte — **`dcx-web-icon`**: no debe forzar `color` en el host (rompe la
   herencia de `currentColor`), debería bundlear bootstrap-icons en vez de usar
   CDN por render, y unificar Light/Shadow DOM con el resto.

---

## 6. Storybook

Cada componente lleva en `src/lib/stories/<Nombre>/`:

- `ClassBased.stories.ts` — meta + stories.
- `Documentation.mdx` — documentación larga.

Convenciones (ver `stories/Button/ClassBased.stories.ts`):

- `title: 'DCXLibrary/WebComponents/<Nombre>'`, `component: 'dcx-web-<nombre>'`,
  `tags: ['autodocs']`.
- **`argTypes` en español**, con `table.category` = `'Atributos'` o `'Eventos'`.
- En el `render`, enlaza props con `.prop=${valor}` y eventos con `@evento=${handler}`.
- Importa `'../../../index'` para registrar los custom elements.

---

## 7. Servicios sin Angular

En Angular los servicios usan DI, `HttpClient` y `signal`. En web se reescriben
como clases planas:

- `icon.service.ts` (web) reimplementa un mini-`signal` y sustituye `HttpClient`
  por `fetch`. Es el patrón a seguir cuando un servicio dependía de Angular.

> ⚠️ **Deuda conocida a revisar en la auditoría:** `dcx-web-icon` renderiza en
> Light DOM e inyecta un `<link>` a un CDN de Bootstrap Icons en cada `render()`.
> Es una dependencia externa en runtime; conviene unificarlo con el resto.

---

## 8. Tests

- Jest + jsdom. Se crea el elemento con `document.createElement('dcx-web-x')`,
  se asignan propiedades, y se espera `await element.updateComplete` antes de
  aservar sobre el `shadowRoot`. Ver `dcx-web-accordion.component.spec.ts`.

---

## 9. Checklist para migrar un componente

1. [ ] Crear carpeta `dcx-web-<nombre>/` con los 3-4 ficheros.
2. [ ] Portar `interfaces` / `defaults` / `fixtures` necesarios a `core/`.
3. [ ] Traducir inputs → `@property`, outputs → `CustomEvent`, estado → `@state`.
4. [ ] Traducir el template (`.html`) al `.component.html.ts` como `export const template = (host) => html\`\``.
5. [ ] Traducir el SCSS a `css\`\`` con custom properties y BEM.
6. [ ] Añadir `declare global { HTMLElementTagNameMap }`.
7. [ ] Exportar el componente en `src/index.ts`.
8. [ ] Crear `stories/<Nombre>/` (stories + mdx) con argTypes en español.
9. [ ] Escribir/portar los tests (`.spec.ts`).
10. [ ] Verificar: `nx build dcx-web-lib`, `nx lint dcx-web-lib`, `nx test dcx-web-lib`,
    y revisar en Storybook (`nx storybook dcx-web-lib`).

---

## 10. Estado de la transición

**Migrados:** accordion, badge, breadcrumb, button, card, carousel, checkbox,
chip, context-menu, datepicker, dialog, divider, drawer, icon, input, input-otp,
select, slider, stepper.

**Pendientes:** calendar, editor, file-upload, full-table, iconField, list,
message, navbar, paginator, picklist, popover, progressbar, radio,
scroll-top-down, skeleton, spinner, table, tabs, textarea, theme-generator,
toast, toggle, tooltip.

> Prioriza los componentes base de los que dependen otros (p. ej. `icon` y
> `tooltip`) antes que los compuestos (`full-table`, `navbar`).

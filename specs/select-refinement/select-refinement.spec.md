# Spec: Select Refinement

**Status:** Done
**Date:** 2026-07-09
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-select` es un combobox custom (no usa `<select>` nativo) con soporte de búsqueda, limpieza de valor, mensaje de error y `ControlValueAccessor` para Reactive/Template-driven Forms. Es, con diferencia, el componente más complejo refinado hasta ahora porque implementa el patrón ARIA **combobox + listbox**, uno de los patrones de accesibilidad más exigentes del catálogo WAI-ARIA APG.

El análisis encontró un problema estructural de fondo: el modelo de teclado actual **conflated** "opción resaltada mientras navegas" con "valor seleccionado" — las flechas mutan directamente la signal `value()`, que es exactamente el valor que se envía al formulario. Esto rompe el patrón combobox estándar (donde navegar con flechas solo mueve un highlight vía `aria-activedescendant`, y `Enter` confirma), produce un comportamiento confuso (aceptas un valor solo por pulsar una flecha, sin confirmar) y es la causa raíz de que falte `aria-activedescendant` por completo.

No existe un fichero de diseño dedicado a `select` en `designs/`; la única referencia visual es un `<select>` nativo dentro de `designs/dcx-ng-page-controls.html:44-78` (sección "Form Controls"), que confirma los tokens de color/spacing ya usados por el componente (`--bg-default`, `--border-default`, `--border-focus`, `--text-dark/muted/disabled`) pero no aporta ningún estado de panel abierto (un `<select>` nativo delega ese render al SO). El refinamiento del panel abierto se apoya por tanto en la implementación actual + el patrón APG, no en un mock pixel-a-pixel.

El componente se usa en `src/app/pages/dcx-ng-page-select/` y en Storybook. No hay otro consumo en `src/app/` fuera de su propia demo.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|---|---|---|
| 1 | **4.1.2 Name, Role, Value** — patrón combobox incompleto | No existe `aria-activedescendant` en ningún punto (`dcx-ng-select.component.html`). Las flechas (`onKey`, `ts:230-240`) navegan mutando directamente `value()`, en vez de mover un highlight anunciado vía `aria-activedescendant` mientras el foco permanece en el control. Un lector de pantalla no tiene forma de anunciar "opción resaltada actualmente" — solo se entera del cambio cuando ya se ha "seleccionado" (confirmado) sin que el usuario pulsara Enter. | Separar `activeIndex` (highlight de navegación) de `value` (valor confirmado). Añadir `[attr.aria-activedescendant]` en el control, apuntando al `id` de la opción activa. `Enter` confirma `activeIndex` → `value`. |
| 2 | **4.1.2 Name, Role, Value** — `disabled` no expuesto a AT | El control (`html:11-26`) es un `<div role="combobox">` con `tabindex="0"` **estático** (`html:16`, sin `[attr.tabindex]`). Cuando `disabled()` es `true` solo se añade la clase CSS `is-disabled` (`html:13`); no hay `aria-disabled` ni cambio de `tabindex`. El control deshabilitado sigue siendo alcanzable con Tab y no se anuncia como deshabilitado — el guard `if (this.disabled()) return;` en `toggle()` (`ts:179`) es solo defensa en JS, invisible para AT. | Añadir `[attr.aria-disabled]="disabled() || null"` y `[attr.tabindex]="disabled() ? -1 : 0"`. |
| 3 | **4.1.2 Name, Role, Value** — `aria-label` del botón de limpiar no se aplica | `<dcx-ng-button ... aria-label="Borrar selección">` (`html:36`) usa el atributo HTML con guion. `DcxNgButtonComponent` expone `ariaLabel = input<string>('')` (camelCase, `dcx-ng-button.component.ts:29`) — Angular solo enlaza inputs por nombre exacto (`ariaLabel="…"` o `[ariaLabel]="…"`), un atributo `aria-label="…"` en minúsculas-con-guion **no llega al input**. El botón interno cae al fallback `computedAriaLabel()` → `'Button'` (`dcx-ng-button.component.ts:78-84`), perdiendo silenciosamente el nombre accesible real. Se confirma el patrón correcto ya usado en el propio componente: `ariaLabel="Buscar opciones"` en el `dcx-ng-input` de búsqueda (`html:80`), que sí funciona por estar en camelCase. | Cambiar `aria-label="Borrar selección"` → `ariaLabel="Borrar selección"`. |
| 4 | **2.4.3 Focus Order / 4.1.2** — contenido enfocable dentro de `aria-hidden` | El botón chevron (`html:44-52`) tiene `aria-hidden="true"` y `tabindex="-1"` puestos en el **host** `<dcx-ng-button>`. `aria-hidden` en el host sí oculta el subárbol a AT (correcto), pero `tabindex="-1"` no se propaga al `<button>` interno porque `DcxNgButtonComponent` no tiene ningún input de tabindex — el `<button>` real sigue siendo alcanzable con Tab (tabindex nativo 0) estando oculto para AT. Es el anti-patrón "contenido enfocable dentro de `aria-hidden`" (regla axe `aria-hidden-focus`). | El chevron es puramente decorativo (`pointer-events:none` ya en SCSS, no tiene `(click)`, el toggle lo gestiona el control padre). Se sustituye `<dcx-ng-button>` por `<dcx-ng-icon aria-hidden="true">` sin wrapper de botón — elimina el problema de raíz sin tocar `DcxNgButtonComponent`. Ver sección 7b. |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|---|---|
| 5 | Teclado — Home/End | No implementados (contraste directo con `dcx-ng-accordion.component.ts:96-103`, que sí los tiene). El patrón APG combobox los requiere para saltar a la primera/última opción. |
| 6 | Teclado — modelo de foco inconsistente | Las opciones tienen hoy `tabindex="0"` individual + `(keydown.enter)`/`(keydown.space)` propios (`html:93-94,98`), sugiriendo un modelo de "roving tabindex", mientras las flechas se gestionan a nivel de host vía `@HostListener('keydown')` (`ts:223`), sugiriendo un modelo de foco-fijo-en-el-control. Son dos modelos mezclados: hoy, un usuario de teclado que llega a una opción con Tab (porque son individualmente tabulables) encuentra un widget que no se comporta como ninguno de los dos patrones estándar. | Adoptar el modelo `aria-activedescendant` (foco permanece en el control/búsqueda; nunca se mueve a las opciones). Las opciones dejan de ser tabulables — se elimina `tabindex="0"` y los handlers de teclado individuales; solo conservan `(click)` para ratón. |
| 7 | Cierre al hacer click fuera | No existe ningún listener de click-fuera (confirmado, sin `@HostListener('document:click')`, sin overlay/backdrop de CDK). El panel solo cierra seleccionando, con Escape, o volviendo a hacer click en el control — un click en cualquier otro punto de la página lo deja abierto indefinidamente. | Añadir `@HostListener('document:click', ['$event'])` que cierra el panel si el click fue fuera del host. |
| 8 | Retorno de foco tras cerrar | Ningún cierre (`Escape`, seleccionar, click-fuera) devuelve el foco explícitamente al control. Funciona hoy "por accidente" porque el foco nunca se movió (no hay overlay ni opciones tabulables reales) — pero es frágil y deja de ser cierto en cuanto se implementa el punto 6 si no se hace explícito. | Al cerrar por `Escape`, devolver el foco al control con `.focus()` (mismo patrón que `dcx-ng-navbar.component.ts:48-54`, `onToggleEscape()`). |
| 9 | Landmark sin nombre accesible cuando no hay `label` visible | No existe `ariaLabel` en el componente pese a que `Documentation.mdx:45,76-81` **ya lo documenta** como si existiera (`ariaLabel="Select an option"` en un ejemplo) — desajuste real entre documentación y API. | Añadir input `ariaLabel = input<string | null>(null)`, aplicado como `[attr.aria-label]` en el control cuando no hay `label()`. |
| 10 | `:focus-visible` incompleto | Solo existe en `.dcx-ng-select__control` (`scss:44-49,54-56`). Al eliminar la tabulabilidad individual de las opciones (punto 6) esto deja de ser un issue por sí solo, pero se necesita un estilo `.is-active` (highlight de navegación, ver punto 1) claramente visible ya que el foco real del navegador nunca llega a la opción resaltada. | Añadir estilo `.dcx-ng-select__option.is-active` con tratamiento visual equivalente a `:focus-visible` (obligatorio en el patrón `aria-activedescendant`, que no puede apoyarse en el anillo de foco nativo). |

### 2.3 Bugs de lógica

| # | Descripción |
|---|---|
| 11 | Flechas mutan `value()` directamente (`ts:233,239`) — además de ser el origen del problema WCAG #1, es un bug de UX: pulsar `↓` dos veces sin `Enter` ya ha "seleccionado" y notificado (`onChange`/`valueChange`) dos valores intermedios que el usuario nunca confirmó. |
| 12 | `ngOnInit` (`ts:141-148`) solo lee `valueInput()` **una vez** al inicializar. Si un consumidor cambia `[valueInput]` dinámicamente después del render inicial (fuera de un formulario), el select no se actualiza — el input queda "vivo" solo en apariencia. |
| 13 | Typo `selectContolClasses` (falta la "r", `ts:122`) — se propaga al template (`html:12`) y a un test (`spec.ts:251-252`). |
| 14 | `SELECTDEFAULTARGS` (`core/defaults/select.ts:29-41`) es un export muerto (sin referencias en todo el repo) y además tiene un error de nombre: usa la clave `invalid` cuando el input real del componente es `isInvalid` — si algún día se usara tal cual, no bindearía. |
| 15 | `Documentation.mdx` referencia un fichero de stories inexistente (`./UnStyled.stories`, `Documentation.mdx:3,21`) y dos nombres de story que no existen (`SelectClassBasedStories.Default`, `SelectClassBasedStories.SelectShowcase`, `Documentation.mdx:28,36`) — la única story real es `ClassBased`. Esto rompe el build de Storybook docs. |
| 16 | `argTypes.options` en las stories (`ClassBased.stories.ts:35-40`) usa el campo `options` (pensado para enumerar choices de un control `select`/`radio`) para guardar el array de datos por defecto — uso incorrecto del campo, probable copy-paste del control `spacing`. |
| 17 | La página demo define un `FormGroup` completo con 6 controles (`dcx-ng-page-select.component.ts:16-25`) pero **el template no usa `[formGroup]`/`formControlName` en ningún sitio** — todo ese código (incluido el `onValueChange` con `console.log`, `ts:45-53`) está muerto; los 5 `<dcx-ng-select>` de la página bindean atributos sueltos, no el formulario. |
| 18 | `.dcx-ng-select__search` (`scss:194-205`) es CSS huérfano — el template nunca renderiza un elemento con esa clase (la búsqueda usa `<dcx-ng-input>`, no un `<input>` propio). |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|---|
| 19 | Página demo con patrón legacy (`<section>`/`<h2 class="example-title">`/`<hr>`, sin `.example-title` ni siquiera definido localmente en su SCSS) en vez de `.demo-page`/`.demo-section`. |
| 20 | Categorías de Storybook en inglés (`'Attributes'`/`'Events'`, `ClassBased.stories.ts:29,39,46,...`) pese a que las descripciones sí están en español — mismo patrón ya corregido en accordion/navbar. |
| 21 | Faltan stories: estado vacío (sin opciones), valor preseleccionado (`valueInput`), combinación `disabled`+`searchable`/`clearable`, y la propia `Spacing` no tiene ejemplo en la página demo. |
| 22 | La página demo duplica localmente la lista `Uno/Dos/Tres` (`dcx-ng-page-select.component.ts:27-40`) en vez de reusar `OPTIONS` de `core/defaults/select.ts`. |

---

## 3. API / Interface

### Interfaz `DcxSelectOptions` — cambio de tipo (additive, no rompe consumidores existentes en la práctica)

```ts
export interface DcxSelectOptions {
  value: string | number;   // antes: any
  label: string;
  disabled?: boolean;
}
```

### Inputs (`input()` signals)

| Name | Type | Default | Nuevo | Descripción |
|---|---|---|---|---|
| `label` | `string` | `''` | | Etiqueta visible |
| `options` | `DcxSelectOptions[]` | `[]` | | Opciones del select |
| `placeholder` | `string` | `'Seleccione una opción'` | | Texto cuando no hay valor |
| `searchable` | `boolean` | `false` | | Muestra input de filtrado |
| `clearable` | `boolean` | `false` | | Muestra botón de limpiar |
| `disabled` | `boolean` | `false` | | Deshabilita el control |
| `required` | `boolean` | `false` | | Marca visual `*` |
| `isInvalid` | `boolean` | `false` | | Estado de error |
| `errorMessage` | `string \| null` | `''` | | Mensaje de error |
| `errorIcon` | `string` | `'info-circle'` | | Icono del mensaje de error |
| `valueInput` | `string \| null` | `null` | | Valor inicial/controlado fuera de un formulario |
| `spacing` | `DcxSpacing` | `'xs'` | | Tamaño del control |
| `ariaLabel` | `string \| null` | `null` | ✅ | Nombra el control cuando no hay `label` visible |

### Outputs (`output()` signals) — sin cambios

| Name | Emitted Type | Descripción |
|---|---|---|
| `valueChange` | `string \| number \| null` | Al confirmar una opción (click o Enter) |
| `clear` | `void` | Al limpiar el valor |

### Estado interno — cambio de modelo (no público, no rompe la API)

- Nueva signal privada `activeIndex` (highlight de navegación por teclado, `-1` = ninguna).
- `value` deja de mutarse desde las flechas; solo cambia al confirmar (click, Enter, Space en modelo antiguo se retira — ver 7b) o vía `writeValue`/`clearValue`.

### Métodos públicos — sin cambios de firma, salvo:

- `onOptionSpace(event, opt)` se **elimina** (las opciones dejan de tener handlers de teclado propios; Space dentro de un input de búsqueda no debe activar nada, y el patrón `aria-activedescendant` gestiona todo desde `onKey`). Ver 7b para justificación y 8 para el impacto en tests.
- `selectContolClasses` → renombrado a `selectControlClasses` (fix de typo, es un método público de facto al ser usado en template; no está documentado en Storybook así que no es una ruptura de API pública real).

---

## 4. Visual States & Variants

Alineado con `designs/dcx-ng-page-controls.html:44-78` (única referencia visual disponible) + patrón APG combobox:

| Estado | Descripción |
|---|---|
| **Default (cerrado)** | Borde `--border-input`, fondo `--bg-default`, texto `--text-dark` o `placeholder` en gris si no hay valor |
| **Focus / Open** | Borde `--border-focus`, box-shadow azul claro |
| **Invalid** | Borde `--border-error`, mensaje de error con icono |
| **Disabled** | Fondo gris claro, texto `--text-disabled`, `cursor:not-allowed`, `aria-disabled`, fuera del tab order |
| **Opción — hover** | Fondo `--bg-primary`, texto blanco |
| **Opción — seleccionada (`is-selected`)** | Fondo `--bg-primary`, texto blanco |
| **Opción — activa por teclado (`is-active`)** — NUEVO | Highlight visible (mismo tratamiento que hover) cuando `activeIndex` apunta a esa opción, independientemente de si está seleccionada |
| **Opción — deshabilitada** | Opacidad reducida, `pointer-events:none`, `aria-disabled` |

No se añaden variantes visuales nuevas (color/tamaño) — el foco de este refinamiento es accesibilidad y corrección de comportamiento, no rediseño visual.

---

## 5. SCSS / Tokens

Todos los tokens ya usados en `dcx-ng-select.component.scss` siguen el esquema "solo-fallback" (`var(--token, #hex)`) consistente con `dcx-ng-accordion`/`dcx-ng-navbar` — no requieren cambio de esquema, solo ajustes puntuales:

- Eliminar el bloque huérfano `.dcx-ng-select__search` (`scss:194-205`, problema 2.3 #18).
- Añadir `.dcx-ng-select__option.is-active` — mismo tratamiento visual que `:hover`/`.is-selected` (`background: var(--bg-primary, #0058ab); color: var(--text-white, #ffffff);`), pero como clase independiente para poder coexistir con `.is-selected` sin conflicto (una opción puede estar "activa" sin estar "seleccionada" y viceversa).
- Eliminar el bloque `::ng-deep` completo de `.dcx-ng-select__chevron` (`scss:133-171`) — ya no envuelve un `<dcx-ng-button>`, pasa a estilar directamente un `<dcx-ng-icon>` sin necesidad de `::ng-deep`/`all: unset`.
- El `::ng-deep` de `.dcx-ng-select__clear-btn` (`scss:82-131`) se mantiene — `dcx-ng-button` no tiene ningún tamaño icon-only tan pequeño (el más pequeño, `size="s"`, resuelve a la altura completa de un botón "s", muy por encima de los 16px necesarios aquí), así que forzar su tamaño sigue siendo la única opción sin tocar el sistema de tamaños del botón (ver 7b).
- Añadir `:focus-visible` en el control cuando está en estado `disabled` no aplica (un control con `tabindex="-1"` no puede recibir foco por teclado, así que no hace falta estilo adicional).

---

## 6. Accesibilidad (WCAG AA)

### Estructura HTML objetivo (patrón APG Combobox con listbox popup, `aria-activedescendant`)

```html
<div
  class="dcx-ng-select__control"
  role="combobox"
  [attr.id]="selectId"
  [attr.aria-expanded]="isOpen()"
  [attr.aria-labelledby]="label() ? labelId : null"
  [attr.aria-label]="!label() ? ariaLabel() : null"
  aria-haspopup="listbox"
  [attr.aria-controls]="selectId + '-panel'"
  [attr.aria-activedescendant]="isOpen() && activeIndex() >= 0 ? selectId + '-opt-' + activeIndex() : null"
  [attr.aria-disabled]="disabled() || null"
  [attr.tabindex]="disabled() ? -1 : 0"
  (click)="toggle()"
  (keydown.enter)="toggle()"
  (keydown.space)="toggle(); $event.preventDefault()"
>
  …
  <dcx-ng-icon class="dcx-ng-select__chevron" name="chevron-down" aria-hidden="true" />
</div>

<div class="dcx-ng-select__panel" role="listbox" [attr.id]="selectId + '-panel'" …>
  @for (opt of filtered(); track $index) {
    <div
      class="dcx-ng-select__option"
      [class.is-active]="$index === activeIndex()"
      [class.is-selected]="opt.value === value()"
      [attr.id]="selectId + '-opt-' + $index"
      role="option"
      [attr.aria-selected]="opt.value === value()"
      [attr.aria-disabled]="opt.disabled ? 'true' : null"
      (click)="!opt.disabled && selectOption(opt)"
    >
      {{ opt.label }}
    </div>
  }
</div>
```

Nótese: las opciones **ya no llevan `tabindex`** ni `(keydown.*)` propios — todo el teclado se gestiona centralizadamente en `onKey()` sobre el control.

### Keyboard interaction

| Tecla | Comportamiento |
|---|---|
| `Enter` / `Space` (control cerrado) | Abre el panel |
| `↓` | Abre el panel si está cerrado; si está abierto, mueve `activeIndex` a la siguiente opción no deshabilitada (circular) |
| `↑` | Mueve `activeIndex` a la anterior opción no deshabilitada (circular) |
| `Home` | Mueve `activeIndex` a la primera opción no deshabilitada |
| `End` | Mueve `activeIndex` a la última opción no deshabilitada |
| `Enter` (panel abierto) | Confirma `activeIndex` → `selectOption()`, cierra el panel |
| `Escape` | Cierra el panel y devuelve el foco al control |

> Al abrir el panel, `activeIndex` se inicializa en la opción actualmente seleccionada (o `0` si no hay valor), igual que hoy hace el scroll-into-view (`ts:190-198`).

### Notas adicionales

- El modelo `aria-activedescendant` exige que el DOM focus **nunca** salga del control (ni del input de búsqueda, en modo `searchable`) — es la razón por la que las opciones dejan de ser focoables.
- `role="option"` + `aria-selected` en cada opción siguen siendo correctos y no cambian.
- El botón de limpiar (`dcx-ng-button`, acción real) conserva su propio foco tabulable — es un control independiente, no parte del listbox.

---

## 7. Test Cases

El `.spec.ts` actual (32 tests) cubre bien la superficie funcional pero varios tests **asumen el modelo de teclado antiguo** (flechas mutando `value()` directamente) y deben reescribirse, no solo ampliarse.

### Tests a reescribir (comportamiento cambia)
- [x] `ArrowDown should select next option` → pasa a `ArrowDown should move activeIndex to the next option without changing value`
- [x] `ArrowUp should select previous option` → equivalente con `activeIndex`
- [x] `ArrowDown on last option should wrap to first` / `ArrowUp on first option should wrap to last` → sobre `activeIndex`
- [x] `Enter should select current option and close` → ahora depende de `activeIndex`, no de `value` previo
- [x] `should not handle keys when panel is closed` → se mantiene, pero verificar que `ArrowDown` con panel cerrado **abre** el panel (comportamiento nuevo, antes no hacía nada)
- [x] Eliminar `onOptionSpace should select non-disabled option` / `onOptionSpace should not select disabled option` (el método se retira)
- [x] `selectContolClasses should return class string` → renombrar a `selectControlClasses`

### Casos nuevos — WCAG
- [x] El control tiene `aria-activedescendant` apuntando al `id` de la opción activa cuando el panel está abierto
- [x] El control no tiene `aria-activedescendant` cuando el panel está cerrado
- [x] El control tiene `aria-disabled="true"` y `tabindex="-1"` cuando `disabled()` es `true`
- [x] El control tiene `tabindex="0"` cuando `disabled()` es `false`
- [x] El botón de limpiar expone `aria-label="Borrar selección"` en el `<button>` interno
- [x] El chevron se renderiza como `<dcx-ng-icon aria-hidden="true">` sin `<button>` envolvente (no debe quedar ningún elemento tabulable dentro de él)
- [x] `Home` mueve `activeIndex` a la primera opción no deshabilitada
- [x] `End` mueve `activeIndex` a la última opción no deshabilitada
- [x] Las opciones deshabilitadas se saltan en la navegación con flechas/Home/End
- [x] Las opciones ya no tienen atributo `tabindex`
- [x] `[attr.aria-label]` se aplica al control cuando no hay `label()` y sí hay `ariaLabel()`

### Casos nuevos — funcionales
- [x] Al abrir el panel, `activeIndex` se inicializa en la opción seleccionada (o `0` si no hay valor)
- [x] `Escape` devuelve el foco al elemento del control
- [x] Un click fuera del componente cierra el panel abierto
- [x] Un click dentro del componente (p.ej. en una opción) no dispara el cierre por click-fuera antes de procesar la selección
- [x] Cambiar `[valueInput]` después de la inicialización actualiza `value()` cuando no viene de un formulario
- [x] Cambiar `[valueInput]` no sobreescribe el valor cuando ya viene de `writeValue` (formulario)

### Casos existentes que se mantienen sin cambios
- Placeholder, apertura/cierre básico, filtrado por búsqueda, `writeValue`/`registerOnChange`/`registerOnTouched`, `clearValue`, transforms booleanos de atributos.

---

## 7b. Decisiones de diseño

### Chevron: `<dcx-ng-icon>` en vez de `<dcx-ng-button>`

El chevron es 100% decorativo: no tiene `(click)` propio (el toggle lo dispara el control padre), ya lleva `pointer-events: none` en el SCSS actual, y ya se marcaba `aria-hidden="true"`. Envolverlo en `<dcx-ng-button>` obligaba a "apagar" un botón real completo (`tabindex="-1"` que no se propaga, más `::ng-deep`/`all:unset` para su tamaño) para conseguir, en el mejor de los casos, lo mismo que un `<dcx-ng-icon>` suelto da gratis: no interactivo, no tabulable, sin necesidad de anular nada. Se sustituye directamente, sin tocar `DcxNgButtonComponent`.

### Clear button: se mantiene `<dcx-ng-button>` + `::ng-deep`

A diferencia del chevron, el botón de limpiar **sí** es una acción real (debe ser tabulable, debe tener nombre accesible, debe responder a Enter/Space nativamente) — por eso se queda como `dcx-ng-button variant="icon-only"`. El único motivo del `::ng-deep` es que el sistema de tamaños de `DcxNgButtonComponent` (`s`/`m`/`l`/`xl`, vía `button-icon-only-size()`) no baja de la altura completa de un botón "s" (pensado para botones con texto+icono, no para micro-iconos de 16px como este). Ampliar `DcxNgButtonComponent` con un tamaño `xs`/icon-chip específico para este caso puntual se considera fuera de alcance (afectaría a un componente compartido por todo el resto de la librería por un único consumidor); se documenta como mejora futura en la sección 8.

### `aria-activedescendant` vs. mover el foco real a las opciones

Se descarta el modelo alternativo (roving tabindex dentro del listbox, moviendo el foco DOM real a cada opción) porque el componente ya soporta un modo `searchable` donde el usuario escribe en un `<dcx-ng-input>` mientras navega opciones con flechas — si el foco se moviera a las opciones, se perdería el cursor/foco del campo de búsqueda en cada pulsación de flecha, rompiendo la experiencia de escritura. El modelo `aria-activedescendant` (foco fijo en el control o en el input de búsqueda; solo se actualiza un atributo + una clase visual) es el patrón estándar para comboboxes con búsqueda por esta misma razón (es el que usan React-Select, Downshift, Headless UI, etc.).

### Click-fuera sin Angular CDK Overlay

Se implementa con un `@HostListener('document:click')` simple en vez de migrar a CDK Overlay (que daría backdrop, posicionamiento inteligente y gestión de foco "gratis"). CDK Overlay es un cambio de arquitectura mucho mayor que afecta al posicionamiento del panel (`position: absolute` actual pasaría a un overlay en el `<body>`) y se considera un refinamiento independiente, no parte de este alcance centrado en corregir el patrón ARIA existente. Se documenta como mejora futura en la sección 8.

---

## 8. Out of Scope

- Multi-selección (`multiple`, `aria-multiselectable`, opciones tipo checkbox) — no existe hoy, se deja como posible refinamiento futuro independiente si hay un caso de uso real.
- Typeahead nativo en el modo no-`searchable` (saltar a una opción escribiendo su primera letra, como el `<select>` nativo) — el modo `searchable` ya cubre la necesidad de filtrar por texto; añadir typeahead al modo no-searchable es una mejora incremental, no un bloqueante de accesibilidad (el patrón APG lo permite pero no lo exige si existe una vía alternativa de filtrado).
- Migración a Angular CDK Overlay para el panel — ver justificación en 7b.
- Tamaño `xs`/icon-chip dedicado en `DcxNgButtonComponent` — ver justificación en 7b.
- Rediseño visual (colores, tipografía, espaciados) — no hay mock de diseño dedicado que lo motive; se reutilizan los tokens actuales.
- Arreglar `Documentation.mdx` de raíz reescribiendo su contenido narrativo — se corrigen únicamente las referencias rotas a stories inexistentes (problema 2.3 #15) para que el build no falle; no se reescribe la documentación completa.

---

## 9. Open Questions

- [x] ¿Se quiere migrar `ngOnInit` a `effect()`+`untracked()` (patrón `dcx-ng-accordion`) como parte de este refinamiento, o se prefiere mantener `OnInit` y solo arreglar el bug puntual (#12) con una re-suscripción explícita? El plan de implementación asume la migración a `effect()` por consistencia con el resto de componentes refinados, pero es una decisión de alcance abierta.

---

## 10. Implementation Plan

1. **Interfaz** — `DcxSelectOptions.value: any` → `string | number`.
2. **`dcx-ng-select.component.ts`**:
   - Añadir `ChangeDetectionStrategy.OnPush`.
   - Añadir `ariaLabel` input.
   - Migrar `ngOnInit` → `effect()` + `untracked()` (ver pregunta abierta 9).
   - Añadir signal `activeIndex`; añadir helpers `moveActive(direction: 'next'|'prev'|'first'|'last')` (no navegable-por-deshabilitadas se salta) y `confirmActive()`.
   - Reescribir `onKey()`: `ArrowDown`/`ArrowUp` abren el panel si está cerrado o mueven `activeIndex`; añadir `Home`/`End`; `Enter` llama `confirmActive()`; `Escape` cierra y devuelve el foco (`.focus()` sobre el `ElementRef` del control, patrón `dcx-ng-navbar.onToggleEscape`).
   - Eliminar `onOptionSpace`.
   - Añadir `@HostListener('document:click', ['$event'])` para cierre por click-fuera (usando `inject(ElementRef)` para comprobar `contains(target)`).
   - Renombrar `selectContolClasses` → `selectControlClasses`.
   - Tipar los `any` de `ControlValueAccessor` (`onChange`, `writeValue`, `registerOnChange`, `registerOnTouched`).
3. **`dcx-ng-select.component.html`**:
   - Chevron: `<dcx-ng-button>` → `<dcx-ng-icon aria-hidden="true">`.
   - Clear button: `aria-label="…"` → `ariaLabel="…"`.
   - Control: añadir `aria-activedescendant`, `aria-disabled`, `[attr.tabindex]` dinámico, `[attr.aria-label]` condicional.
   - Opciones: quitar `tabindex`, `(keydown.enter)`, `(keydown.space)`; añadir `[class.is-active]`.
4. **`dcx-ng-select.component.scss`**:
   - Quitar bloque huérfano `.dcx-ng-select__search`.
   - Quitar `::ng-deep` del chevron.
   - Añadir `.dcx-ng-select__option.is-active`.
5. **`core/defaults/select.ts`** — eliminar `SELECTDEFAULTARGS` (export muerto con bug de nombre) o corregirlo si se decide mantenerlo por compatibilidad; usar `OPTIONS`/`PLACEHOLDER` ya existentes tal cual.
6. **`spec.ts`** — reescribir el bloque de navegación por teclado según sección 7; añadir los casos WCAG y funcionales nuevos; eliminar los tests de `onOptionSpace`.
7. **Storybook (`ClassBased.stories.ts`)** — traducir `category` a `'Atributos'`/`'Eventos'`; arreglar el uso incorrecto de `argTypes.options`; documentar `ariaLabel`; añadir stories `Vacio` (sin opciones), `ConValorPreseleccionado`, `DeshabilitadoConBusqueda`.
8. **`Documentation.mdx`** — corregir las referencias rotas (`UnStyled.stories`, `Default`, `SelectShowcase`) para que apunten a stories reales.
9. **Página demo** — migrar a `.demo-page`/`.demo-section`; conectar el `FormGroup` ya definido en el TS al template (o eliminarlo si se decide que la demo no necesita reactive forms) para no dejar código muerto; reusar `OPTIONS` de la librería en vez de duplicar `Uno/Dos/Tres`; añadir ejemplo de `Spacing`.

---

## 11. Addendum — Migración a Angular CDK Overlay (2026-07-09)

**Status:** Done

La sección 8 (Out of Scope) de este spec dejó explícitamente fuera la migración a CDK Overlay, asumiendo que el `position: absolute` local era suficiente. Al usar el componente se detectó que el panel se recortaba visualmente en cualquier contenedor ancestro con `overflow` acotado (confirmado primero en la página Docs de Storybook — el `<Canvas>` con zoom de `addon-docs` recorta el overflow — y confirmado como riesgo real para diálogos, tarjetas y celdas de tabla en la app). Tras evaluarlo, se decidió implementar la migración ahora en vez de dejarlo como deuda.

### Cambios
- El panel (`<ng-template #panelTemplate>`) se adjunta vía `@angular/cdk/overlay` (`Overlay.create()` + `TemplatePortal`) a `document.body`, no como hijo del `:host`.
- Posicionamiento: `flexibleConnectedTo(controlEl)` con `withPositions([abajo-alineado-izq, arriba-alineado-izq])` — vuelca automáticamente hacia arriba si no cabe abajo. `scrollStrategy: reposition()` mantiene la posición sincronizada al hacer scroll.
- Cierre al hacer click fuera: se sustituye el `@HostListener('document:click')` manual por `overlayRef.outsidePointerEvents()` (sin backdrop bloqueante — un select no es un modal, el resto de la página debe seguir siendo interactivo).
- `dcx-ng-select.component.scss`: el panel ya no necesita `position: absolute`/`margin-top`/`z-index` propios (los resuelve el overlay); se le añaden `font-family`/`color` explícitos porque, al no ser ya descendiente del `:host` en el DOM, deja de heredarlos.
- `project.json` (target `build` de `dcx-ng-components`) — añadido `node_modules/@angular/cdk/overlay-prebuilt.css` a `styles` (CSS base de `.cdk-overlay-container`/`.cdk-overlay-pane`; sin él el overlay no se posiciona). Se reutiliza automáticamente en Storybook porque su target `storybook` usa `browserTarget: dcx-ng-components:build`.
- Referencias a elementos dentro del panel (`scrollIntoView` de la opción activa) pasan de `this.el.nativeElement.querySelector(...)` a `document.getElementById(...)`, ya que el panel puede acabar en cualquier punto del DOM.
- Tests: se inyecta `OverlayContainer` de CDK para consultar el panel (ya no es hijo del fixture) y para limpiar (`overlayContainer.ngOnDestroy()`) entre tests; el bloque "click outside" pasa de invocar un método propio a disparar eventos DOM reales y confiar en el mecanismo de CDK.

### Nota de test
jsdom no soporta la regla CSS `@layer` que usa el CSS embebido de CDK Overlay para tests (`__CdkPrivateStyleLoader`), así que aparece un `console.error: Could not parse CSS stylesheet` benigno en la salida de Jest — no hace fallar ningún test, es una limitación conocida de jsdom, no del componente.

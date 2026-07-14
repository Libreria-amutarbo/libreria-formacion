# Spec: Toast Refinement

**Status:** Done
**Date:** 2026-07-14
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-toast` es un componente presentacional individual (sin servicio asociado) para mostrar avisos breves. Tiene una base técnica sólida — temporizador de auto-cierre implementado con `effect()`+`onCleanup` sin fugas de memoria, `role`/`aria-live` correctamente mapeados por tipo, sin tokens CSS rotos — pero le faltan dos piezas críticas del patrón de notificaciones: **no existe ningún botón de cierre** (un toast con `autoDismiss=false`, el valor por defecto, no se puede cerrar nunca) y **el temporizador de auto-cierre no se pausa al pasar el ratón o el foco por encima** (WCAG 2.2.1). Además, los colores de acento (icono y texto de acción) fallan el contraste AA sobre el fondo oscuro para `info` y `error`. Por último, **no existe ningún servicio de toasts** — tanto la página de demo como la story `Interactive` de Storybook reimplementan, de forma duplicada, la misma máquina de estado de array+contador de ids, pese a que ya existe una interfaz `DcxToastOptions` preparada exactamente para ese propósito y nunca conectada a nada.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|----------|------------------|----------|
| 1 | Botón de cierre ausente (2.1.1 / patrón de notificaciones) | El componente no renderiza ningún control de cierre — el único elemento interactivo es el botón de "acción" (opcional, solo si `hasAction()`). Un toast con `autoDismiss=false` (el valor por defecto de la librería) permanece en pantalla para siempre sin ninguna forma de cerrarlo. El mock (`designs/dcx-ng-page-spinner-toast.html`, líneas 205-261) muestra un botón de cierre (`toast-close`, icono X) en **todos** los ejemplos, incluidos los que no tienen acción. | Nuevo input `dismissible` (default `true`); botón de cierre real (`<button aria-label="Cerrar">`) que emite el `dismissed` ya existente. |
| 2 | Temporizador sin pausa al hover/focus (WCAG 2.2.1) | El `effect()` de auto-cierre (ts:90-107) no tiene ningún manejador de `mouseenter`/`mouseleave`/`focusin`/`focusout` — un usuario que empieza a leer un toast con `autoDismiss=true` puede perder el mensaje antes de terminar de leerlo, sin recurso para evitarlo. | Pausar el temporizador con `mouseenter`/`focusin`; reiniciarlo con la duración completa en `mouseleave`/`focusout`. |
| 3 | Contraste de color insuficiente | Accento `info` (`--color-info` con fallback `#0058ab` en scss:6/24) sobre fondo `--text-dark` (`#2a2e33`): ~1.94:1, falla tanto texto (4.5:1) como icono (3:1). Accento `error` (`#dc2626`): ~2.83:1, también falla. `success`/`warning` fallan como texto (4.5:1) aunque pasan como icono (3:1). Estos acentos se usan tanto en el icono como en el texto del botón de acción (scss:39-42, 67-85). | Rediseño de color siguiendo el mock: fondo oscuro **teñido por variante** (no un neutro único) + icono blanco + texto de acción en un tono claro del mismo tinte — combinación de alto contraste verificada en el propio mock. |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|----------|-------------|
| 1 | Contenedor de región viva no persistente | Cada `<dcx-ng-toast>` es un elemento `role`/`aria-live` que se crea y destruye por completo con cada toast (vía `@for` en el consumidor) — el patrón recomendado es un contenedor persistente cuyo contenido cambia, no un nodo con `aria-live` que aparece ya con su contenido final. Se resuelve para el patrón recomendado (servicio + outlet, ver §7b); se documenta como limitación conocida para el uso standalone directo (fuera de alcance forzar un cambio ahí). |

### 2.3 Bugs de lógica / código muerto

| # | Descripción |
|---|-------------|
| 1 | `DCX_TOAST_COLOR_BY_TYPE` (`core/interfaces/toast.ts:10-15`) no se usa en ningún sitio del repo, y su valor de `info` (`#1db8f2`) no coincide ni con el fallback real del componente (`#0058ab`, scss:6) ni con el token real `--color-info` definido en `main.css` (`#12abdb`) — tres colores "info" distintos según el fichero. Se elimina. |
| 2 | `DCX_TOAST_TYPE_LIST` (`core/interfaces/toast.ts:28-33`) y `DCX_TOAST_MOCK_TYPES` (`core/defaults/toast.ts:10-15`) son el mismo array duplicado, ninguno usado en ningún sitio. Se elimina el duplicado y se conecta el que queda a `argTypes.type.options` en Storybook (hueco real: la story no ofrece un selector de tipo con opciones). |
| 3 | Lógica de array de toasts + contador de id duplicada verbatim entre `dcx-ng-page-toast.component.ts:26-86` y la story `Interactive` de Storybook (`ClassBased.stories.ts:146-236`, con varios `any` en el proceso) — ver §7b. |
| 4 | No existe `Documentation.mdx` para Toast, a diferencia de la práctica totalidad del resto de componentes. |

### 2.4 Storybook

| # | Descripción |
|---|-------------|
| 1 | Categorías de `argTypes` en inglés (`'Attributes'`/`'Events'`), inconsistente con el resto de la librería. |
| 2 | El input `iconName` no tiene ninguna entrada en `argTypes` (sin control, sin descripción). |

### 2.5 Page demo

| # | Descripción |
|---|-------------|
| 1 | No usa `.demo-page`/`.demo-section` — clases bespoke (`toast-page__*`). |
| 2 | No demuestra las variantes de acción (`CustomActionText`, `CustomActionWithIcon`, `IconOnlyAction`) que sí existen como stories — solo toasts con la acción por defecto ("Deshacer"). |
| 3 | No pasa `actionLabel`/`actionIconName`/`actionAriaLabel` al `<dcx-ng-toast>` en absoluto (html:22-25) — desalineada con la superficie real del componente. |

---

## 3. API / Interface

### `dcx-ng-toast` — cambios

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `dismissible` | `boolean` | `true` (**nuevo**) | Muestra un botón de cierre real. |
| `announce` | `boolean` | `true` (**nuevo**) | Si `false`, suprime `aria-live` propio (pero mantiene `role`) — para uso a través de `dcx-ng-toast-outlet`, que ya aporta una región viva persistente. Mismo patrón ya usado internamente por este componente sobre `dcx-ng-message` (`[announce]="false"`, html:12). |

Resto de inputs/outputs sin cambios (`message`, `type`, `autoDismiss`, `durationMs`, `iconName`, `actionLabel`, `actionIconName`, `actionAriaLabel`, `actionClick`, `dismissed`). El botón de cierre reutiliza el output `dismissed` ya existente (unifica "el toast se quiere retirar", sea por temporizador o por cierre manual).

### `DcxNgToastService` (nuevo, `providedIn: 'root'`)

| Method | Firma | Descripción |
|--------|-------|-------------|
| `show` | `(options: DcxToastOptions) => string` | Añade un toast, devuelve su id generado. |
| `success` / `error` / `warning` / `info` | `(message: string, options?: Omit<DcxToastOptions, 'message' \| 'type'>) => string` | Atajos por severidad. |
| `dismiss` | `(id: string) => void` | Retira un toast por id. |
| `clear` | `() => void` | Retira todos los toasts activos. |
| `toasts` | `Signal<DcxToastInstance[]>` (readonly) | Estado actual, consumido por `dcx-ng-toast-outlet`. |

### `dcx-ng-toast-outlet` (nuevo componente)

Se monta **una vez** (p. ej. en el componente raíz de la app). Inyecta `DcxNgToastService`, renderiza un contenedor persistente con `aria-live="polite"` y un `<dcx-ng-toast [announce]="false">` por cada entrada de `toasts()`.

| Name | Type | Default | Descripción |
|------|------|---------|-------------|
| `position` | `DcxToastPosition` (`'top-right'\|'top-left'\|'bottom-right'\|'bottom-left'`) | `'top-right'` | Esquina de anclaje del stack (posicionamiento no especificado por ningún mock; se elige el valor por defecto más habitual en librerías de notificación). |

---

## 4. Visual States & Variants

Rediseño de color siguiendo el mock (`designs/dcx-ng-page-spinner-toast.html`):

| Variante | Fondo | Icono | Texto de acción |
|---|---|---|---|
| `info` | `#1e2226` | blanco | `var(--color-info, #1db8f2)` |
| `success` | `#166534` | blanco | `#86efac` |
| `warning` | `#78350f` | blanco | `#fde68a` |
| `error` | `#7f1d1d` | blanco | `#fca5a5` |

Botón de cierre: blanco, `opacity: .65` en reposo (como el mock), `opacity: 1` en hover/focus.

---

## 5. SCSS / Tokens

Reescritura de `dcx-ng-toast.component.scss`: fondo por variante en vez de fondo único + borde de acento; icono blanco (ya no coloreado por variante); texto de acción con tono claro por variante (valores tomados literalmente del mock, sin tokens nuevos ya que el mock tampoco los tokeniza para estos matices oscuros/claros específicos). Se mantiene `var(--color-info/success/warning/error, #fallback)` para los colores de fondo base (reutilizando los tokens ya existentes), con los valores de fondo oscuro y texto claro como literales justificados por el mock.

---

## 6. Accesibilidad (WCAG AA)

- Botón de cierre real con `aria-label="Cerrar"`.
- Pausa del temporizador en `mouseenter`/`focusin`; reinicio con duración completa en `mouseleave`/`focusout`.
- Contraste AA verificado para icono y texto de acción en las 4 variantes.
- `dcx-ng-toast-outlet`: contenedor persistente con `aria-live="polite"` — soluciona el problema de región viva no persistente para el patrón de uso recomendado (servicio + outlet).
- `role`/`aria-live` individuales de `dcx-ng-toast` se mantienen para el uso standalone (sin servicio); se suprime solo `aria-live` (no `role`) cuando `announce=false`, evitando duplicar el anuncio del outlet.

---

## 7. Test Cases

### `dcx-ng-toast`
- [ ] tests existentes (comportamiento actual) siguen pasando
- [ ] renderiza un botón de cierre cuando `dismissible()` es `true` (por defecto)
- [ ] no renderiza el botón de cierre cuando `dismissible()` es `false`
- [ ] el botón de cierre emite `dismissed`
- [ ] el botón de cierre tiene `aria-label="Cerrar"`
- [ ] pausa el temporizador en `mouseenter`, lo reinicia en `mouseleave`
- [ ] pausa el temporizador en `focusin`, lo reinicia en `focusout`
- [ ] con `announce=false`, no se establece `aria-live` pero `role` se mantiene

### `DcxNgToastService` (nuevo)
- [ ] `show` añade un toast a `toasts()` y devuelve un id único
- [ ] `success`/`error`/`warning`/`info` fijan el `type` correcto
- [ ] `dismiss(id)` retira solo el toast con ese id
- [ ] `clear()` vacía `toasts()`

### `dcx-ng-toast-outlet` (nuevo)
- [ ] renderiza un `<dcx-ng-toast>` por cada entrada de `toasts()`
- [ ] el contenedor tiene `aria-live="polite"` de forma persistente
- [ ] cada `dcx-ng-toast` renderizado recibe `[announce]="false"`
- [ ] `dismissed`/`actionClick` de un toast llaman a `toastService.dismiss(id)`
- [ ] aplica la clase de posición correcta según `position()`

---

## 7b. Decisión: añadir `DcxNgToastService` + `dcx-ng-toast-outlet`

Se añade un servicio inyectable y un componente "outlet" a montar una vez en la app, siguiendo el patrón estándar de la práctica totalidad de librerías de componentes para notificaciones (Angular Material `MatSnackBar`, PrimeNG `MessageService`, etc.). Justificación, no es una expansión de alcance arbitraria:

1. **Ya existía la mitad de la pieza sin conectar**: `DcxToastOptions` (`core/interfaces/toast.ts:17-26`) tiene exactamente la forma que necesitaría un servicio de este tipo, y nunca se usó como tal — solo como un tipo de conveniencia para que cada consumidor construyera su propio array a mano.
2. **La duplicación ya era un problema real, no hipotético**: la página de demo y la story `Interactive` de Storybook ya habían reimplementado, cada una por su lado, la misma máquina de estado (array + contador de id + handlers de acción/cierre).
3. **Es la forma correcta de resolver la región viva no persistente** (§2.2.1): un contenedor montado una vez es precisamente la solución recomendada, no alcanzable si cada consumidor sigue creando y destruyendo su propio wrapper.

El componente `dcx-ng-toast` individual se mantiene totalmente utilizable de forma standalone (como hoy) para quien no quiera adoptar el servicio — no es una ruptura de la API existente, es una capa adicional opcional.

**Decisión de accesibilidad del outlet**: el contenedor persistente usa `aria-live="polite"` de forma uniforme (no diferencia `assertive` para errores) — se prioriza la fiabilidad del anuncio (región ya presente y observada) sobre la urgencia distintiva que ofrecía `role="alert"` en el uso standalone. Se documenta como trade-off consciente.

---

## 8. Out of Scope

- Migrar la página de demo/story de "solo mensaje" (mock) que combina cierre sin acción — se cubre con `dismissible=true` por defecto, sin necesitar ningún cambio de API adicional (ya es alcanzable con `actionLabel=''` `actionIconName=''`).
- Distinción `assertive`/`polite` dinámica en el outlet — ver decisión anterior.
- Cambiar el mapeo `warning → role="alert"` existente — es una decisión ya tomada razonable (el ejemplo del propio mock es un aviso de expiración de sesión, genuinamente urgente), no un bug.

---

## 9. Open Questions

Ninguna.

---

## 10. Implementation Plan

1. **`core/interfaces/toast.ts`**: eliminar `DCX_TOAST_COLOR_BY_TYPE`; añadir `DcxToastInstance extends DcxToastOptions { id: string }`; añadir `DcxToastPosition`.
2. **`core/defaults/toast.ts`**: eliminar `DCX_TOAST_MOCK_TYPES` (duplicado de `DCX_TOAST_TYPE_LIST`).
3. **`dcx-ng-toast.component.ts`**: añadir `dismissible`/`announce`; pausa de temporizador con `@HostListener` de `mouseenter`/`mouseleave`/`focusin`/`focusout`; `ariaLive` computed respeta `announce()`.
4. **`dcx-ng-toast.component.html`**: botón de cierre condicional (`dismissible()`).
5. **`dcx-ng-toast.component.scss`**: rediseño de color por variante (tabla §4).
6. **Nuevo `dcx-ng-toast.service.ts`**: `DcxNgToastService` (`providedIn: 'root'`).
7. **Nuevo componente `dcx-ng-toast-outlet`**: contenedor persistente + `position`.
8. Exportar servicio, outlet e interfaces nuevas desde los barrels.
9. **Tests**: adaptar `dcx-ng-toast.component.spec.ts`; nuevos tests para el servicio y el outlet.
10. **Storybook**: traducir categorías a `Atributos`/`Eventos`; añadir `argTypes.iconName`; conectar `DCX_TOAST_TYPE_LIST` al selector de `type`; nuevas stories para el servicio/outlet; **crear `Documentation.mdx`** (no existía).
11. **Page demo**: migrar a `.demo-page`/`.demo-section`; migrar de array manual al nuevo `DcxNgToastService` + `<dcx-ng-toast-outlet>`; añadir ejemplos de las variantes de acción (texto custom, icono+texto, solo icono) que faltaban.
12. Verificación: tests, lint, `nx build-storybook dcx-ng-lib`, `nx build dcx-ng-components`.

# Spec: Stepper Refinement

**Status:** Done
**Date:** 2026-07-11
**Author:** Claude Code

---

## 1. Overview

`dcx-ng-stepper` guía al usuario por una secuencia de pasos (horizontal o vertical), con estados `active`/`completed`/`error`/`disabled`/`optional`, navegación por teclado con roving tabindex, y modo `linear` que impide saltar pasos no completados. La base lógica es sólida (sin `any`, sin estado mutable a nivel de módulo, `OnPush`, `effect()` bien usado) — el refinamiento se centra en accesibilidad estructural, un desajuste visual real contra el mock de diseño dedicado, y varios bugs de documentación/coherencia menores.

Existe un mock de diseño dedicado y detallado: `designs/dcx-ng-page-stepper.html` (tamaños s/m/l/xl horizontal + vertical con contenido expandido). **Decisión ya tomada con el usuario**: se sigue el mock al pixel en el esquema de color de estados, aunque difiera del componente actual — ver sección 4 y 7b.

No se usa en ningún otro sitio de `src/app/` fuera de su propia página demo.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| # | Criterio | Problema actual | Solución |
|---|---|---|---|
| 1 | **1.3.1 Info and Relationships** | Los pasos se renderizan como `<button>` sueltos dentro de un `<div class="dcx-stepper__header">` (`html:1-41`) — no hay `<ol>`/`role="list"` (el orden es información inherente a un stepper) ni `<nav>`/`role="navigation"` con nombre accesible en el contenedor raíz. | Envolver en `<nav [attr.aria-label]="ariaLabel()">` + `<ol role="list">`/`<li>` por paso. Nuevo input `ariaLabel`. |
| 2 | **4.1.2 Name, Role, Value** | El estado `completed`/`error` de un paso **no activo** no se comunica a lectores de pantalla: el icono de check/error es `aria-hidden` (heredado del default de `dcx-ng-icon`) y el número desaparece sin sustituto textual — un usuario de lector de pantalla no tiene forma de saber que el paso 1 está "completado" salvo que sea el paso activo (`aria-current="step"` sí funciona, pero solo para el paso actual). | Añadir texto visualmente oculto (`.visually-hidden`, patrón ya usado en `skeleton`) junto al icono: "Completado" / "Error" — pasa a formar parte del nombre accesible del botón (que ya incluye label+descripción como contenido). |

### 2.2 WCAG AA — Recomendados

| # | Criterio | Descripción |
|---|---|---|
| 3 | El separador decorativo entre pasos (`dcx-stepper__divider`, `html:38`) no tiene `aria-hidden="true"` explícito — de bajo impacto (un `<div>` vacío no se anuncia por defecto) pero se añade por explicitud, mismo criterio que `dcx-ng-accordion` aplica a sus iconos decorativos. |
| 4 | Falta `Home`/`End` en la navegación por teclado (`onStepKeydown`, `ts:119-138`) — solo hay flechas y Enter/Espacio. `dcx-ng-accordion` sí implementa `Home`→primer item habilitado, `End`→último (`accordion.ts:96-105`), el patrón APG recomendado para widgets tipo tab/step. |

### 2.3 Bugs de lógica

| # | Descripción |
|---|---|
| 5 | `size` acepta el tipo compartido `DcxSize` (incluye `'auto'`), pero el SCSS (`scss:57-115`) solo define bloques `--s`/`--m`/`--l`/`--xl`. `size="auto"` no rompe visualmente (cae al tamaño base `--sp-8`, idéntico a `'m'`) pero es un valor que no hace lo que su nombre sugiere y no existe en el mock de diseño (que solo define Small/Medium/Large/XLarge). Mismo patrón ya corregido en `dcx-ng-spinner` (`DcxSpinnerSize`). |
| 6 | `getStepNumberClasses()` (`ts:203-205`) siempre devuelve el literal `'dcx-stepper__number'` — un método que no calcula nada, candidato a eliminar y usar la clase estática directamente en el template. |
| 7 | `:host { font-family: var(--ff-base, var(--font-family-primary, 'Inter', sans-serif)); }` (`scss:3`) anida dos tokens (`--ff-base` y `--font-family-primary`) cuando el resto de componentes refinados usa uno solo con fallback literal (`var(--ff-base, 'Inter', sans-serif)`). `--font-family-primary` es un nombre huérfano que solo aparece así en `breadcrumb`/`divider` — no aporta nada anidado dentro del fallback de `--ff-base`. |
| 8 | Estado `disabled` combina `opacity: 0.5` (`scss:220`) **encima** de tokens ya atenuados (`--text-disabled`, `--bg-disabled`) — doble atenuación, riesgo de contraste. El mock de diseño no atenúa con opacidad, solo usa colores apagados directamente (`designs/dcx-ng-page-stepper.html:73,80`). Se elimina el `opacity: 0.5`. |
| 9 | Fixtures (`core/defaults/stepper.ts`) 100% en inglés ("Personal Information", "Step 2 (Disabled)"...) — inconsistente con el resto del proyecto (100% español) y con el propio mock de diseño, que usa español ("Datos personales", "Dirección", "Verificación"...). |
| 10 | `Documentation.mdx` tiene varios datos incorrectos: documenta `size: 's' | 'm' | 'lg'` (no existe `'lg'`, falta `'xl'`); documenta el token `--background-primary` en la sección Theming (`mdx:218`) — no es un token real, es exactamente el mismo error ya encontrado y corregido en `dcx-ng-navbar`, debería ser `--bg-primary`; typo en la lista de CSS Classes (`. \`.dcx-stepper--s|m|l|xl\`` con un punto en vez de guion, `mdx:207`); usa la sintaxis antigua `@storybook/addon-docs` (`<Canvas sourceState="shown"><Story id="..."/></Canvas>`) en vez de `@storybook/blocks` (`<Canvas of={...} />`) que usa el resto de componentes refinados; varias secciones repiten el mismo Canvas de `Default` sin necesidad (Overview → Examples y Horizontal Layout muestran la misma story). |
| 11 | La story `Interactive` (`ClassBased.stories.ts:146-157`) es funcionalmente idéntica a `Default` (mismos args explícitos que ya están en `meta.args`) — no aporta cobertura nueva. |
| 12 | No existe ninguna story ni ejemplo de página que use `contentTpl` — una funcionalidad real y documentada (`Documentation.mdx:24`, con ejemplo de código) que el mock de diseño sí muestra (sección "Vertical / Con contenido expandido", `designs/dcx-ng-page-stepper.html:268-331`) pero que no se demuestra en ningún sitio del propio proyecto. |
| 13 | Falta `dcx-ng-page-stepper.component.spec.ts` — el resto de páginas demo migradas (accordion, navbar, select…) tienen un test mínimo `should create`. |

### 2.4 Mejoras de UX / coherencia

| # | Descripción |
|---|---|
| 14 | Página demo con patrón legacy (`<section>`/`<h2 class="example-title">`/`<dcx-ng-divider>` manual) en vez de `.demo-page`/`.demo-section`. |
| 15 | Categorías de Storybook ausentes por completo (ni siquiera en inglés) y descripciones en inglés — inconsistente con el resto de componentes refinados. |
| 16 | `argTypes.size` reusa `ICON_SIZE_LIST` (una constante pensada para el tamaño de iconos) — funciona porque los valores coinciden, pero el nombre es confuso para un control que no tiene nada que ver con iconos. |

---

## 3. API / Interface

### Cambio de tipo — `size` (mismo criterio que `dcx-ng-spinner`, ver 7b)

```ts
export type DcxStepperSize = 's' | 'm' | 'l' | 'xl';
```

### Inputs (`input()` signals)

| Name | Type | Default | Nuevo | Descripción |
|---|---|---|---|---|
| `steps` | `DcxStepperItem[]` | requerido | | Pasos a mostrar |
| `activeStepId` | `string \| number` | `''` | | ID del paso activo |
| `orientation` | `DcxLayout` | `'horizontal'` | | Orientación |
| `linear` | `boolean` | `false` | | Navegación secuencial forzada |
| `showStepNumbers` | `boolean` | `true` | | Mostrar números en los indicadores |
| `size` | `DcxStepperSize` | `'m'` | (tipo cambiado) | Tamaño |
| `ariaLabel` | `string \| null` | `null` | ✅ | Nombre accesible del landmark de navegación |

### Outputs / Interfaces — sin cambios

`stepChange: DcxStepperChangeEvent`, `stepClick: DcxStepperItem`, `DcxStepperItem`, `DcxStepperChangeEvent` — sin cambios.

### Métodos públicos

Sin cambios de firma. `getStepNumberClasses()` se elimina (problema 2.3 #6) — no se documentaba en Storybook ni se usaba fuera del propio template, no es una ruptura de API pública real.

---

## 4. Visual States & Variants

**Se sigue el mock de diseño** (`designs/dcx-ng-page-stepper.html`), lo que implica estos cambios respecto a la implementación actual:

| Estado | Actual | Nuevo (mock) |
|---|---|---|
| **Completado** | Relleno verde (`--color-success`) | Relleno **azul** (`--bg-primary`), icono check blanco |
| **Activo** | Relleno azul sólido + anillo `box-shadow` | **Outline**: fondo por defecto (blanco), borde y número/texto en azul (`--bg-primary`) — sin relleno, sin box-shadow |
| **Error** | Relleno rojo sólido | **Outline**: fondo por defecto, borde y contenido en rojo (`--color-error`) — mismo tratamiento que activo |
| **Deshabilitado** | Colores apagados + `opacity: 0.5` | Solo colores apagados, sin opacidad adicional (problema 2.3 #8) |
| **Conector entre pasos** | Siempre `--border-light`, color fijo | Se pinta de `--bg-primary` cuando el paso **anterior** está completado (progreso visual) — hoy no existe esta lógica |

Se eliminan los `box-shadow` de "anillo" (glow ring) en el estado activo/combinaciones activo+completado/activo+error/activo+disabled — no existen en el mock, y su eliminación simplifica bastante el SCSS (las reglas anidadas `&--active.dcx-stepper__step--completed` etc. dejaban de tener sentido una vez cada estado es autocontenido). Precedencia visual cuando varias clases de estado coinciden en un mismo paso (p. ej. activo + completado): `disabled > error > completed > active > default`, aplicada por orden de declaración en el SCSS (mismo criterio que dicta el mock: un paso deshabilitado nunca debería mostrarse "activo" en la práctica, y un error es más urgente de comunicar que "completado").

No se tocan tamaños (dimensiones de indicador/tipografía), solo color/estilo de borde.

---

## 5. SCSS / Tokens

- Fix del `font-family` anidado (problema 2.3 #7): `font-family: var(--ff-base, 'Inter', sans-serif);`
- Reescritura de los bloques de estado (`--active`, `--completed`, `--error`, `--disabled`) como reglas planas y autocontenidas (sin anidar unas dentro de otras), aplicando los colores de la sección 4.
- Nueva clase `.dcx-stepper__divider--completed { background: var(--bg-primary, #0058ab); }`.
- Eliminado `opacity: 0.5` del estado disabled.
- El resto de tokens ya sigue el esquema `var(--token, #fallback)` correctamente (confirmado: spacing, font-size, font-weight, bordes, radios — 17 de 18 tokens ya alineados) — no se tocan.

---

## 6. Accesibilidad (WCAG AA)

### Estructura HTML objetivo

```html
<nav [class]="stepperClasses()" [attr.aria-label]="ariaLabel()">
  <ol class="dcx-stepper__header" role="list">
    @for (step of steps(); track step.id; let idx = $index) {
      <li class="dcx-stepper__item">
        <button
          type="button"
          [class]="getStepClasses(step)"
          [disabled]="step.disabled"
          (click)="onStepClick(step, idx)"
          (keydown)="onStepKeydown($event, step, idx)"
          [attr.aria-current]="isActive(step.id) ? 'step' : null"
          [attr.tabindex]="isActive(step.id) ? 0 : -1"
        >
          <div class="dcx-stepper__step-indicator">
            @if (step.completed && !step.error) {
              <dcx-ng-icon name="check" aria-hidden="true"></dcx-ng-icon>
              <span class="visually-hidden">Completado</span>
            } @else if (step.error) {
              <dcx-ng-icon name="exclamation-circle" aria-hidden="true"></dcx-ng-icon>
              <span class="visually-hidden">Error</span>
            } @else if (showStepNumbers()) {
              <span class="dcx-stepper__number">{{ idx + 1 }}</span>
            } @else if (step.icon) {
              <dcx-ng-icon [name]="step.icon" aria-hidden="true"></dcx-ng-icon>
            }
          </div>
          <!-- label/description/optional sin cambios -->
        </button>
      </li>
      @if (idx < steps().length - 1) {
        <div class="dcx-stepper__divider" [class.dcx-stepper__divider--completed]="step.completed" aria-hidden="true"></div>
      }
    }
  </ol>
  <!-- contenido del paso activo sin cambios -->
</nav>
```

### Keyboard interaction

| Tecla | Comportamiento |
|---|---|
| `→`/`↓` (según orientación) | Siguiente paso habilitado |
| `←`/`↑` | Paso habilitado anterior |
| `Home` | Primer paso habilitado — **nuevo** |
| `End` | Último paso habilitado — **nuevo** |
| `Enter`/`Espacio` | Activa el paso con foco |

> El roving tabindex (`tabindex="0"` solo en el paso activo) ya estaba correctamente implementado — se mantiene, es el patrón adecuado para este tipo de widget compuesto.

### Notas adicionales

- `<ol>`/`role="list"` porque el orden es información real (paso 1 antes que paso 2).
- `aria-current="step"` (ya existente) sigue siendo el único mecanismo para el paso activo — es el valor correcto de la especificación APG para indicadores de progreso.
- El texto oculto "Completado"/"Error" se añade como hermano del icono (ambos dentro del `<button>`), pasando a formar parte del nombre accesible del botón junto con el label/descripción ya existentes — no requiere overridear `aria-label` completo.

---

## 7. Test Cases

### Componente (`dcx-ng-stepper.component.spec.ts`)

- [x] El contenedor raíz es un `<nav>` con `role` implícito de landmark
- [x] `[attr.aria-label]` se refleja cuando se pasa `ariaLabel`
- [x] Los pasos se renderizan dentro de un `<ol role="list">`, cada uno en un `<li>`
- [x] Un paso completado (no activo) incluye el texto oculto "Completado" en su nombre accesible
- [x] Un paso en error (no activo) incluye el texto oculto "Error"
- [x] El divisor tiene `aria-hidden="true"`
- [x] El divisor tras un paso completado tiene la clase `dcx-stepper__divider--completed`
- [x] `Home` mueve la activación al primer paso habilitado
- [x] `End` mueve la activación al último paso habilitado
- [x] `Home`/`End` saltan pasos deshabilitados
- [x] `getStepNumberClasses` ya no existe / el número usa una clase estática

### Actualizar tests existentes

- Los tests que consultan `.dcx-stepper__step` vía `querySelectorAll` en el DOM siguen funcionando igual (el botón conserva su clase e id), solo cambia su ancestro directo (ahora `<li>` en vez de estar suelto en el `<div>` header) — no debería requerir cambios salvo los nuevos casos.

### Página demo

- [x] Crear `dcx-ng-page-stepper.component.spec.ts` con `should create`

---

## 7b. Decisiones de diseño

### Seguir el mock de diseño en vez del esquema de color actual

Decisión tomada explícitamente con el usuario: se prioriza la fidelidad al mock dedicado (`designs/dcx-ng-page-stepper.html`) sobre la coherencia con el resto de la librería, que usa verde para "éxito/completado" en badge/chip/message/spinner. Esto significa que, tras este refinamiento, "completado" en el stepper es azul (`--bg-primary`) mientras que en el resto de componentes sigue siendo verde (`--color-success`) — una inconsistencia de sistema conocida y aceptada, no un descuido.

### `size` pasa a un tipo propio (`DcxStepperSize`)

Mismo razonamiento que en `dcx-ng-spinner`: `'auto'` (parte de `DcxSize`) no tiene una definición visual clara para un stepper y no aparece en el mock de diseño (solo s/m/l/xl). No es una ruptura funcional real — `size="auto"` hoy simplemente coincide por accidente con el tamaño `'m'`, nunca ha sido un tamaño "automático" de verdad.

### Texto oculto en vez de `aria-label` completo en el botón

Se añade `<span class="visually-hidden">` junto al icono en vez de construir un `aria-label` completo tipo "Paso 1: Datos personales, completado" en el `<button>`. El botón ya tiene contenido de texto real (label + descripción + "(opcional)") que un lector de pantalla lee correctamente como nombre accesible — añadir el estado como texto hermano dentro del mismo botón se suma automáticamente a ese nombre sin tener que reconstruir manualmente toda la cadena de texto ni arriesgarse a que ambas fuentes (contenido real vs. aria-label manual) diverjan con el tiempo.

---

## 8. Out of Scope

- Métodos imperativos públicos (`goToStep()`, `next()`, `previous()`) — ni la documentación actual ni el uso real los prometen (se verificó `Documentation.mdx` línea a línea); todo el control ya es posible vía el input `activeStepId` + los eventos `stepChange`/`stepClick`. Añadirlos sería una funcionalidad nueva, no un refinamiento de lo existente.
- `prefers-reduced-motion` — las transiciones actuales (color, 0.2s) y el fade-in del contenido no son el tipo de animación (grandes desplazamientos/parpadeo) que esta media query pretende mitigar; no se considera un gap real como sí lo fue en `skeleton`/`spinner`.
- Anunciar el cambio de contenido del paso activo vía `aria-live` — el contenido cambia de la mano de un click/tecla iniciado por el propio usuario (no es una actualización asíncrona inesperada), y el foco permanece correctamente en el botón que originó el cambio; no es el mismo caso que un spinner apareciendo de forma asíncrona.

---

## 9. Open Questions

Ninguna (la única decisión pendiente — el esquema de color — ya se resolvió con el usuario antes de escribir este spec).

---

## 10. Implementation Plan

1. **`core/interfaces/stepper.ts`** — añadir `DcxStepperSize`.
2. **`dcx-ng-stepper.component.ts`**:
   - `size` pasa a `input<DcxStepperSize>('m')`.
   - Añadir `ariaLabel` input.
   - Eliminar `getStepNumberClasses()`.
3. **`dcx-ng-stepper.component.html`** — estructura `<nav>`/`<ol>`/`<li>` de la sección 6; texto oculto completado/error; `aria-hidden` en el divisor; clase `--completed` en el divisor.
4. **`dcx-ng-stepper.component.scss`** — mapeo de colores de la sección 4/5; eliminar box-shadows y anidamiento de estados combinados; fix `font-family`; quitar `opacity: 0.5` del disabled; nueva regla `.dcx-stepper__divider--completed`.
5. **`onStepKeydown`** — añadir ramas `Home`/`End` reutilizando `findNextEnabledStep`/`navigateToEnabledStep` con un helper de "primer/último habilitado".
6. **`core/defaults/stepper.ts`** — traducir todas las fixtures a español (contenido inspirado en el mock: "Datos personales", "Dirección", "Documentos", "Verificación"…); añadir una fixture nueva con `contentTpl` de ejemplo si hace falta para la story/page nueva.
7. **`dcx-ng-stepper.component.spec.ts`** — añadir los casos de la sección 7.
8. **Storybook (`ClassBased.stories.ts`)** — categorías y descripciones en español; sustituir `ICON_SIZE_LIST` por una lista propia o literal; sustituir `Interactive` (duplicado de `Default`) por una story `WithContent` que demuestre `contentTpl`; añadir story `Xl` si falta cobertura de tamaño.
9. **`Documentation.mdx`** — reescritura completa en español, migrando a `@storybook/blocks` (`<Canvas of={...} />`), corrigiendo el tipo de `size`, el token `--background-primary` → `--bg-primary`, el typo de la lista de clases CSS, y eliminando Canvas duplicados.
10. **Página demo** — migrar a `.demo-page`/`.demo-section`; quitar los `<dcx-ng-divider>` manuales; añadir ejemplo con `contentTpl`; crear `dcx-ng-page-stepper.component.spec.ts`.

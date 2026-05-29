## 1. Overview

`dcx-ng-badge` es un componente display-only que muestra una etiqueta con valor (texto o número) y severidad visual. Se usa principalmente como contador de notificaciones superpuesto sobre iconos/botones y como indicador de estado en tablas o listados.

El refinamiento corrige tres incumplimientos WCAG AA, alinea el Storybook al estándar español del proyecto y migra la página demo al formato `page-demo.scss`.

---

## 2. Problemas detectados

### 2.1 WCAG AA — Críticos

| #   | Criterio                   | Problema actual                                                                                                                                                                      | Solución                                                                                                                                                                   |
| --- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **1.4.1 Use of Color**     | La severidad se diferencia **únicamente por color**. Primary e Info comparten además el mismo tono (#0058ab). Un usuario daltónico no puede distinguir `success`, `warn` o `danger`. | Añadir `ariaLabel = input<string \| null>(null)` y un label computado por defecto que incluye la severidad: `"[valor], [severidad]"`. El consumidor puede sobreescribirlo. |
| 2   | **4.1.3 Status Messages**  | Los badges de notificación (contadores que cambian) no tienen `role="status"` ni `role="alert"`. Un lector de pantalla no anuncia el cambio de valor.                                | Añadir `role = input<'status' \| 'alert' \| null>(null)` que se enlaza con `[attr.role]`.                                                                                  |
| 3   | **1.1.1 Non-text Content** | Sin soporte para `aria-hidden`. Cuando el badge es decorativo (p.ej. el componente padre ya describe el estado), el valor se anuncia innecesariamente.                               | Añadir `ariaHidden = input(false, { transform: booleanAttribute })` enlazado a `[attr.aria-hidden]`.                                                                       |

### 2.2 WCAG AA — Recomendados

| #   | Criterio           | Descripción                                                                                                                                                                      |
| --- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 4   | **1.4.3 Contrast** | El color `warn` (#d97706 sobre blanco) da ~3.1:1 — por debajo del mínimo AA de 4.5:1 para texto normal. El texto blanco sobre fondo amarillo dorado requiere oscurecer el color. |

### 2.3 Bugs de lógica

| #   | Descripción                                                                                                                                                                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5   | `primary` e `info` comparten el mismo color `#0058ab`. Visualmente son indistinguibles, lo que hace irrelevante tener dos severidades distintas. `info` debe diferenciarse (e.g., azul más claro o cian). |
| 6   | Los estilos del tamaño `md` duplican exactamente los del bloque base (mismo `min-width`, `height`, `padding`, `font-size`). El modificador `md` puede eliminarse.                                         |

### 2.4 Mejoras de UX / coherencia

| #   | Descripción                                                                                                                                                           |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 7   | Storybook: categorías en inglés (`Attributes`) en lugar del estándar español del proyecto (`Atributos`).                                                              |
| 8   | Página demo: usa clases propias (`example-title`, `example-row`, `overlay-wrapper`) en lugar del sistema `demo-page` / `demo-section` de `src/styles/page-demo.scss`. |
| 9   | Storybook: falta story del badge vacío (sin `value`) que muestra el indicador punto (dot).                                                                            |
| 10  | Página demo SCSS: tiene 38 líneas de estilos locales que deben eliminarse — los estilos de layout ya están en `page-demo.scss`.                                       |

---

## 3. API / Interface

Sin cambios de ruptura. Solo adiciones.

### Inputs actuales (sin cambios)

| Name       | Type                | Default     | Descripción                                                         |
| ---------- | ------------------- | ----------- | ------------------------------------------------------------------- |
| `value`    | `string`            | `''`        | Texto o número a mostrar. Si está vacío, se muestra un punto (dot). |
| `severity` | `BadgeSeverityType` | `'primary'` | Variante de color.                                                  |
| `size`     | `BadgeSizeType`     | `'md'`      | Tamaño del badge.                                                   |

### Nuevos inputs

| Name         | Type                          | Default | Descripción                                                                                                                   |
| ------------ | ----------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `ariaLabel`  | `string \| null`              | `null`  | Etiqueta accesible explícita. Si es `null`, se usa el label computado por defecto.                                            |
| `ariaHidden` | `boolean`                     | `false` | Marca el badge como decorativo para lectores de pantalla. Usar cuando el padre ya describe el estado.                         |
| `role`       | `'status' \| 'alert' \| null` | `null`  | Rol ARIA para live regions. Usar `'status'` para contadores que cambian sin urgencia, `'alert'` para notificaciones urgentes. |

### Computed interno (no expuesto)

`defaultAriaLabel` — si `ariaLabel` es `null` y `ariaHidden` es `false`, genera: `"[value], [severity]"` p.ej. `"3, danger"`. Cuando `value` está vacío: `"[severity]"`.

---

## 4. Visual States & Variants

Referencia: no existe fichero de diseño `designs/dcx-ng-page-badge.html`.

| Estado / Variante     | Descripción                                                                             |
| --------------------- | --------------------------------------------------------------------------------------- |
| **Default** (primary) | Fondo azul primario (#0058ab), texto blanco                                             |
| **Secondary**         | Fondo gris (#696e75), texto blanco                                                      |
| **Success**           | Fondo verde (#16a34a), texto blanco                                                     |
| **Info**              | **Cambiar** a azul cian (#0284c7) para diferenciarlo de Primary                         |
| **Warn**              | **Cambiar** fondo a naranja más oscuro (#b45309) para garantizar 4.5:1 con texto blanco |
| **Danger**            | Fondo rojo (#dc2626), texto blanco                                                      |
| **Dot (vacío)**       | Sin texto, aparece como círculo pequeño                                                 |
| **Tamaños**           | sm / md / lg / xl                                                                       |

---

## 5. SCSS / Tokens

Tokens usados (con fallback):

- `--bg-primary`, `--text-white`, `--border-radius-pill` y las constantes de severidad en la propia hoja de estilos

Cambios en SCSS:

- Eliminar bloque `md` duplicado (mismo que base)
- Cambiar color `info` de `#0058ab` a `#0284c7`
- Cambiar fondo `warn` de `#d97706` a `#b45309` (mejora contraste a ~5.4:1)

---

## 6. Accesibilidad (WCAG AA)

### Estructura HTML objetivo

```html
<span
  class="dcx-ng-badge dcx-ng-badge--{severity} dcx-ng-badge--{size}"
  [attr.role]="role() || null"
  [attr.aria-label]="computedAriaLabel()"
  [attr.aria-hidden]="ariaHidden() || null"
>
  {{ value() }}
</span>
```

### Computed aria-label

```
null        → no attr (when ariaHidden=true)
ariaLabel() → user-provided string
default     → value() ? `${value()}, ${severity()}` : severity()
```

### Keyboard

No aplica (componente display-only, sin interacción).

### Notas screen reader

- Usar `ariaHidden="true"` cuando el badge está junto a un botón cuyo `aria-label` ya incluye el conteo: `aria-label="Notificaciones, 3 sin leer"`.
- Usar `role="status"` cuando el valor cambia dinámicamente (contador actualizado en tiempo real).
- Usar `role="alert"` solo para errores/alertas urgentes que requieren atención inmediata.

---

## 7. Test Cases

- [ ] should create the component
- [ ] should render the value
- [ ] should render empty (dot) when value is empty string
- [ ] should apply severity CSS class
- [ ] should apply size CSS class
- [ ] should set aria-label to computed default when ariaLabel is null
- [ ] should use provided ariaLabel when set
- [ ] should set aria-hidden when ariaHidden is true
- [ ] should not render aria-hidden attribute when ariaHidden is false
- [ ] should set role attribute when role is provided
- [ ] should not render role attribute when role is null
- [ ] should apply 'primary' severity by default
- [ ] should apply 'md' size by default

---

## 7b. Decisión: componentes de librería vs HTML nativo

El badge es un `<span>` nativo con clases CSS. No se usa `DcxNgButtonComponent` ni ningún otro componente de la librería — es el enfoque correcto para un elemento de visualización inline.

---

## 8. Out of Scope

- Soporte para iconos embebidos dentro del badge (requiere rediseño visual)
- Modo animado (pulse/blink para notificaciones urgentes)
- Tema oscuro
- Proyección de contenido (`<ng-content>`) en lugar de `value` input

---

## 9. Open Questions

- [ ] ¿El color `warn` (#b45309) está aprobado visualmente con el equipo de diseño? Es más oscuro que el actual y cambia la apariencia.
- [ ] ¿El color `info` (#0284c7) está aprobado? Se aleja del azul corporativo de Capgemini.

---

## 10. Implementation Plan

1. **Interface** — añadir `role?: 'status' | 'alert' | null` si se quiere tipar en interfaz (opcional, inputs simples no lo requieren)
2. **Component TS** — añadir `ariaLabel`, `ariaHidden`, `role` inputs + `computedAriaLabel` computed
3. **Component HTML** — enlazar los 3 nuevos atributos ARIA
4. **Component SCSS** — eliminar bloque `md` duplicado, cambiar colores `info` y `warn`
5. **Spec.ts** — añadir tests WCAG + nuevos inputs
6. **Storybook** — traducir categorías a español, añadir story `Dot` (empty badge)
7. **Page demo HTML** — reescribir con formato `demo-page` / `demo-section`
8. **Page demo SCSS** — reemplazar por comentario (estilos ya en global)

# Spec: Toast Action Customization

**Status:** Draft
**Date:** 2026-04-14
**Author:** GitHub Copilot

---

## 1. Overview

Permitir que el CTA del componente `dcx-ng-toast` sea configurable, de forma que no esté limitado al texto fijo "Deshacer" y pueda incluir icono.

El objetivo es mantener compatibilidad con el comportamiento actual (sin romper usos existentes) y habilitar casos como:

- texto de acción distinto (ej. "Reintentar", "Ver detalle")
- acción con icono
- acción solo icono con `aria-label`

---

## 2. Acceptance Criteria

- [ ] El toast permite configurar el texto del CTA mediante input (`actionLabel`).
- [ ] El toast permite configurar icono en el CTA mediante input (`actionIconName`).
- [ ] Si no se pasa configuración de acción, el CTA se mantiene como hoy: texto "Deshacer".
- [ ] Se mantiene el output `actionClick` sin cambios de contrato.
- [ ] Se mantiene la accesibilidad cuando la acción es solo icono (requiere `aria-label`).
- [ ] `DcxToastOptions` refleja las nuevas opciones de acción.
- [ ] Tests unitarios cubren texto custom, icono custom y fallback por defecto.
- [ ] Storybook incluye al menos un caso con texto custom y otro con icono.

---

## 3. API / Interface

### Inputs (Angular `input()` signals)

| Name              | Type           | Default      | Required | Description                               |
| ----------------- | -------------- | ------------ | -------- | ----------------------------------------- |
| `message`         | `string`       | -            | Yes      | Mensaje principal del toast               |
| `type`            | `DcxToastType` | `info`       | No       | Variante visual del toast                 |
| `autoDismiss`     | `boolean`      | `false`      | No       | Cierre automático                         |
| `durationMs`      | `number`       | `5000`       | No       | Duración del auto-dismiss                 |
| `iconName`        | `string`       | `''`         | No       | Icono principal del toast                 |
| `actionLabel`     | `string`       | `'Deshacer'` | No       | Texto del botón de acción                 |
| `actionIconName`  | `string`       | `''`         | No       | Icono del botón de acción                 |
| `actionAriaLabel` | `string`       | `''`         | No       | Etiqueta accesible para acción solo icono |

### Outputs (Angular `output()` signals)

| Name          | Emitted Type | Description                        |
| ------------- | ------------ | ---------------------------------- |
| `actionClick` | `void`       | Se dispara al pulsar la acción     |
| `dismissed`   | `void`       | Se dispara al cerrarse por timeout |

### Public Methods (if any)

Sin cambios.

---

## 4. Visual States & Variants

- **Default (legacy)**: botón de acción con texto `Deshacer`.
- **Texto custom**: botón muestra el texto configurado.
- **Texto + icono**: botón muestra icono y texto.
- **Solo icono**: botón sin texto visible, con `aria-label`.

---

## 5. SCSS / Tokens

Sin nuevos tokens obligatorios.

Se reutilizan estilos existentes de `dcx-toast__action` y del componente `dcx-ng-button`.

---

## 6. Accessibility (a11y)

- Si `actionLabel` está vacío y `actionIconName` tiene valor, el botón debe tener `aria-label` válido.
- El rol y `aria-live` del toast se mantienen como están actualmente.

---

## 7. Test Cases

- [ ] should render default action label "Deshacer" when no action inputs are provided
- [ ] should render custom action label when `actionLabel` is provided
- [ ] should render action icon when `actionIconName` is provided
- [ ] should emit `actionClick` on action button click
- [ ] should expose accessible label when action is icon-only

---

## 8. Out of Scope

- No se añade botón de cierre independiente.
- No se rediseña el layout visual del toast.

---

## 9. Open Questions

- [ ] ¿Queremos permitir ocultar completamente el CTA (`showAction=false`) o no entra en este alcance?

---

## 10. Implementation Plan

1. Extender inputs en `dcx-ng-toast.component.ts` para soportar `actionLabel`, `actionIconName`, `actionAriaLabel`.
2. Actualizar template `dcx-ng-toast.component.html` para render condicional de texto/icono de acción.
3. Actualizar `DcxToastOptions` en `core/interfaces/toast.ts`.
4. Ajustar mocks y stories de toast con ejemplos nuevos.
5. Ampliar tests unitarios de toast para nuevos escenarios.
6. Validar lint/tests de los archivos tocados.

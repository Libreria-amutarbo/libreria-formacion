# Spec: Core Architecture Restructure

**Status:** Done
**Date:** 2026-04-23
**Author:** GitHub Copilot

---

## 1. Overview

Reestructurar `core` para separar responsabilidades y eliminar solapamientos actuales, especialmente en la carpeta `mock`, donde hoy conviven datos de demo/test, defaults de runtime y constantes compartidas.

Objetivo principal:

- Mejorar mantenibilidad y legibilidad de la arquitectura.
- Evitar que código de producción dependa de un namespace llamado `mock`.
- Dejar un modelo simple para el equipo: cada carpeta tiene una responsabilidad clara.

Propuesta simple de estructura objetivo:

- `core/interfaces` -> contratos y tipos.
- `core/defaults` -> valores por defecto usados en runtime por componentes.
- `core/fixtures` -> datos de ejemplo para tests, stories y demos.
- `core/tokens` -> catálogos y tokens de diseño/constantes visuales.
- `core/mapping` -> funciones de mapeo (sin cambios estructurales relevantes).

---

## 2. Acceptance Criteria

- [x] `core/mock` deja de ser punto de entrada para consumo nuevo.
- [x] Los valores de runtime usados por componentes se mueven a `core/defaults`.
- [x] Los datos de test/story/demo se mueven a `core/fixtures`.
- [x] Los tokens/catálogos visuales se mueven a `core/tokens`.
- [x] No quedan imports desde componentes de producción hacia `core/mock`.
- [x] Se mantiene compatibilidad pública de exports en `src/index.ts` (sin breaking change en esta fase).
- [x] Stories y tests siguen funcionando tras migración de imports.
- [x] Lint y tests relevantes pasan sin regresiones.

---

## 3. API / Interface

### Inputs

No aplica (cambio arquitectónico interno).

### Outputs

No aplica (cambio arquitectónico interno).

### Superficie pública y contratos

Se mantiene la API pública del paquete. La reorganización es interna de rutas/organización y de barrel files en `core`.

Regla de contrato de carpetas:

- `defaults`: solo defaults/config de runtime (sin datasets de demo).
- `fixtures`: solo datos de ejemplo y factories para test/story/demo.
- `tokens`: solo constantes de diseño/catálogos visuales.

Implementación de transición aplicada:

- Se crearon los nuevos barrels `defaults`, `fixtures` y `tokens`.
- Los archivos se movieron físicamente desde `core/mock` a sus carpetas de responsabilidad.
- Los componentes de producción y stories directas se migraron a esas rutas nuevas.
- `core/mock` se mantiene como capa de compatibilidad mediante re-exports para evitar breaking changes en esta fase.
- Se añadió una regla de lint para impedir nuevos imports desde `core/mock` en código productivo.

---

## 4. Estados y variantes visuales

No aplica en términos de UI (no hay cambio de comportamiento visual esperado).

Variante de migración:

- **Fase de transición**: opcionalmente mantener re-exports temporales para no romper imports internos mientras se migra.
- **Fase final**: imports internos alineados con carpeta de responsabilidad correcta.

---

## 5. SCSS / Tokens

No se crean tokens nuevos obligatorios.

Se reclasifican los existentes (por ejemplo `palette` y `tokens`) hacia `core/tokens` para reflejar su naturaleza real.

---

## 6. Accessibility (a11y)

No aplica directamente (sin cambios funcionales en componentes).

---

## 7. Test Cases

- [x] should not import from `core/mock` in production components
- [x] should compile with new internal import paths for defaults/fixtures/tokens
- [x] should keep story data available from `core/fixtures`
- [x] should keep design tokens available from `core/tokens`
- [x] should preserve existing behavior of components after import migration

---

## 8. Out of Scope

- No rediseño visual de componentes.
- No cambios de API funcional en componentes (inputs/outputs/comportamiento).
- No limpieza exhaustiva de naming histórico fuera del alcance de `core`.

---

## 9. Open Questions

- [ ] ¿Queremos deprecar explícitamente los exports legacy de `core/mock` o mantener compatibilidad total por una release?
- [ ] ¿Queremos dividir `fixtures` en `test-fixtures` y `story-fixtures`, o mantener una carpeta única por simplicidad?
- [ ] ¿`mapping` se mantiene en `core` o debe evaluarse moverlo a una carpeta más semántica en una fase futura?

---

## 10. Implementation Plan

1. Crear estructura base: `core/defaults`, `core/fixtures`, `core/tokens` con `index.ts` por carpeta.
2. Mover/recategorizar archivos actuales de `core/mock`:
   - `colors.ts` -> `tokens`.
   - defaults de componentes (input, tooltip, slider, etc.) -> `defaults`.
   - datasets/factories de demo/test (table, date helpers, etc.) -> `fixtures`.
3. Actualizar barrel files de `core` y `src/index.ts` manteniendo compatibilidad pública.
4. Migrar imports internos de componentes para que runtime consuma `defaults`/`tokens` y no `mock`.
5. Migrar imports de stories/tests para consumir `fixtures`.
6. Añadir validación automática (búsqueda de imports prohibidos a `core/mock` en componentes) y ejecutar lint/tests.
7. (Opcional) Mantener re-exports legacy en `core/mock` durante una ventana de transición, con comentario de deprecación.
8. Cerrar la fase retirando dependencias internas de `core/mock`.

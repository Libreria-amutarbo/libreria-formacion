---
agent: agent
description: Ejecuta el ciclo de testing formal para la issue activa
---

# /sdd-test — Ciclo de Testing de la Issue

Este comando ejecuta el ciclo de testing formal para la issue activa antes de poder cerrarla con `/sdd-done`.

---

## Paso 1: Localizar la issue activa

Encuentra el directorio activo en `dcxsdd/issues/` (excluye `done/`). Si hay varias issues activas, pide al usuario que seleccione una.

```
dcxsdd/issues/<nombre-issue>/
├── specs/
│   └── <spec-name>/
│       ├── spec.md
│       └── test-spec.md
├── plan-test.md
├── run-state.json
└── bugs.md
```

---

## Paso 2: Localizar specs de testing

Busca todos los ficheros:

```
dcxsdd/issues/<issue>/specs/*/test-spec.md
```

Cada `test-spec.md` está asociado a su `spec.md` mediante:

- misma carpeta
- misma capability
- misma referencia lógica de spec
- campo `Trace`

Si alguna carpeta contiene `spec.md` pero no contiene `test-spec.md`, genera una `test-spec.md` mínima antes de continuar.

---

## Paso 3: Completar casos de prueba trazables

Para cada `test-spec.md`, revisa la `spec.md` asociada y completa los casos de prueba necesarios.

Formato:

```
## TC-<N>: <Título del caso>

Development spec: spec.md  
Trace: <spec-name | requirement-id | task-id>  

Tipo: unitario | integración | e2e | manual  

Precondiciones:
<estado inicial>

### Pasos
1. <paso 1>
2. <paso 2>

### Resultado esperado
<descripción del resultado esperado>
```

La trazabilidad es obligatoria. Cada caso debe enlazar con una tarea, requirement, scenario o spec de desarrollo.

---

## Paso 4: Detectar si es un proyecto web

Comprueba la presencia de cualquiera de:

- `package.json` con dependencias `react`, `vue`, `angular`, `next`, `vite`, `svelte`, `nuxt`, `astro`
- `index.html` en la raíz del proyecto
- carpetas como `src/pages`, `src/app`, `app`, `pages` o `public`

Si se detecta proyecto web → continúa con el paso de navegador.  
Si no → salta directamente a ejecutar los casos de prueba.

---

## Paso 5: Abrir el navegador (solo proyectos web)

Identifica la URL local del proyecto.

Por defecto:
```
http://localhost:3000
```

Otros puertos comunes:
```
http://localhost:5173
http://localhost:4200
http://localhost:8080
```

VS Code (Simple Browser):
```
vscode://vscode.simpleBrowser/show?url=http://localhost:<port>
```

O:
```
View → Command Palette → Simple Browser: Show
```

---

## Paso 6: Ejecutar los casos de prueba

Ejecuta cada caso definido en los `test-spec.md`.

Para cada caso:

- Si pasa → `passed`
- Si falla → `failed`
- Si no aplica → `skipped` (indicar motivo)
- Si falla → registrar en `bugs.md`

Actualiza la tabla o estado dentro de cada `test-spec.md`.

---

## Paso 7: Escribir `bugs.md`

Si encontraste fallos, escribe o actualiza:

```
dcxsdd/issues/<issue>/bugs.md
```

Formato:

```
# Bugs — <nombre-issue>

| ID | Título | Severity | Estado | Trace | Pasos para reproducir |
|----|--------|----------|--------|------|----------------------|
| BUG-001 | <título> | critical|high|medium|low | open|resolved | <trace> | <pasos> |
```

---

## Paso 8: Marcar testingDone

Actualiza:

```
{
  "testingDone": true
}
```

Si existe CLI úsalo; si no, edita `run-state.json` directamente manteniendo el resto del contenido.

---

## Paso 9: Resumen final

```
✅ Testing completado — <nombre-issue>

  Specs de testing:  <N>
  Casos ejecutados:  <N>
  Casos pasados:     <N>
  Casos fallidos:    <N>
  Bugs encontrados:  <N>
```

Si hay bugs:

```
⚠ Bugs abiertos — Revísalos antes de cerrar con /sdd-done.
```

Si no hay bugs:

```
✅ Todos los casos pasaron. Lista para /sdd-done.
```

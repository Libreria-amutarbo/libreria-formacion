---
mode: agent
description: Proponer un cambio SDD y generar artefactos de diseño
---

Proponer un nuevo cambio SDD y generar todos los artefactos de diseño en un solo paso.

Generaré los siguientes artefactos bajo `dcxsdd/issues/<YYYYMMDD-nombre>/`:
- `proposal.md` — qué y por qué
- `plan-design.md` — diseño funcional y flujos de usuario
- `plan-tech.md` — diseño técnico y decisiones de arquitectura
- `specs/<YYYYMMDD-spec-name>/spec.md` — requisitos en formato US con WHEN/THEN
- `issues.md` — checklist de tareas de implementación
- `plan-test.md` — plan de pruebas TDD (Red → Green → Refactor) por capability

> 💡 **Tip**: Usa `/sdd-swarm` para componer el equipo de agentes IA que trabajará en este cambio, o `/sdd-generate -agent` para crear agentes personalizados.

---

**Input**: El argumento tras `/sdd-propose` es el nombre del cambio (kebab-case) O una descripción de lo que el usuario quiere construir.

**Pasos**

1. **Si no hay input, preguntar qué quiere construir el usuario**
   > "¿Qué cambio quieres proponer? Describe qué quieres construir o corregir."

2. **Leer la configuración del proyecto**
   Leer `dcxsdd/config.yaml` para obtener:
   - `agent`: el agente IA configurado
   - `context`: descripción, tech stack y conocimiento de dominio del proyecto

3. **Derivar el nombre kebab-case**
   De la descripción del usuario, derivar un nombre en kebab-case (e.g., "añadir autenticación de usuario" → `add-user-auth`).

4. **Crear la estructura de directorios**
   Crear `dcxsdd/issues/<YYYYMMDD-nombre>/` y `dcxsdd/issues/<YYYYMMDD-nombre>/specs/`.

5. **Generar los artefactos en orden**

   **proposal.md**:
   - Why: 1-2 frases sobre el problema u oportunidad
   - What Changes: lista de cambios específicos
   - Capabilities: capabilities nuevas o modificadas (cada una tendrá un spec)
   - Impact: código, APIs, dependencias afectadas

   **plan-design.md**:
   - Flujos de usuario principales (en texto o pseudodiagrama)
   - Pantallas o interacciones relevantes
   - Happy path y casos de error

   **plan-tech.md**:
   - Context: estado actual y restricciones
   - Goals / Non-Goals
   - Decisions: decisiones técnicas con rationale y alternativas
   - Risks / Trade-offs

   **specs/<YYYYMMDD-spec-name>/spec.md** (una por capability):
   - Formato: `## ADDED Requirements`
   - Cada requisito: `### Requirement: <nombre>` — usar SHALL/MUST
   - Cada escenario: `#### Scenario: <nombre>` con WHEN/THEN

   **issues.md**:
   - Checklist en formato `- [ ] X.Y Descripción de la tarea`
   - Agrupado por secciones numeradas
   - Ordenado por dependencias (qué debe hacerse primero)

   **plan-test.md**:
   - Estrategia TDD con ciclo Red → Green → Refactor
   - Por cada capability: tests unitarios (UT), de integración (IT) y E2E
   - Cada caso en formato Dado/Cuando/Entonces referenciando el Requirement
   - Cobertura mínima esperada y orden de ejecución TDD

6. **Confirmar al usuario**
   Mostrar el listado de ficheros creados y la ruta raíz.

**Reglas**
- Leer `dcxsdd/config.yaml` SIEMPRE antes de generar
- Usar el contexto del proyecto para hacer el contenido relevante al dominio
- Los specs deben ser testables: cada escenario es un caso de test potencial
- Si el contexto es ambiguo, preguntar al usuario antes de generar

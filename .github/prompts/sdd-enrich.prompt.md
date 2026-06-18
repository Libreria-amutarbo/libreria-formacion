---
mode: agent
description: Enriquecer specs con detalle técnico para GitHub Copilot
---

Enriquecer las specs existentes con el detalle técnico necesario para la implementación con este agente IA.

Para cada spec seleccionada, generaré un fichero `spec-enriched.md` junto al `spec.md` original, preservando todos los escenarios WHEN/THEN e incorporando el contexto técnico necesario.

---

**Input**: Opcional — nombre de la issue o spec a enriquecer. Si no se proporciona, detectar automáticamente.

**Pasos**

1. **Detectar specs existentes**
   Buscar todos los ficheros `spec.md` bajo `dcxsdd/issues/`.
   Si hay varias, presentar la lista y preguntar cuál enriquecer.
   Si no hay ninguna, informar al usuario de que debe ejecutar `/sdd-propose` primero.

2. **Leer la configuración del proyecto**
   Leer `dcxsdd/config.yaml` para obtener:
   - `agent`: el agente configurado (determina el nivel y tipo de detalle técnico)
   - `context`: tech stack y conocimiento de dominio

3. **Leer los artefactos de contexto**
   Para la issue seleccionada, leer:
   - `proposal.md` — qué se está construyendo
   - `plan-tech.md` — decisiones técnicas ya tomadas
   - `spec.md` — los requisitos y escenarios originales

4. **Generar spec-enriched.md**
   - Copiar todos los requisitos y escenarios del `spec.md` original (sin modificarlos)
   - Bajo cada `#### Scenario: <nombre>`, añadir una subsección `##### Technical Notes` con:
     - Detalle técnico adaptado al agente IA configurado
     - Referencias a ficheros, funciones, APIs o patrones relevantes
     - Consideraciones de implementación específicas del tech stack

5. **Preservar formato WHEN/THEN**
   Los escenarios originales deben aparecer intactos. El detalle técnico se añade DESPUÉS del WHEN/THEN, nunca dentro.

6. **Confirmar al usuario**
   Mostrar la ruta del `spec-enriched.md` generado.

**Reglas de enriquecimiento por agente**

- **GitHub Copilot**: Incluir rutas de ficheros del repo, nombres de funciones/clases y patrones de código esperados.
- **Claude**: Incluir contexto extendido de arquitectura, razonamiento de decisiones y ejemplos de implementación detallados.
- **Cursor**: Mostrar diffs inline y estructurar el detalle como steps secuenciales para Cursor Composer.
- **Antigravity**: Descomponer en micro-tareas accionables con criterios de aceptación booleanos.
- **Codex**: Definir contratos de API completos y generar casos de test en pseudocódigo.

**Reglas generales**
- NUNCA modificar el `spec.md` original
- Preservar exactamente el formato WHEN/THEN
- El `spec-enriched.md` debe ser autocontenido (no requiere leer el original para entenderse)
- Si el tech stack no está en `config.yaml`, preguntar al usuario antes de enriquecer

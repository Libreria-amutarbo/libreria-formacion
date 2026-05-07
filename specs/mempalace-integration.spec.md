# Guia Operativa: MemPalace en libreria-formacion

Fecha de actualizacion: 2026-05-06

## 1. Objetivo

Esta guia explica como usar MemPalace en este monorepo Nx/Angular para:

- indexar codigo y documentacion del proyecto,
- buscar decisiones tecnicas pasadas,
- preparar contexto al arrancar una sesion de trabajo con asistentes AI.

La integracion es opcional y no afecta build, lint, test ni Storybook.

## 2. Estado actual en este repo

- MemPalace ya fue inicializado en la raiz de este proyecto.
- El primer minado ya fue ejecutado correctamente.
- Existe configuracion MCP para VS Code en `.vscode/mcp.json`.
- `.gitignore` ya incluye exclusiones para `mempalace.yaml` y `entities.json`.

## 3. Prerrequisitos por sistema operativo

### Windows (PowerShell)

```powershell
py -m pip install mempalace
mempalace --version
```

### macOS / Linux

```bash
python3 -m pip install mempalace
mempalace --version
```

Si el comando `mempalace` no aparece en PATH, usa Python con modulo:

```bash
python -m mempalace.cli --version
```

## 4. Comandos operativos base

Ejecutar desde la raiz del repo.

```bash
mempalace init .
mempalace mine .
mempalace search "storybook"
mempalace wake-up
```

Descripcion rapida:

- `init`: crea/configura el palace para este proyecto.
- `mine`: indexa archivos para busqueda semantica.
- `search`: recupera fragmentos verbatim relevantes.
- `wake-up`: carga contexto inicial antes de una sesion.

## 5. Flujo diario recomendado

1. Al iniciar jornada:
	 - `mempalace wake-up`
2. Antes de tocar una feature grande o corregir bugs complejos:
	 - `mempalace search "tema o modulo"`
3. Al finalizar cambios relevantes (o una vez al dia):
	 - `mempalace mine .`

## 6. Uso con GitHub Copilot (VS Code)

Este repo incluye servidor MCP en `.vscode/mcp.json`:

```json
{
	"servers": {
		"mempalace": {
			"type": "stdio",
			"command": "mempalace-mcp",
			"disabled": false
		}
	}
}
```

Pasos para usuarios de Copilot:

1. Abrir VS Code en este repo.
2. Verificar que `mempalace-mcp --help` funciona en terminal.
3. En Copilot Chat, pedir consultas de memoria del proyecto.
4. Si no responde con memoria, reiniciar ventana de VS Code y volver a intentar.

Prompts utiles para Copilot:

- "Busca en MemPalace decisiones sobre Storybook en este repo"
- "Recupera contexto historico de cambios en tema generator"
- "Antes de proponer refactor, consulta memoria del modulo table"

## 7. Smoke tests (validacion rapida)

Desde la raiz del repo:

```bash
mempalace --version
mempalace search "storybook"
mempalace search "theme generator"
```

Criterio de exito:

- Los comandos terminan con codigo 0.
- `search` devuelve resultados del propio repo (por ejemplo `nx.json`, `README.md`, `specs/`, `libs/`, `src/`).

## 8. Troubleshooting

### Error: no encuentra Ollama

Es esperable si no usas proveedor LLM local. MemPalace puede funcionar en modo heuristico. Opcionalmente usa flags de no-llm si aplica a tu flujo.

### Error: `mempalace-mcp` no reconocido

Reinstalar MemPalace y verificar PATH:

```bash
python -m pip install --upgrade mempalace
mempalace-mcp --help
```

### Copilot no usa memoria MCP

- Confirmar que `.vscode/mcp.json` existe y esta habilitado.
- Reiniciar VS Code.
- Validar binario `mempalace-mcp` en terminal.

## 9. Rollback / desactivacion

Para desactivar sin romper el repo:

1. Cambiar `"disabled": true` en `.vscode/mcp.json`, o
2. Eliminar temporalmente `.vscode/mcp.json`.

Para limpiar datos locales de memoria de este proyecto, eliminar:

- `mempalace.yaml`
- `entities.json`

No afecta la libreria Angular ni scripts Nx.

## 10. Notas para el equipo

- Evitar versionar datos de memoria local fuera de lo ya acordado.
- Mantener el uso como herramienta de desarrollo local.
- Si se quiere estandarizar comandos npm (`mem:init`, `mem:mine`, etc.), definirlo en una tarea aparte.

## 11. Medicion de ahorro de tokens

Se incluye un script para estimar ahorro por sesion y por semana:

- `scripts/mempalace-token-savings.ps1`

### Que mide

- Baseline por sesion (tokens que normalmente inyectas sin MemPalace).
- Costo de `mempalace wake-up`.
- Costo de `mempalace search` para una query real.
- Ahorro estimado por sesion y por semana.

### Como usarlo (PowerShell)

Desde la raiz del repo:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\mempalace-token-savings.ps1 -Query "storybook" -BaselineTokens 10000 -SessionsPerWeek 20 -SearchesPerSession 1
```

### Automatizacion diaria (JSON + CSV)

Se incluye un segundo script para generar un reporte por ejecucion (JSON) y un historico acumulado (CSV):

- `scripts/mempalace-token-savings-daily.ps1`

Ejemplo de uso:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\mempalace-token-savings-daily.ps1 -Query "storybook" -BaselineTokens 10000 -SessionsPerWeek 20 -SearchesPerSession 1
```

Salida esperada:

- JSON por corrida: `metrics/mempalace/token-savings-YYYY-MM-DD-HHMMSS-<query>.json`
- CSV historico: `metrics/mempalace/token-savings-history.csv`

Este CSV se puede abrir directo en Excel o importar en Power BI.

Parametros:

- `-Query`: consulta real de tu flujo (ejemplo: `storybook`, `theme generator`, `table`).
- `-BaselineTokens`: tokens que sueles gastar por sesion sin MemPalace.
- `-SessionsPerWeek`: cuantas sesiones tienes por semana (default: 20).
- `-SearchesPerSession`: cuantas busquedas haces por sesion (default: 2).
- `-CharsPerToken`: factor de aproximacion (default: 4).
- `-Json`: salida JSON para automatizar reportes.

### Ejemplo de salida esperada

```text
MemPalace token savings report (approx)
--------------------------------------
Query: storybook
Baseline/session: 10000 tokens
Wake-up: 836 tokens
Search: 1194 tokens
Searches/session: 1
With MemPalace/session: 2030 tokens
Saved/session: 7970 tokens
Saved/session (%): 79.7%
Weekly baseline: 200000 tokens
Weekly with MemPalace: 40600 tokens
Weekly saved: 159400 tokens
```

### Recomendacion para medir con datos fiables

1. Define baseline real por tipo de tarea (bugfix, feature, refactor).
2. Corre el script para 3-5 queries representativas.
3. Compara ahorro promedio semanal durante 1-2 semanas.
4. Si quieres precision alta, complementa con el contador de tokens del proveedor LLM.

### Uso con Copilot

El script mide costo de contexto de MemPalace, no costo interno del modelo de Copilot.
Para evaluacion completa:

1. Ejecuta el script y guarda el resultado.
2. Contrasta con tiempos de resolucion y numero de reprompts en Copilot Chat.
3. Ajusta `-SearchesPerSession` a tu uso real diario.
4. Para seguimiento continuo del equipo, usa el script diario y revisa tendencia semanal en el CSV.

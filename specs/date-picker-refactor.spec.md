# DatePicker Refactor Spec

## Overview

Refactorizar `DcxNgDatePickerComponent` para mejorar el uso real del selector en modo simple, multiple y rango, manteniendo la API publica actual y evitando regresiones en Storybook y en la pagina demo.

El componente debe permitir entrada manual por teclado, mantener estable su ancho aunque haya muchas fechas seleccionadas, evitar el parpadeo/reapertura al pulsar el input cuando el calendario ya esta abierto y comunicar con claridad las fechas minima y maxima en Storybook.

## Acceptance Criteria

- [ ] El modo `multiSelect` no aumenta el ancho del componente cuando se seleccionan muchas fechas.
- [ ] El input de `multiSelect` no concatena fechas seleccionadas dentro del campo.
- [ ] Las fechas seleccionadas en `multiSelect` se pueden mostrar fuera del componente sin ampliar ni desplazar el DatePicker.
- [ ] El input muestra el contenido seleccionado sin romper el layout del DatePicker.
- [ ] El usuario puede escribir una fecha manualmente desde el teclado en formato `dd/MM/yyyy` o `MM/dd/yyyy` segun `dateFormat`.
- [ ] Una fecha escrita manualmente se emite por el output correspondiente del modo activo (`selectedDateChange`, `selectedDatesChange`, `startDateChange`/`endDateChange`).
- [ ] Una fecha manual invalida o fuera de `minDate`/`maxDate` no actualiza la seleccion.
- [ ] Pulsar el input con el calendario cerrado lo abre.
- [ ] Pulsar el input con el calendario abierto no lo cierra ni vuelve a montar el popover.
- [ ] El comportamiento de cierre por click fuera y por `Aplicar` se mantiene.
- [ ] Storybook muestra de forma explicita cual es la fecha minima y cual es la maxima cuando esos inputs tienen valor.
- [ ] Tests unitarios cubren entrada manual, estabilidad de apertura y valor de input para seleccion multiple.

## API

### Selector

- `dcx-ng-date-picker`

### Inputs existentes

Sin cambios de contrato:

- `selectedDate: Date | null`
- `selectedDates: Date[]`
- `multiSelect: boolean`
- `rangeSelect: boolean`
- `startDate: Date | null`
- `endDate: Date | null`
- `minDate: Date | null`
- `maxDate: Date | null`
- `disabled: boolean`
- `placeholder: string`
- `dateFormat: 'dd/MM/yyyy' | 'MM/dd/yyyy'`

### Outputs existentes

Sin cambios de contrato:

- `selectedDateChange: Date | null`
- `selectedDatesChange: Date[]`
- `startDateChange: Date | null`
- `endDateChange: Date | null`

### Metodos publicos

- Se mantiene `toggleCalendar()` por compatibilidad con tests/usos existentes.
- Se anade `openCalendar()` como accion idempotente para el input.
- Se anade gestion interna de entrada manual sin exponer nuevos inputs obligatorios.

## Estados y comportamiento

- **Cerrado**: click/focus en input abre el calendario si no esta disabled.
- **Abierto**: click/focus repetido en input no cambia estado ni resetea mes/modo.
- **Entrada manual simple**: una fecha valida emite `selectedDateChange`.
- **Entrada manual multiple**: una fecha valida alterna la presencia de esa fecha en `selectedDates`.
- **Entrada manual rango**: reutiliza la logica actual de seleccion de rango.
- **Fechas invalidas**: no se emite ningun cambio.
- **Fechas fuera de rango min/max**: no se emite ningun cambio.

## SCSS / Layout

- El host visual `.dcx-datepicker` conserva `width: 100%` y `max-width`.
- El input y su wrapper usan `min-width: 0` para permitir truncado.
- El input nativo usa `overflow: hidden`, `text-overflow: ellipsis` y `white-space: nowrap`.
- El valor visible de `multiSelect` no concatena indefinidamente todas las fechas dentro del input.
- Los bloques externos de estado que muestren muchas fechas limitan su ancho y permiten salto de linea.
- No se introducen nuevos tokens obligatorios.

## Storybook

- La story `WithMinAndMaxDate` debe mostrar junto al estado seleccionado:
  - `Fecha minima: <fecha>`
  - `Fecha maxima: <fecha>`
- El texto debe respetar el `dateFormat` activo para no mezclar formatos.

## Casos de test

- [ ] `openCalendar()` abre el calendario si esta cerrado.
- [ ] `openCalendar()` no cierra ni resetea el modo si ya esta abierto.
- [ ] El click del wrapper abre el calendario y un segundo click lo mantiene abierto.
- [ ] El input no usa el placeholder como valor cuando no hay fecha seleccionada.
- [ ] En `multiSelect`, `inputValue()` queda disponible para entrada manual y no contiene la lista completa.
- [ ] En `multiSelect`, el DatePicker no renderiza filas extra que cambien su altura al seleccionar muchas fechas.
- [ ] `onManualInput('15/01/2025')` emite `selectedDateChange` en formato `dd/MM/yyyy`.
- [ ] `onManualInput('01/15/2025')` emite `selectedDateChange` en formato `MM/dd/yyyy`.
- [ ] `onManualInput()` no emite con fechas invalidas.
- [ ] `onManualInput()` no emite con fechas fuera de `minDate`/`maxDate`.
- [ ] En `multiSelect`, la entrada manual anade o quita la fecha.
- [ ] En `rangeSelect`, la entrada manual emite inicio/fin usando la misma logica que el calendario.

## Plan de implementacion

1. Crear esta spec antes de completar el refactor.
2. Separar apertura idempotente (`openCalendar`) de alternancia (`toggleCalendar`).
3. Permitir escritura en el input y parsear la fecha segun `dateFormat`.
4. Normalizar comparaciones de fechas para `minDate`/`maxDate`.
5. Ajustar estilos del input y de los estados externos de demo/Storybook para que la seleccion multiple larga no amplie ni desplace el componente.
6. Mejorar la story de min/max con etiquetas visibles.
7. Ampliar tests unitarios del DatePicker.
8. Ejecutar tests focalizados del componente y validar lint/build si procede.

## Out of Scope

- No se anaden nuevos formatos de fecha.
- No se cambia la API publica de inputs/outputs.
- No se implementa mascara de fecha ni validacion visual de error en esta iteracion.

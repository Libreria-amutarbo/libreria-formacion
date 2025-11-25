export type SortDirection = 'asc' | 'desc' | null;

export enum SortType {
  Ascending = 'ascending',
  Descending = 'descending',
  None = 'none',
}

/**
 * Configuración para el template genérico de fecha
 /** Formato de fecha para DatePipe. Ej: 'dd/MM/yyyy', 'dd/MM/yyyy HH:mm', 'dd/MM/yy', 'MM/dd/yyyy hh:mm:ss a' 
 */
export interface DateTemplateConfig {
  dateFormat?: string;
}

/**
 * Column definition for the table.
 *
 * - `key` se usa para leer la propiedad del row.
 * - `template` es el nombre del template de celda (externo/interno).
 * - `headerTemplate` es el nombre del template de cabecera.
 * - `renderFn` función personalizada para renderizar el valor de la celda.
 * - `builtInTemplate` template genérico incorporado (solo 'date' disponible).
 * - `filterable` habilita el filtrado por columna.
 * - `editable` permite editar celdas con doble click.
 */
export interface HeaderData {
  name: string;
  key?: string;
  sortable?: boolean;
  type?: 'string' | 'number';
  defaultSort?: Exclude<SortDirection, null>;
  template?: string; // Nombre del template de celda para columna. Sino se indica, se usa el por defecto.
  headerTemplate?: string; // Nombre del template de cabecera para columna. Sino se indica, se usa el por defecto.
  /**
   * Función personalizada para renderizar el valor de la celda.
   * Tiene prioridad sobre template y builtInTemplate.
   * @param row - Fila completa de datos
   * @param key - Clave de la columna
   * @returns El valor a mostrar (string, number, etc.)
   */
  renderFn?: (row: Record<string, unknown>, key?: string) => unknown;
  /**
   * Template genérico incorporado de fecha.
   * Se usa si no hay template ni renderFn.
   */
  builtInTemplate?: 'date';
  /**
   * Configuración para el template genérico de fecha.
   */
  dateConfig?: DateTemplateConfig;
  filterable?: boolean; // Habilita el filtrado por columna. Muestra un input de búsqueda en la cabecera.
  editable?: boolean; // Permite editar celdas con doble click. Solo funciona en celdas sin template personalizado.
  frozen?: 'left' | 'right' | null;
 
  minWidth?: string;
  maxWidth?: string;
  width?: string;
}

export interface Sort {
  key: string | null;
  dir: SortDirection;
}

/**
 * Evento emitido cuando se cambia el valor de una celda editable
 */
export interface CellEditEvent {
  row: Record<string, unknown>;
  key: string;
  oldValue: unknown;
  newValue: unknown;
  rowIndex: number;
}

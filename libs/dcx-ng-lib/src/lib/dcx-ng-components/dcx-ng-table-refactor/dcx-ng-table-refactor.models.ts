export type SortDirection = 'asc' | 'desc' | null;

export enum SortType {
  Ascending = 'ascending',
  Descending = 'descending',
  None = 'none',
}

/**
 * Configuración para el template genérico de fecha
 */
export interface DateTemplateConfig {
  /** Formato de fecha para DatePipe. Ej: 'dd/MM/yyyy', 'dd/MM/yyyy HH:mm', 'dd/MM/yy', 'MM/dd/yyyy hh:mm:ss a' */
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
  /**
   * Nombre del template de celda a usar para esta columna.
   * Si no se indica, se usará el template por defecto.
   */
  template?: string;
  /**
   * Nombre del template de cabecera a usar para esta columna.
   * Si no se indica, se usará el template por defecto.
   */
  headerTemplate?: string;
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
  /**
   * Habilita el filtrado por columna.
   * Muestra un input de búsqueda en la cabecera.
   */
  filterable?: boolean;
  /**
   * Permite editar el valor de la celda con doble click.
   * Solo funciona en celdas sin template personalizado.
   */
  editable?: boolean;
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

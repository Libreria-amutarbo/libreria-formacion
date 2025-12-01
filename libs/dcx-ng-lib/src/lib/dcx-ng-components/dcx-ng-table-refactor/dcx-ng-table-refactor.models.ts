export type SortDirection = 'asc' | 'desc' | null;

export enum SortType {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
  NONE = 'none',
}

/**
 * Tipos de celda soportados de manera declarativa.
 * - 'text': Texto simple (por defecto)
 * - 'number': Números
 * - 'date': Fechas formateadas
 * - 'badge': Badges/Pills con colores
 * - 'actions': Botones de acciones (inline/menu)
 * - 'custom': Template proyectado personalizado
 */
export type CellType =
  | 'text'
  | 'number'
  | 'date'
  | 'badge'
  | 'actions'
  | 'custom';

/**
 * Configuración para celdas de tipo badge/pill
 */
export interface BadgeConfig {
  /** Mapeo de valores a variantes de color */
  variantMap?: Record<string, 'success' | 'warning' | 'danger' | 'info'>;
  /** Mapeo de valores a labels personalizados */
  labelMap?: Record<string, string>;
}

/**
 * Configuración específica para cada tipo de celda.
 * Extensible según el tipo de celda.
 */
export type CellTypeConfig =
  | DateTemplateConfig
  | ActionsConfig
  | BadgeConfig
  | Record<string, unknown>;

/**
 * Configuración de una acción individual en la columna de acciones
 */
export interface ActionItem {
  /** Icono material para la acción */
  icon: string;
  /** Etiqueta descriptiva de la acción */
  label: string;
  /** ID único de la acción para identificarla en eventos */
  id: string;
  /** Función que determina si la acción está deshabilitada para una fila específica */
  disabled?: (row: Record<string, unknown>) => boolean;
  /** Función que determina si la acción está oculta para una fila específica */
  hidden?: (row: Record<string, unknown>) => boolean;
  /** Variante visual de la acción */
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Configuración para el template built-in de acciones
 */
export interface ActionsConfig {
  /** Modo de visualización: inline (iconos visibles) o menu (dropdown) */
  mode: 'inline' | 'menu';
  /** Lista de acciones disponibles */
  items: ActionItem[];
  /** Icono para el botón del menú desplegable (solo aplica en modo menu) */
  menuIcon?: string;
}

/**
 * Evento emitido cuando se ejecuta una acción
 */
export interface ActionEvent {
  /** ID de la acción ejecutada */
  actionId: string;
  /** Fila sobre la que se ejecutó la acción */
  row: Record<string, unknown>;
  /** Índice de la fila en la página actual */
  rowIndex: number;
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
 * @description
 * Define la configuración de una columna de la tabla. Soporta múltiples modos de renderizado:
 * - **Declarativo**: Usando `cellType` y `cellTypeConfig`
 * - **Template proyectado**: Usando `template`
 * - **Función de renderizado**: Usando `renderFn`
 * - **Legacy**: Usando `builtInTemplate` (deprecado, usar `cellType`)
 *
 * @example Uso con cellType (recomendado)
 * ```typescript
 * {
 *   name: 'Fecha',
 *   key: 'createdAt',
 *   cellType: 'date',
 *   cellTypeConfig: { dateFormat: 'dd/MM/yyyy' }
 * }
 * ```
 *
 * @example Uso con template proyectado
 * ```typescript
 * {
 *   name: 'Usuario',
 *   key: 'user',
 *   template: 'userTemplate'
 * }
 * ```
 */
export interface HeaderData {
  /** Nombre visible de la columna */
  name: string;
  /** Clave para acceder al valor en el objeto row */
  key?: string;
  /** Habilita ordenación en esta columna */
  sortable?: boolean;
  /** Tipo de dato para ordenación (se infiere si no se especifica) */
  type?: 'string' | 'number';
  /** Dirección de ordenación por defecto */
  defaultSort?: Exclude<SortDirection, null>;

  // ==================== CELL RENDERING (Prioridad) ====================
  /** Tipo de celda declarativo (recomendado) */
  cellType?: CellType;
  /** Configuración específica del tipo de celda */
  cellTypeConfig?: CellTypeConfig;

  /** Nombre del template de celda proyectado (alta prioridad) */
  template?: string;
  /** Nombre del template de cabecera proyectado */
  headerTemplate?: string;

  /**
   * Función personalizada para renderizar el valor de la celda.
   * Tiene prioridad sobre template.
   */
  renderFn?: (row: Record<string, unknown>, key?: string) => unknown;

  /** Habilita el filtrado por columna */
  filterable?: boolean;
  /** Permite editar celdas con doble click */
  editable?: boolean;
  /** Congela la columna a la izquierda o derecha */
  frozen?: 'left' | 'right' | null;

  // ==================== SIZING ====================
  /** Ancho mínimo de la columna */
  minWidth?: string;
  /** Ancho máximo de la columna */
  maxWidth?: string;
  /** Ancho fijo de la columna */
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

/**
 * Metadatos calculados para cada columna en relación para comportamiento frozen.
 */
export interface FrozenColumnMeta {
  /** Offset desde el borde izquierdo cuando la columna está congelada a la izquierda */
  left: number | null;
  /** Offset desde el borde derecho cuando la columna está congelada a la derecha */
  right: number | null;
  /** Marca la columna que dibuja el separador derecho del grupo frozen-left */
  separatorLeft: boolean;
  /** Marca la columna que dibuja el separador izquierdo del grupo frozen-right */
  separatorRight: boolean;
}

// ==================== TYPES BÁSICOS ====================

/** Tipos de celda soportados */
export type DcxCellType =
  | 'text'
  | 'number'
  | 'date'
  | 'badge'
  | 'actions'
  | 'custom';

/** Variantes visuales */
export type DcxBadgeVariant = 'success' | 'warning' | 'danger' | 'info';
export type DcxActionVariant = 'primary' | 'secondary' | 'danger';

/** Modos de visualización */
export type DcxActionMode = 'inline' | 'menu';
export type DcxDataType = 'string' | 'number';
export type DcxFrozenPosition = 'left' | 'right' | null;
export type DcxSortDirection = 'asc' | 'desc' | null;

/** Tipos de ordenación para accesibilidad ARIA */
export enum DcxSortType {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
  NONE = 'none',
}

// ==================== CONFIGURACIONES ====================

/** Configuración para celdas de tipo badge */
export interface DcxBadgeConfig {
  variantMap?: Record<string, DcxBadgeVariant>;
  labelMap?: Record<string, string>;
}

/** Configuración de una acción individual */
export interface DcxActionItem {
  id: string;
  icon: string;
  label: string;
  disabled?: (row: DcxTableRow) => boolean;
  hidden?: (row: DcxTableRow) => boolean;
  variant?: DcxActionVariant;
}

/** Configuración para el template de acciones */
export interface DcxActionsConfig {
  mode: DcxActionMode;
  items: DcxActionItem[];
  menuIcon?: string;
}

/** Configuración para el template de fecha */
export interface DcxDateTemplateConfig {
  dateFormat?: string;
}

/** Unión de todas las configuraciones de celda */
export type DcxCellTypeConfig =
  | DcxDateTemplateConfig
  | DcxActionsConfig
  | DcxBadgeConfig
  | Record<string, unknown>;

// ==================== MODELO DE DATOS ====================

/** Representa una fila genérica de la tabla */
export interface DcxTableRow {
  id?: number;
  [key: string]: unknown;
}

/**
 * Definición de columna para la tabla.
 *
 * Soporta múltiples modos de renderizado:
 * - Declarativo: `cellType` + `cellTypeConfig`
 * - Template proyectado: `template`
 * - Función: `renderFn`
 */
export interface DcxHeaderData {
  name: string;
  key?: string;

  // Ordenación y filtrado
  sortable?: boolean;
  type?: DcxDataType;
  defaultSort?: Exclude<DcxSortDirection, null>;
  filterable?: boolean;

  // Renderizado (prioridad: renderFn > template > cellType)
  cellType?: DcxCellType;
  cellTypeConfig?: DcxCellTypeConfig;
  template?: string;
  headerTemplate?: string;
  renderFn?: (row: DcxTableRow, key?: string) => unknown;

  // Edición y posicionamiento
  editable?: boolean;
  frozen?: DcxFrozenPosition;

  // Dimensiones
  minWidth?: string;
  maxWidth?: string;
  width?: string;
}

/** Estado de ordenación actual */
export interface DcxSort {
  key: string | null;
  dir: DcxSortDirection;
}

// ==================== EVENTOS ====================

/** Evento de edición de celda */
export interface DcxCellEditEvent {
  row: DcxTableRow;
  key: string;
  oldValue: unknown;
  newValue: unknown;
  rowIndex: number;
}

/** Evento de acción ejecutada */
export interface DcxActionEvent {
  actionId: string;
  row: DcxTableRow;
  rowIndex: number;
}

// ==================== METADATOS ====================

/** Metadatos calculados para columnas frozen */
export interface DcxFrozenColumnMeta {
  left: number | null;
  right: number | null;
  separatorLeft: boolean;
  separatorRight: boolean;
}

import { BadgeSeverityType, DcxHeaderData, DcxTableRow } from '../interfaces';

// ==================== PROYECTOS (mock: dcx-ng-page-full-table-paginator-list) ====================

export interface ProjectRow extends DcxTableRow {
  id: number;
  project: string;
  client: string;
  status: 'active' | 'review' | 'planned' | 'done';
  responsible: string;
  dueDate: Date;
}

const STATUS_LABEL: Record<ProjectRow['status'], string> = {
  active: 'Activo',
  review: 'En revisión',
  planned: 'Planificado',
  done: 'Completado',
};

// Valores alineados con `BadgeSeverityType` (dcx-ng-badge). El mock usa gris
// neutro para "Completado", no rojo — 'secondary' es el equivalente.
const STATUS_VARIANT: Record<ProjectRow['status'], BadgeSeverityType> = {
  active: 'success',
  review: 'warn',
  planned: 'info',
  done: 'secondary',
};

/** Coincide 1:1 con las 4 filas de ejemplo del diseño. */
export const PROJECT_ROWS: ProjectRow[] = [
  {
    id: 1,
    project: 'Cloud Migration',
    client: 'BNP Paribas',
    status: 'active',
    responsible: 'M. García',
    dueDate: new Date('2026-03-31'),
  },
  {
    id: 2,
    project: 'SAP S/4HANA',
    client: 'Airbus',
    status: 'review',
    responsible: 'L. Müller',
    dueDate: new Date('2026-04-15'),
  },
  {
    id: 3,
    project: 'Data Platform',
    client: 'Renault',
    status: 'planned',
    responsible: 'S. Martín',
    dueDate: new Date('2026-06-01'),
  },
  {
    id: 4,
    project: 'DevOps Toolchain',
    client: 'Orange',
    status: 'done',
    responsible: 'A. Dubois',
    dueDate: new Date('2026-02-10'),
  },
];

const CLIENTS = ['BNP Paribas', 'Airbus', 'Renault', 'Orange', 'Iberdrola', 'Santander', 'Engie', 'Michelin'];
const RESPONSIBLES = ['M. García', 'L. Müller', 'S. Martín', 'A. Dubois', 'J. Lopez', 'C. Bernard'];
const PROJECT_NAMES = [
  'Cloud Migration', 'SAP S/4HANA', 'Data Platform', 'DevOps Toolchain',
  'Core Banking Refactor', 'Identity Federation', 'API Gateway', 'Legacy Decommission',
];
const STATUSES: ProjectRow['status'][] = ['active', 'review', 'planned', 'done'];

/** Genera un dataset más grande para probar paginación, filtros y columnas frozen. */
export function generateProjectRows(count: number): ProjectRow[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    project: `${PROJECT_NAMES[index % PROJECT_NAMES.length]} ${Math.floor(index / PROJECT_NAMES.length) + 1}`,
    client: CLIENTS[index % CLIENTS.length],
    status: STATUSES[index % STATUSES.length],
    responsible: RESPONSIBLES[index % RESPONSIBLES.length],
    dueDate: new Date(2026, index % 12, ((index * 7) % 27) + 1),
  }));
}

export const PROJECT_HEADERS: DcxHeaderData[] = [
  {
    key: 'project',
    name: 'Proyecto',
    sortable: true,
    defaultSort: 'asc',
  },
  {
    key: 'client',
    name: 'Cliente',
    sortable: true,
  },
  {
    key: 'status',
    name: 'Estado',
    sortable: true,
    cellType: 'badge',
    cellTypeConfig: {
      variantMap: STATUS_VARIANT,
      labelMap: STATUS_LABEL,
    },
  },
  {
    key: 'responsible',
    name: 'Responsable',
    sortable: true,
    cellType: 'user',
  },
  {
    key: 'dueDate',
    name: 'Fecha fin',
    sortable: true,
    type: 'number',
    cellType: 'date',
    cellTypeConfig: { dateFormat: 'dd MMM yyyy' },
  },
  {
    key: 'actions',
    name: '',
    cellType: 'actions',
    cellTypeConfig: {
      mode: 'inline',
      items: [
        { id: 'view', icon: 'arrow-right', label: 'Ver' },
        { id: 'edit', icon: 'pencil', label: 'Editar' },
      ],
    },
  },
];

/** Misma tabla, con filtro por columna y edición inline activados en `client`/`responsible`. */
export const PROJECT_HEADERS_FILTERABLE_EDITABLE: DcxHeaderData[] = PROJECT_HEADERS.map(header => {
  if (header.key === 'client' || header.key === 'responsible') {
    return { ...header, filterable: true };
  }
  if (header.key === 'project') {
    return { ...header, editable: true };
  }
  return header;
});

/** Misma tabla, con `project` y `actions` fijadas (frozen) a izquierda/derecha. */
export const PROJECT_HEADERS_FROZEN: DcxHeaderData[] = PROJECT_HEADERS.map(header => {
  if (header.key === 'project') return { ...header, frozen: 'left' };
  if (header.key === 'actions') return { ...header, frozen: 'right' };
  return header;
});

/** Acciones en modo menú (dropdown) en vez de iconos inline. */
export const PROJECT_HEADERS_MENU_ACTIONS: DcxHeaderData[] = PROJECT_HEADERS.map(header => {
  if (header.key !== 'actions') return header;
  return {
    ...header,
    cellTypeConfig: {
      mode: 'menu',
      items: [
        { id: 'view', icon: 'arrow-right', label: 'Ver detalle' },
        { id: 'edit', icon: 'pencil', label: 'Editar' },
        { id: 'archive', icon: 'archive', label: 'Archivar' },
        { id: 'delete', icon: 'trash', label: 'Eliminar', variant: 'danger' },
      ],
    },
  };
});

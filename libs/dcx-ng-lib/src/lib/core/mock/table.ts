import { DcxHeaderData, DcxTableRow } from '../interfaces';

// ==================== USUARIOS BÁSICOS ====================

export interface SimpleUserRow extends DcxTableRow {
  name: string;
  status: 'active' | 'pending' | 'inactive';
}

export const SIMPLE_USER_ROWS: SimpleUserRow[] = [
  { id: 1, name: 'Ana García', status: 'active' },
  { id: 2, name: 'Luis Martínez', status: 'active' },
  { id: 3, name: 'Marta López', status: 'pending' },
  { id: 4, name: 'Pedro Sánchez', status: 'inactive' },
  { id: 5, name: 'Lucía Fernández', status: 'active' },
  { id: 6, name: 'Carlos Ruiz', status: 'active' },
];

export const SIMPLE_USER_HEADERS: DcxHeaderData[] = [
  {
    name: 'ID',
    key: 'id',
    type: 'number',
    cellType: 'number',
    sortable: true,
    defaultSort: 'asc',
  },
  {
    name: 'Nombre',
    key: 'name',
    type: 'string',
    cellType: 'text',
    sortable: true,
  },
  {
    name: 'Estado',
    key: 'status',
    cellType: 'text',
    sortable: true,
  },
];

// ==================== PERSONAS ====================

export interface PersonRow extends DcxTableRow {
  name: string;
  age: number;
  country: string;
  createdAt: Date;
}

const BASE_PERSONS: Array<{ name: string; age: number; country: string }> = [
  { name: 'Ana', age: 32, country: 'España' },
  { name: 'Luis', age: 41, country: 'México' },
  { name: 'Marta', age: 27, country: 'Argentina' },
  { name: 'Pedro', age: 50, country: 'Chile' },
  { name: 'Lucía', age: 36, country: 'Perú' },
];

/**
 * Genera un array de personas con IDs y fechas
 * @param count Número de filas a generar
 */
export function generatePersonRows(count: number): PersonRow[] {
  return Array.from({ length: count }, (_, index) => {
    const base = BASE_PERSONS[index % BASE_PERSONS.length];
    return {
      id: index + 1,
      name: `${base.name} ${index + 1}`,
      age: base.age + (index % 5),
      country: base.country,
      createdAt: new Date(2024, 0, 1 + index),
    };
  });
}

/** Headers básicos para tabla de personas */
export const PERSON_HEADERS_BASE: DcxHeaderData[] = [
  {
    name: 'Nombre',
    key: 'name',
    sortable: true,
    type: 'string',
    defaultSort: 'asc',
    filterable: true,
  },
  {
    name: 'Edad',
    key: 'age',
    sortable: true,
    type: 'number',
    filterable: true,
  },
  {
    name: 'País',
    key: 'country',
    sortable: true,
    type: 'string',
    filterable: true,
    editable: true,
  },
  {
    name: 'Creado el',
    key: 'createdAt',
    sortable: true,
  },
];

/** Headers con columna de acciones inline */
export const PERSON_HEADERS_WITH_INLINE_ACTIONS: DcxHeaderData[] = [
  ...PERSON_HEADERS_BASE,
  {
    name: 'Acciones',
    key: 'actions',
    cellType: 'actions',
    cellTypeConfig: {
      mode: 'inline',
      items: [
        {
          id: 'view',
          icon: 'eye-fill',
          label: 'Ver detalle',
          variant: 'primary',
        },
        {
          id: 'edit',
          icon: 'pencil-fill',
          label: 'Editar',
        },
        {
          id: 'delete',
          icon: 'trash-fill',
          label: 'Eliminar',
          variant: 'danger',
          disabled: (row: DcxTableRow) => (row['age'] as number) < 30,
        },
      ],
    },
  },
];

/** Headers con columna de acciones menú */
export const PERSON_HEADERS_WITH_MENU_ACTIONS: DcxHeaderData[] = [
  ...PERSON_HEADERS_BASE,
  {
    name: 'Acciones',
    key: 'actions',
    cellType: 'actions',
    cellTypeConfig: {
      mode: 'menu',
      menuIcon: 'three-dots-vertical',
      items: [
        { id: 'view', icon: 'eye-fill', label: 'Ver detalle' },
        {
          id: 'edit',
          icon: 'pencil-fill',
          label: 'Editar',
          variant: 'primary',
        },
        {
          id: 'delete',
          icon: 'trash-fill',
          label: 'Eliminar',
          variant: 'danger',
          disabled: (row: DcxTableRow) => (row['age'] as number) < 30,
        },
      ],
    },
  },
];

// ==================== TABLA AVANZADA (FULL DEMO) ====================

export interface UserRow extends DcxTableRow {
  name: string;
  age: number;
  country: string;
  createdAt: Date;
}

/**
 * Genera usuarios para demo completa
 * @param count Número de usuarios a generar
 */
export function generateUserRows(count: number): UserRow[] {
  const names = [
    'Ana',
    'Luis',
    'Marta',
    'Pedro',
    'Lucía',
    'Javier',
    'Elena',
    'Carlos',
    'María',
    'Diego',
  ];
  const countries = [
    'España',
    'México',
    'Argentina',
    'Chile',
    'Perú',
    'Colombia',
    'Bolivia',
    'Uruguay',
    'Paraguay',
    'Ecuador',
  ];

  return Array.from({ length: count }, (_, i) => {
    return {
      id: i + 1,
      name: names[i % names.length],
      age: 22 + ((i * 7) % 40),
      country: countries[i % countries.length],
      createdAt: new Date(2025, (i * 2) % 12, 10 + (i % 20), 10, 15),
    };
  });
}

/** Headers completos para tabla avanzada con frozen, filtros, fechas */
export const USER_HEADERS_FULL: DcxHeaderData[] = [
  {
    name: 'ID',
    key: 'id',
    type: 'number',
    cellType: 'number',
    sortable: true,
    defaultSort: 'asc',
    minWidth: '70px',
    frozen: 'left',
  },
  {
    name: 'Nombre',
    key: 'name',
    sortable: true,
    type: 'string',
    filterable: true,
    editable: true,
    minWidth: '140px',
  },
  {
    name: 'Edad',
    key: 'age',
    sortable: true,
    type: 'number',
    filterable: true,
    minWidth: '110px',
  },
  {
    name: 'País',
    key: 'country',
    sortable: true,
    type: 'string',
    filterable: true,
    editable: true,
    minWidth: '160px',
  },
  {
    name: 'Creado el',
    key: 'createdAt',
    sortable: true,
    cellType: 'date',
    cellTypeConfig: { dateFormat: 'dd/MM/yyyy HH:mm' },
    minWidth: '190px',
  },
];

/** Headers con acciones en MENÚ (dropdown) */
export const USER_HEADERS_WITH_MENU: DcxHeaderData[] = [
  ...USER_HEADERS_FULL,
  {
    name: 'Acciones',
    key: 'actions',
    cellType: 'actions',
    frozen: 'right',
    minWidth: '150px',
    cellTypeConfig: {
      mode: 'menu',
      menuIcon: 'three-dots-vertical',
      items: [
        { id: 'view', icon: 'eye-fill', label: 'Ver detalle' },
        {
          id: 'edit',
          icon: 'pencil-fill',
          label: 'Editar',
          variant: 'primary',
        },
        {
          id: 'delete',
          icon: 'trash-fill',
          label: 'Eliminar',
          variant: 'danger',
          disabled: (row: DcxTableRow) => (row['age'] as number) < 30,
        },
      ],
    },
  },
];

/** Headers con acciones INLINE (iconos visibles) */
export const USER_HEADERS_WITH_INLINE: DcxHeaderData[] = [
  ...USER_HEADERS_FULL,
  {
    name: 'Acciones',
    key: 'actions',
    cellType: 'actions',
    frozen: 'right',
    minWidth: '150px',
    cellTypeConfig: {
      mode: 'inline',
      items: [
        {
          id: 'view',
          icon: 'eye-fill',
          label: 'Ver detalle',
          variant: 'primary',
        },
        {
          id: 'edit',
          icon: 'pencil-fill',
          label: 'Editar',
        },
        {
          id: 'delete',
          icon: 'trash-fill',
          label: 'Eliminar',
          variant: 'danger',
          disabled: (row: DcxTableRow) => (row['age'] as number) < 30,
        },
      ],
    },
  },
];

/** Headers completos con frozen para tabla full (sin acciones) */
export const USER_HEADERS_FULL_FROZEN: DcxHeaderData[] = [
  {
    name: 'ID',
    key: 'id',
    type: 'number',
    cellType: 'number',
    sortable: true,
    defaultSort: 'asc',
    frozen: 'left',
    minWidth: '70px',
  },
  {
    name: 'Nombre',
    key: 'name',
    sortable: true,
    filterable: true,
    frozen: 'left',
    minWidth: '200px',
  },
  {
    name: 'País',
    key: 'country',
    sortable: true,
    filterable: true,
    cellType: 'text',
  },
  {
    name: 'Edad',
    key: 'age',
    sortable: true,
    filterable: true,
    type: 'number',
    cellType: 'number',
  },
  {
    name: 'Fecha alta',
    key: 'createdAt',
    cellType: 'date',
    sortable: true,
    cellTypeConfig: {
      dateFormat: 'dd/MM/yyyy HH:mm',
    },
  },
];

/** Headers full frozen + acciones menú */
export const USER_HEADERS_FULL_WITH_MENU: DcxHeaderData[] = [
  ...USER_HEADERS_FULL_FROZEN,
  {
    name: 'Acciones',
    key: 'actions',
    cellType: 'actions',
    frozen: 'right',
    minWidth: '150px',
    cellTypeConfig: {
      mode: 'menu',
      menuIcon: 'three-dots-vertical',
      items: [
        { id: 'view', icon: 'eye-fill', label: 'Ver detalle' },
        {
          id: 'edit',
          icon: 'pencil-fill',
          label: 'Editar',
          variant: 'primary',
        },
        {
          id: 'delete',
          icon: 'trash-fill',
          label: 'Eliminar',
          variant: 'danger',
          disabled: (row: DcxTableRow) => (row['age'] as number) < 30,
        },
      ],
    },
  },
];


// ==================== USUARIOS CON AVATAR Y STATUS ====================

export interface UserWithStatusRow extends DcxTableRow {
  user: string;
  avatar: string;
  createdAt: Date;
  amount: number;
  status: 'active' | 'pending' | 'inactive';
}

/** Datos de usuarios con avatar y status para templates personalizados */
export const USER_WITH_STATUS_ROWS: UserWithStatusRow[] = [
  {
    id: 1,
    user: 'Juan Pérez',
    avatar: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2024-01-15T10:30:00'),
    amount: 1250.5,
    status: 'active',
  },
  {
    id: 2,
    user: 'María García',
    avatar: 'https://i.pravatar.cc/150?img=2',
    createdAt: new Date('2024-02-20T14:15:00'),
    amount: 890.0,
    status: 'pending',
  },
  {
    id: 3,
    user: 'Carlos López',
    avatar: 'https://i.pravatar.cc/150?img=3',
    createdAt: new Date('2024-03-10T09:45:00'),
    amount: 2100.75,
    status: 'active',
  },
  {
    id: 4,
    user: 'Ana Martínez',
    avatar: 'https://i.pravatar.cc/150?img=4',
    createdAt: new Date('2024-01-05T16:20:00'),
    amount: 450.25,
    status: 'inactive',
  },
  {
    id: 5,
    user: 'Pedro Sánchez',
    avatar: 'https://i.pravatar.cc/150?img=5',
    createdAt: new Date('2024-02-28T11:00:00'),
    amount: 3200.0,
    status: 'active',
  },
];

/** Headers para usuarios con templates personalizados (avatar, fecha, precio, estado) */
export const USER_WITH_STATUS_HEADERS: DcxHeaderData[] = [
  {
    name: 'Usuario',
    key: 'user',
    sortable: true,
    template: 'userTemplate',
  },
  {
    name: 'Fecha creación',
    key: 'createdAt',
    sortable: true,
    template: 'dateTemplate',
  },
  {
    name: 'Importe',
    key: 'amount',
    type: 'number',
    template: 'priceTemplate',
    sortable: true,
  },
  {
    name: 'Estado',
    key: 'status',
    template: 'statusTemplate',
    sortable: true,
  },
];

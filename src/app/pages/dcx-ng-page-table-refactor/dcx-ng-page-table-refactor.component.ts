import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  DcxNgTableRefactorComponent,
  DcxNgTableTemplateRefactorDirective,
  type ActionEvent,
  type CellEditEvent,
  type HeaderData,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-table-refactor',
  standalone: true,
  imports: [
    DcxNgTableRefactorComponent,
    DcxNgTableTemplateRefactorDirective,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './dcx-ng-page-table-refactor.component.html',
  styleUrl: './dcx-ng-page-table-refactor.component.scss',
})
export class DcxNgPageTableRefactorComponent {
  // ==================== EJEMPLO 1 ====================
  // Striped + sort básico
  headers1: HeaderData[] = [
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

  rows1 = [
    { id: 3, name: 'Litio', status: 'ok' },
    { id: 1, name: 'Hidrógeno', status: 'ok' },
    { id: 2, name: 'Helio', status: 'pendiente' },
    { id: 5, name: 'Boro', status: 'error' },
    { id: 4, name: 'Berilio', status: 'ok' },
    { id: 6, name: 'Carbono', status: 'ok' },
  ];

  // ==================== EJEMPLO 2 ====================
  // Grid + scroll + sort
  headers2: HeaderData[] = [
    {
      name: 'Producto',
      key: 'product',
      type: 'string',
      cellType: 'text',
      sortable: true,
    },
    {
      name: 'Categoría',
      key: 'category',
      type: 'string',
      cellType: 'text',
      sortable: true,
    },
    {
      name: 'Precio',
      key: 'price',
      type: 'number',
      cellType: 'number',
      sortable: true,
      defaultSort: 'asc',
    },
    {
      name: 'Stock',
      key: 'stock',
      type: 'number',
      cellType: 'number',
      sortable: true,
    },
  ];

  rows2 = [
    { product: 'Teclado', category: 'Periféricos', price: 29.99, stock: 120 },
    { product: 'Ratón', category: 'Periféricos', price: 14.5, stock: 340 },
    { product: 'Monitor 24"', category: 'Pantallas', price: 139.0, stock: 45 },
    { product: 'Monitor 27"', category: 'Pantallas', price: 219.0, stock: 18 },
    { product: 'Portátil 14"', category: 'Equipos', price: 799.0, stock: 12 },
    { product: 'Portátil 16"', category: 'Equipos', price: 1199.0, stock: 5 },
    { product: 'Dock USB-C', category: 'Accesorios', price: 69.9, stock: 64 },
    { product: 'Hub USB', category: 'Accesorios', price: 19.9, stock: 0 },
  ];

  // ==================== EJEMPLO 3 ====================
  // Paginación sencilla
  rowsPerPageEx3 = 5;

  headers3: HeaderData[] = [
    {
      name: 'Item',
      key: 'item',
      cellType: 'text',
      sortable: true,
      defaultSort: 'asc',
    },
    {
      name: 'Categoría',
      key: 'category',
      cellType: 'text',
      sortable: true,
    },
    {
      name: 'Precio',
      key: 'price',
      type: 'number',
      cellType: 'number',
      sortable: true,
    },
    {
      name: 'Stock',
      key: 'stock',
      type: 'number',
      cellType: 'number',
      sortable: true,
    },
  ];

  rows3 = [
    { item: 'Prod 01', category: 'Cat A', price: 10.5, stock: 5 },
    { item: 'Prod 02', category: 'Cat A', price: 11.0, stock: 2 },
    { item: 'Prod 03', category: 'Cat A', price: 12.5, stock: 8 },
    { item: 'Prod 04', category: 'Cat B', price: 9.99, stock: 12 },
    { item: 'Prod 05', category: 'Cat B', price: 15.0, stock: 0 },
    { item: 'Prod 06', category: 'Cat B', price: 18.25, stock: 4 },
    { item: 'Prod 07', category: 'Cat C', price: 22.0, stock: 9 },
    { item: 'Prod 08', category: 'Cat C', price: 7.5, stock: 30 },
    { item: 'Prod 09', category: 'Cat C', price: 19.9, stock: 1 },
    { item: 'Prod 10', category: 'Cat D', price: 3.5, stock: 100 },
    { item: 'Prod 11', category: 'Cat D', price: 42.0, stock: 7 },
    { item: 'Prod 12', category: 'Cat D', price: 5.25, stock: 55 },
    { item: 'Prod 13', category: 'Cat E', price: 13.99, stock: 22 },
    { item: 'Prod 14', category: 'Cat E', price: 27.0, stock: 6 },
    { item: 'Prod 15', category: 'Cat E', price: 33.5, stock: 10 },
  ];

  // ==================== EJEMPLO 4 ====================
  // Templates proyectados (avatar, fecha, precio, estado)
  headers4: HeaderData[] = [
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

  rows4 = [
    {
      user: 'Juan Pérez',
      avatar: 'https://i.pravatar.cc/150?img=1',
      createdAt: new Date('2024-01-15T10:30:00'),
      amount: 1250.5,
      status: 'active',
    },
    {
      user: 'María García',
      avatar: 'https://i.pravatar.cc/150?img=2',
      createdAt: new Date('2024-02-20T14:15:00'),
      amount: 890.0,
      status: 'pending',
    },
    {
      user: 'Carlos López',
      avatar: 'https://i.pravatar.cc/150?img=3',
      createdAt: new Date('2024-03-10T09:45:00'),
      amount: 2100.75,
      status: 'active',
    },
    {
      user: 'Ana Martínez',
      avatar: 'https://i.pravatar.cc/150?img=4',
      createdAt: new Date('2024-01-05T16:20:00'),
      amount: 450.25,
      status: 'inactive',
    },
    {
      user: 'Pedro Sánchez',
      avatar: 'https://i.pravatar.cc/150?img=5',
      createdAt: new Date('2024-02-28T11:00:00'),
      amount: 3200.0,
      status: 'active',
    },
  ];

  // ==================== EJEMPLO 5 ====================
  // cellType: date + renderFn + acciones inline
  headers5: HeaderData[] = [
    {
      name: 'Usuario',
      key: 'user',
      sortable: true,
      renderFn: row => `👤 ${(row['user'] as string).toUpperCase()}`,
      frozen: 'left',
      minWidth: '220px',
    },
    {
      name: 'Fecha corta',
      key: 'createdAt',
      sortable: true,
      frozen: 'left',
      cellType: 'date',
      cellTypeConfig: {
        dateFormat: 'dd/MM/yy HH:mm',
      },
    },
    {
      name: 'Fecha completa',
      key: 'createdAt',
      sortable: false,
      cellType: 'date',
      cellTypeConfig: {
        dateFormat: 'dd/MM/yyyy hh:mm:ss a',
      },
    },
    {
      name: 'Importe EUR',
      key: 'amount',
      sortable: true,
      renderFn: row => {
        const amount = row['amount'] as number;
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
        }).format(amount);
      },
    },
    {
      name: 'Importe USD',
      key: 'amount',
      sortable: false,
      renderFn: row => {
        const amount = row['amount'] as number;
        return `$${(amount * 1.1).toFixed(2)}`;
      },
    },
    {
      name: 'Estado',
      key: 'status',
      sortable: true,
      frozen: 'left',
      template: 'statusTemplate',
    },
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
            label: 'Ver perfil',
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
          },
        ],
      },
    },
  ];

  rows5 = this.rows4;

  // ==================== EJEMPLO 6 ====================
  // Filtros, edición y menú de acciones
  headers6: HeaderData[] = [
    {
      name: 'Producto',
      key: 'product',
      sortable: true,
      filterable: true,
      minWidth: '120px',
    },
    {
      name: 'Categoría',
      key: 'category',
      sortable: true,
      filterable: true,
    },
    {
      name: 'Precio',
      key: 'price',
      type: 'number',
      cellType: 'number',
      sortable: true,
      editable: true,
    },
    {
      name: 'Stock',
      key: 'stock',
      type: 'number',
      cellType: 'number',
      sortable: true,
      editable: true,
    },
    {
      name: 'Acciones',
      key: 'actions',
      cellType: 'actions',
      cellTypeConfig: {
        mode: 'menu',
        menuIcon: 'three-dots-vertical',
        items: [
          { id: 'view', icon: 'eye-fill', label: 'Ver detalles' },
          { id: 'edit', icon: 'pencil-fill', label: 'Editar producto' },
          { id: 'duplicate', icon: 'files', label: 'Duplicar' },
          {
            id: 'delete',
            icon: 'trash-fill',
            label: 'Eliminar',
            variant: 'danger',
            disabled: (row: Record<string, unknown>) =>
              (row['stock'] as number) > 0,
          },
        ],
      },
    },
  ];

  rows6 = [...this.rows2];

  // ==================== EJEMPLO 7 ====================
  // Acciones inline sencillas
  headers7: HeaderData[] = [
    {
      name: 'ID',
      key: 'id',
      type: 'number',
      cellType: 'number',
      sortable: true,
    },
    {
      name: 'Producto',
      key: 'product',
      cellType: 'text',
      sortable: true,
    },
    {
      name: 'Precio',
      key: 'price',
      type: 'number',
      cellType: 'number',
      sortable: true,
    },
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
            label: 'Ver detalles',
            variant: 'primary',
          },
          {
            id: 'edit',
            icon: 'pencil-fill',
            label: 'Editar',
            variant: 'secondary',
          },
          {
            id: 'delete',
            icon: 'trash-fill',
            label: 'Eliminar',
            variant: 'danger',
            disabled: row => (row['stock'] as number) > 0,
          },
        ],
      },
    },
  ];

  rows7 = this.rows2.slice(0, 4).map((row, index) => ({
    id: index + 1,
    ...row,
  }));

  // ==================== EJEMPLO 8 ====================
  // Acciones menú en usuarios
  headers8: HeaderData[] = [
    {
      name: 'Usuario',
      key: 'user',
      sortable: true,
      cellType: 'text',
    },
    {
      name: 'Estado',
      key: 'status',
      template: 'statusTemplate',
      sortable: true,
    },
    {
      name: 'Acciones',
      key: 'actions',
      cellType: 'actions',
      cellTypeConfig: {
        mode: 'menu',
        menuIcon: 'three-dots',
        items: [
          { id: 'view', icon: 'eye-fill', label: 'Ver perfil' },
          { id: 'edit', icon: 'pencil-fill', label: 'Editar usuario' },
          { id: 'message', icon: 'envelope-fill', label: 'Enviar mensaje' },
          {
            id: 'deactivate',
            icon: 'x-circle-fill',
            label: 'Desactivar',
            variant: 'danger',
            hidden: (row: Record<string, unknown>) =>
              row['status'] === 'inactive',
          },
          {
            id: 'activate',
            icon: 'check-circle-fill',
            label: 'Activar',
            hidden: (row: Record<string, unknown>) =>
              row['status'] === 'active',
          },
        ],
      },
    },
  ];

  rows8 = this.rows4;

  // ==================== EJEMPLO 9 (FULL) ====================
  // Full demo: 102 filas, filtros, badges, fechas, editable, acciones, frozen, scroll, paginación...
  rowsPerPageFull = 20;

  headers9: HeaderData[] = [
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
      name: 'Usuario',
      key: 'user',
      sortable: true,
      filterable: true,
      frozen: 'left',
      minWidth: '200px',
      template: 'fullUserTemplate',
    },
    {
      name: 'País',
      key: 'country',
      sortable: true,
      filterable: true,
      cellType: 'text',
    },
    {
      name: 'Estado',
      key: 'status',
      cellType: 'badge',
      cellTypeConfig: {
        variantMap: {
          active: 'success',
          pending: 'warning',
          inactive: 'danger',
        },
        labelMap: {
          active: 'Activo',
          pending: 'Pendiente',
          inactive: 'Inactivo',
        },
      },
      filterable: true,
      frozen: 'left',
      template: 'fullStatusTemplate',
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
    {
      name: 'Pedidos',
      key: 'orders',
      type: 'number',
      cellType: 'number',
      sortable: true,
      editable: true,
    },
    {
      name: 'Importe total',
      key: 'amount',
      type: 'number',
      sortable: true,
      editable: true,
      renderFn: row => {
        const amount = row['amount'] as number;
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
        }).format(amount);
      },
    },
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
          { id: 'view', icon: 'eye-fill', label: 'Ver ficha' },
          { id: 'edit', icon: 'pencil-fill', label: 'Editar usuario' },
          { id: 'message', icon: 'envelope-fill', label: 'Enviar email' },
          {
            id: 'deactivate',
            icon: 'x-circle-fill',
            label: 'Desactivar',
            variant: 'danger',
            hidden: (row: Record<string, unknown>) =>
              row['status'] === 'inactive',
          },
          {
            id: 'activate',
            icon: 'check-circle-fill',
            label: 'Reactivar',
            hidden: (row: Record<string, unknown>) =>
              row['status'] === 'active',
          },
        ],
      },
    },
  ];

  rows9 = Array.from({ length: 102 }).map((_, index) => {
    const id = index + 1;
    const statuses = ['active', 'pending', 'inactive'] as const;
    const countries = ['España', 'Francia', 'Italia', 'Alemania', 'Portugal'];
    const status = statuses[index % statuses.length];
    const country = countries[index % countries.length];
    const baseDate = new Date(
      2024,
      index % 12,
      (index % 28) + 1,
      8 + (index % 10),
      (index * 7) % 60,
    );

    return {
      id,
      user: `Usuario ${id.toString().padStart(3, '0')}`,
      country,
      status,
      createdAt: baseDate,
      orders: (index * 3) % 50,
      amount: 100 + ((index * 1735) % 900000) / 100, // valores algo random
    };
  });

  // ==================== HANDLERS ====================

  onSort(
    e: { key: string | null; dir: 'asc' | 'desc' | null },
    origin: 'ex1' | 'ex2' | 'ex3' | 'ex9',
  ) {
    console.log(`[${origin}] sortChange`, e);
  }

  onRowsPerPageChangeEx3(newSize: number) {
    console.log('Ejemplo 3 - rowsPerPage:', newSize);
    this.rowsPerPageEx3 = newSize;
  }

  onRowsPerPageChangeFull(newSize: number) {
    console.log('Ejemplo 9 - rowsPerPage:', newSize);
    this.rowsPerPageFull = newSize;
  }

  onPageChange(newPage: number) {
    console.log('Page changed:', newPage);
  }

  onCellEdit(event: CellEditEvent): void {
    console.log('Celda editada:', event);
    event.row[event.key] = event.newValue;
  }

  onAction(event: ActionEvent): void {
    console.log('Acción ejecutada:', event);
    const { actionId, row, rowIndex } = event;

    switch (actionId) {
      case 'view':
        alert(
          `Ver detalles de la fila ${rowIndex + 1}:\n${JSON.stringify(
            row,
            null,
            2,
          )}`,
        );
        break;
      case 'edit':
        alert(`Editar fila ${rowIndex + 1}`);
        break;
      case 'delete':
        if (confirm(`¿Eliminar ${row['product'] || row['user']}?`)) {
          console.log('Eliminando...', row);
        }
        break;
      case 'message':
        alert(`Enviar mensaje a: ${row['user']}`);
        break;
      case 'activate':
      case 'deactivate':
        console.log(`${actionId} usuario:`, row['user']);
        break;
    }
  }
}

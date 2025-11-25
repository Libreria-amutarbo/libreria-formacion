import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DcxNgTableRefactorComponent,
  DcxNgTableTemplateRefactorDirective,
  type CellEditEvent,
  type HeaderData,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-table-refactor',
  standalone: true,
  imports: [
    DcxNgTableRefactorComponent,
    DcxNgTableTemplateRefactorDirective,
    CommonModule,
  ],
  templateUrl: './dcx-ng-page-table-refactor.component.html',
  styleUrl: './dcx-ng-page-table-refactor.component.scss',
})
export class DcxNgPageTableRefactorComponent {
  rowsPerPageEx3 = 5;
  rowsPerPageEx6 = 5;
  headers1: HeaderData[] = [
    {
      name: 'ID',
      key: 'id',
      type: 'number',
      sortable: true,
      defaultSort: 'asc',
    },
    { name: 'Nombre', key: 'name', type: 'string', sortable: true },
    { name: 'Estado', key: 'status', sortable: true },
  ];

  rows1 = [
    { id: 3, name: 'Litio', status: 'ok' },
    { id: 1, name: 'Hidrógeno', status: 'ok' },
    { id: 2, name: 'Helio', status: 'pendiente' },
    { id: 5, name: 'Boro', status: 'error' },
    { id: 4, name: 'Berilio', status: 'ok' },
    { id: 6, name: 'Carbono', status: 'ok' },
  ];

  headers2: HeaderData[] = [
    { name: 'Producto', key: 'product', type: 'string', sortable: true },
    { name: 'Categoría', key: 'category', type: 'string', sortable: true },
    {
      name: 'Precio',
      key: 'price',
      type: 'number',
      sortable: true,
      defaultSort: 'asc',
    },
    { name: 'Stock', key: 'stock', type: 'number', sortable: true },
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

  headers3: HeaderData[] = [
    { name: 'Item', key: 'item', sortable: true, defaultSort: 'asc' },
    { name: 'Categoria', key: 'category', sortable: true },
    { name: 'Precio', key: 'price', type: 'number', sortable: true },
    { name: 'Stock', key: 'stock', type: 'number', sortable: true },
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

  onSort(
    e: { key: string | null; dir: 'asc' | 'desc' | null },
    origin: 'ex1' | 'ex2' | 'ex3',
  ) {
    console.log(`[${origin}] sortChange`, e);
  }

  onMenu(row: Record<string, unknown>, index: number) {
    console.log('Abrir menú contextual (demo). Fila:', index, 'Datos:', row);
  }

  onRowsPerPageChange(newSize: number) {
    console.log('Rows per page changed:', newSize);
    this.rowsPerPageEx3 = newSize;
    this.rowsPerPageEx6 = newSize;
  }

  onPageChange(newPage: number) {
    console.log('Page changed:', newPage);
  }

  // Ejemplo 4: Con templates personalizados
  headers4: HeaderData[] = [
    { name: 'Usuario', key: 'user', sortable: true, template: 'userTemplate' },
    {
      name: 'Fecha Creación',
      key: 'createdAt',
      sortable: true,
      template: 'dateTemplate',
    },
    {
      name: 'Precio',
      key: 'amount',
      type: 'number',
      sortable: true,
      template: 'priceTemplate',
    },
    {
      name: 'Estado',
      key: 'status',
      sortable: true,
      template: 'statusTemplate',
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

  // --- Ejemplo 5: Templates genéricos incorporados y funciones de renderizado ---

  headers5: HeaderData[] = [
    {
      name: 'Usuario',
      key: 'user',
      sortable: true,
      // Función de renderizado personalizada
      renderFn: row => `👤 ${(row['user'] as string).toUpperCase()}`,
      frozen: 'left',
      minWidth: '280px',
    },
    {
      name: 'Fecha Corta',
      key: 'createdAt',
      sortable: true,
      // Template genérico de fecha con formato corto
      builtInTemplate: 'date',
      frozen: 'left',
      dateConfig: {
      dateFormat: 'dd/MM/yy HH:mm',
      },
    },
    {
      name: 'Fecha Formato US',
      key: 'createdAt',
      sortable: false,
      // Template genérico de fecha con formato americano
      builtInTemplate: 'date',
      dateConfig: {
        dateFormat: 'dd/MM/yyyy hh:mm:ss a', // Formato americano con AM/PM
      },
    },
    {
      name: 'Importe EUR',
      key: 'amount',
      sortable: true,
      // Función de renderizado para formatear moneda
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
      // Función de renderizado para convertir a USD
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
      // Template personalizado (ver HTML)
      template: 'statusTemplate',
    },
  ];

  rows5 = this.rows4; // Reutilizamos los datos del ejemplo 4

  // --- Ejemplo 6: Filtrado y Edición ---

  headers6: HeaderData[] = [
    {
      name: 'Producto',
      key: 'product',
      sortable: true,
      filterable: true, // Input de filtro en la cabecera
      minWidth: '80px',
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
      sortable: true,
      editable: true, // Doble click para editar
    },
    {
      name: 'Stock',
      key: 'stock',
      type: 'number',
      sortable: true,
      editable: true,
    },
  ];

  rows6 = [...this.rows2]; // Copia de rows2 para no mutar el original

  onCellEdit(event: CellEditEvent): void {
    console.log('Celda editada:', event);
    // Actualizar el valor en la fila
    event.row[event.key] = event.newValue;
  }
}

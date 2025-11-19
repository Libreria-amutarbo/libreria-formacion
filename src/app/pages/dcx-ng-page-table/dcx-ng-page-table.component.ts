import { Component } from '@angular/core';
import { DcxNgTableComponent } from '@dcx-ng-components/dcx-ng-lib';
import type { HeaderData } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-table',
  standalone: true,
  imports: [DcxNgTableComponent],
  templateUrl: './dcx-ng-page-table.component.html',
  styleUrl: './dcx-ng-page-table.component.scss',
})
export class DcxNgPageTableComponent {
  headers1: HeaderData[] = [
    { name: 'ID', key: 'id', type: 'number', sortable: true, defaultSort: 'asc' },
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
    { name: 'Precio', key: 'price', type: 'number', sortable: true, defaultSort: 'asc' },
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

  onSort(e: { key: string | null; dir: 'asc' | 'desc' | null }, origin: 'ex1' | 'ex2') {
    console.log(`[${origin}] sortChange`, e);
  }

  onMenu(row: any, index: number) {
    console.log('Abrir menú contextual (demo). Fila:', index, 'Datos:', row);
  }
}

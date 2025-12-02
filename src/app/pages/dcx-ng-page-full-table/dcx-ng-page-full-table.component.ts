import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  DcxActionEvent,
  DcxCellEditEvent,
  DcxHeaderData,
  SIMPLE_USER_HEADERS,
  SIMPLE_USER_ROWS,
  USER_HEADERS_WITH_INLINE,
  USER_HEADERS_FULL_WITH_MENU,
  USER_WITH_STATUS_HEADERS,
  USER_WITH_STATUS_ROWS,
  generateUserRows,
  DcxSort,
  DcxNgFullTableComponent,
  DcxNgFullTableTemplateDirective,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-table-refactor',
  standalone: true,
  imports: [
    DcxNgFullTableComponent,
    DcxNgFullTableTemplateDirective,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './dcx-ng-page-full-table.component.html',
  styleUrl: './dcx-ng-page-full-table.component.scss',
})
export class DcxNgPageFullTableComponent {
  headers1 = SIMPLE_USER_HEADERS;
  rows1 = SIMPLE_USER_ROWS;

  headers2 = USER_WITH_STATUS_HEADERS;
  rows2 = USER_WITH_STATUS_ROWS;

  headers3: DcxHeaderData[] = [
    {
      name: 'Usuario',
      key: 'name',
      sortable: true,
      renderFn: row => `👤 ${(row['name'] as string).toUpperCase()}`,
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
      name: 'Edad EUR',
      key: 'age',
      sortable: true,
      renderFn: row => {
        const age = row['age'] as number;
        return new Intl.NumberFormat('es-ES', {
          style: 'currency',
          currency: 'EUR',
        }).format(age);
      },
    },
    {
      name: 'Edad USD',
      key: 'age',
      sortable: false,
      renderFn: row => {
        const age = row['age'] as number;
        return `$${(age * 1.1).toFixed(2)}`;
      },
    },
    {
      name: 'País',
      key: 'country',
      sortable: true,
      frozen: 'left',
    },
    ...USER_HEADERS_WITH_INLINE.filter(h => h.key === 'actions'),
  ];

  rows3 = generateUserRows(5);

  rowsPerPageFull = 20;

  headers4 = USER_HEADERS_FULL_WITH_MENU;
  rows4 = generateUserRows(102);

  // ==================== HANDLERS ====================

  onSort(e: DcxSort, origin: string) {
    console.log(`[${origin}] sortChange`, e);
  }

  onRowsPerPageChangeFull(newSize: number) {
    this.rowsPerPageFull = newSize;
  }

  onPageChange(newPage: number) {
    console.log('Page changed:', newPage);
  }

  onCellEdit(event: DcxCellEditEvent): void {
    event.row[event.key] = event.newValue;
  }

  onAction(event: DcxActionEvent): void {
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
        if (confirm(`¿Eliminar ${row['product'] || row['name']}?`)) {
          console.log('Eliminando...', row);
        }
        break;
      case 'message':
        alert(`Enviar mensaje a: ${row['name']}`);
        break;
      case 'activate':
      case 'deactivate':
        console.log(`${actionId} usuario:`, row['name']);
        break;
    }
  }
}

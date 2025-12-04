import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  DcxActionEvent,
  DcxCellEditEvent,
  SIMPLE_USER_HEADERS,
  SIMPLE_USER_ROWS,
  USER_HEADERS_FULL_WITH_MENU,
  USER_WITH_STATUS_HEADERS,
  USER_WITH_STATUS_ROWS,
  generateUserRows,
  DcxSort,
  DcxNgFullTableComponent,
  DcxNgFullTableTemplateDirective,
  SIMPLE_USER_HEADERS_RENDER,
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
  headersSimpleUsers = SIMPLE_USER_HEADERS;
  rowsSimpleUsers = SIMPLE_USER_ROWS;

  headersUsersWithStatus = USER_WITH_STATUS_HEADERS;
  rowsUsersWithStatus = USER_WITH_STATUS_ROWS;

  headersSimpleUsersRender = SIMPLE_USER_HEADERS_RENDER;

  rowsSimpleUsersRender = generateUserRows(5);

  rowsPerPageFull = 20;

  headersUserFull = USER_HEADERS_FULL_WITH_MENU;
  rowsUserFull = generateUserRows(102);

  // ==================== HANDLERS ====================

  getStatusClass(status: string): string {
    const baseClass = 'status-badge';
    const statusClass =
      status === 'active'
        ? 'status-active'
        : status === 'pending'
          ? 'status-pending'
          : 'status-inactive';
    return `${baseClass} ${statusClass}`;
  }

  getStatusLabel(status: string): string {
    return status === 'active'
      ? 'Activo'
      : status === 'pending'
        ? 'Pendiente'
        : 'Inactivo';
  }

  onSort(_e: DcxSort, _origin: string) {
    /* empty */
  }

  onRowsPerPageChangeFull(newSize: number) {
    this.rowsPerPageFull = newSize;
  }

  onPageChange(_newPage: number) {
    /* empty */
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
        break;
      case 'message':
        alert(`Enviar mensaje a: ${row['name']}`);
        break;
      case 'activate':
      case 'deactivate':
        break;
    }
  }
}

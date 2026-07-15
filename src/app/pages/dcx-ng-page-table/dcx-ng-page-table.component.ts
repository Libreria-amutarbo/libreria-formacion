import { Component, signal } from '@angular/core';
import {
  DcxActionEvent,
  DcxCellEditEvent,
  DcxTableRowId,
  DcxNgTableComponent,
  PROJECT_ROWS,
  PROJECT_HEADERS,
  PROJECT_HEADERS_FILTERABLE_EDITABLE,
  PROJECT_HEADERS_FROZEN,
  PROJECT_HEADERS_MENU_ACTIONS,
  generateProjectRows,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-table',
  standalone: true,
  imports: [DcxNgTableComponent],
  templateUrl: './dcx-ng-page-table.component.html',
  styleUrl: './dcx-ng-page-table.component.scss',
})
export class DcxNgPageTableComponent {
  readonly projectRows = PROJECT_ROWS;
  readonly projectHeaders = PROJECT_HEADERS;
  readonly filterableEditableHeaders = PROJECT_HEADERS_FILTERABLE_EDITABLE;
  readonly frozenHeaders = PROJECT_HEADERS_FROZEN;
  readonly menuActionHeaders = PROJECT_HEADERS_MENU_ACTIONS;
  readonly largeDataset = generateProjectRows(117);

  readonly selectedIds = signal<DcxTableRowId[]>([1]);

  onSelectionChange(ids: DcxTableRowId[]): void {
    this.selectedIds.set(ids);
  }

  onRowAction(event: DcxActionEvent): void {
    const { actionId, row } = event;
    switch (actionId) {
      case 'view':
        alert(`Ver detalle de: ${row['project']}`);
        break;
      case 'edit':
        alert(`Editar: ${row['project']}`);
        break;
      case 'archive':
      case 'delete':
        break;
    }
  }

  onCellEdit(event: DcxCellEditEvent): void {
    event.row[event.key] = event.newValue;
  }
}

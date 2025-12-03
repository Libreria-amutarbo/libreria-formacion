import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  afterNextRender,
  computed,
  contentChildren,
  inject,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import {
  DcxActionEvent,
  DcxCellEditEvent,
  DcxHeaderData,
  DcxSort,
  DcxSortType,
  DcxTableRow,
} from '../../core/interfaces';
import { TableComparatorService } from './services/table-comparator.service';
import { TableDataPipelineService } from './services/table-data-pipeline.service';
import { TableState, TableStateConfig } from './state/table-state';
import { DcxNgFullTableTemplateDirective } from './dcx-ng-full-table-template.directive';
import { DcxNgTablePaginatorComponent } from './components/dcx-ng-table-paginator/dcx-ng-table-paginator.component';

@Component({
  selector: 'dcx-ng-full-table',
  imports: [
    DcxNgIconComponent,
    DcxNgTablePaginatorComponent,
    DatePipe,
    NgTemplateOutlet,
  ],
  providers: [TableDataPipelineService, TableComparatorService],
  templateUrl: './dcx-ng-full-table.component.html',
  styleUrl: './dcx-ng-full-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgFullTableComponent {
  private readonly pipelineService = inject(TableDataPipelineService);
  private readonly comparatorService = inject(TableComparatorService);

  readonly headers = input.required<readonly DcxHeaderData[]>();
  readonly rows = input.required<readonly DcxTableRow[]>();
  readonly showGrid = input(false);
  readonly showStripped = input(false);
  readonly scroll = input(false);
  readonly scrollHeight = input('320px');
  readonly paginator = input(false);
  readonly rowsPerPage = input(10);
  readonly rowsPerPageOptions = input<readonly number[]>([5, 10, 20]);
  readonly showRowIndex = input(false);

  // Normalizar rowsPerPage: si no está en las opciones, usar la primera opción
  private readonly normalizedRowsPerPage = computed(() => {
    const current = this.rowsPerPage();
    const options = this.rowsPerPageOptions();
    return options.includes(current) ? current : (options[0] ?? 10);
  });

  readonly rowIndexLabel = input('#');
  readonly frozenLeftSeparator = input(false);
  readonly frozenRightSeparator = input(false);

  // ==================== OUTPUTS ====================
  readonly sortChange = output<DcxSort>();
  readonly rowsPerPageChange = output<number>();
  readonly pageChange = output<number>();
  readonly cellEdit = output<DcxCellEditEvent>();
  readonly rowAction = output<DcxActionEvent>();

  private readonly defaultHeaderTpl =
    viewChild.required<TemplateRef<unknown>>('defaultHeaderTpl');
  private readonly defaultCellTpl =
    viewChild.required<TemplateRef<unknown>>('defaultCellTpl');
  private readonly defaultEmptyTpl =
    viewChild.required<TemplateRef<unknown>>('defaultEmptyTpl');
  private readonly builtInDateTpl =
    viewChild.required<TemplateRef<unknown>>('builtInDateTpl');
  private readonly builtInActionsTpl =
    viewChild.required<TemplateRef<unknown>>('builtInActionsTpl');
  private readonly headerCells =
    viewChildren<ElementRef<HTMLTableCellElement>>('headerCell');

  private readonly externalTemplates = contentChildren(
    DcxNgFullTableTemplateDirective,
  );

  private readonly sortTypeIcon: Record<DcxSortType, string> = {
    [DcxSortType.NONE]: 'arrow-down-up',
    [DcxSortType.ASCENDING]: 'arrow-up',
    [DcxSortType.DESCENDING]: 'arrow-down',
  };

  private readonly _editingCell = signal<{
    rowIndex: number;
    key: string;
  } | null>(null);
  private readonly _openMenuRowIndex = signal<number | null>(null);

  private readonly stateConfig: TableStateConfig = {
    headers: this.headers,
    rows: this.rows,
    rowsPerPage: this.normalizedRowsPerPage,
    paginator: this.paginator,
    frozenLeftSeparator: this.frozenLeftSeparator,
    frozenRightSeparator: this.frozenRightSeparator,
    showRowIndex: this.showRowIndex,
  };

  private readonly state: TableState;

  readonly displayHeaders = computed(() => this.state.displayHeaders());
  readonly paginatedRows = computed(() => this.state.paginatedRows());
  readonly sortedRows = computed(() => this.state.sortedRows());
  readonly frozenMeta = computed(() => this.state.frozenMeta());
  readonly sort = computed(() => this.state.sort());
  readonly pageSize = computed(() => this.state.pageSize());
  readonly pageIndex = computed(() => this.state.pageIndex());
  readonly hasRowIndex = computed(() => this.state.hasRowIndex());
  readonly pageInfo = computed(() => this.state.pageInfo());

  readonly sortLabel = computed(() => {
    const { key, dir } = this.sort();
    if (!key || !dir) return null;
    const header = this.displayHeaders().find(h => h.key === key);
    return header?.name ?? key;
  });

  constructor() {
    this.state = new TableState(
      this.stateConfig,
      this.pipelineService,
      this.comparatorService,
    );

    afterNextRender(() => this.measureColumnWidths());
  }

  private readonly templateCache = computed(() => {
    const cache = new Map<string, TemplateRef<unknown>>();
    this.externalTemplates().forEach(dir => cache.set(dir.type, dir.template));
    return cache;
  });

  private readonly sortIcons = computed(() => {
    const icons = new Map<string, string>();
    this.displayHeaders().forEach(header => {
      const ariaType = this.ariaSort(header);
      icons.set(header.key || '', this.sortTypeIcon[ariaType]);
    });
    return icons;
  });

  // ==================== SORT HANDLERS ====================
  onHeaderClick(header: DcxHeaderData): void {
    const newSort = this.state.toggleSort(header);
    this.sortChange.emit(newSort);
  }

  ariaSort(header: DcxHeaderData): DcxSortType {
    const { key, dir } = this.sort();
    if (key !== header.key || !dir) return DcxSortType.NONE;
    return dir === 'asc' ? DcxSortType.ASCENDING : DcxSortType.DESCENDING;
  }

  getSortIcon(header: DcxHeaderData): string {
    return (
      this.sortIcons().get(header.key || '') ||
      this.sortTypeIcon[DcxSortType.NONE]
    );
  }

  onRowsPerPageChange(size: number | string | null): void {
    if (size === null) return;
    const parsed = Number(size);
    const validSize = Number.isFinite(parsed) && parsed > 0 ? parsed : 10;
    this.rowsPerPageChange.emit(validSize);
    this.state.resetPageIndex();
  }

  goToPage(page: number): void {
    if (page === this.pageIndex()) return;
    this.state.goToPage(page);
    this.pageChange.emit(page);
  }

  onFilterChange(key: string, value: string): void {
    this.state.setFilter(key, value);
  }

  getFilterValue(key: string): string {
    return this.state.getFilterValue(key);
  }

  getFilterPlaceholder(headerName: string): string {
    return `Filtrar ${headerName}`;
  }

  isActionDisabled(action: { disabled?: (row: DcxTableRow) => boolean }, row: DcxTableRow): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  getMenuIcon(menuIcon?: string): string {
    return menuIcon || 'three-dots-vertical';
  }

  onCellDblClick(rowIndex: number, key: string, header: DcxHeaderData): void {
    if (!header.editable || header.template || header.renderFn) return;
    this._editingCell.set({ rowIndex, key });
  }

  isEditing(rowIndex: number, key: string): boolean {
    const editing = this._editingCell();
    return editing?.rowIndex === rowIndex && editing?.key === key;
  }

  onCellEditComplete(
    row: DcxTableRow,
    key: string,
    newValue: string,
    rowIndex: number,
  ): void {
    const oldValue = row[key];
    const header = this.headers().find(h => h.key === key);

    let parsedValue: unknown = newValue;
    if (header?.type === 'number') {
      parsedValue = Number(newValue);
      if (Number.isNaN(parsedValue)) parsedValue = oldValue;
    }

    if (parsedValue !== oldValue) {
      this.cellEdit.emit({
        row,
        key,
        oldValue,
        newValue: parsedValue,
        rowIndex,
      });
    }

    this._editingCell.set(null);
  }

  onCellEditCancel(): void {
    this._editingCell.set(null);
  }

  getHeaderTemplate(header: DcxHeaderData): TemplateRef<unknown> {
    if (header.headerTemplate) {
      const custom = this.templateCache().get(header.headerTemplate);
      if (custom) return custom;
    }
    return this.defaultHeaderTpl();
  }

  getCellTemplate(header: DcxHeaderData): TemplateRef<unknown> {
    if (header.template) {
      const custom = this.templateCache().get(header.template);
      if (custom) {
        return custom;
      }
    }

    switch (header.cellType) {
      case 'date':
        return this.builtInDateTpl();
      case 'actions':
        return this.builtInActionsTpl();
      default:
        return this.defaultCellTpl();
    }
  }

  getEmptyTemplate(): TemplateRef<unknown> {
    return this.templateCache().get('empty') || this.defaultEmptyTpl();
  }

  private measureColumnWidths(): void {
    const cells = this.headerCells();
    if (!cells || cells.length === 0) {
      this.state.setColumnWidths([]);
      return;
    }

    const widths = cells.map(
      cell => cell.nativeElement.getBoundingClientRect().width,
    );
    this.state.setColumnWidths(widths);
  }

  getRowDisplayIndex(rowIndex: number): number {
    return this.pageIndex() * this.pageSize() + rowIndex + 1;
  }

  onActionClick(actionId: string, row: DcxTableRow, rowIndex: number): void {
    this.rowAction.emit({ actionId, row, rowIndex });
    this._openMenuRowIndex.set(null);
  }

  toggleActionsMenu(rowIndex: number, event: Event): void {
    event.stopPropagation();
    const current = this._openMenuRowIndex();
    const newValue = current === rowIndex ? null : rowIndex;
    this._openMenuRowIndex.set(newValue);

    // Gestionar clase has-open-menu en el wrapper
    const wrapper = (event.target as HTMLElement).closest('.table-wrapper');
    if (wrapper) {
      if (newValue !== null) {
        wrapper.classList.add('has-open-menu');
      } else {
        wrapper.classList.remove('has-open-menu');
      }
    }
  }
  isMenuOpen(rowIndex: number): boolean {
    return this._openMenuRowIndex() === rowIndex;
  }

  closeAllMenus(): void {
    this._openMenuRowIndex.set(null);

    // Quitar clase has-open-menu de todos los wrappers
    document
      .querySelectorAll('.table-wrapper.has-open-menu')
      .forEach(wrapper => {
        wrapper.classList.remove('has-open-menu');
      });
  }
}

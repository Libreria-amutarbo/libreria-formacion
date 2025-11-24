import { CommonModule } from '@angular/common';
import {
  Component,
  TemplateRef,
  computed,
  contentChildren,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgSelectComponent } from '../dcx-ng-select/dcx-ng-select.component';
import {
  CellEditEvent,
  HeaderData,
  Sort,
  SortDirection,
  SortType,
} from './dcx-ng-table-refactor.models';
import { DcxNgTableTemplateRefactorDirective } from './dcx-ng-table-template-refactor.directive';

export type TableRow = { id?: number } & Record<string, unknown>;

@Component({
  selector: 'dcx-ng-table-refactor',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent, DcxNgSelectComponent],
  templateUrl: './dcx-ng-table-refactor.component.html',
  styleUrls: ['./dcx-ng-table-refactor.component.scss'],
})
export class DcxNgTableRefactorComponent {
  // ==================== INPUTS ====================
  readonly headers = input.required<readonly HeaderData[]>();
  readonly rows = input.required<readonly TableRow[]>();
  readonly showGrid = input(false);
  readonly showStripped = input(false);
  readonly scroll = input(false);
  readonly scrollHeight = input('320px');
  readonly paginator = input(false);
  readonly rowsPerPage = input(10);
  readonly rowsPerPageOptions = input<readonly number[]>([5, 10, 20]);

  // ==================== OUTPUTS ====================
  readonly sortChange = output<Sort>();
  readonly rowsPerPageChange = output<number>();
  readonly pageChange = output<number>();
  readonly cellEdit = output<CellEditEvent>();

  // ==================== VIEW CHILDREN ====================
  private readonly defaultHeaderTpl =
    viewChild.required<TemplateRef<unknown>>('defaultHeaderTpl');
  private readonly defaultCellTpl =
    viewChild.required<TemplateRef<unknown>>('defaultCellTpl');
  private readonly defaultMenuCellTpl =
    viewChild.required<TemplateRef<unknown>>('defaultMenuCellTpl');
  private readonly defaultEmptyTpl =
    viewChild.required<TemplateRef<unknown>>('defaultEmptyTpl');
  private readonly builtInDateTpl =
    viewChild.required<TemplateRef<unknown>>('builtInDateTpl');

  // ==================== CONTENT CHILDREN ====================
  private readonly externalTemplates = contentChildren(
    DcxNgTableTemplateRefactorDirective,
  );

  // ==================== STATE ====================
  private readonly _manualSort = signal<Sort>({ key: null, dir: null });
  private readonly _columnFilters = signal<Record<string, string>>({});
  private readonly _editingCell = signal<{
    rowIndex: number;
    key: string;
  } | null>(null);
  private readonly _rawPageIndex = signal(0);

  // ==================== COMPUTED - Template Cache ====================
  private readonly templateCache = computed(() => {
    const cache = new Map<string, TemplateRef<unknown>>();
    this.externalTemplates().forEach(dir => cache.set(dir.type, dir.template));
    return cache;
  });

  // ==================== COMPUTED - Sort ====================
  readonly sort = computed(() => {
    const manual = this._manualSort();
    if (manual.key && manual.dir) return manual;

    const defaultHeader = this.headers().find(
      h => h.defaultSort && h.key && h.sortable !== false,
    );

    return defaultHeader?.key && defaultHeader.defaultSort
      ? { key: defaultHeader.key, dir: defaultHeader.defaultSort }
      : { key: null, dir: null };
  });

  // ==================== COMPUTED - Rows Pipeline ====================
  private readonly normalizedRows = computed<readonly TableRow[]>(() =>
    this.rows().map((row, index) =>
      row.id !== undefined ? row : { ...row, id: index },
    ),
  );

  private readonly filteredRows = computed<readonly TableRow[]>(() => {
    const rows = this.normalizedRows();
    const activeFilters = Object.entries(this._columnFilters()).filter(
      ([_, value]) => value.trim() !== '',
    );

    if (activeFilters.length === 0) return rows;

    return rows.filter(row =>
      activeFilters.every(([key, filterValue]) => {
        const cellValue = String(row[key] ?? '').toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      }),
    );
  });

  readonly sortedRows = computed<readonly TableRow[]>(() => {
    const { key, dir } = this.sort();
    if (!key || !dir) return this.filteredRows();

    const rows = [...this.filteredRows()];
    const header = this.headers().find(h => h.key === key);
    const type = header?.type ?? this.inferType(rows, key);

    rows.sort((a, b) => this.compare(a[key], b[key], type));
    return dir === 'desc' ? rows.reverse() : rows;
  });

  // ==================== COMPUTED - Pagination ====================
  readonly pageSize = computed(() => {
    const value = this.rowsPerPage();
    return Number.isFinite(value) && value > 0 ? value : 10;
  });

  readonly totalPages = computed(() => {
    if (!this.paginator()) return 1;
    const total = this.sortedRows().length;
    return Math.max(1, Math.ceil(total / this.pageSize()));
  });

  readonly pageIndex = computed(() => {
    const raw = this._rawPageIndex();
    const maxPage = this.totalPages() - 1;
    return Math.min(raw, Math.max(0, maxPage));
  });

  readonly paginatedRows = computed<readonly TableRow[]>(() => {
    if (!this.paginator()) return this.sortedRows();

    const start = this.pageIndex() * this.pageSize();
    return this.sortedRows().slice(start, start + this.pageSize());
  });

  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i),
  );

  readonly rowsPerPageOptionsFormatted = computed(() =>
    this.rowsPerPageOptions().map(value => ({ value, label: String(value) })),
  );

  readonly pageStart = computed(() => {
    const total = this.sortedRows().length;
    return total ? this.pageIndex() * this.pageSize() + 1 : 0;
  });

  readonly pageEnd = computed(() => {
    const total = this.sortedRows().length;
    return total
      ? Math.min((this.pageIndex() + 1) * this.pageSize(), total)
      : 0;
  });

  // ==================== SORT HANDLERS ====================
  onHeaderClick(header: HeaderData): void {
    if (!header.sortable) return;

    const current = this.sort();
    const nextDirection: SortDirection =
      current.key !== header.key
        ? 'asc'
        : current.dir === 'asc'
          ? 'desc'
          : current.dir === 'desc'
            ? null
            : 'asc';

    const newSort: Sort = { key: header.key ?? null, dir: nextDirection };
    this._manualSort.set(newSort);
    this.sortChange.emit(newSort);
  }

  ariaSort(header: HeaderData): SortType {
    const { key, dir } = this.sort();
    if (key !== header.key || !dir) return SortType.None;
    return dir === 'asc' ? SortType.Ascending : SortType.Descending;
  }

  getSortIcon(header: HeaderData): string {
    const aria = this.ariaSort(header);
    return aria === 'ascending'
      ? 'arrow_upward'
      : aria === 'descending'
        ? 'arrow_downward'
        : 'swap_vert';
  }

  // ==================== PAGINATION HANDLERS ====================
  onRowsPerPageChange(size: number | string | null): void {
    if (size === null) return;
    const parsed = Number(size);
    const validSize = Number.isFinite(parsed) && parsed > 0 ? parsed : 10;
    this.rowsPerPageChange.emit(validSize);
    this._rawPageIndex.set(0);
  }

  goToPage(page: number): void {
    const clamped = Math.max(0, Math.min(page, this.totalPages() - 1));
    if (clamped === this.pageIndex()) return;
    this._rawPageIndex.set(clamped);
    this.pageChange.emit(clamped);
  }

  // ==================== FILTER HANDLERS ====================
  onFilterChange(key: string, value: string): void {
    this._columnFilters.update(filters => ({ ...filters, [key]: value }));
    this._rawPageIndex.set(0);
  }

  getFilterValue(key: string): string {
    return this._columnFilters()[key] || '';
  }

  // ==================== EDIT HANDLERS ====================
  onCellDblClick(rowIndex: number, key: string, header: HeaderData): void {
    if (!header.editable || header.template || header.renderFn) return;
    this._editingCell.set({ rowIndex, key });
  }

  isEditing(rowIndex: number, key: string): boolean {
    const editing = this._editingCell();
    return editing?.rowIndex === rowIndex && editing?.key === key;
  }

  onCellEditComplete(
    row: TableRow,
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

  // ==================== TEMPLATE RESOLUTION ====================
  getHeaderTemplate(header: HeaderData): TemplateRef<unknown> {
    // 1. Template específico proyectado
    if (header.headerTemplate) {
      const custom = this.templateCache().get(header.headerTemplate);
      if (custom) return custom;
    }

    // 2. Template por defecto
    return this.defaultHeaderTpl();
  }

  getCellTemplate(header: HeaderData): TemplateRef<unknown> {
    // 1. Template específico proyectado
    if (header.template) {
      const custom = this.templateCache().get(header.template);
      if (custom) return custom;
    }

    // 2. Template incorporado (built-in)
    if (header.builtInTemplate === 'date') {
      return this.builtInDateTpl();
    }

    // 3. Template por defecto (soporta renderFn)
    return this.defaultCellTpl();
  }

  getMenuTemplate(): TemplateRef<unknown> {
    // Template proyectado personalizado o por defecto
    return this.templateCache().get('menu') || this.defaultMenuCellTpl();
  }

  getEmptyTemplate(): TemplateRef<unknown> {
    return this.templateCache().get('empty') || this.defaultEmptyTpl();
  }

  // ==================== UTILITIES ====================
  private inferType(
    rows: readonly TableRow[],
    key: string,
  ): 'number' | 'string' {
    const first = rows.find(r => r?.[key] != null)?.[key];
    return typeof first === 'number' ? 'number' : 'string';
  }

  private compare(
    left: unknown,
    right: unknown,
    type: 'string' | 'number',
  ): number {
    if (left == null && right == null) return 0;
    if (left == null) return 1;
    if (right == null) return -1;

    if (type === 'number') {
      const [leftNum, rightNum] = [Number(left), Number(right)];
      if (Number.isNaN(leftNum) && Number.isNaN(rightNum)) return 0;
      if (Number.isNaN(leftNum)) return 1;
      if (Number.isNaN(rightNum)) return -1;
      return leftNum - rightNum;
    }

    return String(left).localeCompare(String(right), undefined, {
      sensitivity: 'base',
      numeric: true,
    });
  }
}

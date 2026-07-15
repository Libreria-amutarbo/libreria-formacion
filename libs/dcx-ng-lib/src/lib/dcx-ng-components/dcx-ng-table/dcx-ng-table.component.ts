import { DatePipe, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  afterNextRender,
  computed,
  contentChildren,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import {
  BadgeSeverityType,
  DcxActionEvent,
  DcxButtonVariant,
  DcxCellEditEvent,
  DcxHeaderData,
  DcxSort,
  DcxSortType,
  DcxTableRow,
  DcxTableRowId,
} from '../../core/interfaces';
import { DcxNgBadgeComponent } from '../dcx-ng-badge/dcx-ng-badge.component';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgIconFieldComponent } from '../dcx-ng-iconField/dcx-ng-iconField.component';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';
import { DcxNgPaginatorComponent } from '../dcx-ng-paginator/dcx-ng-paginator.component';
import { DcxNgTableTemplateDirective } from './dcx-ng-table-template.directive';
import {
  buildFrozenMeta,
  filterRowsByColumns,
  getInitials,
  normalizeRows,
  paginateRows,
  reorderFrozenHeaders,
  searchRows,
  sortRows,
} from './table.utils';

/**
 * Tabla de datos con ordenación, búsqueda, filtro por columna, selección,
 * edición inline, columnas fijadas (frozen) y paginación.
 *
 * Todo el estado vive aquí como signals/computed — sin servicios inyectados
 * ni clases de estado externas — para que se pueda leer de arriba a abajo.
 * La paginación delega en `dcx-ng-paginator` en vez de reimplementarla.
 */
@Component({
  selector: 'dcx-ng-table',
  imports: [
    DcxNgIconComponent,
    DcxNgButtonComponent,
    DcxNgInputComponent,
    DcxNgIconFieldComponent,
    DcxNgBadgeComponent,
    DcxNgPaginatorComponent,
    DatePipe,
    NgTemplateOutlet,
  ],
  templateUrl: './dcx-ng-table.component.html',
  styleUrl: './dcx-ng-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgTableComponent {
  // ==================== INPUTS ====================
  readonly headers = input.required<readonly DcxHeaderData[]>();
  readonly rows = input.required<readonly DcxTableRow[]>();

  // Toolbar (título + buscador + `<ng-content select="[table-toolbar-actions]">`)
  readonly tableTitle = input('');
  readonly searchable = input(false);
  readonly searchPlaceholder = input('Buscar...');

  // Selección de filas
  readonly selectable = input(false);
  readonly selectedIds = input<readonly DcxTableRowId[]>([]);

  // Presentación
  readonly showGrid = input(false);
  readonly showStripped = input(false);
  readonly scroll = input(false);
  readonly scrollHeight = input('320px');
  readonly showRowIndex = input(false);
  readonly rowIndexLabel = input('#');
  readonly frozenLeftSeparator = input(false);
  readonly frozenRightSeparator = input(false);

  // Paginación (delegada en dcx-ng-paginator)
  readonly paginator = input(false);
  readonly rowsPerPage = input(10);
  readonly rowsPerPageOptions = input<readonly number[]>([5, 10, 20]);

  // ==================== OUTPUTS ====================
  readonly sortChange = output<DcxSort>();
  readonly searchChange = output<string>();
  readonly selectionChange = output<DcxTableRowId[]>();
  readonly pageChange = output<number>();
  readonly rowsPerPageChange = output<number>();
  readonly cellEdit = output<DcxCellEditEvent>();
  readonly rowAction = output<DcxActionEvent>();

  // ==================== TEMPLATES ====================
  private readonly defaultHeaderTpl =
    viewChild.required<TemplateRef<unknown>>('defaultHeaderTpl');
  private readonly defaultCellTpl =
    viewChild.required<TemplateRef<unknown>>('defaultCellTpl');
  private readonly defaultEmptyTpl =
    viewChild.required<TemplateRef<unknown>>('defaultEmptyTpl');
  private readonly builtInDateTpl =
    viewChild.required<TemplateRef<unknown>>('builtInDateTpl');
  private readonly builtInBadgeTpl =
    viewChild.required<TemplateRef<unknown>>('builtInBadgeTpl');
  private readonly builtInUserTpl =
    viewChild.required<TemplateRef<unknown>>('builtInUserTpl');
  private readonly builtInActionsTpl =
    viewChild.required<TemplateRef<unknown>>('builtInActionsTpl');
  private readonly headerCells =
    viewChildren<ElementRef<HTMLTableCellElement>>('headerCell');
  private readonly tableWrapperRef =
    viewChild<ElementRef<HTMLDivElement>>('tableWrapper');

  private readonly externalTemplates = contentChildren(DcxNgTableTemplateDirective);
  private readonly templateCache = computed(() => {
    const cache = new Map<string, TemplateRef<unknown>>();
    this.externalTemplates().forEach(dir => cache.set(dir.type, dir.template));
    return cache;
  });

  // ==================== ESTADO INTERNO ====================
  private readonly _searchTerm = signal('');
  private readonly _columnFilters = signal<Record<string, string>>({});
  private readonly _manualSort = signal<DcxSort>({ key: null, dir: null });
  private readonly _pageIndex = signal(0);
  private readonly _columnWidths = signal<number[]>([]);
  private readonly _editingCell = signal<{ rowIndex: number; key: string } | null>(
    null,
  );
  private readonly _editingValue = signal('');
  private readonly _openMenuRowIndex = signal<number | null>(null);

  private readonly sortTypeIcon: Record<DcxSortType, string> = {
    [DcxSortType.NONE]: 'arrow-down-up',
    [DcxSortType.ASCENDING]: 'arrow-up',
    [DcxSortType.DESCENDING]: 'arrow-down',
  };

  /** Expone el término de búsqueda actual para el `[value]` del input de la toolbar. */
  readonly searchTerm = computed(() => this._searchTerm());

  // ==================== PIPELINE DE DATOS ====================
  // rows -> normalizadas -> buscadas (toolbar) -> filtradas (por columna) -> ordenadas -> paginadas
  readonly displayHeaders = computed(() => reorderFrozenHeaders(this.headers()));

  private readonly normalizedRows = computed(() => normalizeRows(this.rows()));

  private readonly searchedRows = computed(() =>
    searchRows(this.normalizedRows(), this.displayHeaders(), this._searchTerm()),
  );

  private readonly filteredRows = computed(() =>
    filterRowsByColumns(this.searchedRows(), this._columnFilters()),
  );

  readonly sort = computed<DcxSort>(() => {
    const manual = this._manualSort();
    if (manual.key && manual.dir) return manual;

    const defaultHeader = this.headers().find(
      h => h.defaultSort && h.key && h.sortable !== false,
    );
    return defaultHeader?.key && defaultHeader.defaultSort
      ? { key: defaultHeader.key, dir: defaultHeader.defaultSort }
      : { key: null, dir: null };
  });

  readonly sortedRows = computed(() =>
    sortRows(this.filteredRows(), this.sort(), this.headers()),
  );

  readonly pageSize = computed(() => {
    const value = this.rowsPerPage();
    return Number.isFinite(value) && value > 0 ? value : 10;
  });

  readonly pageIndex = computed(() => this._pageIndex());

  readonly pageRows = computed(() =>
    this.paginator()
      ? paginateRows(this.sortedRows(), this.pageIndex(), this.pageSize())
      : this.sortedRows(),
  );

  readonly frozenMeta = computed(() =>
    buildFrozenMeta(
      this.displayHeaders(),
      this._columnWidths(),
      this.frozenLeftSeparator(),
      this.frozenRightSeparator(),
    ),
  );

  readonly hasToolbar = computed(
    () => !!this.tableTitle().trim() || this.searchable(),
  );

  readonly sortLabel = computed(() => {
    const { key, dir } = this.sort();
    if (!key || !dir) return null;
    const header = this.displayHeaders().find(h => h.key === key);
    return header?.name ?? key;
  });

  /** `dcx-ng-paginator` es 1-indexado; el resto del componente es 0-indexado. */
  readonly paginatorState = computed(() => ({
    totalItems: this.sortedRows().length,
    itemsPerPage: this.pageSize(),
    currentPage: this.pageIndex() + 1,
  }));

  // ==================== SELECCIÓN ====================
  // "Seleccionar todo" actúa sobre las filas de la página visible, no sobre
  // todo el dataset (evita seleccionar en silencio miles de filas no vistas).
  readonly isAllSelected = computed(() => {
    const rows = this.pageRows();
    return (
      rows.length > 0 &&
      rows.every(r => this.selectedIds().includes(r.id as DcxTableRowId))
    );
  });

  readonly isSelectionIndeterminate = computed(() => {
    const rows = this.pageRows();
    const selectedCount = rows.filter(r =>
      this.selectedIds().includes(r.id as DcxTableRowId),
    ).length;
    return selectedCount > 0 && selectedCount < rows.length;
  });

  isRowSelected(row: DcxTableRow): boolean {
    return this.selectedIds().includes(row.id as DcxTableRowId);
  }

  toggleRow(row: DcxTableRow): void {
    const id = row.id as DcxTableRowId;
    const current = this.selectedIds();
    const next = current.includes(id)
      ? current.filter(existing => existing !== id)
      : [...current, id];
    this.selectionChange.emit(next);
  }

  toggleAllOnPage(): void {
    const pageIds = this.pageRows().map(r => r.id as DcxTableRowId);
    const current = this.selectedIds();
    const next = this.isAllSelected()
      ? current.filter(id => !pageIds.includes(id))
      : Array.from(new Set([...current, ...pageIds]));
    this.selectionChange.emit(next);
  }

  /** El "check" de selección se representa con `dcx-ng-button` (isCheckbox). */
  getSelectAllIconName(): string {
    if (this.isAllSelected()) return 'check';
    if (this.isSelectionIndeterminate()) return 'dash';
    return '';
  }

  getSelectAllVariant(): DcxButtonVariant {
    return this.isAllSelected() || this.isSelectionIndeterminate()
      ? 'primary'
      : 'secondary';
  }

  getSelectAllAriaChecked(): boolean | 'mixed' {
    if (this.isAllSelected()) return true;
    if (this.isSelectionIndeterminate()) return 'mixed';
    return false;
  }

  getRowCheckboxIconName(row: DcxTableRow): string {
    return this.isRowSelected(row) ? 'check' : '';
  }

  getRowCheckboxVariant(row: DcxTableRow): DcxButtonVariant {
    return this.isRowSelected(row) ? 'primary' : 'secondary';
  }

  constructor() {
    afterNextRender(() => this.measureColumnWidths());
  }

  // ==================== TOOLBAR ====================
  onSearchInput(value: string | number | null): void {
    const term = String(value ?? '');
    this._searchTerm.set(term);
    this._pageIndex.set(0);
    this.searchChange.emit(term);
  }

  // ==================== ORDENACIÓN ====================
  onHeaderClick(header: DcxHeaderData): void {
    if (!header.sortable) return;

    const current = this.sort();
    const nextDir =
      current.key !== header.key
        ? 'asc'
        : current.dir === 'asc'
          ? 'desc'
          : current.dir === 'desc'
            ? null
            : 'asc';

    const newSort: DcxSort = { key: header.key ?? null, dir: nextDir };
    this._manualSort.set(newSort);
    this.sortChange.emit(newSort);
  }

  ariaSort(header: DcxHeaderData): DcxSortType {
    const { key, dir } = this.sort();
    if (key !== header.key || !dir) return DcxSortType.NONE;
    return dir === 'asc' ? DcxSortType.ASCENDING : DcxSortType.DESCENDING;
  }

  getSortIcon(header: DcxHeaderData): string {
    return this.sortTypeIcon[this.ariaSort(header)];
  }

  // ==================== FILTRO POR COLUMNA ====================
  onFilterChange(key: string, value: string | number | null): void {
    const term = String(value ?? '');
    this._columnFilters.update(filters => ({ ...filters, [key]: term }));
    this._pageIndex.set(0);
  }

  getFilterValue(key: string): string {
    return this._columnFilters()[key] || '';
  }

  getFilterPlaceholder(headerName: string): string {
    return `Filtrar ${headerName}`;
  }

  // ==================== PAGINACIÓN ====================
  onPaginatorPageChange(page1Based: number): void {
    const newIndex = page1Based - 1;
    if (newIndex === this.pageIndex()) return;
    this._pageIndex.set(newIndex);
    this.pageChange.emit(newIndex);
  }

  onRowsPerPageChange(size: number | string | null): void {
    if (size === null) return;
    const parsed = Number(size);
    const validSize = Number.isFinite(parsed) && parsed > 0 ? parsed : 10;
    this.rowsPerPageChange.emit(validSize);
    this._pageIndex.set(0);
  }

  getRowDisplayIndex(rowIndex: number): number {
    return this.pageIndex() * this.pageSize() + rowIndex + 1;
  }

  // ==================== EDICIÓN INLINE ====================
  onCellDblClick(
    row: DcxTableRow,
    rowIndex: number,
    key: string,
    header: DcxHeaderData,
  ): void {
    if (!header.editable || header.template || header.renderFn) return;
    this._editingCell.set({ rowIndex, key });
    this._editingValue.set(String(row[key] ?? ''));
  }

  isEditing(rowIndex: number, key: string): boolean {
    const editing = this._editingCell();
    return editing?.rowIndex === rowIndex && editing?.key === key;
  }

  /** `dcx-ng-input` emite el valor en cada pulsación; se guarda para leerlo al confirmar. */
  onCellEditValueChange(value: string | number | null): void {
    this._editingValue.set(String(value ?? ''));
  }

  onCellEditComplete(row: DcxTableRow, key: string, rowIndex: number): void {
    const oldValue = row[key];
    const header = this.headers().find(h => h.key === key);
    const newValue = this._editingValue();

    let parsedValue: unknown = newValue;
    if (header?.type === 'number') {
      parsedValue = Number(newValue);
      if (Number.isNaN(parsedValue)) parsedValue = oldValue;
    }

    if (parsedValue !== oldValue) {
      this.cellEdit.emit({ row, key, oldValue, newValue: parsedValue, rowIndex });
    }

    this._editingCell.set(null);
  }

  onCellEditCancel(): void {
    this._editingCell.set(null);
  }

  // ==================== ACCIONES DE FILA ====================
  onActionClick(actionId: string, row: DcxTableRow, rowIndex: number): void {
    this.rowAction.emit({ actionId, row, rowIndex });
    this._openMenuRowIndex.set(null);
  }

  isActionDisabled(
    action: { disabled?: (row: DcxTableRow) => boolean },
    row: DcxTableRow,
  ): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  getMenuIcon(menuIcon?: string): string {
    return menuIcon || 'three-dots-vertical';
  }

  toggleActionsMenu(rowIndex: number): void {
    const current = this._openMenuRowIndex();
    const newValue = current === rowIndex ? null : rowIndex;
    this._openMenuRowIndex.set(newValue);
    this.tableWrapperRef()?.nativeElement.classList.toggle(
      'has-open-menu',
      newValue !== null,
    );
  }

  isMenuOpen(rowIndex: number): boolean {
    return this._openMenuRowIndex() === rowIndex;
  }

  closeAllMenus(): void {
    this._openMenuRowIndex.set(null);
    this.tableWrapperRef()?.nativeElement.classList.remove('has-open-menu');
  }

  // ==================== TEMPLATES POR CELDA ====================
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
      if (custom) return custom;
    }

    switch (header.cellType) {
      case 'date':
        return this.builtInDateTpl();
      case 'badge':
        return this.builtInBadgeTpl();
      case 'user':
        return this.builtInUserTpl();
      case 'actions':
        return this.builtInActionsTpl();
      default:
        return this.defaultCellTpl();
    }
  }

  getEmptyTemplate(): TemplateRef<unknown> {
    return this.templateCache().get('empty') || this.defaultEmptyTpl();
  }

  // ==================== CELDA BADGE / USUARIO ====================
  getBadgeSeverity(value: unknown, header: DcxHeaderData): BadgeSeverityType {
    const config = header.cellTypeConfig as
      | { variantMap?: Record<string, BadgeSeverityType> }
      | undefined;
    return config?.variantMap?.[String(value)] ?? 'info';
  }

  getBadgeLabel(value: unknown, header: DcxHeaderData): string {
    const config = header.cellTypeConfig as
      | { labelMap?: Record<string, string> }
      | undefined;
    return config?.labelMap?.[String(value)] ?? String(value ?? '');
  }

  getUserInitials(value: unknown): string {
    return getInitials(String(value ?? ''));
  }

  getUserAvatarUrl(row: DcxTableRow, header: DcxHeaderData): string | null {
    const config = header.cellTypeConfig as { avatarUrlKey?: string } | undefined;
    if (!config?.avatarUrlKey) return null;
    const url = row[config.avatarUrlKey];
    return typeof url === 'string' && url ? url : null;
  }

  getUserSubtitle(row: DcxTableRow, header: DcxHeaderData): string | null {
    const config = header.cellTypeConfig as { subtitleKey?: string } | undefined;
    if (!config?.subtitleKey) return null;
    const value = row[config.subtitleKey];
    return value != null ? String(value) : null;
  }

  private measureColumnWidths(): void {
    const cells = this.headerCells();
    if (!cells || cells.length === 0) {
      this._columnWidths.set([]);
      return;
    }
    this._columnWidths.set(
      cells.map(cell => cell.nativeElement.getBoundingClientRect().width),
    );
  }
}

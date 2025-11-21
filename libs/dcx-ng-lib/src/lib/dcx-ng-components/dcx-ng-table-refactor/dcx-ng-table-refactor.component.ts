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

// Filas tipadas sin `any`
export type TableRow = { id?: number } & Record<string, unknown>;

@Component({
  selector: 'dcx-ng-table-refactor',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent, DcxNgSelectComponent],
  templateUrl: './dcx-ng-table-refactor.component.html',
  styleUrls: ['./dcx-ng-table-refactor.component.scss'],
})
export class DcxNgTableRefactorComponent {
  // Inputs
  readonly headers = input.required<readonly HeaderData[]>();
  readonly rows = input.required<readonly TableRow[]>();

  readonly showGrid = input(false);
  readonly showStripped = input(false);
  readonly scroll = input(false);
  readonly scrollHeight = input('320px');
  readonly paginator = input(false);
  readonly rowsPerPage = input(10);
  readonly rowsPerPageOptions = input<readonly number[]>([5, 10, 20]);

  /**
   * Compatibilidad hacia atrás:
   * Si se pasan estos templates, tienen prioridad sobre el sistema
   * de templates por clave.
   */
  readonly headerTemplate = input<TemplateRef<unknown> | null>(null);
  readonly cellTemplate = input<TemplateRef<unknown> | null>(null);
  readonly menuCellTemplate = input<TemplateRef<unknown> | null>(null);

  // --- Output como signal ---

  readonly sortChange = output<Sort>();
  readonly rowsPerPageChange = output<number>();
  readonly pageChange = output<number>();
  readonly cellEdit = output<CellEditEvent>();

  // --- Templates internos ---

  private readonly defaultHeaderTpl =
    viewChild.required<TemplateRef<unknown>>('defaultHeaderTpl');
  private readonly defaultCellTpl =
    viewChild.required<TemplateRef<unknown>>('defaultCellTpl');
  private readonly defaultMenuCellTpl =
    viewChild.required<TemplateRef<unknown>>('defaultMenuCellTpl');
  private readonly defaultEmptyTpl =
    viewChild.required<TemplateRef<unknown>>('defaultEmptyTpl');

  // Template genérico incorporado
  private readonly builtInDateTpl =
    viewChild.required<TemplateRef<unknown>>('builtInDateTpl');

  // --- Templates externos (ContentChildren) ---

  private readonly externalTemplates = contentChildren(
    DcxNgTableTemplateRefactorDirective,
  );

  // --- Estado interno ---

  private readonly _manualSort = signal<Sort>({ key: null, dir: null });
  private readonly _columnFilters = signal<Record<string, string>>({});
  private readonly _editingCell = signal<{
    rowIndex: number;
    key: string;
  } | null>(null);

  // Sort con aplicación automática del defaultSort
  readonly sort = computed(() => {
    const manual = this._manualSort();

    // Si hay sort manual, usarlo
    if (manual.key && manual.dir) return manual;

    // Si no, buscar defaultSort en headers
    const headers = this.headers();
    const defaultHeader = headers.find(
      h => h.defaultSort && h.key && h.sortable !== false,
    );

    if (defaultHeader && defaultHeader.key && defaultHeader.defaultSort) {
      return {
        key: defaultHeader.key,
        dir: defaultHeader.defaultSort,
      };
    }

    return { key: null, dir: null };
  });

  // Cache de templates: derivado de externalTemplates
  private readonly templateCache = computed(() => {
    const cache = new Map<string, TemplateRef<unknown>>();
    const templates = this.externalTemplates();

    for (const dir of templates) {
      cache.set(dir.type, dir.template);
    }

    return cache;
  });

  // pageIndex con validación automática
  private readonly _rawPageIndex = signal(0);

  // pageIndex validado que se auto-ajusta cuando totalPages cambia
  readonly pageIndex = computed(() => {
    const raw = this._rawPageIndex();
    const maxPage = this.totalPages() - 1;
    return Math.min(raw, Math.max(0, maxPage));
  });

  // pageSize derivado del input rowsPerPage
  readonly pageSize = computed(() => {
    const value = this.rowsPerPage();
    return Number.isFinite(value) && value > 0 ? value : 10;
  });

  // Opciones formateadas para dcx-ng-select
  readonly rowsPerPageOptionsFormatted = computed(() => {
    return this.rowsPerPageOptions().map(value => ({
      value,
      label: String(value),
    }));
  });

  // Normalizamos filas con `id` sin mutar el input
  private readonly normalizedRows = computed<readonly TableRow[]>(() => {
    const rows = this.rows() ?? [];
    return rows.map((row, index) => {
      if (row.id === undefined || row.id === null) {
        return { ...row, id: index };
      }
      return row;
    });
  });

  // Filas filtradas por columna
  private readonly filteredRows = computed<readonly TableRow[]>(() => {
    const rows = this.normalizedRows();
    const filters = this._columnFilters();

    // Si no hay filtros, devolver todas las filas
    const activeFilters = Object.entries(filters).filter(
      ([_, value]) => value.trim() !== '',
    );
    if (activeFilters.length === 0) return rows;

    // Filtrar filas que cumplan todos los filtros activos
    return rows.filter(row => {
      return activeFilters.every(([key, filterValue]) => {
        const cellValue = String(row[key] ?? '').toLowerCase();
        const filter = filterValue.toLowerCase();
        return cellValue.includes(filter);
      });
    });
  });

  // Filas ordenadas: estado derivado 100% reactivo
  readonly sortedRows = computed<readonly TableRow[]>(() => {
    const rows = [...this.filteredRows()]; // Usar filas filtradas en vez de normalizadas
    const { key, dir } = this.sort();

    if (!key || !dir) return rows;

    const header = this.headers().find(h => h.key === key);
    const type = header?.type ?? this.inferType(rows, key);

    rows.sort((a, b) => this.compare(a[key], b[key], type));
    if (dir === 'desc') {
      rows.reverse();
    }

    return rows;
  });

  readonly paginatedRows = computed<readonly TableRow[]>(() => {
    if (!this.paginator()) return this.sortedRows();

    const rows = this.sortedRows();
    const size = this.pageSize();
    const start = this.pageIndex() * size;
    return rows.slice(start, start + size);
  });

  readonly totalPages = computed(() => {
    if (!this.paginator()) return 1;
    const size = this.pageSize();
    const total = this.sortedRows().length;
    return Math.max(1, Math.ceil(total / size));
  });

  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index),
  );

  // --- Ordenación ---

  onHeaderClick(header: HeaderData): void {
    if (!header.sortable) return;

    const current = this.sort();
    let nextDirection: SortDirection;

    if (current.key !== header.key) {
      nextDirection = 'asc';
    } else {
      switch (current.dir) {
        case 'asc':
          nextDirection = 'desc';
          break;
        case 'desc':
          nextDirection = null;
          break;
        default:
          nextDirection = 'asc';
      }
    }

    const newSort: Sort = { key: header.key ?? null, dir: nextDirection };
    this._manualSort.set(newSort);
    this.sortChange.emit(newSort);
  }

  ariaSort(header: HeaderData): SortType {
    const currentSort = this.sort();
    if (currentSort.key !== header.key || !currentSort.dir) {
      return SortType.None;
    }
    return currentSort.dir === 'asc' ? SortType.Ascending : SortType.Descending;
  }

  getSortIcon(header: HeaderData): string {
    switch (this.ariaSort(header)) {
      case 'ascending':
        return 'arrow_upward';
      case 'descending':
        return 'arrow_downward';
      default:
        return 'swap_vert';
    }
  }

  // --- Paginación -- TO_DO SFP: Extraer a un componente aparte ---

  onRowsPerPageChange(size: number | string | null): void {
    if (size === null) return;
    const parsed = Number(size);
    const validSize = Number.isFinite(parsed) && parsed > 0 ? parsed : 10;
    this.rowsPerPageChange.emit(validSize);
    this._rawPageIndex.set(0);
  }

  goToPage(page: number): void {
    const clamped = Math.min(Math.max(0, page), this.totalPages() - 1);
    if (clamped === this.pageIndex()) return;
    this._rawPageIndex.set(clamped);
    this.pageChange.emit(clamped);
  }

  // --- Resolución de templates ---

  getHeaderTemplate(header: HeaderData): TemplateRef<unknown> {
    const explicitHeaderTemplate = this.headerTemplate();
    if (explicitHeaderTemplate) {
      return explicitHeaderTemplate;
    }

    const cache = this.templateCache();

    if (header.headerTemplate) {
      const external = cache.get(header.headerTemplate);
      if (external) return external;
    }

    const genericHeader = cache.get('header-default');
    if (genericHeader) return genericHeader;

    return this.defaultHeaderTpl();
  }

  getCellTemplate(header: HeaderData): TemplateRef<unknown> {
    const explicitCellTemplate = this.cellTemplate();
    if (explicitCellTemplate) {
      return explicitCellTemplate;
    }

    const cache = this.templateCache();

    // 1. Template externo personalizado (máxima prioridad para templates personalizados)
    if (header.template) {
      const external = cache.get(header.template);
      if (external) return external;
    }

    // 2. Template genérico incorporado de fecha
    if (header.builtInTemplate === 'date') {
      return this.builtInDateTpl();
    }

    // 3. Template genérico por defecto
    const genericCell = cache.get('cell-default');
    if (genericCell) return genericCell;

    // 4. Template por defecto (soporta renderFn)
    return this.defaultCellTpl();
  }

  getMenuTemplate(): TemplateRef<unknown> {
    const explicitMenuTemplate = this.menuCellTemplate();
    if (explicitMenuTemplate) {
      return explicitMenuTemplate;
    }

    const cache = this.templateCache();

    const external = cache.get('menu');
    if (external) return external;

    return this.defaultMenuCellTpl();
  }

  getEmptyTemplate(): TemplateRef<unknown> {
    const cache = this.templateCache();

    const external = cache.get('empty');
    if (external) return external;

    return this.defaultEmptyTpl();
  }

  // --- Utilidades internas ---

  private inferType(
    rows: readonly TableRow[],
    key: string,
  ): 'number' | 'string' {
    const first = rows.find(r => r?.[key] !== null && r?.[key] !== undefined)?.[
      key
    ];
    return typeof first === 'number' ? 'number' : 'string';
  }

  private compare(
    leftValue: unknown,
    rightValue: unknown,
    valueType: 'string' | 'number',
  ): number {
    const leftIsNull = leftValue === null || leftValue === undefined;
    const rightIsNull = rightValue === null || rightValue === undefined;

    if (leftIsNull && rightIsNull) return 0;
    if (leftIsNull) return 1;
    if (rightIsNull) return -1;

    if (valueType === 'number') {
      const leftNumber = Number(leftValue);
      const rightNumber = Number(rightValue);
      const leftIsNaN = Number.isNaN(leftNumber);
      const rightIsNaN = Number.isNaN(rightNumber);

      if (leftIsNaN && rightIsNaN) return 0;
      if (leftIsNaN) return 1;
      if (rightIsNaN) return -1;

      if (leftNumber === rightNumber) return 0;
      return leftNumber < rightNumber ? -1 : 1;
    }

    const leftText = String(leftValue);
    const rightText = String(rightValue);

    return leftText.localeCompare(rightText, undefined, {
      sensitivity: 'base',
      numeric: true,
    });
  }

  pageStart(): number {
    const total = this.sortedRows().length;
    if (!total) return 0;
    return this.pageIndex() * this.pageSize() + 1;
  }

  pageEnd(): number {
    const total = this.sortedRows().length;
    if (!total) return 0;
    const size = this.pageSize();
    return Math.min((this.pageIndex() + 1) * size, total);
  }

  // --- Filtrado por columna ---

  onFilterChange(key: string, value: string): void {
    this._columnFilters.update(filters => ({ ...filters, [key]: value }));
    // Resetear a primera página cuando se filtra
    this._rawPageIndex.set(0);
  }

  getFilterValue(key: string): string {
    return this._columnFilters()[key] || '';
  }

  // --- Edición de celdas ---

  onCellDblClick(rowIndex: number, key: string, header: HeaderData): void {
    // Solo permitir edición si está marcada como editable y no tiene template/renderFn
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

    // Convertir al tipo correcto según el header
    const header = this.headers().find(h => h.key === key);
    let parsedValue: unknown = newValue;

    if (header?.type === 'number') {
      parsedValue = Number(newValue);
      if (Number.isNaN(parsedValue)) {
        parsedValue = oldValue; // Si no es válido, mantener el anterior
      }
    }

    // Solo emitir si el valor cambió
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
}

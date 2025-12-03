import { Signal, WritableSignal, computed, signal } from '@angular/core';
import {
  DcxFrozenColumnMeta,
  DcxHeaderData,
  DcxSort,
  DcxSortDirection,
  DcxTableRow,
} from '../../../core/interfaces';
import { TableDataPipelineService } from '../services/table-data-pipeline.service';
import { TableComparatorService } from '../services/table-comparator.service';
export interface TableStateConfig {
  headers: Signal<readonly DcxHeaderData[]>;
  rows: Signal<readonly DcxTableRow[]>;
  rowsPerPage: Signal<number>;
  paginator: Signal<boolean>;
  frozenLeftSeparator: Signal<boolean>;
  frozenRightSeparator: Signal<boolean>;
  showRowIndex: Signal<boolean>;
}

export class TableState {
  private readonly _manualSort: WritableSignal<DcxSort>;
  private readonly _columnFilters: WritableSignal<Record<string, string>>;
  private readonly _rawPageIndex: WritableSignal<number>;
  private readonly _columnWidths: WritableSignal<number[]>;

  readonly normalizedRows: Signal<readonly DcxTableRow[]>;
  readonly filteredRows: Signal<readonly DcxTableRow[]>;
  readonly sortedRows: Signal<readonly DcxTableRow[]>;
  readonly paginatedRows: Signal<readonly DcxTableRow[]>;
  readonly displayHeaders: Signal<readonly DcxHeaderData[]>;
  readonly frozenMeta: Signal<readonly DcxFrozenColumnMeta[]>;
  readonly sort: Signal<DcxSort>;
  readonly pageSize: Signal<number>;
  readonly pageIndex: Signal<number>;
  readonly hasRowIndex: Signal<boolean>;
  readonly pageInfo: Signal<{ index: number; size: number; total: number }>;
  constructor(
    private readonly config: TableStateConfig,
    private readonly pipelineService: TableDataPipelineService,
    private readonly comparatorService: TableComparatorService,
  ) {
    this._manualSort = signal<DcxSort>({ key: null, dir: null });
    this._columnFilters = signal<Record<string, string>>({});
    this._rawPageIndex = signal(0);
    this._columnWidths = signal<number[]>([]);

    this.displayHeaders = computed(() => {
      const headers = this.config.headers();
      const left = headers.filter(h => h.frozen === 'left');
      const right = headers.filter(h => h.frozen === 'right');
      const middle = headers.filter(h => !h.frozen);
      return [...left, ...middle, ...right];
    });

    this.sort = computed(() => {
      const manual = this._manualSort();
      if (manual.key && manual.dir) return manual;

      const defaultHeader = this.config
        .headers()
        .find(h => h.defaultSort && h.key && h.sortable !== false);
      return defaultHeader?.key && defaultHeader.defaultSort
        ? { key: defaultHeader.key, dir: defaultHeader.defaultSort }
        : { key: null, dir: null };
    });

    this.normalizedRows = computed(() =>
      this.pipelineService.normalize(this.config.rows()),
    );

    this.filteredRows = computed(() =>
      this.pipelineService.filter(this.normalizedRows(), this._columnFilters()),
    );

    this.sortedRows = computed(() =>
      this.pipelineService.sort(
        this.filteredRows(),
        this.sort(),
        this.config.headers(),
        (left, right, type) =>
          this.comparatorService.compare(left, right, type),
      ),
    );

    this.pageSize = computed(() => {
      const value = this.config.rowsPerPage();
      return Number.isFinite(value) && value > 0 ? value : 10;
    });

    this.pageIndex = computed(() => this._rawPageIndex());

    this.paginatedRows = computed(() => {
      if (!this.config.paginator()) return this.sortedRows();
      return this.pipelineService.paginate(
        this.sortedRows(),
        this.pageIndex(),
        this.pageSize(),
      );
    });

    this.frozenMeta = computed(() => {
      const headers = this.displayHeaders();
      const widths = this._columnWidths();

      const meta: DcxFrozenColumnMeta[] = headers.map(() => ({
        left: null,
        right: null,
        separatorLeft: false,
        separatorRight: false,
      }));

      let leftOffset = 0;
      const leftIndices: number[] = [];

      headers.forEach((h, idx) => {
        if (h.frozen === 'left') {
          meta[idx].left = leftOffset;
          leftOffset += widths[idx] ?? 0;
          leftIndices.push(idx);
        }
      });

      let rightOffset = 0;
      const rightIndices: number[] = [];

      for (let i = headers.length - 1; i >= 0; i--) {
        const h = headers[i];
        if (h.frozen === 'right') {
          meta[i].right = rightOffset;
          rightOffset += widths[i] ?? 0;
          rightIndices.push(i);
        }
      }

      if (this.config.frozenLeftSeparator() && leftIndices.length > 0) {
        const lastLeftIdx = leftIndices[leftIndices.length - 1];
        meta[lastLeftIdx].separatorLeft = true;
      }

      if (this.config.frozenRightSeparator() && rightIndices.length > 0) {
        const leftMostRightIdx = rightIndices[rightIndices.length - 1];
        meta[leftMostRightIdx].separatorRight = true;
      }

      return meta;
    });

    this.hasRowIndex = computed(() => this.config.showRowIndex());

    this.pageInfo = computed(() => ({
      index: this.pageIndex(),
      size: this.pageSize(),
      total: this.sortedRows().length,
    }));
  }

  setSort(sort: DcxSort): void {
    this._manualSort.set(sort);
  }

  toggleSort(header: DcxHeaderData): DcxSort {
    if (!header.sortable) return this.sort();

    const current = this.sort();
    const nextDirection: DcxSortDirection =
      current.key !== header.key
        ? 'asc'
        : current.dir === 'asc'
          ? 'desc'
          : current.dir === 'desc'
            ? null
            : 'asc';

    const newSort: DcxSort = { key: header.key ?? null, dir: nextDirection };
    this._manualSort.set(newSort);
    return newSort;
  }

  setFilter(key: string, value: string): void {
    this._columnFilters.update(filters => ({ ...filters, [key]: value }));
    this._rawPageIndex.set(0);
  }

  getFilterValue(key: string): string {
    return this._columnFilters()[key] || '';
  }

  goToPage(page: number): void {
    this._rawPageIndex.set(page);
  }

  resetPageIndex(): void {
    this._rawPageIndex.set(0);
  }

  setColumnWidths(widths: number[]): void {
    this._columnWidths.set(widths);
  }
}

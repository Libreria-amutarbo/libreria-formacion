import { Injectable } from '@angular/core';
import { HeaderData, Sort } from '../dcx-ng-table-refactor.models';
import type { TableRow } from '../dcx-ng-table-refactor.component';

@Injectable()
export class TableDataPipelineService {
  normalize(rows: readonly TableRow[]): readonly TableRow[] {
    return rows.map((row, index) =>
      row.id !== undefined ? row : { ...row, id: index }
    );
  }

  filter(rows: readonly TableRow[], filters: Record<string, string>): readonly TableRow[] {
    const activeFilters = Object.entries(filters).filter(([_, value]) => value.trim() !== '');
    if (activeFilters.length === 0) return rows;

    return rows.filter(row =>
      activeFilters.every(([key, filterValue]) => {
        const cellValue = String(row[key] ?? '').toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      })
    );
  }

  sort(
    rows: readonly TableRow[],
    sort: Sort,
    headers: readonly HeaderData[],
    compareFn: (left: unknown, right: unknown, type: 'string' | 'number') => number
  ): readonly TableRow[] {
    const { key, dir } = sort;
    if (!key || !dir) return rows;

    const sortedRows = [...rows];
    const header = headers.find(h => h.key === key);
    const type = header?.type ?? this.inferType(rows, key);

    sortedRows.sort((a, b) => compareFn(a[key], b[key], type));
    return dir === 'desc' ? sortedRows.reverse() : sortedRows;
  }

  paginate(rows: readonly TableRow[], pageIndex: number, pageSize: number): readonly TableRow[] {
    const start = pageIndex * pageSize;
    return rows.slice(start, start + pageSize);
  }

  private inferType(rows: readonly TableRow[], key: string): 'number' | 'string' {
    const first = rows.find(r => r?.[key] != null)?.[key];
    return typeof first === 'number' ? 'number' : 'string';
  }
}

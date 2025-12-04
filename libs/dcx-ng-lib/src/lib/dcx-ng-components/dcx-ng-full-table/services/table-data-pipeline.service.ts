import { Injectable } from '@angular/core';
import {
  DcxDataType,
  DcxHeaderData,
  DcxSort,
  DcxTableRow,
} from '../../../core/interfaces';

@Injectable()
export class TableDataPipelineService {
  normalize(rows: readonly DcxTableRow[]): readonly DcxTableRow[] {
    return rows.map((row, index) =>
      row.id !== undefined ? row : { ...row, id: index },
    );
  }

  filter(
    rows: readonly DcxTableRow[],
    filters: Record<string, string>,
  ): readonly DcxTableRow[] {
    const activeFilters = Object.entries(filters).filter(
      ([_, value]) => value.trim() !== '',
    );
    if (activeFilters.length === 0) return rows;

    return rows.filter(row =>
      activeFilters.every(([key, filterValue]) => {
        const cellValue = String(row[key] ?? '').toLowerCase();
        return cellValue.includes(filterValue.toLowerCase());
      }),
    );
  }

  sort(
    rows: readonly DcxTableRow[],
    sort: DcxSort,
    headers: readonly DcxHeaderData[],
    compareFn: (left: unknown, right: unknown, type: DcxDataType) => number,
  ): readonly DcxTableRow[] {
    const { key, dir } = sort;
    if (!key || !dir) return rows;

    const sortedRows = [...rows];
    const header = headers.find(h => h.key === key);
    const type = header?.type ?? this.inferType(rows, key);

    sortedRows.sort((a, b) => compareFn(a[key], b[key], type));
    return dir === 'desc' ? sortedRows.reverse() : sortedRows;
  }

  paginate(
    rows: readonly DcxTableRow[],
    pageIndex: number,
    pageSize: number,
  ): readonly DcxTableRow[] {
    const start = pageIndex * pageSize;
    return rows.slice(start, start + pageSize);
  }

  private inferType(rows: readonly DcxTableRow[], key: string): DcxDataType {
    const first = rows.find(r => r?.[key] != null)?.[key];
    return typeof first === 'number' ? 'number' : 'string';
  }
}

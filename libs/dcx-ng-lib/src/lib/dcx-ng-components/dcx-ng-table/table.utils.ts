import {
  DcxDataType,
  DcxFrozenColumnMeta,
  DcxHeaderData,
  DcxSort,
  DcxTableRow,
} from '../../core/interfaces';

/**
 * Funciones puras usadas por `dcx-ng-table`. Sin `@Injectable`, sin estado:
 * se llaman directamente desde los `computed()` del componente y se testean
 * llamándolas directamente, sin `TestBed`.
 */

/** Asegura que toda fila tenga un `id` estable (usa el índice si falta). */
export function normalizeRows(
  rows: readonly DcxTableRow[],
): readonly DcxTableRow[] {
  return rows.map((row, index) =>
    row.id !== undefined ? row : { ...row, id: index },
  );
}

/** Filtro de texto por columna (uno o varios inputs bajo la cabecera). */
export function filterRowsByColumns(
  rows: readonly DcxTableRow[],
  filters: Record<string, string>,
): readonly DcxTableRow[] {
  const activeFilters = Object.entries(filters).filter(
    ([, value]) => value.trim() !== '',
  );
  if (activeFilters.length === 0) return rows;

  return rows.filter(row =>
    activeFilters.every(([key, filterValue]) => {
      const cellValue = String(row[key] ?? '').toLowerCase();
      return cellValue.includes(filterValue.toLowerCase());
    }),
  );
}

/** Búsqueda global (toolbar) sobre todas las columnas visibles. */
export function searchRows(
  rows: readonly DcxTableRow[],
  headers: readonly DcxHeaderData[],
  term: string,
): readonly DcxTableRow[] {
  const normalizedTerm = term.trim().toLowerCase();
  if (!normalizedTerm) return rows;

  const keys = headers.map(h => h.key).filter((key): key is string => !!key);

  return rows.filter(row =>
    keys.some(key => String(row[key] ?? '').toLowerCase().includes(normalizedTerm)),
  );
}

function compareValues(left: unknown, right: unknown, type: DcxDataType): number {
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

function inferColumnType(rows: readonly DcxTableRow[], key: string): DcxDataType {
  const first = rows.find(r => r?.[key] != null)?.[key];
  return typeof first === 'number' ? 'number' : 'string';
}

export function sortRows(
  rows: readonly DcxTableRow[],
  sort: DcxSort,
  headers: readonly DcxHeaderData[],
): readonly DcxTableRow[] {
  const { key, dir } = sort;
  if (!key || !dir) return rows;

  const header = headers.find(h => h.key === key);
  const type = header?.type ?? inferColumnType(rows, key);

  const sorted = [...rows].sort((a, b) => compareValues(a[key], b[key], type));
  return dir === 'desc' ? sorted.reverse() : sorted;
}

export function paginateRows(
  rows: readonly DcxTableRow[],
  pageIndex: number,
  pageSize: number,
): readonly DcxTableRow[] {
  const start = pageIndex * pageSize;
  return rows.slice(start, start + pageSize);
}

/** Calcula el desplazamiento sticky (left/right en px) de las columnas frozen. */
export function buildFrozenMeta(
  headers: readonly DcxHeaderData[],
  columnWidths: readonly number[],
  leftSeparator: boolean,
  rightSeparator: boolean,
): readonly DcxFrozenColumnMeta[] {
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
      leftOffset += columnWidths[idx] ?? 0;
      leftIndices.push(idx);
    }
  });

  let rightOffset = 0;
  const rightIndices: number[] = [];
  for (let i = headers.length - 1; i >= 0; i--) {
    if (headers[i].frozen === 'right') {
      meta[i].right = rightOffset;
      rightOffset += columnWidths[i] ?? 0;
      rightIndices.push(i);
    }
  }

  if (leftSeparator && leftIndices.length > 0) {
    meta[leftIndices[leftIndices.length - 1]].separatorLeft = true;
  }
  if (rightSeparator && rightIndices.length > 0) {
    meta[rightIndices[rightIndices.length - 1]].separatorRight = true;
  }

  return meta;
}

/** Ordena las cabeceras poniendo las frozen-left al principio y frozen-right al final. */
export function reorderFrozenHeaders(
  headers: readonly DcxHeaderData[],
): readonly DcxHeaderData[] {
  const left = headers.filter(h => h.frozen === 'left');
  const right = headers.filter(h => h.frozen === 'right');
  const middle = headers.filter(h => !h.frozen);
  return [...left, ...middle, ...right];
}

/** Iniciales para el avatar de la celda tipo `user` (máx. 2 letras). */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

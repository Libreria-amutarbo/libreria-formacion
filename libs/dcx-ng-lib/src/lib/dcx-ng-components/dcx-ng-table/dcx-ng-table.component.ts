// eslint-disable-next-line @nx/enforce-module-boundaries
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  TemplateRef,
} from '@angular/core';

type SortDirection = 'asc' | 'desc' | null;

export enum SortType {
  Ascending = 'ascending',
  Descending = 'descending',
  None = 'none',
}

export interface HeaderData {
  name: string;
  key?: string;
  sortable?: boolean;
  type?: 'string' | 'number';
  defaultSort?: Exclude<SortDirection, null>;
}

interface Sort {
  key: string | null;
  dir: SortDirection;
}

@Component({
  selector: 'dcx-ng-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-table.component.html',
  styleUrls: ['./dcx-ng-table.component.scss'],
})
export class DcxNgTableComponent implements OnInit {
  @Input({ required: true }) headers!: HeaderData[];
  @Input({ required: true }) rows!: any[];

  @Input() showGrid = false;
  @Input() showStripped = false;
  @Input() scroll = false;
  @Input() scrollHeight = '320px';

  @Input() headerTemplate?: TemplateRef<any>;
  @Input() cellTemplate?: TemplateRef<any>;
  @Input() menuCellTemplate?: TemplateRef<any>;

  @Output() sortChange = new EventEmitter<Sort>();

  sort = signal<Sort>({ key: null, dir: null });

  ngOnInit(): void {
    this.ensureRowIds();
  }

  sortedRows(): any[] {
    const _rows = [...this.rows];
    const { key, dir } = this.sort();
    if (!key || !dir) return _rows;

    const header = this.headers.find(h => h.key === key);
    const type = header?.type ?? this.inferType(_rows, key);

    _rows.sort((a, b) => this.compare(a?.[key], b?.[key], type));
    if (dir === 'desc') _rows.reverse();

    return _rows;
  }

  onHeaderClick(header: HeaderData) {
    if (!header.sortable) return;

    let nextDirection: SortDirection;

    if (this.sort().key !== header.key) {
      nextDirection = 'asc';
    } else {
      switch (this.sort().dir) {
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

    this.sort.set({ key: header.key ?? null, dir: nextDirection });
    this.sortChange.emit(this.sort());
  }

  ariaSort(header: HeaderData): SortType {
    const currentSort = this.sort();
    if (currentSort.key !== header.key || !currentSort.dir)
      return SortType.None;
    return currentSort.dir === 'asc' ? SortType.Ascending : SortType.Descending;
  }

  private ensureRowIds(): void {
    this.rows.forEach((row, index) => {
      if (row.id === undefined || row.id === null) {
        row.id = index;
      }
    });
  }

  private inferType(rows: any[], key: string): 'number' | 'string' {
    const first = rows.find(r => r?.[key] !== null && r?.[key] !== undefined)?.[
      key
    ];
    return typeof first === 'number' ? 'number' : 'string';
  }

  private compare(
    leftValue: any,
    rightValue: any,
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
}
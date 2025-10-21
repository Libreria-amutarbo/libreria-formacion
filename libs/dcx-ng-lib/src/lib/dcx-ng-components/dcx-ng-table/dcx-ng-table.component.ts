import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ChangeDetectionStrategy,
  OnInit,
  signal,
} from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';

type SortDirection = 'asc' | 'desc' | null;

export interface HeaderData {
  name: string;
  key?: string;
  sortable?: boolean;
  type?: 'string' | 'number';
  defaultSort?: Exclude<SortDirection, null>;
}

@Component({
  selector: 'dcx-ng-table',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './dcx-ng-table.component.html',
  styleUrls: ['./dcx-ng-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgTableComponent implements OnInit {
  @Input() headers: HeaderData[] = [];
  @Input() value: any[] = [];

  @Input() showGrid = false;
  @Input() showStripped = false;
  @Input() scroll = false;
  @Input() scrollHeight = '320px';

  @Input() headerTemplate?: TemplateRef<any>;
  @Input() cellTemplate?: TemplateRef<any>;
  @Input() menuCellTemplate?: TemplateRef<any>;

  @Output() sortChange = new EventEmitter<{ key: string | null; dir: SortDirection }>();

  sort = signal<{ key: string | null; dir: SortDirection }>({ key: null, dir: null });

  private uid = 0;
  private rowIds = new WeakMap<object, number>();
  trackRow = (_: number, row: any) => {
    if (row && typeof row === 'object') {
      let id = this.rowIds.get(row);
      if (id == null) {
        id = ++this.uid;
        this.rowIds.set(row, id);
      }
      return id;
    }
    return row ?? _;
  };

  ngOnInit(): void {
    const s = this.sort();
    if (!s.key && !s.dir) {
      const withDefault = this.headersNormalized.find(h => !!h.defaultSort);
      if (withDefault?.key && withDefault.defaultSort) {
        this.sort.set({ key: withDefault.key, dir: withDefault.defaultSort });
      }
    }
  }

  get headersNormalized(): HeaderData[] {
    return (this.headers ?? []).map(h => ({
      ...h,
      key: h.key ?? this.normalizeKey(h.name),
      sortable: h.sortable ?? true,
    }));
  }

  sortedRows(): any[] {
    const rows = [...(this.value ?? [])];
    const { key, dir } = this.sort();
    if (!key || !dir) return rows;

    const header = this.headersNormalized.find(h => h.key === key);
    const type = header?.type ?? this.inferType(rows, key);

    rows.sort((a, b) => this.compare(a?.[key], b?.[key], type));
    if (dir === 'desc') rows.reverse();
    return rows;
  }

  onHeaderClick(header: HeaderData) {
    if (!header.sortable) return;
    const s = this.sort();
    let dir: SortDirection = 'asc';
    if (s.key === header.key) {
      dir = s.dir === 'asc' ? 'desc' : s.dir === 'desc' ? null : 'asc';
    }
    this.sort.set({ key: dir ? header.key! : null, dir });
    this.sortChange.emit(this.sort());
  }

  ariaSort(header: HeaderData): 'ascending' | 'descending' | 'none' {
    const s = this.sort();
    if (s.key !== header.key || !s.dir) return 'none';
    return s.dir === 'asc' ? 'ascending' : 'descending';
  }

  private normalizeKey(name: string): string {
    return (name ?? '')
      .normalize('NFD').replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, '_')
      .toLowerCase();
  }

  private inferType(rows: any[], key: string): 'number' | 'string' {
    const first = rows.find(r => r?.[key] !== null && r?.[key] !== undefined)?.[key];
    return typeof first === 'number' ? 'number' : 'string';
  }

  private compare(a: any, b: any, type: 'string' | 'number'): number {
    const an = a === null || a === undefined;
    const bn = b === null || b === undefined;
    if (an && bn) return 0;
    if (an) return 1;
    if (bn) return -1;

    if (type === 'number') {
      const na = Number(a), nb = Number(b);
      return na === nb ? 0 : na < nb ? -1 : 1;
    }
    return String(a).localeCompare(String(b), undefined, {
      sensitivity: 'base',
      numeric: true,
    });
  }
}

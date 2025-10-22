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
  // TODO: Tiene que haber siempre un id por row o en su defecto estableces el id como el numero de posicion en el array
  @Input({ required: true }) rows!: any[];

  @Input() showGrid = false;
  @Input() showStripped = false;
  @Input() scroll = false;
  @Input() scrollHeight = '320px';

  @Input() headerTemplate?: TemplateRef<any>;
  @Input() cellTemplate?: TemplateRef<any>;
  @Input() menuCellTemplate?: TemplateRef<any>;

  @Output() sortChange = new EventEmitter<Sort>();

  sort = signal<Sort>({ key: null, dir: null, });

  // TODO: La interfaz que has definido manda, es el usuario el que tiene que apañarse para adaptarse. 
  // TODO: no deberias de tener que hacer esto.
  get headersNormalized(): HeaderData[] {
    return this.headers.map((_header) => ({
      ..._header,
      key: _header.key ?? this.normalizeKey(_header.name),
      sortable: _header.sortable ?? true,
    }));
  }

  ngOnInit(): void {
    // TODO: No es necesario esto. Por defecto: Tu tabla muestra en el orden que entran las cosas
    // TODO: SOLO si sortable y con un click del user deberia ordenarte.
    const s = this.sort();
    if (!s.key && !s.dir) {
      const withDefault = this.headersNormalized.find(h => !!h.defaultSort);
      if (withDefault?.key && withDefault.defaultSort) {
        this.sort.set({ key: withDefault.key, dir: withDefault.defaultSort });
      }
    }
  }

  sortedRows(): any[] {
    const _rows = [...this.rows];
    const { key, dir } = this.sort();
    if (!key || !dir) return _rows;

    const header = this.headersNormalized.find(h => h.key === key);
    const type = header?.type ?? this.inferType(_rows, key);

    _rows.sort((a, b) => this.compare(a?.[key], b?.[key], type));
    if (dir === 'desc') _rows.reverse();

    return _rows;
  }

  onHeaderClick(header: HeaderData) {
    if (!header.sortable) return;

    let dir: SortDirection = 'asc';
    if (this.sort().key === header.key) {
      // TODO: Anidar ternarios complica mucho  la lectura. Revisalo y puede que
      dir = this.sort().dir === 'asc' ? 'desc' : this.sort().dir === 'desc' ? null : 'asc';
    }

    this.sort.set({ key: header.key ?? null, dir });
    this.sortChange.emit(this.sort());
  }

  // TODO: Define tipado para: 'ascending' | 'descending' | 'none'
  // TODO: Vas a trabajar con SortType.Ascending
  ariaSort(header: HeaderData): 'ascending' | 'descending' | 'none' {
    const s = this.sort();
    if (s.key !== header.key || !s.dir) return 'none';
    return s.dir === 'asc' ? 'ascending' : 'descending';
  }

  private normalizeKey(name: string): string {
    return (name ?? '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, '_')
      .toLowerCase();
  }

  private inferType(rows: any[], key: string): 'number' | 'string' {
    const first = rows.find(r => r?.[key] !== null && r?.[key] !== undefined)?.[
      key
    ];
    return typeof first === 'number' ? 'number' : 'string';
  }

  // TODO: revisa
  private compare(a: any, b: any, type: 'string' | 'number'): number {
    const an = a === null || a === undefined;
    const bn = b === null || b === undefined;
    if (an && bn) return 0;
    if (an) return 1;
    if (bn) return -1;

    if (type === 'number') {
      const na = Number(a),
        nb = Number(b);
      return na === nb ? 0 : na < nb ? -1 : 1;
    }
    return String(a).localeCompare(String(b), undefined, {
      sensitivity: 'base',
      numeric: true,
    });
  }
}

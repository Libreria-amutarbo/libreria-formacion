import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgTableComponent } from './dcx-ng-table.component';
import { DcxHeaderData, DcxTableRow, DcxTableRowId } from '../../core/interfaces';

interface Row extends DcxTableRow {
  id: number;
  name: string;
  age: number;
  status: 'active' | 'inactive';
}

const ROWS: Row[] = [
  { id: 1, name: 'Alice', age: 30, status: 'active' },
  { id: 2, name: 'Bob', age: 25, status: 'inactive' },
  { id: 3, name: 'Charlie', age: 35, status: 'active' },
];

const HEADERS: DcxHeaderData[] = [
  { key: 'name', name: 'Name', sortable: true, cellType: 'user' },
  { key: 'age', name: 'Age', sortable: true, type: 'number' },
  {
    key: 'status',
    name: 'Status',
    cellType: 'badge',
    cellTypeConfig: {
      variantMap: { active: 'success', inactive: 'danger' },
      labelMap: { active: 'Activo', inactive: 'Inactivo' },
    },
  },
];

describe('DcxNgTableComponent', () => {
  let component: DcxNgTableComponent;
  let fixture: ComponentFixture<DcxNgTableComponent>;

  function setInputs(inputs: Record<string, unknown>) {
    Object.entries(inputs).forEach(([key, value]) => {
      fixture.componentRef.setInput(key, value);
    });
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('headers', HEADERS);
    fixture.componentRef.setInput('rows', ROWS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one row per item', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(3);
  });

  describe('Badge cell', () => {
    it('renders label and variant class from cellTypeConfig', () => {
      const badges = fixture.debugElement.queryAll(By.css('.dcx-badge'));
      expect(badges[0].nativeElement.textContent).toContain('Activo');
      expect(badges[0].nativeElement.classList).toContain('dcx-badge--success');
      expect(badges[1].nativeElement.textContent).toContain('Inactivo');
      expect(badges[1].nativeElement.classList).toContain('dcx-badge--danger');
    });
  });

  describe('User cell', () => {
    it('renders initials when no avatar url is configured', () => {
      const avatar = fixture.debugElement.query(
        By.css('.dcx-user-cell__avatar--initials'),
      );
      expect(avatar.nativeElement.textContent.trim()).toBe('AL');
    });
  });

  describe('Sorting', () => {
    it('cycles asc -> desc -> none and emits sortChange', () => {
      const emitSpy = jest.spyOn(component.sortChange, 'emit');
      const nameHeader = fixture.debugElement.queryAll(By.css('th'))[0];

      nameHeader.nativeElement.click();
      expect(component.sort()).toEqual({ key: 'name', dir: 'asc' });
      expect(emitSpy).toHaveBeenCalledWith({ key: 'name', dir: 'asc' });

      nameHeader.nativeElement.click();
      expect(component.sort()).toEqual({ key: 'name', dir: 'desc' });

      nameHeader.nativeElement.click();
      expect(component.sort()).toEqual({ key: null, dir: null });
    });

    it('sets aria-sort on the active column', () => {
      const nameHeader = fixture.debugElement.queryAll(By.css('th'))[0];
      nameHeader.nativeElement.click();
      fixture.detectChanges();
      expect(nameHeader.nativeElement.getAttribute('aria-sort')).toBe(
        'ascending',
      );
    });
  });

  describe('Búsqueda (toolbar)', () => {
    it('shows the toolbar and filters rows on search input', () => {
      setInputs({ searchable: true, tableTitle: 'Usuarios' });
      const input = fixture.debugElement.query(By.css('.dcx-table-search input'));
      expect(input).toBeTruthy();

      input.nativeElement.value = 'alice';
      input.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(1);
    });

    it('emits searchChange', () => {
      setInputs({ searchable: true });
      const emitSpy = jest.spyOn(component.searchChange, 'emit');
      component.onSearchInput('bob');
      expect(emitSpy).toHaveBeenCalledWith('bob');
    });
  });

  describe('Selección de filas', () => {
    it('emits selectionChange with the row id when a row checkbox is toggled', () => {
      setInputs({ selectable: true });
      const emitSpy = jest.spyOn(component.selectionChange, 'emit');
      const rowCheckbox = fixture.debugElement.queryAll(
        By.css('tbody .row-checkbox button'),
      )[0];

      rowCheckbox.nativeElement.click();
      expect(emitSpy).toHaveBeenCalledWith([1]);
    });

    it('"select all" selects every row on the current page', () => {
      setInputs({ selectable: true });
      const emitSpy = jest.spyOn(component.selectionChange, 'emit');
      const headerCheckbox = fixture.debugElement.query(
        By.css('thead .row-checkbox button'),
      );

      headerCheckbox.nativeElement.click();
      expect(emitSpy).toHaveBeenCalledWith([1, 2, 3]);
    });

    it('marks selected rows with aria-selected', () => {
      setInputs({ selectable: true, selectedIds: [1] });
      const firstRow = fixture.debugElement.queryAll(By.css('tbody tr'))[0];
      expect(firstRow.nativeElement.getAttribute('aria-selected')).toBe(
        'true',
      );
    });

    it('is indeterminate when only some rows on the page are selected', () => {
      setInputs({ selectable: true, selectedIds: [1] });
      expect(component.isSelectionIndeterminate()).toBe(true);
      expect(component.isAllSelected()).toBe(false);
    });
  });

  describe('Filtro por columna', () => {
    it('filters rows and resets to page 1', () => {
      component.onFilterChange('name', 'ali');
      fixture.detectChanges();
      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(1);
    });
  });

  describe('Edición inline', () => {
    it('emits cellEdit when a value changes via double-click edit', () => {
      const editableHeaders: DcxHeaderData[] = [
        { ...HEADERS[0], editable: true },
        HEADERS[1],
        HEADERS[2],
      ];
      setInputs({ headers: editableHeaders });

      const emitSpy = jest.spyOn(component.cellEdit, 'emit');
      const cell = fixture.debugElement.queryAll(By.css('tbody td'))[0];
      cell.triggerEventHandler('dblclick', {});
      fixture.detectChanges();

      const input = fixture.debugElement.query(By.css('.cell-edit-input input'));
      input.nativeElement.value = 'Alicia';
      input.nativeElement.dispatchEvent(new Event('input'));
      input.nativeElement.dispatchEvent(new Event('blur'));

      expect(emitSpy).toHaveBeenCalledWith(
        expect.objectContaining({ key: 'name', newValue: 'Alicia' }),
      );
    });
  });

  describe('Row actions', () => {
    it('emits rowAction with actionId, row and rowIndex for inline actions', () => {
      const actionHeaders: DcxHeaderData[] = [
        ...HEADERS,
        {
          key: 'actions',
          name: '',
          cellType: 'actions',
          cellTypeConfig: {
            mode: 'inline',
            items: [{ id: 'edit', icon: 'pencil', label: 'Editar' }],
          },
        },
      ];
      setInputs({ headers: actionHeaders });

      const emitSpy = jest.spyOn(component.rowAction, 'emit');
      const button = fixture.debugElement.query(By.css('.action-btn button'));
      button.nativeElement.click();

      expect(emitSpy).toHaveBeenCalledWith({
        actionId: 'edit',
        row: ROWS[0],
        rowIndex: 0,
      });
    });
  });

  describe('Paginación (delegada en dcx-ng-paginator)', () => {
    it('renders dcx-ng-paginator when paginator is true', () => {
      setInputs({ paginator: true, rowsPerPage: 2 });
      const paginator = fixture.debugElement.query(
        By.css('dcx-ng-paginator'),
      );
      expect(paginator).toBeTruthy();

      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(2);
    });

    it('advances page via onPaginatorPageChange (1-indexed -> 0-indexed)', () => {
      setInputs({ paginator: true, rowsPerPage: 2 });
      const emitSpy = jest.spyOn(component.pageChange, 'emit');

      component.onPaginatorPageChange(2);
      fixture.detectChanges();

      expect(component.pageIndex()).toBe(1);
      expect(emitSpy).toHaveBeenCalledWith(1);
      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(1);
    });
  });

  describe('Empty state', () => {
    it('shows the empty template when there are no rows', () => {
      setInputs({ rows: [] });
      const emptyCell = fixture.debugElement.query(By.css('.empty-cell'));
      expect(emptyCell.nativeElement.textContent).toContain('No hay datos');
    });
  });
});

// dcx-ng-table's selection is fully controlled (selectedIds in, selectionChange
// out) — this host simulates a real consumer that closes the loop, to catch
// bugs that only show up when selectedIds is actually re-bound after a click
// (a plain spy on selectionChange.emit would not have caught this).
@Component({
  selector: 'dcx-ng-test-selection-roundtrip-host',
  standalone: true,
  imports: [DcxNgTableComponent],
  template: `
    <dcx-ng-table
      [headers]="headers"
      [rows]="rows"
      [selectable]="true"
      [selectedIds]="selectedIds()"
      (selectionChange)="selectedIds.set($event)"
    />
  `,
})
class SelectionRoundtripHostComponent {
  headers: DcxHeaderData[] = [{ key: 'name', name: 'Name' }];
  rows: DcxTableRow[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];
  selectedIds = signal<DcxTableRowId[]>([]);
}

describe('DcxNgTableComponent — selection round trip (controlled component)', () => {
  let fixture: ComponentFixture<SelectionRoundtripHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionRoundtripHostComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(SelectionRoundtripHostComponent);
    fixture.detectChanges();
  });

  it('reflects every row as checked after clicking "select all"', () => {
    const headerCheckbox = fixture.debugElement.query(
      By.css('thead .row-checkbox button'),
    );
    headerCheckbox.nativeElement.click();
    fixture.detectChanges();

    const rowButtons = fixture.debugElement.queryAll(
      By.css('tbody .row-checkbox button'),
    );
    rowButtons.forEach(btn => {
      expect(btn.nativeElement.getAttribute('aria-checked')).toBe('true');
    });
    expect(headerCheckbox.nativeElement.getAttribute('aria-checked')).toBe('true');
  });

  it('unchecks "select all" again when every row is deselected one by one', () => {
    const headerCheckbox = fixture.debugElement.query(
      By.css('thead .row-checkbox button'),
    );
    headerCheckbox.nativeElement.click();
    fixture.detectChanges();

    // Cada click real de usuario va seguido de un ciclo de detección de
    // cambios antes del siguiente — se simula así para no leer un
    // `selectedIds` desactualizado entre clicks consecutivos.
    fixture.debugElement
      .queryAll(By.css('tbody .row-checkbox button'))
      .forEach(btn => {
        btn.nativeElement.click();
        fixture.detectChanges();
      });

    expect(headerCheckbox.nativeElement.getAttribute('aria-checked')).toBe('false');
  });
});

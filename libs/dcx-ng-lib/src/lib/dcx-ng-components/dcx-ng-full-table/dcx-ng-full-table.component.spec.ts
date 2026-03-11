import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgFullTableComponent } from './dcx-ng-full-table.component';
import { DcxHeaderData, DcxTableRow, DcxSortType } from '../../core/interfaces';
import { TEST_TABLE_HEADERS, TEST_TABLE_ROWS } from '../../core/mock';

const HEADERS = TEST_TABLE_HEADERS;
const ROWS = TEST_TABLE_ROWS;

describe('DcxNgFullTableComponent', () => {
  let component: DcxNgFullTableComponent;
  let fixture: ComponentFixture<DcxNgFullTableComponent>;

  function setInputs(
    inputs: Record<string, unknown> & {
      headers?: DcxHeaderData[];
      rows?: DcxTableRow[];
    },
  ) {
    Object.entries(inputs).forEach(([key, value]) => {
      if (value !== undefined) {
        fixture.componentRef.setInput(key, value);
      }
    });
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgFullTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgFullTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('headers', HEADERS);
    fixture.componentRef.setInput('rows', ROWS);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render correct number of rows', () => {
      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(3);
    });

    it('should display header names', () => {
      const headerCells = fixture.debugElement.queryAll(
        By.css('th[scope="col"]'),
      );
      expect(headerCells[0].nativeElement.textContent).toContain('Name');
      expect(headerCells[1].nativeElement.textContent).toContain('Age');
      expect(headerCells[2].nativeElement.textContent).toContain('City');
    });
  });

  describe('showGrid and showStripped', () => {
    it('should apply grid class when showGrid is true', () => {
      setInputs({ headers: HEADERS, rows: ROWS, showGrid: true });
      const table = fixture.debugElement.query(By.css('table'));
      expect(table.nativeElement.classList.contains('grid')).toBe(true);
    });

    it('should apply striped class when showStripped is true', () => {
      setInputs({ headers: HEADERS, rows: ROWS, showStripped: true });
      const table = fixture.debugElement.query(By.css('table'));
      expect(table.nativeElement.classList.contains('striped')).toBe(true);
    });
  });

  describe('Scroll', () => {
    it('should apply scroll class when scroll is true', () => {
      setInputs({ headers: HEADERS, rows: ROWS, scroll: true });
      const wrapper = fixture.debugElement.query(By.css('.table-wrapper'));
      expect(wrapper.nativeElement.classList.contains('scroll')).toBe(true);
    });
  });

  describe('Row Index', () => {
    it('should show row index column when showRowIndex is true', () => {
      setInputs({ headers: HEADERS, rows: ROWS, showRowIndex: true });
      const indexHeader = fixture.debugElement.query(
        By.css('.row-index-header'),
      );
      expect(indexHeader).toBeTruthy();
    });
  });

  describe('Sorting', () => {
    it('should mark sortable headers with sortable class', () => {
      const sortableHeaders = fixture.debugElement.queryAll(
        By.css('th.sortable'),
      );
      expect(sortableHeaders.length).toBe(2);
    });

    it('ariaSort() should cycle through NONE -> ASC -> DESC -> NONE', () => {
      expect(component.ariaSort(HEADERS[0])).toBe(DcxSortType.NONE);
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      expect(component.ariaSort(HEADERS[0])).toBe(DcxSortType.ASCENDING);
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      expect(component.ariaSort(HEADERS[0])).toBe(DcxSortType.DESCENDING);
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      expect(component.ariaSort(HEADERS[0])).toBe(DcxSortType.NONE);
    });

    it('should emit sortChange on header click', () => {
      const sortChangeSpy = jest.fn();
      component.sortChange.subscribe(sortChangeSpy);
      component.onHeaderClick(HEADERS[0]);
      expect(sortChangeSpy).toHaveBeenCalledWith({ key: 'name', dir: 'asc' });
    });

    it('sortedRows should sort ascending', () => {
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      const sorted = component.sortedRows();
      expect(sorted[0]['name'] as string).toBe('Alice');
      expect(sorted[1]['name'] as string).toBe('Bob');
      expect(sorted[2]['name'] as string).toBe('Charlie');
    });
  });

  describe('Filtering', () => {
    it('onFilterChange() should filter rows', () => {
      component.onFilterChange('name', 'Alice');
      fixture.detectChanges();
      expect(component.paginatedRows().length).toBe(1);
      expect(component.paginatedRows()[0]['name']).toBe('Alice');
    });

    it('clearing filter should show all rows again', () => {
      component.onFilterChange('name', 'Alice');
      component.onFilterChange('name', '');
      fixture.detectChanges();
      expect(component.paginatedRows().length).toBe(3);
    });
  });

  describe('Pagination', () => {
    it('should paginate when paginator=true', () => {
      setInputs({
        headers: HEADERS,
        rows: ROWS,
        paginator: true,
        rowsPerPage: 2,
        rowsPerPageOptions: [2, 5, 10],
      });
      expect(component.paginatedRows().length).toBe(2);
    });

    it('goToPage() should change page and emit pageChange', () => {
      const pageChangeSpy = jest.fn();
      component.pageChange.subscribe(pageChangeSpy);
      setInputs({
        headers: HEADERS,
        rows: ROWS,
        paginator: true,
        rowsPerPage: 2,
        rowsPerPageOptions: [2, 5, 10],
      });
      component.goToPage(1);
      fixture.detectChanges();
      expect(component.pageIndex()).toBe(1);
      expect(component.paginatedRows().length).toBe(1);
      expect(pageChangeSpy).toHaveBeenCalledWith(1);
    });

    it('onRowsPerPageChange() should emit rowsPerPageChange', () => {
      const rowsPerPageChangeSpy = jest.fn();
      component.rowsPerPageChange.subscribe(rowsPerPageChangeSpy);
      component.onRowsPerPageChange(20);
      expect(rowsPerPageChangeSpy).toHaveBeenCalledWith(20);
    });

    it('onRowsPerPageChange() with null should not emit', () => {
      const rowsPerPageChangeSpy = jest.fn();
      component.rowsPerPageChange.subscribe(rowsPerPageChangeSpy);
      component.onRowsPerPageChange(null);
      expect(rowsPerPageChangeSpy).not.toHaveBeenCalled();
    });

    it('onRowsPerPageChange() with invalid value should use 10', () => {
      const rowsPerPageChangeSpy = jest.fn();
      component.rowsPerPageChange.subscribe(rowsPerPageChangeSpy);
      component.onRowsPerPageChange('abc');
      expect(rowsPerPageChangeSpy).toHaveBeenCalledWith(10);
    });

    it('pageInfo should contain correct data', () => {
      setInputs({
        headers: HEADERS,
        rows: ROWS,
        paginator: true,
        rowsPerPage: 2,
        rowsPerPageOptions: [2, 5, 10],
      });
      const info = component.pageInfo();
      expect(info.index).toBe(0);
      expect(info.size).toBe(2);
      expect(info.total).toBe(3);
    });
  });

  describe('Cell Editing', () => {
    it('onCellDblClick() should set editing cell for editable header', () => {
      const editableHeaders: DcxHeaderData[] = [
        { key: 'name', name: 'Name', editable: true },
      ];
      setInputs({ headers: editableHeaders, rows: ROWS });
      component.onCellDblClick(0, 'name', editableHeaders[0]);
      expect(component.isEditing(0, 'name')).toBe(true);
    });

    it('onCellDblClick() should not set editing for header with template', () => {
      const templateHeader: DcxHeaderData = {
        key: 'name',
        name: 'Name',
        editable: true,
        template: 'custom',
      };
      setInputs({ headers: [templateHeader], rows: ROWS });
      component.onCellDblClick(0, 'name', templateHeader);
      expect(component.isEditing(0, 'name')).toBe(false);
    });

    it('onCellEditCancel() should clear editing cell', () => {
      const editableHeader: DcxHeaderData = {
        key: 'name',
        name: 'Name',
        editable: true,
      };
      setInputs({ headers: [editableHeader], rows: ROWS });
      component.onCellDblClick(0, 'name', editableHeader);
      component.onCellEditCancel();
      expect(component.isEditing(0, 'name')).toBe(false);
    });

    it('onCellEditComplete() should emit cellEdit when value changes', () => {
      const editableHeader: DcxHeaderData = {
        key: 'name',
        name: 'Name',
        editable: true,
      };
      setInputs({ headers: [editableHeader], rows: ROWS });
      const cellEditSpy = jest.fn();
      component.cellEdit.subscribe(cellEditSpy);
      component.onCellEditComplete(ROWS[0], 'name', 'NewName', 0);
      expect(cellEditSpy).toHaveBeenCalledWith({
        row: ROWS[0],
        key: 'name',
        oldValue: 'Alice',
        newValue: 'NewName',
        rowIndex: 0,
      });
    });

    it('onCellEditComplete() should not emit if value unchanged', () => {
      const editableHeader: DcxHeaderData = {
        key: 'name',
        name: 'Name',
        editable: true,
      };
      setInputs({ headers: [editableHeader], rows: ROWS });
      const cellEditSpy = jest.fn();
      component.cellEdit.subscribe(cellEditSpy);
      component.onCellEditComplete(ROWS[0], 'name', 'Alice', 0);
      expect(cellEditSpy).not.toHaveBeenCalled();
    });

    it('onCellEditComplete() should parse number type correctly', () => {
      const editableHeaders: DcxHeaderData[] = [
        { key: 'age', name: 'Age', editable: true, type: 'number' },
      ];
      setInputs({ headers: editableHeaders, rows: ROWS });
      const cellEditSpy = jest.fn();
      component.cellEdit.subscribe(cellEditSpy);
      component.onCellEditComplete(ROWS[0], 'age', '99', 0);
      expect(cellEditSpy).toHaveBeenCalledWith(
        expect.objectContaining({ newValue: 99 }),
      );
    });

    it('onCellEditComplete() should revert NaN to old value for number type', () => {
      const editableHeaders: DcxHeaderData[] = [
        { key: 'age', name: 'Age', editable: true, type: 'number' },
      ];
      setInputs({ headers: editableHeaders, rows: ROWS });
      const cellEditSpy = jest.fn();
      component.cellEdit.subscribe(cellEditSpy);
      component.onCellEditComplete(ROWS[0], 'age', 'abc', 0);
      expect(cellEditSpy).not.toHaveBeenCalled();
    });
  });

  describe('Actions Menu', () => {
    it('toggleActionsMenu() should open menu', () => {
      const btn = fixture.debugElement.nativeElement;
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: btn, writable: false });
      component.toggleActionsMenu(0, event);
      expect(component.isMenuOpen(0)).toBe(true);
    });

    it('closeAllMenus() should close all menus', () => {
      const btn = fixture.debugElement.nativeElement;
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: btn, writable: false });
      component.toggleActionsMenu(0, event);
      component.closeAllMenus();
      expect(component.isMenuOpen(0)).toBe(false);
    });

    it('onActionClick() should emit rowAction', () => {
      const rowActionSpy = jest.fn();
      component.rowAction.subscribe(rowActionSpy);
      component.onActionClick('delete', ROWS[0], 0);
      expect(rowActionSpy).toHaveBeenCalledWith({
        actionId: 'delete',
        row: ROWS[0],
        rowIndex: 0,
      });
    });

    it('isActionDisabled() should call disabled fn', () => {
      const action: { disabled?: (row: DcxTableRow) => boolean } = {
        disabled: (row: DcxTableRow) => (row['age'] as number) > 28,
      };
      expect(component.isActionDisabled(action, ROWS[0])).toBe(true);
      expect(component.isActionDisabled(action, ROWS[1])).toBe(false);
    });
  });

  describe('Frozen Columns', () => {
    const frozenHeaders: DcxHeaderData[] = [
      { key: 'name', name: 'Name', frozen: 'left' },
      { key: 'age', name: 'Age' },
      { key: 'city', name: 'City', frozen: 'right' },
    ];

    it('should compute frozenMeta for frozen columns', () => {
      setInputs({ headers: frozenHeaders, rows: ROWS });
      const meta = component.frozenMeta();
      expect(meta[0].left).toBe(0); // first frozen left
      expect(meta[2].right).toBe(0); // first frozen right
    });
  });

  describe('displayHeaders', () => {
    it('should order frozen left, then middle, then frozen right', () => {
      const mixedHeaders: DcxHeaderData[] = [
        { key: 'city', name: 'City' },
        { key: 'name', name: 'Name', frozen: 'left' },
        { key: 'action', name: 'Action', frozen: 'right' },
      ];
      setInputs({ headers: mixedHeaders, rows: ROWS });
      const display = component.displayHeaders();
      expect(display[0].key).toBe('name');
      expect(display[1].key).toBe('city');
      expect(display[2].key).toBe('action');
    });
  });

  describe('Empty state', () => {
    it('should render empty state when rows is empty', () => {
      setInputs({ headers: HEADERS, rows: [] });
      const emptyCell = fixture.debugElement.query(By.css('.empty-cell'));
      expect(emptyCell).toBeTruthy();
    });
  });

  describe('normalizedRowsPerPage with empty options', () => {
    it('should fallback to 10 when rowsPerPageOptions is empty', () => {
      setInputs({ rowsPerPage: 5, rowsPerPageOptions: [] });
      expect(component.pageSize()).toBe(10);
    });
  });
});

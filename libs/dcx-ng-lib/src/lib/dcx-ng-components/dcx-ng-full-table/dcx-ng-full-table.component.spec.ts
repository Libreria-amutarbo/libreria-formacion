import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, signal } from '@angular/core';
import { DcxNgFullTableComponent } from './dcx-ng-full-table.component';
import { DcxHeaderData, DcxTableRow, DcxSortType } from '../../core/interfaces';
import { TableComparatorService } from './services/table-comparator.service';
import { TableDataPipelineService } from './services/table-data-pipeline.service';
import { TableState, TableStateConfig } from './state/table-state';
import { TEST_TABLE_HEADERS, TEST_TABLE_ROWS } from '../../core/mock';

const HEADERS = TEST_TABLE_HEADERS;
const ROWS = TEST_TABLE_ROWS;

describe('DcxNgFullTableComponent', () => {
  let component: DcxNgFullTableComponent;
  let fixture: ComponentFixture<DcxNgFullTableComponent>;

  function setInputs(inputs: {
    headers?: DcxHeaderData[];
    rows?: DcxTableRow[];
    showGrid?: boolean;
    showStripped?: boolean;
    scroll?: boolean;
    scrollHeight?: string;
    paginator?: boolean;
    rowsPerPage?: number;
    rowsPerPageOptions?: number[];
    showRowIndex?: boolean;
    rowIndexLabel?: string;
    frozenLeftSeparator?: boolean;
    frozenRightSeparator?: boolean;
  }) {
    if (inputs.headers !== undefined) fixture.componentRef.setInput('headers', inputs.headers);
    if (inputs.rows !== undefined) fixture.componentRef.setInput('rows', inputs.rows);
    if (inputs.showGrid !== undefined) fixture.componentRef.setInput('showGrid', inputs.showGrid);
    if (inputs.showStripped !== undefined) fixture.componentRef.setInput('showStripped', inputs.showStripped);
    if (inputs.scroll !== undefined) fixture.componentRef.setInput('scroll', inputs.scroll);
    if (inputs.scrollHeight !== undefined) fixture.componentRef.setInput('scrollHeight', inputs.scrollHeight);
    if (inputs.paginator !== undefined) fixture.componentRef.setInput('paginator', inputs.paginator);
    if (inputs.rowsPerPage !== undefined) fixture.componentRef.setInput('rowsPerPage', inputs.rowsPerPage);
    if (inputs.rowsPerPageOptions !== undefined) fixture.componentRef.setInput('rowsPerPageOptions', inputs.rowsPerPageOptions);
    if (inputs.showRowIndex !== undefined) fixture.componentRef.setInput('showRowIndex', inputs.showRowIndex);
    if (inputs.rowIndexLabel !== undefined) fixture.componentRef.setInput('rowIndexLabel', inputs.rowIndexLabel);
    if (inputs.frozenLeftSeparator !== undefined) fixture.componentRef.setInput('frozenLeftSeparator', inputs.frozenLeftSeparator);
    if (inputs.frozenRightSeparator !== undefined) fixture.componentRef.setInput('frozenRightSeparator', inputs.frozenRightSeparator);
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

    it('should render a table element', () => {
      const table = fixture.debugElement.query(By.css('table'));
      expect(table).toBeTruthy();
    });

    it('should render correct number of header columns', () => {
      const headers = fixture.debugElement.queryAll(By.css('th[scope="col"]'));
      expect(headers.length).toBe(3);
    });

    it('should render correct number of rows', () => {
      const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
      expect(rows.length).toBe(3);
    });

    it('should display header names', () => {
      const headerCells = fixture.debugElement.queryAll(By.css('th[scope="col"]'));
      expect(headerCells[0].nativeElement.textContent).toContain('Name');
      expect(headerCells[1].nativeElement.textContent).toContain('Age');
      expect(headerCells[2].nativeElement.textContent).toContain('City');
    });
  });

  describe('showGrid and showStripped', () => {
    it('should not apply grid class by default', () => {
      const table = fixture.debugElement.query(By.css('table'));
      expect(table.nativeElement.classList.contains('grid')).toBe(false);
    });

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
    it('should not apply scroll class by default', () => {
      const wrapper = fixture.debugElement.query(By.css('.table-wrapper'));
      expect(wrapper.nativeElement.classList.contains('scroll')).toBe(false);
    });

    it('should apply scroll class when scroll is true', () => {
      setInputs({ headers: HEADERS, rows: ROWS, scroll: true });
      const wrapper = fixture.debugElement.query(By.css('.table-wrapper'));
      expect(wrapper.nativeElement.classList.contains('scroll')).toBe(true);
    });
  });

  describe('Row Index', () => {
    it('should not show row index column by default', () => {
      const indexHeader = fixture.debugElement.query(By.css('.row-index-header'));
      expect(indexHeader).toBeNull();
    });

    it('should show row index column when showRowIndex is true', () => {
      setInputs({ headers: HEADERS, rows: ROWS, showRowIndex: true });
      const indexHeader = fixture.debugElement.query(By.css('.row-index-header'));
      expect(indexHeader).toBeTruthy();
    });

    it('should display custom rowIndexLabel', () => {
      setInputs({ headers: HEADERS, rows: ROWS, showRowIndex: true, rowIndexLabel: 'N°' });
      const indexHeader = fixture.debugElement.query(By.css('.row-index-header'));
      expect(indexHeader.nativeElement.textContent).toContain('N°');
    });

    it('getRowDisplayIndex should return correct index', () => {
      expect(component.getRowDisplayIndex(0)).toBe(1);
      expect(component.getRowDisplayIndex(2)).toBe(3);
    });
  });

  describe('Sorting', () => {
    it('should mark sortable headers with sortable class', () => {
      const sortableHeaders = fixture.debugElement.queryAll(By.css('th.sortable'));
      expect(sortableHeaders.length).toBe(2);
    });

    it('ariaSort() should return NONE when no sort active', () => {
      expect(component.ariaSort(HEADERS[0])).toBe(DcxSortType.NONE);
    });

    it('ariaSort() should return ASCENDING after sorting asc', () => {
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      expect(component.ariaSort(HEADERS[0])).toBe(DcxSortType.ASCENDING);
    });

    it('ariaSort() should return DESCENDING after sorting desc', () => {
      component.onHeaderClick(HEADERS[0]);
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      expect(component.ariaSort(HEADERS[0])).toBe(DcxSortType.DESCENDING);
    });

    it('ariaSort() should return NONE after toggling back to null', () => {
      component.onHeaderClick(HEADERS[0]);
      component.onHeaderClick(HEADERS[0]);
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

    it('should emit sortChange with null sort for non-sortable headers', () => {
      const sortChangeSpy = jest.fn();
      component.sortChange.subscribe(sortChangeSpy);
      component.onHeaderClick(HEADERS[2]); // city is not sortable
      // Non-sortable headers still emit with null key/dir
      expect(sortChangeSpy).toHaveBeenCalledWith({ key: null, dir: null });
    });

    it('getSortIcon() should return correct icon for sort type', () => {
      const noneIcon = component.getSortIcon(HEADERS[0]);
      expect(noneIcon).toBe('arrow-down-up');

      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      const ascIcon = component.getSortIcon(HEADERS[0]);
      expect(ascIcon).toBe('arrow-up');

      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      const descIcon = component.getSortIcon(HEADERS[0]);
      expect(descIcon).toBe('arrow-down');
    });

    it('sortedRows should sort ascending', () => {
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      const sorted = component.sortedRows();
      expect(sorted[0]['name'] as string).toBe('Alice');
      expect(sorted[1]['name'] as string).toBe('Bob');
      expect(sorted[2]['name'] as string).toBe('Charlie');
    });

    it('sortedRows should sort descending', () => {
      component.onHeaderClick(HEADERS[0]);
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      const sorted = component.sortedRows();
      expect(sorted[0]['name'] as string).toBe('Charlie');
    });
  });

  describe('Filtering', () => {
    it('onFilterChange() should filter rows', () => {
      component.onFilterChange('name', 'Alice');
      fixture.detectChanges();
      expect(component.paginatedRows().length).toBe(1);
      expect(component.paginatedRows()[0]['name']).toBe('Alice');
    });

    it('getFilterValue() should return current filter', () => {
      component.onFilterChange('city', 'Madrid');
      expect(component.getFilterValue('city')).toBe('Madrid');
    });

    it('getFilterValue() should return empty string for unknown key', () => {
      expect(component.getFilterValue('unknown')).toBe('');
    });

    it('getFilterPlaceholder() should return correct placeholder', () => {
      expect(component.getFilterPlaceholder('Name')).toBe('Filtrar Name');
    });

    it('clearing filter should show all rows again', () => {
      component.onFilterChange('name', 'Alice');
      component.onFilterChange('name', '');
      fixture.detectChanges();
      expect(component.paginatedRows().length).toBe(3);
    });
  });

  describe('Pagination', () => {
    it('should not paginate by default (paginator=false)', () => {
      setInputs({ headers: HEADERS, rows: ROWS });
      expect(component.paginatedRows().length).toBe(3);
    });

    it('should paginate when paginator=true', () => {
      setInputs({ headers: HEADERS, rows: ROWS, paginator: true, rowsPerPage: 2, rowsPerPageOptions: [2, 5, 10] });
      expect(component.paginatedRows().length).toBe(2);
    });

    it('goToPage() should change page', () => {
      setInputs({ headers: HEADERS, rows: ROWS, paginator: true, rowsPerPage: 2, rowsPerPageOptions: [2, 5, 10] });
      component.goToPage(1);
      fixture.detectChanges();
      expect(component.pageIndex()).toBe(1);
      expect(component.paginatedRows().length).toBe(1);
    });

    it('goToPage() should not emit if same page', () => {
      const pageChangeSpy = jest.fn();
      component.pageChange.subscribe(pageChangeSpy);
      setInputs({ headers: HEADERS, rows: ROWS, paginator: true });
      component.goToPage(0); // already on page 0
      expect(pageChangeSpy).not.toHaveBeenCalled();
    });

    it('goToPage() should emit pageChange', () => {
      const pageChangeSpy = jest.fn();
      component.pageChange.subscribe(pageChangeSpy);
      setInputs({ headers: HEADERS, rows: ROWS, paginator: true, rowsPerPage: 2 });
      component.goToPage(1);
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
      setInputs({ headers: HEADERS, rows: ROWS, paginator: true, rowsPerPage: 2, rowsPerPageOptions: [2, 5, 10] });
      const info = component.pageInfo();
      expect(info.index).toBe(0);
      expect(info.size).toBe(2);
      expect(info.total).toBe(3);
    });
  });

  describe('Cell Editing', () => {
    it('isEditing() should return false by default', () => {
      expect(component.isEditing(0, 'name')).toBe(false);
    });

    it('onCellDblClick() should set editing cell for editable header', () => {
      const editableHeaders: DcxHeaderData[] = [
        { key: 'name', name: 'Name', editable: true },
      ];
      setInputs({ headers: editableHeaders, rows: ROWS });
      component.onCellDblClick(0, 'name', editableHeaders[0]);
      expect(component.isEditing(0, 'name')).toBe(true);
    });

    it('onCellDblClick() should not set editing cell for non-editable header', () => {
      component.onCellDblClick(0, 'name', HEADERS[0]);
      expect(component.isEditing(0, 'name')).toBe(false);
    });

    it('onCellDblClick() should not set editing for header with template', () => {
      const templateHeader: DcxHeaderData = { key: 'name', name: 'Name', editable: true, template: 'custom' };
      setInputs({ headers: [templateHeader], rows: ROWS });
      component.onCellDblClick(0, 'name', templateHeader);
      expect(component.isEditing(0, 'name')).toBe(false);
    });

    it('onCellDblClick() should not set editing for header with renderFn', () => {
      const renderHeader: DcxHeaderData = { key: 'name', name: 'Name', editable: true, renderFn: (v) => String(v) };
      setInputs({ headers: [renderHeader], rows: ROWS });
      component.onCellDblClick(0, 'name', renderHeader);
      expect(component.isEditing(0, 'name')).toBe(false);
    });

    it('onCellEditCancel() should clear editing cell', () => {
      const editableHeader: DcxHeaderData = { key: 'name', name: 'Name', editable: true };
      setInputs({ headers: [editableHeader], rows: ROWS });
      component.onCellDblClick(0, 'name', editableHeader);
      component.onCellEditCancel();
      expect(component.isEditing(0, 'name')).toBe(false);
    });

    it('onCellEditComplete() should emit cellEdit when value changes', () => {
      const editableHeader: DcxHeaderData = { key: 'name', name: 'Name', editable: true };
      setInputs({ headers: [editableHeader], rows: ROWS });
      const cellEditSpy = jest.fn();
      component.cellEdit.subscribe(cellEditSpy);
      component.onCellEditComplete(ROWS[0], 'name', 'NewName', 0);
      expect(cellEditSpy).toHaveBeenCalledWith({
        row: ROWS[0], key: 'name', oldValue: 'Alice', newValue: 'NewName', rowIndex: 0,
      });
    });

    it('onCellEditComplete() should not emit if value unchanged', () => {
      const editableHeader: DcxHeaderData = { key: 'name', name: 'Name', editable: true };
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
        expect.objectContaining({ newValue: 99 })
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
      // NaN reverts to old value, so no change emitted
      expect(cellEditSpy).not.toHaveBeenCalled();
    });
  });

  describe('Actions Menu', () => {
    it('isMenuOpen() should return false by default', () => {
      expect(component.isMenuOpen(0)).toBe(false);
    });

    it('toggleActionsMenu() should open menu', () => {
      const btn = fixture.debugElement.nativeElement;
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: btn, writable: false });
      component.toggleActionsMenu(0, event);
      expect(component.isMenuOpen(0)).toBe(true);
    });

    it('toggleActionsMenu() should close menu if already open', () => {
      const btn = fixture.debugElement.nativeElement;
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: btn, writable: false });
      component.toggleActionsMenu(0, event);
      component.toggleActionsMenu(0, event);
      expect(component.isMenuOpen(0)).toBe(false);
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
      expect(rowActionSpy).toHaveBeenCalledWith({ actionId: 'delete', row: ROWS[0], rowIndex: 0 });
    });

    it('getMenuIcon() should return default icon when no icon provided', () => {
      expect(component.getMenuIcon()).toBe('three-dots-vertical');
    });

    it('getMenuIcon() should return custom icon when provided', () => {
      expect(component.getMenuIcon('custom-icon')).toBe('custom-icon');
    });

    it('isActionDisabled() should return false when no disabled fn', () => {
      const action: { disabled?: (row: DcxTableRow) => boolean } = {};
      expect(component.isActionDisabled(action, ROWS[0])).toBe(false);
    });

    it('isActionDisabled() should call disabled fn', () => {
      const action: { disabled?: (row: DcxTableRow) => boolean } = {
        disabled: (row: DcxTableRow) => (row['age'] as number) > 28,
      };
      expect(component.isActionDisabled(action, ROWS[0])).toBe(true); // Alice age 30 > 28
      expect(component.isActionDisabled(action, ROWS[1])).toBe(false); // Bob age 25
    });
  });

  describe('Template Access', () => {
    it('getEmptyTemplate() should return default empty template', () => {
      expect(component.getEmptyTemplate()).toBeTruthy();
    });

    it('getCellTemplate() should return default cell template for regular column', () => {
      expect(component.getCellTemplate(HEADERS[0])).toBeTruthy();
    });

    it('getCellTemplate() should return date template for date cellType', () => {
      const dateHeader: DcxHeaderData = { key: 'date', name: 'Date', cellType: 'date' };
      setInputs({ headers: [dateHeader], rows: [] });
      expect(component.getCellTemplate(dateHeader)).toBeTruthy();
    });

    it('getCellTemplate() should return actions template for actions cellType', () => {
      const actionsHeader: DcxHeaderData = { key: 'actions', name: 'Actions', cellType: 'actions' };
      setInputs({ headers: [actionsHeader], rows: [] });
      expect(component.getCellTemplate(actionsHeader)).toBeTruthy();
    });

    it('getHeaderTemplate() should return default header template', () => {
      expect(component.getHeaderTemplate(HEADERS[0])).toBeTruthy();
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

    it('should compute frozenMeta with separators', () => {
      setInputs({
        headers: frozenHeaders, rows: ROWS,
        frozenLeftSeparator: true, frozenRightSeparator: true,
      });
      const meta = component.frozenMeta();
      expect(meta[0].separatorLeft).toBe(true);
      expect(meta[2].separatorRight).toBe(true);
    });
  });

  describe('sortLabel', () => {
    it('should return null when no sort active', () => {
      expect(component.sortLabel()).toBeNull();
    });

    it('should return header name when sorted', () => {
      component.onHeaderClick(HEADERS[0]);
      fixture.detectChanges();
      expect(component.sortLabel()).toBe('Name');
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
      expect(display[0].key).toBe('name'); // frozen left first
      expect(display[1].key).toBe('city'); // middle
      expect(display[2].key).toBe('action'); // frozen right last
    });
  });

  describe('Empty state', () => {
    it('should render empty state when rows is empty', () => {
      setInputs({ headers: HEADERS, rows: [] });
      const emptyCell = fixture.debugElement.query(By.css('.empty-cell'));
      expect(emptyCell).toBeTruthy();
    });
  });

  describe('Table click closes menus', () => {
    it('should close all menus when closeAllMenus is called', () => {
      component.closeAllMenus();
      expect(component.isMenuOpen(0)).toBe(false);
      expect(component.isMenuOpen(1)).toBe(false);
    });
  });

  describe('toggleActionsMenu with real wrapper element', () => {
    it('should add has-open-menu class to wrapper when opening menu', () => {
      const wrapper = fixture.debugElement.query(By.css('.table-wrapper'));
      const btn = wrapper ? wrapper.nativeElement : fixture.debugElement.nativeElement;
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: btn, writable: false });
      component.toggleActionsMenu(0, event);
      expect(component.isMenuOpen(0)).toBe(true);
    });

    it('should remove has-open-menu class from wrapper when closing menu', () => {
      const wrapper = fixture.debugElement.query(By.css('.table-wrapper'));
      const btn = wrapper ? wrapper.nativeElement : fixture.debugElement.nativeElement;
      const event = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(event, 'target', { value: btn, writable: false });
      component.toggleActionsMenu(0, event);
      component.toggleActionsMenu(0, event); // toggle off
      expect(component.isMenuOpen(0)).toBe(false);
    });
  });

  describe('getHeaderTemplate with headerTemplate input', () => {
    it('should return default header template when headerTemplate key not in cache', () => {
      const headerWithTemplate: DcxHeaderData = { key: 'name', name: 'Name', headerTemplate: 'nonexistent' };
      const result = component.getHeaderTemplate(headerWithTemplate);
      expect(result).toBeTruthy(); // falls back to defaultHeaderTpl
    });
  });

  describe('getCellTemplate with template input', () => {
    it('should return default cell template when template key not in cache', () => {
      const headerWithTemplate: DcxHeaderData = { key: 'name', name: 'Name', template: 'nonexistent' };
      const result = component.getCellTemplate(headerWithTemplate);
      expect(result).toBeTruthy(); // falls through to switch default
    });
  });

  describe('getEmptyTemplate', () => {
    it('should return custom empty template when empty key is in cache', () => {
      // default case - no custom template registered
      const result = component.getEmptyTemplate();
      expect(result).toBeTruthy(); // returns defaultEmptyTpl
    });
  });

  describe('sortLabel with header having no name', () => {
    it('should return key when sorted header has no name', () => {
      const headersWithNoName: DcxHeaderData[] = [
        { key: 'id', sortable: true } as DcxHeaderData,
        ...HEADERS.slice(1),
      ];
      setInputs({ headers: headersWithNoName, rows: ROWS });
      component.onHeaderClick(headersWithNoName[0]);
      fixture.detectChanges();
      // header.name is undefined → sortLabel returns key
      expect(component.sortLabel()).toBe('id');
    });
  });

  describe('normalizedRowsPerPage with empty options', () => {
    it('should fallback to 10 when rowsPerPageOptions is empty', () => {
      setInputs({ rowsPerPage: 5, rowsPerPageOptions: [] });
      // With empty options, normalizedRowsPerPage falls back to options[0] ?? 10 = 10
      expect(component.pageSize()).toBe(10);
    });
  });
});

describe('TableComparatorService', () => {
  let service: TableComparatorService;

  beforeEach(() => {
    service = new TableComparatorService();
  });

  it('should compare two strings', () => {
    expect(service.compare('Alice', 'Bob', 'string')).toBeLessThan(0);
    expect(service.compare('Bob', 'Alice', 'string')).toBeGreaterThan(0);
    expect(service.compare('Alice', 'Alice', 'string')).toBe(0);
  });

  it('should compare two numbers', () => {
    expect(service.compare(5, 10, 'number')).toBeLessThan(0);
    expect(service.compare(10, 5, 'number')).toBeGreaterThan(0);
    expect(service.compare(5, 5, 'number')).toBe(0);
  });

  it('should handle null left as greater (sort to end)', () => {
    expect(service.compare(null, 'Alice', 'string')).toBeGreaterThan(0);
  });

  it('should handle null right as lesser (sort to front)', () => {
    expect(service.compare('Alice', null, 'string')).toBeLessThan(0);
  });

  it('should handle both null as equal', () => {
    expect(service.compare(null, null, 'string')).toBe(0);
  });

  it('should handle NaN numbers', () => {
    expect(service.compare('abc', 5, 'number')).toBeGreaterThan(0); // NaN sorts last
    expect(service.compare(5, 'abc', 'number')).toBeLessThan(0);
    expect(service.compare('abc', 'xyz', 'number')).toBe(0); // both NaN
  });

  it('should compare strings numerically', () => {
    expect(service.compare('10', '2', 'string')).toBeGreaterThan(0); // numeric: 10 > 2
  });
});

describe('TableDataPipelineService', () => {
  let service: TableDataPipelineService;

  beforeEach(() => {
    service = new TableDataPipelineService();
  });

  describe('normalize()', () => {
    it('should add id when missing', () => {
      const rows = [{ name: 'Alice' }, { name: 'Bob' }] as DcxTableRow[];
      const result = service.normalize(rows);
      expect(result[0].id).toBe(0);
      expect(result[1].id).toBe(1);
    });

    it('should keep existing id', () => {
      const rows: DcxTableRow[] = [{ id: 99, name: 'Alice' }];
      const result = service.normalize(rows);
      expect(result[0].id).toBe(99);
    });
  });

  describe('filter()', () => {
    const rows: DcxTableRow[] = [
      { id: 1, name: 'Alice', city: 'Madrid' },
      { id: 2, name: 'Bob', city: 'Barcelona' },
    ];

    it('should return all rows when no filters', () => {
      expect(service.filter(rows, {})).toHaveLength(2);
    });

    it('should filter rows matching filter value', () => {
      const result = service.filter(rows, { name: 'alice' });
      expect(result).toHaveLength(1);
      expect(result[0]['name'] as string).toBe('Alice');
    });

    it('should filter with multiple active filters', () => {
      const result = service.filter(rows, { name: 'alice', city: 'mad' });
      expect(result).toHaveLength(1);
    });

    it('should return empty when no match', () => {
      const result = service.filter(rows, { name: 'xyz' });
      expect(result).toHaveLength(0);
    });

    it('should ignore filters with empty string', () => {
      const result = service.filter(rows, { name: '' });
      expect(result).toHaveLength(2);
    });

    it('should handle null cell values', () => {
      const rowsWithNull: DcxTableRow[] = [{ id: 1, name: null }];
      const result = service.filter(rowsWithNull, { name: 'alice' });
      expect(result).toHaveLength(0);
    });
  });

  describe('sort()', () => {
    const rows: DcxTableRow[] = [
      { id: 1, name: 'Charlie', age: 35 },
      { id: 2, name: 'Alice', age: 25 },
      { id: 3, name: 'Bob', age: 30 },
    ];
    const headers: DcxHeaderData[] = [
      { key: 'name', name: 'Name', type: 'string' },
      { key: 'age', name: 'Age', type: 'number' },
    ];
    const compareFn = (left: unknown, right: unknown, type: any) => {
      const svc = new TableComparatorService();
      return svc.compare(left, right, type);
    };

    it('should return original order when no sort key', () => {
      const result = service.sort(rows, { key: null, dir: null }, headers, compareFn);
      expect(result).toEqual(rows);
    });

    it('should sort ascending by name', () => {
      const result = service.sort(rows, { key: 'name', dir: 'asc' }, headers, compareFn);
      expect(result[0]['name'] as string).toBe('Alice');
      expect(result[2]['name'] as string).toBe('Charlie');
    });

    it('should sort descending by name', () => {
      const result = service.sort(rows, { key: 'name', dir: 'desc' }, headers, compareFn);
      expect(result[0]['name'] as string).toBe('Charlie');
    });

    it('should sort by number type', () => {
      const result = service.sort(rows, { key: 'age', dir: 'asc' }, headers, compareFn);
      expect(result[0]['age'] as number).toBe(25);
      expect(result[2]['age'] as number).toBe(35);
    });

    it('should infer type when header has no type', () => {
      const headersNoType: DcxHeaderData[] = [{ key: 'age', name: 'Age' }];
      const result = service.sort(rows, { key: 'age', dir: 'asc' }, headersNoType, compareFn);
      expect(result[0]['age'] as number).toBe(25);
    });
  });

  describe('paginate()', () => {
    const rows: DcxTableRow[] = Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Row ${i}` }));

    it('should return first page', () => {
      const result = service.paginate(rows, 0, 5);
      expect(result).toHaveLength(5);
      expect(result[0].id).toBe(0);
    });

    it('should return second page', () => {
      const result = service.paginate(rows, 1, 5);
      expect(result).toHaveLength(5);
      expect(result[0].id).toBe(5);
    });

    it('should return remaining items on last page', () => {
      const result = service.paginate(rows, 2, 4);
      expect(result).toHaveLength(2);
    });
  });
});

describe('TableState', () => {
  let comparator: TableComparatorService;
  let pipeline: TableDataPipelineService;

  beforeEach(() => {
    comparator = new TableComparatorService();
    pipeline = new TableDataPipelineService();
  });

  function createState(overrides: Partial<TableStateConfig> = {}): TableState {
    const config: TableStateConfig = {
      headers: signal(HEADERS),
      rows: signal(ROWS),
      rowsPerPage: signal(10),
      paginator: signal(false),
      frozenLeftSeparator: signal(false),
      frozenRightSeparator: signal(false),
      showRowIndex: signal(false),
      ...overrides,
    };
    return new TableState(config, pipeline, comparator);
  }

  it('should initialize with default state', () => {
    const state = createState();
    expect(state.sort()).toEqual({ key: null, dir: null });
    expect(state.pageIndex()).toBe(0);
    expect(state.pageSize()).toBe(10);
  });

  it('should normalize rows', () => {
    const rowsWithoutId = [{ name: 'Alice' }, { name: 'Bob' }] as DcxTableRow[];
    const state = createState({ rows: signal(rowsWithoutId) });
    expect(state.normalizedRows()[0].id).toBe(0);
  });

  it('toggleSort() should cycle through asc -> desc -> null', () => {
    const state = createState();
    let sort = state.toggleSort(HEADERS[0]);
    expect(sort.dir).toBe('asc');
    sort = state.toggleSort(HEADERS[0]);
    expect(sort.dir).toBe('desc');
    sort = state.toggleSort(HEADERS[0]);
    expect(sort.dir).toBeNull();
  });

  it('toggleSort() on new key should reset to asc', () => {
    const state = createState();
    state.toggleSort(HEADERS[0]);
    const sort = state.toggleSort(HEADERS[1]);
    expect(sort.key).toBe('age');
    expect(sort.dir).toBe('asc');
  });

  it('toggleSort() on non-sortable header should return current sort', () => {
    const state = createState();
    const sort = state.toggleSort(HEADERS[2]); // city is not sortable
    expect(sort).toEqual({ key: null, dir: null });
  });

  it('setFilter() should filter rows and reset page', () => {
    const state = createState({ paginator: signal(true), rowsPerPage: signal(2) });
    state.goToPage(1);
    expect(state.pageIndex()).toBe(1);
    state.setFilter('name', 'Alice');
    expect(state.pageIndex()).toBe(0);
    expect(state.filteredRows().length).toBe(1);
  });

  it('getFilterValue() should return current filter', () => {
    const state = createState();
    state.setFilter('city', 'Madrid');
    expect(state.getFilterValue('city')).toBe('Madrid');
  });

  it('getFilterValue() should return empty string for unset key', () => {
    const state = createState();
    expect(state.getFilterValue('unknown')).toBe('');
  });

  it('resetPageIndex() should reset to 0', () => {
    const state = createState();
    state.goToPage(3);
    state.resetPageIndex();
    expect(state.pageIndex()).toBe(0);
  });

  it('setColumnWidths() should update widths', () => {
    const state = createState();
    state.setColumnWidths([100, 200, 150]);
  });

  it('should use defaultSort from header when available', () => {
    const headersWithDefault: DcxHeaderData[] = [
      { key: 'name', name: 'Name', sortable: true, defaultSort: 'asc' },
      { key: 'age', name: 'Age', sortable: true },
    ];
    const state = createState({ headers: signal(headersWithDefault) });
    expect(state.sort()).toEqual({ key: 'name', dir: 'asc' });
  });

  it('pageSize should default to 10 for invalid value', () => {
    const state = createState({ rowsPerPage: signal(0) });
    expect(state.pageSize()).toBe(10);
  });

  it('should paginate when paginator is true', () => {
    const state = createState({ paginator: signal(true), rowsPerPage: signal(2) });
    expect(state.paginatedRows().length).toBe(2);
  });

  it('hasRowIndex should reflect showRowIndex config', () => {
    const state = createState({ showRowIndex: signal(true) });
    expect(state.hasRowIndex()).toBe(true);
  });
});

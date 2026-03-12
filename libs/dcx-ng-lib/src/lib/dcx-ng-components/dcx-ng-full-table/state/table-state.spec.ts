import { signal } from '@angular/core';
import {
  TableComparatorService,
  TableDataPipelineService,
  DcxHeaderData,
  TEST_TABLE_HEADERS,
  TEST_TABLE_ROWS,
} from '@dcx-ng-components/dcx-ng-lib';
import { TableState, TableStateConfig } from './table-state';

const HEADERS = TEST_TABLE_HEADERS;
const ROWS = TEST_TABLE_ROWS;

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

  it('toggleSort() should cycle through asc -> desc -> null', () => {
    const state = createState();
    let sort = state.toggleSort(HEADERS[0]);
    expect(sort.dir).toBe('asc');
    sort = state.toggleSort(HEADERS[0]);
    expect(sort.dir).toBe('desc');
    sort = state.toggleSort(HEADERS[0]);
    expect(sort.dir).toBeNull();
  });

  it('toggleSort() on non-sortable header should return current sort', () => {
    const state = createState();
    const sort = state.toggleSort(HEADERS[2]);
    expect(sort).toEqual({ key: null, dir: null });
  });

  it('setFilter() should filter rows and reset page', () => {
    const state = createState({
      paginator: signal(true),
      rowsPerPage: signal(2),
    });
    state.goToPage(1);
    expect(state.pageIndex()).toBe(1);
    state.setFilter('name', 'Alice');
    expect(state.pageIndex()).toBe(0);
    expect(state.filteredRows().length).toBe(1);
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
});

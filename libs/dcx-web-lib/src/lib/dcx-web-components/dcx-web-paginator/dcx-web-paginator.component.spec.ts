import './dcx-web-paginator.component';

import { DcxWebPaginator } from './dcx-web-paginator.component';

describe('DcxWebPaginator', () => {
  let element: DcxWebPaginator;

  beforeEach(async () => {
    element = document.createElement('dcx-web-paginator') as DcxWebPaginator;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebPaginator);
  });

  it('should have default values', () => {
    expect(element.currentPage).toBe(1);
    expect(element.totalPages).toBe(10);
  });

  it('should emit pageChange', () => {
    const spy = jest.fn();

    element.addEventListener('pageChange', spy);

    element.goToPage(3);

    expect(spy).toHaveBeenCalled();
  });

  it('should emit totalPagesChange', () => {
    const spy = jest.fn();

    element.addEventListener('totalPagesChange', spy);

    element.onItemsPerPageChange('20');

    expect(spy).toHaveBeenCalled();
  });

  it('should render nav landmark', () => {
    const nav = element.shadowRoot?.querySelector('nav.dcx-paginator__pages');

    expect(nav).toBeTruthy();

    expect(nav?.getAttribute('aria-label')).toBe('Paginación de resultados');
  });

  it('should compute visible pages with ellipsis', () => {
    element.paginator = {
      totalItems: 200,
      itemsPerPage: 10,
      currentPage: 10,
    };

    expect(element.visiblePages.includes('...')).toBe(true);
  });

  it('should resolve current page aria', () => {
    element.currentPage = 2;

    expect(element.getPageAriaCurrent(2)).toBe('page');
  });

  it('should calculate first item', () => {
    element.currentPage = 2;

    expect(element.firstItem).toBe(11);
  });

  it('should calculate last item', () => {
    element.currentPage = 3;

    element.paginator = {
      totalItems: 25,
      itemsPerPage: 10,
      currentPage: 3,
    };

    element.selectedItemsPerPage = 10;

    expect(element.lastItem).toBe(25);
  });
});

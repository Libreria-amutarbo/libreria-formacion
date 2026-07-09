import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgPaginatorComponent } from './dcx-ng-paginator.component';

describe('DcxNgPaginatorComponent', () => {
  let component: DcxNgPaginatorComponent;
  let fixture: ComponentFixture<DcxNgPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.currentPage()).toBe(1);
    expect(component.totalPages()).toBe(10);
  });

  it('should emit pageChange when clicking a page number', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 1,
    });
    fixture.detectChanges();
    component.goToPage(3);
    expect(emitSpy).toHaveBeenCalledWith(3);
  });

  it('should emit pageChange when calling goToNext', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();
    component.goToNext();
    expect(pageChangeSpy).toHaveBeenCalledWith(3);
  });

  it('should emit pageChange when calling goToPrevious', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 3,
    });
    fixture.detectChanges();
    component.goToPrevious();
    expect(pageChangeSpy).toHaveBeenCalledWith(2);
  });

  it('should disable previous on first page (hasPrevious false)', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 1,
    });
    fixture.detectChanges();
    expect(component.hasPrevious()).toBe(false);
  });

  it('should disable next on last page (hasNext false)', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 5,
    });
    fixture.detectChanges();
    expect(component.hasNext()).toBe(false);
  });

  it('should not go to previous when already on first page', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 1,
    });
    fixture.detectChanges();
    component.goToPrevious();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should not go to next when already on last page', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 5,
    });
    fixture.detectChanges();
    component.goToNext();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('hasPrevious should be true when currentPage > 1', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();
    expect(component.hasPrevious()).toBe(true);
  });

  it('hasNext should be true when currentPage < totalPages', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 30,
      itemsPerPage: 10,
      currentPage: 1,
    });
    fixture.detectChanges();
    expect(component.hasNext()).toBe(true);
  });

  it('should compute totalPages correctly', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 25,
      itemsPerPage: 10,
      currentPage: 1,
    });
    fixture.detectChanges();
    expect(component.totalPages()).toBe(3);
  });

  it('should emit totalPagesChange', () => {
    const spy = jest.spyOn(component.totalPagesChange, 'emit');
    fixture.componentRef.setInput('paginator', {
      totalItems: 40,
      itemsPerPage: 10,
      currentPage: 1,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(4);
  });

  it('should go to start page', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 3,
    });
    fixture.detectChanges();
    const spy = jest.spyOn(component.pageChange, 'emit');
    component.goToStart();
    expect(component.currentPage()).toBe(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should go to end page', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 1,
    });
    fixture.detectChanges();
    const spy = jest.spyOn(component.pageChange, 'emit');
    component.goToEnd();
    expect(component.currentPage()).toBe(5);
    expect(spy).toHaveBeenCalledWith(5);
  });

  it('should go to page relative forward', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 3,
    });
    fixture.detectChanges();
    const spy = jest.spyOn(component.pageChange, 'emit');
    component.goToPageRelative(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should go to page relative backward', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 5,
    });
    fixture.detectChanges();
    const spy = jest.spyOn(component.pageChange, 'emit');
    component.goToPageRelative(-1);
    expect(spy).toHaveBeenCalled();
    expect(component.currentPage()).toBeGreaterThanOrEqual(1);
  });

  it('should clamp goToPageRelative to min 1', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 1,
    });
    fixture.detectChanges();
    component.goToPageRelative(-1);
    expect(component.currentPage()).toBe(1);
  });

  it('should clamp goToPageRelative to max totalPages', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 5,
    });
    fixture.detectChanges();
    component.goToPageRelative(1);
    expect(component.currentPage()).toBeLessThanOrEqual(5);
  });

  it('getCurrentPage should return true for current page', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 3,
    });
    fixture.detectChanges();
    expect(component.getCurrentPage(3)).toBe(true);
    expect(component.getCurrentPage(1)).toBe(false);
  });

  it('getButtonVariant should return primary for current page and text for the rest', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();
    expect(component.getButtonVariant(2)).toBe('primary');
    expect(component.getButtonVariant(1)).toBe('text');
  });

  it('should mark current page button with current class', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();

    const currentPageButton = fixture.nativeElement.querySelector(
      '.dcx-paginator__page--current',
    );

    expect(currentPageButton).toBeTruthy();
  });

  it('getEllipsisDirection should resolve left and right jumps correctly', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 200,
      itemsPerPage: 10,
      currentPage: 10,
    });
    fixture.detectChanges();

    const pages = component.visiblePages();
    const leftEllipsisIndex = pages.findIndex(page => page === '...');
    const rightEllipsisIndex = pages.lastIndexOf('...');

    expect(component.getEllipsisDirection(leftEllipsisIndex, pages)).toBe(-1);
    expect(component.getEllipsisDirection(rightEllipsisIndex, pages)).toBe(1);
  });

  it('getButtonLabel should return page number as string', () => {
    expect(component.getButtonLabel(5)).toBe('5');
  });

  it('getPageNumber should return number for number input', () => {
    expect(component.getPageNumber(3)).toBe(3);
  });

  it('getPageNumber should return 0 for string input', () => {
    expect(component.getPageNumber('...')).toBe(0);
  });

  it('isEllipsis should return true for "..."', () => {
    expect(component.isEllipsis('...')).toBe(true);
    expect(component.isEllipsis(3)).toBe(false);
  });

  it('firstItem should compute correctly', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();
    expect(component.firstItem()).toBe(11);
  });

  it('lastItem should compute correctly', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 25,
      itemsPerPage: 10,
      currentPage: 3,
    });
    fixture.detectChanges();
    expect(component.lastItem()).toBe(25);
  });

  it('visiblePages should include ellipsis for many pages', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 200,
      itemsPerPage: 10,
      currentPage: 10,
    });
    fixture.detectChanges();
    const pages = component.visiblePages();
    expect(pages).toContain('...');
  });

  it('visiblePages should keep same numeric count while moving left and right', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 200,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();

    const leftNumericCount = component
      .visiblePages()
      .filter(page => typeof page === 'number').length;

    fixture.componentRef.setInput('paginator', {
      totalItems: 200,
      itemsPerPage: 10,
      currentPage: 15,
    });
    fixture.detectChanges();

    const rightNumericCount = component
      .visiblePages()
      .filter(page => typeof page === 'number').length;

    expect(leftNumericCount).toBe(rightNumericCount);
  });

  it('getPageAriaCurrent should return "page" only for current page', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();
    expect(component.getPageAriaCurrent(2)).toBe('page');
    expect(component.getPageAriaCurrent(1)).toBeNull();
  });

  it('getPageAriaLabel should describe current vs other pages', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();
    expect(component.getPageAriaLabel(2)).toContain('página actual');
    expect(component.getPageAriaLabel(3)).toContain('Ir a la página 3');
  });

  it('onItemsPerPageChange should recompute totalPages and clamp current page', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 9,
    });
    fixture.detectChanges();
    const spy = jest.spyOn(component.pageChange, 'emit');

    component.onItemsPerPageChange('20');

    expect(component.selectedItemsPerPage()).toBe(20);
    expect(component.totalPages()).toBe(5);
    expect(component.currentPage()).toBe(5);
    expect(spy).toHaveBeenCalledWith(5);
  });

  it('onItemsPerPageChange should ignore invalid values', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();
    component.onItemsPerPageChange('0');
    expect(component.selectedItemsPerPage()).toBe(10);
  });

  describe('WCAG AA', () => {
    it('should wrap the pages in a <nav> landmark with an aria-label', () => {
      const nav = fixture.debugElement.query(By.css('nav.dcx-paginator__pages'));
      expect(nav).toBeTruthy();
      expect(nav.nativeElement.getAttribute('aria-label')).toBe(
        'Paginación de resultados',
      );
    });

    it('should give the icon navigation buttons an accessible label', () => {
      fixture.componentRef.setInput('paginator', {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 2,
      });
      fixture.componentRef.setInput('limitedButtons', true);
      fixture.detectChanges();

      const labels = fixture.debugElement
        .queryAll(By.css('nav.dcx-paginator__pages button'))
        .map(btn => btn.nativeElement.getAttribute('aria-label'));

      expect(labels).toContain('Primera página');
      expect(labels).toContain('Página anterior');
      expect(labels).toContain('Página siguiente');
      expect(labels).toContain('Última página');
      expect(labels).not.toContain('Button');
    });

    it('should mark the current page button with aria-current="page"', () => {
      fixture.componentRef.setInput('paginator', {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 2,
      });
      fixture.detectChanges();

      const current = fixture.debugElement.query(
        By.css('nav.dcx-paginator__pages button[aria-current="page"]'),
      );
      expect(current).toBeTruthy();
      expect(current.nativeElement.textContent).toContain('2');
    });

    it('should render only one aria-current button at a time', () => {
      fixture.componentRef.setInput('paginator', {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 3,
      });
      fixture.detectChanges();

      const current = fixture.debugElement.queryAll(
        By.css('button[aria-current="page"]'),
      );
      expect(current.length).toBe(1);
    });

    it('should disable the previous buttons natively on the first page', () => {
      fixture.componentRef.setInput('paginator', {
        totalItems: 50,
        itemsPerPage: 10,
        currentPage: 1,
      });
      fixture.componentRef.setInput('limitedButtons', true);
      fixture.detectChanges();

      const prev = fixture.debugElement.query(
        By.css('button[aria-label="Página anterior"]'),
      ).nativeElement as HTMLButtonElement;
      const first = fixture.debugElement.query(
        By.css('button[aria-label="Primera página"]'),
      ).nativeElement as HTMLButtonElement;

      expect(prev.disabled).toBe(true);
      expect(first.disabled).toBe(true);
    });

    it('should expose an accessible label on the items-per-page select', () => {
      fixture.componentRef.setInput('showItemsPerPageInfo', true);
      fixture.detectChanges();

      const select = fixture.debugElement.query(
        By.css('.dcx-paginator__size-select'),
      ).nativeElement as HTMLSelectElement;
      expect(select.getAttribute('aria-label')).toBe('Items por página');
    });
  });
});

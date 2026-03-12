import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('getButtonVariant should return primary for current page', () => {
    fixture.componentRef.setInput('paginator', {
      totalItems: 50,
      itemsPerPage: 10,
      currentPage: 2,
    });
    fixture.detectChanges();
    expect(component.getButtonVariant(2)).toBe('primary');
    expect(component.getButtonVariant(1)).toBe('secondary');
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
});

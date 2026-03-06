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
    expect(component.totalPages()).toBe(10); // 100 totalItems / 10 itemsPerPage
  });

  it('should emit pageChange when clicking a page number', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', { totalItems: 50, itemsPerPage: 10, currentPage: 1 });
    fixture.detectChanges();
    component.goToPage(3);
    expect(emitSpy).toHaveBeenCalledWith(3);
  });

  it('should emit pageChange when calling goToNext', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', { totalItems: 50, itemsPerPage: 10, currentPage: 2 });
    fixture.detectChanges();
    component.goToNext();
    expect(pageChangeSpy).toHaveBeenCalledWith(3);
  });

  it('should emit pageChange when calling goToPrevious', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', { totalItems: 50, itemsPerPage: 10, currentPage: 3 });
    fixture.detectChanges();
    component.goToPrevious();
    expect(pageChangeSpy).toHaveBeenCalledWith(2);
  });

  it('should disable previous on first page (hasPrevious false)', () => {
    fixture.componentRef.setInput('paginator', { totalItems: 50, itemsPerPage: 10, currentPage: 1 });
    fixture.detectChanges();
    expect(component.hasPrevious()).toBe(false);
  });

  it('should disable next on last page (hasNext false)', () => {
    fixture.componentRef.setInput('paginator', { totalItems: 50, itemsPerPage: 10, currentPage: 5 });
    fixture.detectChanges();
    expect(component.hasNext()).toBe(false);
  });

  it('should not go to previous when already on first page', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', { totalItems: 50, itemsPerPage: 10, currentPage: 1 });
    fixture.detectChanges();
    component.goToPrevious();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should not go to next when already on last page', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    fixture.componentRef.setInput('paginator', { totalItems: 50, itemsPerPage: 10, currentPage: 5 });
    fixture.detectChanges();
    component.goToNext();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('hasPrevious should be true when currentPage > 1', () => {
    fixture.componentRef.setInput('paginator', { totalItems: 50, itemsPerPage: 10, currentPage: 2 });
    fixture.detectChanges();
    expect(component.hasPrevious()).toBe(true);
  });

  it('hasNext should be true when currentPage < totalPages', () => {
    fixture.componentRef.setInput('paginator', { totalItems: 30, itemsPerPage: 10, currentPage: 1 });
    fixture.detectChanges();
    expect(component.hasNext()).toBe(true);
  });

  it('should compute totalPages correctly', () => {
    fixture.componentRef.setInput('paginator', { totalItems: 25, itemsPerPage: 10, currentPage: 1 });
    fixture.detectChanges();
    expect(component.totalPages()).toBe(3);
  });

  it('should emit totalPagesChange', () => {
    const spy = jest.spyOn(component.totalPagesChange, 'emit');
    fixture.componentRef.setInput('paginator', { totalItems: 40, itemsPerPage: 10, currentPage: 1 });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(4);
  });
});

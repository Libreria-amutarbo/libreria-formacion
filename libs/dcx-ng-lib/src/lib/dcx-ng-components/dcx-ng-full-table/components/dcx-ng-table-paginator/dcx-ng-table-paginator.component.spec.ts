import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgTablePaginatorComponent } from './dcx-ng-table-paginator.component';

describe('DcxNgTablePaginatorComponent', () => {
  let component: DcxNgTablePaginatorComponent;
  let fixture: ComponentFixture<DcxNgTablePaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTablePaginatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTablePaginatorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('length', 100);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Computed values', () => {
    it('should compute totalPages correctly', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      expect(component.totalPages()).toBe(10);
    });

    it('should compute totalPages with remainder', () => {
      fixture.componentRef.setInput('length', 95);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      expect(component.totalPages()).toBe(10);
    });

    it('should compute totalPages as 1 when length is 0', () => {
      fixture.componentRef.setInput('length', 0);
      fixture.detectChanges();
      expect(component.totalPages()).toBe(1);
    });

    it('should compute pages array', () => {
      fixture.componentRef.setInput('length', 30);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      expect(component.pages()).toEqual([0, 1, 2]);
    });

    it('should compute pageStart correctly', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageIndex', 2);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      expect(component.pageStart()).toBe(21);
    });

    it('should compute pageStart as 0 when length is 0', () => {
      fixture.componentRef.setInput('length', 0);
      fixture.detectChanges();
      expect(component.pageStart()).toBe(0);
    });

    it('should compute pageEnd correctly', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      expect(component.pageEnd()).toBe(10);
    });

    it('should compute pageEnd clamped to total length on last page', () => {
      fixture.componentRef.setInput('length', 95);
      fixture.componentRef.setInput('pageIndex', 9);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.detectChanges();
      expect(component.pageEnd()).toBe(95);
    });

    it('should compute rowsPerPageOptionsFormatted', () => {
      fixture.componentRef.setInput('pageSizeOptions', [5, 10, 25]);
      fixture.detectChanges();
      expect(component.rowsPerPageOptionsFormatted()).toEqual([
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 25, label: '25' },
      ]);
    });
  });

  describe('goToPage()', () => {
    it('should emit pageChange with clamped page number', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.detectChanges();

      const spy = jest.spyOn(component.pageChange, 'emit');
      component.goToPage(3);
      expect(spy).toHaveBeenCalledWith(3);
    });

    it('should clamp page to 0 when negative', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 2);
      fixture.detectChanges();

      const spy = jest.spyOn(component.pageChange, 'emit');
      component.goToPage(-5);
      expect(spy).toHaveBeenCalledWith(0);
    });

    it('should clamp page to max page', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 0);
      fixture.detectChanges();

      const spy = jest.spyOn(component.pageChange, 'emit');
      component.goToPage(50);
      expect(spy).toHaveBeenCalledWith(9);
    });

    it('should not emit when same page', () => {
      fixture.componentRef.setInput('length', 100);
      fixture.componentRef.setInput('pageSize', 10);
      fixture.componentRef.setInput('pageIndex', 3);
      fixture.detectChanges();

      const spy = jest.spyOn(component.pageChange, 'emit');
      component.goToPage(3);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onRowsPerPageSelect()', () => {
    it('should emit rowsPerPageChange with valid size', () => {
      const spy = jest.spyOn(component.rowsPerPageChange, 'emit');
      component.onRowsPerPageSelect(25);
      expect(spy).toHaveBeenCalledWith(25);
    });

    it('should emit 10 as fallback for invalid size', () => {
      const spy = jest.spyOn(component.rowsPerPageChange, 'emit');
      component.onRowsPerPageSelect('abc');
      expect(spy).toHaveBeenCalledWith(10);
    });

    it('should not emit when value is null', () => {
      const spy = jest.spyOn(component.rowsPerPageChange, 'emit');
      component.onRowsPerPageSelect(null);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should handle string number', () => {
      const spy = jest.spyOn(component.rowsPerPageChange, 'emit');
      component.onRowsPerPageSelect('20');
      expect(spy).toHaveBeenCalledWith(20);
    });
  });

  describe('Default input values', () => {
    it('should have default pageIndex 0', () => {
      expect(component.pageIndex()).toBe(0);
    });

    it('should have default pageSize 10', () => {
      expect(component.pageSize()).toBe(10);
    });

    it('should have default pageSizeOptions', () => {
      expect(component.pageSizeOptions()).toEqual([5, 10, 20]);
    });

    it('should have default rowsPerPageLabel', () => {
      expect(component.rowsPerPageLabel()).toBe('Filas:');
    });

    it('should have default show true', () => {
      expect(component.show()).toBe(true);
    });
  });
});

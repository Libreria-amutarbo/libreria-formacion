import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPaginatorComponent } from './dcx-ng-paginator.component';

// Asegurar que spyOn esté disponible globalmente
declare const jasmine: any;

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

  it('should emit pageChange when clicking a page number', () => {
    const emitSpy = jest.spyOn(component.pageChange, 'emit');
    component.totalPages = 5;
    component.currentPage = 1;
    fixture.detectChanges();

    component.goToPage(3);

    expect(emitSpy).toHaveBeenCalledWith(3);
  });

  it('should emit onNextPage and pageChange when clicking next', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    const onNextPageSpy = jest.spyOn(component.onNextPage, 'emit');
    component.totalPages = 5;
    component.currentPage = 2;
    fixture.detectChanges();

    component.goToNext();

    expect(pageChangeSpy).toHaveBeenCalledWith(3);
    expect(onNextPageSpy).toHaveBeenCalled();
  });

  it('should emit onPrevPage and pageChange when clicking previous', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    const onPrevPageSpy = jest.spyOn(component.onPrevPage, 'emit');
    component.totalPages = 5;
    component.currentPage = 3;
    fixture.detectChanges();

    component.goToPrevious();

    expect(pageChangeSpy).toHaveBeenCalledWith(2);
    expect(onPrevPageSpy).toHaveBeenCalled();
  });

  it('should disable previous button on first page', () => {
    component.currentPage = 1;
    component.totalPages = 5;

    expect(component.isPrevDisabled).toBeTruthy();
  });

  it('should disable next button on last page', () => {
    component.currentPage = 5;
    component.totalPages = 5;

    expect(component.isNextDisabled).toBeTruthy();
  });

  it('should not emit events when disabled', () => {
    const pageChangeSpy = jest.spyOn(component.pageChange, 'emit');
    component.disabled = true;
    component.currentPage = 2;
    component.totalPages = 5;

    component.goToNext();
    component.goToPrevious();
    component.goToPage(3);

    expect(pageChangeSpy).not.toHaveBeenCalled();
  });

  it('should display custom button texts', () => {
    component.prevButton = 'Atrás';
    component.nextButton = 'Adelante';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('.dcx-paginator__button');

    expect(buttons[0].textContent.trim()).toBe('Atrás');
    expect(buttons[1].textContent.trim()).toBe('Adelante');
  });
});

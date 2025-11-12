import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgPageTableComponent } from './dcx-ng-page-table.component';

describe('DcxNgPageTableComponent (Página de ejemplo)', () => {
  let component: DcxNgPageTableComponent;
  let fixture: ComponentFixture<DcxNgPageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear la página', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar 2 tablas con datos (Ejemplo 1 y Ejemplo 2)', () => {
    const sections = fixture.debugElement.queryAll(By.css('section'));
    expect(sections.length).toBe(2);

    const tbodyRowsEx1 = sections[0].queryAll(By.css('tbody tr'));
    const tbodyRowsEx2 = sections[1].queryAll(By.css('tbody tr'));

    expect(tbodyRowsEx1.length).toBeGreaterThan(0);
    expect(tbodyRowsEx2.length).toBeGreaterThan(0);
  });

  it('Ejemplo 1: ID inicia ascendente (defaultSort) y alterna al hacer click', () => {
    const sections = fixture.debugElement.queryAll(By.css('section'));
    const ex1 = sections[0];

    const ths = ex1.queryAll(By.css('thead th'));
    const idTh = ths[0].nativeElement as HTMLElement;

    expect(idTh.getAttribute('aria-sort')).toBe('ascending');

    let firstCell = ex1.query(By.css('tbody tr:first-child td:first-child'))
      .nativeElement as HTMLElement;
    expect(firstCell.textContent?.trim()).toBe('1');

    idTh.click();
    fixture.detectChanges();

    expect(idTh.getAttribute('aria-sort')).toBe('descending');
    firstCell = ex1.query(By.css('tbody tr:first-child td:first-child'))
      .nativeElement as HTMLElement;
    expect(firstCell.textContent?.trim()).toBe('6');

    idTh.click();
    fixture.detectChanges();
    expect(idTh.getAttribute('aria-sort')).toBe('none');
  });

  it('Ejemplo 2: aplica defaultSort en Precio (asc) al iniciar', () => {
    const sections = fixture.debugElement.queryAll(By.css('section'));
    const ex2 = sections[1];

    const ths = ex2.queryAll(By.css('thead th'));
    const priceTh = ths
      .map(de => de.nativeElement as HTMLTableCellElement)
      .find(th => (th.textContent || '').includes('Precio'))!;

    expect(priceTh.getAttribute('aria-sort')).toBe('ascending');

    const firstRowTds = ex2
      .queryAll(By.css('tbody tr:first-child td'))
      .map(de => de.nativeElement as HTMLTableCellElement);

    const priceIndex = ths.findIndex(de =>
      (de.nativeElement as HTMLElement).textContent?.includes('Precio'),
    );
    expect(priceIndex).toBeGreaterThanOrEqual(0);

    const priceCell = firstRowTds[priceIndex];
    expect(priceCell.textContent?.trim()).toBe('14.5');
  });
});
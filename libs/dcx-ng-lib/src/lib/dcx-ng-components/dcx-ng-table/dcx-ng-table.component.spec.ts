import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgTableComponent } from './dcx-ng-table.component';

describe('DcxNgTableComponent', () => {
  let component: DcxNgTableComponent;
  let fixture: ComponentFixture<DcxNgTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTableComponent);
    component = fixture.componentInstance;
  });

  function setInputs({
    headers,
    value,
    showGrid = false,
    showStripped = false,
    scroll = false,
    scrollHeight = '320px',
  }: any) {
    component.headers = headers;
    component.rows = value;
    component.showGrid = showGrid;
    component.showStripped = showStripped;
    component.scroll = scroll;
    component.scrollHeight = scrollHeight;
    fixture.detectChanges();
  }

  it('debe alternar aria-sort al hacer click en el header', () => {
    setInputs({
      headers: [
        { name: 'ID', key: 'id', type: 'number', sortable: true },
        { name: 'Nombre', key: 'name', type: 'string', sortable: true },
      ],
      value: [
        { id: 2, name: 'B' },
        { id: 1, name: 'A' },
      ],
    });

    const ths = fixture.debugElement.queryAll(By.css('thead th'));
    const firstTh = ths[0].nativeElement as HTMLTableCellElement;

    firstTh.click();
    fixture.detectChanges();
    expect(firstTh.getAttribute('aria-sort')).toBe('ascending');

    firstTh.click();
    fixture.detectChanges();
    expect(firstTh.getAttribute('aria-sort')).toBe('descending');

    firstTh.click();
    fixture.detectChanges();
    expect(firstTh.getAttribute('aria-sort')).toBe('none');
  });

  it('debe ordenar numéricamente en ascendente al primer click', () => {
    setInputs({
      headers: [{ name: 'ID', key: 'id', type: 'number', sortable: true }],
      value: [{ id: 3 }, { id: 1 }, { id: 2 }],
    });

    const th = fixture.debugElement.query(By.css('thead th'))
      .nativeElement as HTMLElement;
    th.click();
    fixture.detectChanges();

    const firstCell = fixture.debugElement.query(
      By.css('tbody tr:first-child td:first-child'),
    ).nativeElement as HTMLElement;

    expect(firstCell.textContent?.trim()).toBe('1');
  });

  it('debe aplicar clases de estilo: grid, striped y scroll', () => {
    setInputs({
      headers: [{ name: 'ID', key: 'id' }],
      value: [{ id: 1 }],
      showGrid: true,
      showStripped: true,
      scroll: true,
      scrollHeight: '200px',
    });

    const table = fixture.debugElement.query(By.css('table'))
      .nativeElement as HTMLTableElement;
    expect(table.classList.contains('grid')).toBe(true);
    expect(table.classList.contains('striped')).toBe(true);

    const wrapper = fixture.debugElement.query(By.css('.table-wrapper'))
      .nativeElement as HTMLElement;
    expect(wrapper.classList.contains('scroll')).toBe(true);
    expect(wrapper.style.maxHeight).toBe('200px');
  });

  it('debe respetar defaultSort al iniciar', () => {
    setInputs({
      headers: [
        {
          name: 'Nombre',
          key: 'name',
          type: 'string',
          sortable: true,
          defaultSort: 'asc',
        },
        { name: 'Estado', key: 'status', sortable: true },
      ],
      value: [{ name: 'Z' }, { name: 'A' }],
    });

    const ths = fixture.debugElement.queryAll(By.css('thead th'));
    const nameTh = ths[0].nativeElement as HTMLElement;
    expect(nameTh.getAttribute('aria-sort')).toBe('ascending');

    const firstCell = fixture.debugElement.query(
      By.css('tbody tr:first-child td:first-child'),
    ).nativeElement as HTMLElement;
    expect(firstCell.textContent?.trim()).toBe('A');
  });
});

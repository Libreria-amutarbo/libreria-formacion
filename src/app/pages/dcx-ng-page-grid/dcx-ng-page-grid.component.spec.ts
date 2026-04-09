import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageGridComponent } from './dcx-ng-page-grid.component';

describe('DcxNgPageGridComponent', () => {
  let component: DcxNgPageGridComponent;
  let fixture: ComponentFixture<DcxNgPageGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Basic Grid section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Basic Grid');
    expect(compiled.querySelectorAll('.grid-box').length).toBeGreaterThan(0);
  });

  it('should render the 12 columns distribution section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(
      '12 columns — example of distribution',
    );
    expect(compiled.querySelectorAll('.design-row').length).toBeGreaterThan(0);
  });

  it('should render the Different Column Sizes section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Different Column Sizes');
    expect(compiled.querySelector('.dcx-col--12')).toBeTruthy();
    expect(compiled.querySelector('.dcx-col--6')).toBeTruthy();
    expect(compiled.querySelector('.dcx-col--4')).toBeTruthy();
    expect(compiled.querySelector('.dcx-col--3')).toBeTruthy();
    expect(compiled.querySelector('.dcx-col--9')).toBeTruthy();
  });

  it('should render the Gap Variations section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Gap Variations');
    expect(compiled.querySelectorAll('.dcx-grid').length).toBeGreaterThan(2);
  });

  it('should render the Alignment Options section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Alignment Options');
    expect(compiled.querySelectorAll('.alignment-demo').length).toBeGreaterThan(
      0,
    );
  });

  it('should render the Complex Layout Example section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Complex Layout Example');
    expect(compiled.querySelector('.sidebar-box')).toBeTruthy();
  });

  it('should render the Buttons grid section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Grid con componentes (Buttons)');
    expect(compiled.querySelectorAll('dcx-ng-button').length).toBeGreaterThan(
      0,
    );
  });
});

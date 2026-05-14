import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageSkeletonComponent } from './dcx-ng-page-skeleton.component';

describe('DcxNgPageSkeletonComponent', () => {
  let component: DcxNgPageSkeletonComponent;
  let fixture: ComponentFixture<DcxNgPageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose list demo items', () => {
    expect(component.listItems).toEqual([1, 2, 3, 4]);
  });

  it('should render the main sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Rectángulos');
    expect(compiled.textContent).toContain('Placeholder de tarjeta');
    expect(compiled.textContent).toContain('Placeholder de lista');
    expect(compiled.textContent).toContain('Sin animación');
  });

  it('should render skeleton components in the page', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('dcx-ng-skeleton').length).toBeGreaterThan(
      0,
    );
  });
});

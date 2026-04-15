import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageScrollTopDownComponent } from './dcx-ng-page-scroll-top-down.component';

describe('DcxNgPageScrollTopDownComponent', () => {
  let component: DcxNgPageScrollTopDownComponent;
  let fixture: ComponentFixture<DcxNgPageScrollTopDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageScrollTopDownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageScrollTopDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose the demo content list', () => {
    expect(component.longContent.length).toBe(16);
  });

  it('should render the main sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Scroll Top Down');
    expect(compiled.textContent).toContain('Variantes visuales');
    expect(compiled.textContent).toContain('Scroll dentro de un panel');
    expect(compiled.textContent).toContain('Solo top / solo bottom');
  });

  it('should render scroll top down components in the page', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelectorAll('dcx-ng-scroll-top-down').length).toBeGreaterThan(0);
  });
});

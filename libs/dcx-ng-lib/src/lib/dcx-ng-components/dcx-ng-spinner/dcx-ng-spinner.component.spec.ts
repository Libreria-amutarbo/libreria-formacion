import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DcxNgSpinnerComponent } from './dcx-ng-spinner.component';

describe('DcxNgSpinnerComponent', () => {
  let component: DcxNgSpinnerComponent;
  let fixture: ComponentFixture<DcxNgSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.size).toBe('m');
    expect(component.wrapper).toBe(false);
    expect(component.delay).toBe(100);
    expect(component.label).toBeNull();
    expect(component.isVisible).toBe(false);
  });

  it('should set isVisible to true after delay', fakeAsync(() => {
    component.delay = 200;
    component.ngOnInit();
    expect(component.isVisible).toBe(false);
    
    tick(199);
    expect(component.isVisible).toBe(false);
    
    tick(1);
    expect(component.isVisible).toBe(true);
  }));

  it('should have correct classes and attributes when not in wrapper mode', () => {
    component.size = 'l';
    component.label = 'Loading data';
    component.isVisible = true;
    fixture.detectChanges();

    const spinnerElement = fixture.nativeElement.querySelector('.dcx-ng-spinner');
    expect(spinnerElement.classList.contains('dcx-ng-spinner--l')).toBe(true);
    expect(spinnerElement.getAttribute('role')).toBe('status');
    expect(spinnerElement.getAttribute('aria-label')).toBe('Loading data');

    const circleElement = fixture.nativeElement.querySelector('.dcx-ng-spinner__circle');
    expect(circleElement).toBeTruthy();

    const labelElement = fixture.nativeElement.querySelector('.dcx-ng-spinner__label');
    expect(labelElement.textContent.trim()).toBe('Loading data');
  });

  it('should have correct structure in wrapper mode', () => {
    component.wrapper = true;
    component.isVisible = true;
    fixture.detectChanges();

    const spinnerElement = fixture.nativeElement.querySelector('.dcx-ng-spinner');
    expect(spinnerElement.classList.contains('dcx-ng-spinner--wrapper')).toBe(true);

    const overlayElement = fixture.nativeElement.querySelector('.dcx-ng-spinner__overlay');
    expect(overlayElement).toBeTruthy();

    const circleElement = fixture.nativeElement.querySelector('.dcx-ng-spinner__overlay .dcx-ng-spinner__circle');
    expect(circleElement).toBeTruthy();
  });

  it('should project content when in wrapper mode', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DcxNgSpinnerComponent],
    }).overrideTemplate(
      DcxNgSpinnerComponent,
      `
      <div class="dcx-ng-spinner" [class.dcx-ng-spinner--wrapper]="true">
        <div id="projected">Projected Content</div>
        <div class="dcx-ng-spinner__overlay">
          <div class="dcx-ng-spinner__circle"></div>
        </div>
      </div>
      `
    );

    fixture = TestBed.createComponent(DcxNgSpinnerComponent);
    component = fixture.componentInstance;
    component.wrapper = true;
    component.isVisible = true;
    fixture.detectChanges();

    const projectedContent = fixture.nativeElement.querySelector('#projected');
    expect(projectedContent).toBeTruthy();
    expect(projectedContent.textContent).toBe('Projected Content');
  });

  it('should use default aria-label when no label is provided', () => {
    component.isVisible = true;
    fixture.detectChanges();

    const spinnerElement = fixture.nativeElement.querySelector('.dcx-ng-spinner');
    expect(spinnerElement.getAttribute('aria-label')).toBe('loading');
  });
});

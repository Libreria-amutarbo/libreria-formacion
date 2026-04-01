import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    expect(component.size()).toBe('m');
    expect(component.wrapper()).toBe(false);
    expect(component.delay()).toBe(1300);
    expect(component.color()).toBeNull();
    expect(component.title()).toBe('');
    expect(component.description()).toBe('');
  });

  it('should compute spinnerClasses with size', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    expect(component.spinnerClasses()).toContain('dcx-ng-spinner--l');
  });

  it('should compute spinnerClasses with wrapper', () => {
    fixture.componentRef.setInput('wrapper', true);
    fixture.detectChanges();
    expect(component.spinnerClasses()).toContain('dcx-ng-spinner--wrapper');
  });

  it('should compute spinnerClasses base class always present', () => {
    expect(component.spinnerClasses()).toContain('dcx-ng-spinner');
  });

  it('should compute aria label from title', () => {
    fixture.componentRef.setInput('title', 'Loading data');
    fixture.detectChanges();
    expect(component.computedAriaLabel()).toBe('Loading data');
  });

  it('should fallback aria label to "Loading" when no title', () => {
    fixture.componentRef.setInput('title', '');
    fixture.detectChanges();
    expect(component.computedAriaLabel()).toBe('Loading');
  });

  it('should compute hasContent as false when no title and no description', () => {
    expect(component.hasContent()).toBe(false);
  });

  it('should compute hasContent as true when title is set', () => {
    fixture.componentRef.setInput('title', 'Loading');
    fixture.detectChanges();
    expect(component.hasContent()).toBe(true);
  });

  it('should compute hasContent as true when description is set', () => {
    fixture.componentRef.setInput('description', 'Please wait');
    fixture.detectChanges();
    expect(component.hasContent()).toBe(true);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DcxNgToggleComponent } from './dcx-ng-toggle.component';
import { By } from '@angular/platform-browser';

describe('DcxNgToggleComponent', () => {
  let component: DcxNgToggleComponent;
  let fixture: ComponentFixture<DcxNgToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the toggle component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.checked()).toBe(false);
    expect(component.disabled()).toBe(false);
    expect(component.label()).toBeNull();
    expect(component.size()).toBe('m');
  });

  it('should render a native button element', () => {
    const button = fixture.debugElement.query(By.css('button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.getAttribute('role')).toBe('switch');
  });

  it('should toggle checked state when toggle() is called', () => {
    expect(component.checked()).toBe(false);
    component.toggle();
    expect(component.checked()).toBe(true);
    component.toggle();
    expect(component.checked()).toBe(false);
  });

  it('should toggle checked state on native click', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.toggle();
    expect(component.checked()).toBe(false);
  });

  it('should set the native disabled attribute', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should not toggle via a native click when the button is disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(false);
  });

  it('should emit toggled event with new value', () => {
    const spy = jest.fn();
    component.toggled.subscribe(spy);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should NOT emit toggled when disabled', () => {
    const spy = jest.fn();
    component.toggled.subscribe(spy);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.toggle();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--l');
  });

  it('should apply the xl size class', () => {
    fixture.componentRef.setInput('size', 'xl');
    fixture.detectChanges();
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--xl');
  });

  it('should handle empty size in sizeClasses', () => {
    fixture.componentRef.setInput('size', '');
    fixture.detectChanges();
    const classes = component.sizeClasses();
    expect(classes).toContain('dcx-ng-toggle');
    expect(classes).not.toContain('dcx-ng-toggle--m');
  });

  it('should show label when set', () => {
    fixture.componentRef.setInput('label', 'Toggle me');
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.dcx-ng-toggle__label'));
    expect(label.nativeElement.textContent).toContain('Toggle me');
  });

  it('should include textPosition class in sizeClasses', () => {
    fixture.componentRef.setInput('textPosition', 'right');
    fixture.detectChanges();
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--right');
  });

  it('should apply default textPosition', () => {
    expect(component.textPosition()).toBe('right');
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--right');
  });

  it('should apply left textPosition class', () => {
    fixture.componentRef.setInput('textPosition', 'left');
    fixture.detectChanges();
    expect(component.sizeClasses()).toContain('dcx-ng-toggle--left');
  });

  describe('accessible name (WCAG)', () => {
    it('should use ariaLabel when explicitly provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Custom toggle');
      fixture.detectChanges();
      expect(component.effectiveAriaLabel()).toBe('Custom toggle');
    });

    it('should fall back to the visible label when ariaLabel is not set', () => {
      fixture.componentRef.setInput('label', 'Dark mode');
      fixture.detectChanges();
      expect(component.effectiveAriaLabel()).toBe('Dark mode');

      const button: HTMLButtonElement =
        fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Dark mode');
    });

    it('should prefer ariaLabel over the visible label when both are set', () => {
      fixture.componentRef.setInput('label', 'Dark mode');
      fixture.componentRef.setInput('ariaLabel', 'Enable dark mode');
      fixture.detectChanges();
      expect(component.effectiveAriaLabel()).toBe('Enable dark mode');
    });

    it('should fall back to "Toggle" when neither ariaLabel nor label are set', () => {
      expect(component.effectiveAriaLabel()).toBe('Toggle');
    });
  });

  describe('ControlValueAccessor', () => {
    it('should update checked via writeValue', () => {
      component.writeValue(true);
      expect(component.checked()).toBe(true);
    });

    it('should call the registered onChange callback on toggle', () => {
      const spy = jest.fn();
      component.registerOnChange(spy);
      component.toggle();
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should call the registered onTouched callback on toggle', () => {
      const spy = jest.fn();
      component.registerOnTouched(spy);
      component.toggle();
      expect(spy).toHaveBeenCalled();
    });
  });
});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DcxNgToggleComponent],
  template: `
    <form [formGroup]="form">
      <dcx-ng-toggle formControlName="darkMode"></dcx-ng-toggle>
    </form>
  `,
})
class TestHostComponent {
  form = new FormGroup({
    darkMode: new FormControl(true),
  });
}

describe('DcxNgToggleComponent - CVA integration', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should reflect the FormControl initial value', () => {
    const button: HTMLButtonElement =
      hostFixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-checked')).toBe('true');
  });

  it('should update the FormControl when the toggle is clicked', () => {
    const button: HTMLButtonElement =
      hostFixture.nativeElement.querySelector('button');
    button.click();
    hostFixture.detectChanges();

    expect(hostComponent.form.get('darkMode')!.value).toBe(false);
  });

  it('should update the toggle when the FormControl value is patched', () => {
    hostComponent.form.patchValue({ darkMode: false });
    hostFixture.detectChanges();

    const button: HTMLButtonElement =
      hostFixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-checked')).toBe('false');
  });
});

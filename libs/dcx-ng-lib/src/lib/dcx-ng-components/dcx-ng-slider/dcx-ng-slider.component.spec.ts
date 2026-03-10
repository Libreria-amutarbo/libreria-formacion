import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { DcxNgSliderComponent } from './dcx-ng-slider.component';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';
import { SLIDER_DEFAULT_VALUES } from '../../core/mock';

describe('DcxNgSliderComponent', () => {
  let component: DcxNgSliderComponent;
  let fixture: ComponentFixture<DcxNgSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgSliderComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should have default showLabel', () => {
      expect(component.showLabel()).toBe(SLIDER_DEFAULT_VALUES.showLabel);
    });

    it('should have default textLabel', () => {
      expect(component.textLabel()).toBe(SLIDER_DEFAULT_VALUES.textLabel);
    });

    it('should have default value', () => {
      expect(component.value()).toBe(SLIDER_DEFAULT_VALUES.value);
    });

    it('should have default min', () => {
      expect(component.min()).toBe(SLIDER_DEFAULT_VALUES.min);
    });

    it('should have default max', () => {
      expect(component.max()).toBe(SLIDER_DEFAULT_VALUES.max);
    });

    it('should have default step', () => {
      expect(component.step()).toBe(SLIDER_DEFAULT_VALUES.step);
    });

    it('should have default vertical', () => {
      expect(component.vertical()).toBe(SLIDER_DEFAULT_VALUES.vertical);
    });
  });

  describe('signal inputs', () => {
    it('should update value input', () => {
      fixture.componentRef.setInput('value', 25);
      fixture.detectChanges();
      expect(component.value()).toBe(25);
    });

    it('should update min input', () => {
      fixture.componentRef.setInput('min', 10);
      fixture.detectChanges();
      expect(component.min()).toBe(10);
    });

    it('should update max input', () => {
      fixture.componentRef.setInput('max', 100);
      fixture.detectChanges();
      expect(component.max()).toBe(100);
    });

    it('should update step input', () => {
      fixture.componentRef.setInput('step', 5);
      fixture.detectChanges();
      expect(component.step()).toBe(5);
      expect(component.stepInput()).toBe(5);
    });

    it('should update vertical input', () => {
      fixture.componentRef.setInput('vertical', true);
      fixture.detectChanges();
      expect(component.vertical()).toBe(true);
    });

    it('should update showLabel input', () => {
      fixture.componentRef.setInput('showLabel', false);
      fixture.detectChanges();
      expect(component.showLabel()).toBe(false);
    });

    it('should update textLabel input', () => {
      fixture.componentRef.setInput('textLabel', 'Rango');
      fixture.detectChanges();
      expect(component.textLabel()).toBe('Rango');
    });
  });

  describe('template rendering', () => {
    it('should render label when showLabel is true', () => {
      fixture.componentRef.setInput('showLabel', true);
      fixture.componentRef.setInput('textLabel', 'Volume');
      fixture.detectChanges();
      const label = fixture.debugElement.query(
        By.css('.dcx-slider-value-label')
      );
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent).toContain('Volume');
    });

    it('should not render label when showLabel is false', () => {
      fixture.componentRef.setInput('showLabel', false);
      fixture.detectChanges();
      const label = fixture.debugElement.query(
        By.css('.dcx-slider-value-label')
      );
      expect(label).toBeNull();
    });

    it('should display current value in label', () => {
      fixture.componentRef.setInput('showLabel', true);
      fixture.componentRef.setInput('textLabel', 'Val');
      fixture.componentRef.setInput('value', 30);
      fixture.detectChanges();
      const label = fixture.debugElement.query(
        By.css('.dcx-slider-value-label')
      );
      expect(label.nativeElement.textContent).toContain('30');
    });

    it('should render dcx-ng-input child component', () => {
      const inputEl = fixture.debugElement.query(
        By.directive(DcxNgInputComponent)
      );
      expect(inputEl).toBeTruthy();
    });

    it('should render a range input element inside dcx-ng-input', () => {
      const rangeInput = fixture.debugElement.query(
        By.css('input[type=range]')
      );
      expect(rangeInput).toBeTruthy();
    });

    it('should pass min and max to the inner input', () => {
      fixture.componentRef.setInput('min', 5);
      fixture.componentRef.setInput('max', 80);
      fixture.detectChanges();
      const rangeInput = fixture.debugElement.query(
        By.css('input[type=range]')
      );
      expect(rangeInput.nativeElement.min).toBe('5');
      expect(rangeInput.nativeElement.max).toBe('80');
    });

    it('should pass value to the inner input', () => {
      fixture.componentRef.setInput('value', 20);
      fixture.detectChanges();
      const rangeInput = fixture.debugElement.query(
        By.css('input[type=range]')
      );
      expect(rangeInput.nativeElement.value).toBe('20');
    });

    it('should set width style based on vertical flag', () => {
      fixture.componentRef.setInput('vertical', true);
      fixture.detectChanges();
      const dcxInput = fixture.debugElement.query(
        By.directive(DcxNgInputComponent)
      );
      expect(dcxInput.styles['width.px'] || dcxInput.nativeElement.style.width)
        .toBeTruthy();
    });

    it('should pass orientation horizontal when vertical is false', () => {
      fixture.componentRef.setInput('vertical', false);
      fixture.detectChanges();
      const dcxInput = fixture.debugElement.query(
        By.directive(DcxNgInputComponent)
      );
      const inputComponent = dcxInput.componentInstance as DcxNgInputComponent;
      expect(inputComponent.orientation()).toBe('horizontal');
    });

    it('should pass orientation vertical when vertical is true', () => {
      fixture.componentRef.setInput('vertical', true);
      fixture.detectChanges();
      const dcxInput = fixture.debugElement.query(
        By.directive(DcxNgInputComponent)
      );
      const inputComponent = dcxInput.componentInstance as DcxNgInputComponent;
      expect(inputComponent.orientation()).toBe('vertical');
    });
  });

  describe('onInput', () => {
    it('should emit valueChange when onInput is called', () => {
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      component.onInput(25);
      expect(spy).toHaveBeenCalledWith(25);
    });

    it('should update valueInput signal', () => {
      component.onInput(42);
      expect(component.valueInput()).toBe(42);
    });

    it('should convert string value to number', () => {
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      component.onInput('15');
      expect(spy).toHaveBeenCalledWith(15);
      expect(component.valueInput()).toBe(15);
    });

    it('should handle null value', () => {
      const spy = jest.fn();
      component.valueChange.subscribe(spy);
      component.onInput(null);
      expect(spy).toHaveBeenCalledWith(0);
      expect(component.valueInput()).toBe(0);
    });

    it('should call onChange callback', () => {
      const onChangeSpy = jest.fn();
      component.registerOnChange(onChangeSpy);
      component.onInput(33);
      expect(onChangeSpy).toHaveBeenCalledWith(33);
    });

    it('should call onTouched callback', () => {
      const onTouchedSpy = jest.fn();
      component.registerOnTouched(onTouchedSpy);
      component.onInput(10);
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('ControlValueAccessor', () => {
    it('should write value via writeValue', () => {
      component.writeValue(35);
      expect(component.valueInput()).toBe(35);
    });

    it('should register onChange callback', () => {
      const fn = jest.fn();
      component.registerOnChange(fn);
      component.onInput(20);
      expect(fn).toHaveBeenCalledWith(20);
    });

    it('should register onTouched callback', () => {
      const fn = jest.fn();
      component.registerOnTouched(fn);
      component.onInput(10);
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('value clamping via effect', () => {
    it('should clamp value to min when value is below min', () => {
      fixture.componentRef.setInput('min', 10);
      fixture.componentRef.setInput('max', 50);
      fixture.componentRef.setInput('value', 5);
      fixture.detectChanges();
      expect(component.valueInput()).toBe(10);
    });

    it('should clamp value to max when value is above max', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 50);
      fixture.componentRef.setInput('value', 100);
      fixture.detectChanges();
      expect(component.valueInput()).toBe(50);
    });

    it('should keep value when within range', () => {
      fixture.componentRef.setInput('min', 0);
      fixture.componentRef.setInput('max', 50);
      fixture.componentRef.setInput('value', 25);
      fixture.detectChanges();
      expect(component.valueInput()).toBe(25);
    });
  });

  describe('stepInput computed', () => {
    it('should return step value from computed', () => {
      fixture.componentRef.setInput('step', 10);
      fixture.detectChanges();
      expect(component.stepInput()).toBe(10);
    });

    it('should update when step changes', () => {
      fixture.componentRef.setInput('step', 2);
      fixture.detectChanges();
      expect(component.stepInput()).toBe(2);
      fixture.componentRef.setInput('step', 5);
      fixture.detectChanges();
      expect(component.stepInput()).toBe(5);
    });
  });

  describe('integration with native range input', () => {
    it('should propagate value change from native input through dcx-ng-input', () => {
      const spy = jest.fn();
      component.valueChange.subscribe(spy);

      const rangeInput = fixture.debugElement.query(
        By.css('input[type=range]')
      );
      rangeInput.nativeElement.value = '30';
      rangeInput.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(30);
      expect(component.valueInput()).toBe(30);
    });

    it('should update label value after input event', () => {
      fixture.componentRef.setInput('showLabel', true);
      fixture.componentRef.setInput('textLabel', 'Val');
      fixture.detectChanges();

      const rangeInput = fixture.debugElement.query(
        By.css('input[type=range]')
      );
      rangeInput.nativeElement.value = '40';
      rangeInput.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const label = fixture.debugElement.query(
        By.css('.dcx-slider-value-label')
      );
      expect(label.nativeElement.textContent).toContain('40');
    });
  });

});

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, DcxNgSliderComponent],
  template: `
    <form [formGroup]="form">
      <dcx-ng-slider formControlName="slider"></dcx-ng-slider>
    </form>
  `,
})
class TestHostComponent {
  form = new FormGroup({
    slider: new FormControl(20),
  });
}

describe('DcxNgSliderComponent - CVA integration', () => {
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

  it('should create host component', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should reflect value input default when form control value is set without value binding', () => {
    // When using formControlName without [value] binding, the value input
    // signal stays at default (0). The effect syncs valueInput from value().
    const sliderEl = hostFixture.debugElement.query(
      By.directive(DcxNgSliderComponent)
    );
    const sliderComp = sliderEl.componentInstance as DcxNgSliderComponent;
    // writeValue was called with 20 by the form, but the effect that reads
    // the value() input (default 0) overrides it
    expect(sliderComp.valueInput()).toBe(0);
  });

  it('should update form control when slider value changes', () => {
    const rangeInput = hostFixture.debugElement.query(
      By.css('input[type=range]')
    );
    rangeInput.nativeElement.value = '35';
    rangeInput.nativeElement.dispatchEvent(new Event('input'));
    hostFixture.detectChanges();

    expect(hostComponent.form.get('slider')!.value).toBe(35);
  });

  it('should update slider when form control value is patched', () => {
    hostComponent.form.patchValue({ slider: 45 });
    hostFixture.detectChanges();
    const sliderEl = hostFixture.debugElement.query(
      By.directive(DcxNgSliderComponent)
    );
    const sliderComp = sliderEl.componentInstance as DcxNgSliderComponent;
    expect(sliderComp.valueInput()).toBe(45);
  });
});

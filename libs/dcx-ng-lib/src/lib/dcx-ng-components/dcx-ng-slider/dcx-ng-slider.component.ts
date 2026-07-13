import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  input,
  signal,
  effect,
  output,
  computed,
} from '@angular/core';
import {
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DcxInputType } from '../../core/interfaces';
import { SLIDER_DEFAULT_VALUES } from '../../core/defaults';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';

@Component({
  selector: 'dcx-ng-slider',
  standalone: true,
  imports: [ReactiveFormsModule, DcxNgInputComponent],
  templateUrl: './dcx-ng-slider.component.html',
  styleUrls: ['./dcx-ng-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgSliderComponent),
      multi: true,
    },
  ],
})
export class DcxNgSliderComponent implements ControlValueAccessor {
  showLabel = input(SLIDER_DEFAULT_VALUES.showLabel);
  textLabel = input(SLIDER_DEFAULT_VALUES.textLabel);
  readonly inputType = DcxInputType;

  value = input(SLIDER_DEFAULT_VALUES.value);
  valueInput = signal(0);

  min = input(SLIDER_DEFAULT_VALUES.min);

  max = input(SLIDER_DEFAULT_VALUES.max);

  step = input(SLIDER_DEFAULT_VALUES.step);
  vertical = input(SLIDER_DEFAULT_VALUES.vertical);
  disabled = input(SLIDER_DEFAULT_VALUES.disabled);
  ariaLabel = input<string | null>(null);
  valueSuffix = input<string>('');

  valueChange = output<number>();

  displayValue = computed(() => `${this.valueInput()}${this.valueSuffix()}`);

  effectiveAriaLabel = computed(
    () => this.ariaLabel() || (this.showLabel() ? this.textLabel() : null),
  );

  effectiveAriaValueText = computed(() =>
    this.valueSuffix() ? this.displayValue() : null,
  );

  progressPercent = computed(() => {
    const min = this.min();
    const max = this.max();
    const val = this.valueInput();
    if (max === min) return 100;
    return ((val - min) / (max - min)) * 100;
  });

  @HostBinding('class.vertical')
  get isVertical(): boolean {
    return this.vertical();
  }

  @HostBinding('style.--slider-progress')
  get sliderProgress(): string {
    return `${this.progressPercent()}%`;
  }

  private onChange: (value: number) => void = () => null;
  private onTouched: () => void = () => null;
  private cvaActive = false;

  constructor() {
    effect(() => {
      const external = this.value();
      if (this.cvaActive) return;
      this.valueInput.set(this.clamp(external));
    });
  }

  private clamp(value: number): number {
    return Math.min(Math.max(value, this.min()), this.max());
  }

  onInput(value: string | number | null): void {
    const newValue = Number(value);
    this.valueInput.set(newValue);
    this.valueChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(value: number): void {
    this.cvaActive = true;
    this.valueInput.set(this.clamp(value));
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

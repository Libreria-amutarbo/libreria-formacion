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
import {
  DcxInputType,
  DcxNgInputComponent,
  SLIDER_DEFAULT_VALUES,
} from '@dcx-ng-components/dcx-ng-lib';

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
  stepInput = computed<number>(() => {
    return this.step();
  });
  vertical = input(SLIDER_DEFAULT_VALUES.vertical);

  valueChange = output<number>();

  progressPercent = computed(() => {
    const min = this.min();
    const max = this.max();
    const val = this.valueInput();
    if (max === min) return 0;
    return ((val - min) / (max - min)) * 100;
  });

  @HostBinding('style.--slider-progress')
  get sliderProgress(): string {
    return `${this.progressPercent()}%`;
  }

  private onChange: (value: number) => void = () => { };
  private onTouched: () => void = () => { };

  constructor() {
    effect(() => {
      const external = this.value();
      this.valueInput.set(external);

      const min = this.min();
      const max = this.max();

      if (external < min) {
        this.valueInput.set(min);
        return;
      }

      if (external > max) {
        this.valueInput.set(max);
      }
    });
  }

  onInput(value: string | number | null): void {
    const newValue = Number(value);
    this.valueInput.set(newValue);
    this.valueChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(value: number): void {
    this.valueInput.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
  effect,
  output,
} from '@angular/core';
import {
  ReactiveFormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  DcxInputType,
  DcxNgInputComponent,
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
  readonly inputType = DcxInputType;

  value = input(0);
  valueInput = signal(0);

  formControlName = input('');
  min = input(0);
  max = input(50);
  maxInput = signal(50);
  step = input(1);
  vertical = input(false);
  sliderHeight = input('300');
  sliderWidth = input('100');

  valueChange = output<number>();

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    effect(() => {
      this.valueInput.set(this.value());
    });
    effect(() => {
      this.maxInput.set(this.max());
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

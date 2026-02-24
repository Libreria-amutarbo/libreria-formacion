import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DcxInputType, DcxNgInputComponent } from '@dcx-ng-components/dcx-ng-lib';


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
  @Input() value = 0;
  @Input() formControlName = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() vertical = false;

  @Output() valueChange = new EventEmitter<number>();

  private onChange: (value: number) => void = () => { };
  private onTouched: () => void = () => { };
  private isDisabled = false;

  get orientAttribute(): string | null {
    return this.vertical ? 'vertical' : null;
  }

  onInput(value: string | number | null): void {
    const newValue = Number(value);
    this.value = newValue;
    this.valueChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}

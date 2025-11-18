import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dcx-ng-slider',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  @Input() value: number = 0;
  @Input() formControlName: string = '';
  @Input() step: number = 1;
  @Input() vertical: boolean = false;

  @Output() valueChange = new EventEmitter<number>();

  private onChange: (value: number) => void = () => { };
  private onTouched: () => void = () => { };
  private isDisabled = false;

  get orientAttribute(): string | null {
    return this.vertical ? 'vertical' : null;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = Number(input.value);
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

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { DcxSize, DcxPosition } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-toggle.component.html',
  styleUrl: './dcx-ng-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgToggleComponent),
      multi: true,
    },
  ],
})
export class DcxNgToggleComponent implements ControlValueAccessor {
  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  label = input<string | null>(null);
  size = input<DcxSize>('m');
  ariaLabel = input<string | null>(null);
  textPosition = input<DcxPosition>('right');

  toggled = output<boolean>();

  effectiveAriaLabel = computed(
    () => this.ariaLabel() || this.label() || 'Toggle',
  );

  sizeClasses = computed(() =>
    [
      'dcx-ng-toggle',
      this.size() ? `dcx-ng-toggle--${this.size()}` : '',
      `dcx-ng-toggle--${this.textPosition()}`,
    ]
      .filter(Boolean)
      .join(' '),
  );

  private onChange: (value: boolean) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  toggle(): void {
    if (this.disabled()) return;

    const next = !this.checked();
    this.checked.set(next);
    this.toggled.emit(next);
    this.onChange(next);
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

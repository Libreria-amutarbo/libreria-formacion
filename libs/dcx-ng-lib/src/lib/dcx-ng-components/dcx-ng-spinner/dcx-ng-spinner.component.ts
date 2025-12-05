import { Component, computed, input } from '@angular/core';
import { DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-spinner',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-spinner.component.html',
  styleUrl: './dcx-ng-spinner.component.scss',
  host: {
    '[style.--dcx-spinner-delay]': 'delay() + "ms"',
    '[style.--dcx-spinner-color]': 'color() || null',
  },
})
export class DcxNgSpinnerComponent {
  // Inputs
  readonly size = input<DcxSize>('m');
  readonly wrapper = input<boolean>(false);
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly delay = input<number>(1300);
  readonly color = input<string | null>(null);

  // Computed classes
  readonly spinnerClasses = computed<string>(() => {
    const base = 'dcx-ng-spinner';
    const sizeValue = this.size();
    const wrapperValue = this.wrapper();

    return [
      base,
      `${base}--${sizeValue}`,
      wrapperValue ? `${base}--wrapper` : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly computedAriaLabel = computed<string>(() => {
    return this.title() || 'Loading';
  });

  readonly hasContent = computed<boolean>(() => {
    return !!(this.title() || this.description());
  });
}

import {
  Component,
  HostBinding,
  HostListener,
  computed,
  input,
  output,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DcxPosition,
  DcxSize,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-toggle.component.html',
  styleUrl: './dcx-ng-toggle.component.scss',
})
export class DcxNgToggleComponent {
  checked = model<boolean>(false);
  disabled = input<boolean>(false);
  label = input<string | null>(null);
  size = input<DcxSize>('m');
  ariaLabel = input<string | null>(null);
  textPosition = input<DcxPosition>('right');

  toggled = output<boolean>();

  @HostBinding('attr.aria-label')
  ariaLabelBinding = computed(() => this.ariaLabel() || 'Toggle');

  sizeClasses = computed(() =>
    [
      'dcx-ng-toggle',
      this.size() ? `dcx-ng-toggle--${this.size()}` : '',
      `dcx-ng-toggle--${this.textPosition()}`,
    ]
      .filter(Boolean)
      .join(' '),
  );

  toggle(): void {
    if (this.disabled()) return;

    const next = !this.checked();
    this.checked.set(next);
    this.toggled.emit(next);
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleKeyboardToggle(event: Event): void {
    if (!this.disabled()) {
      event.preventDefault();
      this.toggle();
    }
  }
}

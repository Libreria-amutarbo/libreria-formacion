import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxPosition, DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-toggle.component.html',
  styleUrl: './dcx-ng-toggle.component.scss',
})
export class DcxNgToggleComponent {
  @Input() checked = false;
  @Input() disabled = false;
  @Input() label: string | null = null;
  @Input() size: DcxSize = 'm';
  @Input() color = '#000';
  @Input() ariaLabel = '';
  @Input() textPosition: DcxPosition = DcxPosition.RIGHT;

  @Output() toggled = new EventEmitter<boolean>();

  @HostBinding('attr.aria-label') get ariaLabelBinding() {
    return this.ariaLabel || 'Toggle';
  }

  get sizeClasses(): string {
    return [
      'dcx-ng-toggle',
      this.size ? `dcx-ng-toggle--${this.size}` : '',
      `dcx-ng-toggle--${this.textPosition}`
    ].join(' ');
  }

  toggle(): void {
    if (this.disabled) return;
    this.checked = !this.checked;
    this.toggled.emit(this.checked);
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  handleKeyboardToggle(event: Event): void {
    if (!this.disabled) {
      event.preventDefault();
      this.toggle();
    }
  }
}

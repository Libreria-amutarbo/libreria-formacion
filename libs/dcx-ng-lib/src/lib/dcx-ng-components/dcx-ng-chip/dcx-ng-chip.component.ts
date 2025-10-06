import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input, Signal } from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
export type ThemeColors = 
  | 'primary' | 'secondary' | 'accent' 
  | 'primary-light' | 'primary-dark'
  | 'success' | 'warning' | 'error'
  | 'gray' | 'gray-light'
  | 'text-default' | 'text-secondary' | 'text-disabled' | 'text-inverse'
  | 'border' | 'border-light';

export type ChipType = 'label-only' | 'with-icon' | 'with-image';

interface DcxNgChipComponentInputs {
  label: Signal<string>;
  color: Signal<ThemeColors>;
  removable: Signal<boolean>;
  icon: Signal<string>;
  image: Signal<string>;
}

@Component({
  selector: 'dcx-ng-chip',
  standalone: true,
  imports: [CommonModule, DcxNgIconComponent],
  templateUrl: './dcx-ng-chip.component.html',
  styleUrl: './dcx-ng-chip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgChipComponent implements DcxNgChipComponentInputs {
  label = input<string>('');
  color = input<ThemeColors>('gray');
  removable = input<boolean>(false);
  icon = input<string>('');
  image = input<string>('');

  @Output() onRemove = new EventEmitter<void>();

  chipType = computed((): ChipType => {
    if (this.image()) return 'with-image';
    if (this.icon()) return 'with-icon';
    return 'label-only';
  });

  handleRemove(event: Event): void {
    event.stopPropagation();
    if (this.removable()) {
      this.onRemove.emit();
    }
  }
}
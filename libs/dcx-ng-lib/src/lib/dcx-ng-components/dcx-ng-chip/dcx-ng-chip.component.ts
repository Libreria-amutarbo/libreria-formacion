import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, computed, input, Signal } from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

export enum ThemeColors {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
  GRAY = 'gray',
  GRAY_LIGHT = 'gray-light'
}

export type ChipType = 'label-only' | 'with-icon' | 'with-image';

export type ThemeColorsType = `${ThemeColors}`;

interface DcxNgChipComponentInputs {
  label: Signal<string>;
  color: Signal<ThemeColorsType>;
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
  color = input<ThemeColorsType>(ThemeColors.PRIMARY);
  removable = input<boolean>(false);
  icon = input<string>('');
  image = input<string>('');

  @Output() onRemove = new EventEmitter<void>();

  chipType = computed((): ChipType => {
    if (this.image()) return 'with-image';
    if (this.icon()) return 'with-icon';
    return 'label-only';
  });

  readonly ThemeColors = ThemeColors;
  readonly ChipTypeValues = {
    WITH_ICON: 'with-icon' as const,
    WITH_IMAGE: 'with-image' as const
  };

  handleRemove(event: Event): void {
    event.stopPropagation();
    if (this.removable()) {
      this.onRemove.emit();
    }
  }
}
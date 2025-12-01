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
export enum ChipTypeValues {
  LABEL_ONLY = 'label-only',
  WITH_ICON = 'with-icon',
  WITH_IMAGE = 'with-image'
};

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

  readonly ThemeColors = ThemeColors;
  readonly ChipTypeValues = ChipTypeValues;

  chipType = computed((): ChipType => {
    if (this.image()) return ChipTypeValues.WITH_IMAGE;
    if (this.icon()) return ChipTypeValues.WITH_ICON;
    return ChipTypeValues.LABEL_ONLY;
  });

  get chipClasses(): string {
    return `dcx-ng-chip--${this.color()}`;
  }

  handleRemove(event: Event): void {
    event.stopPropagation();
    if (this.removable()) {
      this.onRemove.emit();
    }
  }
}
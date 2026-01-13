import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import {
  ChipType,
  ChipTypeValues,
  DcxNgChipComponentInputs,
  ThemeColors,
  ThemeColorsType,
  ChipVariant,
} from '../../core/interfaces';
import { DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';

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
  variant = input<ChipVariant>('choice');

  @Output() removeChip = new EventEmitter<void>();

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
    if (this.variant() === 'filter') {
      this.removeChip.emit();
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    const key = event.key;
    if (
      (key === 'Enter' ||
        key === ' ' ||
        key === 'Delete' ||
        key === 'Backspace') &&
      this.variant() === 'filter'
    ) {
      event.preventDefault();
      this.removeChip.emit();
    }
  }
}

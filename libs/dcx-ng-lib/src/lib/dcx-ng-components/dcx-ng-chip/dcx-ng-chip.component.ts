import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, Output } from '@angular/core';
import { ChipType, ChipTypeValues, DcxNgChipComponentInputs, ThemeColors, ThemeColorsType } from '../../core/interfaces';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

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
  variant = input<ChipVariantType>('choice');

  //comment

  //Output que avisa si se borra el chip
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
    if (this.removable()) {
      this.removeChip.emit();
    }
  }
}
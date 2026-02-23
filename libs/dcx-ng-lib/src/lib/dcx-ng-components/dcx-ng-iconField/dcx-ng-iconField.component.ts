import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  input,
  output,
} from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxPosition, DcxSize } from '../../core/interfaces';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';

@Component({
  selector: 'dcx-ng-icon-field',
  standalone: true,
  imports: [DcxNgIconComponent, DcxNgInputComponent],
  templateUrl: './dcx-ng-iconField.component.html',
  styleUrls: ['./dcx-ng-iconField.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DcxNgIconFieldComponent {
  placeholder = input('');
  iconPosition = input<DcxPosition>('left');
  @Input() iconLeft = '';
  @Input() iconRight = '';
  iconName = input('');
  iconSize = input<DcxSize>('m');
  disabled = input(false);

  valueChange = output<string>();
  focusIconField = output();
  blurIconField = output();

  value = '';

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }

  onFocus() {
    this.focusIconField.emit();
  }

  onBlur() {
    this.blurIconField.emit();
  }
}

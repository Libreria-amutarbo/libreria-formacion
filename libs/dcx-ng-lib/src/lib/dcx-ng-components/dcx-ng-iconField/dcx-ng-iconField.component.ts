import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-icon-field',
  standalone: true,
  imports: [DcxNgIconComponent],
  templateUrl: './dcx-ng-iconField.component.html',
  styleUrls: ['./dcx-ng-iconField.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DcxNgIconFieldComponent {
  @Input() placeholder = '';
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() iconSize: DcxSize = 'm';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() focusIconField = new EventEmitter<void>();
  @Output() blurIconField = new EventEmitter<void>();

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

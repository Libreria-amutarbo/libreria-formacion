import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

type IconSize = 's' | 'm' | 'l' | 'xl';

@Component({
  selector: 'dcx-ng-icon-field',
  standalone: true,
  imports: [DcxNgIconComponent],
  templateUrl: './dcx-ng-iconField.component.html',
  styleUrls: ['./dcx-ng-iconField.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DcxNgIconFieldComponent {
  @Input() placeholder: string = '';
  @Input() iconLeft: string = '';
  @Input() iconRight: string = '';
  @Input() iconSize: IconSize = 'm';
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  value: string = '';

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }

  onFocus() {
    this.focus.emit();
  }

  onBlur() {
    this.blur.emit();
  }
}

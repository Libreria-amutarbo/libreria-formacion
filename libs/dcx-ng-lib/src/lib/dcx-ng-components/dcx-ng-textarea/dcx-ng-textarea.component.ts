import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  computed,
  Component,
  ElementRef,
  input,
  model,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { FloatLabelVariant, TextareaSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-textarea',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-textarea.component.html',
  styleUrls: ['./dcx-ng-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgTextareaComponent implements AfterViewInit {
  @ViewChild('textareaRef', { static: true })
  textareaRef!: ElementRef<HTMLTextAreaElement>;

  value = model<string>('');
  rows = input<number>(5);
  cols = input<number>(30);
  placeholder = input<string>('');
  disabled = input(false, {
    transform: booleanAttribute,
  });
  readonly = input(false, {
    transform: booleanAttribute,
  });
  autoResize = input(false, {
    transform: booleanAttribute,
  });
  floatLabel = input<FloatLabelVariant | undefined>(undefined);
  label = input<string>('');
  size = input<TextareaSize>('normal');
  fluid = input(false, {
    transform: booleanAttribute,
  });
  filled = input(false, {
    transform: booleanAttribute,
  });
  invalid = input(false, {
    transform: booleanAttribute,
  });
  errorMessage = input<string>('');

  focused = signal(false);

  textareaClasses = computed(() => {
    return [
      'dcx-ng-textarea__control',
      this.autoResize() && `dcx-ng-textarea__control--autoresize`,
      this.size() !== 'normal' && `dcx-ng-textarea__control--${this.size()}`,
      this.filled() && `dcx-ng-textarea__control--filled`,
      this.invalid() && `dcx-ng-textarea__control--invalid`,
    ]
      .filter(Boolean)
      .join(' ');
  });

  wrapperClasses = computed(() => {
    return [
      'dcx-ng-textarea__wrapper',
      this.fluid() && 'dcx-ng-textarea__wrapper--fluid',
      this.floatLabel() && 'dcx-ng-textarea__wrapper--float',
      this.floatLabel() && `dcx-ng-textarea__wrapper--${this.floatLabel()}`,
      this.floatLabel() && this.focused() && 'dcx-ng-textarea__wrapper--active',
    ]
      .filter(Boolean)
      .join(' ');
  });

  valueChange = output<string>();

  ngAfterViewInit(): void {
    this.syncTextareaSize();
  }

  onInput = (event: Event): void => {
    const target = event.target as HTMLTextAreaElement | null;
    if (!target) return;

    const newValue = target.value;
    this.value.set(newValue);
    this.valueChange.emit(newValue);
    this.syncTextareaSize();
  };

  onFocus = (): void => {
    this.focused.set(true);
  };

  onBlur = (): void => {
    this.focused.set(false);
  };

  private syncTextareaSize = (): void => {
    const textarea = this.textareaRef?.nativeElement;
    if (!textarea) return;

    if (!this.autoResize()) {
      textarea.style.height = '';
      return;
    }

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };
}

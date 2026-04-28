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
import { FloatLabelVariant } from '../../core/interfaces';

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

  focused = signal(false);

  textareaClasses = computed(() => {
    const baseClass = 'dcx-ng-textarea__control';
    if (!this.autoResize()) return baseClass;
    return `${baseClass} ${baseClass}--autoresize`;
  });

  wrapperClasses = computed(() => {
    const classes = ['dcx-ng-textarea__wrapper'];
    if (this.floatLabel()) {
      classes.push('dcx-ng-textarea__wrapper--float');
      classes.push(`dcx-ng-textarea__wrapper--${this.floatLabel()}`);
      if (this.focused()) {
        classes.push('dcx-ng-textarea__wrapper--active');
      }
    }
    return classes.join(' ');
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

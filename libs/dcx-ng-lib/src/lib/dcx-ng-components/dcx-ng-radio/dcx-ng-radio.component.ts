import { Component, Input, signal, computed, effect, ChangeDetectorRef, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DcxSize } from '../../core/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dcx-ng-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dcx-ng-radio.component.html',
  styleUrl: './dcx-ng-radio.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DcxNgRadioComponent,
      multi: true,
    },
  ],
})
export class DcxNgRadioComponent implements ControlValueAccessor {

  @Input() name = '';
  @Input() value: string | null = null;
  @Input() label: string | null = null;
  @Input() size: DcxSize = 'l';
  @Input() ariaLabel = '';


  private nameSignal = signal<string>('');
  private valueSignal = signal<string | null>(null);
  private labelSignal = signal<string | null>(null);
  private sizeSignal = signal<DcxSize>('l');
  private ariaLabelSignal = signal<string>('');

  @Input()
  set unstyled(value: boolean) {
    this.unstyledSignal.set(value);
  }
  get unstyled(): boolean {
    return this.unstyledSignal();
  }
  private unstyledSignal = signal<boolean>(false);

  @Input()
  set error(value: boolean) {
    this.errorSignal.set(value);
  }
  get error(): boolean {
    return this.errorSignal();
  }
  private errorSignal = signal<boolean>(false);

  @Input()
  set hover(value: boolean) {
    this.hoverSignal.set(value);
  }
  get hover(): boolean {
    return this.hoverSignal();
  }
  private hoverSignal = signal<boolean>(false);

  @Input()
  set focus(value: boolean) {
    this.focusSignal.set(value);
  }
  get focus(): boolean {
    return this.focusSignal();
  }
  private focusSignal = signal<boolean>(false);

  @Input()
  set disabled(value: boolean) {
    this.disabledSignal.set(value);
    this.updateDisabledState(value);
  }
  get disabled(): boolean {
    return this.disabledSignal();
  }
  private disabledSignal = signal<boolean>(false);


  readonly formControl = new FormControl<string | null>(null);


  private onChange: (value: string | null) => void = () => { };
  private onTouched: () => void = () => { };

  private readonly cdr = inject(ChangeDetectorRef);


  get isChecked(): boolean {
    return this.formControl.value === this.value;
  }

  get sizeClass(): string {
    return `dcx-ng-radio--${this.size}`;
  }

  get ariaLabelBinding(): string {
    return this.ariaLabel || 'Radio button';
  }

  constructor() {

    this.formControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(value => this.onChange(value));
  }

  onInputChange(value: string | null): void {
    if (!this.disabled) {
      this.formControl.setValue(value);
    }
  }


  writeValue(value: string | null): void {
    this.formControl.setValue(value, { emitEvent: false });
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  private updateDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable({ emitEvent: false });
    } else {
      this.formControl.enable({ emitEvent: false });
    }
    this.cdr.markForCheck();
  }
}
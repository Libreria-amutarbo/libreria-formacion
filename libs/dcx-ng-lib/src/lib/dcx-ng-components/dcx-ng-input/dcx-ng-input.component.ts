import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DcxSize } from '../../core/interfaces';
import { DcxInputErrorMessage, DcxInputType } from '../../core/interfaces/input';

@Component({
  selector: 'dcx-ng-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dcx-ng-input.component.html',
  styleUrls: ['./dcx-ng-input.component.scss'],
})
export class DcxNgInputComponent implements OnInit, OnChanges, OnDestroy {
  @Input() readonly = false;
  @Input() type: DcxInputType = DcxInputType.TEXT;
  @Input() placeholder: string | null = null;
  @Input() size: DcxSize = 'm';
  @Input() disabled = false;
  @Input() required = false;

  @Input() label: string | null = null;
  @Input() errorMessages: DcxInputErrorMessage[] = [];
  @Input() noMargin = false;
  @Input() inline = false;
  @Input() search = false;
  @Input()
  set value(val: string) {
    if (this.inputControl) {
      this.inputControl.setValue(val, { emitEvent: false });
    }
  }

  @Output() valueChange = new EventEmitter<string | null>();

  inputControl: FormControl = new FormControl('');
  isFocused = false;
  inputId: string;
  private destroy$ = new Subject<void>();

  constructor() {
    this.inputId = `dcx-input-${Math.random().toString(36).substr(2, 9)}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.setupFormControl();
    this.setupValueChanges();
  }

  setupFormControl() {
    const validators = [];
    if (this.type === DcxInputType.EMAIL) {
      validators.push(Validators.email);
    }
    if (this.type === DcxInputType.NUMBER) {
      validators.push(Validators.pattern(/^-?(?:\d+(?:\.\d+)?|\.\d+)$/));
    }

    if (this.required) {
      validators.push(Validators.required);
    }

    this.inputControl = new FormControl('', validators);

    if (this.disabled) {
      this.inputControl.disable();
    }
  }

  private setupValueChanges() {
    this.inputControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.valueChange.emit(value);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['required'] || changes['type'] || changes['disabled']) {
      this.setupFormControl();
    }
  }

  getErrorMessage(): string | null {
    if (!this.inputControl.errors) {
      return null;
    }

    const value = this.inputControl.value;
    if (value && value.trim() !== '') {
      if (this.inputControl.hasError('pattern') && this.type === DcxInputType.NUMBER) {
        return this.errorMessages.find(msg => msg.type === 'pattern')?.message || 'Formato numérico inválido';
      }

      if (this.inputControl.hasError('email')) {
        return this.errorMessages.find(msg => msg.type === 'email')?.message || 'Formato correo inválido';
      }
    }

    if (this.inputControl.hasError('required')) {
      return this.errorMessages.find(msg => msg.type === 'required')?.message || 'Campo obligatorio';
    }

    return null;
  }
}

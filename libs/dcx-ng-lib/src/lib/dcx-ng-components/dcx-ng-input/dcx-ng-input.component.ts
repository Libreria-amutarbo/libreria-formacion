import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export enum InputType {
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PASSWORD = 'password',
  SEARCH = 'search',
  TEL = 'tel',
  URL = 'url'
}

export enum InputSize {
  SMALL = 's',
  MEDIUM = 'm',
  LARGE = 'l',
  EXTRA_LARGE = 'xl',
  AUTO = 'auto'
}

export interface ErrorMessage {
  type: string;
  message: string;
}

@Component({
  selector: 'dcx-ng-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dcx-ng-input.component.html',
  styleUrls: ['./dcx-ng-input.component.scss'],
})
export class DcxNgInputComponent implements OnInit, OnChanges, OnDestroy {

  @Input() type: InputType = InputType.TEXT;
  @Input() placeholder: string | null = null;
  @Input() size: InputSize = InputSize.MEDIUM;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() label: string | null = null;
  @Input() errorMessages: ErrorMessage[] = [];
  set value(val: string) {
    if (this.inputControl) {
      this.inputControl.setValue(val, { emitEvent: false });
    }
  }

  @Output() valueChange = new EventEmitter<string | null>();

  inputControl: FormControl = new FormControl('');
  isFocused: boolean = false;
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
    
    // Agregar validadores de formato primero para que tengan prioridad
    if (this.type === InputType.EMAIL) {
      validators.push(Validators.email);
    }
    if (this.type === InputType.NUMBER) {
      // Patrón más estricto que no permite números terminados en punto decimal
      validators.push(Validators.pattern(/^-?(?:\d+(?:\.\d+)?|\.\d+)$/));
    }
    
    // Agregar required al final para que los errores de formato tengan prioridad
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
    
    // Si hay contenido pero es inválido, priorizar errores de formato
    if (value && value.trim() !== '') {
      console.log(value);
      if (this.inputControl.hasError('pattern') && this.type === InputType.NUMBER) {
        return this.errorMessages.find(msg => msg.type === 'pattern')?.message || 'Formato numérico inválido';
      }
      if (this.inputControl.hasError('email')) {
        return this.errorMessages.find(msg => msg.type === 'email')?.message || 'Formato correo inválido';
      }
    }
    
    // Si está vacío o solo tiene espacios, mostrar error required
    if (this.inputControl.hasError('required')) {
      return this.errorMessages.find(msg => msg.type === 'required')?.message || 'Campo obligatorio';
    }
    
    return null;
  }
}

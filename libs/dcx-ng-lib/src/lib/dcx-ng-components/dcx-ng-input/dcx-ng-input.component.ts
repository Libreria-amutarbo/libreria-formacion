import {
  Component,
  computed,
  effect,
  input,
  output,
  Signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DcxSize } from '../../core/interfaces';
import {
  DcxInputErrorMessage,
  DcxInputType,
} from '../../core/interfaces/input';

@Component({
  selector: 'dcx-ng-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dcx-ng-input.component.html',
  styleUrls: ['./dcx-ng-input.component.scss'],
})
export class DcxNgInputComponent {
  // -----------------------
  // Inputs con signals()
  // -----------------------
  readonly = input(false);
  type = input<DcxInputType>(DcxInputType.TEXT);
  placeholder = input<string | null>(null);
  size = input<DcxSize>('m');
  disabled = input(false);
  required = input(false);

  label = input<string | null>(null);
  errorMessages = input<DcxInputErrorMessage[]>([]);
  noMargin = input(false);
  inline = input(false);
  search = input(false);

  // Valor externo
  value = input<string>('');

  // Output con signal-based output()
  valueChange = output<string | null>();

  // ---------------------------------------
  // FormControl (aún necesario en Angular 20)
  // ---------------------------------------
  inputControl = new FormControl<string | null>('');

  // Id único
  inputId = `dcx-input-${Math.random().toString(36).substring(2, 9)}`;

  isFocused = false;

  constructor() {
    // Reconfigurar validators cuando cambian signals
    effect(() => {
      const validators = [];

      if (this.type() === DcxInputType.EMAIL) {
        validators.push(Validators.email);
      }

      if (this.type() === DcxInputType.NUMBER) {
        validators.push(Validators.pattern(/^-?(?:\d+(?:\.\d+)?|\.\d+)$/));
      }

      if (this.required()) {
        validators.push(Validators.required);
      }

      this.inputControl.setValidators(validators);

      if (this.disabled()) {
        this.inputControl.disable();
      } else {
        this.inputControl.enable();
      }
    });

    // Cuando value() cambia desde fuera → actualizar formControl
    effect(() => {
      const newValue = this.value();
      if (newValue !== this.inputControl.value) {
        this.inputControl.setValue(newValue, { emitEvent: false });
      }
    });

    // Emitir cambios del FormControl → hacia fuera
    this.inputControl.valueChanges.subscribe(v => {
      this.valueChange.emit(v);
    });
  }

  // -----------------------------
  // Mensaje de error computado
  // -----------------------------
  errorMessage: Signal<string | null> = computed(() => {
    const errors = this.inputControl.errors;
    if (!errors) return null;

    const errorList = this.errorMessages();

    if (errors['required']) {
      return (
        errorList.find(e => e.type === 'required')?.message ??
        'Campo obligatorio'
      );
    }

    if (errors['email']) {
      return (
        errorList.find(e => e.type === 'email')?.message ??
        'Formato correo inválido'
      );
    }

    if (errors['pattern'] && this.type() === DcxInputType.NUMBER) {
      return (
        errorList.find(e => e.type === 'pattern')?.message ??
        'Formato numérico inválido'
      );
    }

    return null;
  });
}

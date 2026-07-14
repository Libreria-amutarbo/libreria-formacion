import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DcxNgRadioComponent, DcxRadioOption } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-radio',
  standalone: true,
  imports: [ReactiveFormsModule, DcxNgRadioComponent],
  templateUrl: './dcx-ng-page-radio.component.html',
  styleUrl: './dcx-ng-page-radio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageRadioComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  formulario!: FormGroup;

  readonly opcionesColor: DcxRadioOption[] = [
    { value: 'azul', label: 'Azul' },
    { value: 'rojo', label: 'Rojo' },
    { value: 'verde', label: 'Verde' },
  ];

  readonly opcionesBebida: DcxRadioOption[] = [
    { value: 'cafe', label: 'Café' },
    { value: 'te', label: 'Té' },
    { value: 'ninguno', label: 'Ninguno' },
  ];

  readonly opcionesConDisabled: DcxRadioOption[] = [
    { value: 'basico', label: 'Básico' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise (no disponible)', disabled: true },
  ];

  readonly opcionesSuscripcion: DcxRadioOption[] = [
    { value: 'mensual', label: 'Plan mensual' },
    { value: 'anual', label: 'Plan anual' },
  ];

  readonly opcionesTerminos: DcxRadioOption[] = [
    { value: 'si', label: 'Sí' },
    { value: 'no', label: 'No' },
  ];

  get tamanioControl(): FormControl {
    return this.formulario.get('tamanioControl') as FormControl;
  }

  get colorControl(): FormControl {
    return this.formulario.get('colorControl') as FormControl;
  }

  get bebidaControl(): FormControl {
    return this.formulario.get('bebidaControl') as FormControl;
  }

  get disabledOptionControl(): FormControl {
    return this.formulario.get('disabledOptionControl') as FormControl;
  }

  get disabledGroupControl(): FormControl {
    return this.formulario.get('disabledGroupControl') as FormControl;
  }

  get hintControl(): FormControl {
    return this.formulario.get('hintControl') as FormControl;
  }

  get errorControl(): FormControl {
    return this.formulario.get('errorControl') as FormControl;
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      tamanioControl: [''],
      colorControl: [''],
      bebidaControl: [''],
      disabledOptionControl: [''],
      disabledGroupControl: [{ value: '', disabled: true }],
      hintControl: [''],
      errorControl: [''],
    });
  }
}

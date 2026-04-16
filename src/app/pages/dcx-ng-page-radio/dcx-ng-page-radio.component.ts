import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DcxNgRadioComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DcxNgRadioComponent],
  templateUrl: './dcx-ng-page-radio.component.html',
  styleUrl: './dcx-ng-page-radio.component.scss',
})
export class DcxNgPageRadioComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  formulario!: FormGroup;
  resumen = false;

  get tamanioControl(): FormControl {
    return this.formulario.get('tamanioControl') as FormControl;
  }

  get colorControl(): FormControl {
    return this.formulario.get('colorControl') as FormControl;
  }

  get bebidaControl(): FormControl {
    return this.formulario.get('bebidaControl') as FormControl;
  }

  get errorControl(): FormControl {
    return this.formulario.get('errorControl') as FormControl;
  }

  get hoverControl(): FormControl {
    return this.formulario.get('hoverControl') as FormControl;
  }

  get focusControl(): FormControl {
    return this.formulario.get('focusControl') as FormControl;
  }

  get disabledControl(): FormControl {
    return this.formulario.get('disabledControl') as FormControl;
  }

  get unstyledControl(): FormControl {
    return this.formulario.get('unstyledControl') as FormControl;
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      tamanioControl: [''],
      colorControl: [''],
      bebidaControl: [''],
      errorControl: [''],
      hoverControl: [''],
      focusControl: [''],
      disabledControl: [{ value: '', disabled: true }],
      unstyledControl: ['']
    });
  }

  mostrarResumen() {
    this.resumen = true;
  }
}

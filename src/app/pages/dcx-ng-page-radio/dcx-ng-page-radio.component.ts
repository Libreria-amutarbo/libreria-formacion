import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgRadioComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-radio/dcx-ng-radio.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dcx-ng-page-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DcxNgRadioComponent],
  templateUrl: './dcx-ng-page-radio.component.html',
  styleUrl: './dcx-ng-page-radio.component.scss',
})
export class DcxNgPageRadioComponent implements OnInit {
  formulario!: FormGroup;
  resumen = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      tamanioControl: new FormControl(''),
      colorControl: new FormControl(''),
      bebidaControl: new FormControl('')
    });
  }

  mostrarResumen() {
    this.resumen = true;
  }

  get tamanioControl(): FormControl {
  return this.formulario.get('tamanioControl') as FormControl;
}
get colorControl(): FormControl {
  return this.formulario.get('colorControl') as FormControl;
}
get bebidaControl(): FormControl {
  return this.formulario.get('bebidaControl') as FormControl;
}
}

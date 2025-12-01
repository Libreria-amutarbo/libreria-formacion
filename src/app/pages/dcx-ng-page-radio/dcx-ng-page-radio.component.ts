import { Component, inject, OnInit } from '@angular/core';
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
  private readonly fb = inject(FormBuilder);
  formulario!: FormGroup;
  resumen = false;

  get tamanioControl(): FormControl {
    return this.formulario.get('size') as FormControl;
  }

  get colorControl(): FormControl {
    return this.formulario.get('color') as FormControl;
  }

  get bebidaControl(): FormControl {
    return this.formulario.get('drink') as FormControl;
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      size: [''],
      color: [''],
      drink: ['']
    });
  }

  mostrarResumen() {
    this.resumen = true;
  }
}

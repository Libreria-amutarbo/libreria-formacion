import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DcxNgSelectComponent } from '@dcx-ng-components/dcx-ng-lib';
import { DcxSelectOptions } from 'libs/dcx-ng-lib/src/lib/core/interfaces/select';

@Component({
  selector: 'dcx-ng-dcx-ng-page-select',
  standalone: true,
  imports: [DcxNgSelectComponent, ReactiveFormsModule],
  templateUrl: './dcx-ng-page-select.component.html',
  styleUrls: ['./dcx-ng-page-select.component.scss'],
})
export class DcxNgPageSelectComponent {
  private readonly fb = inject(FormBuilder);

  form = this.fb.group({
    basic: [null],
    withPlaceholder: [null],
    disabled: [null, { disabled: true }],
    preselected: ['2'],
    withChange: [null],
    noLabelAria: [null],
  });

  optionList: DcxSelectOptions[] = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
    { value: '4', label: 'Four' },
  ];

  selectedValue: any = null;

  constructor() {
    this.form.get('withChange')?.valueChanges.subscribe(v => {
      this.onValueChange(v);
    });
  }

  onValueChange(value: any) {
    this.selectedValue = value;
    console.log('New value selected: ', value);
  }
}

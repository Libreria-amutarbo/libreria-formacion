import { Component } from '@angular/core';
import { DcxNgSelectComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-select/dcx-ng-select.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'dcx-ng-dcx-ng-page-select',
  standalone: true,
  imports: [DcxNgSelectComponent, ReactiveFormsModule],
  templateUrl: './dcx-ng-page-select.component.html',
  styleUrls: ['./dcx-ng-page-select.component.scss'],
})
export class DcxNgPageSelectComponent {
  form = new FormGroup({
    basic: new FormControl(null),
    withPlaceholder: new FormControl(null),
    disabled: new FormControl({ value: null, disabled: true }),
    preselected: new FormControl('2'),
    withChange: new FormControl(null),
  });

  optionList = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
    { value: '4', label: 'Four' },
  ];

  selectedValue: any = null;

  constructor() {
    this.form.get('withChange')?.valueChanges.subscribe((v) => {
      this.onValueChange(v);
    });
  }

  onValueChange(value: any) {
    this.selectedValue = value;
    console.log('New value selected: ', value);
  }
}
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DcxNgSelectComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-select/dcx-ng-select.component';

@Component({
  selector: 'dcx-ng-dcx-ng-page-select',
  standalone: true,
  imports: [DcxNgSelectComponent, ReactiveFormsModule],
  templateUrl: './dcx-ng-page-select.component.html',
  styleUrls: ['./dcx-ng-page-select.component.scss'],
})
export class DcxNgPageSelectComponent {
  form: FormGroup;

  optionList = [
    { value: '1', label: 'One' },
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
    { value: '4', label: 'Four' },
  ];

  selectedValue: any = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      basic: this.fb.control<string | null>(null),
      withPlaceholder: this.fb.control<string | null>(null),
      disabled: this.fb.control<string | null>({ value: null, disabled: true }),
      preselected: this.fb.control<string>('2'),
      withChange: this.fb.control<string | null>(null),
      noLabelAria: this.fb.control<string | null>(null),
    });

    this.form.get('withChange')?.valueChanges.subscribe(v => {
      this.onValueChange(v);
    });
  }

  onValueChange(value: any) {
    this.selectedValue = value;
    console.log('New value selected: ', value);
  }
}

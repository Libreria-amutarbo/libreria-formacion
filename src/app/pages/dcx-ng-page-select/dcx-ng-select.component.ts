import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgSelectComponent } from '../../../../libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-select/dcx-ng-select.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dcx-ng-dcx-ng-page-select',
  standalone: true,
  imports: [CommonModule, DcxNgSelectComponent, FormsModule],
  templateUrl: './dcx-ng-select.component.html',
  styleUrl: './dcx-ng-select.component.scss',
})
export class DcxNgPageSelectComponent {
  selectOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  selectedValue: string | null = null;

  onValueChange(value: string) {
    this.selectedValue = value;
  }
}

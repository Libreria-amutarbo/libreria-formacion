import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  DcxDropdownOptions,
  DcxNgDropdownComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-dropdown',
  standalone: true,
  imports: [DcxNgDropdownComponent],
  templateUrl: './dcx-ng-page-dropdown.component.html',
  styleUrls: ['./dcx-ng-page-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageDropdownComponent {
  colors: DcxDropdownOptions[] = [
    { key: 'red', value: 'Rojo' },
    { key: 'green', value: 'Verde' },
    { key: 'blue', value: 'Azul' },
  ];
  selectedColorKey = signal<string | null>(null);

  sizes: DcxDropdownOptions[] = [
    { key: 's', value: 'S' },
    { key: 'm', value: 'M' },
    { key: 'l', value: 'L' },
    { key: 'xl', value: 'XL' },
  ];
  isDisabled = signal<boolean>(true);
  selectedSizeKey = signal<string | null>('m');

  versions: DcxDropdownOptions[] = [
    { key: 'v16', value: 16 },
    { key: 'v17', value: 17 },
    { key: 'v18', value: 18 },
    { key: 'v19', value: 19 },
    { key: 'v20', value: 20 },
  ];
  selectedVersionKey = signal<string | null>(null);
  placeholderText = 'Elige versión';

  log(label: string, key: string | null) {
    console.log(`[${label}] key seleccionada:`, key);
  }

  toggleDisabled() {
    this.isDisabled.set(!this.isDisabled());
  }
}

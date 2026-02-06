import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  DcxNgButtonComponent,
  DcxNgCheckboxComponent,
  DcxPosition,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-checkbox',
  standalone: true,
  imports: [DcxNgCheckboxComponent, DcxNgButtonComponent, ReactiveFormsModule],
  templateUrl: './dcx-ng-page-checkbox.component.html',
  styleUrl: './dcx-ng-page-checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageCheckboxComponent {
  checked1 = false;
  checked2 = false;

  readonly DcxPosition = DcxPosition;

  sportsOptions = signal([
    { value: 'futbol', label: 'Fútbol' },
    { value: 'baloncesto', label: 'Baloncesto', disabled: false },
    { value: 'tenis', label: 'Tenis' },
  ]);

  genreOptions = signal([
    { value: 'action', label: 'Acción' },
    { value: 'comedy', label: 'Comedia', disabled: false },
    { value: 'drama', label: 'Drama' },
  ]);

  sportsControl = new FormControl(['futbol']);
  genreControl = new FormControl('action');

  toggleDisableBasketball(): void {
    const currentOptions = this.sportsOptions();
    const updatedOptions = currentOptions.map(opt =>
      opt.value === 'baloncesto' ? { ...opt, disabled: !opt.disabled } : opt,
    );
    this.sportsOptions.set(updatedOptions);
  }

  toggleDisableComedy(): void {
    const currentOptions = this.genreOptions();
    const updatedOptions = currentOptions.map(opt =>
      opt.value === 'comedy' ? { ...opt, disabled: !opt.disabled } : opt,
    );
    this.genreOptions.set(updatedOptions);
  }
}

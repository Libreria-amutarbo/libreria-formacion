import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-search',
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-search.component.html',
  styleUrl: './dcx-ng-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.dcx-search--disabled]': 'disabled()',
    '[class.dcx-search--size-s]': 'size() === "s"',
    '[class.dcx-search--size-m]': 'size() === "m"',
    '[class.dcx-search--size-l]': 'size() === "l"',
  },
})
export class DcxNgSearchComponent {
  readonly placeholder = input<string>('Buscar...');
  readonly disabled = input<boolean>(false);
  readonly size = input<DcxSize>('m');
  readonly helperText = input<string>('');

  readonly searchChange = output<string>();
  readonly searchOutput = output<string>();

  readonly searchValue = signal<string>('');

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchValue.set(input.value);
    this.searchChange.emit(input.value);
  }

  onSearchClick(): void {
    this.searchOutput.emit(this.searchValue());
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.searchOutput.emit(this.searchValue());
    }
  }
}

import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-search',
  imports: [DcxNgIconComponent],
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
  readonly search = output<string>();

  readonly searchValue = signal<string>('');

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchValue.set(input.value);
    this.searchChange.emit(input.value);
  }

  onSearchClick(): void {
    this.search.emit(this.searchValue());
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.search.emit(this.searchValue());
    }
  }
}

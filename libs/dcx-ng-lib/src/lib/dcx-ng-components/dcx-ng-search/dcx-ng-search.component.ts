import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal, viewChild } from '@angular/core';
import { DcxNgButtonComponent, DcxNgInputComponent, DcxSize, SearchItem } from '@dcx-ng-components/dcx-ng-lib';

export const SIZE_LIST: DcxSize[] = ['s', 'm', 'l'];
export const SIZE_DEFAULT: DcxSize = 'm';

@Component({
  selector: 'dcx-ng-search',
  imports: [DcxNgButtonComponent, DcxNgInputComponent],
  templateUrl: './dcx-ng-search.component.html',
  styleUrl: './dcx-ng-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.dcx-search--disabled]': 'disabled()',
    '[class.dcx-search--size-s]': 'size() === "s"',
    '[class.dcx-search--size-m]': 'size() === "m"',
    '[class.dcx-search--size-l]': 'size() === "l"',
    '[class.dcx-search--with-clear]': 'showClear()',
    '[class.dcx-search--with-dropdown]': 'dropdown()',
  },
})
export class DcxNgSearchComponent {
  readonly placeholder = input<string>('Buscar...');
  readonly disabled = input<boolean>(false);
  readonly size = input<DcxSize>('m');
  readonly dropdown = input<boolean>(false);
  readonly items = input<SearchItem[]>([]);
  readonly showClear = input<boolean>(true);

  readonly searchChange = output<string>();
  readonly searchOutput = output<string>();
  readonly itemSelected = output<SearchItem>();

  readonly searchValue = signal<string>('');
  readonly isDropdownOpen = signal<boolean>(false);
  readonly searchInput = viewChild<DcxNgInputComponent>('searchInput');
  
  readonly filteredItems = computed(() => {
    const query = this.searchValue().toLowerCase().trim();
    const allItems = this.items();
    
    if (!query) {
      return allItems;
    }
    
    return allItems.filter(item => 
      item.label.toLowerCase().includes(query)
    );
  });

  constructor() {
    effect(() => {
      this.items();
      this.isDropdownOpen.set(false);
    });
  }

  onValueChange(value: string | null): void {
    const newValue = value || '';
    this.searchValue.set(newValue);
    this.searchChange.emit(newValue);
    
    if (this.dropdown() && newValue) {
      this.isDropdownOpen.set(true);
    }
  }

  onSearchClick(): void {
    this.searchOutput.emit(this.searchValue());
  }

  onDropdownClick(): void {
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  onItemClick(item: SearchItem): void {
    this.searchValue.set(item.label);
    const inputComponent = this.searchInput();
    if (inputComponent) {
      inputComponent.value = item.label;
    }
    this.itemSelected.emit(item);
    this.isDropdownOpen.set(false);
  }

  onClearClick(): void {
    this.searchValue.set('');
    const inputComponent = this.searchInput();
    if (inputComponent) {
      inputComponent.value = '';
    }
    this.searchChange.emit('');
    this.isDropdownOpen.set(false);
  }
}

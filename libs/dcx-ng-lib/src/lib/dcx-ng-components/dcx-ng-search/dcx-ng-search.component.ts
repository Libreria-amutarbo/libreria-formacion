import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxSize } from '../../core/interfaces';

export type DropdownMode = 'blank' | 'current';

export interface SearchItem {
  id: number | string;
  label: string;
  [key: string]: unknown;
}

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
    '[class.dcx-search--with-clear]': 'showClear()',
    '[class.dcx-search--with-dropdown]': 'dropdown()',
    '[class.dcx-search--invalid]': 'isInvalid()',
  },
})
export class DcxNgSearchComponent {
  readonly placeholder = input<string>('Buscar...');
  readonly disabled = input<boolean>(false);
  readonly size = input<DcxSize>('m');
  readonly helperText = input<string>('');
  readonly dropdown = input<boolean>(false);
  readonly dropdownMode = input<DropdownMode>('blank');
  readonly items = input<SearchItem[]>([]);
  readonly showClear = input<boolean>(false);
  readonly validationRegex = input<RegExp | undefined>(undefined);
  readonly invalid = input<boolean>(false);
  readonly errorMessage = input<string>('');

  readonly searchChange = output<string>();
  readonly searchOutput = output<string>();
  readonly itemSelected = output<SearchItem>();

  readonly searchValue = signal<string>('');
  readonly isDropdownOpen = signal<boolean>(false);
  readonly isInvalid = computed(() => {
    if (this.invalid()) {
      return true;
    }
    
    const regex = this.validationRegex();
    const value = this.searchValue();
    
    if (!regex || !value) {
      return false;
    }
    
    return !regex.test(value);
  });
  
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

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchValue.set(input.value);
    this.searchChange.emit(input.value);
    
    if (this.dropdown() && input.value) {
      this.isDropdownOpen.set(true);
    }
  }

  onSearchClick(): void {
    this.searchOutput.emit(this.searchValue());
  }

  onDropdownClick(): void {
    if (this.dropdownMode() === 'blank') {
      this.searchValue.set('');
      this.searchOutput.emit('');
    } else {
      this.searchOutput.emit(this.searchValue());
    }
    this.isDropdownOpen.set(!this.isDropdownOpen());
  }

  onItemClick(item: SearchItem): void {
    this.searchValue.set(item.label);
    this.itemSelected.emit(item);
    this.isDropdownOpen.set(false);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.searchOutput.emit(this.searchValue());
      this.isDropdownOpen.set(false);
    } else if (event.key === 'Escape') {
      this.isDropdownOpen.set(false);
    }
  }

  onBlur(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement;
    if (!relatedTarget || !relatedTarget.closest('.dcx-search')) {
      this.isDropdownOpen.set(false);
    }
  }

  onClearClick(): void {
    this.searchValue.set('');
    this.searchChange.emit('');
    this.isDropdownOpen.set(false);
  }
}

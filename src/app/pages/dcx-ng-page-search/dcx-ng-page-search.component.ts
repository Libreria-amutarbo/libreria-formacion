import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { 
  DcxNgSearchComponent, 
  SearchItem, 
  generatePersonRows, 
  generateUserRows,
  PersonRow,
  UserRow
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-search',
  imports: [DcxNgSearchComponent],
  templateUrl: './dcx-ng-page-search.component.html',
  styleUrl: './dcx-ng-page-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageSearchComponent {
  readonly lastSearch = signal<string>('');
  readonly searchResults = signal<string[]>([]);
  readonly selectedItem = signal<SearchItem | null>(null);
  readonly searchValue = signal<string>('');
  
  readonly minThreeCharsRegex = /^.{3,}$/;
  
  readonly onlyLettersRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
  
  readonly personItems = signal<SearchItem[]>(
    generatePersonRows(20).map((person: PersonRow) => ({
      id: person.id ?? 0,
      label: `${person.name} (${person.country})`,
      data: person
    }))
  );

  readonly userItems = signal<SearchItem[]>(
    generateUserRows(30).map((user: UserRow) => ({
      id: user.id ?? 0,
      label: `${user.name} - ${user.age} años - ${user.country}`,
      data: user
    }))
  );

  onSearchChange(value: string): void {  }

  onSearch(value: string): void {
    this.lastSearch.set(value);
    
    if (value.trim()) {
      this.searchResults.set([
        `Resultado 1 para "${value}"`,
        `Resultado 2 para "${value}"`,
        `Resultado 3 para "${value}"`,
      ]);
    } else {
      this.searchResults.set([]);
    }
  }

  onItemSelected(item: SearchItem): void {
    this.selectedItem.set(item);
  }

  onSearchValueChange(value: string): void {
    this.searchValue.set(value);
  }
}

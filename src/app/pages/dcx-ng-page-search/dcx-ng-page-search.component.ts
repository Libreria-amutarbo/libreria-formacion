import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DcxNgSearchComponent } from '@dcx-ng-components/dcx-ng-lib';

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
}

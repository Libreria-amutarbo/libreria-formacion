import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { DcxListItem } from '../../core/interfaces';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';

@Component({
  selector: 'dcx-ng-list',
  standalone: true,
  imports: [DcxNgIconComponent],
  templateUrl: './dcx-ng-list.component.html',
  styleUrls: ['./dcx-ng-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgListComponent {
  // Input que acepta tanto strings/numbers como objetos DcxListItem
  readonly items = input.required<Array<string | number | DcxListItem>>();
  readonly role = input<'list' | 'menu' | 'listbox'>('list');
  readonly ariaLabel = input<string>('Lista de elementos');
  readonly interactive = input(false);

  // Eventos
  readonly itemClick = output<{ item: string | number | DcxListItem; index: number }>();

  onItemClick(item: string | number | DcxListItem, index: number, event: Event): void {
    if (this.interactive()) {
      event.stopPropagation();
      this.itemClick.emit({ item, index });
    }
  }

  getLabel(item: string | number | DcxListItem): string {
    if (typeof item === 'string' || typeof item === 'number') {
      return String(item);
    }
    return item.label;
  }

  isDisabled(item: string | number | DcxListItem): boolean {
    if (typeof item === 'string' || typeof item === 'number') {
      return false;
    }
    return item.disabled ?? false;
  }

  getItemRole(): string {
    const roleValue = this.role();
    if (roleValue === 'menu') return 'menuitem';
    if (roleValue === 'listbox') return 'option';
    return 'listitem';
  }

  isSeparator(item: string | number | DcxListItem): boolean {
    if (typeof item === 'string' || typeof item === 'number') {
      return false;
    }
    return item.separator ?? false;
  }

  hasIcon(item: string | number | DcxListItem): boolean {
    if (typeof item === 'string' || typeof item === 'number') {
      return false;
    }
    return !!item.icon;
  }

  getIcon(item: string | number | DcxListItem): string {
    if (typeof item === 'string' || typeof item === 'number') {
      return '';
    }
    return item.icon ?? '';
  }
}

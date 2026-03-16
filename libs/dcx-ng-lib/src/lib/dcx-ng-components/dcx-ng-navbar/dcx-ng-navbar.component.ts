import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';
import { DcxNavbarBrand, DcxNavItem } from '../../core/interfaces/navbar';

@Component({
  selector: 'dcx-ng-navbar',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-navbar.component.html',
  styleUrls: ['./dcx-ng-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgNavbarComponent {
  brand = input<DcxNavbarBrand>({ title: 'App' });
  items = input<DcxNavItem[]>([]);
  activeValue = input<string | null>(null);
  vertical = input(false, {
transform: (value: boolean | string) =>
typeof value === 'string' ? value === '' : value,
});

  itemClick = output<string>();

  isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  onItemClick(value: string): void {
    this.isMenuOpen.set(false);
    this.itemClick.emit(value);
  }
}

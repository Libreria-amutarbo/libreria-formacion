import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { DcxNavbarBrand, DcxNavItem } from '../../core/interfaces/navbar';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';

@Component({
  selector: 'dcx-ng-navbar',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-navbar.component.html',
  styleUrls: ['./dcx-ng-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgNavbarComponent {
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  brand = input<DcxNavbarBrand>({ title: 'App' });
  items = input<DcxNavItem[]>([]);
  activeValue = input<string | null>(null);
  ariaLabel = input<string | null>(null);
  vertical = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  itemClick = output<string>();
  brandClick = output<void>();

  private _isMenuOpen = signal(false);
  isMenuOpen = this._isMenuOpen.asReadonly();

  toggleMenu(): void {
    this._isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this._isMenuOpen.set(false);
  }

  onToggleEscape(): void {
    if (!this._isMenuOpen()) return;
    this.closeMenu();
    this.elementRef.nativeElement
      .querySelector<HTMLButtonElement>('.dcx-ng-navbar__toggle button')
      ?.focus();
  }

  onItemClick(value: string): void {
    this._isMenuOpen.set(false);
    this.itemClick.emit(value);
  }

  onBrandClick(): void {
    this.brandClick.emit();
  }
}

import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { APP_ROUTES } from './core/constants/app-routes';
import {
  DcxNgNavbarComponent,
  DcxNavItem,
  DcxNavbarBrand,
} from '@dcx-ng-components/dcx-ng-lib';

const ROUTE_ICONS: Record<string, string> = {
  accordion: 'chevron-down',
  breadcrumb: 'signpost-split',
  button: 'toggle-on',
  card: 'card-text',
  checkbox: 'check-square',
  chip: 'tag',
  'context-menu': 'list-nested',
  'date-picker': 'calendar',
  dialog: 'window',
  divider: 'dash-lg',
  grid: 'grid-3x3',
  icon: 'star',
  'icon-field': 'search',
  input: 'input-cursor-text',
  list: 'list-ul',
  message: 'envelope',
  navbar: 'layout-sidebar',
  paginator: 'skip-end',
  popover: 'window',
  radio: 'record-circle',
  search: 'search',
  select: 'menu-button',
  slider: 'sliders',
  spinner: 'arrow-clockwise',
  table: 'table',
  tabs: 'folder',
  toggle: 'toggles',
  tooltip: 'chat-square-text',
};

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);

  brand: DcxNavbarBrand = { title: 'DCX Library', logo: '/cap-logo.svg' };

  navItems: DcxNavItem[] = Object.values(APP_ROUTES)
    .sort()
    .map(path => ({
      value: path,
      label: path
        .split('-')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      icon: ROUTE_ICONS[path],
    }));

  activeRoute = signal('');

  ngOnInit() {
    this._router.events
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.activeRoute.set(e.urlAfterRedirects.slice(1));
        }
      });
  }

  onNavItemClick(path: string) {
    this._router.navigateByUrl(path);
  }
}

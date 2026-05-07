import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_ROUTES } from '../../core/constants/app-routes';
import { CommonModule } from '@angular/common';
import {
  DcxInputType,
  DcxNgInputComponent,
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
  drawer: 'layout-sidebar',
  editor: 'textarea-t',
  divider: 'dash-lg',
  grid: 'grid-3x3',
  icon: 'star',
  'icon-field': 'search',
  input: 'input-cursor-text',
  list: 'list-ul',
  message: 'envelope',
  toast: 'bell',
  navbar: 'layout-sidebar',
  paginator: 'skip-end',
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

interface HomeCard {
  icon: string;
  name: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, DcxNgInputComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly searchTerm = signal('');
  DcxInputType = DcxInputType;

  cards: HomeCard[] = Object.values(APP_ROUTES)
    .sort()
    .map(path => ({
      route: path,
      name: path
        .split('-')
        .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      icon: ROUTE_ICONS[path] || 'circle',
    }));

  filteredCards = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.cards;
    return this.cards.filter(card =>
      `${card.name} ${card.route}`.toLowerCase().includes(term),
    );
  });

  onSearch(value: any) {
    this.searchTerm.set(value);
  }
}

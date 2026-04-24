import {
  ChangeDetectionStrategy,
  computed,
  Component,
  input,
  output,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  DcxBreadcrumbItem,
  DcxBreadCrumbSeparatorIcons,
} from '../../core/interfaces/breadcrumb';
import { DcxContextMenuItem } from '../../core/interfaces/contextMenu';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgContextMenuComponent } from '../dcx-ng-contextMenu/dcx-ng-contextMenu.component';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';

@Component({
  imports: [
    DcxNgIconComponent,
    NgTemplateOutlet,
    RouterModule,
    DcxNgContextMenuComponent,
    DcxNgButtonComponent,
  ],
  selector: 'dcx-ng-breadcrumb',
  templateUrl: './dcx-ng-breadcrumb.component.html',
  styleUrl: './dcx-ng-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgBreadcrumbComponent {
  private readonly maxVisibleItems = 3;

  private readonly itemContent =
    viewChild.required<TemplateRef<unknown>>('itemContent');
  private readonly ellipsisMenu = viewChild(DcxNgContextMenuComponent);
  private readonly ellipsisButtonElement = signal<HTMLElement | null>(null);

  readonly items = input.required<DcxBreadcrumbItem[]>();
  readonly iconSeparator = input.required<DcxBreadCrumbSeparatorIcons>();
  readonly itemSelected = output<DcxBreadcrumbItem>();

  readonly isEllipsisMenuOpen = signal(false);
  readonly ellipsisMenuPosition = signal({ x: 0, y: 0 });

  readonly itemsState = computed(() => {
    const currentItems = this.items();
    const hasEllipsis = currentItems.length > this.maxVisibleItems;

    if (!hasEllipsis) {
      return {
        showEllipsis: false,
        hiddenItems: [] as DcxBreadcrumbItem[],
        visibleItems: currentItems,
        currentItem: currentItems[currentItems.length - 1] ?? null,
      };
    }

    const hiddenItems = currentItems.slice(
      0,
      currentItems.length - this.maxVisibleItems,
    );
    const visibleItems = currentItems.slice(-this.maxVisibleItems);

    return {
      showEllipsis: true,
      hiddenItems,
      visibleItems,
      currentItem: visibleItems[visibleItems.length - 1] ?? null,
    };
  });

  readonly showEllipsis = computed(() => this.itemsState().showEllipsis);
  readonly hiddenItems = computed(() => this.itemsState().hiddenItems);
  readonly visibleItems = computed(() => this.itemsState().visibleItems);
  readonly currentItem = computed(() => this.itemsState().currentItem);

  readonly hiddenItemsMenu = computed<DcxContextMenuItem[]>(() =>
    this.hiddenItems().map(item => ({
      text: item.label,
      icon: item.icon,
      disabled: item.disabled,
      action: () => this.onHiddenItemClick(item),
    })),
  );

  onItemClick(item: DcxBreadcrumbItem, event?: Event): void {
    if (item.disabled) {
      event?.preventDefault();
      return;
    }

    this.itemSelected.emit(item);
  }

  onItemKeydown(item: DcxBreadcrumbItem, event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this.onItemClick(item, event);
  }

  toggleEllipsisMenu(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    const menu = this.ellipsisMenu();
    const currentTarget =
      event?.currentTarget instanceof HTMLElement ? event.currentTarget : null;

    if (currentTarget) {
      this.ellipsisButtonElement.set(currentTarget);
    }

    const button = currentTarget ?? this.ellipsisButtonElement();

    if (!menu || !button) {
      return;
    }

    const buttonRect = button.getBoundingClientRect();

    this.ellipsisMenuPosition.set({
      x: 0,
      y: buttonRect.height + 4,
    });

    const isOpen = menu.isOpen();

    this.isEllipsisMenuOpen.set(!isOpen);

    if (isOpen) {
      menu.close();
      return;
    }

    menu.open();
  }

  onHiddenMenuClosed(): void {
    this.isEllipsisMenuOpen.set(false);
    this.ellipsisButtonElement()?.blur();
  }

  onHiddenItemClick(item: DcxBreadcrumbItem): void {
    if (item.disabled) {
      return;
    }

    this.itemSelected.emit(item);

    if (item.href && typeof window !== 'undefined') {
      window.location.assign(item.href);
    }
  }

  isCurrentItem(item: DcxBreadcrumbItem): boolean {
    return this.currentItem() === item;
  }

  getItemContentTpl(): TemplateRef<unknown> {
    return this.itemContent();
  }
}

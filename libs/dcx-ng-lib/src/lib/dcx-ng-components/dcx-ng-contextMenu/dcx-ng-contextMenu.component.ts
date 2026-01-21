import { Component, effect, input, output, computed, signal, Renderer2, ApplicationRef, createComponent, EnvironmentInjector } from '@angular/core';
import { 
  DcxNgListComponent,
  DcxListItem,
  DcxContextPosition, 
  DcxContextMenuItem,
  DEFAULT_CONTEXT_MENU_STYLES,
  applyStylesToElement,
  createContextMenuContainer
} from '@dcx-ng-components/dcx-ng-lib';

export type Position = DcxContextPosition;
export type ContextMenuItem = DcxContextMenuItem;

@Component({
  selector: 'dcx-ng-context-menu',
  standalone: true,
  template: '',
  styles: []
})
export class ContextMenuComponent {
  readonly items = input<DcxContextMenuItem[]>([]);
  readonly visible = input(false);
  readonly position = input<DcxContextPosition>({ x: 0, y: 0 });
  readonly closeOnClickOutside = input(true);

  readonly closed = output<void>();
  readonly itemsChanged = output<DcxContextMenuItem[]>();

  private readonly internalItems = signal<DcxContextMenuItem[]>([]);

  readonly listItems = computed<DcxListItem[]>(() => {
    const currentItems = this.internalItems().length > 0 ? this.internalItems() : this.items();
    return currentItems.map(item => ({
      label: item.label,
      value: item,
      icon: item.icon,
      disabled: item.disabled,
      separator: item.separator
    }));
  });

  private menuElement: HTMLDivElement | null = null;
  private clickListener?: () => void;
  private scrollListener?: () => void;

  constructor(
    private readonly renderer: Renderer2,
    private readonly appRef: ApplicationRef,
    private readonly injector: EnvironmentInjector
  ) {
    effect(() => {
      const inputItems = this.items();
      if (inputItems.length > 0 && this.internalItems().length === 0) {
        this.internalItems.set([...inputItems]);
      }

      if (this.visible()) {
        this.createMenu();
      } else {
        this.destroyMenu();
      }
    });

    effect(() => {
      if (this.visible() && this.closeOnClickOutside() && !this.clickListener) {
        setTimeout(() => {
          this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
            if (this.menuElement && !this.menuElement.contains(event.target as Node)) {
              this.hide();
            }
          });
        }, 0);
      } else if (this.clickListener) {
        this.clickListener();
        this.clickListener = undefined;
      }
    });

    effect(() => {
      if (this.visible() && !this.scrollListener) {
        this.scrollListener = this.renderer.listen('window', 'scroll', () => this.hide());
      } else if (this.scrollListener) {
        this.scrollListener();
        this.scrollListener = undefined;
      }
    });

    effect((onCleanup) => {
      onCleanup(() => {
        this.destroyMenu();
        this.clickListener?.();
        this.scrollListener?.();
      });
    });
  }

  private createMenu(): void {
    if (this.menuElement) return;

    const container = createContextMenuContainer(this.renderer, this.position());
    const menu = this.renderer.createElement('div');
    applyStylesToElement(this.renderer, menu, DEFAULT_CONTEXT_MENU_STYLES as any);

    const listComponentRef = createComponent(DcxNgListComponent, {
      environmentInjector: this.injector,
      elementInjector: this.injector
    });

    listComponentRef.setInput('items', this.listItems());
    listComponentRef.setInput('interactive', true);
    listComponentRef.instance.itemClick.subscribe((event: { item: string | number | DcxListItem; index: number }) => {
      const contextMenuItem = (event.item as DcxListItem).value as DcxContextMenuItem;
      contextMenuItem?.action?.();
      this.hide();
    });

    this.appRef.attachView(listComponentRef.hostView);
    const listElement = (listComponentRef.hostView as any).rootNodes[0];

    this.renderer.appendChild(menu, listElement);
    this.renderer.appendChild(container, menu);
    this.renderer.appendChild(document.body, container);
    
    this.menuElement = container;
  }

  private destroyMenu(): void {
    if (this.menuElement) {
      this.renderer.removeChild(document.body, this.menuElement);
      this.menuElement = null;
    }
  }

  hide(): void {
    this.closed.emit();
  }

  addItem(_item: DcxContextMenuItem): void {
    // TODO: Implement addItem
  }

  editItem(_index: number, _updatedItem: Partial<DcxContextMenuItem>): void {
    // TODO: Implement editItem
  }

  removeItem(_index: number): void {
    // TODO: Implement removeItem
  }
}
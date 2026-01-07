import { Component, ElementRef, Renderer2, effect, input, output, computed } from '@angular/core';
import { DcxNgListComponent } from '../dcx-ng-list/dcx-ng-list.component';
import { DcxListItem } from '../../core/interfaces';

export interface Position {
  x: number;
  y: number;
}

export interface ContextMenuItem {
  label: string;
  action?: () => void;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
  subItems?: ContextMenuItem[];
}

@Component({
  selector: 'dcx-ng-context-menu',
  standalone: true,
  imports: [DcxNgListComponent],
  templateUrl: './dcx-ng-contextMenu.component.html',
  styleUrl: './dcx-ng-contextMenu.component.scss',
})
export class ContextMenuComponent {
  readonly items = input.required<ContextMenuItem[]>();
  readonly visible = input(false);
  readonly position = input<Position>({ x: 0, y: 0 });
  readonly closeOnClickOutside = input(true);

  readonly closed = output<void>();

  // Convertir ContextMenuItem[] a DcxListItem[] para el componente de lista
  readonly listItems = computed<DcxListItem[]>(() => 
    this.items().map(item => ({
      label: item.label,
      value: item,
      icon: item.icon,
      disabled: item.disabled,
      separator: item.separator
    }))
  );

  private clickListener?: () => void;

  constructor(
    private readonly eRef: ElementRef,
    private readonly renderer: Renderer2
  ) {
    effect(() => {
      const isVisible = this.visible();
      const shouldClose = this.closeOnClickOutside();

      if (shouldClose && isVisible && !this.clickListener) {
        this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
          if (this.visible() && !this.eRef.nativeElement.contains(event.target)) {
            this.hide();
          }
        });
      } else if ((!isVisible || !shouldClose) && this.clickListener) {
        this.clickListener();
        this.clickListener = undefined;
      }
    });

    effect((onCleanup) => {
      onCleanup(() => {
        if (this.clickListener) {
          this.clickListener();
          this.clickListener = undefined;
        }
      });
    });
  }

  hide() {
    this.closed.emit();
  }

  onListItemClick(event: { item: string | number | DcxListItem; index: number }): void {
    const listItem = event.item as DcxListItem;
    const contextMenuItem = listItem.value as ContextMenuItem;
    
    if (contextMenuItem && contextMenuItem.action) {
      contextMenuItem.action();
      this.hide();
    }
  }
}
import { Component, ElementRef, Renderer2, effect, input, output, signal } from '@angular/core';

export interface Position {
  x: number;
  y: number;
}

export interface ContextMenuItem {
  label: string;
  action: () => void;
}

@Component({
  selector: 'dcx-ng-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './dcx-ng-contextMenu.component.html',
  styleUrl: './dcx-ng-contextMenu.component.scss',
})
export class ContextMenuComponent {
  readonly items = input.required<ContextMenuItem[]>();
  readonly visible = input(false);
  readonly position = input<Position>({ x: 0, y: 0 });
  readonly closeOnClickOutside = input(true);

  readonly closed = output<void>();

  private clickListener?: () => void;

  constructor(
    private readonly eRef: ElementRef,
    private readonly renderer: Renderer2
  ) {
    effect(() => {
      const isVisible = this.visible();
      const shouldClose = this.closeOnClickOutside();

      if (shouldClose && isVisible && !this.clickListener) {
        setTimeout(() => {
          this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
            if (this.visible() && !this.eRef.nativeElement.contains(event.target)) {
              this.hide();
            }
          });
        }, 0);
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

  onItemClick(item: ContextMenuItem, event: Event) {
    event.stopPropagation();
    item.action();
    this.hide();
  }
}
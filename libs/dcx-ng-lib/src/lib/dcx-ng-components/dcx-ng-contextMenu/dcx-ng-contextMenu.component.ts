import { Component, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';


export interface ContextMenuItem {
  label: string;
  action: () => void;
}

@Component({
  selector: 'dcx-ng-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-contextMenu.component.html',
  styleUrl: './dcx-ng-contextMenu.component.scss',
})
export class ContextMenuComponent {
  @Input() items: ContextMenuItem[] = [];
  @Input() visible = false;
  @Input() position = { x: 0, y: 0 };

  @Output() closed = new EventEmitter<void>();

  constructor(private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hide();
    }
  }

  show(x: number, y: number) {
    this.position = { x, y };
    this.visible = true;
  }

  hide() {
    this.visible = false;
    this.closed.emit();
  }

  onItemClick(item: ContextMenuItem) {
    item.action();
    this.hide();
  }
}

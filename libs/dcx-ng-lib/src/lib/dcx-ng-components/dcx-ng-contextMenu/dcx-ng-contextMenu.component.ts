import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxContextMenuItem, DcxContextPosition } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-contextMenu.component.html',
  styleUrl: './dcx-ng-contextMenu.component.scss',
})
export class ContextMenuComponent {
  private readonly eRef = inject(ElementRef)

  @Input() items: DcxContextMenuItem[] = [];
  @Input() visible = false;
  @Input() position: DcxContextPosition = { x: 0, y: 0 };

  @Output() closed = new EventEmitter<void>();

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hide();
    }
  }

  show(position: DcxContextPosition) {
    this.position = position;
    this.visible = true;
  }

  hide() {
    this.visible = false;
    this.closed.emit();
  }

  onItemClick(item: DcxContextMenuItem) {
    item.action();
    this.hide();
  }
}

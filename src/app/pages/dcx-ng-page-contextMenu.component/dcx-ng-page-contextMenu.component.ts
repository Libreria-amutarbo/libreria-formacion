import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  DcxNgContextMenuComponent,
  DcxContextMenuItem,
  DcxNgButtonComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-context-menu',
  standalone: true,
  imports: [DcxNgContextMenuComponent, DcxNgButtonComponent, FormsModule],
  templateUrl: './dcx-ng-page-contextMenu.component.html',
  styleUrl: './dcx-ng-page-contextMenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageContextMenuComponent {
  @ViewChild('contextMenu1') contextMenu1!: DcxNgContextMenuComponent;
  @ViewChild('contextMenu2') contextMenu2!: DcxNgContextMenuComponent;
  @ViewChild('contextMenu3') contextMenu3!: DcxNgContextMenuComponent;

  menuItems: DcxContextMenuItem[] = [
    { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    { text: 'Guardar', icon: 'save' },
    { text: 'Guardar como...', icon: 'save-fill' },
    { divider: true },
    { text: 'Cerrar', icon: 'x-lg', disabled: true },
  ];

  advancedMenuItems: DcxContextMenuItem[] = [
    { text: 'Copiar', icon: 'clipboard' },
    { text: 'Pegar', icon: 'clipboard-check' },
    { text: 'Cortar', icon: 'scissors' },
    { divider: true },
    {
      text: 'Más opciones',
      icon: 'three-dots',
      children: [
        { text: 'Opción 1', icon: 'check' },
        { text: 'Opción 2', icon: 'check' },
      ],
    },
  ];

  nestedMenuItems: DcxContextMenuItem[] = [
    { text: 'Nuevo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    {
      text: 'Editar',
      icon: 'pencil',
      children: [
        { text: 'Deshacer', icon: 'arrow-counterclockwise' },
        { text: 'Rehacer', icon: 'arrow-clockwise' },
        { divider: true },
        {
          text: 'Transformar',
          icon: 'magic',
          children: [
            { text: 'Mayúsculas', icon: 'type' },
            { text: 'Minúsculas', icon: 'type' },
          ],
        },
      ],
    },
    { divider: true },
    { text: 'Eliminar', icon: 'trash', disabled: true },
  ];

  menuPosition1 = { x: 0, y: 0 };
  menuPosition2 = { x: 0, y: 0 };
  menuPosition3 = { x: 0, y: 0 };
  selectedItem: DcxContextMenuItem | null = null;

  coordX1 = 330;
  coordY1 = 70;
  coordX3 = 330;
  coordY3 = 70;

  openContextMenu(event: MouseEvent, menuNumber: number, area: HTMLElement): void {
    event.preventDefault();
    event.stopPropagation();

    const areaRect = area.getBoundingClientRect();
    const menuWidth = 240;
    const coordX = menuNumber === 1 ? this.coordX1 : this.coordX3;
    const coordY = menuNumber === 1 ? this.coordY1 : this.coordY3;
    const clampedX = Math.max(0, Math.min(coordX, areaRect.width - menuWidth));
    const clampedY = Math.max(0, Math.min(coordY, areaRect.height));
    const position = { x: areaRect.left + clampedX, y: areaRect.top + clampedY };

    if (menuNumber === 1) {
      this.menuPosition1 = position;
      setTimeout(() => this.contextMenu1.open(), 0);
    } else if (menuNumber === 2) {
      this.menuPosition2 = position;
      setTimeout(() => this.contextMenu2.open(), 0);
    } else {
      this.menuPosition3 = position;
      setTimeout(() => this.contextMenu3.open(), 0);
    }
  }

  openContextMenuFromButton(triggerElement: HTMLElement): void {
    const triggerRect = triggerElement.getBoundingClientRect();
    const menuWidth = 240;
    const viewportPadding = 8;

    const menuX = Math.min(
      triggerRect.left,
      window.innerWidth - menuWidth - viewportPadding,
    );

    this.menuPosition2 = {
      x: Math.max(viewportPadding, menuX),
      y: triggerRect.bottom + 4,
    };

    setTimeout(() => this.contextMenu2.open(), 0);
  }

  onItemSelected(item: DcxContextMenuItem): void {
    if (!item.text) {
      return;
    }

    this.selectedItem = item;
  }
}

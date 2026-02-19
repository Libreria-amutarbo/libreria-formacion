import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { DcxNgContextMenuComponent, DcxContextMenuItem, DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-context-menu',
  standalone: true,
  imports: [DcxNgContextMenuComponent, DcxNgButtonComponent],
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

  openContextMenu(event: MouseEvent, menuNumber: number): void {
    event.preventDefault();
    event.stopPropagation();

    const position = { x: event.clientX, y: event.clientY };

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

  openContextMenuFromButton(): void {
    this.menuPosition2 = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    setTimeout(() => this.contextMenu2.open(), 0);
  }

  onItemSelected(item: DcxContextMenuItem): void {
    console.log('Item seleccionado:', item);
  }
}


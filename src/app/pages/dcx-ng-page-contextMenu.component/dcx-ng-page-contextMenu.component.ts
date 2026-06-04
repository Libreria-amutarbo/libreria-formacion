import { Component, ViewChild } from '@angular/core';
import {
  DcxNgContextMenuComponent,
  DcxContextMenuItem,
  DcxNgButtonComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'app-dcx-ng-page-context-menu',
  standalone: true,
  imports: [DcxNgContextMenuComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-contextMenu.component.html',
  styleUrl: './dcx-ng-page-contextMenu.component.scss',
})
export class DcxNgPageContextMenuComponent {
  @ViewChild('contextMenu1') contextMenu1!: DcxNgContextMenuComponent;
  @ViewChild('contextMenu2') contextMenu2!: DcxNgContextMenuComponent;
  @ViewChild('contextMenu3') contextMenu3!: DcxNgContextMenuComponent;
  @ViewChild('contextMenu4') contextMenu4!: DcxNgContextMenuComponent;
  @ViewChild('contextMenu5') contextMenu5!: DcxNgContextMenuComponent;

  menuItems: DcxContextMenuItem[] = [
    { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    { text: 'Guardar', icon: 'save' },
    { text: 'Guardar como...', icon: 'save-fill' },
    { divider: true },
    { text: 'Eliminar', icon: 'trash', variant: 'danger' },
  ];

  advancedMenuItems: DcxContextMenuItem[] = [
    { text: 'Ver perfil', icon: 'person' },
    { text: 'Configuración', icon: 'gear' },
    { divider: true },
    {
      text: 'Más opciones',
      icon: 'three-dots',
      children: [
        { text: 'Opción 1', icon: 'check' },
        { text: 'Opción 2', icon: 'check' },
      ],
    },
    { divider: true },
    { text: 'Cerrar sesión', icon: 'box-arrow-right', variant: 'danger' },
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
    { text: 'Eliminar', icon: 'trash', variant: 'danger' },
  ];

  disabledMenuItems: DcxContextMenuItem[] = [
    { text: 'Nuevo archivo', icon: 'file-earmark-plus' },
    { text: 'Abrir', icon: 'folder-open' },
    { divider: true },
    { text: 'Guardar', icon: 'save', disabled: true },
    { text: 'Guardar como...', icon: 'save-fill', disabled: true },
    { divider: true },
    { text: 'Cerrar', icon: 'x-lg', disabled: true },
  ];

  dangerMenuItems: DcxContextMenuItem[] = [
    { text: 'Editar', icon: 'pencil' },
    { text: 'Duplicar', icon: 'copy' },
    { divider: true },
    { text: 'Archivar', icon: 'archive', variant: 'danger' },
    { text: 'Eliminar permanentemente', icon: 'trash', variant: 'danger' },
  ];


  openContextMenu(event: MouseEvent, menuNumber: number): void {
    event.preventDefault();
    const pos = { x: event.clientX, y: event.clientY };

    const menuMap: Record<number, DcxNgContextMenuComponent> = {
      1: this.contextMenu1,
      3: this.contextMenu3,
      4: this.contextMenu4,
      5: this.contextMenu5,
    };

    menuMap[menuNumber]?.open(pos);
  }

  openContextMenuFromButton(triggerElement: HTMLElement): void {
    const rect = triggerElement.getBoundingClientRect();
    const menuWidth = 240;
    const viewportPadding = 8;
    const menuX = Math.min(rect.left, window.innerWidth - menuWidth - viewportPadding);
    const pos = {
      x: Math.max(viewportPadding, menuX),
      y: rect.bottom + 4,
    };
    // setTimeout deja pasar el document:click del botón antes de abrir el menú
    setTimeout(() => this.contextMenu2.open(pos));
  }

  onItemSelected(item: DcxContextMenuItem): void {
    if (!item.text) return;
    console.log('Item seleccionado:', item.text);
  }
}

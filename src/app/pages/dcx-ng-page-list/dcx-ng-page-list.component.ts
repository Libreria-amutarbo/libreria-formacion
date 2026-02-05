import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxListItemType, DcxNgListComponent, } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-dcx-ng-page-list',
  standalone: true,
  imports: [CommonModule, DcxNgListComponent,],
  templateUrl: './dcx-ng-page-list.component.html',
  styleUrl: './dcx-ng-page-list.component.scss',
})
export class DcxNgPageListComponent {
  onItemSelected($event: { item: DcxListItemType; index: number; }) {
    throw new Error('Method not implemented.');
  }
  elementos: Array<string | number> = ['Angular', 'React', 'Vue', 2025];

  elementosConIcono = [
    { text: 'Dashboard', icon: 'speedometer' },
    { text: 'Usuarios', icon: 'people' },
    { text: 'Ajustes', icon: 'gear-fill' },
    { text: 'Notificaciones', icon: 'bell-fill' },
  ];
}

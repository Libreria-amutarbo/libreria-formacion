import { Component, signal } from '@angular/core';
import {
  DcxPosition,
  DcxNgButtonComponent,
  DcxNgDrawerComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-drawer',
  standalone: true,
  imports: [DcxNgDrawerComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-drawer.component.html',
  styleUrl: './dcx-ng-page-drawer.component.scss',
})
export class DcxNgPageDrawerComponent {
  // 01 Default
  readonly visDefault = signal(false);

  // 02 Posiciones
  readonly visPositions = signal(false);
  readonly posPositions = signal<DcxPosition>('right');
  readonly sizePositions = signal('22rem');

  openAt = (pos: DcxPosition) => {
    this.posPositions.set(pos);
    this.sizePositions.set(pos === 'top' || pos === 'bottom' ? '14rem' : '22rem');
    this.visPositions.set(true);
  };

  // 03 ESC deshabilitado
  readonly visNoEsc = signal(false);

  // 04 Sin modal
  readonly visNoModal = signal(false);

  // 05 No dismissible
  readonly visNoDismiss = signal(false);

  // 06 Solo ESC
  readonly visEsc = signal(false);

  // 07 Solo icono
  readonly visIconOnly = signal(false);

  // 08 Tamaños top / bottom
  readonly visSizes = signal(false);
  readonly posSizes = signal<DcxPosition>('top');
  readonly sizeSizes = signal('12rem');

  openSize = (pos: DcxPosition, size: string) => {
    this.posSizes.set(pos);
    this.sizeSizes.set(size);
    this.visSizes.set(true);
  };

  // 09 Fullscreen
  readonly visFullscreen = signal(false);

  // 10 Block scroll
  readonly visBlockScroll = signal(false);

  // 11 Z-index
  readonly visZA = signal(false);
  readonly visZB = signal(false);
  readonly visZC = signal(false);

  openZStacked = () => {
    this.visZB.set(true);
    setTimeout(() => this.visZA.set(true), 60);
    setTimeout(() => this.visZC.set(true), 120);
  };

  // 12 Header custom
  readonly visCustomHeader = signal(false);

  // 13 Footer custom
  readonly visCustomFooter = signal(false);
}

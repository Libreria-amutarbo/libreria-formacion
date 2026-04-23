import { Component, signal } from '@angular/core';
import {
  DcxPosition,
  DcxNgButtonComponent,
  DcxNgDividerComponent,
  DcxNgDrawerComponent,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-drawer',
  standalone: true,
  imports: [DcxNgDrawerComponent, DcxNgButtonComponent, DcxNgDividerComponent],
  templateUrl: './dcx-ng-page-drawer.component.html',
  styleUrl: './dcx-ng-page-drawer.component.scss',
})
export class DcxNgPageDrawerComponent {
  readonly visible = signal(false);
  readonly position = signal<DcxPosition>('right');
  readonly visibleStyled = signal(false);
  readonly visibleMask = signal(false);
  readonly visibleZA = signal(false);
  readonly visibleZB = signal(false);
  readonly visibleZC = signal(false);

  readonly modal = signal(true);
  readonly dismissible = signal(true);
  readonly closeOnEscape = signal(true);
  readonly blockScroll = signal(true);
  readonly showCloseIcon = signal(true);
  readonly fullScreen = signal(false);

  readonly size = signal('22rem');

  open = () => this.visible.set(true);

  close = () => this.visible.set(false);

  openAt = (next: DcxPosition) => {
    this.position.set(next);
    this.fullScreen.set(false);
    this.size.set(next === 'left' || next === 'right' ? '22rem' : '18rem');
    this.visible.set(true);
  };

  openFullscreen = () => {
    this.fullScreen.set(true);
    this.visible.set(true);
  };

  openStyled = () => this.visibleStyled.set(true);

  closeStyled = () => this.visibleStyled.set(false);

  openMask = () => this.visibleMask.set(true);

  closeMask = () => this.visibleMask.set(false);

  openZAuto = () => this.visibleZA.set(true);

  openZManual = () => this.visibleZB.set(true);

  openZManualTop = () => this.visibleZC.set(true);

  closeZA = () => this.visibleZA.set(false);

  closeZB = () => this.visibleZB.set(false);

  closeZC = () => this.visibleZC.set(false);

  openZStacked = () => {
    this.visibleZB.set(true);
    setTimeout(() => {
      this.visibleZA.set(true);
    }, 60);
    setTimeout(() => {
      this.visibleZC.set(true);
    }, 120);
  };

  closeZExamples = () => {
    this.visibleZA.set(false);
    this.visibleZB.set(false);
    this.visibleZC.set(false);
  };
}

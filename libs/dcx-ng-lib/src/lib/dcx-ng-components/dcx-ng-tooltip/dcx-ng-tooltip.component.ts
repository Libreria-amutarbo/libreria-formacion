import { Component, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

@Component({
  selector: 'dcx-ng-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-tooltip.component.html',
  styleUrls: ['./dcx-ng-tooltip.component.scss'],
})
export class DcxNgTooltipComponent {
  @Input() position: TooltipPosition = TooltipPosition.TOP;
  @Input() hideTooltipOnClick = false;
  @Input() content = '';

  visible = false;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.visible = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.visible = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.hideTooltipOnClick) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (clickedInside) {
        this.visible = false;
      }
    }
  }

  constructor(private elementRef: ElementRef) {}

  getTooltipClasses(): string {
    const baseClass = 'dcx-ng-tooltip';
    const positionClass = `${baseClass}--${this.position}`;

    return `${baseClass} ${positionClass}`.trim();
  }
}
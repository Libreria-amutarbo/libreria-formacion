import { Component, Input, HostListener, ElementRef, AfterViewInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxPosition } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-tooltip.component.html',
  styleUrls: ['./dcx-ng-tooltip.component.scss'],
})
export class DcxNgTooltipComponent implements AfterViewInit {
  @Input() position: DcxPosition = 'top';
  @Input() hideTooltipOnClick = false;
  @Input() content = '';

  visible = false;
  actualPosition: DcxPosition = 'top';

  private readonly elementRef = inject(ElementRef);

  @ViewChild('tooltipElement') tooltipElement?: ElementRef;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.visible = true;
    this.adjustPosition();
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


  ngAfterViewInit() {
    this.actualPosition = this.position;
  }

  private adjustPosition() {
    setTimeout(() => {
      const tooltipEl = this.tooltipElement!.nativeElement;
      const hostEl = this.elementRef.nativeElement;

      // Get viewport dimensions
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      // Get host element position and dimensions
      const hostRect = hostEl.getBoundingClientRect();

      // Get tooltip dimensions
      const tooltipRect = tooltipEl.getBoundingClientRect();

      // Calculate available space in each direction
      const spaceTop = hostRect.top;
      const spaceBottom = viewport.height - hostRect.bottom;
      const spaceLeft = hostRect.left;
      const spaceRight = viewport.width - hostRect.right;

      // Determine the best position based on available space
      const optimalPosition = this.calculateOptimalPosition(
        this.position,
        tooltipRect,
        { spaceTop, spaceBottom, spaceLeft, spaceRight }
      );

      if (optimalPosition !== this.actualPosition) {
        this.actualPosition = optimalPosition;
      }
    }, 10);
  }

  private calculateOptimalPosition(
    preferredPosition: DcxPosition,
    tooltipRect: DOMRect,
    availableSpace: {
      spaceTop: number;
      spaceBottom: number;
      spaceLeft: number;
      spaceRight: number;
    }
  ): DcxPosition {
    const margin = 10; // Safety margin
    const tooltipHeight = tooltipRect.height;
    const tooltipWidth = tooltipRect.width;

    // Check if preferred position fits
    switch (preferredPosition) {
      case 'top':

        break;
      case 'bottom':
        if (availableSpace.spaceBottom >= tooltipHeight + margin) {
          return 'bottom';
        }
        break;
      case 'left':
        if (availableSpace.spaceLeft >= tooltipWidth + margin) {
          return 'left';
        }
        break;
      case 'right':
        if (availableSpace.spaceRight >= tooltipWidth + margin) {
          return 'right';
        }
        break;
    }

    // If preferred position doesn't fit, find the best alternative
    const alternatives: { position: DcxPosition; space: number }[] = [
      { position: 'top', space: availableSpace.spaceTop },
      { position: 'bottom', space: availableSpace.spaceBottom },
      { position: 'left', space: availableSpace.spaceLeft },
      { position: 'right', space: availableSpace.spaceRight }
    ];

    // Sort by available space (descending)
    alternatives.sort((a, b) => b.space - a.space);

    // Return the position with the most space that fits
    for (const alt of alternatives) {
      const requiredSpace = (alt.position === 'left' || alt.position === 'right')
        ? tooltipWidth + margin
        : tooltipHeight + margin;

      if (alt.space >= requiredSpace) {
        return alt.position;
      }
    }

    // If nothing fits perfectly, return the one with most space
    return alternatives[0].position;
  }

  getTooltipClasses(): string {
    const baseClass = 'dcx-ng-tooltip';
    const positionClass = `${baseClass}--${this.actualPosition}`;
    return `${baseClass} ${positionClass}`.trim();
  }
}
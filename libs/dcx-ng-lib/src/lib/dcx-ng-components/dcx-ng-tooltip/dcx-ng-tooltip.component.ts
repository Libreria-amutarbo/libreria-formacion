import {
  Component,
  HostListener,
  ElementRef,
  AfterViewInit,
  inject,
  input,
  signal,
  computed,
  viewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {
  DcxPosition,
  TooltipArrowAlignment,
  AvailableSpace,
  TooltipPositionOption,
} from '../../core/interfaces';
import { TOOLTIP_DEFAULT_CONFIG } from '../../core/mock';

@Component({
  selector: 'dcx-ng-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-tooltip.component.html',
  styleUrls: ['./dcx-ng-tooltip.component.scss'],
})
export class DcxNgTooltipComponent implements AfterViewInit {
  position = input<DcxPosition>('top');
  arrowAlignment = input<TooltipArrowAlignment>('center');
  hideTooltipOnClick = input<boolean>(false);
  content = input<string>('');
  contentHtml = input<string>('');

  visible = signal<boolean>(false);
  actualPosition = signal<DcxPosition>('top');

  private readonly elementRef = inject(ElementRef);
  private readonly sanitizer = inject(DomSanitizer);

  tooltipElement = viewChild<ElementRef>('tooltipElement');

  sanitizedHtml = computed(() => {
    const html = this.contentHtml();
    return html ? this.sanitizer.bypassSecurityTrustHtml(html) : null;
  });

  tooltipClasses = computed(() => {
    const baseClass = 'dcx-ng-tooltip';
    const positionClass = `${baseClass}--${this.actualPosition()}`;
    const arrowAlignmentClass = `${baseClass}--arrow-${this.arrowAlignment()}`;
    return `${baseClass} ${positionClass} ${arrowAlignmentClass}`.trim();
  });

  constructor() {
    effect(() => {
      if (this.visible()) {
        setTimeout(() => this.adjustPosition(), 0);
      }
    });
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.visible.set(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.visible.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.hideTooltipOnClick()) {
      const clickedInside = this.elementRef.nativeElement.contains(
        event.target,
      );
      if (clickedInside) {
        this.visible.set(false);
      }
    }
  }

  ngAfterViewInit() {
    this.actualPosition.set(this.position());
  }

  private adjustPosition() {
    setTimeout(() => {
      const tooltipEl = this.tooltipElement()?.nativeElement;
      if (!tooltipEl) return;

      const hostEl = this.elementRef.nativeElement;

      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      };

      const hostRect = hostEl.getBoundingClientRect();

      const tooltipRect = tooltipEl.getBoundingClientRect();

      const availableSpace: AvailableSpace = {
        spaceTop: hostRect.top,
        spaceBottom: viewport.height - hostRect.bottom,
        spaceLeft: hostRect.left,
        spaceRight: viewport.width - hostRect.right,
      };

      const optimalPosition = this.calculateOptimalPosition(
        this.position(),
        tooltipRect,
        availableSpace,
      );

      if (optimalPosition !== this.actualPosition()) {
        this.actualPosition.set(optimalPosition);
      }
    }, TOOLTIP_DEFAULT_CONFIG.adjustDelay);
  }

  private calculateOptimalPosition(
    preferredPosition: DcxPosition,
    tooltipRect: DOMRect,
    availableSpace: AvailableSpace,
  ): DcxPosition {
    const { margin } = TOOLTIP_DEFAULT_CONFIG;
    const tooltipHeight = tooltipRect.height;
    const tooltipWidth = tooltipRect.width;

    switch (preferredPosition) {
      case 'top':
        if (availableSpace.spaceTop >= tooltipHeight + margin) {
          return 'top';
        }
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

    const alternatives: TooltipPositionOption[] = [
      { position: 'top', space: availableSpace.spaceTop },
      { position: 'bottom', space: availableSpace.spaceBottom },
      { position: 'left', space: availableSpace.spaceLeft },
      { position: 'right', space: availableSpace.spaceRight },
    ];

    alternatives.sort((a, b) => b.space - a.space);

    for (const alt of alternatives) {
      const requiredSpace =
        alt.position === 'left' || alt.position === 'right'
          ? tooltipWidth + margin
          : tooltipHeight + margin;

      if (alt.space >= requiredSpace) {
        return alt.position;
      }
    }

    return alternatives[0].position;
  }
}

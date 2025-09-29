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
export class DcxNgTooltipComponent implements OnInit, OnDestroy {
  @Input() position: TooltipPosition = TooltipPosition.TOP;
  @Input() hideTooltipOnClick: boolean = false;
  @Input() content: string = '';

  visible: boolean = true;
  delay: number = 100;
  private timeout: any;

  private documentClickListener: (() => void) | null = null;

  ngOnInit() {
    if (this.hideTooltipOnClick) {
      this.documentClickListener = () => {
        this.visible = false;
      };
      document.addEventListener('click', this.documentClickListener);
    }
  }

  ngOnDestroy() {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = null;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.timeout = setTimeout(() => {
      this.visible = true;
    }, this.delay);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.visible = false;
  }


  getTooltipClasses(): string {
    const baseClass = 'dcx-ng-tooltip';
    const positionClass = `${baseClass}--${this.position}`;

    return `${baseClass} ${positionClass}`.trim();
  }
}

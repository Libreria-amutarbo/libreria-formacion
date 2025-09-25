import { Component, Input, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum TooltipStrategy {
  ABSOLUTE = 'absolute',
  FIXED = 'fixed'
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
  @Input() strategy: TooltipStrategy = TooltipStrategy.FIXED;
  @Input() content: string = '';
  @Input() visible: boolean = false;
  @Input() disabled: boolean = false;

  private documentClickListener: (() => void) | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    if (this.hideTooltipOnClick) {
      this.setupClickListener();
    }
  }

  ngOnDestroy() {
    this.removeClickListener();
  }

  private setupClickListener(): void {
    this.documentClickListener = () => {
      this.hide();
    };
    document.addEventListener('click', this.documentClickListener);
  }

  private removeClickListener(): void {
    if (this.documentClickListener) {
      document.removeEventListener('click', this.documentClickListener);
      this.documentClickListener = null;
    }
  }

  @HostListener('click', ['$event'])
  onTooltipClick(event: Event): void {
    if (this.hideTooltipOnClick) {
      event.stopPropagation();
    }
  }

  getTooltipClasses(): string {
    const baseClass = 'dcx-ng-tooltip';
    const positionClass = `${baseClass}--${this.position}`;
    const strategyClass = `${baseClass}--${this.strategy}`;
    const disabledClass = this.disabled ? `${baseClass}--disabled` : '';
    
    return `${baseClass} ${positionClass} ${strategyClass} ${disabledClass}`.trim();
  }

  show(): void {
    if (!this.disabled) {
      this.visible = true;
    }
  }

  hide(): void {
    this.visible = false;
  }

  toggle(): void {
    this.visible ? this.hide() : this.show();
  }
}

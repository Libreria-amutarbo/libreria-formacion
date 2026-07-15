import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  Overlay,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DcxPosition, TooltipArrowAlignment, TooltipVariant } from '../../core/interfaces';

// Se renderiza vía CDK Overlay (portal a document.body) para no depender de
// que ningún ancestro tenga overflow visible (diálogos, tarjetas, etc.),
// igual que dcx-ng-select. Cada entrada lleva el DcxPosition que representa,
// para poder reflejar la flecha en la posición realmente resuelta por CDK.
const ARROW_GAP = 8;

interface NamedPosition extends ConnectedPosition {
  dcxPosition: DcxPosition;
}

const POSITION_MAP: Record<DcxPosition, NamedPosition> = {
  top: {
    dcxPosition: 'top',
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -ARROW_GAP,
  },
  bottom: {
    dcxPosition: 'bottom',
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: ARROW_GAP,
  },
  left: {
    dcxPosition: 'left',
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -ARROW_GAP,
  },
  right: {
    dcxPosition: 'right',
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: ARROW_GAP,
  },
};

const INTERACTIVE_TAGS = ['a', 'button', 'input', 'select', 'textarea'];

@Component({
  selector: 'dcx-ng-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-tooltip.component.html',
  styleUrls: ['./dcx-ng-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgTooltipComponent implements AfterViewInit, OnDestroy {
  position = input<DcxPosition>('top');
  arrowAlignment = input<TooltipArrowAlignment>('center');
  hideTooltipOnClick = input<boolean>(false);
  content = input<string>('');
  contentHtml = input<string>('');
  variant = input<TooltipVariant>('default');

  visible = signal<boolean>(false);
  actualPosition = signal<DcxPosition>('top');

  readonly tooltipId = `dcx-tooltip-${Math.random().toString(36).substring(2, 9)}`;

  private readonly elementRef = inject(ElementRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);

  @ViewChild('tooltipTemplate') tooltipTemplate!: TemplateRef<unknown>;

  private overlayRef: OverlayRef | null = null;

  sanitizedHtml = computed(() => {
    const html = this.sanitizeContent(this.contentHtml());
    return html ? this.sanitizer.bypassSecurityTrustHtml(html) : null;
  });

  tooltipClasses = computed(() => {
    const baseClass = 'dcx-ng-tooltip';
    const positionClass = `${baseClass}--${this.actualPosition()}`;
    const arrowAlignmentClass = `${baseClass}--arrow-${this.arrowAlignment()}`;
    const variantClass =
      this.variant() === 'primary' ? `${baseClass}--primary` : '';
    return [baseClass, positionClass, arrowAlignmentClass, variantClass]
      .filter(Boolean)
      .join(' ');
  });

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.show();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hide();
  }

  @HostListener('focusin')
  onFocusIn(): void {
    this.show();
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.hide();
  }

  @HostListener('keydown.escape')
  onEscape(): void {
    this.hide();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.hideTooltipOnClick()) {
      const clickedInside = this.elementRef.nativeElement.contains(
        event.target,
      );
      if (clickedInside) {
        this.hide();
      }
    }
  }

  ngAfterViewInit(): void {
    this.actualPosition.set(this.position());
    this.linkTriggerToTooltip();
  }

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  private show(): void {
    if (this.visible() || (!this.content() && !this.contentHtml())) return;
    this.visible.set(true);
    this.open();
  }

  private hide(): void {
    if (!this.visible()) return;
    this.visible.set(false);
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private open(): void {
    const preferred = POSITION_MAP[this.position()];
    const fallbacks = Object.values(POSITION_MAP).filter(
      p => p.dcxPosition !== preferred.dcxPosition,
    );
    const positions: NamedPosition[] = [preferred, ...fallbacks];

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);

    positionStrategy.positionChanges.subscribe(change => {
      const resolved = this.matchPosition(change.connectionPair);
      if (resolved) this.actualPosition.set(resolved);
    });

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    this.overlayRef.attach(
      new TemplatePortal(this.tooltipTemplate, this.viewContainerRef),
    );
  }

  private matchPosition(pair: ConnectionPositionPair): DcxPosition | null {
    const match = Object.values(POSITION_MAP).find(
      p =>
        p.originX === pair.originX &&
        p.originY === pair.originY &&
        p.overlayX === pair.overlayX &&
        p.overlayY === pair.overlayY,
    );
    return match?.dcxPosition ?? null;
  }

  private linkTriggerToTooltip(): void {
    const trigger = this.elementRef.nativeElement.querySelector(
      '.tooltip-container > *',
    ) as HTMLElement | null;
    if (trigger) {
      this.renderer.setAttribute(trigger, 'aria-describedby', this.tooltipId);
    }
  }

  private sanitizeContent(html: string): string {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    INTERACTIVE_TAGS.forEach(tag => {
      doc.body.querySelectorAll(tag).forEach(el => {
        el.replaceWith(...Array.from(el.childNodes));
      });
    });
    return doc.body.innerHTML;
  }
}

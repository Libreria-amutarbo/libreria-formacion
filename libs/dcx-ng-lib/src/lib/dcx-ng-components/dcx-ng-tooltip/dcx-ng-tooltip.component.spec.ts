import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DcxNgTooltipComponent } from './dcx-ng-tooltip.component';

@Component({
  standalone: true,
  imports: [DcxNgTooltipComponent],
  template: `
    <dcx-ng-tooltip
      [position]="position"
      [arrowAlignment]="arrowAlignment"
      [hideTooltipOnClick]="hideTooltipOnClick"
      [content]="content"
      [contentHtml]="contentHtml"
      [variant]="variant"
    >
      <button type="button">Trigger</button>
    </dcx-ng-tooltip>
  `,
})
class TestHostComponent {
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  arrowAlignment: 'left' | 'center' | 'right' = 'center';
  hideTooltipOnClick = false;
  content = 'Texto de ayuda';
  contentHtml = '';
  variant: 'default' | 'primary' = 'default';
}

describe('DcxNgTooltipComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let tooltip: DcxNgTooltipComponent;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  const tooltipBubble = () =>
    overlayContainerElement.querySelector('[role="tooltip"]');

  const triggerButton = () =>
    hostFixture.nativeElement.querySelector('button') as HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    host = hostFixture.componentInstance;

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    hostFixture.detectChanges();
    tooltip = hostFixture.debugElement.children[0]
      .componentInstance as DcxNgTooltipComponent;
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should create', () => {
    expect(tooltip).toBeTruthy();
  });

  it('should generate a unique id per instance', () => {
    const fixture2 = TestBed.createComponent(TestHostComponent);
    fixture2.detectChanges();
    const tooltip2 = fixture2.debugElement.children[0]
      .componentInstance as DcxNgTooltipComponent;
    expect(tooltip.tooltipId).not.toBe(tooltip2.tooltipId);
  });

  it('should link the first projected child via aria-describedby', () => {
    expect(triggerButton().getAttribute('aria-describedby')).toBe(
      tooltip.tooltipId,
    );
  });

  describe('mouse interaction', () => {
    it('should show the tooltip on mouseenter', () => {
      tooltip.onMouseEnter();
      hostFixture.detectChanges();
      expect(tooltipBubble()).toBeTruthy();
    });

    it('should hide the tooltip on mouseleave', () => {
      tooltip.onMouseEnter();
      hostFixture.detectChanges();
      tooltip.onMouseLeave();
      hostFixture.detectChanges();
      expect(tooltipBubble()).toBeFalsy();
    });
  });

  describe('keyboard interaction (WCAG)', () => {
    it('should show the tooltip on focusin', () => {
      tooltip.onFocusIn();
      hostFixture.detectChanges();
      expect(tooltipBubble()).toBeTruthy();
    });

    it('should hide the tooltip on focusout', () => {
      tooltip.onFocusIn();
      hostFixture.detectChanges();
      tooltip.onFocusOut();
      hostFixture.detectChanges();
      expect(tooltipBubble()).toBeFalsy();
    });

    it('should hide the tooltip on Escape', () => {
      tooltip.onMouseEnter();
      hostFixture.detectChanges();
      expect(tooltipBubble()).toBeTruthy();

      tooltip.onEscape();
      hostFixture.detectChanges();
      expect(tooltipBubble()).toBeFalsy();
    });
  });

  it('should render the tooltip via CDK Overlay, not inside tooltip-container', () => {
    tooltip.onMouseEnter();
    hostFixture.detectChanges();

    const inline = hostFixture.nativeElement.querySelector(
      '.tooltip-container [role="tooltip"]',
    );
    expect(inline).toBeFalsy();
    expect(tooltipBubble()).toBeTruthy();
  });

  it('should not show the tooltip when there is no content', () => {
    host.content = '';
    hostFixture.detectChanges();
    tooltip.onMouseEnter();
    hostFixture.detectChanges();
    expect(tooltipBubble()).toBeFalsy();
  });

  it('should hide the tooltip on click when hideTooltipOnClick is true', () => {
    host.hideTooltipOnClick = true;
    hostFixture.detectChanges();
    tooltip.onMouseEnter();
    hostFixture.detectChanges();
    expect(tooltipBubble()).toBeTruthy();

    triggerButton().click();
    hostFixture.detectChanges();
    expect(tooltipBubble()).toBeFalsy();
  });

  describe('content sanitization (WCAG - no interactive content in role=tooltip)', () => {
    it('should strip an anchor tag but keep its text', () => {
      host.contentHtml = 'Ver <a href="#">más info</a> aquí';
      hostFixture.detectChanges();
      tooltip.onMouseEnter();
      hostFixture.detectChanges();

      const bubble = tooltipBubble();
      expect(bubble?.querySelector('a')).toBeFalsy();
      expect(bubble?.textContent).toContain('más info');
    });

    it('should strip button/input/select/textarea tags', () => {
      host.contentHtml =
        '<button>Click</button><input value="x"/><select></select><textarea></textarea>';
      hostFixture.detectChanges();
      tooltip.onMouseEnter();
      hostFixture.detectChanges();

      const bubble = tooltipBubble();
      expect(bubble?.querySelector('button')).toBeFalsy();
      expect(bubble?.querySelector('input')).toBeFalsy();
      expect(bubble?.querySelector('select')).toBeFalsy();
      expect(bubble?.querySelector('textarea')).toBeFalsy();
    });

    it('should preserve non-interactive formatting tags', () => {
      host.contentHtml = '<p><strong>Importante</strong>: <em>lee esto</em></p>';
      hostFixture.detectChanges();
      tooltip.onMouseEnter();
      hostFixture.detectChanges();

      const bubble = tooltipBubble();
      expect(bubble?.querySelector('strong')).toBeTruthy();
      expect(bubble?.querySelector('em')).toBeTruthy();
      expect(bubble?.querySelector('p')).toBeTruthy();
    });
  });

  it('should apply the primary variant class', () => {
    host.variant = 'primary';
    hostFixture.detectChanges();
    tooltip.onMouseEnter();
    hostFixture.detectChanges();

    expect(
      tooltipBubble()?.classList.contains('dcx-ng-tooltip--primary'),
    ).toBe(true);
  });

  it('should apply the default position/arrow classes', () => {
    tooltip.onMouseEnter();
    hostFixture.detectChanges();

    const classList = tooltipBubble()?.classList;
    expect(classList?.contains('dcx-ng-tooltip--top')).toBe(true);
    expect(classList?.contains('dcx-ng-tooltip--arrow-center')).toBe(true);
  });
});

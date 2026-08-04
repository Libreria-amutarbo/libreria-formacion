import './dcx-web-tooltip.component';

import { DcxWebTooltip } from './dcx-web-tooltip.component';

describe('DcxWebTooltip', () => {
  let element: DcxWebTooltip;

  beforeEach(async () => {
    element = document.createElement('dcx-web-tooltip') as DcxWebTooltip;

    element.content = 'Tooltip test';

    const button = document.createElement('button');

    button.textContent = 'Trigger';

    element.appendChild(button);

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebTooltip);
  });

  it('should generate unique tooltip id', () => {
    expect(element.tooltipId).toContain('dcx-tooltip-');
  });

  it('should show tooltip', async () => {
    element.show();

    await element.updateComplete;

    const tooltip = element.shadowRoot?.querySelector('[role="tooltip"]');

    expect(tooltip).toBeTruthy();
  });

  it('should hide tooltip', async () => {
    element.show();

    await element.updateComplete;

    element.hide();

    await element.updateComplete;

    const tooltip = element.shadowRoot?.querySelector('[role="tooltip"]');

    expect(tooltip).toBeFalsy();
  });

  it('should render role tooltip', async () => {
    element.show();

    await element.updateComplete;

    const tooltip = element.shadowRoot?.querySelector('[role="tooltip"]');

    expect(tooltip?.getAttribute('role')).toBe('tooltip');
  });

  it('should sanitize anchors', () => {
    element.contentHtml = 'hola #';

    expect(element.sanitizedHtml.includes('<a')).toBe(false);

    expect(element.sanitizedHtml).toContain('link');
  });

  it('should preserve strong tags', () => {
    element.contentHtml = '<strong>important</strong>';

    expect(element.sanitizedHtml).toContain('<strong>');
  });

  it('should apply primary class', async () => {
    element.variant = 'primary';

    element.show();

    await element.updateComplete;

    const tooltip = element.shadowRoot?.querySelector(
      '.dcx-ng-tooltip--primary',
    );

    expect(tooltip).toBeTruthy();
  });

  it('should apply top position class', async () => {
    element.position = 'top';

    element.show();

    await element.updateComplete;

    const tooltip = element.shadowRoot?.querySelector('.dcx-ng-tooltip--top');

    expect(tooltip).toBeTruthy();
  });

  it('should update position class dynamically when position property changes', async () => {
    element.show();

    await element.updateComplete;

    element.position = 'right';

    await element.updateComplete;

    const tooltip = element.shadowRoot?.querySelector('.dcx-ng-tooltip--right');

    expect(tooltip).toBeTruthy();
  });

  it('should hide on escape', async () => {
    element.show();

    element.onEscape();

    await element.updateComplete;

    expect(element.visible).toBe(false);
  });

  it('should hide on click when hideTooltipOnClick=true', async () => {
    element.hideTooltipOnClick = true;

    element.show();

    element.onClick();

    await element.updateComplete;

    expect(element.visible).toBe(false);
  });
});

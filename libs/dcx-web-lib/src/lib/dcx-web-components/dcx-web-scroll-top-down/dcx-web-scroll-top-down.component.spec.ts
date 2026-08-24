import './dcx-web-scroll-top-down.component';

import { DcxWebScrollTopDown } from './dcx-web-scroll-top-down.component';

describe('DcxWebScrollTopDown', () => {
  let element: DcxWebScrollTopDown;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-scroll-top-down',
    ) as DcxWebScrollTopDown;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebScrollTopDown);
  });

  it('should have default values', () => {
    expect(element.smooth).toBe(true);
    expect(element.size).toBe('m');
    expect(element.iconSize).toBe('s');
    expect(element.showTop).toBe(true);
    expect(element.showBottom).toBe(true);
  });

  it('should keep default labels', () => {
    expect(element.topLabel).toBe('Ir arriba');

    expect(element.bottomLabel).toBe('Ir abajo');

    expect(element.groupLabel).toBe('Controles de desplazamiento');
  });

  it('should render group role', async () => {
    const group = element.shadowRoot?.querySelector(
      '.dcx-scroll-top-down__group',
    );

    expect(group?.getAttribute('role')).toBe('group');
  });

  it('should expose aria-label', async () => {
    const group = element.shadowRoot?.querySelector(
      '.dcx-scroll-top-down__group',
    );

    expect(group?.getAttribute('aria-label')).toBe(
      'Controles de desplazamiento',
    );
  });

  it('should hide top button at top', () => {
    expect(element.isTopVisible).toBe(false);
  });

  it('should apply hidden class when both hidden', () => {
    element.isAtTop = true;
    element.isAtBottom = true;

    expect(element.scrollClasses).toContain('dcx-scroll-top-down--hidden');
  });

  it('should apply button size class', () => {
    element.size = 'l';

    expect(element.buttonClasses('top')).toContain(
      'dcx-scroll-top-down__button--l',
    );
  });

  it('should scroll window to top', () => {
    const spy = jest.spyOn(window, 'scrollTo').mockImplementation();

    element.scrollToTop();

    expect(spy).toHaveBeenCalled();
  });

  it('should scroll window to bottom', () => {
    const spy = jest.spyOn(window, 'scrollTo').mockImplementation();

    element.scrollToBottom();

    expect(spy).toHaveBeenCalled();
  });

  it('should return auto behavior when smooth is false', () => {
    element.smooth = false;

    expect(element.scrollBehavior()).toBe('auto');
  });

  it('should support reduced motion', () => {
    const original = window.matchMedia;

    (window as any).matchMedia = jest.fn().mockReturnValue({
      matches: true,
    });

    expect(element.scrollBehavior()).toBe('auto');

    (window as any).matchMedia = original;
  });
});

import './dcx-web-breadcrumb.component';
import { DcxWebBreadcrumb } from './dcx-web-breadcrumb.component';
import type { DcxBreadcrumbItem } from '../../core/interfaces/breadcrumb';

describe('DcxWebBreadcrumb', () => {
  let element: DcxWebBreadcrumb;

  const defaultItems: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '/', disabled: false },
    { label: 'Catálogo', href: '/catalogo', disabled: false },
    { label: 'Portátiles', disabled: false },
  ];

  const overflowItems: DcxBreadcrumbItem[] = [
    { label: 'Inicio', href: '/', disabled: false },
    { label: 'Electrónica', href: '/electronica', disabled: false },
    { label: 'Ordenadores', href: '/ordenadores', disabled: false },
    { label: 'Portátiles', href: '/portatiles', disabled: false },
    { label: 'Gaming', disabled: false },
  ];

  beforeEach(async () => {
    element = document.createElement('dcx-web-breadcrumb') as DcxWebBreadcrumb;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebBreadcrumb);
  });

  it('should render correct number of visible items when length <= 3', async () => {
    element.items = defaultItems;
    await element.updateComplete;

    const listItems = element.shadowRoot?.querySelectorAll('.dcx-bc__item');
    expect(listItems?.length).toBe(3);

    const ellipsis = element.shadowRoot?.querySelector('.dcx-bc__item--ellipsis');
    expect(ellipsis).toBeNull();
  });

  it('should render standard links and buttons correctly', async () => {
    element.items = [
      { label: 'Inicio', href: '/', disabled: false },
      { label: 'Acción', disabled: false },
      { label: 'Portátiles', disabled: false }
    ];
    await element.updateComplete;

    const links = element.shadowRoot?.querySelectorAll('.dcx-bc__link');
    const buttons = element.shadowRoot?.querySelectorAll('.dcx-bc__action-btn');
    const current = element.shadowRoot?.querySelector('.dcx-bc__current');

    expect(links?.length).toBe(1);
    expect(buttons?.length).toBe(1);
    expect(current?.textContent?.trim()).toBe('Portátiles');
  });

  it('should apply disabled attributes and classes correctly', async () => {
    element.items = [
      { label: 'Inicio', href: '/', disabled: true },
      { label: 'Acción', disabled: true },
      { label: 'Actual', disabled: true }
    ];
    await element.updateComplete;

    const link = element.shadowRoot?.querySelector('.dcx-bc__link');
    const button = element.shadowRoot?.querySelector('.dcx-bc__action-btn');
    const current = element.shadowRoot?.querySelector('.dcx-bc__current');

    expect(link?.getAttribute('aria-disabled')).toBe('true');
    expect(button?.getAttribute('disabled')).not.toBeNull();
    expect(button?.getAttribute('aria-disabled')).toBe('true');
    expect(current?.classList.contains('disabled')).toBe(true);
  });

  it('should mark the last item with aria-current="page"', async () => {
    element.items = defaultItems;
    await element.updateComplete;

    const current = element.shadowRoot?.querySelector('.dcx-bc__current');
    expect(current?.getAttribute('aria-current')).toBe('page');
  });

  it('should render item icon when icon field is provided', async () => {
    element.items = [
      { label: 'Inicio', href: '/', icon: 'house', disabled: false },
      { label: 'Final', disabled: false }
    ];
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.dcx-bc__link dcx-web-icon[name="house"]');
    expect(icon).not.toBeNull();
  });

  it('should emit itemSelected event when a non-disabled item is clicked', async () => {
    element.items = defaultItems;
    await element.updateComplete;

    const selectedSpy = jest.fn();
    element.addEventListener('itemSelected', selectedSpy);

    const link = element.shadowRoot?.querySelector('.dcx-bc__link') as HTMLElement;
    link.click();

    expect(selectedSpy).toHaveBeenCalled();
    expect(selectedSpy.mock.calls[0][0].detail).toEqual(defaultItems[0]);
  });

  it('should not emit itemSelected event when a disabled item is clicked', async () => {
    element.items = [
      { label: 'Inicio', href: '/', disabled: true },
      { label: 'Acción', disabled: true },
      { label: 'Final', disabled: false }
    ];
    await element.updateComplete;

    const selectedSpy = jest.fn();
    element.addEventListener('itemSelected', selectedSpy);

    const link = element.shadowRoot?.querySelector('.dcx-bc__link') as HTMLElement;
    link.click();

    const button = element.shadowRoot?.querySelector('.dcx-bc__action-btn') as HTMLElement;
    button.click();

    expect(selectedSpy).not.toHaveBeenCalled();
  });

  describe('Ellipsis / Overflow Menu', () => {
    beforeEach(async () => {
      element.items = overflowItems;
      await element.updateComplete;
    });

    it('should show ellipsis button when items.length > 3', () => {
      const ellipsisItem = element.shadowRoot?.querySelector('.dcx-bc__item--ellipsis');
      expect(ellipsisItem).not.toBeNull();

      const ellipsisBtn = element.shadowRoot?.querySelector('.dcx-bc__ellipsis-btn');
      expect(ellipsisBtn).not.toBeNull();
    });

    it('should only show the last 3 items as visible items', () => {
      const visibleItems = element.shadowRoot?.querySelectorAll('.dcx-bc__item:not(.dcx-bc__item--ellipsis)');
      expect(visibleItems?.length).toBe(3);

      const firstVisible = visibleItems?.[0];
      const secondVisible = visibleItems?.[1];
      const thirdVisible = visibleItems?.[2];

      expect(firstVisible?.textContent?.trim()).toContain('Ordenadores');
      expect(secondVisible?.textContent?.trim()).toContain('Portátiles');
      expect(thirdVisible?.textContent?.trim()).toContain('Gaming');
    });

    it('should toggle ellipsis dropdown menu open and closed', async () => {
      const dropdown = element.shadowRoot?.querySelector('.dcx-context-menu');
      const ellipsisBtn = element.shadowRoot?.querySelector('.dcx-bc__ellipsis-btn') as any;

      expect(dropdown?.classList.contains('open')).toBe(false);
      expect(ellipsisBtn.getAttribute('aria-expanded')).toBe('false');

      ellipsisBtn.click();
      await element.updateComplete;

      expect(dropdown?.classList.contains('open')).toBe(true);
      expect(ellipsisBtn.getAttribute('aria-expanded')).toBe('true');

      ellipsisBtn.click();
      await element.updateComplete;

      expect(dropdown?.classList.contains('open')).toBe(false);
      expect(ellipsisBtn.getAttribute('aria-expanded')).toBe('false');
    });

    it('should render hidden items in the dropdown menu', () => {
      const hiddenItems = element.shadowRoot?.querySelectorAll('.dcx-context-menu__item');
      expect(hiddenItems?.length).toBe(2);
      expect(hiddenItems?.[0]?.textContent?.trim()).toBe('Inicio');
      expect(hiddenItems?.[1]?.textContent?.trim()).toBe('Electrónica');
    });

    it('should emit itemSelected when a hidden item is clicked and close the menu', async () => {
      const selectedSpy = jest.fn();
      element.addEventListener('itemSelected', selectedSpy);

      const ellipsisBtn = element.shadowRoot?.querySelector('.dcx-bc__ellipsis-btn') as any;
      ellipsisBtn.click();
      await element.updateComplete;

      const originalLocation = window.location;
      const mockAssign = jest.fn();
      delete (window as any).location;
      window.location = {
        ...originalLocation,
        assign: mockAssign,
      } as any;

      const firstHidden = element.shadowRoot?.querySelector('.dcx-context-menu__item') as HTMLElement;
      firstHidden.click();
      await element.updateComplete;

      expect(selectedSpy).toHaveBeenCalled();
      expect(selectedSpy.mock.calls[0][0].detail).toEqual(overflowItems[0]);

      expect(mockAssign).toHaveBeenCalledWith('/');

      const dropdown = element.shadowRoot?.querySelector('.dcx-context-menu');
      expect(dropdown?.classList.contains('open')).toBe(false);

      (window as any).location = originalLocation;
    });

    it('should close dropdown menu on Escape key press', async () => {
      const ellipsisBtn = element.shadowRoot?.querySelector('.dcx-bc__ellipsis-btn') as any;
      ellipsisBtn.click();
      await element.updateComplete;

      const dropdown = element.shadowRoot?.querySelector('.dcx-context-menu');
      expect(dropdown?.classList.contains('open')).toBe(true);

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      await element.updateComplete;

      expect(dropdown?.classList.contains('open')).toBe(false);
    });

    it('should close dropdown menu on outside click', async () => {
      const ellipsisBtn = element.shadowRoot?.querySelector('.dcx-bc__ellipsis-btn') as any;
      ellipsisBtn.click();
      await element.updateComplete;

      const dropdown = element.shadowRoot?.querySelector('.dcx-context-menu');
      expect(dropdown?.classList.contains('open')).toBe(true);

      const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
      document.body.dispatchEvent(clickEvent);
      await element.updateComplete;

      expect(dropdown?.classList.contains('open')).toBe(false);
    });
  });
});

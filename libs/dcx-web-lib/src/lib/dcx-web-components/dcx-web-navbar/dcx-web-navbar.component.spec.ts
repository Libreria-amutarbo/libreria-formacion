import './dcx-web-navbar.component';

import { DcxWebNavbar } from './dcx-web-navbar.component';

describe('DcxWebNavbar', () => {
  let element: DcxWebNavbar;

  beforeEach(async () => {
    element = document.createElement('dcx-web-navbar') as DcxWebNavbar;

    element.items = [
      {
        label: 'Inicio',
        value: 'home',
        icon: 'house',
      },
      {
        label: 'Componentes',
        value: 'components',
        icon: 'grid',
      },
      {
        label: 'Bloqueado',
        value: 'blocked',
        disabled: true,
      },
    ];

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    if (document.body.contains(element)) {
      document.body.removeChild(element);
    }
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebNavbar);
  });

  describe('Default Properties', () => {
    it('should default vertical to false', () => {
      expect(element.vertical).toBe(false);
    });

    it('should default menu closed', () => {
      expect(element.isMenuOpen).toBe(false);
    });

    it('should default brand title', () => {
      expect(element.brand.title).toBe('App');
    });
  });

  describe('Functional', () => {
    it('should toggle menu', () => {
      element.toggleMenu();

      expect(element.isMenuOpen).toBe(true);

      element.toggleMenu();

      expect(element.isMenuOpen).toBe(false);
    });

    it('should emit itemClick', () => {
      const spy = jest.fn();

      element.addEventListener('itemClick', spy);

      element.onItemClick('home');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toBe('home');
    });

    it('should emit brandClick', () => {
      const spy = jest.fn();

      element.addEventListener('brandClick', spy);

      element.onBrandClick();

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should close menu after item click', () => {
      element.isMenuOpen = true;

      element.onItemClick('home');

      expect(element.isMenuOpen).toBe(false);
    });

    it('should close menu', () => {
      element.isMenuOpen = true;

      element.closeMenu();

      expect(element.isMenuOpen).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should render nav element', () => {
      const nav = element.shadowRoot?.querySelector('nav');

      expect(nav).toBeTruthy();
    });

    it('should set aria label', async () => {
      element.ariaLabel = 'Navegación principal';

      await element.updateComplete;

      const nav = element.shadowRoot?.querySelector('nav');

      expect(nav?.getAttribute('aria-label')).toBe('Navegación principal');
    });

    it('should render items role list', () => {
      const list = element.shadowRoot?.querySelector('.dcx-navbar__items');

      expect(list?.getAttribute('role')).toBe('list');
    });

    it('should render list id', () => {
      const list = element.shadowRoot?.querySelector('.dcx-navbar__items');

      expect(list?.id).toBeTruthy();
    });
  });

  describe('Rendering', () => {
    it('should render brand title', async () => {
      element.brand = {
        title: 'Mi App',
      };

      await element.updateComplete;

      const title = element.shadowRoot?.querySelector(
        '.dcx-navbar__brand-title',
      );

      expect(title?.textContent).toContain('Mi App');
    });

    it('should render brand logo when provided', async () => {
      element.brand = {
        title: 'Mi App',
        logo: '/cap-logo.svg',
      };

      await element.updateComplete;

      const img = element.shadowRoot?.querySelector(
        '.dcx-navbar__brand-logo',
      ) as HTMLImageElement | null;

      expect(img).toBeTruthy();

      if (img) {
        expect(img.src).toContain('/cap-logo.svg');

        expect(img.alt).toBe('Mi App');
      }
    });

    it('should render nav items', () => {
      const items = element.shadowRoot?.querySelectorAll('.dcx-navbar__item');

      expect(items?.length).toBe(3);
    });

    it('should render active item class', async () => {
      element.activeValue = 'home';

      await element.updateComplete;

      const activeButton = element.shadowRoot?.querySelector('.is-active');

      expect(activeButton).toBeTruthy();
    });

    it('should apply vertical modifier', async () => {
      element.vertical = true;

      await element.updateComplete;

      const nav = element.shadowRoot?.querySelector('.dcx-navbar');

      expect(nav?.classList.contains('dcx-navbar--vertical')).toBe(true);
    });
  });

  describe('Menu behaviour', () => {
    it('should keep menu closed by default', () => {
      expect(element.isMenuOpen).toBe(false);
    });

    it('should open menu', () => {
      element.toggleMenu();

      expect(element.isMenuOpen).toBe(true);
    });

    it('should close menu after multiple toggles', () => {
      element.toggleMenu();
      element.toggleMenu();

      expect(element.isMenuOpen).toBe(false);
    });
  });
});

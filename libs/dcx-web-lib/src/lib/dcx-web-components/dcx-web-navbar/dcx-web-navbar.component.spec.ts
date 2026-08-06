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
    document.body.removeChild(element);
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

      expect(spy).toHaveBeenCalled();
    });

    it('should emit brandClick', () => {
      const spy = jest.fn();

      element.addEventListener('brandClick', spy);

      element.onBrandClick();

      expect(spy).toHaveBeenCalled();
    });

    it('should close menu after item click', () => {
      element.isMenuOpen = true;

      element.onItemClick('home');

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
  });

  describe('Rendering', () => {
    it('should render brand title', async () => {
      element.brand = {
        title: 'Mi App',
      };

      await element.updateComplete;

      expect(element.shadowRoot?.textContent).toContain('Mi App');
    });

    it('should render nav items', () => {
      const items = element.shadowRoot?.querySelectorAll('.dcx-navbar__item');

      expect(items?.length).toBe(3);
    });

    it('should apply vertical modifier', async () => {
      element.vertical = true;

      await element.updateComplete;

      const nav = element.shadowRoot?.querySelector('.dcx-navbar');

      expect(nav?.classList.contains('dcx-navbar--vertical')).toBe(true);
    });
  });
});

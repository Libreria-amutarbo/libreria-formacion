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

    it('should set aria-expanded on toggle', async () => {
      element.isMenuOpen = false;
      await element.updateComplete;

      const toggle = element.shadowRoot?.querySelector('.dcx-navbar__toggle');

      expect(toggle?.getAttribute('aria-expanded')).toBe('false');

      element.toggleMenu();
      await element.updateComplete;

      expect(toggle?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should render items role list', () => {
      const list = element.shadowRoot?.querySelector('.dcx-navbar__items');

      expect(list?.getAttribute('role')).toBe('list');
    });

    it('should use matching aria-controls id on toggle and list', () => {
      const toggle = element.shadowRoot?.querySelector('.dcx-navbar__toggle');
      const list = element.shadowRoot?.querySelector('.dcx-navbar__items');

      expect(toggle?.getAttribute('aria-controls')).toBe(
        list?.getAttribute('id'),
      );
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
      expect(img?.src).toContain('/cap-logo.svg');
      expect(img?.alt).toBe('Mi App');
    });

    it('should render nav items', () => {
      const items = element.shadowRoot?.querySelectorAll('.dcx-navbar__item');

      expect(items?.length).toBe(3);
    });

    it('should set aria-controls on toggle matching the items list id', async () => {
      element.isMenuOpen = true;
      await element.updateComplete;

      const toggle = element.shadowRoot?.querySelector('.dcx-navbar__toggle');
      const list = element.shadowRoot?.querySelector('.dcx-navbar__items');

      expect(toggle?.getAttribute('aria-controls')).toBe(
        list?.getAttribute('id'),
      );
    });

    it('should render active item with aria-current', async () => {
      element.activeValue = 'home';
      await element.updateComplete;

      const activeButton = element.shadowRoot?.querySelector(
        'dcx-web-button.is-active',
      );
      expect(activeButton).toBeTruthy();
      expect(activeButton?.getAttribute('aria-current')).toBe('page');
    });

    it('should not emit itemClick for disabled items', async () => {
      const spy = jest.fn();
      element.addEventListener('itemClick', spy);
      element.items = [
        { label: 'Deshabilitado', value: 'disabled', disabled: true },
      ];
      await element.updateComplete;

      const button = element.shadowRoot?.querySelector('dcx-web-button');
      button?.click();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should apply vertical modifier', async () => {
      element.vertical = true;

      await element.updateComplete;

      const nav = element.shadowRoot?.querySelector('.dcx-navbar');

      expect(nav?.classList.contains('dcx-navbar--vertical')).toBe(true);
    });
  });
});

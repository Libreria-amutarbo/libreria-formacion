import './dcx-web-page-tabs.component';

import { DcxWebPageTabs } from './dcx-web-page-tabs.component';

describe(
  'DcxWebPageTabs',
  () => {
    let element: DcxWebPageTabs;

    beforeEach(async () => {
      element = document.createElement(
        'dcx-web-page-tabs',
      ) as DcxWebPageTabs;

      document.body.appendChild(
        element,
      );

      await element.updateComplete;
    });

    afterEach(() => {
      document.body.removeChild(
        element,
      );
    });

    it('should create', () => {
      expect(element).toBeTruthy();
    });

    it('should render page title', () => {
      const title =
        element.shadowRoot?.querySelector(
          '.demo-page-header__title',
        );

      expect(
        title?.textContent,
      ).toContain('Tabs');
    });

    it('should render all sections', () => {
      const sections =
        element.shadowRoot?.querySelectorAll(
          '.demo-section',
        );

      expect(
        sections?.length,
      ).toBe(10);
    });

    it('should render all section titles', () => {
      const text =
        element.shadowRoot
          ?.textContent ?? '';

      expect(text).toContain(
        'Line',
      );

      expect(text).toContain(
        'Con pestañas deshabilitadas',
      );

      expect(text).toContain(
        'Con iconos',
      );

      expect(text).toContain(
        'Con badges de recuento',
      );

      expect(text).toContain(
        'Con scroll horizontal',
      );

      expect(text).toContain(
        'Con controles numerados',
      );

      expect(text).toContain(
        'Con contenido de componentes',
      );

      expect(text).toContain(
        'Brand',
      );

      expect(text).toContain(
        'Pill',
      );

      expect(text).toContain(
        'Subtle',
      );
    });

    it('should render tabs components', () => {
      const tabs =
        element.shadowRoot?.querySelectorAll(
          'dcx-web-tabs',
        );

      expect(
        tabs?.length,
      ).toBe(10);
    });

    it('should have default selected tab', () => {
      expect(
        element.selectedTabId,
      ).toBe('tab1');
    });

    it('should update selected content tab', () => {
      element.onTabChange('select');
      ;

      expect(
        element
          .selectedTabIdContent,
      ).toBe('select');
    });

    it('should render projected demo content', async () => {
      const text =
        element.shadowRoot
          ?.textContent ?? '';

      expect(text).toContain(
        'Con contenido de componentes',
      );
    });

    it('should render page description', () => {
      const text =
        element.shadowRoot
          ?.textContent ?? '';

      expect(text).toContain(
        'Navegación entre distintas áreas de contenido',
      );
    });
  },
);
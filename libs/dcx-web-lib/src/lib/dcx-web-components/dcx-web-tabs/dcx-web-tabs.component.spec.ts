import './dcx-web-tabs.component';

import { DcxWebTabs } from './dcx-web-tabs.component';

describe('DcxWebTabs', () => {
  let element: DcxWebTabs;

  const tabs = [
    {
      id: 'tab1',
      label: 'Tab 1',
    },
    {
      id: 'tab2',
      label: 'Tab 2',
    },
    {
      id: 'tab3',
      label: 'Tab 3',
    },
  ];

  beforeEach(async () => {
    Element.prototype.scrollIntoView = jest.fn();

    element = document.createElement('dcx-web-tabs') as DcxWebTabs;

    element.tabs = tabs;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebTabs);
  });

  describe('Default Properties', () => {
    it('should have line variant by default', () => {
      expect(element.variant).toBe('line');
    });

    it('should have controls disabled by default', () => {
      expect(element.hasControls).toBeFalsy();
    });

    it('should have active tab initialized', () => {
      expect(element._activeTabId).toBe('tab1');
    });
  });

  describe('Rendering', () => {
    it('should render all tabs', () => {
      const buttons = element.shadowRoot?.querySelectorAll('.dcx-tab__button');

      expect(buttons?.length).toBe(3);
    });

    it('should render tab panel', () => {
      const panel = element.shadowRoot?.querySelector('.dcx-tab__panel');

      expect(panel).toBeTruthy();
    });

    it('should render slot inside panel', () => {
      const slot = element.shadowRoot?.querySelector('slot');

      expect(slot).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('should emit tabChange', () => {
      const spy = jest.fn();

      element.addEventListener('tabChange', spy);

      element.selectTab('tab2');

      expect(spy).toHaveBeenCalled();
    });

    it('should emit selected tab id', () => {
      const spy = jest.fn();

      element.addEventListener('tabChange', spy);

      element.selectTab('tab2');

      const event = spy.mock.calls[0][0];

      expect(event.detail).toBe('tab2');
    });
  });

  describe('Tab Selection', () => {
    it('should activate selected tab', () => {
      element.selectTab('tab2');

      expect(element.isActive('tab2')).toBe(true);
    });

    it('should deactivate previous tab', () => {
      element.selectTab('tab2');

      expect(element.isActive('tab1')).toBe(false);
    });

    it('should compute activeTab', () => {
      element.selectTab('tab3');

      expect(element.activeTab?.id).toBe('tab3');
    });
  });

  describe('Disabled tabs', () => {
    it('should not select disabled tab', async () => {
      element.tabs = [
        tabs[0],
        {
          id: 'tab2',
          label: 'Tab 2',
          disabled: true,
        },
        tabs[2],
      ];

      await element.updateComplete;

      element.selectTab('tab1');
      element.selectTab('tab2');

      expect(element.isActive('tab1')).toBe(true);

      expect(element.isActive('tab2')).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should render tablist role', () => {
      const tablist = element.shadowRoot?.querySelector('[role="tablist"]');

      expect(tablist).toBeTruthy();
    });

    it('should render tab role', () => {
      const tab = element.shadowRoot?.querySelector('[role="tab"]');

      expect(tab).toBeTruthy();
    });

    it('should render tabpanel role', () => {
      const panel = element.shadowRoot?.querySelector('[role="tabpanel"]');

      expect(panel).toBeTruthy();
    });

    it('should apply roving tabindex', async () => {
      element.selectTab('tab2');

      await element.updateComplete;

      const tab1 = element.shadowRoot?.querySelector(
        '[data-tab="tab1"]',
      ) as HTMLButtonElement;

      const tab2 = element.shadowRoot?.querySelector(
        '[data-tab="tab2"]',
      ) as HTMLButtonElement;

      expect(tab1.tabIndex).toBe(-1);

      expect(tab2.tabIndex).toBe(0);
    });

    it('should set aria-label on tablist', async () => {
      element.ariaLabel = 'Navegación';

      await element.updateComplete;

      const tablist = element.shadowRoot?.querySelector('[role="tablist"]');

      expect(tablist?.getAttribute('aria-label')).toBe('Navegación');
    });

    it('should connect tab and panel', async () => {
      const tab = element.shadowRoot?.querySelector('[data-tab="tab1"]');

      const panel = element.shadowRoot?.querySelector('.dcx-tab__panel');

      expect(panel?.getAttribute('aria-labelledby')).toBe('tab1');

      expect(tab?.getAttribute('aria-controls')).toBe('panel-tab1');
    });
  });

  describe('Badges', () => {
    it('should render badge', async () => {
      element.tabs = [
        {
          id: 'tab1',
          label: 'Dashboard',
          badge: 3,
        },
      ];

      await element.updateComplete;

      const badge = element.shadowRoot?.querySelector('.dcx-tab__badge');

      expect(badge?.textContent?.trim()).toBe('3');
    });
  });

  describe('Controls', () => {
    it('should render controls when enabled', async () => {
      element.hasControls = true;

      await element.updateComplete;

      const controls = element.shadowRoot?.querySelector('.dcx-tabs__controls');

      expect(controls).toBeTruthy();
    });

    it('should not render controls by default', () => {
      const controls = element.shadowRoot?.querySelector('.dcx-tabs__controls');

      expect(controls).toBeFalsy();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate right', () => {
      element.selectTab('tab1');

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
      });

      element.onKeydown(event);

      expect(element.isActive('tab2')).toBe(true);
    });

    it('should navigate left wrapping', () => {
      element.selectTab('tab1');

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
      });

      element.onKeydown(event);

      expect(element.isActive('tab3')).toBe(true);
    });

    it('should navigate home', () => {
      element.selectTab('tab3');

      const event = new KeyboardEvent('keydown', {
        key: 'Home',
      });

      element.onKeydown(event);

      expect(element.isActive('tab1')).toBe(true);
    });

    it('should navigate end', () => {
      element.selectTab('tab1');

      const event = new KeyboardEvent('keydown', {
        key: 'End',
      });

      element.onKeydown(event);

      expect(element.isActive('tab3')).toBe(true);
    });

    it('should call preventDefault', () => {
      element.selectTab('tab1');

      const event = new KeyboardEvent('keydown', {
        key: 'ArrowRight',
      });

      const spy = jest.spyOn(event, 'preventDefault');

      element.onKeydown(event);

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Variants', () => {
    it('should render pill header class', async () => {
      element.variant = 'pill';

      await element.updateComplete;

      const header = element.shadowRoot?.querySelector('.dcx-tabs__header');

      expect(header?.classList.contains('dcx-tabs__header--pill')).toBe(true);
    });

    it('should render brand variant class', async () => {
      element.variant = 'brand';

      await element.updateComplete;

      const button = element.shadowRoot?.querySelector('.dcx-tab__button');

      expect(button?.classList.contains('dcx-tab__button--brand')).toBe(true);
    });
  });

  describe('Scroll', () => {
    it('should call scrollIntoView after select', () => {
      element.selectTab('tab2');

      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('should update scroll buttons without error', () => {
      element.updateScrollButtons();

      expect(typeof element.canScrollLeft).toBe('boolean');

      expect(typeof element.canScrollRight).toBe('boolean');
    });
  });
});

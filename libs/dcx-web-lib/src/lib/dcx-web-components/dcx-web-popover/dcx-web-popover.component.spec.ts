import './dcx-web-popover.component';
import { DcxWebPopover } from './dcx-web-popover.component';

describe('DcxWebPopover', () => {
  let element: DcxWebPopover;

  beforeEach(async () => {
    element = document.createElement('dcx-web-popover') as DcxWebPopover;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.hide();
    if (element.parentNode) {
      document.body.removeChild(element);
    }
  });

  it('should create', () => {
    expect(element).toBeInstanceOf(DcxWebPopover);
  });

  describe('Initial state', () => {
    it('should be closed by default', () => {
      expect(element.isOpen).toBe(false);
    });
  });

  describe('toggle()', () => {
    it('should open the popover when closed', () => {
      const mockTarget = document.createElement('button');
      element.toggle(null, mockTarget);
      expect(element.isOpen).toBe(true);
    });

    it('should close the popover when open', () => {
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      expect(element.isOpen).toBe(true);

      element.toggle(null, mockTarget);
      expect(element.isOpen).toBe(false);
    });
  });

  describe('show()', () => {
    it('should set isOpen to true', () => {
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      expect(element.isOpen).toBe(true);
    });

    it('should not open if no target element is provided', () => {
      element.show(null, undefined);
      expect(element.isOpen).toBe(false);
    });

    it('should use event.currentTarget if targetElement is not provided', () => {
      const mockTarget = document.createElement('button');
      const mockEvent = { currentTarget: mockTarget } as unknown as Event;

      element.show(mockEvent);
      expect(element.isOpen).toBe(true);
    });
  });

  describe('hide()', () => {
    it('should set isOpen to false', () => {
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      expect(element.isOpen).toBe(true);

      element.hide();
      expect(element.isOpen).toBe(false);
    });

    it('should do nothing if already closed', () => {
      expect(element.isOpen).toBe(false);
      element.hide();
      expect(element.isOpen).toBe(false);
    });
  });

  describe('onEscapeKey', () => {
    it('should close the popover when Escape key is pressed', () => {
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      expect(element.isOpen).toBe(true);

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      expect(element.isOpen).toBe(false);
    });

    it('should do nothing if popover is already closed', () => {
      expect(element.isOpen).toBe(false);

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      expect(element.isOpen).toBe(false);
    });
  });

  describe('onDocumentClick', () => {
    it('should close the popover when clicking outside', async () => {
      const mockTarget = document.createElement('button');
      const outsideElement = document.createElement('div');
      document.body.appendChild(mockTarget);
      document.body.appendChild(outsideElement);

      element.show(null, mockTarget);
      await element.updateComplete;

      (element as any).ignoreNextClick = false;

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        composed: true,
      });
      outsideElement.dispatchEvent(clickEvent);

      expect(element.isOpen).toBe(false);

      document.body.removeChild(mockTarget);
      document.body.removeChild(outsideElement);
    });

    it('should not close when clicking inside the target', async () => {
      const mockTarget = document.createElement('button');
      document.body.appendChild(mockTarget);

      element.show(null, mockTarget);
      await element.updateComplete;

      (element as any).ignoreNextClick = false;

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        composed: true,
      });
      mockTarget.dispatchEvent(clickEvent);

      expect(element.isOpen).toBe(true);

      document.body.removeChild(mockTarget);
    });

    it('should do nothing if popover is closed', () => {
      const clickEvent = new MouseEvent('click', { bubbles: true });
      document.dispatchEvent(clickEvent);

      expect(element.isOpen).toBe(false);
    });
  });

  describe('Events', () => {
    it('should emit opened on show and closed on hide', () => {
      const openedSpy = jest.fn();
      const closedSpy = jest.fn();

      element.addEventListener('opened', openedSpy);
      element.addEventListener('closed', closedSpy);

      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      expect(openedSpy).toHaveBeenCalledTimes(1);

      element.hide();
      expect(closedSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('bugs', () => {
    it('should reset ignoreNextClick when hidden', () => {
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      expect((element as any).ignoreNextClick).toBe(true);

      element.hide();
      expect((element as any).ignoreNextClick).toBe(false);
    });
  });

  describe('WCAG AA', () => {
    const panel = (): HTMLElement | null =>
      element.shadowRoot?.querySelector('.dcx-popover') ?? null;

    it('exposes role="dialog" and a unique panel id by default', async () => {
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      await element.updateComplete;

      expect(panel()?.getAttribute('role')).toBe('dialog');
      expect(panel()?.getAttribute('id')).toBe(element.panelId);
      expect(panel()?.getAttribute('tabindex')).toBe('-1');
    });

    it('renders a decorative caret (aria-hidden) inside the panel', async () => {
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      await element.updateComplete;

      const arrow = panel()?.querySelector('.dcx-popover__arrow');
      expect(arrow).toBeTruthy();
      expect(arrow?.getAttribute('aria-hidden')).toBe('true');
    });

    it('reflects a configurable role and aria-label', async () => {
      element.role = 'menu';
      element.ariaLabel = 'Acciones';
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      await element.updateComplete;

      expect(panel()?.getAttribute('role')).toBe('menu');
      expect(panel()?.getAttribute('aria-label')).toBe('Acciones');
    });

    it('prefers aria-labelledby over aria-label', async () => {
      element.ariaLabel = 'Acciones';
      element.ariaLabelledby = 'heading-1';
      const mockTarget = document.createElement('button');
      element.show(null, mockTarget);
      await element.updateComplete;

      expect(panel()?.getAttribute('aria-labelledby')).toBe('heading-1');
      expect(panel()?.hasAttribute('aria-label')).toBe(false);
    });

    it('moves focus into the panel when opened', async () => {
      jest.useFakeTimers();
      const mockTarget = document.createElement('button');
      document.body.appendChild(mockTarget);

      element.show(null, mockTarget);
      await element.updateComplete;
      jest.runAllTimers();

      await Promise.resolve();

      const activeEl = document.activeElement;
      expect(
        panel()?.contains(activeEl) ||
          activeEl === element ||
          activeEl === panel(),
      ).toBe(true);

      element.hide();
      document.body.removeChild(mockTarget);
      jest.useRealTimers();
    });

    it('returns focus to the trigger when closed with Escape', async () => {
      jest.useFakeTimers();
      const mockTarget = document.createElement('button');
      document.body.appendChild(mockTarget);

      element.show(null, mockTarget);
      await element.updateComplete;
      jest.runAllTimers();

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      document.dispatchEvent(escapeEvent);

      expect(document.activeElement).toBe(mockTarget);
      document.body.removeChild(mockTarget);
      jest.useRealTimers();
    });

    it('does NOT return focus to the trigger when closed by outside click', async () => {
      jest.useFakeTimers();
      const mockTarget = document.createElement('button');
      const outside = document.createElement('button');
      document.body.appendChild(mockTarget);
      document.body.appendChild(outside);

      element.show(null, mockTarget);
      await element.updateComplete;
      jest.runAllTimers();

      (element as any).ignoreNextClick = false;
      outside.focus();

      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        composed: true,
      });
      outside.dispatchEvent(clickEvent);

      expect(document.activeElement).toBe(outside);
      expect(document.activeElement).not.toBe(mockTarget);

      document.body.removeChild(mockTarget);
      document.body.removeChild(outside);
      jest.useRealTimers();
    });

    it('does not move focus on open when autoFocus is false', async () => {
      jest.useFakeTimers();
      element.autoFocus = false;
      const mockTarget = document.createElement('button');
      document.body.appendChild(mockTarget);
      mockTarget.focus();

      element.show(null, mockTarget);
      await element.updateComplete;
      jest.runAllTimers();

      expect(document.activeElement).toBe(mockTarget);

      element.hide();
      document.body.removeChild(mockTarget);
      jest.useRealTimers();
    });
  });
});

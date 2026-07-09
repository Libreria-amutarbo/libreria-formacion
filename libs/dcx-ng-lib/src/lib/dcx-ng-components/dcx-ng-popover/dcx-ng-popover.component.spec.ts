import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { DcxNgPopoverComponent } from './dcx-ng-popover.component';

describe('DcxNgPopoverComponent', () => {
  let component: DcxNgPopoverComponent;
  let fixture: ComponentFixture<DcxNgPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.hide();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial state', () => {
    it('should be closed by default', () => {
      expect(component.isOpen()).toBe(false);
    });
  });

  describe('toggle()', () => {
    it('should open the popover when closed', () => {
      const mockTarget = document.createElement('button');

      component.toggle(null, mockTarget);

      expect(component.isOpen()).toBe(true);
    });

    it('should close the popover when open', () => {
      const mockTarget = document.createElement('button');

      component.show(null, mockTarget);
      expect(component.isOpen()).toBe(true);

      component.toggle(null, mockTarget);

      expect(component.isOpen()).toBe(false);
    });
  });

  describe('show()', () => {
    it('should set isOpen to true', () => {
      const mockTarget = document.createElement('button');

      component.show(null, mockTarget);

      expect(component.isOpen()).toBe(true);
    });

    it('should not open if no target element is provided', () => {
      component.show(null, undefined);

      expect(component.isOpen()).toBe(false);
    });

    it('should use event.currentTarget if targetElement is not provided', () => {
      const mockTarget = document.createElement('button');
      const mockEvent = { currentTarget: mockTarget } as unknown as Event;

      component.show(mockEvent);

      expect(component.isOpen()).toBe(true);
    });
  });

  describe('hide()', () => {
    it('should set isOpen to false', () => {
      const mockTarget = document.createElement('button');

      component.show(null, mockTarget);
      expect(component.isOpen()).toBe(true);

      component.hide();

      expect(component.isOpen()).toBe(false);
    });

    it('should do nothing if already closed', () => {
      expect(component.isOpen()).toBe(false);

      component.hide();

      expect(component.isOpen()).toBe(false);
    });
  });

  describe('onEscapeKey()', () => {
    it('should close the popover when Escape key is pressed', () => {
      const mockTarget = document.createElement('button');

      component.show(null, mockTarget);
      expect(component.isOpen()).toBe(true);

      component.onEscapeKey();

      expect(component.isOpen()).toBe(false);
    });

    it('should do nothing if popover is already closed', () => {
      expect(component.isOpen()).toBe(false);

      component.onEscapeKey();

      expect(component.isOpen()).toBe(false);
    });
  });

  describe('onDocumentClick()', () => {
    it('should close the popover when clicking outside', () => {
      const mockTarget = document.createElement('button');
      const outsideElement = document.createElement('div');
      document.body.appendChild(mockTarget);
      document.body.appendChild(outsideElement);

      component.show(null, mockTarget);
      fixture.detectChanges();

      (component as any).ignoreNextClick = false;

      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: outsideElement });

      component.onDocumentClick(clickEvent);

      expect(component.isOpen()).toBe(false);

      document.body.removeChild(mockTarget);
      document.body.removeChild(outsideElement);
    });

    it('should not close when clicking inside the target', () => {
      const mockTarget = document.createElement('button');
      document.body.appendChild(mockTarget);

      component.show(null, mockTarget);
      fixture.detectChanges();

      (component as any).ignoreNextClick = false;

      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: mockTarget });

      component.onDocumentClick(clickEvent);

      expect(component.isOpen()).toBe(true);

      document.body.removeChild(mockTarget);
    });

    it('should do nothing if popover is closed', () => {
      const clickEvent = new MouseEvent('click', { bubbles: true });

      component.onDocumentClick(clickEvent);

      expect(component.isOpen()).toBe(false);
    });
  });

  describe('events', () => {
    it('should emit opened on show and closed on hide', () => {
      const openedSpy = jest.fn();
      const closedSpy = jest.fn();
      component.opened.subscribe(openedSpy);
      component.closed.subscribe(closedSpy);

      const mockTarget = document.createElement('button');
      component.show(null, mockTarget);
      expect(openedSpy).toHaveBeenCalledTimes(1);

      component.hide();
      expect(closedSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('bugs', () => {
    it('should reset ignoreNextClick when hidden', () => {
      const mockTarget = document.createElement('button');
      component.show(null, mockTarget);
      expect((component as unknown as { ignoreNextClick: boolean }).ignoreNextClick).toBe(true);

      component.hide();
      expect((component as unknown as { ignoreNextClick: boolean }).ignoreNextClick).toBe(false);
    });
  });

  describe('WCAG AA', () => {
    const panel = (): HTMLElement | null =>
      (fixture.nativeElement as HTMLElement).querySelector('.dcx-popover');

    it('exposes role="dialog" and a unique panel id by default', () => {
      const mockTarget = document.createElement('button');
      component.show(null, mockTarget);
      fixture.detectChanges();

      expect(panel()?.getAttribute('role')).toBe('dialog');
      expect(panel()?.getAttribute('id')).toBe(component.panelId);
      expect(panel()?.getAttribute('tabindex')).toBe('-1');
    });

    it('renders a decorative caret (aria-hidden) inside the panel', () => {
      const mockTarget = document.createElement('button');
      component.show(null, mockTarget);
      fixture.detectChanges();

      const arrow = panel()?.querySelector('.dcx-popover__arrow');
      expect(arrow).toBeTruthy();
      expect(arrow?.getAttribute('aria-hidden')).toBe('true');
    });

    it('reflects a configurable role and aria-label', () => {
      fixture.componentRef.setInput('role', 'menu');
      fixture.componentRef.setInput('ariaLabel', 'Acciones');
      const mockTarget = document.createElement('button');
      component.show(null, mockTarget);
      fixture.detectChanges();

      expect(panel()?.getAttribute('role')).toBe('menu');
      expect(panel()?.getAttribute('aria-label')).toBe('Acciones');
    });

    it('prefers aria-labelledby over aria-label', () => {
      fixture.componentRef.setInput('ariaLabel', 'Acciones');
      fixture.componentRef.setInput('ariaLabelledby', 'heading-1');
      const mockTarget = document.createElement('button');
      component.show(null, mockTarget);
      fixture.detectChanges();

      expect(panel()?.getAttribute('aria-labelledby')).toBe('heading-1');
      expect(panel()?.hasAttribute('aria-label')).toBe(false);
    });

    it('moves focus into the panel when opened', fakeAsync(() => {
      const mockTarget = document.createElement('button');
      document.body.appendChild(mockTarget);

      component.show(null, mockTarget);
      fixture.detectChanges();
      tick();

      expect(panel()?.contains(document.activeElement) || document.activeElement === panel()).toBe(true);

      component.hide();
      document.body.removeChild(mockTarget);
    }));

    it('returns focus to the trigger when closed with Escape', fakeAsync(() => {
      const mockTarget = document.createElement('button');
      document.body.appendChild(mockTarget);

      component.show(null, mockTarget);
      fixture.detectChanges();
      tick();

      component.onEscapeKey();

      expect(document.activeElement).toBe(mockTarget);
      document.body.removeChild(mockTarget);
    }));

    it('does NOT return focus to the trigger when closed by outside click', fakeAsync(() => {
      const mockTarget = document.createElement('button');
      const outside = document.createElement('button');
      document.body.appendChild(mockTarget);
      document.body.appendChild(outside);

      component.show(null, mockTarget);
      fixture.detectChanges();
      tick();

      (component as unknown as { ignoreNextClick: boolean }).ignoreNextClick = false;
      outside.focus();

      const clickEvent = new MouseEvent('click', { bubbles: true });
      Object.defineProperty(clickEvent, 'target', { value: outside });
      component.onDocumentClick(clickEvent);

      expect(document.activeElement).toBe(outside);
      expect(document.activeElement).not.toBe(mockTarget);

      document.body.removeChild(mockTarget);
      document.body.removeChild(outside);
    }));

    it('does not move focus on open when autoFocus is false', fakeAsync(() => {
      fixture.componentRef.setInput('autoFocus', false);
      const mockTarget = document.createElement('button');
      document.body.appendChild(mockTarget);
      mockTarget.focus();

      component.show(null, mockTarget);
      fixture.detectChanges();
      tick();

      expect(document.activeElement).toBe(mockTarget);

      component.hide();
      document.body.removeChild(mockTarget);
    }));
  });
});

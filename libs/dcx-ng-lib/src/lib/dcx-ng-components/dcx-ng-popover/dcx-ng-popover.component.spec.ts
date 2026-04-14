import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      const mockEvent = { currentTarget: mockTarget };

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
});

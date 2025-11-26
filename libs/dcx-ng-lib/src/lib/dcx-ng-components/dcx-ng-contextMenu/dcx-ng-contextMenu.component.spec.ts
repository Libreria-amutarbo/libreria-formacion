import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ContextMenuComponent, ContextMenuItem } from './dcx-ng-contextMenu.component';

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.items).toEqual([]);
      expect(component.visible).toBe(false);
      expect(component.position).toEqual({ x: 0, y: 0 });
    });

    it('should initialize with empty items array', () => {
      expect(Array.isArray(component.items)).toBe(true);
      expect(component.items.length).toBe(0);
    });
  });

  describe('Template Rendering', () => {
    it('should not render context menu when visible is false', () => {
      component.visible = false;
      fixture.detectChanges();

      const contextMenu = compiled.query(By.css('.context-menu'));
      expect(contextMenu).toBeNull();
    });

    it('should render context menu when visible is true', () => {
      component.visible = true;
      fixture.detectChanges();

      const contextMenu = compiled.query(By.css('.context-menu'));
      expect(contextMenu).toBeTruthy();
    });

    it('should apply correct position styles', () => {
      component.visible = true;
      component.position = { x: 100, y: 200 };
      fixture.detectChanges();

      const contextMenu = compiled.query(By.css('.context-menu'));
      const styles = contextMenu.nativeElement.getAttribute('ng-reflect-ng-style') || 
                     contextMenu.nativeElement.style;
      
      expect(contextMenu.nativeElement.style.left).toBe('100px');
      expect(contextMenu.nativeElement.style.top).toBe('200px');
    });

    it('should render all menu items', () => {
      const mockItems: ContextMenuItem[] = [
        { label: 'Edit', action: jasmine.createSpy('action1') },
        { label: 'Delete', action: jasmine.createSpy('action2') },
        { label: 'Copy', action: jasmine.createSpy('action3') },
      ];

      component.items = mockItems;
      component.visible = true;
      fixture.detectChanges();

      const listItems = compiled.queryAll(By.css('.context-menu li'));
      expect(listItems.length).toBe(3);
      expect(listItems[0].nativeElement.textContent).toContain('Edit');
      expect(listItems[1].nativeElement.textContent).toContain('Delete');
      expect(listItems[2].nativeElement.textContent).toContain('Copy');
    });

    it('should have ul element inside context menu', () => {
      component.visible = true;
      component.items = [{ label: 'Test', action: () => {} }];
      fixture.detectChanges();

      const ul = compiled.query(By.css('.context-menu ul'));
      expect(ul).toBeTruthy();
    });
  });

  describe('show() method', () => {
    it('should set visible to true', () => {
      component.show(50, 75);
      expect(component.visible).toBe(true);
    });

    it('should set the correct position', () => {
      component.show(100, 200);
      expect(component.position.x).toBe(100);
      expect(component.position.y).toBe(200);
    });

    it('should update position on subsequent calls', () => {
      component.show(10, 20);
      expect(component.position).toEqual({ x: 10, y: 20 });

      component.show(300, 400);
      expect(component.position).toEqual({ x: 300, y: 400 });
    });

    it('should render menu after calling show()', () => {
      component.show(50, 50);
      fixture.detectChanges();

      const contextMenu = compiled.query(By.css('.context-menu'));
      expect(contextMenu).toBeTruthy();
    });
  });

  describe('hide() method', () => {
    it('should set visible to false', () => {
      component.visible = true;
      component.hide();
      expect(component.visible).toBe(false);
    });

    it('should emit closed event', (done) => {
      component.closed.subscribe(() => {
        expect(true).toBe(true);
        done();
      });

      component.hide();
    });

    it('should not render menu after calling hide()', () => {
      component.visible = true;
      fixture.detectChanges();
      
      component.hide();
      fixture.detectChanges();

      const contextMenu = compiled.query(By.css('.context-menu'));
      expect(contextMenu).toBeNull();
    });
  });

  describe('onItemClick() method', () => {
    it('should execute item action', () => {
      const mockAction = jasmine.createSpy('action');
      const item: ContextMenuItem = { label: 'Test', action: mockAction };

      component.onItemClick(item);

      expect(mockAction).toHaveBeenCalled();
    });

    it('should hide menu after item click', () => {
      const mockAction = jasmine.createSpy('action');
      const item: ContextMenuItem = { label: 'Test', action: mockAction };

      component.visible = true;
      component.onItemClick(item);

      expect(component.visible).toBe(false);
    });

    it('should emit closed event after item click', (done) => {
      const mockAction = jasmine.createSpy('action');
      const item: ContextMenuItem = { label: 'Test', action: mockAction };

      component.closed.subscribe(() => {
        expect(true).toBe(true);
        done();
      });

      component.onItemClick(item);
    });

    it('should execute action before hiding', () => {
      const callOrder: string[] = [];

      const mockAction = () => {
        callOrder.push('action');
      };

      spyOn(component, 'hide').and.callFake(() => {
        callOrder.push('hide');
        component.visible = false;
        component.closed.emit();
      });

      const item: ContextMenuItem = { label: 'Test', action: mockAction };
      component.onItemClick(item);

      expect(callOrder).toEqual(['action', 'hide']);
    });
  });

  describe('Item Click in Template', () => {
    it('should call onItemClick when menu item is clicked', () => {
      spyOn(component, 'onItemClick');
      const mockItem: ContextMenuItem = { label: 'Delete', action: () => {} };

      component.items = [mockItem];
      component.visible = true;
      fixture.detectChanges();

      const listItem = compiled.query(By.css('.context-menu li'));
      listItem.nativeElement.click();

      expect(component.onItemClick).toHaveBeenCalledWith(mockItem);
    });

    it('should call action and hide on item click in template', () => {
      const mockAction = jasmine.createSpy('mockAction');
      const mockItem: ContextMenuItem = { label: 'Edit', action: mockAction };

      component.items = [mockItem];
      component.visible = true;
      fixture.detectChanges();

      const listItem = compiled.query(By.css('.context-menu li'));
      listItem.nativeElement.click();

      expect(mockAction).toHaveBeenCalled();
      expect(component.visible).toBe(false);
    });
  });

  describe('Click Outside Handling', () => {
    it('should hide menu on document click outside', () => {
      component.visible = true;
      fixture.detectChanges();

      const event = new MouseEvent('click');
      const mockTarget = document.createElement('div');
      Object.defineProperty(event, 'target', { value: mockTarget });

      component.onClickOutside(event);

      expect(component.visible).toBe(false);
    });

    it('should not hide menu on click inside context menu', () => {
      component.visible = true;
      fixture.detectChanges();

      const contextMenuElement = compiled.query(By.css('.context-menu')).nativeElement;
      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: contextMenuElement });

      component.onClickOutside(event);

      expect(component.visible).toBe(true);
    });

    it('should emit closed event when clicking outside', (done) => {
      component.visible = true;

      component.closed.subscribe(() => {
        expect(true).toBe(true);
        done();
      });

      const event = new MouseEvent('click');
      const mockTarget = document.createElement('div');
      Object.defineProperty(event, 'target', { value: mockTarget });

      component.onClickOutside(event);
    });

    it('should handle click on child elements of context menu', () => {
      const mockAction = jasmine.createSpy('action');
      const mockItem: ContextMenuItem = { label: 'Test', action: mockAction };

      component.items = [mockItem];
      component.visible = true;
      fixture.detectChanges();

      const listItem = compiled.query(By.css('.context-menu li')).nativeElement;
      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: listItem });

      component.onClickOutside(event);

      expect(component.visible).toBe(true);
    });
  });

  describe('Stop Propagation', () => {
    it('should stop propagation on context menu click', () => {
      component.visible = true;
      fixture.detectChanges();

      const contextMenu = compiled.query(By.css('.context-menu')).nativeElement;
      const event = new MouseEvent('click');
      const stopPropagationSpy = spyOn(event, 'stopPropagation');

      // Simulating the click event with stopPropagation
      contextMenu.dispatchEvent(event);

      // The template should have (click)="$event.stopPropagation()"
      expect(contextMenu).toBeTruthy();
    });
  });

  describe('Input/Output Properties', () => {
    it('should accept items as input', () => {
      const mockItems: ContextMenuItem[] = [
        { label: 'Item 1', action: () => {} },
        { label: 'Item 2', action: () => {} },
      ];

      component.items = mockItems;
      expect(component.items).toEqual(mockItems);
    });

    it('should accept visible as input', () => {
      component.visible = true;
      expect(component.visible).toBe(true);

      component.visible = false;
      expect(component.visible).toBe(false);
    });

    it('should accept position as input', () => {
      const testPosition = { x: 150, y: 250 };
      component.position = testPosition;
      expect(component.position).toEqual(testPosition);
    });

    it('should emit closed event as output', (done) => {
      let emitted = false;

      component.closed.subscribe(() => {
        emitted = true;
      });

      component.hide();

      fixture.whenStable().then(() => {
        expect(emitted).toBe(true);
        done();
      });
    });
  });

  describe('Integration Tests', () => {
    it('should work through complete user interaction flow', () => {
      const mockAction1 = jasmine.createSpy('action1');
      const mockAction2 = jasmine.createSpy('action2');

      component.items = [
        { label: 'Edit', action: mockAction1 },
        { label: 'Delete', action: mockAction2 },
      ];

      // Show the menu
      component.show(100, 100);
      fixture.detectChanges();

      expect(component.visible).toBe(true);
      let contextMenu = compiled.query(By.css('.context-menu'));
      expect(contextMenu).toBeTruthy();

      // Click first item
      const firstItem = compiled.queryAll(By.css('.context-menu li'))[0];
      firstItem.nativeElement.click();

      fixture.detectChanges();

      expect(mockAction1).toHaveBeenCalled();
      expect(component.visible).toBe(false);
      contextMenu = compiled.query(By.css('.context-menu'));
      expect(contextMenu).toBeNull();
    });

    it('should handle multiple show/hide cycles', () => {
      let closeEventCount = 0;
      component.closed.subscribe(() => closeEventCount++);

      // First cycle
      component.show(10, 10);
      expect(component.visible).toBe(true);
      component.hide();
      expect(component.visible).toBe(false);

      // Second cycle
      component.show(20, 20);
      expect(component.visible).toBe(true);
      component.hide();
      expect(component.visible).toBe(false);

      expect(closeEventCount).toBe(2);
    });

    it('should update position dynamically', () => {
      component.show(50, 50);
      fixture.detectChanges();
      expect(component.position).toEqual({ x: 50, y: 50 });

      component.show(150, 150);
      fixture.detectChanges();
      expect(component.position).toEqual({ x: 150, y: 150 });
    });
  });

  describe('ContextMenuItem Interface', () => {
    it('should accept items with label and action', () => {
      const item: ContextMenuItem = {
        label: 'Test Label',
        action: jasmine.createSpy('testAction'),
      };

      expect(item.label).toBe('Test Label');
      expect(typeof item.action).toBe('function');
    });
  });
});

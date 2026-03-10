import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DcxNgContextMenuComponent } from './dcx-ng-contextMenu.component';
import { DcxContextMenuItem } from '../../core/interfaces';
import { SIMPLE_CONTEXT_MENU_ITEMS, CONTEXT_MENU_TEST_ITEMS } from '../../core/mock';

describe('DcxNgContextMenuComponent', () => {
  let component: DcxNgContextMenuComponent;
  let fixture: ComponentFixture<DcxNgContextMenuComponent>;
  let compiled: DebugElement;

  let testItems: DcxContextMenuItem[];

  beforeEach(async () => {
    testItems = CONTEXT_MENU_TEST_ITEMS.map(item => ({ ...item, action: jest.fn() }));

    await TestBed.configureTestingModule({
      imports: [DcxNgContextMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgContextMenuComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.componentRef.setInput('items', testItems);
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
      expect(component.isOpen()).toBe(false);
      expect(component.position()).toEqual({ x: 0, y: 0 });
    });

    it('should accept items input', () => {
      expect(component.items().length).toBe(3);
    });
  });

  describe('Template Rendering', () => {
    it('should not render context menu when isOpen is false', () => {
      component.isOpen.set(false);
      fixture.detectChanges();
      const contextMenu = compiled.query(By.css('.dcx-context-menu'));
      expect(contextMenu).toBeNull();
    });

    it('should render context menu when isOpen is true', () => {
      component.open();
      fixture.detectChanges();
      const contextMenu = compiled.query(By.css('.dcx-context-menu'));
      expect(contextMenu).toBeTruthy();
    });

    it('should apply correct position styles', () => {
      fixture.componentRef.setInput('position', { x: 100, y: 200 });
      component.open();
      fixture.detectChanges();
      const contextMenu = compiled.query(By.css('.dcx-context-menu'));
      expect(contextMenu.nativeElement.style.left).toBe('100px');
      expect(contextMenu.nativeElement.style.top).toBe('200px');
    });
  });

  describe('open() method', () => {
    it('should set isOpen to true', () => {
      component.open();
      expect(component.isOpen()).toBe(true);
    });

    it('should render menu after calling open()', () => {
      component.open();
      fixture.detectChanges();
      const contextMenu = compiled.query(By.css('.dcx-context-menu'));
      expect(contextMenu).toBeTruthy();
    });
  });

  describe('close() method', () => {
    it('should set isOpen to false', () => {
      component.open();
      component.close();
      expect(component.isOpen()).toBe(false);
    });

    it('should emit menuClosed event', () => {
      const spy = jest.fn();
      component.menuClosed.subscribe(spy);
      component.open();
      component.close();
      expect(spy).toHaveBeenCalled();
    });

    it('should not render menu after calling close()', () => {
      component.open();
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      const contextMenu = compiled.query(By.css('.dcx-context-menu'));
      expect(contextMenu).toBeNull();
    });
  });

  describe('onItemClick() method', () => {
    it('should execute item action', () => {
      const mockAction = jest.fn();
      const item: DcxContextMenuItem = { text: 'Test', action: mockAction };
      component.onItemClick(item);
      expect(mockAction).toHaveBeenCalled();
    });

    it('should close menu after item click (no children)', () => {
      const mockAction = jest.fn();
      const item: DcxContextMenuItem = { text: 'Test', action: mockAction };
      component.open();
      component.onItemClick(item);
      expect(component.isOpen()).toBe(false);
    });

    it('should emit itemSelected after item click', () => {
      const spy = jest.fn();
      component.itemSelected.subscribe(spy);
      const item: DcxContextMenuItem = { text: 'Test', action: jest.fn() };
      component.onItemClick(item);
      expect(spy).toHaveBeenCalledWith(item);
    });

    it('should not execute action on disabled item', () => {
      const mockAction = jest.fn();
      const item: DcxContextMenuItem = { text: 'Test', action: mockAction, disabled: true };
      component.onItemClick(item);
      expect(mockAction).not.toHaveBeenCalled();
    });

    it('should not execute action on divider item', () => {
      const mockAction = jest.fn();
      const item: DcxContextMenuItem = { divider: true, action: mockAction };
      component.onItemClick(item);
      expect(mockAction).not.toHaveBeenCalled();
    });

    it('should stop event propagation when event provided', () => {
      const mockEvent = { stopPropagation: jest.fn() } as any;
      const item: DcxContextMenuItem = { text: 'Test', action: jest.fn() };
      component.onItemClick(item, mockEvent);
      expect(mockEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should not close when item has children', () => {
      const item: DcxContextMenuItem = {
        text: 'Parent',
        children: [{ text: 'Child' }],
      };
      component.open();
      component.onItemClick(item);
      expect(component.isOpen()).toBe(true);
    });
  });

  describe('onListItemSelected()', () => {
    it('should delegate to onItemClick', () => {
      const spy = jest.spyOn(component, 'onItemClick');
      const item: DcxContextMenuItem = { text: 'Test', action: jest.fn() };
      component.onListItemSelected({ item, index: 0 });
      expect(spy).toHaveBeenCalledWith(item);
    });
  });

  describe('onDocumentClick()', () => {
    it('should close menu when open and document is clicked', () => {
      component.open();
      component.onDocumentClick();
      expect(component.isOpen()).toBe(false);
    });

    it('should not close menu when already closed', () => {
      const spy = jest.fn();
      component.menuClosed.subscribe(spy);
      component.isOpen.set(false);
      component.onDocumentClick();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('menuStyle computed', () => {
    it('should compute correct style from position', () => {
      fixture.componentRef.setInput('position', { x: 50, y: 75 });
      fixture.detectChanges();
      const style = component.menuStyle();
      expect(style).toEqual({ top: '75px', left: '50px' });
    });

    it('should update when position changes', () => {
      fixture.componentRef.setInput('position', { x: 10, y: 20 });
      fixture.detectChanges();
      expect(component.menuStyle()).toEqual({ top: '20px', left: '10px' });

      fixture.componentRef.setInput('position', { x: 300, y: 400 });
      fixture.detectChanges();
      expect(component.menuStyle()).toEqual({ top: '400px', left: '300px' });
    });
  });

  describe('Integration Tests', () => {
    it('should work through complete open/close cycle', () => {
      component.open();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);
      let contextMenu = compiled.query(By.css('.dcx-context-menu'));
      expect(contextMenu).toBeTruthy();

      component.close();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(false);
      contextMenu = compiled.query(By.css('.dcx-context-menu'));
      expect(contextMenu).toBeNull();
    });

    it('should handle multiple open/close cycles', () => {
      let closeCount = 0;
      component.menuClosed.subscribe(() => closeCount++);

      component.open();
      component.close();
      component.open();
      component.close();

      expect(closeCount).toBe(2);
    });
  });

  describe('DcxContextMenuItem Interface', () => {
    it('should accept items with text and action', () => {
      const item: DcxContextMenuItem = {
        text: 'Test Label',
        action: jest.fn(),
      };
      expect(item.text).toBe('Test Label');
      expect(typeof item.action).toBe('function');
    });
  });

  describe('With mock data', () => {
    it('should accept SIMPLE_CONTEXT_MENU_ITEMS', () => {
      fixture.componentRef.setInput('items', SIMPLE_CONTEXT_MENU_ITEMS);
      fixture.detectChanges();
      expect(component.items().length).toBeGreaterThan(0);
    });
  });
});

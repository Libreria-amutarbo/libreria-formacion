import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgAccordionComponent } from './dcx-ng-accordion.component';
import { DcxNgAccordionItem } from '../../core/interfaces/accordion';
import { Component, signal } from '@angular/core';
import { DcxAccordionMock } from '../../core/mock/accordion';

const mockItems = DcxAccordionMock;

describe('DcxNgAccordionComponent', () => {
  let component: DcxNgAccordionComponent;
  let fixture: ComponentFixture<DcxNgAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgAccordionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', mockItems);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic functionality', () => {
    it('should render all items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const items = compiled.querySelectorAll('.accordion-item');
      expect(items.length).toBe(3);
    });

    it('should display item titles', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.accordion-header .label');
      expect(buttons[0].textContent?.trim()).toBe('Item 1');
      expect(buttons[1].textContent?.trim()).toBe('Item 2');
      expect(buttons[2].textContent?.trim()).toBe('Item 3 (Disabled)');
    });
  });

  describe('toggleItem', () => {
    it('should expand item when clicked', () => {
      const item = mockItems[0];
      component.toggleItem(item);
      fixture.detectChanges();
      
      expect(component.isExpanded(item.id)).toBe(true);
    });

    it('should collapse expanded item when clicked again', () => {
      const item = mockItems[0];
      
      component.toggleItem(item);
      fixture.detectChanges();
      expect(component.isExpanded(item.id)).toBe(true);

      component.toggleItem(item);
      fixture.detectChanges();
      expect(component.isExpanded(item.id)).toBe(false);
    });

    it('should not toggle disabled items', () => {
      const disabledItem = mockItems[2];
      
      component.toggleItem(disabledItem);
      fixture.detectChanges();

      expect(component.isExpanded(disabledItem.id)).toBe(false);
    });

    it('should emit itemToggled event', () => {
      const item = mockItems[0];
      let emittedItem: DcxNgAccordionItem | undefined;
      
      component.itemToggled.subscribe((emitted) => {
        emittedItem = emitted;
      });

      component.toggleItem(item);
      
      expect(emittedItem).toEqual(item);
    });

    it('should emit itemExpanded event when expanding', () => {
      const item = mockItems[0];
      let emittedItem: DcxNgAccordionItem | undefined;
      
      component.itemExpanded.subscribe((emitted) => {
        emittedItem = emitted;
      });

      component.toggleItem(item);
      
      expect(emittedItem).toEqual(item);
    });

    it('should emit itemCollapsed event when collapsing', () => {
      const item = mockItems[0];
      let emittedItem: DcxNgAccordionItem | undefined;
      
      // First expand
      component.toggleItem(item);
      
      component.itemCollapsed.subscribe((emitted) => {
        emittedItem = emitted;
      });

      // Then collapse
      component.toggleItem(item);
      
      expect(emittedItem).toEqual(item);
    });
  });

  describe('closeOthers behavior', () => {
    it('should close other items when closeOthers is true', () => {
      fixture.componentRef.setInput('closeOthers', true);
      fixture.detectChanges();

      const item1 = mockItems[0];
      const item2 = mockItems[1];

      component.toggleItem(item1);
      fixture.detectChanges();
      expect(component.isExpanded(item1.id)).toBe(true);

      component.toggleItem(item2);
      fixture.detectChanges();
      expect(component.isExpanded(item1.id)).toBe(false);
      expect(component.isExpanded(item2.id)).toBe(true);
    });

    it('should allow multiple items open when closeOthers is false', () => {
      fixture.componentRef.setInput('closeOthers', false);
      fixture.detectChanges();

      const item1 = mockItems[0];
      const item2 = mockItems[1];

      component.toggleItem(item1);
      component.toggleItem(item2);
      fixture.detectChanges();

      expect(component.isExpanded(item1.id)).toBe(true);
      expect(component.isExpanded(item2.id)).toBe(true);
    });
  });

  describe('expandedIds input', () => {
    it('should expand items specified in expandedIds', () => {
      fixture.componentRef.setInput('expandedIds', ['1', '2']);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
      expect(component.isExpanded('2')).toBe(true);
      expect(component.isExpanded('3')).toBe(false);
    });

    it('should expand items with expanded=true property', () => {
      const itemsWithExpanded: DcxNgAccordionItem[] = [
        { id: '1', title: 'Item 1', content: 'Content 1', expanded: true },
        { id: '2', title: 'Item 2', content: 'Content 2' },
      ];

      fixture.componentRef.setInput('items', itemsWithExpanded);
      fixture.componentRef.setInput('expandedIds', []);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
      expect(component.isExpanded('2')).toBe(false);
    });
  });

  describe('expandItemById and collapseItemById', () => {
    it('should expand item by ID', () => {
      component.expandItemById('1');
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
    });

    it('should not expand disabled item by ID', () => {
      component.expandItemById('3');
      fixture.detectChanges();

      expect(component.isExpanded('3')).toBe(false);
    });

    it('should collapse item by ID', () => {
      component.expandItemById('1');
      fixture.detectChanges();
      expect(component.isExpanded('1')).toBe(true);

      component.collapseItemById('1');
      fixture.detectChanges();
      expect(component.isExpanded('1')).toBe(false);
    });

    it('should not fail when collapsing non-expanded item', () => {
      expect(() => {
        component.collapseItemById('1');
        fixture.detectChanges();
      }).not.toThrow();
    });
  });

  describe('transition', () => {
    it('should apply correct transition class', () => {
      fixture.componentRef.setInput('transition', 'fast');
      fixture.detectChanges();

      expect(component.getTransitionClass()).toBe('transition-fast');
    });

    it('should default to smooth transition', () => {
      expect(component.getTransitionClass()).toBe('transition-smooth');
    });
  });

  describe('Icons', () => {
    it('should render icons when provided', () => {
      const itemsWithIcons: DcxNgAccordionItem[] = [
        { id: '1', title: 'Item 1', content: 'Content 1', icon: 'star-fill' },
      ];

      fixture.componentRef.setInput('items', itemsWithIcons);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const icon = compiled.querySelector('.accordion-header .icon--start');
      expect(icon).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should set aria-expanded attribute correctly', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttonElement = compiled.querySelector('.accordion-header button') as HTMLButtonElement;

      expect(buttonElement.getAttribute('aria-expanded')).toBe('false');

      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      expect(buttonElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should disable button for disabled items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.accordion-header button');
      const disabledButton = buttons[2] as HTMLButtonElement;

      expect(disabledButton.disabled).toBe(true);
    });
  });
});

//       expect(component.isExpanded(item.id)).toBe(true);
//     });

//     it('should return false if item is not expanded', () => {
//       const item = DcxAccordionMock[0];

//       expect(component.isExpanded(item.id)).toBe(false);
//     });
//   });

//   describe('getAnimationState', () => {
//     it('should return "expanded" when item is expanded', () => {
//       const item = DcxAccordionMock[0];
//       component.toggleItem(item);
//       fixture.detectChanges();

//       expect(component.getAnimationState(item.id)).toBe('expanded');
//     });

//     it('should return "collapsed" when item is not expanded', () => {
//       const item = DcxAccordionMock[0];

//       expect(component.getAnimationState(item.id)).toBe('collapsed');
//     });
//   });

//   describe('Rendering', () => {
//     it('should render all accordion items', () => {
//       const items = fixture.nativeElement.querySelectorAll('.accordion-item');

//       expect(items.length).toBe(DcxAccordionMock.length);
//     });

//     it('should render accordion headers with correct titles', () => {
//       const headers = fixture.nativeElement.querySelectorAll('.accordion-header');

//       DcxAccordionMock.forEach((item, index) => {
//         expect(headers[index].textContent).toContain(item.title);
//       });
//     });

//     it('should apply disabled class to disabled items', () => {
//       const disabledItems = fixture.nativeElement.querySelectorAll(
//         '.accordion-item.disabled'
//       );

//       expect(disabledItems.length).toBe(1);
//     });

//     it('should disable header button for disabled items', () => {
//       const buttons = fixture.nativeElement.querySelectorAll(
//         '.accordion-header'
//       );
//       const disabledButton = buttons[2];

//       expect(disabledButton.disabled).toBe(true);
//     });

//     it('should set aria-expanded attribute correctly', () => {
//       const item = DcxAccordionMock[0];
//       const headers = fixture.nativeElement.querySelectorAll(
//         '.accordion-header'
//       );
//       const header = headers[0];

//       expect(header.getAttribute('aria-expanded')).toBe('false');

//       component.toggleItem(item);
//       fixture.detectChanges();

//       expect(header.getAttribute('aria-expanded')).toBe('true');
//     });

//     it('should set aria-controls attribute correctly', () => {
//       const headers = fixture.nativeElement.querySelectorAll(
//         '.accordion-header'
//       );

//       DcxAccordionMock.forEach((item, index) => {
//         expect(headers[index].getAttribute('aria-controls')).toBe(
//           `accordion-${item.id}`
//         );
//       });
//     });
//   });

//   describe('Input Properties', () => {
//     it('should accept items input', () => {
//       expect(component.items()).toEqual(DcxAccordionMock);
//     });
//   });
// });

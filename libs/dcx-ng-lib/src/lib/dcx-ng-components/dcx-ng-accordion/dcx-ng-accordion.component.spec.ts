import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DcxNgAccordionComponent,
  DcxNgAccordionItem,
  DcxAccordionDefault,
  DcxAccordionItemsWithExpanded,
  DcxAccordionItemsWithIcon,
} from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgAccordionComponent', () => {
  let component: DcxNgAccordionComponent;
  let fixture: ComponentFixture<DcxNgAccordionComponent>;

  const mockItems = DcxAccordionDefault;

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

  it('should have correct items when items provided', () => {
    expect(component.items().length).toBe(4);
  });

  it('should return empty when no items', () => {
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();
    expect(component.items().length).toBe(0);
  });

  it('should toggle item expansion (open then close)', () => {
    const item = mockItems[0];
    component.toggleItem(item);
    expect(component.isExpanded(item.id)).toBe(true);
    component.toggleItem(item);
    expect(component.isExpanded(item.id)).toBe(false);
  });

  it('should not toggle disabled items', () => {
    const disabledItem = mockItems[3];
    component.toggleItem(disabledItem);
    expect(component.isExpanded(disabledItem.id)).toBe(false);
  });

  it('should allow multiple items expanded simultaneously', () => {
    fixture.componentRef.setInput('closeOthers', false);
    fixture.detectChanges();
    const item1 = mockItems[0];
    const item2 = mockItems[1];
    component.toggleItem(item1);
    component.toggleItem(item2);
    expect(component.isExpanded(item1.id)).toBe(true);
    expect(component.isExpanded(item2.id)).toBe(true);
  });

  it('should close an item independently', () => {
    fixture.componentRef.setInput('closeOthers', false);
    fixture.detectChanges();
    const item1 = mockItems[0];
    const item2 = mockItems[1];
    component.toggleItem(item1);
    component.toggleItem(item2);
    component.toggleItem(item1);
    expect(component.isExpanded(item1.id)).toBe(false);
    expect(component.isExpanded(item2.id)).toBe(true);
  });

  it('should emit itemToggled event when item is toggled', () => {
    const spy = jest.fn();
    component.itemToggled.subscribe(spy);
    const item = mockItems[0];
    component.toggleItem(item);
    expect(spy).toHaveBeenCalledWith(item);
  });

  it('should return false for isExpanded when item is not expanded', () => {
    expect(component.isExpanded('1')).toBe(false);
  });

  it('should return true for isExpanded after toggling', () => {
    component.toggleItem(mockItems[0]);
    expect(component.isExpanded('1')).toBe(true);
  });
});

describe('DcxNgAccordionComponent - Extended', () => {
  let component: DcxNgAccordionComponent;
  let fixture: ComponentFixture<DcxNgAccordionComponent>;

  const mockItems = DcxAccordionDefault;

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
      expect(items.length).toBe(4);
    });

    it('should display item titles', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const titles = compiled.querySelectorAll('.accordion-title');
      expect(titles[0].textContent?.trim()).toBe('Item 1');
      expect(titles[1].textContent?.trim()).toBe('Item 2');
      expect(titles[2].textContent?.trim()).toBe('Item with disabled content');
      expect(titles[3].textContent?.trim()).toBe('Item with disabled');
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
      const disabledItem = mockItems[3];
      component.toggleItem(disabledItem);
      fixture.detectChanges();
      expect(component.isExpanded(disabledItem.id)).toBe(false);
    });

    it('should emit itemToggled event', () => {
      const item = mockItems[0];
      let emittedItem: DcxNgAccordionItem | undefined;
      component.itemToggled.subscribe(emitted => {
        emittedItem = emitted;
      });
      component.toggleItem(item);
      expect(emittedItem).toEqual(item);
    });

    it('should emit itemExpanded event when expanding', () => {
      const item = mockItems[0];
      let emittedItem: DcxNgAccordionItem | undefined;
      component.itemExpanded.subscribe(emitted => {
        emittedItem = emitted;
      });
      component.toggleItem(item);
      expect(emittedItem).toEqual(item);
    });

    it('should emit itemCollapsed event when collapsing', () => {
      const item = mockItems[0];
      let emittedItem: DcxNgAccordionItem | undefined;
      component.toggleItem(item);

      component.itemCollapsed.subscribe(emitted => {
        emittedItem = emitted;
      });
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
      fixture.componentRef.setInput('items', DcxAccordionItemsWithExpanded);
      fixture.componentRef.setInput('expandedIds', []);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
      expect(component.isExpanded('2')).toBe(true);
      expect(component.isExpanded('3')).toBe(true);
    });
  });

  describe('expandItemById and collapseItemById', () => {
    it('should expand item by ID', () => {
      component.expandItemById('1');
      fixture.detectChanges();
      expect(component.isExpanded('1')).toBe(true);
    });

    it('should not expand disabled item by ID', () => {
      component.expandItemById('4');
      fixture.detectChanges();
      expect(component.isExpanded('4')).toBe(false);
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
      fixture.componentRef.setInput('items', DcxAccordionItemsWithIcon);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const icon = compiled.querySelector('.accordion-header .accordion-icon');
      expect(icon).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should set aria-expanded attribute correctly', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headerElement = compiled.querySelector(
        '.accordion-header',
      ) as HTMLElement;

      expect(headerElement.getAttribute('aria-expanded')).toBe('false');

      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      expect(headerElement.getAttribute('aria-expanded')).toBe('true');
    });

    it('should disable button for disabled items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headers = compiled.querySelectorAll('.accordion-header');
      const disabledHeader = headers[3] as HTMLElement;

      expect(disabledHeader.getAttribute('tabindex')).toBe('-1');
      expect(disabledHeader.classList.contains('disabled')).toBe(true);
    });
  });

  describe('getIconItemExpanded', () => {
    it('should return chevron-up when expanded', () => {
      component.toggleItem(mockItems[0]);
      expect(component.getIconItemExpanded('1')).toBe('chevron-up');
    });

    it('should return chevron-down when collapsed', () => {
      expect(component.getIconItemExpanded('1')).toBe('chevron-down');
    });
  });
});

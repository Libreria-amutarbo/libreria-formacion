import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DcxNgAccordionComponent,
  DcxNgAccordionItem,
  DcxAccordionDefault,
  DcxAccordionItemsWithExpanded,
  DcxAccordionItemsWithIcon,
  DcxAccordionItemsWithDescription,
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
      expect(titles[0].textContent?.trim()).toBe('¿Qué es DCX?');
      expect(titles[1].textContent?.trim()).toBe('¿Cómo se instala la librería?');
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
      component.toggleItem(item);

      let emittedItem: DcxNgAccordionItem | undefined;
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
    });

    it('should not reset user-driven state when items array reference changes', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();
      expect(component.isExpanded('1')).toBe(true);

      // Simulate adding a new item without changing expandedIds
      fixture.componentRef.setInput('items', [...mockItems]);
      fixture.detectChanges();

      expect(component.isExpanded('1')).toBe(true);
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

  describe('Description', () => {
    it('should render description when provided', () => {
      fixture.componentRef.setInput('items', DcxAccordionItemsWithDescription);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const descriptions = compiled.querySelectorAll('.accordion-description');
      expect(descriptions.length).toBe(3);
      expect(descriptions[0].textContent?.trim()).toBe('Datos básicos del servicio');
    });

    it('should not render description element when not provided', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const descriptions = compiled.querySelectorAll('.accordion-description');
      expect(descriptions.length).toBe(0);
    });
  });

  describe('Accessibility (WCAG AA)', () => {
    it('should render a native <button> element for each header', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('button.accordion-header');
      expect(buttons.length).toBe(4);
    });

    it('should wrap each header button in an <h3> element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const headings = compiled.querySelectorAll('h3.accordion-heading');
      expect(headings.length).toBe(4);
    });

    it('should set aria-expanded="false" on header button by default', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('button.accordion-header') as HTMLButtonElement;
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('should set aria-expanded="true" on header button after expanding', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('button.accordion-header') as HTMLButtonElement;
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set native disabled attribute on button for disabled items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('button.accordion-header');
      const disabledButton = buttons[3] as HTMLButtonElement;
      expect(disabledButton.disabled).toBe(true);
    });

    it('should set aria-hidden="true" on collapsed content panel', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector(
        '.accordion-content-wrapper',
      ) as HTMLElement;
      expect(panel.getAttribute('aria-hidden')).toBe('true');
    });

    it('should set aria-hidden="false" on expanded content panel', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector(
        '.accordion-content-wrapper',
      ) as HTMLElement;
      expect(panel.getAttribute('aria-hidden')).toBe('false');
    });

    it('should have aria-controls referencing the panel id', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const button = compiled.querySelector('button.accordion-header') as HTMLButtonElement;
      const panelId = button.getAttribute('aria-controls');
      expect(panelId).toBe('accordion-content-1');
      expect(document.getElementById(panelId!)).toBeTruthy();
    });

    it('should have aria-labelledby on panel referencing the header button id', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const panel = compiled.querySelector('.accordion-content-wrapper') as HTMLElement;
      const headerId = panel.getAttribute('aria-labelledby');
      expect(headerId).toBe('accordion-header-1');
      expect(document.getElementById(headerId!)).toBeTruthy();
    });

    it('should mark icon elements as aria-hidden', () => {
      fixture.componentRef.setInput('items', DcxAccordionItemsWithIcon);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const icon = compiled.querySelector('.accordion-icon') as HTMLElement;
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('getIconItemExpanded', () => {
    it('should always return chevron-down (CSS rotation handles the flip)', () => {
      expect(component.getIconItemExpanded()).toBe('chevron-down');
      component.toggleItem(mockItems[0]);
      expect(component.getIconItemExpanded()).toBe('chevron-down');
    });
  });

  describe('expandAll / collapseAll', () => {
    it('should expand all non-disabled items', () => {
      component.expandAll();
      fixture.detectChanges();

      const enabledItems = mockItems.filter(i => !i.disabled);
      enabledItems.forEach(item => {
        expect(component.isExpanded(item.id)).toBe(true);
      });
    });

    it('should not expand disabled items', () => {
      component.expandAll();
      fixture.detectChanges();

      const disabledItem = mockItems.find(i => i.disabled)!;
      expect(component.isExpanded(disabledItem.id)).toBe(false);
    });

    it('should emit itemExpanded and itemToggled for each expanded item', () => {
      const expandedSpy = jest.fn();
      const toggledSpy = jest.fn();
      component.itemExpanded.subscribe(expandedSpy);
      component.itemToggled.subscribe(toggledSpy);

      component.expandAll();

      const enabledCount = mockItems.filter(i => !i.disabled).length;
      expect(expandedSpy).toHaveBeenCalledTimes(enabledCount);
      expect(toggledSpy).toHaveBeenCalledTimes(enabledCount);
    });

    it('should collapse all expanded items', () => {
      component.expandAll();
      fixture.detectChanges();

      component.collapseAll();
      fixture.detectChanges();

      mockItems.forEach(item => {
        expect(component.isExpanded(item.id)).toBe(false);
      });
    });

    it('should emit itemCollapsed and itemToggled only for items that were open', () => {
      component.toggleItem(mockItems[0]);
      fixture.detectChanges();

      const collapsedSpy = jest.fn();
      const toggledSpy = jest.fn();
      component.itemCollapsed.subscribe(collapsedSpy);
      component.itemToggled.subscribe(toggledSpy);

      component.collapseAll();

      expect(collapsedSpy).toHaveBeenCalledTimes(1);
      expect(toggledSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit events when collapseAll called with nothing open', () => {
      const collapsedSpy = jest.fn();
      component.itemCollapsed.subscribe(collapsedSpy);

      component.collapseAll();

      expect(collapsedSpy).not.toHaveBeenCalled();
    });
  });

  describe('variant', () => {
    it('should apply accordion--flush class when variant is flush', () => {
      fixture.componentRef.setInput('variant', 'flush');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const accordion = compiled.querySelector('.accordion') as HTMLElement;
      expect(accordion.classList.contains('accordion--flush')).toBe(true);
    });

    it('should not apply accordion--flush class for default variant', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const accordion = compiled.querySelector('.accordion') as HTMLElement;
      expect(accordion.classList.contains('accordion--flush')).toBe(false);
    });
  });

  describe('ariaLabel', () => {
    it('should not render aria-label attribute when null', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const accordion = compiled.querySelector('.accordion') as HTMLElement;
      expect(accordion.getAttribute('aria-label')).toBeNull();
    });

    it('should render aria-label when provided', () => {
      fixture.componentRef.setInput('ariaLabel', 'Preguntas frecuentes');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const accordion = compiled.querySelector('.accordion') as HTMLElement;
      expect(accordion.getAttribute('aria-label')).toBe('Preguntas frecuentes');
    });
  });
});

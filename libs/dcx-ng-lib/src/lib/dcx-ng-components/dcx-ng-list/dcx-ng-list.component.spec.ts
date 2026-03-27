import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DcxNgListComponent,
  SIMPLE_LIST_ITEMS,
  SELECTABLE_LIST_ITEMS,
  LIST_ITEMS_WITH_DIVIDER,
  LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION,
  LIST_ENABLED_DISABLED_ITEMS,
  LIST_DISABLED_ONLY,
  LIST_DIVIDER_ONLY,
  LIST_ITEMS_WITH_SUBLISTS,
  LIST_ITEMS_WITH_ICONS,
} from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgListComponent', () => {
  let fixture: ComponentFixture<DcxNgListComponent>;
  let component: DcxNgListComponent;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgListComponent);
    component = fixture.componentInstance;
  });

  // ─── Creation ────────────────────────────────────────────────────────────────

  it('should create', () => {
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // ─── Rendering ───────────────────────────────────────────────────────────────

  describe('Rendering', () => {
    it('renders the correct number of list items', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();

      const lis = host().querySelectorAll('.dcx-list-item');
      expect(lis.length).toBe(SIMPLE_LIST_ITEMS.length);
    });

    it('renders item text correctly', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();

      const lis = host().querySelectorAll('.dcx-list-item');
      expect(lis[0].textContent?.trim()).toContain('One');
      expect(lis[3].textContent?.trim()).toContain('Four');
    });

    it('renders item icons', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_ICONS);
      fixture.detectChanges();

      const icons = host().querySelectorAll('.dcx-list-icon');
      expect(icons.length).toBe(LIST_ITEMS_WITH_ICONS.length);
    });

    it('does not render icon containers for items without icon', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();

      const icons = host().querySelectorAll('.dcx-list-icon');
      expect(icons.length).toBe(0);
    });

    it('renders item description when present', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION);
      fixture.detectChanges();

      const descs = host().querySelectorAll('.dcx-list-desc');
      expect(descs.length).toBe(LIST_ITEMS_WITH_ICONS_AND_DESCRIPTION.length);
      expect(descs[0].textContent?.trim()).toBe('Overview of metrics');
    });

    it('does not render description element for items without description', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();

      const descs = host().querySelectorAll('.dcx-list-desc');
      expect(descs.length).toBe(0);
    });

    it('renders divider items as separators', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_DIVIDER);
      fixture.detectChanges();

      const dividers = host().querySelectorAll('.dcx-list-divider');
      expect(dividers.length).toBe(1);
    });

    it('divider items have role="separator"', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_DIVIDER);
      fixture.detectChanges();

      const divider = host().querySelector('.dcx-list-divider');
      expect(divider?.getAttribute('role')).toBe('separator');
    });

    it('renders disabled items with .disabled class', () => {
      fixture.componentRef.setInput('items', LIST_ENABLED_DISABLED_ITEMS);
      fixture.detectChanges();

      const disabledItems = host().querySelectorAll('.disabled');
      expect(disabledItems.length).toBe(1);
    });

    it('renders empty list without errors', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();

      const lis = host().querySelectorAll('.dcx-list-item');
      expect(lis.length).toBe(0);
    });

    it('applies .has-children class to items with children', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_SUBLISTS);
      fixture.detectChanges();

      const withChildren = host().querySelectorAll('.has-children');
      // Two items in LIST_ITEMS_WITH_SUBLISTS have children (Frutas, Verduras)
      expect(withChildren.length).toBe(2);
    });
  });

  // ─── Accessibility ───────────────────────────────────────────────────────────

  describe('Accessibility', () => {
    it('adds tabindex="0" to selectable non-disabled items', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const items = host().querySelectorAll('.dcx-list-item');
      items.forEach(item => {
        expect(item.getAttribute('tabindex')).toBe('0');
      });
    });

    it('does not add tabindex to items when not selectable', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();

      const items = host().querySelectorAll('.dcx-list-item');
      items.forEach(item => {
        expect(item.getAttribute('tabindex')).toBeNull();
      });
    });

    it('does not add tabindex to disabled items', () => {
      fixture.componentRef.setInput('items', LIST_ENABLED_DISABLED_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const disabledItem = host().querySelector('.dcx-list-item.disabled');
      expect(disabledItem?.getAttribute('tabindex')).toBeNull();
    });

    it('adds role="button" to selectable items', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const items = host().querySelectorAll('.dcx-list-item');
      items.forEach(item => {
        expect(item.getAttribute('role')).toBe('button');
      });
    });

    it('does not add role="button" when not selectable', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();

      const items = host().querySelectorAll('.dcx-list-item');
      items.forEach(item => {
        expect(item.getAttribute('role')).toBeNull();
      });
    });
  });

  it('is not selectable by default', () => {
    fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
    fixture.detectChanges();
    expect(component.selectable()).toBe(false);
  });

  // ─── Selection — single ──────────────────────────────────────────────────────

  describe('Single select', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', SELECTABLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', false);
      fixture.detectChanges();
    });

    it('emits itemSelected when an item is clicked', () => {
      const spy = jest.fn();
      component.itemSelected.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);

      expect(spy).toHaveBeenCalledWith({ item: SELECTABLE_LIST_ITEMS[0], index: 0 });
    });

    it('marks clicked item as selected', () => {
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);

      expect(component.isSelected(0)).toBe(true);
      expect(component.isSelected(1)).toBe(false);
    });

    it('emits selectionChanged with the selected item after selection', () => {
      const spy = jest.fn();
      component.selectionChanged.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);

      expect(spy).toHaveBeenCalledWith([{ item: SELECTABLE_LIST_ITEMS[0], index: 0 }]);
    });

    it('replaces previous selection when another item is clicked', () => {
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      component.onItemClick(SELECTABLE_LIST_ITEMS[1], 1);

      expect(component.isSelected(0)).toBe(false);
      expect(component.isSelected(1)).toBe(true);
    });

    it('deselects the item when clicking it again', () => {
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(true);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(false);
    });

    it('emits itemDeselected when clicking a selected item', () => {
      const spy = jest.fn();
      component.itemDeselected.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);

      expect(spy).toHaveBeenCalledWith({ item: SELECTABLE_LIST_ITEMS[0], index: 0 });
    });

    it('emits selectionChanged with empty array after deselection', () => {
      const spy = jest.fn();
      component.selectionChanged.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);

      expect(spy).toHaveBeenLastCalledWith([]);
    });

    it('returns false for isSelected when not selectable', () => {
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(false);
    });

    it('does not select disabled items', () => {
      fixture.componentRef.setInput('items', LIST_DISABLED_ONLY);
      fixture.detectChanges();

      const spy = jest.fn();
      component.itemSelected.subscribe(spy);
      component.onItemClick(LIST_DISABLED_ONLY[0], 0);

      expect(spy).not.toHaveBeenCalled();
    });

    it('does not select divider items', () => {
      fixture.componentRef.setInput('items', LIST_DIVIDER_ONLY);
      fixture.detectChanges();

      const spy = jest.fn();
      component.itemSelected.subscribe(spy);
      component.onItemClick(LIST_DIVIDER_ONLY[0], 0);

      expect(spy).not.toHaveBeenCalled();
    });

    it('applies .selected class to the selected item in the DOM', () => {
      fixture.detectChanges();
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      fixture.detectChanges();

      const items = host().querySelectorAll('.dcx-list-item');
      expect(items[0].classList).toContain('selected');
      expect(items[1].classList).not.toContain('selected');
    });
  });

  // ─── Selection — multi ───────────────────────────────────────────────────────

  describe('Multi-select', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', SELECTABLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', true);
      fixture.detectChanges();
    });

    it('allows selecting multiple items', () => {
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      component.onItemClick(SELECTABLE_LIST_ITEMS[1], 1);

      expect(component.isSelected(0)).toBe(true);
      expect(component.isSelected(1)).toBe(true);
    });

    it('deselects an already-selected item', () => {
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(true);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(false);
    });

    it('emits itemSelected for each newly selected item', () => {
      const spy = jest.fn();
      component.itemSelected.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      component.onItemClick(SELECTABLE_LIST_ITEMS[2], 2);

      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(1, { item: SELECTABLE_LIST_ITEMS[0], index: 0 });
      expect(spy).toHaveBeenNthCalledWith(2, { item: SELECTABLE_LIST_ITEMS[2], index: 2 });
    });

    it('emits itemDeselected when a selected item is clicked again', () => {
      const spy = jest.fn();
      component.itemDeselected.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);

      expect(spy).toHaveBeenCalledWith({ item: SELECTABLE_LIST_ITEMS[0], index: 0 });
    });

    it('emits selectionChanged with full current selection after each change', () => {
      const spy = jest.fn();
      component.selectionChanged.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(spy).toHaveBeenLastCalledWith([{ item: SELECTABLE_LIST_ITEMS[0], index: 0 }]);

      component.onItemClick(SELECTABLE_LIST_ITEMS[1], 1);
      expect(spy).toHaveBeenLastCalledWith([
        { item: SELECTABLE_LIST_ITEMS[0], index: 0 },
        { item: SELECTABLE_LIST_ITEMS[1], index: 1 },
      ]);
    });

    it('emits selectionChanged with remaining items after deselection', () => {
      const spy = jest.fn();
      component.selectionChanged.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      component.onItemClick(SELECTABLE_LIST_ITEMS[1], 1);
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0); // deselect first

      expect(spy).toHaveBeenLastCalledWith([{ item: SELECTABLE_LIST_ITEMS[1], index: 1 }]);
    });

    it('selectedItems computed reflects current selection', () => {
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      component.onItemClick(SELECTABLE_LIST_ITEMS[2], 2);

      expect(component.selectedItems()).toEqual([
        { item: SELECTABLE_LIST_ITEMS[0], index: 0 },
        { item: SELECTABLE_LIST_ITEMS[2], index: 2 },
      ]);
    });
  });

  // ─── Children / nested lists ─────────────────────────────────────────────────

  describe('Children', () => {
    it('renders nested list when renderChildren is true (default)', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_SUBLISTS);
      fixture.componentRef.setInput('renderChildren', true);
      fixture.detectChanges();

      const nestedList = host().querySelector('.dcx-list-nested');
      expect(nestedList).toBeTruthy();
    });

    it('does not render nested list when renderChildren is false', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_SUBLISTS);
      fixture.componentRef.setInput('renderChildren', false);
      fixture.detectChanges();

      const nestedList = host().querySelector('.dcx-list-nested');
      expect(nestedList).toBeFalsy();
    });

    it('renders the children indicator icon when showChildrenIndicator is true', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_SUBLISTS);
      fixture.componentRef.setInput('showChildrenIndicator', true);
      fixture.detectChanges();

      const indicator = host().querySelector('.dcx-list-children-indicator');
      expect(indicator).toBeTruthy();
    });

    it('does not render children indicator when showChildrenIndicator is false', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_SUBLISTS);
      fixture.componentRef.setInput('showChildrenIndicator', false);
      fixture.detectChanges();

      const indicator = host().querySelector('.dcx-list-children-indicator');
      expect(indicator).toBeFalsy();
    });

    it('does not render children indicator on items without children', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.componentRef.setInput('showChildrenIndicator', true);
      fixture.detectChanges();

      const indicator = host().querySelector('.dcx-list-children-indicator');
      expect(indicator).toBeFalsy();
    });
  });
});

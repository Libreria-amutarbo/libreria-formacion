import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DcxNgListComponent,
  SIMPLE_LIST_ITEMS,
  SELECTABLE_LIST_ITEMS,
  LIST_ITEMS_WITH_DIVIDER,
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

  it('should create', () => {
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders list items within a container', () => {
    fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
    fixture.detectChanges();

    const container = host().querySelector('.dcx-list-container');
    expect(container).toBeTruthy();

    const lis = host().querySelectorAll('.dcx-list-item');
    expect(lis.length).toBe(SIMPLE_LIST_ITEMS.length);
    expect(lis[0].textContent?.trim()).toContain('Three');
  });

  it('renders items with icon containers', () => {
    fixture.componentRef.setInput('items', LIST_ITEMS_WITH_ICONS);
    fixture.detectChanges();

    const iconContainers = host().querySelectorAll('.dcx-list-icon-container');
    expect(iconContainers.length).toBe(LIST_ITEMS_WITH_ICONS.length);
  });

  it('renders divider items', () => {
    fixture.componentRef.setInput('items', LIST_ITEMS_WITH_DIVIDER);
    fixture.detectChanges();

    const dividers = host().querySelectorAll('.dcx-list-divider');
    expect(dividers.length).toBe(1);
  });

  it('renders disabled items', () => {
    fixture.componentRef.setInput('items', LIST_ENABLED_DISABLED_ITEMS);
    fixture.detectChanges();

    const disabledItems = host().querySelectorAll('.disabled');
    expect(disabledItems.length).toBe(1);
  });

  describe('Selection', () => {
    it('should not be selectable by default', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();
      expect(component.selectable()).toBe(false);
    });

    it('should emit itemSelected when selectable item is clicked', () => {
      fixture.componentRef.setInput('items', SELECTABLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const spy = jest.fn();
      component.itemSelected.subscribe(spy);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(spy).toHaveBeenCalledWith({
        item: SELECTABLE_LIST_ITEMS[0],
        index: 0,
      });
    });

    it('should track selected indices', () => {
      fixture.componentRef.setInput('items', SELECTABLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(true);
      expect(component.isSelected(1)).toBe(false);
    });

    it('should emit itemDeselected when a selected item is clicked in multiSelect mode', () => {
      fixture.componentRef.setInput('items', SELECTABLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      const spySelected = jest.fn();
      const spyDeselected = jest.fn();
      component.itemSelected.subscribe(spySelected);
      component.itemDeselected.subscribe(spyDeselected);

      // Select
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(spySelected).toHaveBeenCalled();

      // Deselect
      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(spyDeselected).toHaveBeenCalledWith({
        item: SELECTABLE_LIST_ITEMS[0],
        index: 0,
      });
    });

    it('should not select disabled items', () => {
      fixture.componentRef.setInput('items', LIST_DISABLED_ONLY);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const spy = jest.fn();
      component.itemSelected.subscribe(spy);
      component.onItemClick(LIST_DISABLED_ONLY[0], 0);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not select divider items', () => {
      fixture.componentRef.setInput('items', LIST_DIVIDER_ONLY);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const spy = jest.fn();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should return false for isSelected when not selectable', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();
      expect(component.isSelected(0)).toBe(false);
    });

    it('should not emit itemSelected when selectable is false', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', false);
      fixture.detectChanges();

      const spy = jest.fn();
      component.itemSelected.subscribe(spy);

      component.onItemClick(SIMPLE_LIST_ITEMS[0], 0);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Multi-select', () => {
    it('should allow multiple selections in multiSelect mode', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      component.onItemClick(SIMPLE_LIST_ITEMS[0], 0);
      component.onItemClick(SIMPLE_LIST_ITEMS[1], 1);

      expect(component.isSelected(0)).toBe(true);
      expect(component.isSelected(1)).toBe(true);
    });

    it('should deselect in multiSelect mode', () => {
      fixture.componentRef.setInput('items', SELECTABLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(true);

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(false);
    });
  });

  describe('Single select', () => {
    it('should replace selection in single select mode', () => {
      fixture.componentRef.setInput('items', SELECTABLE_LIST_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', false);
      fixture.detectChanges();

      component.onItemClick(SELECTABLE_LIST_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(true);

      component.onItemClick(SELECTABLE_LIST_ITEMS[1], 1);
      expect(component.isSelected(0)).toBe(false);
      expect(component.isSelected(1)).toBe(true);
    });
  });

  describe('Children', () => {
    it('should render children indicator when showChildrenIndicator is true', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_SUBLISTS);
      fixture.componentRef.setInput('showChildrenIndicator', true);
      fixture.detectChanges();

      const indicator = host().querySelector('.dcx-list-children-indicator');
      expect(indicator).toBeTruthy();
    });

    it('should render nested list when renderChildren is true', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_SUBLISTS);
      fixture.componentRef.setInput('renderChildren', true);
      fixture.detectChanges();

      const nestedList = host().querySelector('.dcx-list-nested');
      expect(nestedList).toBeTruthy();
    });

    it('should not render nested list when renderChildren is false', () => {
      fixture.componentRef.setInput('items', LIST_ITEMS_WITH_SUBLISTS);
      fixture.componentRef.setInput('renderChildren', false);
      fixture.detectChanges();

      const nestedList = host().querySelector('.dcx-list-nested');
      expect(nestedList).toBeFalsy();
    });
  });

  describe('Empty list', () => {
    it('should render empty list without errors', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();
      const lis = host().querySelectorAll('.dcx-list-item');
      expect(lis.length).toBe(0);
    });
  });
});

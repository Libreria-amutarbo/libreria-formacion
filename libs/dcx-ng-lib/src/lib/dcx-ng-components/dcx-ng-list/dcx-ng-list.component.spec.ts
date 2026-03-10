import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgListComponent } from './dcx-ng-list.component';
import {
  SIMPLE_LIST_ITEMS,
  SELECTABLE_LIST_ITEMS,
  LIST_ABC_ITEMS,
  LIST_ITEMS_WITH_DIVIDER,
  LIST_ENABLED_DISABLED_ITEMS,
  LIST_TWO_OPTIONS,
  LIST_DISABLED_ONLY,
  LIST_DIVIDER_ONLY,
  LIST_AB_ITEMS,
  LIST_PARENT_WITH_CHILDREN,
  LIST_ITEMS_WITH_ICONS,
} from '../../core/mock';

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

  it('renders list items', () => {
    fixture.componentRef.setInput('items', LIST_ABC_ITEMS);
    fixture.detectChanges();

    const lis = host().querySelectorAll('.dcx-list-item');
    expect(lis.length).toBe(3);
    expect(lis[0].textContent?.trim()).toContain('A');
    expect(lis[2].textContent?.trim()).toContain('C');
  });

  it('renders items with icons', () => {
    fixture.componentRef.setInput('items', LIST_ITEMS_WITH_ICONS);
    fixture.detectChanges();

    const icons = host().querySelectorAll('.dcx-list-icon');
    expect(icons.length).toBe(LIST_ITEMS_WITH_ICONS.length);
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
      fixture.componentRef.setInput('items', LIST_TWO_OPTIONS);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      const spy = jest.fn();
      component.itemSelected.subscribe(spy);

      component.onItemClick(LIST_TWO_OPTIONS[0], 0);
      expect(spy).toHaveBeenCalledWith({ item: LIST_TWO_OPTIONS[0], index: 0 });
    });

    it('should track selected indices', () => {
      fixture.componentRef.setInput('items', LIST_TWO_OPTIONS);
      fixture.componentRef.setInput('selectable', true);
      fixture.detectChanges();

      component.onItemClick(LIST_TWO_OPTIONS[0], 0);
      expect(component.isSelected(0)).toBe(true);
      expect(component.isSelected(1)).toBe(false);
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
      component.itemSelected.subscribe(spy);
      component.onItemClick(LIST_DIVIDER_ONLY[0], 0);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should return false for isSelected when not selectable', () => {
      fixture.componentRef.setInput('items', SIMPLE_LIST_ITEMS);
      fixture.detectChanges();
      expect(component.isSelected(0)).toBe(false);
    });
  });

  describe('Multi-select', () => {
    it('should allow multiple selections in multiSelect mode', () => {
      fixture.componentRef.setInput('items', LIST_ABC_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      component.onItemClick(LIST_ABC_ITEMS[0], 0);
      component.onItemClick(LIST_ABC_ITEMS[1], 1);

      expect(component.isSelected(0)).toBe(true);
      expect(component.isSelected(1)).toBe(true);
    });

    it('should deselect in multiSelect mode', () => {
      fixture.componentRef.setInput('items', LIST_AB_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', true);
      fixture.detectChanges();

      component.onItemClick(LIST_AB_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(true);

      component.onItemClick(LIST_AB_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(false);
    });
  });

  describe('Single select', () => {
    it('should replace selection in single select mode', () => {
      fixture.componentRef.setInput('items', LIST_AB_ITEMS);
      fixture.componentRef.setInput('selectable', true);
      fixture.componentRef.setInput('multiSelect', false);
      fixture.detectChanges();

      component.onItemClick(LIST_AB_ITEMS[0], 0);
      expect(component.isSelected(0)).toBe(true);

      component.onItemClick(LIST_AB_ITEMS[1], 1);
      expect(component.isSelected(0)).toBe(false);
      expect(component.isSelected(1)).toBe(true);
    });
  });

  describe('Children', () => {
    it('should render children indicator when showChildrenIndicator is true', () => {
      fixture.componentRef.setInput('items', LIST_PARENT_WITH_CHILDREN);
      fixture.componentRef.setInput('showChildrenIndicator', true);
      fixture.detectChanges();

      const indicator = host().querySelector('.dcx-list-children-indicator');
      expect(indicator).toBeTruthy();
    });

    it('should render nested list when renderChildren is true', () => {
      fixture.componentRef.setInput('items', LIST_PARENT_WITH_CHILDREN);
      fixture.componentRef.setInput('renderChildren', true);
      fixture.detectChanges();

      const nestedList = host().querySelector('.dcx-list-nested');
      expect(nestedList).toBeTruthy();
    });

    it('should not render nested list when renderChildren is false', () => {
      fixture.componentRef.setInput('items', LIST_PARENT_WITH_CHILDREN);
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

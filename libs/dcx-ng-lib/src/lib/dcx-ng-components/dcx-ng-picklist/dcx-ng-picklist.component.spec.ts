import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DcxNgPickListComponent,
  DcxPickListItem,
  PICKLIST_AVAILABLE_COURSES,
  PICKLIST_SELECTED_COURSES,
} from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgPickListComponent', () => {
  let fixture: ComponentFixture<DcxNgPickListComponent>;
  let component: DcxNgPickListComponent;

  const host = () => fixture.nativeElement as HTMLElement;
  const available = (): DcxPickListItem[] =>
    PICKLIST_AVAILABLE_COURSES.slice(0, 4);
  const selected = (): DcxPickListItem[] => PICKLIST_SELECTED_COURSES.slice(0, 1);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPickListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPickListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('source', available());
    fixture.componentRef.setInput('target', selected());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders source and target listboxes with headers', () => {
    expect(host().textContent).toContain('Disponibles');
    expect(host().textContent).toContain('Seleccionados');
    expect(host().querySelectorAll('[role="listbox"]').length).toBe(2);
    expect(host().querySelectorAll('[role="option"]').length).toBe(5);
  });

  it('toggles source item selection and emits sourceSelect', () => {
    const spy = jest.fn();
    component.sourceSelect.subscribe(spy);

    component.toggleItem(component.sourceItems()[0], 'source');

    expect(component.isSelected(component.sourceItems()[0], 'source')).toBe(
      true,
    );
    expect(spy).toHaveBeenCalledWith({
      originalEvent: undefined,
      side: 'source',
      items: [component.sourceItems()[0]],
    });
  });

  it('moves selected source items to target and emits changes', () => {
    const sourceSpy = jest.fn();
    const targetSpy = jest.fn();
    const moveSpy = jest.fn();
    const item = component.sourceItems()[0];

    component.sourceChange.subscribe(sourceSpy);
    component.targetChange.subscribe(targetSpy);
    component.moveToTarget.subscribe(moveSpy);

    component.toggleItem(item, 'source');
    component.moveSelectedToTarget();

    expect(component.sourceItems().some(sourceItem => sourceItem.id === item.id))
      .toBe(false);
    expect(component.targetItems().some(targetItem => targetItem.id === item.id))
      .toBe(true);
    expect(sourceSpy).toHaveBeenCalled();
    expect(targetSpy).toHaveBeenCalled();
    expect(moveSpy).toHaveBeenCalledWith({
      items: [item],
      source: component.sourceItems(),
      target: component.targetItems(),
    });
  });

  it('uses library buttonClick controls to move selected source items', () => {
    const item = component.sourceItems()[0];

    component.toggleItem(item, 'source');
    fixture.detectChanges();

    const transferButton = host().querySelector(
      'button[aria-label="Mover seleccionados a seleccionados"]',
    ) as HTMLButtonElement;

    expect(host().querySelectorAll('dcx-ng-button').length).toBe(12);

    transferButton.click();

    expect(component.sourceItems().some(sourceItem => sourceItem.id === item.id))
      .toBe(false);
    expect(component.targetItems().some(targetItem => targetItem.id === item.id))
      .toBe(true);
  });

  it('moves all enabled target items to source', () => {
    const moveSpy = jest.fn();
    component.moveAllToSource.subscribe(moveSpy);

    component.moveEveryItemToSource();

    expect(component.targetItems()).toEqual([]);
    expect(component.sourceItems().length).toBe(5);
    expect(moveSpy).toHaveBeenCalledWith({
      items: selected(),
      source: component.sourceItems(),
      target: [],
    });
  });

  it('reorders selected source items upwards', () => {
    const reorderSpy = jest.fn();
    const item = component.sourceItems()[1];
    component.sourceReorder.subscribe(reorderSpy);

    component.toggleItem(item, 'source');
    component.moveUp('source');

    expect(component.sourceItems()[0]).toEqual(item);
    expect(reorderSpy).toHaveBeenCalledWith({
      side: 'source',
      items: component.sourceItems(),
    });
  });

  it('filters source items by the configured field', () => {
    const filterSpy = jest.fn();
    fixture.componentRef.setInput('filterBy', 'category');
    fixture.componentRef.setInput('showSourceFilter', true);
    fixture.detectChanges();
    component.sourceFilter.subscribe(filterSpy);

    expect(host().querySelector('dcx-ng-input')).toBeTruthy();
    expect(host().querySelector('input[type="search"]')).toBeTruthy();

    component.onFilterChange('source', 'UX');

    expect(component.visibleSourceItems()).toEqual([
      PICKLIST_AVAILABLE_COURSES[1],
    ]);
    expect(filterSpy).toHaveBeenCalledWith({
      query: 'UX',
      side: 'source',
      value: [PICKLIST_AVAILABLE_COURSES[1]],
    });
  });

  it('does not select or move when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const item = component.sourceItems()[0];

    component.toggleItem(item, 'source');
    component.moveEveryItemToTarget();

    expect(component.isSelected(item, 'source')).toBe(false);
    expect(component.sourceItems().length).toBe(4);
    expect(component.targetItems().length).toBe(1);
  });

  it('selects all visible enabled items with Ctrl+A', () => {
    const event = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true });

    component.onItemKeydown(event, component.sourceItems()[0], 'source', 0);

    expect(component.selectedSourceIds()).toEqual(
      component.visibleSourceItems().map(item => item.id),
    );
  });
});

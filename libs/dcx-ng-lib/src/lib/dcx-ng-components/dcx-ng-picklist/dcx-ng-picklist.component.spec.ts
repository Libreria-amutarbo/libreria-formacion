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

    const transferButton = host().querySelector<HTMLButtonElement>(
      'button[aria-label="Mover seleccionados de Disponibles a Seleccionados"]',
    );

    expect(transferButton).not.toBeNull();

    if (!transferButton) {
      return;
    }
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

  it('translates filtered drag indexes when reordering within a list', () => {
    fixture.componentRef.setInput('source', PICKLIST_AVAILABLE_COURSES.slice(0, 4));
    fixture.componentRef.setInput('filterBy', 'category');
    fixture.componentRef.setInput('dragdrop', true);
    fixture.detectChanges();
    component.onFilterChange('source', 'Frontend');
    const container = {
      id: component.sourceListId,
      data: component.visibleSourceItems(),
    };

    component.onDrop(
      {
        previousContainer: container,
        container,
        previousIndex: 1,
        currentIndex: 0,
      } as never,
      'source',
    );

    expect(component.sourceItems().map(item => item.id)).toEqual([
      'rxjs-practical',
      'angular-foundations',
      'design-system',
      'testing-library',
    ]);
  });

  it('translates filtered drag indexes when transferring between lists', () => {
    fixture.componentRef.setInput('source', PICKLIST_AVAILABLE_COURSES.slice(0, 4));
    fixture.componentRef.setInput('target', PICKLIST_SELECTED_COURSES);
    fixture.componentRef.setInput('filterBy', 'category,label');
    fixture.componentRef.setInput('dragdrop', true);
    fixture.detectChanges();
    component.onFilterChange('source', 'UX');
    component.onFilterChange('target', 'Git');

    component.onDrop(
      {
        previousContainer: {
          id: component.sourceListId,
          data: component.visibleSourceItems(),
        },
        container: {
          id: component.targetListId,
          data: component.visibleTargetItems(),
        },
        previousIndex: 0,
        currentIndex: 0,
      } as never,
      'target',
    );

    expect(component.sourceItems().map(item => item.id)).not.toContain(
      'design-system',
    );
    expect(component.targetItems().map(item => item.id)).toEqual([
      'design-system',
      'git-workflow',
      'agile-delivery',
    ]);
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

  it('moves DOM focus when navigating options with arrow keys', () => {
    const options = host().querySelectorAll<HTMLElement>('[role="option"]');
    options[0].focus();

    component.onItemKeydown(
      new KeyboardEvent('keydown', { key: 'ArrowDown' }),
      component.sourceItems()[0],
      'source',
      0,
    );

    expect(document.activeElement).toBe(options[1]);
  });

  describe('WCAG AA', () => {
    it('declares both listboxes as multiselectable', () => {
      const listboxes = host().querySelectorAll<HTMLElement>('[role="listbox"]');
      expect(listboxes.length).toBe(2);
      listboxes.forEach(listbox =>
        expect(listbox.getAttribute('aria-multiselectable')).toBe('true'),
      );
    });

    it('exposes aria-selected on the option element (role="option")', () => {
      component.toggleItem(component.sourceItems()[0], 'source');
      fixture.detectChanges();

      const options = host().querySelectorAll<HTMLElement>(
        '[role="listbox"]:first-of-type [role="option"]',
      );
      expect(options[0].getAttribute('aria-selected')).toBe('true');
      expect(options[1].getAttribute('aria-selected')).toBe('false');
    });

    it('shows an empty-state message when a list has no items', () => {
      fixture.componentRef.setInput('source', []);
      fixture.detectChanges();

      const empty = host().querySelector('.dcx-picklist__empty');
      expect(empty).toBeTruthy();
      expect(empty?.textContent).toContain('No hay elementos disponibles');
    });

    it('shows a no-results message when a filter matches nothing', () => {
      fixture.componentRef.setInput('filterBy', 'label');
      fixture.componentRef.setInput('showSourceFilter', true);
      fixture.detectChanges();

      component.onFilterChange('source', 'zzz-no-match');
      fixture.detectChanges();

      const empty = host().querySelector('.dcx-picklist__empty');
      expect(empty?.textContent).toContain('Sin resultados');
    });
  });
});

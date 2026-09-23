import './dcx-web-picklist.component';

import { DcxWebPicklist } from './dcx-web-picklist.component';
import type {
  DcxPickListItem,
  DcxPickListMoveEvent,
  DcxPickListFilterEvent,
} from '../../core/interfaces/picklist';

describe('DcxWebPicklist', () => {
  let element: DcxWebPicklist;

  beforeEach(async () => {
    element = document.createElement('dcx-web-picklist') as DcxWebPicklist;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebPicklist);
  });

  it('should render two panels', async () => {
    element.source = [{ id: 'a', label: 'A' }];
    element.target = [{ id: 'b', label: 'B' }];
    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector('.dcx-picklist__panel--source'),
    ).toBeTruthy();
    expect(
      element.shadowRoot?.querySelector('.dcx-picklist__panel--target'),
    ).toBeTruthy();
  });

  it('should move selected items programmatically', async () => {
    element.source = [{ id: '1', label: 'One' }];
    await element.updateComplete;
    element.selectedSourceIds = ['1'];
    element.moveSelectedToTarget();
    expect(element.shadowRoot).toBeTruthy();
    expect(element.sourceItems.length).toBe(0);
    expect(element.targetItems.length).toBe(1);
  });

  it('should transfer an item by drag and drop from source to target', async () => {
    element.source = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ];
    element.target = [];
    await element.updateComplete;

    const lists = element.shadowRoot!.querySelectorAll('dcx-web-list');
    const sourceList = lists[0] as HTMLElement & {
      _onDragStart: (
        e: DragEvent,
        item: DcxPickListItem,
        index: number,
      ) => void;
      id: string;
    };
    const targetList = lists[1] as HTMLElement & {
      _onDrop: (e: DragEvent) => void;
      id: string;
    };
    const payload = JSON.stringify({
      id: '1',
      index: 0,
      sourceListId: sourceList.id || 'source-list',
      sourceData: [...element.source],
    });
    const dataTransfer = {
      setData: jest.fn(),
      getData: jest.fn((key: string) => {
        if (key === 'application/dcx-list-payload') return payload;
        if (key === 'application/dcx-list-source')
          return sourceList.id || 'source-list';
        return '';
      }),
      effectAllowed: '',
    };

    sourceList._onDragStart(
      { dataTransfer } as unknown as DragEvent,
      element.source[0],
      0,
    );
    targetList._onDrop({
      dataTransfer,
      preventDefault: () => undefined,
      composedPath: () => [targetList],
    } as unknown as DragEvent);

    expect(element.sourceItems).toHaveLength(1);
    expect(element.targetItems).toHaveLength(1);
    expect(element.targetItems[0].id).toBe('1');
  });

  it('should filter source items by label', async () => {
    element.source = [
      { id: '1', label: 'Apple' },
      { id: '2', label: 'Banana' },
      { id: '3', label: 'Apricot' },
    ];
    await element.updateComplete;

    element.onFilterChange('source', 'ap');
    await element.updateComplete;

    expect(element.sourceQuery).toBe('ap');
    expect(element.visibleSourceItems).toHaveLength(2);
    expect(element.visibleSourceItems.map(i => i.id)).toEqual(['1', '3']);
  });

  it('should filter target items by custom filterBy field', async () => {
    element.filterBy = 'category';
    element.target = [
      { id: '1', label: 'Item A', category: 'Fruit' },
      { id: '2', label: 'Item B', category: 'Vegetable' },
    ];
    await element.updateComplete;

    element.onFilterChange('target', 'fruit');
    await element.updateComplete;

    expect(element.visibleTargetItems).toHaveLength(1);
    expect(element.visibleTargetItems[0].id).toBe('1');
  });

  it('should emit sourceFilter event on filter change', async () => {
    element.source = [
      { id: '1', label: 'Apple' },
      { id: '2', label: 'Banana' },
    ];
    await element.updateComplete;

    let filterDetail: DcxPickListFilterEvent | undefined;
    element.addEventListener('sourceFilter', (e: Event) => {
      filterDetail = (e as CustomEvent<DcxPickListFilterEvent>).detail;
    });

    element.onFilterChange('source', 'ban');

    expect(filterDetail).toBeDefined();
    expect(filterDetail!.query).toBe('ban');
    expect(filterDetail!.side).toBe('source');
  });

  it('should move every item from source to target', async () => {
    element.source = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ];
    element.target = [{ id: '3', label: 'Three' }];
    await element.updateComplete;

    let moveDetail: DcxPickListMoveEvent | undefined;
    element.addEventListener('moveAllToTarget', (e: Event) => {
      moveDetail = (e as CustomEvent<DcxPickListMoveEvent>).detail;
    });

    element.moveEveryItemToTarget();
    await element.updateComplete;

    expect(element.sourceItems).toHaveLength(0);
    expect(element.targetItems).toHaveLength(3);
    expect(element.targetItems.map(i => i.id)).toEqual(['3', '1', '2']);
    expect(moveDetail).toBeDefined();
    expect(moveDetail!.items.map(i => i.id)).toEqual(['1', '2']);
  });

  it('should move every item from target to source', async () => {
    element.source = [{ id: '1', label: 'One' }];
    element.target = [
      { id: '2', label: 'Two' },
      { id: '3', label: 'Three' },
    ];
    await element.updateComplete;

    let moveDetail: DcxPickListMoveEvent | undefined;
    element.addEventListener('moveAllToSource', (e: Event) => {
      moveDetail = (e as CustomEvent<DcxPickListMoveEvent>).detail;
    });

    element.moveEveryItemToSource();
    await element.updateComplete;

    expect(element.sourceItems).toHaveLength(3);
    expect(element.targetItems).toHaveLength(0);
    expect(moveDetail).toBeDefined();
    expect(moveDetail!.items.map(i => i.id)).toEqual(['2', '3']);
  });

  it('should not select a disabled item', async () => {
    const disabledItem: DcxPickListItem = {
      id: '1',
      label: 'Disabled',
      disabled: true,
    };
    element.source = [disabledItem, { id: '2', label: 'Enabled' }];
    await element.updateComplete;

    const selectSpy = jest.fn();
    element.addEventListener('sourceSelect', selectSpy);

    element.toggleItem(disabledItem, 'source');

    expect(element.selectedSourceIds).not.toContain('1');
    expect(selectSpy).not.toHaveBeenCalled();
  });

  it('should not transfer disabled items with moveEveryItemToTarget', async () => {
    element.source = [
      { id: '1', label: 'Disabled', disabled: true },
      { id: '2', label: 'Enabled' },
    ];
    await element.updateComplete;

    element.moveEveryItemToTarget();
    await element.updateComplete;

    expect(element.sourceItems).toHaveLength(1);
    expect(element.sourceItems[0].id).toBe('1');
    expect(element.targetItems).toHaveLength(1);
    expect(element.targetItems[0].id).toBe('2');
  });

  it('should not transfer any item when picklist is disabled', async () => {
    element.disabled = true;
    element.source = [{ id: '1', label: 'One' }];
    await element.updateComplete;

    element.selectedSourceIds = ['1'];
    element.moveSelectedToTarget();
    element.moveEveryItemToTarget();

    expect(element.sourceItems).toHaveLength(1);
    expect(element.targetItems).toHaveLength(0);
  });

  it('should select and transfer an item with id: 0', async () => {
    const zeroItem: DcxPickListItem = { id: 0, label: 'Zero' };
    element.source = [zeroItem, { id: 1, label: 'One' }];
    await element.updateComplete;

    element.toggleItem(zeroItem, 'source');
    expect(element.selectedSourceIds).toContain(0);

    let moveDetail: DcxPickListMoveEvent | undefined;
    element.addEventListener('moveToTarget', (e: Event) => {
      moveDetail = (e as CustomEvent<DcxPickListMoveEvent>).detail;
    });

    element.moveSelectedToTarget();
    await element.updateComplete;

    expect(element.sourceItems).toHaveLength(1);
    expect(element.sourceItems[0].id).toBe(1);
    expect(element.targetItems).toHaveLength(1);
    expect(element.targetItems[0].id).toBe(0);
    expect(moveDetail).toBeDefined();
    expect(moveDetail!.items[0].id).toBe(0);
  });

  it('should emit sourceChange and targetChange on transfer', async () => {
    element.source = [{ id: '1', label: 'One' }];
    element.target = [];
    await element.updateComplete;

    let sourceChange: DcxPickListItem[] | undefined;
    let targetChange: DcxPickListItem[] | undefined;
    element.addEventListener('sourceChange', (e: Event) => {
      sourceChange = (e as CustomEvent<DcxPickListItem[]>).detail;
    });
    element.addEventListener('targetChange', (e: Event) => {
      targetChange = (e as CustomEvent<DcxPickListItem[]>).detail;
    });

    element.selectedSourceIds = ['1'];
    element.moveSelectedToTarget();

    expect(sourceChange).toEqual([]);
    expect(targetChange).toHaveLength(1);
    expect(targetChange![0].id).toBe('1');
  });
});

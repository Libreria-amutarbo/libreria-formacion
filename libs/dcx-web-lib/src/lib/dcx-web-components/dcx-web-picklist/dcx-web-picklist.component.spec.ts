import './dcx-web-picklist.component';

import { DcxWebPicklist } from './dcx-web-picklist.component';

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
    element.source = [{ id: 'a', label: 'A' } as any];
    element.target = [{ id: 'b', label: 'B' } as any];
    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector('.dcx-picklist__panel--source'),
    ).toBeTruthy();
    expect(
      element.shadowRoot?.querySelector('.dcx-picklist__panel--target'),
    ).toBeTruthy();
  });

  it('should move selected items programmatically', async () => {
    element.source = [{ id: '1', label: 'One' } as any];
    await element.updateComplete;
    element.selectedSourceIds = ['1'];
    element.moveSelectedToTarget();
    expect(element.shadowRoot).toBeTruthy();
    expect((element as any).sourceItems.length).toBe(0);
    expect((element as any).targetItems.length).toBe(1);
  });

  it('should transfer an item by drag and drop from source to target', async () => {
    element.source = [
      { id: '1', label: 'One' },
      { id: '2', label: 'Two' },
    ] as any;
    element.target = [] as any;
    await element.updateComplete;

    const sourceList = element.shadowRoot!.querySelectorAll(
      'dcx-web-list',
    )[0] as any;
    const targetList = element.shadowRoot!.querySelectorAll(
      'dcx-web-list',
    )[1] as any;
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

    sourceList._onDragStart({ dataTransfer } as any, element.source[0], 0);
    targetList._onDrop({
      dataTransfer,
      preventDefault: () => undefined,
      composedPath: () => [targetList],
    } as any);

    expect((element as any).sourceItems).toHaveLength(1);
    expect((element as any).targetItems).toHaveLength(1);
    expect((element as any).targetItems[0].id).toBe('1');
  });
});

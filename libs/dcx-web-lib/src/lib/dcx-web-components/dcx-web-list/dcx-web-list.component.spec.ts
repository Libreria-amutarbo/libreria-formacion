import './dcx-web-list.component';

import { DcxWebList } from './dcx-web-list.component';

describe('DcxWebList', () => {
  let element: DcxWebList;

  beforeEach(async () => {
    element =
      document.createElement(
        'dcx-web-list',
      ) as DcxWebList;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(
      DcxWebList,
    );
  });

  it('should render list container', async () => {
    element.items = [
      { text: 'Perfil' },
    ];

    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector(
        '.dcx-list-container',
      ),
    ).toBeTruthy();
  });

  it('should render items', async () => {
    element.items = [
      { text: 'Perfil' },
      { text: 'Facturación' },
    ];

    await element.updateComplete;

    const items =
      element.shadowRoot?.querySelectorAll(
        '.dcx-list-item',
      );

    expect(items?.length).toBe(2);
  });

  it('should render divider', async () => {
    element.items = [
      { divider: true },
    ];

    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector(
        '.dcx-list-divider',
      ),
    ).toBeTruthy();
  });

  it('should emit itemSelected', async () => {
    const spy = jest.fn();

    element.items = [{ text: 'A' }];
    element.selectable = true;

    element.addEventListener(
      'itemSelected',
      spy,
    );

    await element.updateComplete;

    (
      element.shadowRoot?.querySelector(
        '.dcx-list-item',
      ) as HTMLElement
    ).click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit itemDeselected', async () => {
    const spy = jest.fn();

    element.items = [{ text: 'A' }];
    element.selectable = true;

    element.addEventListener(
      'itemDeselected',
      spy,
    );

    element.onItemClick(
      element.items[0],
      0,
    );

    element.onItemClick(
      element.items[0],
      0,
    );

    expect(spy).toHaveBeenCalled();
  });

  it('should support multiselect', () => {
    element.selectable = true;
    element.multiSelect = true;

    element.items = [
      { text: '1' },
      { text: '2' },
    ];

    element.onItemClick(
      element.items[0],
      0,
    );

    element.onItemClick(
      element.items[1],
      1,
    );

    expect(
      element.selectedIndices.length,
    ).toBe(2);
  });

  it('should not select disabled items', () => {
    element.selectable = true;

    element.items = [
      {
        text: 'disabled',
        disabled: true,
      },
    ];

    element.onItemClick(
      element.items[0],
      0,
    );

    expect(
      element.selectedIndices.length,
    ).toBe(0);
  });

  it('should expose aria-label', async () => {
    element.items = [{ text: 'A' }];

    await element.updateComplete;

    const container =
      element.shadowRoot?.querySelector(
        '.dcx-list-container',
      );

    expect(
      container?.getAttribute(
        'aria-label',
      ),
    ).toBe('Lista de elementos');
  });

  it('should render icon container', async () => {
    element.items = [
      {
        text: 'Home',
        icon: 'house',
      },
    ];

    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector(
        '.dcx-list-icon-container',
      ),
    ).toBeTruthy();
  });

  it('should render nested list', async () => {
    element.renderChildren = true;

    element.items = [
      {
        text: 'Parent',
        children: [{ text: 'Child' }],
      },
    ];

    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector(
        '.dcx-list-nested',
      ),
    ).toBeTruthy();
  });
});
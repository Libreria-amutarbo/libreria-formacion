import './dcx-web-context-menu.component';
import { DcxWebContextMenu } from './dcx-web-context-menu.component';
import type { DcxContextMenuItem } from '../../core/interfaces';

describe('DcxWebContextMenu', () => {
  let element: DcxWebContextMenu;
  let mockItems: DcxContextMenuItem[];

  beforeEach(async () => {
    mockItems = [
      { id: '1', label: 'Item 1', icon: 'search' },
      { divider: true },
      { id: '2', label: 'Item 2', disabled: true },
      {
        id: '3',
        label: 'Item 3',
        children: [
          { id: '3-1', label: 'Child 1' }
        ]
      }
    ];
    element = document.createElement('dcx-web-context-menu') as DcxWebContextMenu;
    element.items = mockItems;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebContextMenu);
  });

  it('should not render container by default (isOpen is false)', () => {
    const container = element.shadowRoot?.querySelector('.dcx-context-menu');
    expect(container).toBeNull();
  });

  it('should render when opened', async () => {
    await element.open();
    await element.updateComplete;
    const container = element.shadowRoot?.querySelector('.dcx-context-menu');
    expect(container).not.toBeNull();
    expect(element.isOpen).toBe(true);
  });

  it('should render items correctly', async () => {
    await element.open();
    await element.updateComplete;
    const listItems = element.shadowRoot?.querySelectorAll('.dcx-context-menu__item');
    expect(listItems?.length).toBe(4);

    const firstItemText = listItems?.[0].querySelector('.dcx-context-menu__text')?.textContent;
    expect(firstItemText).toBe('Item 1');

    const firstIcon = listItems?.[0].querySelector('.bi-search');
    expect(firstIcon).not.toBeNull();

    const divider = element.shadowRoot?.querySelector('.dcx-context-menu__divider');
    expect(divider).not.toBeNull();
  });

  it('should dispatch item-selected event and close on item click', async () => {
    await element.open();
    await element.updateComplete;

    const eventSpy = jest.fn();
    element.addEventListener('item-selected', eventSpy);

    const firstLi = element.shadowRoot?.querySelector('.dcx-context-menu__item') as HTMLElement;
    firstLi.click();

    expect(eventSpy).toHaveBeenCalled();
    expect(eventSpy.mock.calls[0][0].detail).toEqual(mockItems[0]);
    expect(element.isOpen).toBe(false);
  });

  it('should not dispatch event nor close on disabled item click', async () => {
    await element.open();
    await element.updateComplete;

    const eventSpy = jest.fn();
    element.addEventListener('item-selected', eventSpy);

    const disabledLi = element.shadowRoot?.querySelectorAll('.dcx-context-menu__item')[1] as HTMLElement;
    expect(disabledLi.classList.contains('dcx-context-menu__item--disabled')).toBe(true);

    disabledLi.click();

    expect(eventSpy).not.toHaveBeenCalled();
    expect(element.isOpen).toBe(true);
  });

  it('should close when ESC key is pressed', async () => {
    await element.open();
    await element.updateComplete;

    const eventSpy = jest.fn();
    element.addEventListener('menu-closed', eventSpy);

    const escEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escEvent);

    expect(eventSpy).toHaveBeenCalled();
    expect(element.isOpen).toBe(false);
  });

  it('should close when clicking outside the menu', async () => {
    await element.open();
    await element.updateComplete;

    const eventSpy = jest.fn();
    element.addEventListener('menu-closed', eventSpy);

    const clickEvent = new MouseEvent('click', { bubbles: true });
    document.dispatchEvent(clickEvent);

    expect(eventSpy).toHaveBeenCalled();
    expect(element.isOpen).toBe(false);
  });

  it('should invoke item action on click if defined', async () => {
    const actionSpy = jest.fn();
    const actionItem: DcxContextMenuItem = { id: 'act', label: 'Action', action: actionSpy };
    element.items = [actionItem];
    await element.updateComplete;

    await element.open();
    await element.updateComplete;

    const li = element.shadowRoot?.querySelector('.dcx-context-menu__item') as HTMLElement;
    li.click();

    expect(actionSpy).toHaveBeenCalled();
  });
});

import './dcx-web-accordion.component';
import { DcxWebAccordion } from './dcx-web-accordion.component';
import { html } from 'lit';

const mockItems = [
  { id: '1', title: 'Title 1', content: 'Content 1' },
  {
    id: '2',
    title: 'Title 2',
    content: 'Content 2',
    description: 'Desc 2',
    icon: 'star',
  },
  { id: '3', title: 'Title 3', content: 'Content 3', disabled: true },
];

describe('DcxWebAccordion', () => {
  let element: DcxWebAccordion;

  beforeEach(async () => {
    element = document.createElement('dcx-web-accordion') as DcxWebAccordion;
    document.body.appendChild(element);
    element.items = mockItems;
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebAccordion);
  });

  it('should render the items correctly', () => {
    const accordion = element.shadowRoot?.querySelector('.dcx-accordion');
    expect(accordion).toBeTruthy();

    const items = element.shadowRoot?.querySelectorAll('.dcx-accordion__item');
    expect(items?.length).toBe(3);

    const firstHeader = element.shadowRoot?.querySelector(
      '#accordion-header-1',
    );
    expect(
      firstHeader?.querySelector('.dcx-accordion__title')?.textContent,
    ).toBe('Title 1');

    const secondHeader = element.shadowRoot?.querySelector(
      '#accordion-header-2',
    );
    expect(
      secondHeader?.querySelector('.dcx-accordion__description')?.textContent,
    ).toBe('Desc 2');
    expect(secondHeader?.querySelector('.dcx-accordion__icon')).toBeTruthy();
  });

  it('should initial expand based on item expanded property', async () => {
    element.items = [
      { id: '1', title: 'Title 1', content: 'Content 1', expanded: true },
      { id: '2', title: 'Title 2', content: 'Content 2' },
    ];
    await element.updateComplete;

    expect(element.isExpanded('1')).toBe(true);
    expect(element.isExpanded('2')).toBe(false);

    const firstPanel = element.shadowRoot?.querySelector(
      '#accordion-content-1',
    );
    expect(firstPanel?.getAttribute('aria-hidden')).toBe('false');
  });

  it('should initial expand based on expandedIds property', async () => {
    element.expandedIds = ['2'];
    await element.updateComplete;

    expect(element.isExpanded('1')).toBe(false);
    expect(element.isExpanded('2')).toBe(true);
  });

  it('should toggle item expansion on click', async () => {
    const firstHeader = element.shadowRoot?.querySelector(
      '#accordion-header-1',
    ) as HTMLButtonElement;

    firstHeader.click();
    await element.updateComplete;
    expect(element.isExpanded('1')).toBe(true);

    firstHeader.click();
    await element.updateComplete;
    expect(element.isExpanded('1')).toBe(false);
  });

  it('should close others when closeOthers is true', async () => {
    element.closeOthers = true;
    await element.updateComplete;

    const firstHeader = element.shadowRoot?.querySelector(
      '#accordion-header-1',
    ) as HTMLButtonElement;
    const secondHeader = element.shadowRoot?.querySelector(
      '#accordion-header-2',
    ) as HTMLButtonElement;

    firstHeader.click();
    await element.updateComplete;
    expect(element.isExpanded('1')).toBe(true);

    secondHeader.click();
    await element.updateComplete;
    expect(element.isExpanded('1')).toBe(false);
    expect(element.isExpanded('2')).toBe(true);
  });

  it('should allow multiple expanded items when closeOthers is false', async () => {
    element.closeOthers = false;
    await element.updateComplete;

    const firstHeader = element.shadowRoot?.querySelector(
      '#accordion-header-1',
    ) as HTMLButtonElement;
    const secondHeader = element.shadowRoot?.querySelector(
      '#accordion-header-2',
    ) as HTMLButtonElement;

    firstHeader.click();
    await element.updateComplete;
    secondHeader.click();
    await element.updateComplete;

    expect(element.isExpanded('1')).toBe(true);
    expect(element.isExpanded('2')).toBe(true);
  });

  it('should not expand disabled items', async () => {
    const thirdHeader = element.shadowRoot?.querySelector(
      '#accordion-header-3',
    ) as HTMLButtonElement;
    expect(thirdHeader.disabled).toBe(true);

    thirdHeader.click();
    await element.updateComplete;
    expect(element.isExpanded('3')).toBe(false);
  });

  it('should expand and collapse items via public API methods', async () => {
    element.expandItemById('1');
    await element.updateComplete;
    expect(element.isExpanded('1')).toBe(true);

    element.collapseItemById('1');
    await element.updateComplete;
    expect(element.isExpanded('1')).toBe(false);
  });

  it('should expand and collapse all items via public API methods', async () => {
    element.closeOthers = false;
    await element.updateComplete;

    element.expandAll();
    await element.updateComplete;
    expect(element.isExpanded('1')).toBe(true);
    expect(element.isExpanded('2')).toBe(true);
    expect(element.isExpanded('3')).toBe(false);

    element.collapseAll();
    await element.updateComplete;
    expect(element.isExpanded('1')).toBe(false);
    expect(element.isExpanded('2')).toBe(false);
  });

  it('should emit toggled, expanded and collapsed events', async () => {
    const itemExpandedSpy = jest.fn();
    const itemCollapsedSpy = jest.fn();
    const itemToggledSpy = jest.fn();

    element.addEventListener('itemExpanded', itemExpandedSpy);
    element.addEventListener('itemCollapsed', itemCollapsedSpy);
    element.addEventListener('itemToggled', itemToggledSpy);

    const firstHeader = element.shadowRoot?.querySelector(
      '#accordion-header-1',
    ) as HTMLButtonElement;

    firstHeader.click();
    await element.updateComplete;

    expect(itemExpandedSpy).toHaveBeenCalledTimes(1);
    expect(itemExpandedSpy.mock.calls[0][0].detail).toEqual(mockItems[0]);
    expect(itemToggledSpy).toHaveBeenCalledTimes(1);

    firstHeader.click();
    await element.updateComplete;

    expect(itemCollapsedSpy).toHaveBeenCalledTimes(1);
    expect(itemCollapsedSpy.mock.calls[0][0].detail).toEqual(mockItems[0]);
    expect(itemToggledSpy).toHaveBeenCalledTimes(2);
  });

  it('should apply transition classes matching the transition property', async () => {
    const accordion = element.shadowRoot?.querySelector('.dcx-accordion');

    element.transition = 'fast';
    await element.updateComplete;
    expect(
      accordion?.classList.contains('dcx-accordion--transition-fast'),
    ).toBe(true);

    element.transition = 'none';
    await element.updateComplete;
    expect(
      accordion?.classList.contains('dcx-accordion--transition-none'),
    ).toBe(true);
  });

  it('should apply flush variant class', async () => {
    const accordion = element.shadowRoot?.querySelector('.dcx-accordion');
    expect(accordion?.classList.contains('dcx-accordion--flush')).toBe(false);

    element.variant = 'flush';
    await element.updateComplete;
    expect(accordion?.classList.contains('dcx-accordion--flush')).toBe(true);
  });

  it('should handle keyboard navigation correctly', async () => {
    const firstHeader = element.shadowRoot?.querySelector(
      '#accordion-header-1',
    ) as HTMLButtonElement;
    const secondHeader = element.shadowRoot?.querySelector(
      '#accordion-header-2',
    ) as HTMLButtonElement;

    firstHeader.focus();
    expect(element.shadowRoot?.activeElement).toBe(firstHeader);

    firstHeader.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }),
    );
    expect(element.shadowRoot?.activeElement).toBe(secondHeader);

    secondHeader.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }),
    );
    expect(element.shadowRoot?.activeElement).toBe(firstHeader);

    firstHeader.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'End', bubbles: true }),
    );
    expect(element.shadowRoot?.activeElement).toBe(secondHeader);

    secondHeader.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', bubbles: true }),
    );
    expect(element.shadowRoot?.activeElement).toBe(firstHeader);
  });

  it('should render contentTemplate if provided', async () => {
    element.items = [
      {
        id: '1',
        title: 'Template Title',
        contentTemplate: () =>
          html`<span class="custom-template">Custom Templated Content</span>`,
      },
    ];
    await element.updateComplete;

    const templateSpan = element.shadowRoot?.querySelector('.custom-template');
    expect(templateSpan?.textContent).toBe('Custom Templated Content');
  });
});

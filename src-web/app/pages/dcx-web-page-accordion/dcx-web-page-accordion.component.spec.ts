import './dcx-web-page-accordion.component';
import { DcxWebPageAccordion } from './dcx-web-page-accordion.component';
import { DcxWebAccordion } from '../../../../libs/dcx-web-lib/src';

describe('DcxWebPageAccordion', () => {
  let element: DcxWebPageAccordion;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-accordion',
    ) as DcxWebPageAccordion;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(DcxWebPageAccordion);
  });

  it('should render page header, title and description', () => {
    const title = element.shadowRoot?.querySelector('.demo-page-header__title');
    expect(title?.textContent?.trim()).toBe('Accordion');

    const desc = element.shadowRoot?.querySelector('.demo-page-header__desc');
    expect(desc?.textContent).toContain('Panel de contenido expandible');
  });

  it('should render the accordion components in demo sections', () => {
    const accordions =
      element.shadowRoot?.querySelectorAll('dcx-web-accordion');
    expect(accordions?.length).toBe(12);
  });

  it('should handle external control buttons correctly', async () => {
    const externalAccordion = element.shadowRoot?.querySelector(
      '#external-accordion',
    ) as DcxWebAccordion;
    expect(externalAccordion).toBeTruthy();
    await externalAccordion.updateComplete;

    expect(externalAccordion.isExpanded('1')).toBe(false);

    const apiButtons = Array.from(
      element.shadowRoot?.querySelectorAll('.api-btn') || [],
    ) as HTMLButtonElement[];
    const firstItemBtn = apiButtons.find(btn =>
      btn.textContent?.includes('Abrir:'),
    );
    expect(firstItemBtn).toBeTruthy();

    firstItemBtn?.click();
    await element.updateComplete;
    await externalAccordion.updateComplete;

    expect(externalAccordion.isExpanded('1')).toBe(true);
    expect(firstItemBtn?.textContent?.trim()).toContain('Cerrar:');

    firstItemBtn?.click();
    await element.updateComplete;
    await externalAccordion.updateComplete;

    expect(externalAccordion.isExpanded('1')).toBe(false);
    expect(firstItemBtn?.textContent?.trim()).toContain('Abrir:');
  });

  it('should handle expand all and collapse all buttons correctly', async () => {
    const expandAllAccordion = element.shadowRoot?.querySelector(
      '#expand-all-accordion',
    ) as DcxWebAccordion;
    expect(expandAllAccordion).toBeTruthy();
    await expandAllAccordion.updateComplete;

    const apiButtons = Array.from(
      element.shadowRoot?.querySelectorAll('.api-btn') || [],
    ) as HTMLButtonElement[];
    const expandAllBtn = apiButtons.find(btn =>
      btn.textContent?.includes('Expandir todo'),
    );
    const collapseAllBtn = apiButtons.find(btn =>
      btn.textContent?.includes('Colapsar todo'),
    );

    expect(expandAllBtn).toBeTruthy();
    expect(collapseAllBtn).toBeTruthy();

    expandAllBtn?.click();
    await element.updateComplete;
    await expandAllAccordion.updateComplete;

    expect(expandAllAccordion.isExpanded('1')).toBe(true);
    expect(expandAllAccordion.isExpanded('2')).toBe(true);

    collapseAllBtn?.click();
    await element.updateComplete;
    await expandAllAccordion.updateComplete;

    expect(expandAllAccordion.isExpanded('1')).toBe(false);
    expect(expandAllAccordion.isExpanded('2')).toBe(false);
  });

  it('should add and remove items dynamically in list template', async () => {
    const accordions = Array.from(
      element.shadowRoot?.querySelectorAll('dcx-web-accordion') || [],
    ) as DcxWebAccordion[];
    const listAccordion = accordions[accordions.length - 1];
    expect(listAccordion).toBeTruthy();

    listAccordion.expandItemById('3');
    await listAccordion.updateComplete;

    let listItems = listAccordion.shadowRoot?.querySelectorAll('li');
    expect(listItems?.length).toBe(3);

    const addBtn = listAccordion.shadowRoot?.querySelector(
      'button',
    ) as HTMLButtonElement;
    const buttons = Array.from(
      listAccordion.shadowRoot?.querySelectorAll('button') || [],
    ) as HTMLButtonElement[];
    const addListItemBtn = buttons.find(btn =>
      btn.textContent?.includes('Añadir'),
    );
    const removeListItemBtn = buttons.find(btn =>
      btn.textContent?.includes('Eliminar último'),
    );

    expect(addListItemBtn).toBeTruthy();
    expect(removeListItemBtn).toBeTruthy();

    addListItemBtn?.click();
    await element.updateComplete;
    await listAccordion.updateComplete;

    listItems = listAccordion.shadowRoot?.querySelectorAll('li');
    expect(listItems?.length).toBe(4);
    expect(listItems?.[3].textContent).toBe('Item 4');

    removeListItemBtn?.click();
    await element.updateComplete;
    await listAccordion.updateComplete;

    listItems = listAccordion.shadowRoot?.querySelectorAll('li');
    expect(listItems?.length).toBe(3);
  });
});

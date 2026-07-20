
import './dcx-web-page-select.component';

import { DcxWebPageSelect } from './dcx-web-page-select.component';

describe('DcxWebPageSelect', () => {
  let element: DcxWebPageSelect;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-page-select',
    ) as DcxWebPageSelect;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render page title', () => {
    const title =
      element.shadowRoot?.querySelector(
        '.demo-page-header__title',
      );

    expect(title?.textContent).toContain(
      'Select',
    );
  });

  it('should render page description', () => {
    const desc =
      element.shadowRoot?.querySelector(
        '.demo-page-header__desc',
      );

    expect(desc?.textContent).toContain(
      'Combobox accesible',
    );
  });

  it('should render all demo sections', () => {
    const sections =
      element.shadowRoot?.querySelectorAll(
        '.demo-section',
      );

    expect(sections?.length).toBe(10);
  });

  it('should render all select demos', () => {
    const selects =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-select',
      );

    expect(selects?.length).toBe(14);
  });

  it('should render searchable example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Con búsqueda');
  });

  it('should render clearable example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Con búsqueda y clearable',
    );
  });

  it('should render disabled example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Deshabilitado');
  });

  it('should render required example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Requerido');
  });

  it('should render invalid example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Inválido');
  });

  it('should render preselected value example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Con valor preseleccionado',
    );
  });

  it('should render empty options example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain(
      'Sin opciones',
    );
  });

  it('should render sizes example', () => {
    expect(
      element.shadowRoot?.textContent,
    ).toContain('Tamaños');
  });

  it('should render size variants', () => {
    const selects =
      element.shadowRoot?.querySelectorAll(
        'dcx-web-select[spacing]',
      );

    expect(selects?.length).toBe(5);
  });
});
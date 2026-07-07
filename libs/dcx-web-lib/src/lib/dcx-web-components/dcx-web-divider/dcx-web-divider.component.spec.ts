import './dcx-web-divider.component';
import { DcxWebDivider } from './dcx-web-divider.component';

describe('DcxWebDivider', () => {
  let element: DcxWebDivider;

  beforeEach(async () => {
    element = document.createElement('dcx-web-divider') as DcxWebDivider;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebDivider);
  });

  it('should render plain span by default', () => {
    const span = element.shadowRoot?.querySelector('span.dcx-divider');
    expect(span).toBeTruthy();
  });

  it('should render labeled template when label provided', async () => {
    element.label = 'Section';
    await element.updateComplete;

    const labeled = element.shadowRoot?.querySelector('.dcx-divider--labeled');
    expect(labeled).toBeTruthy();
    expect(labeled?.textContent?.trim()).toContain('Section');
  });

  it('should render 2 lines when labeled', async () => {
    element.label = 'OR';
    await element.updateComplete;

    const lines = element.shadowRoot?.querySelectorAll('.dcx-divider__line');
    expect(lines?.length).toBe(2);
  });

  it('should default aria-orientation to horizontal', () => {
    const span = element.shadowRoot?.querySelector('span');
    expect(span?.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should update orientation to vertical', async () => {
    element.orientation = 'vertical';
    await element.updateComplete;

    const span = element.shadowRoot?.querySelector('span');
    expect(span?.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should compute aria-label from label', async () => {
    element.label = 'Section';
    await element.updateComplete;

    const div = element.shadowRoot?.querySelector('div');
    expect(div?.getAttribute('aria-label')).toBe('Section');
  });

  it('should use ariaLabelAttr over label', async () => {
    element.label = 'Section';
    element.ariaLabelAttr = 'Custom';
    await element.updateComplete;

    const div = element.shadowRoot?.querySelector('div');
    expect(div?.getAttribute('aria-label')).toBe('Custom');
  });

  it('should not expose aria-label when aria-hidden', async () => {
    await element.updateComplete;

    const span = element.shadowRoot?.querySelector('span');
    expect(span?.getAttribute('aria-label')).toBe('');
    expect(span?.getAttribute('aria-hidden')).toBe('true');
  });

  it('should have horizontal class by default', () => {
    expect(element.classList.contains('horizontal')).toBeTruthy();
  });

  it('should switch to vertical class', async () => {
    element.orientation = 'vertical';
    await element.updateComplete;

    expect(element.classList.contains('vertical')).toBeTruthy();
  });

  it('should add has-label class', async () => {
    element.label = 'Test';
    await element.updateComplete;

    expect(element.classList.contains('has-label')).toBeTruthy();
  });

  it('should set thickness variable', async () => {
    element.thickness = 0.5;
    await element.updateComplete;

    expect(element.style.getPropertyValue('--_dcx-divider-thickness')).toBe('0.5rem');
  });

  it('should map size correctly', async () => {
    element.size = 's';
    await element.updateComplete;

    expect(element.style.getPropertyValue('--_dcx-divider-size')).toBe('5rem');
  });

  it('should map type to border style', async () => {
    element.type = 'dot';
    await element.updateComplete;

    expect(element.style.getPropertyValue('--_dcx-divider-style')).toBe('dotted');
  });
});
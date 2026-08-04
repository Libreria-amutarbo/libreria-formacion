import './dcx-web-editor.component';
import { DcxWebEditor } from './dcx-web-editor.component';

describe('DcxWebEditor', () => {
  let element: DcxWebEditor;

  const getContent = () =>
    element.shadowRoot?.querySelector<HTMLElement>('.dcx-editor__content');
  const getToolbarButtons = () =>
    element.shadowRoot?.querySelectorAll('.dcx-editor__toolbar dcx-web-button') ??
    [];

  beforeEach(async () => {
    element = document.createElement('dcx-web-editor') as DcxWebEditor;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebEditor);
  });

  it('should have default values', () => {
    expect(element.value).toBe('');
    expect(element.disabled).toBe(false);
    expect(element.readonly).toBe(false);
    expect(element.required).toBe(false);
    expect(element.isInvalid).toBe(false);
    expect(element.minHeight).toBe('160px');
  });

  it('should generate a unique id per instance when not provided', () => {
    const other = document.createElement('dcx-web-editor') as DcxWebEditor;
    expect(element.id).not.toBe(other.id);
    expect(element.id).toMatch(/^dcx-editor-/);
  });

  it('should render all default toolbar actions', () => {
    expect(getToolbarButtons().length).toBe(6);
  });

  it('should only render the requested toolbar actions', async () => {
    element.toolbarActions = ['bold', 'italic'];
    await element.updateComplete;
    expect(getToolbarButtons().length).toBe(2);
  });

  it('should render the label and required marker', async () => {
    element.label = 'Descripción';
    element.required = true;
    await element.updateComplete;

    const label = element.shadowRoot?.querySelector('.dcx-editor__label');
    expect(label?.textContent).toContain('Descripción');
    expect(
      element.shadowRoot?.querySelector('.dcx-editor__required'),
    ).not.toBeNull();
  });

  it('should render the error message only when invalid', async () => {
    element.errorMessage = 'Campo obligatorio';
    await element.updateComplete;
    expect(element.shadowRoot?.querySelector('.dcx-editor__error')).toBeNull();

    element.isInvalid = true;
    await element.updateComplete;
    const error = element.shadowRoot?.querySelector('.dcx-editor__error');
    expect(error?.textContent).toContain('Campo obligatorio');
  });

  it('should be contenteditable when enabled and not editable when disabled', async () => {
    expect(getContent()?.getAttribute('contenteditable')).toBe('true');

    element.disabled = true;
    await element.updateComplete;
    expect(getContent()?.getAttribute('contenteditable')).toBe('false');
  });

  it('should render the initial value into the editable area', async () => {
    element.value = '<strong>Hola</strong>';
    await element.updateComplete;
    expect(getContent()?.innerHTML).toContain('<strong>Hola</strong>');
  });

  it('should sanitize dangerous markup when rendering the value', async () => {
    element.value = '<strong>ok</strong><script>alert(1)</script>';
    await element.updateComplete;
    const html = getContent()?.innerHTML ?? '';
    expect(html).toContain('<strong>ok</strong>');
    expect(html).not.toContain('<script>');
  });

  it('should strip inline event handlers when rendering the value', async () => {
    element.value = '<strong onclick="alert(1)">x</strong>';
    await element.updateComplete;
    const html = getContent()?.innerHTML ?? '';
    expect(html).toContain('<strong>x</strong>');
    expect(html.toLowerCase()).not.toContain('onclick');
  });

  it('should expose the requested toolbar items', () => {
    expect(element.toolbarItems.map(i => i.action)).toEqual([
      'bold',
      'italic',
      'underline',
      'orderedList',
      'unorderedList',
      'removeFormat',
    ]);
  });

  it('should report active toolbar actions', () => {
    expect(element.isToolbarActionActive('bold')).toBe(false);
    element.activeToolbarActions = new Set(['bold']);
    expect(element.isToolbarActionActive('bold')).toBe(true);
  });

  it('should emit focusEvent on focus and blurEvent on blur', () => {
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    element.addEventListener('focusEvent', onFocus);
    element.addEventListener('blurEvent', onBlur);

    element.onFocus();
    element.onBlur();

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should build describedBy from ariaDescribedBy and the error id when invalid', () => {
    element.ariaDescribedBy = 'hint-1';
    element.isInvalid = false;
    expect(element.describedBy).toBe('hint-1');

    element.isInvalid = true;
    expect(element.describedBy).toBe(`hint-1 ${element.errorId}`);
  });
});

import './dcx-web-textarea.component';

import { DcxWebTextarea } from './dcx-web-textarea.component';

describe('DcxWebTextarea', () => {
  let element: DcxWebTextarea;

  beforeEach(async () => {
    element = document.createElement('dcx-web-textarea') as DcxWebTextarea;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebTextarea);
  });

  it('should render textarea', () => {
    expect(element.shadowRoot?.querySelector('textarea')).toBeTruthy();
  });

  it('should emit valueChange', async () => {
    const spy = jest.fn();

    element.addEventListener('valueChange', spy);

    const textarea = element.shadowRoot?.querySelector(
      'textarea',
    ) as HTMLTextAreaElement;

    textarea.value = 'texto';

    textarea.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalled();
  });

  it('should render label', async () => {
    element.label = 'Comentarios';

    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector('.dcx-textarea__label'),
    ).toBeTruthy();
  });

  it('should render required indicator', async () => {
    element.label = 'Notas';
    element.required = true;

    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector('.dcx-textarea__required'),
    ).toBeTruthy();
  });

  it('should render error', async () => {
    element.invalid = true;
    element.errorMessage = 'Error';

    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector('.dcx-textarea__error'),
    ).toBeTruthy();
  });

  it('should render hint', async () => {
    element.hint = 'Ayuda';

    await element.updateComplete;

    expect(
      element.shadowRoot?.querySelector('.dcx-textarea__hint'),
    ).toBeTruthy();
  });

  it('should apply invalid class', async () => {
    element.invalid = true;

    await element.updateComplete;

    const textarea = element.shadowRoot?.querySelector('textarea');

    expect(textarea?.classList.contains('dcx-textarea__control--invalid')).toBe(
      true,
    );
  });

  it('should generate accessibility ids', () => {
    expect(element.errorId).toContain('error');

    expect(element.hintId).toContain('hint');
  });

  it('should toggle focused state', () => {
    element.onFocus();

    expect(element.focused).toBe(true);

    element.onBlur();

    expect(element.focused).toBe(false);
  });

  it('should compute resize none when autoresize', () => {
    element.autoResize = true;

    expect(element.computedResize).toBe('none');
  });
});

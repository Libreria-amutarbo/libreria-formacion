import './dcx-web-radio.component';
import { DcxWebRadio } from './dcx-web-radio.component';
import { RADIO_MOCK_OPTIONS } from '../../core/fixtures';

describe('DcxWebRadio', () => {
  let element: DcxWebRadio;

  beforeEach(async () => {
    element = document.createElement('dcx-web-radio') as DcxWebRadio;
    document.body.appendChild(element);
    element.options = RADIO_MOCK_OPTIONS;
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebRadio);
  });

  it('should have default values', () => {
    expect(element.disabled).toBe(false);
    expect(element.size).toBe('l');
    expect(element.ariaLabel).toBe('');
    expect(element.label).toBe('');
  });

  it('should generate a unique name per instance when not provided', () => {
    const element2 = document.createElement('dcx-web-radio') as DcxWebRadio;
    expect(element.name).not.toBe(element2.name);
  });

  it('should render a fieldset with a legend matching label', async () => {
    element.label = 'Elige una opción';
    await element.updateComplete;
    const legend = element.shadowRoot?.querySelector('.dcx-radio-group__legend');
    expect(legend?.textContent?.trim()).toBe('Elige una opción');
  });

  it('should render one native radio input per option, sharing the group name', () => {
    const inputs = element.shadowRoot?.querySelectorAll('input[type=radio]');
    expect(inputs?.length).toBe(3);
    const names = new Set(Array.from(inputs || []).map(i => (i as HTMLInputElement).name));
    expect(names.size).toBe(1);
    expect(names.has(element.name)).toBe(true);
  });

  it('should render each option label', () => {
    const labels = element.shadowRoot?.querySelectorAll('.dcx-radio__label');
    expect(labels?.[0]?.textContent?.trim()).toContain('Opción A');
    expect(labels?.[1]?.textContent?.trim()).toContain('Opción B');
    expect(labels?.[2]?.textContent?.trim()).toContain('Opción C');
  });

  it('should apply the size class to each option', async () => {
    element.size = 's';
    await element.updateComplete;
    const label = element.shadowRoot?.querySelector('label');
    expect(label?.className).toContain('dcx-radio--s');
  });

  it('should apply the error class to all options when error is true', async () => {
    element.error = true;
    await element.updateComplete;
    const labels = element.shadowRoot?.querySelectorAll('label');
    labels?.forEach((label: Element) => {
      expect(label.className).toContain('dcx-radio--error');
    });
  });

  it('should mark an option as checked via value setting', async () => {
    element.value = 'b';
    await element.updateComplete;
    expect(element.isChecked('b')).toBe(true);
    expect(element.isChecked('a')).toBe(false);

    const inputB = element.shadowRoot?.querySelector('input[value=b]') as HTMLInputElement;
    expect(inputB.checked).toBe(true);
  });

  it('should update the selected value via onOptionChange', () => {
    element.onOptionChange(RADIO_MOCK_OPTIONS[0]);
    expect(element.isChecked('a')).toBe(true);
  });

  it('should not select a disabled option', () => {
    element.onOptionChange(RADIO_MOCK_OPTIONS[2]);
    expect(element.isChecked('c')).toBe(false);
  });

  it('should disable all options when the group disabled input is true', async () => {
    element.disabled = true;
    await element.updateComplete;
    const inputs = element.shadowRoot?.querySelectorAll('input[type=radio]');
    inputs?.forEach(input => expect((input as HTMLInputElement).disabled).toBe(true));
  });

  it('should mark only the third option as natively disabled per-option', () => {
    const inputs = element.shadowRoot?.querySelectorAll('input[type=radio]');
    expect((inputs?.[0] as HTMLInputElement).disabled).toBe(false);
    expect((inputs?.[1] as HTMLInputElement).disabled).toBe(false);
    expect((inputs?.[2] as HTMLInputElement).disabled).toBe(true);
  });

  it('should emit valueChange and change events correctly when option is changed', () => {
    const changeSpy = jest.fn();
    const valueChangeSpy = jest.fn();

    element.addEventListener('change', changeSpy);
    element.addEventListener('valueChange', valueChangeSpy);

    element.onOptionChange(RADIO_MOCK_OPTIONS[1]);

    expect(valueChangeSpy).toHaveBeenCalled();
    const eventDetail = (valueChangeSpy.mock.calls[0][0] as CustomEvent).detail;
    expect(eventDetail).toBe('b');
    expect(changeSpy).toHaveBeenCalled();
  });

  it('should emit blurEvent on blur', () => {
    const spy = jest.fn();
    element.addEventListener('blurEvent', spy);
    element.onBlur();
    expect(spy).toHaveBeenCalled();
  });

  describe('hint and error (WCAG)', () => {
    it('should show the hint when set and there is no error', async () => {
      element.hint = 'Selecciona una opción';
      await element.updateComplete;
      const hint = element.shadowRoot?.querySelector('.dcx-radio-group__hint');
      expect(hint).toBeTruthy();
    });

    it('should hide the hint when an error is shown', async () => {
      element.hint = 'Ayuda';
      element.error = true;
      element.errorMessage = 'Campo obligatorio';
      await element.updateComplete;
      const hint = element.shadowRoot?.querySelector('.dcx-radio-group__hint');
      expect(hint).toBeFalsy();
    });

    it('should show the error message with role="alert"', async () => {
      element.error = true;
      element.errorMessage = 'Campo obligatorio';
      await element.updateComplete;
      const error = element.shadowRoot?.querySelector('.dcx-radio-group__error');
      expect(error?.getAttribute('role')).toBe('alert');
      expect(error?.textContent?.trim()).toContain('Campo obligatorio');
    });

    it('should set aria-describedby on the fieldset pointing to the error id', async () => {
      element.error = true;
      element.errorMessage = 'Campo obligatorio';
      await element.updateComplete;
      const fieldset = element.shadowRoot?.querySelector('fieldset');
      const error = element.shadowRoot?.querySelector('.dcx-radio-group__error');
      expect(fieldset?.getAttribute('aria-describedby')).toBe(error?.id);
    });
  });

  describe('accessible name (WCAG)', () => {
    it('should set aria-label on the fieldset when there is no visible label', async () => {
      element.ariaLabel = 'Grupo sin label visible';
      await element.updateComplete;
      const fieldset = element.shadowRoot?.querySelector('fieldset');
      expect(fieldset?.getAttribute('aria-label')).toBe('Grupo sin label visible');
    });

    it('should not set aria-label when a visible label is present', async () => {
      element.label = 'Elige una opción';
      element.ariaLabel = 'Ignorado';
      await element.updateComplete;
      const fieldset = element.shadowRoot?.querySelector('fieldset');
      expect(fieldset?.getAttribute('aria-label')).toBeNull();
    });
  });
});

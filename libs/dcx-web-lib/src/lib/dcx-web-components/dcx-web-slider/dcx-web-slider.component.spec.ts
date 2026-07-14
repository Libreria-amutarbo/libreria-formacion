import './dcx-web-slider.component';
import { DcxWebSlider } from './dcx-web-slider.component';
import { SLIDER_DEFAULT_VALUES } from '../../core/defaults/slider';

describe('DcxWebSlider', () => {
  let element: DcxWebSlider;

  beforeEach(async () => {
    element = document.createElement('dcx-web-slider') as DcxWebSlider;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebSlider);
  });

  describe('Default Properties', () => {
    it('should have default properties', () => {
      expect(element.showLabel).toBe(SLIDER_DEFAULT_VALUES.showLabel);
      expect(element.textLabel).toBe(SLIDER_DEFAULT_VALUES.textLabel);
      expect(element.value).toBe(SLIDER_DEFAULT_VALUES.value);
      expect(element.min).toBe(SLIDER_DEFAULT_VALUES.min);
      expect(element.max).toBe(SLIDER_DEFAULT_VALUES.max);
      expect(element.step).toBe(SLIDER_DEFAULT_VALUES.step);
      expect(element.vertical).toBe(SLIDER_DEFAULT_VALUES.vertical);
      expect(element.disabled).toBe(SLIDER_DEFAULT_VALUES.disabled);
      expect(element.valueSuffix).toBe(SLIDER_DEFAULT_VALUES.valueSuffix);
    });
  });

  describe('Rendering & Display', () => {
    it('should render label when showLabel is true', async () => {
      element.showLabel = true;
      element.textLabel = 'Volumen';
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.dcx-slider__label');
      expect(label).toBeTruthy();
      expect(label?.textContent?.trim()).toBe('Volumen');
    });

    it('should not render label when showLabel is false', async () => {
      element.showLabel = false;
      await element.updateComplete;

      const label = element.shadowRoot?.querySelector('.dcx-slider__label');
      expect(label).toBeNull();
    });

    it('should render displayValue with suffix', async () => {
      element.value = 25;
      element.valueSuffix = '%';
      await element.updateComplete;

      const valueText = element.shadowRoot?.querySelector('.dcx-slider__value');
      expect(valueText?.textContent?.trim()).toBe('25%');
    });
  });

  describe('Value Sincronization & Clamping', () => {
    it('should clamp value within min and max', async () => {
      element.min = 10;
      element.max = 30;
      element.value = 50;
      await element.updateComplete;
      expect(element.valueInput).toBe(30);

      element.value = 5;
      await element.updateComplete;
      expect(element.valueInput).toBe(10);
    });
  });

  describe('Orientation & CSS properties', () => {
    it('should toggle dcx-slider--vertical class on vertical true', async () => {
      element.vertical = true;
      await element.updateComplete;
      expect(element.classList.contains('dcx-slider--vertical')).toBe(true);

      element.vertical = false;
      await element.updateComplete;
      expect(element.classList.contains('dcx-slider--vertical')).toBe(false);
    });

    it('should compute progressPercent correctly', async () => {
      element.min = 0;
      element.max = 100;
      element.value = 40;
      await element.updateComplete;
      expect(element.progressPercent).toBe(40);
    });
  });

  describe('Events', () => {
    it('should dispatch valueChange event when input fires', async () => {
      const spy = jest.fn();
      element.addEventListener('valueChange', spy);

      const input = element.shadowRoot?.querySelector('dcx-web-input');
      expect(input).toBeTruthy();

      input?.dispatchEvent(
        new CustomEvent('valueChange', {
          detail: 15,
          bubbles: true,
          composed: true,
        }),
      );

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe(15);
      expect(element.value).toBe(15);
    });
  });
});

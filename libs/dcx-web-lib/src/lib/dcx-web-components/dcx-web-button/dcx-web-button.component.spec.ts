import './dcx-web-button.component';
import { DcxWebButton } from './dcx-web-button.component';

describe('DcxWebButton', () => {
  let element: DcxWebButton;

  beforeEach(async () => {
    element = document.createElement('dcx-web-button') as DcxWebButton;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebButton);
  });

  it('should render the default values correctly', () => {
    const button = element.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('dcx-button--primary')).toBeTruthy();
    expect(button?.classList.contains('dcx-button--m')).toBeTruthy();
    expect(button?.getAttribute('type')).toBe('button');
    expect(button?.disabled).toBeFalsy();
  });

  it('should render the label when provided', async () => {
    element.label = 'Click me';
    await element.updateComplete;
    const labelSpan = element.shadowRoot?.querySelector('.label');
    expect(labelSpan?.textContent).toBe('Click me');
  });

  it('should handle disabled state', async () => {
    element.disabled = true;
    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');
    expect(button?.disabled).toBeTruthy();
  });

  it('should emit buttonClick event when clicked', async () => {
    const spy = jest.fn();
    element.addEventListener('buttonClick', spy as EventListener);
    
    const button = element.shadowRoot?.querySelector('button');
    button?.click();
    
    expect(spy).toHaveBeenCalled();
    const event = spy.mock.calls[0][0] as CustomEvent;
    expect(event.detail).toEqual({ clicked: true });
  });

  it('should not emit buttonClick event when disabled', async () => {
    const spy = jest.fn();
    element.addEventListener('buttonClick', spy as EventListener);
    element.disabled = true;
    await element.updateComplete;
    
    const button = element.shadowRoot?.querySelector('button');
    button?.click();
    
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render icon when icon property is true', async () => {
    element.icon = true;
    element.iconName = 'check';
    await element.updateComplete;
    const iconSpan = element.shadowRoot?.querySelector('.icon') as HTMLElement;
    expect(iconSpan).toBeTruthy();
    expect(iconSpan.style.maskImage || iconSpan.style.webkitMaskImage).toContain(
      'check.svg'
    );
  });

  it('should apply variant classes correctly', async () => {
    element.variant = 'danger';
    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('dcx-button--danger')).toBeTruthy();
  });

  it('should handle checkbox mode', async () => {
    element.isCheckbox = true;
    element.ariaChecked = 'true';
    await element.updateComplete;
    const button = element.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('role')).toBe('checkbox');
    expect(button?.getAttribute('aria-checked')).toBe('true');
    expect(button?.classList.contains('dcx-button--checkbox')).toBeTruthy();
  });
});

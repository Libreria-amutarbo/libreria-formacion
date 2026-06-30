import './dcx-web-checkbox.component';
import { DcxWebCheckbox } from './dcx-web-checkbox.component';
import type { DcxCheckbox } from '../../core/interfaces/checkbox';

describe('DcxWebCheckbox', () => {
  let element: DcxWebCheckbox;

  const mockOptions: DcxCheckbox[] = [
    { id: 'cb1', label: 'Option 1', value: true },
    { id: 'cb2', label: 'Option 2', value: false },
    { id: 'cb3', label: 'Option 3', value: null },
    {
      id: 'cb4',
      label: 'Option 4',
      value: true,
      error: true,
      errorMessage: 'Error message',
    },
  ];

  beforeEach(async () => {
    element = document.createElement('dcx-web-checkbox') as DcxWebCheckbox;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebCheckbox);
  });

  it('should render empty by default', () => {
    const labels = element.shadowRoot?.querySelectorAll('.dcx-checkbox-label');
    expect(labels?.length).toBe(0);
  });

  it('should render options correctly', async () => {
    element.options = mockOptions;
    await element.updateComplete;

    const labels = element.shadowRoot?.querySelectorAll('.dcx-checkbox-label');
    expect(labels?.length).toBe(4);
  });

  it('should compute aria-checked correctly', async () => {
    element.options = mockOptions;
    await element.updateComplete;

    const checkboxes = element.shadowRoot?.querySelectorAll('[role="checkbox"]');

    expect(checkboxes?.[0].getAttribute('aria-checked')).toBe('true');
    expect(checkboxes?.[1].getAttribute('aria-checked')).toBe('mixed');
    expect(checkboxes?.[2].getAttribute('aria-checked')).toBe('false');
  });

  it('should emit changeOptions event', async () => {
    element.options = mockOptions;
    await element.updateComplete;

    const spy = jest.fn();
    element.addEventListener('changeOptions', spy);

    const checkbox = element.shadowRoot?.querySelector('[role="checkbox"]') as HTMLElement;
    checkbox.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should update value when clicked (emitted event)', async () => {
    element.options = mockOptions;
    await element.updateComplete;

    const checkbox = element.shadowRoot?.querySelector('[role="checkbox"]') as HTMLElement;

    let emitted: DcxCheckbox[] | undefined;

    element.addEventListener('changeOptions', (e: Event) => {
      const customEvent = e as CustomEvent<DcxCheckbox[]>;
      emitted = customEvent.detail;
    });

    checkbox.click();
    await element.updateComplete;

    expect(emitted).toBeDefined();
    expect(emitted![0].value).toBe(false);
  });

  it('should render error message', async () => {
    element.options = mockOptions;
    await element.updateComplete;

    const error = element.shadowRoot?.querySelector('#checkbox-error-cb4');

    expect(error).toBeTruthy();
    expect(error?.textContent).toContain('Error message');
  });
});

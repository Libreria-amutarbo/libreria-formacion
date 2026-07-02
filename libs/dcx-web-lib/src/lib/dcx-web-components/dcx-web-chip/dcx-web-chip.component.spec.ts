import './dcx-web-chip.component';
import { DcxWebChip } from './dcx-web-chip.component';

describe('DcxWebChip', () => {
  let element: DcxWebChip;

  beforeEach(async () => {
    element = document.createElement('dcx-web-chip') as DcxWebChip;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebChip);
  });

  it('should render the default chip label and classes', async () => {
    element.label = 'Test chip';
    await element.updateComplete;

    const chip = element.shadowRoot?.querySelector('.dcx-chip');
    const label = element.shadowRoot?.querySelector('.dcx-chip__label');

    expect(chip).toBeTruthy();
    expect(chip?.classList.contains('dcx-chip--primary')).toBeTruthy();
    expect(label?.textContent).toBe('Test chip');
  });

  it('should render icon when icon property is provided', async () => {
    element.icon = 'star';
    await element.updateComplete;

    const icon = element.shadowRoot?.querySelector('.dcx-chip__icon');
    expect(icon).toBeTruthy();
    expect(icon?.querySelector('svg')).toBeTruthy();
  });

  it('should render image when image property is provided', async () => {
    element.image = 'avatar.jpg';
    element.label = 'Avatar';
    await element.updateComplete;

    const img = element.shadowRoot?.querySelector('.dcx-chip__image') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('avatar.jpg');
    expect(img.alt).toBe('Avatar');
  });

  it('should show remove button when removable is true', async () => {
    element.removable = true;
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('.dcx-chip__remove-button');
    expect(button).toBeTruthy();
  });

  it('should show remove button when variant is filter', async () => {
    element.variant = 'filter';
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector('.dcx-chip__remove-button');
    expect(button).toBeTruthy();
  });

  it('should not show remove button when not removable and variant is choice', async () => {
    const button = element.shadowRoot?.querySelector('.dcx-chip__remove-button');
    expect(button).toBeNull();
  });

  it('should dispatch dcx-chip-remove event when remove button is clicked', async () => {
    element.removable = true;
    await element.updateComplete;

    const removeSpy = jest.fn();
    element.addEventListener('dcx-chip-remove', removeSpy);

    const button = element.shadowRoot?.querySelector('.dcx-chip__remove-button') as HTMLButtonElement;
    button.click();

    expect(removeSpy).toHaveBeenCalledTimes(1);
  });
});
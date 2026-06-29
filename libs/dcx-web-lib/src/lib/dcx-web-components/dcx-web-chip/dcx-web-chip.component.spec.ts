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

  it('should render the default chip with primary color class', async () => {
    element.label = 'Test chip';
    await element.updateComplete;

    const chip = element.shadowRoot?.querySelector('.dcx-chip');
    const label = element.shadowRoot?.querySelector('.dcx-chip__label');

    expect(chip).toBeTruthy();
    expect(chip?.classList.contains('dcx-chip--primary')).toBeTruthy();
    expect(label?.textContent?.trim()).toBe('Test chip');
  });

  it('should apply the correct color class', async () => {
    element.label = 'Chip';
    element.color = 'error';
    await element.updateComplete;

    const chip = element.shadowRoot?.querySelector('.dcx-chip');
    expect(chip?.classList.contains('dcx-chip--error')).toBeTruthy();
    expect(chip?.classList.contains('dcx-chip--primary')).toBeFalsy();
  });

  it('should render icon container when icon property is provided', async () => {
    element.icon = 'star';
    await element.updateComplete;

    const iconWrapper = element.shadowRoot?.querySelector('.dcx-chip__icon');
    expect(iconWrapper).toBeTruthy();
    expect(iconWrapper?.querySelector('svg')).toBeTruthy();
  });

  it('should not render icon container when icon is not provided', async () => {
    element.label = 'No icon';
    await element.updateComplete;

    const iconWrapper = element.shadowRoot?.querySelector('.dcx-chip__icon');
    expect(iconWrapper).toBeNull();
  });

  it('should render image when image property is provided', async () => {
    element.image = 'avatar.jpg';
    element.label = 'Avatar';
    await element.updateComplete;

    const img = element.shadowRoot?.querySelector(
      '.dcx-chip__image',
    ) as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('avatar.jpg');
    expect(img.alt).toBe('Avatar');
  });

  it('should use default alt text when label is empty and image is provided', async () => {
    element.image = 'avatar.jpg';
    await element.updateComplete;

    const img = element.shadowRoot?.querySelector(
      '.dcx-chip__image',
    ) as HTMLImageElement;
    expect(img.alt).toBe('Chip image');
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

  it('should not show remove button when not removable and variant is choice', () => {
    const button = element.shadowRoot?.querySelector('.dcx-chip__remove-button');
    expect(button).toBeNull();
  });

  it('should set correct aria-label on remove button using the chip label', async () => {
    element.label = 'Angular';
    element.removable = true;
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector(
      '.dcx-chip__remove-button',
    ) as HTMLButtonElement;
    expect(button?.getAttribute('aria-label')).toBe('Remover Angular');
  });

  it('should set fallback aria-label on remove button when label is empty', async () => {
    element.removable = true;
    await element.updateComplete;

    const button = element.shadowRoot?.querySelector(
      '.dcx-chip__remove-button',
    ) as HTMLButtonElement;
    expect(button?.getAttribute('aria-label')).toBe('Remover chip');
  });

  it('should dispatch dcx-chip-remove event when remove button is clicked (removable=true)', async () => {
    element.removable = true;
    await element.updateComplete;

    const removeSpy = jest.fn();
    element.addEventListener('dcx-chip-remove', removeSpy);

    const button = element.shadowRoot?.querySelector(
      '.dcx-chip__remove-button',
    ) as HTMLButtonElement;
    button.click();

    expect(removeSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch dcx-chip-remove event when remove button is clicked (variant=filter)', async () => {
    element.variant = 'filter';
    await element.updateComplete;

    const removeSpy = jest.fn();
    element.addEventListener('dcx-chip-remove', removeSpy);

    const button = element.shadowRoot?.querySelector(
      '.dcx-chip__remove-button',
    ) as HTMLButtonElement;
    button.click();

    expect(removeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch dcx-chip-remove event when variant is choice and removable is false', async () => {
    const removeSpy = jest.fn();
    element.addEventListener('dcx-chip-remove', removeSpy);

    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(removeSpy).not.toHaveBeenCalled();
  });
});

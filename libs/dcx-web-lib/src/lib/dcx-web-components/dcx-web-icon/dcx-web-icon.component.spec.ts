import './dcx-web-icon.component';
import { DcxWebIcon } from './dcx-web-icon.component';

describe('DcxWebIcon', () => {
  let element: DcxWebIcon;

  beforeEach(async () => {
    element = document.createElement('dcx-web-icon') as DcxWebIcon;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebIcon);
  });

  it('should render default styling and classes', () => {
    const icon = element.querySelector('i');
    expect(icon).toBeTruthy();
    expect(icon?.classList.contains('bi')).toBeTruthy();
    expect(icon?.classList.contains('dcx-icon')).toBeTruthy();
    expect(icon?.classList.contains('dcx-icon--size-m')).toBeTruthy();
  });

  it('should apply correct classes for custom name, size and spacing', async () => {
    element.name = 'gear';
    element.size = 'l';
    element.spacing = 'compact';
    await element.updateComplete;

    const icon = element.querySelector('i');
    expect(icon?.classList.contains('bi-gear')).toBeTruthy();
    expect(icon?.classList.contains('dcx-icon--size-l')).toBeTruthy();
    expect(icon?.classList.contains('dcx-icon--spacing-compact')).toBeTruthy();
  });

  it('should apply extra-class to classList', async () => {
    element.extraClass = 'custom-1 custom-2';
    await element.updateComplete;

    const icon = element.querySelector('i');
    expect(icon?.classList.contains('custom-1')).toBeTruthy();
    expect(icon?.classList.contains('custom-2')).toBeTruthy();
  });

  it('should render as decorative when no aria-label is provided', async () => {
    element.ariaLabel = '';
    await element.updateComplete;

    const icon = element.querySelector('i');
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
    expect(icon?.hasAttribute('role')).toBeFalsy();
    expect(icon?.hasAttribute('aria-label')).toBeFalsy();
  });

  it('should render as role="img" when aria-label is provided', async () => {
    element.ariaLabel = 'Configuración';
    await element.updateComplete;

    const icon = element.querySelector('i');
    expect(icon?.hasAttribute('aria-hidden')).toBeFalsy();
    expect(icon?.getAttribute('role')).toBe('img');
    expect(icon?.getAttribute('aria-label')).toBe('Configuración');
  });

  it('should apply custom color inline style to host', async () => {
    element.color = 'rgb(255, 0, 0)';
    await element.updateComplete;

    expect(element.style.color).toBe('rgb(255, 0, 0)');

    element.color = '';
    await element.updateComplete;

    expect(element.style.color).toBe('');
  });
});

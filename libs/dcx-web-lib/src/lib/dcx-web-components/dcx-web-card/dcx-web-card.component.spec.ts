import './dcx-web-card.component';
import { DcxWebCard } from './dcx-web-card.component';

describe('DcxWebCard', () => {
  let element: DcxWebCard;

  beforeEach(async () => {
    element = document.createElement('dcx-web-card') as DcxWebCard;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebCard);
  });

  it('should render the default values correctly', () => {
    const card = element.shadowRoot?.querySelector('.dcx-card');
    const inner = element.shadowRoot?.querySelector('.dcx-card__inner');
    const title = element.shadowRoot?.querySelector('.dcx-card__title');
    
    expect(card).toBeTruthy();
    expect(inner?.classList.contains('dcx-card__inner--layout-vertical')).toBeTruthy();
    expect(inner?.classList.contains('dcx-card__inner--size-s')).toBeTruthy();
    expect(inner?.classList.contains('dcx-card__inner--align-center')).toBeTruthy();
    expect(title?.textContent?.trim()).toBe('Título de la carta');
  });

  it('should apply interactive class when interactive property is true', async () => {
    element.interactive = true;
    await element.updateComplete;
    const card = element.shadowRoot?.querySelector('.dcx-card');
    expect(card?.classList.contains('dcx-card--interactive')).toBeTruthy();
  });

  it('should apply disabled class when disabled property is true', async () => {
    element.disabled = true;
    await element.updateComplete;
    const card = element.shadowRoot?.querySelector('.dcx-card');
    expect(card?.classList.contains('dcx-card--disabled')).toBeTruthy();
    expect(card?.getAttribute('aria-disabled')).toBe('true');
  });

  it('should render the image when provided', async () => {
    element.image = 'test-image.jpg';
    element.imageAlt = 'Test Alt';
    await element.updateComplete;
    const img = element.shadowRoot?.querySelector('.dcx-card__image') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('test-image.jpg');
    expect(img.alt).toBe('Test Alt');
  });

  it('should dispatch dcx-card-click event when clicked and not disabled', async () => {
    const clickSpy = jest.fn();
    element.addEventListener('dcx-card-click', clickSpy);
    
    const card = element.shadowRoot?.querySelector('.dcx-card') as HTMLElement;
    card.click();
    
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should NOT dispatch dcx-card-click event when clicked and disabled', async () => {
    const clickSpy = jest.fn();
    element.disabled = true;
    await element.updateComplete;
    
    element.addEventListener('dcx-card-click', clickSpy);
    
    const card = element.shadowRoot?.querySelector('.dcx-card') as HTMLElement;
    card.click();
    
    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should apply correct shadow preset class via styleMap', async () => {
    element.shadow = 2;
    await element.updateComplete;
    const inner = element.shadowRoot?.querySelector('.dcx-card__inner') as HTMLElement;
    // Note: styleMap updates the element's style attribute
    expect(inner.style.getPropertyValue('--card-shadow')).toContain('var(--shadow-2');
  });

  it('should correctly project default and named content slot nodes', async () => {
    // Inicializamos con un hijo genérico para el slot por defecto
    const p = document.createElement('p');
    p.textContent = 'Contenido por defecto';
    element.appendChild(p);
    
    // Trigger re-render to detect child node changes
    element.requestUpdate();
    await element.updateComplete;
    
    const contentContainer = element.shadowRoot?.querySelector('.dcx-card__content') as HTMLElement;
    expect(contentContainer).toBeTruthy();
    expect(contentContainer.hasAttribute('hidden')).toBeFalsy();
  });
});

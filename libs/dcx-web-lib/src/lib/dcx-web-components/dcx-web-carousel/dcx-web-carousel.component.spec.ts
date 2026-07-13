import './dcx-web-carousel.component';
import { DcxWebCarousel } from './dcx-web-carousel.component';
import { html } from 'lit';

describe('DcxWebCarousel', () => {
  let element: DcxWebCarousel;

  beforeEach(async () => {
    element = document.createElement('dcx-web-carousel') as DcxWebCarousel;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    if (element && element.parentNode) {
      document.body.removeChild(element);
    }
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebCarousel);
  });

  it('should render default values', () => {
    expect(element.circular).toBe(false);
    expect(element.orientation).toBe('horizontal');
    expect(element.showNavigators).toBe(true);
    expect(element.showIndicators).toBe(true);
    expect(element.autoplayInterval).toBe(0);
    expect(element.ariaLabel).toBe('Carousel');
    expect(element.currentPage).toBe(0);
  });

  it('should render items correctly from value', async () => {
    element.value = ['Item 1', 'Item 2', 'Item 3'];
    await element.updateComplete;

    const items = element.shadowRoot?.querySelectorAll('.dcx-carousel__item');
    expect(items?.length).toBe(3);
    expect(items?.[0].textContent?.trim()).toBe('Item 1');
  });

  it('should render custom item template if provided', async () => {
    element.value = [{ label: 'Custom 1' }, { label: 'Custom 2' }];
    element.itemTemplate = (item: any) => html`<span class="custom-span">${item.label}</span>`;
    await element.updateComplete;

    const customSpan = element.shadowRoot?.querySelector('.custom-span');
    expect(customSpan).toBeTruthy();
    expect(customSpan?.textContent).toBe('Custom 1');
  });

  it('should navigate to next page on next()', async () => {
    element.value = ['1', '2', '3'];
    await element.updateComplete;

    const spy = jest.fn();
    element.addEventListener('pageChange', spy as EventListener);

    element.next();
    await element.updateComplete;

    expect(element.currentPage).toBe(1);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ page: 1 });
  });

  it('should navigate to prev page on prev()', async () => {
    element.value = ['1', '2', '3'];
    element.currentPage = 2;
    await element.updateComplete;

    const spy = jest.fn();
    element.addEventListener('pageChange', spy as EventListener);

    element.prev();
    await element.updateComplete;

    expect(element.currentPage).toBe(1);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ page: 1 });
  });

  it('should support setPage', async () => {
    element.value = ['1', '2', '3'];
    await element.updateComplete;

    const spy = jest.fn();
    element.addEventListener('pageChange', spy as EventListener);

    element.setPage(2);
    await element.updateComplete;

    expect(element.currentPage).toBe(2);
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls[0][0].detail).toEqual({ page: 2 });
  });

  it('should respect circular boundary on next()', async () => {
    element.value = ['1', '2', '3'];
    element.circular = false;
    element.currentPage = 2;
    await element.updateComplete;

    element.next();
    await element.updateComplete;
    expect(element.currentPage).toBe(2);

    element.circular = true;
    await element.updateComplete;

    element.next();
    await element.updateComplete;
    expect(element.currentPage).toBe(0);
  });

  it('should respect circular boundary on prev()', async () => {
    element.value = ['1', '2', '3'];
    element.circular = false;
    element.currentPage = 0;
    await element.updateComplete;

    element.prev();
    await element.updateComplete;
    expect(element.currentPage).toBe(0);

    element.circular = true;
    await element.updateComplete;

    element.prev();
    await element.updateComplete;
    expect(element.currentPage).toBe(2);
  });

  it('should show/hide indicators and navigators correctly', async () => {
    element.value = ['1', '2', '3'];
    element.showIndicators = false;
    element.showNavigators = false;
    await element.updateComplete;

    let indicators = element.shadowRoot?.querySelector('.dcx-carousel__indicators');
    let prevBtn = element.shadowRoot?.querySelector('.dcx-carousel__prev');
    let nextBtn = element.shadowRoot?.querySelector('.dcx-carousel__next');

    expect(indicators).toBeNull();
    expect(prevBtn).toBeNull();
    expect(nextBtn).toBeNull();

    element.showIndicators = true;
    element.showNavigators = true;
    await element.updateComplete;

    indicators = element.shadowRoot?.querySelector('.dcx-carousel__indicators');
    prevBtn = element.shadowRoot?.querySelector('.dcx-carousel__prev');
    nextBtn = element.shadowRoot?.querySelector('.dcx-carousel__next');

    expect(indicators).not.toBeNull();
    expect(nextBtn).not.toBeNull();
  });

  it('should not render navigator/indicator elements when value has 1 or fewer items', async () => {
    element.value = ['1'];
    await element.updateComplete;

    const indicators = element.shadowRoot?.querySelector('.dcx-carousel__indicators');
    const prevBtn = element.shadowRoot?.querySelector('.dcx-carousel__prev');
    const nextBtn = element.shadowRoot?.querySelector('.dcx-carousel__next');

    expect(indicators).toBeNull();
    expect(prevBtn).toBeNull();
    expect(nextBtn).toBeNull();
  });

  it('should have accessibility properties configured', async () => {
    element.value = ['1', '2'];
    element.ariaLabel = 'Custom Test Carousel';
    await element.updateComplete;

    const region = element.shadowRoot?.querySelector('[role="region"]');
    expect(region?.getAttribute('aria-label')).toBe('Custom Test Carousel');
    expect(region?.getAttribute('aria-roledescription')).toBe('carousel');

    const slides = element.shadowRoot?.querySelectorAll('.dcx-carousel__item');
    expect(slides?.[0].getAttribute('aria-hidden')).toBe('false');
    expect(slides?.[1].getAttribute('aria-hidden')).toBe('true');
  });

  it('should navigate on keydown events (horizontal)', async () => {
    element.value = ['1', '2', '3'];
    await element.updateComplete;

    const keydownEventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true });
    const keydownEventRight = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });

    element.onKeydown(keydownEventLeft);
    expect(element.currentPage).toBe(0);

    element.onKeydown(keydownEventRight);
    expect(element.currentPage).toBe(1);

    element.onKeydown(keydownEventLeft);
    expect(element.currentPage).toBe(0);
  });

  it('should navigate on keydown events (vertical)', async () => {
    element.value = ['1', '2', '3'];
    element.orientation = 'vertical';
    await element.updateComplete;

    const keydownEventUp = new KeyboardEvent('keydown', { key: 'ArrowUp', cancelable: true });
    const keydownEventDown = new KeyboardEvent('keydown', { key: 'ArrowDown', cancelable: true });

    element.onKeydown(keydownEventUp);
    expect(element.currentPage).toBe(0);

    element.onKeydown(keydownEventDown);
    expect(element.currentPage).toBe(1);

    element.onKeydown(keydownEventUp);
    expect(element.currentPage).toBe(0);
  });

  describe('Autoplay', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(async () => {
      // Clear timers and trigger Lit updates before switching back to real timers
      element.autoplayInterval = 0;
      await element.updateComplete;
      (element as any).clearTimer();
      jest.useRealTimers();
    });

    it('should automatically change pages when autoplayInterval is set', async () => {
      element.value = ['1', '2', '3'];
      element.autoplayInterval = 1000;
      await element.updateComplete;

      jest.advanceTimersByTime(1000);
      expect(element.currentPage).toBe(1);

      jest.advanceTimersByTime(1000);
      expect(element.currentPage).toBe(2);
    });

    it('should pause and resume autoplay on hover/focus interactions', async () => {
      element.value = ['1', '2', '3'];
      element.autoplayInterval = 1000;
      await element.updateComplete;

      element.pauseAutoplay();
      jest.advanceTimersByTime(2000);
      expect(element.currentPage).toBe(0);

      element.resumeAutoplay();
      jest.advanceTimersByTime(1000);
      expect(element.currentPage).toBe(1);
    });
  });
});

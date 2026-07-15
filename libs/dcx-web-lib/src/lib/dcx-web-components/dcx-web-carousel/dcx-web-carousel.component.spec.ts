import './dcx-web-carousel.component';
import { DcxWebCarousel } from './dcx-web-carousel.component';

describe('DcxWebCarousel', () => {
  let element: DcxWebCarousel;
  const carouselItems = ['Diapositiva 1', 'Diapositiva 2', 'Diapositiva 3'];

  beforeEach(async () => {
    element = document.createElement('dcx-web-carousel') as DcxWebCarousel;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebCarousel);
  });

  describe('Default Properties', () => {
    it('should have default property values', () => {
      expect(element.value).toEqual([]);
      expect(element.circular).toBe(false);
      expect(element.orientation).toBe('horizontal');
      expect(element.showNavigators).toBe(true);
      expect(element.showIndicators).toBe(true);
      expect(element.autoplayInterval).toBe(0);
      expect(element.ariaLabel).toBe('Carousel');
      expect(element.currentPage).toBe(0);
    });
  });

  describe('Rendering & Accessibility', () => {
    it('should render items and set aria-hidden correctly', async () => {
      element.value = carouselItems;
      await element.updateComplete;

      const slides = element.shadowRoot?.querySelectorAll(
        '.dcx-carousel__item',
      );
      expect(slides?.length).toBe(3);
      expect(slides?.[0]?.getAttribute('aria-hidden')).toBe('false');
      expect(slides?.[1]?.getAttribute('aria-hidden')).toBe('true');
      expect(slides?.[2]?.getAttribute('aria-hidden')).toBe('true');
    });

    it('should apply the aria-label to the carousel region', async () => {
      element.ariaLabel = 'Carousel de prueba';
      await element.updateComplete;

      const container = element.shadowRoot?.querySelector('.dcx-carousel');
      expect(container?.getAttribute('aria-label')).toBe('Carousel de prueba');
    });

    it('should set aria-pressed on the active indicator dot', async () => {
      element.value = carouselItems;
      await element.updateComplete;

      const indicators = element.shadowRoot?.querySelectorAll(
        '.dcx-carousel__indicator',
      );
      expect(indicators?.length).toBe(3);
      expect(indicators?.[0]?.getAttribute('aria-pressed')).toBe('true');
      expect(indicators?.[1]?.getAttribute('aria-pressed')).toBe('false');
      expect(indicators?.[2]?.getAttribute('aria-pressed')).toBe('false');
    });
  });

  describe('Navigation', () => {
    it('should navigate to next and previous page and emit pageChange', async () => {
      element.value = carouselItems;
      await element.updateComplete;

      const spy = jest.fn();
      element.addEventListener('pageChange', spy);

      element.next();
      await element.updateComplete;

      expect(element.currentPage).toBe(1);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toEqual({ page: 1 });

      element.prev();
      await element.updateComplete;

      expect(element.currentPage).toBe(0);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy.mock.calls[1][0].detail).toEqual({ page: 0 });
    });

    it('should change page when an indicator is clicked', async () => {
      element.value = carouselItems;
      await element.updateComplete;

      const indicators = element.shadowRoot?.querySelectorAll(
        '.dcx-carousel__indicator',
      );
      expect(indicators?.length).toBe(3);

      indicators?.[2]?.dispatchEvent(
        new Event('click', {
          bubbles: true,
          composed: true,
        }),
      );

      await element.updateComplete;
      expect(element.currentPage).toBe(2);
    });

    it('should navigate with ArrowRight and ArrowLeft keys', async () => {
      element.value = carouselItems;
      await element.updateComplete;

      element.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      await element.updateComplete;
      expect(element.currentPage).toBe(1);

      element.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      await element.updateComplete;
      expect(element.currentPage).toBe(0);
    });

    it('should navigate with ArrowDown when vertical', async () => {
      element.value = carouselItems;
      element.orientation = 'vertical';
      await element.updateComplete;

      element.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      await element.updateComplete;
      expect(element.currentPage).toBe(1);
    });
  });

  describe('Autoplay', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should advance slides automatically when autoplayInterval is set', async () => {
      element.value = carouselItems;
      element.autoplayInterval = 50;
      await element.updateComplete;

      jest.advanceTimersByTime(60);
      await element.updateComplete;

      expect(element.currentPage).toBe(1);
    });

    it('should pause and resume autoplay', async () => {
      element.value = carouselItems;
      element.autoplayInterval = 50;
      await element.updateComplete;

      element.pauseAutoplay();
      expect((element as any)._timer).toBeUndefined();

      element.resumeAutoplay();
      expect((element as any)._timer).toBeDefined();
    });
  });
});

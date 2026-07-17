describe('DcxWebCarousel', () => {
  let DcxWebCarousel: typeof import('./dcx-web-carousel.component').DcxWebCarousel;
  let element: InstanceType<typeof DcxWebCarousel>;
  const carouselItems = ['Diapositiva 1', 'Diapositiva 2', 'Diapositiva 3'];

  beforeAll(async () => {
    ({ DcxWebCarousel } = await import('./dcx-web-carousel.component'));
  });

  beforeEach(async () => {
    element = document.createElement('dcx-web-carousel') as InstanceType<
      typeof DcxWebCarousel
    >;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    jest.useRealTimers();
    if (element?.isConnected) {
      element.remove();
    }
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebCarousel);
  });

  it('should render slides and expose the current accessible state', async () => {
    element.value = carouselItems;
    await element.updateComplete;

    const slides = element.shadowRoot?.querySelectorAll('.dcx-carousel__item');
    const container = element.shadowRoot?.querySelector('.dcx-carousel');
    const indicators = element.shadowRoot?.querySelectorAll(
      '.dcx-carousel__indicator',
    );

    expect(slides?.length).toBe(3);
    expect(slides?.[0]?.getAttribute('aria-hidden')).toBe('false');
    expect(slides?.[1]?.getAttribute('aria-hidden')).toBe('true');
    expect(container?.getAttribute('aria-label')).toBe('Carousel');
    expect(indicators?.[0]?.getAttribute('aria-pressed')).toBe('true');
  });

  it('should navigate between pages', () => {
    element.value = carouselItems;

    element.next();
    expect(element.currentPage).toBe(1);

    element.prev();
    expect(element.currentPage).toBe(0);
  });

  it('should expose the default configuration values', () => {
    expect(element.value).toEqual([]);
    expect(element.circular).toBe(false);
    expect(element.orientation).toBe('horizontal');
    expect(element.showNavigators).toBe(true);
    expect(element.showIndicators).toBe(true);
    expect(element.autoplayInterval).toBe(0);
    expect(element.ariaLabel).toBe('Carousel');
    expect(element.currentPage).toBe(0);
  });

  it('should render the vertical configuration and related icons', async () => {
    element.value = carouselItems;
    element.orientation = 'vertical';
    await element.updateComplete;

    expect(element.carouselClass).toContain('dcx-carousel--vertical');
    expect(element.slideDirection).toBe('column');
    expect(element.currentIcon).toBe('chevron-up');
    expect(element.nextIcon).toBe('chevron-down');
  });

  it('should hide navigators and indicators when disabled', async () => {
    element.value = carouselItems;
    element.showNavigators = false;
    element.showIndicators = false;
    await element.updateComplete;

    const prevButton = element.shadowRoot?.querySelector('.dcx-carousel__prev');
    const nextButton = element.shadowRoot?.querySelector('.dcx-carousel__next');
    const indicators = element.shadowRoot?.querySelector(
      '.dcx-carousel__indicators',
    );

    expect(prevButton).toBeNull();
    expect(nextButton).toBeNull();
    expect(indicators).toBeNull();
  });

  it('should wrap around when circular mode is enabled', () => {
    element.value = carouselItems;
    element.circular = true;
    element.currentPage = 2;

    element.next();
    expect(element.currentPage).toBe(0);

    element.prev();
    expect(element.currentPage).toBe(2);
  });

  it('should react to keyboard navigation keys', () => {
    element.value = carouselItems;

    element.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(element.currentPage).toBe(1);

    element.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(element.currentPage).toBe(0);

    element.orientation = 'vertical';
    element.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(element.currentPage).toBe(1);
  });

  it('should pause and resume autoplay without breaking the component', async () => {
    element.value = carouselItems;
    element.autoplayInterval = 50;
    await element.updateComplete;

    element.resumeAutoplay();
    expect((element as any)._timer).toBeDefined();

    element.pauseAutoplay();
    expect((element as any)._timer).toBeUndefined();
  });
});

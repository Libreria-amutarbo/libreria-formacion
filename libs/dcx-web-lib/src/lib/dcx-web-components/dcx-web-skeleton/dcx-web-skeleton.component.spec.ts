import './dcx-web-skeleton.component';

import { DcxWebSkeleton } from './dcx-web-skeleton.component';

describe('DcxWebSkeleton', () => {
  let element: DcxWebSkeleton;

  beforeEach(async () => {
    element = document.createElement('dcx-web-skeleton') as DcxWebSkeleton;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebSkeleton);
  });

  describe('Default Properties', () => {
    it('should have default shape', () => {
      expect(element.shape).toBe('rectangle');
    });

    it('should have default width', () => {
      expect(element.width).toBe('100%');
    });

    it('should have default height', () => {
      expect(element.height).toBe('1rem');
    });

    it('should have default size', () => {
      expect(element.size).toBeNull();
    });

    it('should have default borderRadius', () => {
      expect(element.borderRadius).toBeNull();
    });

    it('should have default animation', () => {
      expect(element.animation).toBe('wave');
    });
  });

  describe('Host Classes', () => {
    it('should render base and wave classes by default', () => {
      expect(element.classList.contains('dcx-skeleton')).toBe(true);

      expect(element.classList.contains('dcx-skeleton--wave')).toBe(true);

      expect(element.classList.contains('dcx-skeleton--circle')).toBe(false);
    });

    it('should render circle class', async () => {
      element.shape = 'circle';

      await element.updateComplete;

      expect(element.classList.contains('dcx-skeleton--circle')).toBe(true);
    });

    it('should render none animation class', async () => {
      element.animation = 'none';

      await element.updateComplete;

      expect(element.classList.contains('dcx-skeleton--none')).toBe(true);

      expect(element.classList.contains('dcx-skeleton--wave')).toBe(false);
    });
  });

  describe('Computed Values', () => {
    it('should compute width and height from inputs', async () => {
      element.width = '10rem';
      element.height = '4rem';

      await element.updateComplete;

      expect(element.computedWidth).toBe('10rem');

      expect(element.computedHeight).toBe('4rem');

      expect(element.style.getPropertyValue('--dcx-skeleton-width')).toBe(
        '10rem',
      );

      expect(element.style.getPropertyValue('--dcx-skeleton-height')).toBe(
        '4rem',
      );
    });

    it('should use size as width and height', async () => {
      element.width = '10rem';
      element.height = '4rem';
      element.size = '3rem';

      await element.updateComplete;

      expect(element.computedWidth).toBe('3rem');

      expect(element.computedHeight).toBe('3rem');

      expect(element.style.getPropertyValue('--dcx-skeleton-width')).toBe(
        '3rem',
      );

      expect(element.style.getPropertyValue('--dcx-skeleton-height')).toBe(
        '3rem',
      );
    });

    it('should compute circle radius', async () => {
      element.shape = 'circle';

      await element.updateComplete;

      expect(element.computedBorderRadius).toBe('var(--r-pill, 999px)');
    });

    it('should use custom border radius', async () => {
      element.borderRadius = '16px';

      await element.updateComplete;

      expect(element.computedBorderRadius).toBe('16px');

      expect(
        element.style.getPropertyValue('--dcx-skeleton-border-radius'),
      ).toBe('16px');
    });
  });

  describe('Accessibility', () => {
    it('should set aria-hidden', () => {
      expect(element.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('Rendering', () => {
    it('should render empty shadow dom content', () => {
      expect(element.shadowRoot).toBeTruthy();
    });
  });
});

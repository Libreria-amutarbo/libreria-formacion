import './dcx-web-progressbar.component';

import { DcxWebProgressbar } from './dcx-web-progressbar.component';

describe('DcxWebProgressbar', () => {
  let element: DcxWebProgressbar;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-progressbar',
    ) as DcxWebProgressbar;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(
      DcxWebProgressbar,
    );
  });

  describe('Default Properties', () => {
    it('should have default variant', () => {
      expect(element.variant).toBe(
        'default',
      );
    });

    it('should have default value', () => {
      expect(element.value).toBe(0);
    });

    it('should have default label', () => {
      expect(element.label).toBe('');
    });

    it('should have default segments', () => {
      expect(element.segments).toBe(5);
    });

    it('should have empty steps by default', () => {
      expect(element.steps).toEqual([]);
    });

    it('should have currentStep as 0', () => {
      expect(element.currentStep).toBe(0);
    });

    it('should have showTooltip disabled', () => {
      expect(element.showTooltip).toBe(false);
    });

    it('should have showLabel disabled', () => {
      expect(element.showLabel).toBe(false);
    });

    it('should have showCheckmarks disabled', () => {
      expect(element.showCheckmarks).toBe(false);
    });
  });

  describe('Computed - progressPercentage', () => {
    it('should return value when inside range', () => {
      element.value = 50;

      expect(
        element.progressPercentage,
      ).toBe(50);
    });

    it('should clamp negative values', () => {
      element.value = -10;

      expect(
        element.progressPercentage,
      ).toBe(0);
    });

    it('should clamp values above 100', () => {
      element.value = 150;

      expect(
        element.progressPercentage,
      ).toBe(100);
    });
  });

  describe('Computed - variant flags', () => {
    it('should identify default variant', () => {
      element.variant = 'default';

      expect(
        element.isDefaultVariant,
      ).toBe(true);

      expect(
        element.isSegmentedVariant,
      ).toBe(false);

      expect(
        element.isStepperVariant,
      ).toBe(false);
    });

    it('should identify segmented variant', () => {
      element.variant = 'segmented';

      expect(
        element.isSegmentedVariant,
      ).toBe(true);
    });

    it('should identify stepper variant', () => {
      element.variant = 'stepper';

      expect(
        element.isStepperVariant,
      ).toBe(true);
    });
  });

  describe('Computed - segmentArray', () => {
    it('should generate default segments', () => {
      expect(
        element.segmentArray,
      ).toHaveLength(5);
    });

    it('should generate custom segments', () => {
      element.segments = 3;

      expect(
        element.segmentArray,
      ).toHaveLength(3);
    });
  });

  describe('Computed - stepProgress', () => {
    it('should return 0 when no steps exist', () => {
      element.steps = [];

      expect(
        element.stepProgress,
      ).toBe(0);
    });

    it('should calculate progress', () => {
      element.steps = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
        { label: 'Step 4' },
      ];

      element.currentStep = 2;

      expect(
        element.stepProgress,
      ).toBe(50);
    });
  });

  describe('Computed - stepValueText', () => {
    it('should build step value text', () => {
      element.steps = [
        { label: 'A' },
        { label: 'B' },
        { label: 'C' },
      ];

      element.currentStep = 2;

      expect(
        element.stepValueText,
      ).toBe('Paso 2 de 3');
    });
  });

  describe('Methods - isStepCompleted', () => {
    beforeEach(() => {
      element.steps = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ];
    });

    it('should return true for completed steps', () => {
      element.currentStep = 3;

      expect(
        element.isStepCompleted(0),
      ).toBe(true);

      expect(
        element.isStepCompleted(1),
      ).toBe(true);
    });

    it('should return false for current step', () => {
      element.currentStep = 2;

      expect(
        element.isStepCompleted(1),
      ).toBe(false);
    });
  });

  describe('Methods - isStepActive', () => {
    beforeEach(() => {
      element.steps = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ];
    });

    it('should return true for current step', () => {
      element.currentStep = 2;

      expect(
        element.isStepActive(1),
      ).toBe(true);
    });

    it('should return false for completed step', () => {
      element.currentStep = 3;

      expect(
        element.isStepActive(0),
      ).toBe(false);
    });
  });

  describe('Rendering - Default Variant', () => {
    beforeEach(async () => {
      element.variant = 'default';
      element.value = 60;

      await element.updateComplete;
    });

    it('should render progress track', () => {
      const track =
        element.shadowRoot?.querySelector(
          '.dcx-progressbar__track',
        );

      expect(track).toBeTruthy();
    });

    it('should render progress fill', () => {
      const fill =
        element.shadowRoot?.querySelector(
          '.dcx-progressbar__fill',
        ) as HTMLElement;

      expect(fill).toBeTruthy();

      expect(
        fill.style.getPropertyValue(
          '--progress-width',
        ),
      ).toBe('60%');
    });
  });

  describe('Rendering - Segmented Variant', () => {
    beforeEach(async () => {
      element.variant = 'segmented';
      element.segments = 5;

      await element.updateComplete;
    });

    it('should render configured segments', () => {
      const segments =
        element.shadowRoot?.querySelectorAll(
          '.dcx-progressbar__segment',
        );

      expect(
        segments?.length,
      ).toBe(5);
    });

    it('should render custom segment amount', async () => {
      element.segments = 3;

      await element.updateComplete;

      const segments =
        element.shadowRoot?.querySelectorAll(
          '.dcx-progressbar__segment',
        );

      expect(
        segments?.length,
      ).toBe(3);
    });
  });

  describe('Rendering - Tooltip and Label', () => {
    it('should render tooltip', async () => {
      element.value = 75;
      element.showTooltip = true;

      await element.updateComplete;

      const tooltip =
        element.shadowRoot?.querySelector(
          '.dcx-progressbar__tooltip',
        );

      expect(
        tooltip?.textContent?.trim(),
      ).toBe('75%');
    });

    it('should render label header', async () => {
      element.value = 85;
      element.label = 'Progreso';
      element.showLabel = true;

      await element.updateComplete;

      const header =
        element.shadowRoot?.querySelector(
          '.dcx-progressbar__header',
        );

      expect(header).toBeTruthy();

      const spans =
        header?.querySelectorAll('span');

      expect(
        spans?.[0].textContent?.trim(),
      ).toBe('Progreso');

      expect(
        spans?.[1].textContent?.trim(),
      ).toBe('85%');
    });
  });

  describe('WCAG AA', () => {
    const getTrack = () =>
      element.shadowRoot?.querySelector(
        '.dcx-progressbar__track',
      ) as HTMLElement;

    it('should expose progressbar attributes', async () => {
      element.value = 60;

      await element.updateComplete;

      const track = getTrack();

      expect(
        track.getAttribute('role'),
      ).toBe('progressbar');

      expect(
        track.getAttribute(
          'aria-valuemin',
        ),
      ).toBe('0');

      expect(
        track.getAttribute(
          'aria-valuemax',
        ),
      ).toBe('100');

      expect(
        track.getAttribute(
          'aria-valuenow',
        ),
      ).toBe('60');

      expect(
        track.getAttribute(
          'aria-valuetext',
        ),
      ).toBe('60%');
    });

    it('should clamp aria-valuenow', async () => {
      element.value = 150;

      await element.updateComplete;

      expect(
        getTrack().getAttribute(
          'aria-valuenow',
        ),
      ).toBe('100');
    });

    it('should use aria-label when label is hidden', async () => {
      element.ariaLabel =
        'Descarga de archivo';

      await element.updateComplete;

      expect(
        getTrack().getAttribute(
          'aria-label',
        ),
      ).toBe(
        'Descarga de archivo',
      );
    });

    it('should associate label using aria-labelledby', async () => {
      element.showLabel = true;
      element.label = 'Progreso';

      await element.updateComplete;

      expect(
        getTrack().getAttribute(
          'aria-labelledby',
        ),
      ).toBe(element.labelId);
    });

    it('should mark segments as aria-hidden', async () => {
      element.variant = 'segmented';

      await element.updateComplete;

      const segments =
        element.shadowRoot?.querySelector(
          '.dcx-progressbar__segments',
        );

      expect(
        segments?.getAttribute(
          'aria-hidden',
        ),
      ).toBe('true');
    });

    it('should mark tooltip as aria-hidden', async () => {
      element.showTooltip = true;

      await element.updateComplete;

      const tooltip =
        element.shadowRoot?.querySelector(
          '.dcx-progressbar__tooltip',
        );

      expect(
        tooltip?.getAttribute(
          'aria-hidden',
        ),
      ).toBe('true');
    });
  });

  describe('Rendering - Stepper Variant', () => {
    beforeEach(async () => {
      element.variant = 'stepper';

      element.steps = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ];

      element.currentStep = 2;

      await element.updateComplete;
    });

    it('should render steps', () => {
      const steps =
        element.shadowRoot?.querySelectorAll(
          '.dcx-progressbar__step',
        );

      expect(
        steps?.length,
      ).toBe(3);
    });

    it('should render labels', () => {
      const labels =
        element.shadowRoot?.querySelectorAll(
          '.dcx-progressbar__step-label',
        );

      expect(
        labels?.length,
      ).toBe(3);

      expect(
        labels?.[0]?.textContent?.trim(),
      ).toBe('Step 1');
    });

    it('should assign active and completed classes', () => {
      const steps =
        element.shadowRoot?.querySelectorAll(
          '.dcx-progressbar__step',
        );

      expect(
        steps?.[0].classList.contains(
          'dcx-progressbar__step--completed',
        ),
      ).toBe(true);

      expect(
        steps?.[1].classList.contains(
          'dcx-progressbar__step--active',
        ),
      ).toBe(true);
    });

    it('should render checkmarks', async () => {
      element.showCheckmarks = true;

      await element.updateComplete;

      const checkmarks =
        element.shadowRoot?.querySelectorAll(
          '.dcx-progressbar__checkmark',
        );

      expect(
        checkmarks?.length,
      ).toBeGreaterThan(0);
    });

    it('should expose correct stepper accessibility', () => {
      const stepper =
        element.shadowRoot?.querySelector(
          '.dcx-progressbar__stepper',
        ) as HTMLElement;

      expect(
        stepper.getAttribute('role'),
      ).toBe('progressbar');

      expect(
        stepper.getAttribute(
          'aria-valuemin',
        ),
      ).toBe('1');

      expect(
        stepper.getAttribute(
          'aria-valuemax',
        ),
      ).toBe('3');

      expect(
        stepper.getAttribute(
          'aria-valuenow',
        ),
      ).toBe('2');

      expect(
        stepper.getAttribute(
          'aria-valuetext',
        ),
      ).toBe('Paso 2 de 3');
    });

    it('should mark active step with aria-current', () => {
      const active =
        element.shadowRoot?.querySelector(
          '[aria-current="step"]',
        );

      expect(active).toBeTruthy();
    });

    it('should hide circles from assistive technology', () => {
      const circles =
        element.shadowRoot?.querySelectorAll(
          '.dcx-progressbar__step-circle',
        );

      circles?.forEach(circle => {
        expect(
          circle.getAttribute(
            'aria-hidden',
          ),
        ).toBe('true');
      });
    });
  });
});
import './dcx-web-stepper.component';

import { DcxWebStepper } from './dcx-web-stepper.component';

describe('DcxWebStepper', () => {
  let element: DcxWebStepper;

  const steps = [
    {
      id: '1',
      label: 'Step 1',
    },
    {
      id: '2',
      label: 'Step 2',
    },
    {
      id: '3',
      label: 'Step 3',
    },
  ];

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-stepper',
    ) as DcxWebStepper;

    element.steps = steps;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(
      DcxWebStepper,
    );
  });

  it('should render all steps', () => {
    const buttons =
      element.shadowRoot?.querySelectorAll(
        '.dcx-stepper__step',
      );

    expect(buttons?.length).toBe(3);
  });

  it('should activate first step by default', () => {
    expect(
      element.internalActiveStepId,
    ).toBe('1');
  });

  it('should emit stepClick', () => {
    const spy = jest.fn();

    element.addEventListener(
      'stepClick',
      spy,
    );

    const button =
      element.shadowRoot?.querySelectorAll(
        '.dcx-stepper__step',
      )[1];

    (button as HTMLButtonElement).click();

    expect(spy).toHaveBeenCalled();
  });

  it('should emit stepChange', () => {
    const spy = jest.fn();

    element.addEventListener(
      'stepChange',
      spy,
    );

    const button =
      element.shadowRoot?.querySelectorAll(
        '.dcx-stepper__step',
      )[1];

    (button as HTMLButtonElement).click();

    expect(spy).toHaveBeenCalled();
  });

  it('should apply vertical class', async () => {
    element.orientation =
      'vertical';

    await element.updateComplete;

    const root =
      element.shadowRoot?.querySelector(
        '.dcx-stepper',
      );

    expect(
      root?.classList.contains(
        'dcx-stepper--vertical',
      ),
    ).toBe(true);
  });

  it('should support Home navigation', () => {
    const spy = jest.fn();

    element.addEventListener(
      'stepClick',
      spy,
    );

    const button =
      element.shadowRoot?.querySelectorAll(
        '.dcx-stepper__step',
      )[2];

    button?.dispatchEvent(
      new KeyboardEvent(
        'keydown',
        {
          key: 'Home',
        },
      ),
    );

    expect(spy).toHaveBeenCalled();
  });

  it('should render role list', () => {
    const list =
      element.shadowRoot?.querySelector(
        'ol',
      );

    expect(
      list?.getAttribute('role'),
    ).toBe('list');
  });

  it('should render aria-current for active step', () => {
    const active =
      element.shadowRoot?.querySelector(
        '.dcx-stepper__step--active',
      );

    expect(
      active?.getAttribute(
        'aria-current',
      ),
    ).toBe('step');
  });
});
import './dcx-web-select.component';
import { DcxWebSelect } from './dcx-web-select.component';

import { OPTIONS, PLACEHOLDER } from '../../core/defaults';

describe('DcxWebSelect', () => {
  let element: DcxWebSelect;

  beforeEach(async () => {
    element = document.createElement(
      'dcx-web-select',
    ) as DcxWebSelect;

    element.options = OPTIONS;

    document.body.appendChild(element);

    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(
      DcxWebSelect,
    );
  });

  it('should render', () => {
    expect(element.shadowRoot).toBeTruthy();
  });

  it('should display placeholder when value is null', () => {
    expect(element.selectedLabel).toBe(
      PLACEHOLDER,
    );
  });

  it('should open when toggle is called', async () => {
    element.toggle();

    await element.updateComplete;

    expect(element.isOpen).toBe(true);
  });

  it('should close when toggle is called twice', async () => {
    element.toggle();

    await element.updateComplete;

    element.toggle();

    await element.updateComplete;

    expect(element.isOpen).toBe(false);
  });

  it('should not open when disabled', async () => {
    element.disabled = true;

    element.toggle();

    await element.updateComplete;

    expect(element.isOpen).toBe(false);
  });

  it('should render label', async () => {
    element.label = 'My Select';

    await element.updateComplete;

    const label =
      element.shadowRoot?.querySelector(
        '.dcx-select__label',
      );

    expect(label).toBeTruthy();
  });

  it('should use selected option label', async () => {
    element.value = OPTIONS[1].value;

    await element.updateComplete;

    expect(
      element.selectedLabel,
    ).toBe(OPTIONS[1].label);
  });

  it('should select an option', async () => {
    element.selectOption(OPTIONS[0]);

    await element.updateComplete;

    expect(element.value).toBe(
      OPTIONS[0].value,
    );
  });

  it('should emit valueChange when selecting an option', async () => {
    const spy = jest.fn();

    element.addEventListener(
      'valueChange',
      spy,
    );

    element.selectOption(OPTIONS[0]);

    expect(spy).toHaveBeenCalled();
  });

  it('should close after selectOption', async () => {
    element.toggle();

    await element.updateComplete;

    element.selectOption(OPTIONS[0]);

    await element.updateComplete;

    expect(element.isOpen).toBe(false);
  });

  it('should clear value', async () => {
    element.value = OPTIONS[0].value;

    const ev = new Event('click');

    element.clearValue(ev);

    await element.updateComplete;

    expect(element.value).toBeNull();
  });

  it('should reset search when clearValue is called', async () => {
    element.search = 'test';

    const ev = new Event('click');

    element.clearValue(ev);

    await element.updateComplete;

    expect(element.search).toBe('');
  });

  it('should emit clear event', () => {
    const spy = jest.fn();

    element.addEventListener(
      'clear',
      spy,
    );

    element.clearValue(
      new Event('click'),
    );

    expect(spy).toHaveBeenCalled();
  });

  it('should filter options by search', async () => {
    element.search =
      OPTIONS[0].label;

    await element.updateComplete;

    expect(
      element.filtered.length,
    ).toBe(1);
  });

  it('should update search from onSearchEvent', async () => {
    element.onSearchEvent(
      new CustomEvent('change', {
        detail: 'hello',
      }),
    );

    await element.updateComplete;

    expect(element.search).toBe(
      'hello',
    );
  });

  it('should convert null search to empty string', async () => {
    element.onSearchEvent(
      new CustomEvent('change', {
        detail: null,
      }),
    );

    await element.updateComplete;

    expect(element.search).toBe('');
  });

  it('should include invalid class', async () => {
    element.isInvalid = true;

    await element.updateComplete;

    expect(
      element.getControlClasses(),
    ).toContain('is-invalid');
  });

  it('should include disabled class', async () => {
    element.disabled = true;

    await element.updateComplete;

    expect(
      element.getControlClasses(),
    ).toContain('is-disabled');
  });

  it('should include open class', async () => {
    element.isOpen = true;

    await element.updateComplete;

    expect(
      element.getControlClasses(),
    ).toContain('is-open');
  });

  it('should initialize value from valueInput', async () => {
    element.valueInput =
      OPTIONS[1].value;

    element.requestUpdate();

    await element.updateComplete;

    expect(element.value).toBe(
      OPTIONS[1].value,
    );
  });

  it('should update value when valueInput changes', async () => {
    element.valueInput =
      OPTIONS[0].value;

    await element.updateComplete;

    expect(element.value).toBe(
      OPTIONS[0].value,
    );

    element.valueInput =
      OPTIONS[1].value;

    await element.updateComplete;

    expect(element.value).toBe(
      OPTIONS[1].value,
    );
  });

  it('should open on ArrowDown when closed', () => {
    const event =
      new KeyboardEvent(
        'keydown',
        {
          key: 'ArrowDown',
        },
      );

    element.onKey(event);

    expect(element.isOpen).toBe(
      true,
    );
  });

  it('should open on ArrowUp when closed', () => {
    const event =
      new KeyboardEvent(
        'keydown',
        {
          key: 'ArrowUp',
        },
      );

    element.onKey(event);

    expect(element.isOpen).toBe(
      true,
    );
  });

  it('should move active index with ArrowDown', async () => {
    element.toggle();

    await element.updateComplete;

    element.onKey(
      new KeyboardEvent(
        'keydown',
        {
          key: 'ArrowDown',
        },
      ),
    );

    expect(
      element.activeIndex,
    ).toBeGreaterThanOrEqual(0);
  });

  it('should close on Escape', async () => {
    const focusSpy = jest.fn();

    element.registerControlElement({
      focus: focusSpy,
    } as unknown as HTMLElement);

    element.toggle();

    await element.updateComplete;

    element.onKey(
      new KeyboardEvent(
        'keydown',
        {
          key: 'Escape',
        },
      ),
    );

    expect(element.isOpen).toBe(
      false,
    );
  });

  it('should expose activeDescendant when open', async () => {
    element.toggle();

    element.activeIndex = 0;

    await element.updateComplete;

    expect(
      element.activeDescendant,
    ).toContain('-opt-0');
  });

  it('should return null activeDescendant when closed', () => {
    expect(
      element.activeDescendant,
    ).toBeNull();
  });
});
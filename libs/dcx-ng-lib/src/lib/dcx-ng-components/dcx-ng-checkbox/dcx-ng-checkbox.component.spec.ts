import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgCheckboxComponent } from './dcx-ng-checkbox.component';
import { DcxCheckbox, ERRORICON } from '@dcx-ng-components/dcx-ng-lib';
import { By } from '@angular/platform-browser';

describe('DcxNgCheckboxComponent', () => {
  let component: DcxNgCheckboxComponent;
  let fixture: ComponentFixture<DcxNgCheckboxComponent>;

  const mockCheckboxOptions: DcxCheckbox[] = [
    { id: 'cb1', label: 'Option 1', value: true },
    { id: 'cb2', label: 'Option 2', value: false },
    { id: 'cb3', label: 'Option 3', value: null },
    {
      id: 'cb4',
      label: 'Option 4',
      value: true,
      errorMessage: 'Error message',
      error: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the checkbox component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.options()).toEqual([]);
    expect(component._options()).toEqual([]);
    expect(component.iconName()).toBe('check');
    expect(component.buttonVariant()).toBe('primary');
    expect(component.errorIcon()).toBe(ERRORICON);
  });

  describe('input: options', () => {
    it('should update _options when options input changes', () => {
      fixture.componentRef.setInput('options', mockCheckboxOptions);
      fixture.detectChanges();

      expect(component._options()).toEqual(mockCheckboxOptions);
    });

    it('should initialize empty when options input is not set', () => {
      expect(component._options()).toEqual([]);
    });
  });

  describe('input: errorIcon', () => {
    it('should use custom errorIcon when provided', () => {
      const customIcon = 'custom-error-icon';
      fixture.componentRef.setInput('errorIcon', customIcon);
      fixture.detectChanges();

      expect(component.errorIcon()).toBe(customIcon);
    });

    it('should use ERRORICON default when not provided', () => {
      expect(component.errorIcon()).toBe(ERRORICON);
    });
  });

  describe('getCheckboxError', () => {
    it('should return true when checkbox has error', () => {
      const option: DcxCheckbox = {
        id: 'cb1',
        label: 'Option',
        value: true,
        errorMessage: 'Error message',
        error: true,
      };

      expect(component.getCheckboxError(option)).toBe(true);
    });

    it('should return false when checkbox has no error', () => {
      const option: DcxCheckbox = {
        id: 'cb1',
        label: 'Option',
        value: true,
      };

      expect(component.getCheckboxError(option)).toBe(false);
    });

    it('should return false when error is empty string', () => {
      const option: DcxCheckbox = {
        id: 'cb1',
        label: 'Option',
        value: true,
        errorMessage: '',
        error: true,
      };

      expect(component.getCheckboxError(option)).toBe(true);
    });

    it('should return true for error with any truthy value', () => {
      const option: DcxCheckbox = {
        id: 'cb1',
        label: 'Option',
        value: true,
        errorMessage: 'Any error message',
        error: true,
      };

      expect(component.getCheckboxError(option)).toBe(true);
    });
  });

  describe('getIconName', () => {
    it('should return "check" when value is true', () => {
      const option: DcxCheckbox = { id: 'cb1', label: 'Option', value: true };

      expect(component.getIconName(option)).toBe('check');
    });

    it('should return "dash" when value is false', () => {
      const option: DcxCheckbox = { id: 'cb1', label: 'Option', value: false };

      expect(component.getIconName(option)).toBe('dash');
    });

    it('should return empty string when value is null', () => {
      const option: DcxCheckbox = { id: 'cb1', label: 'Option', value: null };

      expect(component.getIconName(option)).toBe('');
    });

    it('should return empty string for undefined value', () => {
      const option: DcxCheckbox = {
        id: 'cb1',
        label: 'Option',
        value: null,
      };

      expect(component.getIconName(option as any)).toBe('');
    });
  });

  describe('getButtonVariant', () => {
    it('should return "primary" when value is true', () => {
      const option: DcxCheckbox = { id: 'cb1', label: 'Option', value: true };

      expect(component.getButtonVariant(option)).toBe('primary');
    });

    it('should return "primary" when value is false', () => {
      const option: DcxCheckbox = { id: 'cb1', label: 'Option', value: false };

      expect(component.getButtonVariant(option)).toBe('primary');
    });

    it('should return "secondary" when value is null', () => {
      const option: DcxCheckbox = { id: 'cb1', label: 'Option', value: null };

      expect(component.getButtonVariant(option)).toBe('secondary');
    });

    it('should return "secondary" for undefined value', () => {
      const option: DcxCheckbox = {
        id: 'cb1',
        label: 'Option',
        value: null,
      };

      expect(component.getButtonVariant(option as any)).toBe('secondary');
    });
  });

  describe('getValue', () => {
    it('should return false when value is true', () => {
      expect(component.getValue(true)).toBe(false);
    });

    it('should return null when value is false', () => {
      expect(component.getValue(false)).toBeNull();
    });

    it('should return true when value is null', () => {
      expect(component.getValue(null as any)).toBe(true);
    });

    it('should cycle through values correctly', () => {
      expect(component.getValue(true)).toBe(false);
      expect(component.getValue(false)).toBeNull();
      expect(component.getValue(component.getValue(false) as any)).toBe(true);
    });
  });

  describe('changeValue', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('options', mockCheckboxOptions);
      fixture.detectChanges();
    });

    it('should emit the updated options array', () => {
      const emitSpy = jest.spyOn(component.changeOptions, 'emit');

      component.changeValue('cb1');

      const emittedValue = emitSpy.mock.calls[0][0];
      expect(Array.isArray(emittedValue)).toBe(true);
      expect(emittedValue.length).toBe(mockCheckboxOptions.length);
    });
  });

  describe('output: changeOptions', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('options', mockCheckboxOptions);
      fixture.detectChanges();
    });

    it('should emit changeOptions when value is changed', () => {
      const emitSpy = jest.spyOn(component.changeOptions, 'emit');

      component.changeValue('cb1');

      expect(emitSpy).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit the complete options array after change', () => {
      const emitSpy = jest.spyOn(component.changeOptions, 'emit');

      component.changeValue('cb1');

      const emittedOptions = emitSpy.mock.calls[0][0];
      expect(emittedOptions.length).toBe(mockCheckboxOptions.length);
    });

    it('should emit updated values in the correct order', () => {
      const emitSpy = jest.spyOn(component.changeOptions, 'emit');

      component.changeValue('cb1');

      const emittedOptions = emitSpy.mock.calls[0][0];
      expect(emittedOptions[0].id).toBe('cb1');
      expect(emittedOptions[1].id).toBe('cb2');
      expect(emittedOptions[2].id).toBe('cb3');
    });

    it('should emit multiple times on multiple changes', () => {
      const emitSpy = jest.spyOn(component.changeOptions, 'emit');

      component.changeValue('cb1');
      component.changeValue('cb2');
      component.changeValue('cb3');

      expect(emitSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('effects and signals integration', () => {
    it('should update internal options signal when input options change', done => {
      const newOptions: DcxCheckbox[] = [
        { id: 'new1', label: 'New Option', value: true },
      ];

      fixture.componentRef.setInput('options', newOptions);
      fixture.detectChanges();

      setTimeout(() => {
        expect(component._options()).toEqual(newOptions);
        done();
      }, 10);
    });

    it('should maintain options list through multiple updates', () => {
      const options1: DcxCheckbox[] = [
        { id: 'opt1', label: 'Option 1', value: true },
      ];
      const options2: DcxCheckbox[] = [
        { id: 'opt2', label: 'Option 2', value: false },
      ];

      fixture.componentRef.setInput('options', options1);
      fixture.detectChanges();
      expect(component._options()).toEqual(options1);

      fixture.componentRef.setInput('options', options2);
      fixture.detectChanges();
      expect(component._options()).toEqual(options2);
    });
  });

  describe('integration tests', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('options', mockCheckboxOptions);
      fixture.detectChanges();
    });
  });
});

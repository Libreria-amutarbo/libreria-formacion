import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSelectComponent } from './dcx-ng-select.component';
import { By } from '@angular/platform-browser';
import { OPTIONS, PLACEHOLDER } from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgSelectComponent', () => {
  let component: DcxNgSelectComponent;
  let fixture: ComponentFixture<DcxNgSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSelectComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('options', OPTIONS);
    fixture.componentRef.setInput('placeholder', PLACEHOLDER);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the placeholder when no value selected', () => {
    expect(component.selectedLabel()).toBe(PLACEHOLDER);
  });

  it('should open dropdown panel on toggle', () => {
    expect(component.isOpen()).toBe(false);
    component.toggle();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);
  });

  it('should display options when panel is open', () => {
    component.toggle();
    fixture.detectChanges();
    const options = fixture.debugElement.queryAll(
      By.css('.dcx-ng-select__option'),
    );
    expect(options.length).toBe(OPTIONS.length);
    expect(options[0].nativeElement.textContent.trim()).toBe(OPTIONS[0].label);
    expect(options[1].nativeElement.textContent.trim()).toBe(OPTIONS[1].label);
  });

  it('should reflect selected value in selectedLabel', () => {
    component.writeValue(OPTIONS[1].value);
    fixture.detectChanges();
    expect(component.selectedLabel()).toBe(OPTIONS[1].label);
  });

  it('should call onChange when selectOption is called', () => {
    const spy = jest.fn();
    component.registerOnChange(spy);
    component.selectOption({ value: OPTIONS[0].value });
    expect(spy).toHaveBeenCalledWith(OPTIONS[0].value);
  });

  it('should call onTouched via registerOnTouched', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component).toBeTruthy();
  });

  it('should not toggle when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.toggle();
    expect(component.isOpen()).toBe(false);
  });

  it('should set disabled to false via writeValue', () => {
    component.writeValue(null);
    expect(component.value()).toBeNull();
  });

  it('registerOnChange should store the callback and invoke on selectOption', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    component.selectOption({ value: OPTIONS[0].value });
    expect(fn).toHaveBeenCalledWith(OPTIONS[0].value);
  });

  it('registerOnTouched should store the callback', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component).toBeTruthy();
  });

  it('writeValue with null should set value to null', () => {
    component.writeValue(null);
    expect(component.value()).toBeNull();
  });

  it('writeValue with undefined should set value to null', () => {
    component.writeValue(undefined as unknown as null);
    // writeValue sets whatever is passed
    expect(component.value()).toBeUndefined();
  });

  it('valueChange should emit when selectOption is called', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.selectOption({ value: OPTIONS[1].value });
    expect(spy).toHaveBeenCalledWith(OPTIONS[1].value);
  });

  it('should close panel after selectOption', () => {
    component.toggle();
    expect(component.isOpen()).toBe(true);
    component.selectOption({ value: OPTIONS[0].value });
    expect(component.isOpen()).toBe(false);
  });

  it('should show label when label input is set', () => {
    fixture.componentRef.setInput('label', 'My Select');
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.dcx-ng-select__label'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toContain('My Select');
  });

  it('filtered should filter options based on search term', () => {
    component.search.set(OPTIONS[0].label);
    expect(component.filtered().length).toBe(1);
    expect(component.filtered()[0].label).toBe(OPTIONS[0].label);
  });

  it('should clear value when clearValue is called', () => {
    component.selectOption({ value: OPTIONS[0].value });
    expect(component.value()).toBe(OPTIONS[0].value);

    const clearSpy = jest.fn();
    component.clear.subscribe(clearSpy);
    const ev = new Event('click');
    jest.spyOn(ev, 'stopPropagation');
    component.clearValue(ev);

    expect(component.value()).toBeNull();
    expect(ev.stopPropagation).toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalled();
  });

  it('clearValue should reset search', () => {
    component.search.set('test');
    const ev = new Event('click');
    component.clearValue(ev);
    expect(component.search()).toBe('');
  });

  it('onSearchChange should update search signal with string', () => {
    component.onSearchChange('hello');
    expect(component.search()).toBe('hello');
  });

  it('onSearchChange should convert null to empty string', () => {
    component.onSearchChange(null);
    expect(component.search()).toBe('');
  });

  it('onSearchChange should convert number to string', () => {
    component.onSearchChange(123);
    expect(component.search()).toBe('123');
  });

  describe('keyboard navigation (onKey)', () => {
    beforeEach(() => {
      component.toggle();
      fixture.detectChanges();
      component.writeValue(OPTIONS[0].value);
    });

    it('ArrowDown should select next option', () => {
      const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.value()).toBe(OPTIONS[1].value);
    });

    it('ArrowUp should select previous option', () => {
      component.writeValue(OPTIONS[1].value);
      const ev = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.value()).toBe(OPTIONS[0].value);
    });

    it('ArrowDown on last option should wrap to first', () => {
      component.writeValue(OPTIONS[OPTIONS.length - 1].value);
      const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKey(ev);
      expect(component.value()).toBe(OPTIONS[0].value);
    });

    it('ArrowUp on first option should wrap to last', () => {
      component.writeValue(OPTIONS[0].value);
      const ev = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKey(ev);
      expect(component.value()).toBe(OPTIONS[OPTIONS.length - 1].value);
    });

    it('Enter should select current option and close', () => {
      const changeSpy = jest.fn();
      component.registerOnChange(changeSpy);
      const ev = new KeyboardEvent('keydown', { key: 'Enter' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.isOpen()).toBe(false);
      expect(changeSpy).toHaveBeenCalledWith(OPTIONS[0].value);
    });

    it('Escape should close the dropdown', () => {
      expect(component.isOpen()).toBe(true);
      const ev = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKey(ev);
      expect(component.isOpen()).toBe(false);
    });

    it('should not handle keys when panel is closed', () => {
      component.isOpen.set(false);
      const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKey(ev);
      expect(component.value()).toBe(OPTIONS[0].value);
    });
  });

  it('onOptionSpace should select non-disabled option', () => {
    const ev = new KeyboardEvent('keydown', { key: ' ' });
    jest.spyOn(ev, 'preventDefault');
    const changeSpy = jest.fn();
    component.registerOnChange(changeSpy);
    component.onOptionSpace(ev, { value: OPTIONS[1].value });
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(changeSpy).toHaveBeenCalledWith(OPTIONS[1].value);
  });

  it('onOptionSpace should not select disabled option', () => {
    const ev = new KeyboardEvent('keydown', { key: ' ' });
    const changeSpy = jest.fn();
    component.registerOnChange(changeSpy);
    component.onOptionSpace(ev, { value: 'x', disabled: true });
    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('selectContolClasses should return class string', () => {
    const classes = component.selectContolClasses();
    expect(classes).toContain('dcx-ng-select__control');
  });

  it('should use valueInput on init when no form value', () => {
    const f = TestBed.createComponent(DcxNgSelectComponent);
    f.componentRef.setInput('options', OPTIONS);
    f.componentRef.setInput('valueInput', OPTIONS[1].value);
    f.detectChanges();
    expect(f.componentInstance.value()).toBe(OPTIONS[1].value);
  });

  it('toggle with searchable should focus search input', () => {
    fixture.componentRef.setInput('searchable', true);
    fixture.detectChanges();
    component.toggle();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);
  });

  it('toggle should scroll to selected option when open', () => {
    Element.prototype.scrollIntoView = jest.fn();
    component.writeValue(OPTIONS[1].value);
    component.toggle();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);
  });

  describe('boolean string transforms', () => {
    it('should transform empty string to true for searchable', () => {
      fixture.componentRef.setInput('searchable', '');
      fixture.detectChanges();
      expect(component.searchable()).toBe(true);
    });

    it('should transform empty string to true for clearable', () => {
      fixture.componentRef.setInput('clearable', '');
      fixture.detectChanges();
      expect(component.clearable()).toBe(true);
    });

    it('should transform empty string to true for disabled', () => {
      fixture.componentRef.setInput('disabled', '');
      fixture.detectChanges();
      expect(component.disabled()).toBe(true);
    });

    it('should transform empty string to true for required', () => {
      fixture.componentRef.setInput('required', '');
      fixture.detectChanges();
      expect(component.required()).toBe(true);
    });

    it('should transform empty string to true for isInvalid', () => {
      fixture.componentRef.setInput('isInvalid', '');
      fixture.detectChanges();
      expect(component.isInvalid()).toBe(true);
    });

    it('should transform non-empty string to false for searchable', () => {
      fixture.componentRef.setInput('searchable', 'false');
      fixture.detectChanges();
      expect(component.searchable()).toBe(false);
    });
  });
});

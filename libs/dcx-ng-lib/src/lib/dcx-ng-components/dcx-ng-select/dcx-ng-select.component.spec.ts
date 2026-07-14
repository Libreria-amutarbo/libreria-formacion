import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSelectComponent } from './dcx-ng-select.component';
import { By } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DcxSelectOptions } from '../../core/interfaces';
import { OPTIONS, PLACEHOLDER } from '@dcx-ng-components/dcx-ng-lib';

const OPTIONS_WITH_DISABLED: DcxSelectOptions[] = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B', disabled: true },
  { value: 'c', label: 'C' },
];

describe('DcxNgSelectComponent', () => {
  let component: DcxNgSelectComponent;
  let fixture: ComponentFixture<DcxNgSelectComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  // El panel se renderiza vía CDK Overlay (portal a document.body), fuera
  // del árbol del fixture — se consulta a través del overlay container.
  const panelOptions = () =>
    Array.from(
      overlayContainerElement.querySelectorAll('.dcx-ng-select__option'),
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSelectComponent);
    component = fixture.componentInstance;

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture.componentRef.setInput('options', OPTIONS);
    fixture.componentRef.setInput('placeholder', PLACEHOLDER);
    fixture.detectChanges();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
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
    const options = panelOptions();
    expect(options.length).toBe(OPTIONS.length);
    expect(options[0].textContent?.trim()).toBe(OPTIONS[0].label);
    expect(options[1].textContent?.trim()).toBe(OPTIONS[1].label);
  });

  it('should remove the panel from the DOM when closed', () => {
    component.toggle();
    fixture.detectChanges();
    expect(panelOptions().length).toBeGreaterThan(0);

    component.toggle();
    fixture.detectChanges();
    expect(panelOptions().length).toBe(0);
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

  it('should set value to null via writeValue', () => {
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

  it('selectControlClasses should return class string', () => {
    const classes = component.selectControlClasses();
    expect(classes).toContain('dcx-ng-select__control');
  });

  it('should use valueInput on init when no form value', () => {
    const f = TestBed.createComponent(DcxNgSelectComponent);
    f.componentRef.setInput('options', OPTIONS);
    f.componentRef.setInput('valueInput', OPTIONS[1].value);
    f.detectChanges();
    expect(f.componentInstance.value()).toBe(OPTIONS[1].value);
  });

  it('should update value() when valueInput changes after initialization (no form)', () => {
    fixture.componentRef.setInput('valueInput', OPTIONS[0].value);
    fixture.detectChanges();
    expect(component.value()).toBe(OPTIONS[0].value);

    fixture.componentRef.setInput('valueInput', OPTIONS[1].value);
    fixture.detectChanges();
    expect(component.value()).toBe(OPTIONS[1].value);
  });

  it('should not override a form-driven value when valueInput changes later', () => {
    component.writeValue(OPTIONS[0].value);
    fixture.componentRef.setInput('valueInput', OPTIONS[1].value);
    fixture.detectChanges();
    expect(component.value()).toBe(OPTIONS[0].value);
  });

  it('toggle with searchable should focus search input', () => {
    fixture.componentRef.setInput('searchable', true);
    fixture.detectChanges();
    component.toggle();
    fixture.detectChanges();
    expect(component.isOpen()).toBe(true);
  });

  it('toggle should scroll to the active option when open', () => {
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

  describe('keyboard navigation (onKey) — panel open', () => {
    beforeEach(() => {
      component.writeValue(OPTIONS[0].value);
      fixture.detectChanges();
      component.toggle();
      fixture.detectChanges();
    });

    it('ArrowDown should move activeIndex to the next option without changing value', () => {
      const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.activeIndex()).toBe(1);
      expect(component.value()).toBe(OPTIONS[0].value);
    });

    it('ArrowUp should move activeIndex to the previous option without changing value', () => {
      const ev = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.activeIndex()).toBe(OPTIONS.length - 1);
      expect(component.value()).toBe(OPTIONS[0].value);
    });

    it('ArrowDown should wrap back to the first option', () => {
      for (let i = 0; i < OPTIONS.length; i++) {
        component.onKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      }
      expect(component.activeIndex()).toBe(0);
    });

    it('Home should move activeIndex to the first option', () => {
      component.onKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      const ev = new KeyboardEvent('keydown', { key: 'Home' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.activeIndex()).toBe(0);
    });

    it('End should move activeIndex to the last option', () => {
      const ev = new KeyboardEvent('keydown', { key: 'End' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.activeIndex()).toBe(OPTIONS.length - 1);
    });

    it('Enter should confirm the active option and close', () => {
      const changeSpy = jest.fn();
      component.registerOnChange(changeSpy);
      component.onKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      const ev = new KeyboardEvent('keydown', { key: 'Enter' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.isOpen()).toBe(false);
      expect(changeSpy).toHaveBeenCalledWith(OPTIONS[1].value);
    });

    it('Escape should close the dropdown and return focus to the control', () => {
      expect(component.isOpen()).toBe(true);
      const control = fixture.debugElement.query(
        By.css('.dcx-ng-select__control'),
      ).nativeElement as HTMLElement;
      const ev = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKey(ev);
      expect(component.isOpen()).toBe(false);
      expect(document.activeElement).toBe(control);
    });
  });

  describe('keyboard navigation (onKey) — panel closed', () => {
    it('ArrowDown should open the panel', () => {
      expect(component.isOpen()).toBe(false);
      const ev = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      jest.spyOn(ev, 'preventDefault');
      component.onKey(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      expect(component.isOpen()).toBe(true);
    });

    it('ArrowUp should open the panel', () => {
      component.onKey(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      expect(component.isOpen()).toBe(true);
    });

    it('should ignore other keys when panel is closed', () => {
      component.onKey(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(component.isOpen()).toBe(false);
    });
  });

  it('should skip disabled options when navigating with ArrowDown', () => {
    fixture.componentRef.setInput('options', OPTIONS_WITH_DISABLED);
    fixture.detectChanges();
    component.toggle();
    fixture.detectChanges();
    component.onKey(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(component.activeIndex()).toBe(2);
  });

  describe('click outside (CDK Overlay outsidePointerEvents)', () => {
    it('should close the panel when clicking outside the component', () => {
      component.toggle();
      fixture.detectChanges();
      expect(component.isOpen()).toBe(true);

      const outsideEl = document.createElement('div');
      document.body.appendChild(outsideEl);
      outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
      document.body.removeChild(outsideEl);
    });

    it('should not close the panel when clicking inside the panel', () => {
      component.toggle();
      fixture.detectChanges();

      const optionEl = panelOptions()[0];
      optionEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      fixture.detectChanges();

      // El propio click en la opción confirma la selección y cierra —
      // pero no debe pasar por el camino de "click fuera".
      expect(component.value()).toBe(OPTIONS[0].value);
    });
  });

  describe('Accessibility (WCAG AA)', () => {
    it('should set aria-activedescendant to the active option id when open', () => {
      component.toggle();
      fixture.detectChanges();
      const control = fixture.debugElement.query(
        By.css('.dcx-ng-select__control'),
      ).nativeElement as HTMLElement;
      const activeId = `${component.selectId}-opt-${component.activeIndex()}`;
      expect(control.getAttribute('aria-activedescendant')).toBe(activeId);
    });

    it('should not set aria-activedescendant when the panel is closed', () => {
      const control = fixture.debugElement.query(
        By.css('.dcx-ng-select__control'),
      ).nativeElement as HTMLElement;
      expect(control.hasAttribute('aria-activedescendant')).toBe(false);
    });

    it('should set aria-disabled and tabindex -1 on the control when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const control = fixture.debugElement.query(
        By.css('.dcx-ng-select__control'),
      ).nativeElement as HTMLElement;
      expect(control.getAttribute('aria-disabled')).toBe('true');
      expect(control.getAttribute('tabindex')).toBe('-1');
    });

    it('should set tabindex 0 on the control when enabled', () => {
      const control = fixture.debugElement.query(
        By.css('.dcx-ng-select__control'),
      ).nativeElement as HTMLElement;
      expect(control.getAttribute('tabindex')).toBe('0');
    });

    it('should apply the accessible name to the clear button inner <button>', () => {
      component.selectOption({ value: OPTIONS[0].value });
      fixture.componentRef.setInput('clearable', true);
      fixture.detectChanges();
      const btn = fixture.debugElement.query(
        By.css('.dcx-ng-select__clear-btn button'),
      ).nativeElement as HTMLButtonElement;
      expect(btn.getAttribute('aria-label')).toBe('Borrar selección');
    });

    it('should render the chevron as a non-interactive icon with no wrapping button', () => {
      const chevron = fixture.debugElement.query(
        By.css('.dcx-ng-select__chevron'),
      );
      expect(chevron.nativeElement.tagName.toLowerCase()).toBe('dcx-ng-icon');
      expect(chevron.nativeElement.querySelector('button')).toBeNull();
    });

    it('should apply aria-label to the control when there is no visible label', () => {
      fixture.componentRef.setInput('ariaLabel', 'Selecciona país');
      fixture.detectChanges();
      const control = fixture.debugElement.query(
        By.css('.dcx-ng-select__control'),
      ).nativeElement as HTMLElement;
      expect(control.getAttribute('aria-label')).toBe('Selecciona país');
    });

    it('should not apply aria-label when a visible label is present', () => {
      fixture.componentRef.setInput('label', 'País');
      fixture.componentRef.setInput('ariaLabel', 'Selecciona país');
      fixture.detectChanges();
      const control = fixture.debugElement.query(
        By.css('.dcx-ng-select__control'),
      ).nativeElement as HTMLElement;
      expect(control.hasAttribute('aria-label')).toBe(false);
    });

    it('should not set tabindex on options', () => {
      component.toggle();
      fixture.detectChanges();
      panelOptions().forEach(o =>
        expect(o.hasAttribute('tabindex')).toBe(false),
      );
    });

    it('should render the panel with role="listbox" inside the overlay container', () => {
      component.toggle();
      fixture.detectChanges();
      const panel = overlayContainerElement.querySelector(
        '.dcx-ng-select__panel',
      );
      expect(panel?.getAttribute('role')).toBe('listbox');
    });
  });
});

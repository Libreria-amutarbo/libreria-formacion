import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgCheckboxComponent } from './dcx-ng-checkbox.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import {
  CHECKBOX_OPTIONS,
  CHECKBOX_OPTIONS_WITH_DISABLED,
  CHECKBOX_SINGLE_OPTION,
} from '../../core/mock';

describe('DcxNgCheckboxComponent', () => {
  let component: DcxNgCheckboxComponent;
  let fixture: ComponentFixture<DcxNgCheckboxComponent>;
  let componentRef: ComponentRef<DcxNgCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgCheckboxComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(DcxNgCheckboxComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('label', 'Acepto términos');
    componentRef.setInput('checked', false);
    fixture.detectChanges();
  });

  it('debe mostrar el label', () => {
    componentRef.setInput('label', 'Recibir notificaciones');
    fixture.detectChanges();
    const labelDebug = fixture.debugElement.query(By.css('.dcx-checkbox-text'));
    expect(labelDebug).toBeTruthy();
    const label = labelDebug.nativeElement;
    expect(label.textContent).toContain('Recibir notificaciones');
  });

  it('debe emitir checkedChange al hacer click', () => {
    const spy = jest.spyOn(component.checkedChange, 'emit');
    const button = fixture.debugElement.query(By.css('button.dcx-checkbox-container'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('no debe emitir si está deshabilitado', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const spy = jest.spyOn(component.checkedChange, 'emit');
    const button = fixture.debugElement.query(By.css('button.dcx-checkbox-container'));
    button.nativeElement.click();
    expect(spy).not.toHaveBeenCalled();
  });

  it('debe mostrar la V cuando checked=true', () => {
    componentRef.setInput('checked', true);
    fixture.detectChanges();
    const check = fixture.debugElement.query(By.css('.dcx-checkbox-check'));
    expect(check).toBeTruthy();
  });

  it('debe trabajar con grupos de opciones', () => {
    componentRef.setInput('groupLabel', 'Selecciona tus intereses');
    componentRef.setInput('options', CHECKBOX_OPTIONS);
    componentRef.setInput('selectedValues', ['opt1']);
    fixture.detectChanges();

    const groupLabel = fixture.debugElement.query(By.css('.dcx-checkbox-group__label'));
    expect(groupLabel).toBeTruthy();
    expect(groupLabel.nativeElement.textContent).toContain('Selecciona tus intereses');

    const options = fixture.debugElement.queryAll(By.css('.dcx-checkbox-label'));
    expect(options.length).toBe(2);
  });

  it('debe manejar opciones deshabilitadas en grupos', () => {
    componentRef.setInput('options', CHECKBOX_OPTIONS_WITH_DISABLED);
    componentRef.setInput('selectedValues', []);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button.dcx-checkbox-container'));
    expect(buttons[0].nativeElement.disabled).toBe(false);
    expect(buttons[1].nativeElement.disabled).toBe(true);
  });

  it('debe emitir selectionChange en grupo al hacer click', () => {
    componentRef.setInput('options', CHECKBOX_SINGLE_OPTION);
    componentRef.setInput('selectedValues', []);
    componentRef.setInput('multiple', true);
    fixture.detectChanges();

    const spy = jest.spyOn(component.selectionChange, 'emit');
    const button = fixture.debugElement.query(By.css('button.dcx-checkbox-container'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(['opt1']);
  });

  it('debe cambiar posición del label', () => {
    componentRef.setInput('label', 'Etiqueta a la izquierda');
    componentRef.setInput('labelPosition', 'left');
    fixture.detectChanges();

    const labelContainer = fixture.debugElement.query(By.css('.dcx-checkbox-label'));
    expect(labelContainer.nativeElement.classList.contains('label-left')).toBe(true);
  });

  describe('ControlValueAccessor', () => {
    it('writeValue should set internal checked for single checkbox', () => {
      component.writeValue(true);
      fixture.detectChanges();
      expect(component.isCheckedComputed()).toBe(true);
    });

    it('writeValue should set internal checked false for falsy value', () => {
      component.writeValue(false);
      fixture.detectChanges();
      expect(component.isCheckedComputed()).toBe(false);
    });

    it('writeValue for group should set internal selected values from array', () => {
      componentRef.setInput('options', CHECKBOX_OPTIONS);
      fixture.detectChanges();
      component.writeValue(['opt1']);
      expect(component.isChecked('opt1')).toBe(true);
      expect(component.isChecked('opt2')).toBe(false);
    });

    it('writeValue for group with non-array should set empty array', () => {
      componentRef.setInput('options', CHECKBOX_SINGLE_OPTION);
      fixture.detectChanges();
      component.writeValue(true as unknown as string[]);
      expect(component.isChecked('opt1')).toBe(false);
    });

    it('registerOnChange should store the callback', () => {
      const cb = jest.fn();
      component.registerOnChange(cb);
      component.onToggle();
      expect(cb).toHaveBeenCalled();
    });

    it('registerOnTouched should store the callback', () => {
      const cb = jest.fn();
      component.registerOnTouched(cb);
      component.onToggle();
      expect(cb).toHaveBeenCalled();
    });

    it('setDisabledState should disable the checkbox via containerClasses', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      // Single checkbox uses CSS class for disabled, not button[disabled]
      expect(component.containerClasses()).toContain('disabled');
    });

    it('setDisabledState false should re-enable the checkbox', () => {
      component.setDisabledState(true);
      component.setDisabledState(false);
      fixture.detectChanges();
      expect(component.containerClasses()).not.toContain('disabled');
    });
  });

  describe('Group mode - onGroupCheckboxChange', () => {
    beforeEach(() => {
      componentRef.setInput('options', CHECKBOX_OPTIONS);
      componentRef.setInput('selectedValues', []);
      componentRef.setInput('multiple', true);
      fixture.detectChanges();
    });

    it('should add value when checking in multiple mode', () => {
      const spy = jest.spyOn(component.selectionChange, 'emit');
      component.onGroupCheckboxChange('opt1', true);
      expect(spy).toHaveBeenCalledWith(['opt1']);
    });

    it('should remove value when unchecking in multiple mode', () => {
      componentRef.setInput('selectedValues', ['opt1', 'opt2']);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectionChange, 'emit');
      component.onGroupCheckboxChange('opt1', false);
      expect(spy).toHaveBeenCalledWith(['opt2']);
    });

    it('should set single value in single mode when checking', () => {
      componentRef.setInput('multiple', false);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectionChange, 'emit');
      component.onGroupCheckboxChange('opt1', true);
      expect(spy).toHaveBeenCalledWith(['opt1']);
    });

    it('should clear selection in single mode when unchecking', () => {
      componentRef.setInput('multiple', false);
      componentRef.setInput('selectedValues', ['opt1']);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectionChange, 'emit');
      component.onGroupCheckboxChange('opt1', false);
      expect(spy).toHaveBeenCalledWith([]);
    });

    it('should not change when option is disabled', () => {
      componentRef.setInput('options', [{ value: 'opt1', label: 'Opción 1', disabled: true }]);
      fixture.detectChanges();
      const spy = jest.spyOn(component.selectionChange, 'emit');
      component.onGroupCheckboxChange('opt1', true);
      expect(spy).not.toHaveBeenCalled();
    });

    it('isOptionDisabled returns true when global disabled', () => {
      componentRef.setInput('disabled', true);
      fixture.detectChanges();
      expect(component.isOptionDisabled({ value: 'opt1', label: 'Opción 1' })).toBe(true);
    });

    it('isOptionDisabled returns true when option.disabled', () => {
      expect(component.isOptionDisabled({ value: 'opt1', label: 'Opción 1', disabled: true })).toBe(true);
    });

    it('isOptionDisabled returns false when not disabled', () => {
      expect(component.isOptionDisabled({ value: 'opt1', label: 'Opción 1' })).toBe(false);
    });
  });

  describe('onToggle - edge cases', () => {
    it('should not toggle when disabled by form (setDisabledState)', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      const spy = jest.spyOn(component.checkedChange, 'emit');
      component.onToggle();
      expect(spy).not.toHaveBeenCalled();
    });

    it('should toggle from true to false', () => {
      componentRef.setInput('checked', true);
      fixture.detectChanges();
      const spy = jest.spyOn(component.checkedChange, 'emit');
      component.onToggle();
      expect(spy).toHaveBeenCalledWith(false);
    });
  });

  describe('isOptionDisabled with form disabled', () => {
    it('isOptionDisabled returns true when _isDisabledByForm is true (disabled input is false)', () => {
      // disabled() is false, but _isDisabledByForm() is true via setDisabledState
      component.setDisabledState(true);
      fixture.detectChanges();
      expect(component.isOptionDisabled({ value: 'opt1', label: 'Option 1' })).toBe(true);
    });
  });
});

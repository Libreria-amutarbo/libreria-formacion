import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgCheckboxComponent } from './dcx-ng-checkbox.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';

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
    componentRef.setInput('label', 'Prueba');
    componentRef.setInput('checked', false);
    fixture.detectChanges();
  });

  it('debe mostrar el label', () => {
    componentRef.setInput('label', 'Prueba');
    fixture.detectChanges();
    const labelDebug = fixture.debugElement.query(By.css('.dcx-checkbox-text'));
    expect(labelDebug).toBeTruthy();
    const label = labelDebug.nativeElement;
    expect(label.textContent).toContain('Prueba');
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
    componentRef.setInput('groupLabel', 'Test Group');
    componentRef.setInput('options', [
      { value: 'opt1', label: 'Opción 1' },
      { value: 'opt2', label: 'Opción 2' }
    ]);
    componentRef.setInput('selectedValues', ['opt1']);
    fixture.detectChanges();

    const groupLabel = fixture.debugElement.query(By.css('.dcx-checkbox-group__label'));
    expect(groupLabel).toBeTruthy();
    expect(groupLabel.nativeElement.textContent).toContain('Test Group');

    const options = fixture.debugElement.queryAll(By.css('.dcx-checkbox-label'));
    expect(options.length).toBe(2);
  });

  it('debe manejar opciones deshabilitadas en grupos', () => {
    componentRef.setInput('options', [
      { value: 'opt1', label: 'Opción 1' },
      { value: 'opt2', label: 'Opción 2', disabled: true }
    ]);
    componentRef.setInput('selectedValues', []);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button.dcx-checkbox-container'));
    expect(buttons[0].nativeElement.disabled).toBe(false);
    expect(buttons[1].nativeElement.disabled).toBe(true);
  });

  it('debe emitir selectionChange en grupo al hacer click', () => {
    componentRef.setInput('options', [
      { value: 'opt1', label: 'Opción 1' }
    ]);
    componentRef.setInput('selectedValues', []);
    componentRef.setInput('multiple', true);
    fixture.detectChanges();

    const spy = jest.spyOn(component.selectionChange, 'emit');
    const button = fixture.debugElement.query(By.css('button.dcx-checkbox-container'));
    button.nativeElement.click();
    expect(spy).toHaveBeenCalledWith(['opt1']);
  });

  it('debe cambiar posición del label', () => {
    componentRef.setInput('label', 'Test');
    componentRef.setInput('labelPosition', 'left');
    fixture.detectChanges();

    const labelContainer = fixture.debugElement.query(By.css('.dcx-checkbox-label'));
    expect(labelContainer.nativeElement.classList.contains('label-left')).toBe(true);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgCheckboxComponent } from './dcx-ng-checkbox.component';
import { By } from '@angular/platform-browser';
import { ComponentRef } from '@angular/core';
import { DcxCheckbox } from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgCheckboxComponent', () => {
  let component: DcxNgCheckboxComponent;
  let fixture: ComponentFixture<DcxNgCheckboxComponent>;
  let componentRef: ComponentRef<DcxNgCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgCheckboxComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DcxNgCheckboxComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('debe mostrar opciones de checkbox', () => {
    const options: DcxCheckbox[] = [
      { id: '1', label: 'Recibir notificaciones', value: false },
      { id: '2', label: 'Aceptar términos', value: true },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const labels = fixture.debugElement.queryAll(By.css('.dcx-checkbox-text'));
    expect(labels.length).toBe(2);
    expect(labels[0].nativeElement.textContent).toContain(
      'Recibir notificaciones',
    );
    expect(labels[1].nativeElement.textContent).toContain('Aceptar términos');
  });

  it('debe emitir changeOptions al hacer click en una opción', () => {
    const options: DcxCheckbox[] = [
      { id: '1', label: 'Opción 1', value: false },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const spy = jest.spyOn(component.changeOptions, 'emit');
    const button = fixture.debugElement.query(By.css('dcx-ng-button'));
    button.componentInstance.buttonClick.emit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
    const emittedOptions = spy.mock.calls[0][0];
    expect(emittedOptions[0].value).toBe(null);
  });

  it('no debe permitir clicks en opciones deshabilitadas', () => {
    const options: DcxCheckbox[] = [
      { id: '1', label: 'Opción deshabilitada', value: false, disabled: true },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('dcx-ng-button'));
    expect(button.componentInstance.disabled).toBe(true);
  });

  it('debe manejar el estado tri-estado (true -> false -> null -> true)', () => {
    const options: DcxCheckbox[] = [
      { id: '1', label: 'Tri-estado', value: true },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const spy = jest.spyOn(component.changeOptions, 'emit');

    // Click 1: true -> false
    let button = fixture.debugElement.query(By.css('dcx-ng-button'));
    button.componentInstance.buttonClick.emit();
    fixture.detectChanges();
    let emittedOptions = spy.mock.calls[0][0];
    expect(emittedOptions[0].value).toBe(false);

    // Click 2: false -> null
    button = fixture.debugElement.query(By.css('dcx-ng-button'));
    button.componentInstance.buttonClick.emit();
    fixture.detectChanges();
    emittedOptions = spy.mock.calls[1][0];
    expect(emittedOptions[0].value).toBeNull();

    // Click 3: null -> true
    button = fixture.debugElement.query(By.css('dcx-ng-button'));
    button.componentInstance.buttonClick.emit();
    fixture.detectChanges();
    emittedOptions = spy.mock.calls[2][0];
    expect(emittedOptions[0].value).toBe(true);
  });

  it('debe mostrar múltiples opciones con diferentes estados', () => {
    const options: DcxCheckbox[] = [
      { id: '1', label: 'Opción 1', value: true },
      { id: '2', label: 'Opción 2', value: false },
      { id: '3', label: 'Opción 3', value: null },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('dcx-ng-button'));
    expect(buttons.length).toBe(3);
    expect(buttons[0].componentInstance.iconName).toBe('check');
    expect(buttons[1].componentInstance.iconName).toBe('dash');
    expect(buttons[2].componentInstance.iconName).toBe('');
  });

  it('debe manejar opciones con mensajes de error', () => {
    const options: DcxCheckbox[] = [
      {
        id: '1',
        label: 'Opción con error',
        value: false,
        error: true,
        errorMessage: 'Campo requerido',
      },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const errorMessage = fixture.debugElement.query(
      By.css('.dcx-ng-checkbox__error'),
    );
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('Campo requerido');
  });

  it('debe respeta la posición del label', () => {
    const options: DcxCheckbox[] = [
      {
        id: '1',
        label: 'Label a la derecha',
        value: false,
        labelPosition: 'right',
      },
      {
        id: '2',
        label: 'Label a la izquierda',
        value: false,
        labelPosition: 'left',
      },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const labels = fixture.debugElement.queryAll(By.css('.dcx-checkbox-label'));
    expect(labels[0].nativeElement.classList.contains('label-left')).toBe(
      false,
    );
    expect(labels[1].nativeElement.classList.contains('label-left')).toBe(true);
  });

  it('debe mostrar asterisco para opciones requeridas', () => {
    const options: DcxCheckbox[] = [
      { id: '1', label: 'Opción requerida', value: false, required: true },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const requiredMark = fixture.debugElement.query(
      By.css('.dcx-ng-checkbox__required'),
    );
    expect(requiredMark).toBeTruthy();
    expect(requiredMark.nativeElement.textContent).toBe('*');
  });

  it('debe cambiar la variante del botón según el valor', () => {
    const options: DcxCheckbox[] = [
      { id: '1', label: 'Seleccionado', value: true },
      { id: '2', label: 'No seleccionado', value: null },
    ];
    componentRef.setInput('options', options);
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('dcx-ng-button'));
    expect(buttons[0].componentInstance.variant).toBe('primary');
    expect(buttons[1].componentInstance.variant).toBe('secondary');
  });
});

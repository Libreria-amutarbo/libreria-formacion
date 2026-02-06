import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgRadioComponent } from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgRadioComponent', () => {
  let component: DcxNgRadioComponent;
  let fixture: ComponentFixture<DcxNgRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgRadioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgRadioComponent);
    component = fixture.componentInstance;
  });

  it('debe renderizar el label', () => {
    fixture.componentRef.setInput('label', 'Opción 1');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('span');
    expect(label.textContent).toContain('Opción 1');
  });

  it('debe aplicar la clase de tamaño', () => {
    fixture.componentRef.setInput('size', 's');
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label');
    expect(label.className).toContain('dcx-ng-radio--s');
  });

  it('debe marcar el radio cuando el valor coincide', () => {
    fixture.componentRef.setInput('value', 'valor1');
    component.writeValue('valor1');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type=radio]');
    expect(input.checked).toBe(true);
  });

  it('debe deshabilitar el input si disabled es true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type=radio]');
    expect(input.disabled).toBe(true);
  });
  it('debe llamar a onChange y onTouched al cambiar', () => {
    const onChangeSpy = jest.fn();
    const onTouchedSpy = jest.fn();
    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);
    fixture.componentRef.setInput('value', 'valor2');
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input[type=radio]'));
    input.triggerEventHandler('change', {});
    expect(onChangeSpy).toHaveBeenCalledWith('valor2');
    expect(onTouchedSpy).toHaveBeenCalled();
  });
});
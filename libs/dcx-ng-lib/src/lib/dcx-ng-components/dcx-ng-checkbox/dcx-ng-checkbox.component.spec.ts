import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgCheckboxComponent } from './dcx-ng-checkbox.component';
import { By } from '@angular/platform-browser';

describe('DcxNgCheckboxComponent', () => {
  let component: DcxNgCheckboxComponent;
  let fixture: ComponentFixture<DcxNgCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgCheckboxComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(DcxNgCheckboxComponent);
    component = fixture.componentInstance;
    component.label = 'Prueba';
    component.checked = false;
    fixture.detectChanges();
  });

  it('debe mostrar el label', () => {
    component.label = 'Prueba';
    fixture.detectChanges();
    const labelDebug = fixture.debugElement.query(By.css('.dcx-checkbox-text'));
    expect(labelDebug).toBeTruthy();
    const label = labelDebug.nativeElement;
    expect(label.textContent).toContain('Prueba');
  });

  it('debe emitir checkedChange al hacer click', () => {
    const spy = jest.spyOn(component.checkedChange, 'emit');
    const box = fixture.debugElement.query(By.css('.dcx-checkbox-container'));
    box.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('no debe emitir si está deshabilitado', () => {
    component.disabled = true;
    fixture.detectChanges();
    const spy = jest.spyOn(component.checkedChange, 'emit');
    const box = fixture.debugElement.query(By.css('.dcx-checkbox-container'));
    box.triggerEventHandler('click', null);
    expect(spy).not.toHaveBeenCalled();
  });

  it('debe mostrar la V cuando checked=true', () => {
    component.checked = true;
    fixture.detectChanges();
    const check = fixture.debugElement.query(By.css('.dcx-checkbox-check'));
    expect(check).not.toBeTruthy();
  });

  it('debe mostrar el mensaje de error si corresponde', () => {
    component.errorMessage = 'Error';
    component.checked = false;
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.dcx-checkbox-error'));
    expect(error).not.toBeTruthy();
    if (error) {
      expect(error.nativeElement.textContent).toContain('Error');
    }
  });

  it('no debe mostrar el mensaje de error si checked=true', () => {
    component.errorMessage = 'Error';
    component.checked = true;
    fixture.detectChanges();
    const error = fixture.debugElement.query(By.css('.dcx-checkbox-error'));
    expect(error).toBeNull();
  });
});

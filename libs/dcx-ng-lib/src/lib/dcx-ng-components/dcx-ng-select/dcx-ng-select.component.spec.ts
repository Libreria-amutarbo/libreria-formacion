import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSelectComponent } from './dcx-ng-select.component';
import { By } from '@angular/platform-browser';

describe('DcxNgSelectComponent', () => {
  let component: DcxNgSelectComponent;
  let fixture: ComponentFixture<DcxNgSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSelectComponent);
    component = fixture.componentInstance;

    component.options = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ];
    component.placeholder = 'Select an option';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all options including placeholder', () => {
    const options = fixture.debugElement.queryAll(By.css('option'));
    expect(options.length).toBe(3); // 2 options + 1 placeholder

    expect(options[0].nativeElement.textContent.trim()).toBe('Select an option');
    expect(options[0].nativeElement.disabled).toBe(true);
    expect(options[0].nativeElement.hidden).toBe(true);

    expect(options[1].nativeElement.textContent.trim()).toBe('Option 1');
    expect(options[2].nativeElement.textContent.trim()).toBe('Option 2');
  });

  it('should set aria-label correctly', () => {
    component.ariaLabel = 'Test Select';
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(select.getAttribute('aria-label')).toBe('Test Select');
  });

  it('should reflect selected value in the DOM', () => {
    component.writeValue('2');
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(select.value).toBe('2');
  });

  it('should call onChange when value changes', () => {
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    const spy = jest.spyOn(component as any, 'onChange');

    select.value = '1';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should call onTouched on blur', () => {
    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    const spy = jest.spyOn(component as any, 'onTouched');

    select.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should disable the select when disabled input is true', () => {
    component.setDisabledState?.(true);
    fixture.detectChanges();

    const select = fixture.debugElement.query(By.css('select')).nativeElement;
    expect(select.disabled).toBe(true);
  });
});
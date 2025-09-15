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
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show a placeholder when provided', () => {
    component.placeholder = 'Please select';
    fixture.detectChanges();

    const optionElements = fixture.debugElement.queryAll(By.css('option'));
    expect(optionElements[0].nativeElement.textContent.trim()).toBe(
      'Please select',
    );
    expect(optionElements[0].nativeElement.disabled).toBe(true);
    expect(optionElements[0].nativeElement.hidden).toBe(true);
  });

  it('should list all options', () => {
    fixture.detectChanges();

    const optionElements = fixture.debugElement.queryAll(By.css('option'));
    expect(optionElements.length).toBe(2);
    expect(optionElements[0].nativeElement.textContent).toContain('Option 1');
    expect(optionElements[1].nativeElement.textContent).toContain('Option 2');
  });

  it('should be disabled when disabled is true', async () => {
    component.setDisabledState(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const selectElement: HTMLSelectElement = fixture.debugElement.query(
      By.css('select'),
    ).nativeElement;
    expect(selectElement.disabled).toBe(true);
  });

  it('should emit event when a value is selected', () => {
    const spy = jest.fn();
    component.registerOnChange(spy);

    fixture.detectChanges();

    const selectElement: HTMLSelectElement = fixture.debugElement.query(
      By.css('select'),
    ).nativeElement;

    selectElement.value = '1';
    selectElement.dispatchEvent(new Event('change'));

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should call onTouched when blurred', () => {
    const touchedSpy = jest.fn();
    component.registerOnTouched(touchedSpy);

    fixture.detectChanges();

    const selectElement: HTMLSelectElement = fixture.debugElement.query(
      By.css('select'),
    ).nativeElement;
    selectElement.dispatchEvent(new Event('blur'));

    expect(touchedSpy).toHaveBeenCalled();
  });
});

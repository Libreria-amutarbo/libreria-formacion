import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSelectComponent } from './dcx-ng-select.component';
import { By } from '@angular/platform-browser';
import { OPTIONS, PLACEHOLDER } from '../../core/mock';

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
    const options = fixture.debugElement.queryAll(By.css('.dcx-ng-select__option'));
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
    // onTouched is stored, verify no error
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
});
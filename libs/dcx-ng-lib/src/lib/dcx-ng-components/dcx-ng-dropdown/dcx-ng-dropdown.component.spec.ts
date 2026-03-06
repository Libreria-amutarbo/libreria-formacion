import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DcxNgDropdownComponent,
} from './dcx-ng-dropdown.component';
import { DcxDropdownOptions } from '../../core/interfaces';
import { DROPDOWN_OPTIONS, DROPDOWN_OPTIONS_NUMERIC } from '../../core/mock/dropdown';

describe('DcxNgDropdownComponent (Jest)', () => {
  let fixture: ComponentFixture<DcxNgDropdownComponent>;
  let component: DcxNgDropdownComponent;

  const OPTIONS = DROPDOWN_OPTIONS;

  const getHost = () => fixture.nativeElement as HTMLElement;
  // The trigger is a dcx-ng-button component with class dcx-trigger
  const getTriggerButton = () =>
    getHost().querySelector('dcx-ng-button.dcx-trigger button') as HTMLButtonElement | null;
  const getPanel = () =>
    getHost().querySelector('.dcx-panel') as HTMLElement | null;
  const getListItems = () =>
    Array.from(getHost().querySelectorAll('li.dcx-item')) as HTMLLIElement[];
  const getEmptyItem = () =>
    getHost().querySelector('li.dcx-empty') as HTMLLIElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgDropdownComponent);
    component = fixture.componentInstance;
  });

  function setInputs(partial: Partial<DcxNgDropdownComponent>) {
    Object.assign(component, partial);
    fixture.detectChanges();
  }

  it('should create', () => {
    setInputs({ dropdownOptions: OPTIONS });
    expect(component).toBeTruthy();
  });

  it('should show placeholder when no selection', () => {
    setInputs({ dropdownOptions: OPTIONS, placeholder: 'Selecciona...' });
    expect(component.displayLabel()).toBe('Selecciona...');
  });

  it('should open and close the panel with the trigger', () => {
    setInputs({ dropdownOptions: OPTIONS, placeholder: 'Selecciona...' });
    expect(getPanel()).toBeNull();

    component.toggle();
    fixture.detectChanges();
    expect(getPanel()).not.toBeNull();
    expect(getListItems().length).toBe(OPTIONS.length);

    component.toggle();
    fixture.detectChanges();
    expect(getPanel()).toBeNull();
  });

  it('should emit selectedKeyChange and close after selecting an item', () => {
    setInputs({ dropdownOptions: OPTIONS, placeholder: 'Elige' });

    const spy = jest.spyOn(component.selectedKeyChange, 'emit');
    component.toggle();
    fixture.detectChanges();

    const greenOption = OPTIONS.find(o => o.key === 'green')!;
    component.select(greenOption);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('green');
    expect(getPanel()).toBeNull();
    expect(component.displayLabel()).toBe('Verde');
    expect(component.selectedKey).toBe('green');
  });

  it('should not open when disabled = true', () => {
    setInputs({ dropdownOptions: OPTIONS, disabled: true, placeholder: 'X' });

    component.toggle();
    fixture.detectChanges();

    expect(getPanel()).toBeNull();
    expect(component._open()).toBe(false);
  });

  it('should not select nor emit when disabled', () => {
    setInputs({ dropdownOptions: OPTIONS, disabled: true });

    const spy = jest.spyOn(component.selectedKeyChange, 'emit');
    component.select(OPTIONS[0]);
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
    expect(component.selectedKey).toBeNull();
  });

  it('should close when clicking outside (document click)', () => {
    setInputs({ dropdownOptions: OPTIONS });

    component._open.set(true);
    fixture.detectChanges();
    expect(getPanel()).not.toBeNull();

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(getPanel()).toBeNull();
  });

  it('should reflect selectedKey setter from outside', () => {
    setInputs({ dropdownOptions: OPTIONS, placeholder: 'Seleccione' });

    component.selectedKey = 'blue';
    fixture.detectChanges();
    expect(component.displayLabel()).toBe('Azul');
    expect(component.selectedKey).toBe('blue');
  });

  it('should show selected item in open panel', () => {
    setInputs({ dropdownOptions: OPTIONS });
    component.selectedKey = 'blue';
    component._open.set(true);
    fixture.detectChanges();

    const items = getListItems();
    const blueIndex = OPTIONS.findIndex(o => o.key === 'blue');
    expect(items[blueIndex].classList.contains('selected')).toBe(true);
  });

  it('should show empty state when dropdownOptions is empty', () => {
    setInputs({ dropdownOptions: [] });

    component._open.set(true);
    fixture.detectChanges();

    expect(getListItems().length).toBe(0);
    expect(getEmptyItem()).not.toBeNull();
    expect(getEmptyItem()!.textContent?.trim()).toBe('(Sin opciones)');
  });

  it('should update aria-expanded when open changes', () => {
    setInputs({ dropdownOptions: OPTIONS });

    const dcxButton = getHost().querySelector('dcx-ng-button.dcx-trigger') as HTMLElement;
    expect(dcxButton.getAttribute('aria-expanded')).toBe('false');

    component._open.set(true);
    fixture.detectChanges();

    expect(dcxButton.getAttribute('aria-expanded')).toBe('true');

    component._open.set(false);
    fixture.detectChanges();

    expect(dcxButton.getAttribute('aria-expanded')).toBe('false');
  });

  it('should render numeric values using valueToString', () => {
    const numeric = DROPDOWN_OPTIONS_NUMERIC;
    setInputs({ dropdownOptions: numeric, placeholder: 'Elige versiÃ³n' });

    component._open.set(true);
    fixture.detectChanges();

    const items = getListItems();
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('17');
    expect(items[1].textContent).toContain('18');

    component.select(numeric[1]);
    fixture.detectChanges();

    expect(component.selectedKey).toBe('v18');
    expect(component.displayLabel()).toBe('18');
  });

  it('should find option by key', () => {
    setInputs({ dropdownOptions: OPTIONS });
    const found = component.findByKey('green');
    expect(found).toEqual({ key: 'green', value: 'Verde' });
  });

  it('should return undefined for unknown key', () => {
    setInputs({ dropdownOptions: OPTIONS });
    const found = component.findByKey('unknown');
    expect(found).toBeUndefined();
  });

  it('should check isSelected correctly', () => {
    setInputs({ dropdownOptions: OPTIONS });
    component.selectedKey = 'red';
    fixture.detectChanges();
    expect(component.isSelected(OPTIONS[0])).toBe(true);
    expect(component.isSelected(OPTIONS[1])).toBe(false);
  });

  it('should convert values to string', () => {
    setInputs({ dropdownOptions: OPTIONS });
    expect(component.valueToString(42)).toBe('42');
    expect(component.valueToString('hello')).toBe('hello');
  });

  it('should not close when clicking inside the component', () => {
    setInputs({ dropdownOptions: OPTIONS });
    component._open.set(true);
    fixture.detectChanges();

    // click inside the component host element — root.contains(target) is true
    const insideEl = fixture.debugElement.nativeElement;
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: insideEl, writable: false });
    component.onDocumentClick(ev);
    fixture.detectChanges();

    expect(component._open()).toBe(true); // should remain open
  });

  it('should not close when dropdown is already closed', () => {
    setInputs({ dropdownOptions: OPTIONS });
    component._open.set(false);

    const outsideEl = document.createElement('div');
    const ev = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: outsideEl, writable: false });
    component.onDocumentClick(ev);

    expect(component._open()).toBe(false);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DcxNgDropdownComponent,
} from './dcx-ng-dropdown.component';
import { DcxDropdownOptions } from '../../core/interfaces';

describe('DcxNgDropdownComponent (Jest)', () => {
  let fixture: ComponentFixture<DcxNgDropdownComponent>;
  let component: DcxNgDropdownComponent;

  const OPTIONS: DcxDropdownOptions[] = [
    { key: 'red', value: 'Rojo' },
    { key: 'green', value: 'Verde' },
    { key: 'blue', value: 'Azul' },
  ];

  const getHost = () => fixture.nativeElement as HTMLElement;
  const getTrigger = () =>
    getHost().querySelector('button.dcx-trigger') as HTMLButtonElement | null;
  const getPanel = () =>
    getHost().querySelector('.dcx-panel') as HTMLElement | null;
  const getListItems = () =>
    Array.from(getHost().querySelectorAll('li.dcx-item')) as HTMLLIElement[];
  const getEmptyItem = () =>
    getHost().querySelector('li.dcx-empty') as HTMLLIElement | null;
  const getTriggerLabelText = () =>
    (
      getHost().querySelector('.dcx-trigger__label') as HTMLElement | null
    )?.textContent?.trim() ?? '';

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
    setInputs({});
    expect(component).toBeTruthy();
  });

  it('should show placeholder when no selection', () => {
    setInputs({ dropdownOptions: OPTIONS, placeholder: 'Selecciona...' });
    expect(getTriggerLabelText()).toBe('Selecciona...');
  });

  it('should open and close the panel with the trigger', () => {
    setInputs({ dropdownOptions: OPTIONS, placeholder: 'Selecciona...' });
    const trigger = getTrigger()!;
    expect(getPanel()).toBeNull();

    trigger.click();
    fixture.detectChanges();
    expect(getPanel()).not.toBeNull();
    expect(getListItems().length).toBe(OPTIONS.length);

    trigger.click();
    fixture.detectChanges();
    expect(getPanel()).toBeNull();
  });

  it('should emit selectedKeyChange and close after selecting an item', () => {
    setInputs({ dropdownOptions: OPTIONS, placeholder: 'Elige' });

    const spy = jest.spyOn(component.selectedKeyChange, 'emit');
    getTrigger()!.click();
    fixture.detectChanges();

    const items = getListItems();
    const greenIndex = OPTIONS.findIndex(o => o.key === 'green');
    items[greenIndex].click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith('green');
    expect(getPanel()).toBeNull();
    expect(getTriggerLabelText()).toBe('Verde');
    expect(component.selectedKey).toBe('green');
  });

  it('should not open when disabled = true', () => {
    setInputs({ dropdownOptions: OPTIONS, disabled: true, placeholder: 'X' });

    getTrigger()!.click();
    fixture.detectChanges();

    expect(getPanel()).toBeNull();
  });

  it('when opened and then disabled, clicking an item should not select nor emit', () => {
    setInputs({ dropdownOptions: OPTIONS, disabled: false });
    getTrigger()!.click();
    fixture.detectChanges();
    expect(getPanel()).not.toBeNull();

    component.disabled = true;
    fixture.detectChanges();

    const spy = jest.spyOn(component.selectedKeyChange, 'emit');
    const items = getListItems();
    items[0].click();
    fixture.detectChanges();

    expect(spy).not.toHaveBeenCalled();
    expect(component.selectedKey).toBeNull();
  });

  it('should close when clicking outside (document click)', () => {
    setInputs({ dropdownOptions: OPTIONS });

    getTrigger()!.click();
    fixture.detectChanges();
    expect(getPanel()).not.toBeNull();

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(getPanel()).toBeNull();
  });

  it('should reflect selectedKey input from outside', () => {
    setInputs({ dropdownOptions: OPTIONS, placeholder: 'Seleccione' });

    component.selectedKey = 'blue';
    fixture.detectChanges();
    expect(getTriggerLabelText()).toBe('Azul');

    getTrigger()!.click();
    fixture.detectChanges();

    const items = getListItems();
    const blueIndex = OPTIONS.findIndex(o => o.key === 'blue');
    expect(items[blueIndex].classList.contains('selected')).toBe(true);
  });

  it('should show empty state when dropdownOptions is empty', () => {
    setInputs({ dropdownOptions: [] });

    getTrigger()!.click();
    fixture.detectChanges();

    expect(getListItems().length).toBe(0);
    expect(getEmptyItem()).not.toBeNull();
    expect(getEmptyItem()!.textContent?.trim()).toBe('(Sin opciones)');
  });

  it('should update aria-expanded and chevron class', () => {
    setInputs({ dropdownOptions: OPTIONS });

    const chevron = getHost().querySelector(
      '.dcx-trigger__chevron',
    ) as HTMLElement;
    const trigger = getTrigger()!;

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(chevron.classList.contains('open')).toBe(false);

    trigger.click();
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(chevron.classList.contains('open')).toBe(true);

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(chevron.classList.contains('open')).toBe(false);
  });

  it('should render numeric values using valueToString', () => {
    const numeric: DcxDropdownOptions[] = [
      { key: 'v17', value: 17 },
      { key: 'v18', value: 18 },
    ];
    setInputs({ dropdownOptions: numeric, placeholder: 'Elige versión' });

    getTrigger()!.click();
    fixture.detectChanges();

    const items = getListItems();
    expect(items.length).toBe(2);
    expect(items[0].textContent).toContain('17');
    expect(items[1].textContent).toContain('18');

    items[1].click();
    fixture.detectChanges();

    expect(component.selectedKey).toBe('v18');
    expect(getTriggerLabelText()).toBe('18');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSearchComponent } from './dcx-ng-search.component';
import { SEARCH_TEST_ITEMS } from '../../core/mock';

describe('DcxNgSearchComponent', () => {
  let component: DcxNgSearchComponent;
  let fixture: ComponentFixture<DcxNgSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.placeholder()).toBe('Buscar...');
    expect(component.disabled()).toBe(false);
    expect(component.size()).toBe('m');
    expect(component.searchValue()).toBe('');
  });

  it('should update search value via onValueChange', () => {
    component.onValueChange('test search');
    expect(component.searchValue()).toBe('test search');
  });

  it('should emit searchChange event on value change', () => {
    const spy = jest.spyOn(component.searchChange, 'emit');
    component.onValueChange('test');
    expect(spy).toHaveBeenCalledWith('test');
  });

  it('should handle null value in onValueChange', () => {
    component.onValueChange(null);
    expect(component.searchValue()).toBe('');
    const spy = jest.spyOn(component.searchChange, 'emit');
    component.onValueChange(null);
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should emit searchOutput event on button click via onSearchClick', () => {
    component.onValueChange('test query');
    const spy = jest.spyOn(component.searchOutput, 'emit');
    component.onSearchClick();
    expect(spy).toHaveBeenCalledWith('test query');
  });

  it('should toggle dropdown via onDropdownClick', () => {
    expect(component.isDropdownOpen()).toBe(false);
    component.onDropdownClick();
    expect(component.isDropdownOpen()).toBe(true);
    component.onDropdownClick();
    expect(component.isDropdownOpen()).toBe(false);
  });

  it('should apply size class to host', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    const host = fixture.nativeElement;
    expect(host.classList.contains('dcx-search--size-l')).toBe(true);
  });

  it('should apply disabled class to host when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const host = fixture.nativeElement;
    expect(host.classList.contains('dcx-search--disabled')).toBe(true);
  });

  it('should apply default size-m class to host', () => {
    fixture.detectChanges();
    const host = fixture.nativeElement;
    expect(host.classList.contains('dcx-search--size-m')).toBe(true);
  });

  it('should apply dropdown class when dropdown is enabled', () => {
    fixture.componentRef.setInput('dropdown', true);
    fixture.detectChanges();
    const host = fixture.nativeElement;
    expect(host.classList.contains('dcx-search--with-dropdown')).toBe(true);
  });

  it('should filter items on value change when dropdown enabled', () => {
    fixture.componentRef.setInput('dropdown', true);
    fixture.componentRef.setInput('items', SEARCH_TEST_ITEMS);
    fixture.detectChanges();

    component.onValueChange('ang');
    expect(component.filteredItems().length).toBe(1);
    expect(component.filteredItems()[0].label).toBe('Angular');
  });

  it('should open dropdown when dropdown enabled and value set', () => {
    fixture.componentRef.setInput('dropdown', true);
    fixture.componentRef.setInput('items', SEARCH_TEST_ITEMS);
    fixture.detectChanges();

    component.onValueChange('ang');
    expect(component.isDropdownOpen()).toBe(true);
  });

  it('should select item via onItemClick', () => {
    fixture.componentRef.setInput('dropdown', true);
    fixture.detectChanges();

    const spy = jest.spyOn(component.itemSelected, 'emit');
    const item = { id: '1', label: 'Angular' };
    component.onItemClick(item);

    expect(spy).toHaveBeenCalledWith(item);
    expect(component.searchValue()).toBe('Angular');
    expect(component.isDropdownOpen()).toBe(false);
  });

  it('should clear search via onClearClick', () => {
    component.onValueChange('some text');
    const spy = jest.spyOn(component.searchChange, 'emit');
    component.onClearClick();
    expect(component.searchValue()).toBe('');
    expect(spy).toHaveBeenCalledWith('');
    expect(component.isDropdownOpen()).toBe(false);
  });

  it('should show clear button when showClear is true and has value', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.detectChanges();
    component.onValueChange('test');
    fixture.detectChanges();

    const clearBtn = fixture.nativeElement.querySelector('.dcx-search__clear-button');
    expect(clearBtn).toBeTruthy();
  });

  it('should not show clear button when search is empty', () => {
    fixture.componentRef.setInput('showClear', true);
    fixture.detectChanges();
    // no value set
    const clearBtn = fixture.nativeElement.querySelector('.dcx-search__clear-button');
    expect(clearBtn).toBeFalsy();
  });

  it('should show search button', () => {
    const searchBtn = fixture.nativeElement.querySelector('.dcx-search__search-button');
    expect(searchBtn).toBeTruthy();
  });

  it('should not open dropdown when dropdown input is false and value is set', () => {
    // dropdown() is false — if (this.dropdown() && newValue) should not open dropdown
    fixture.componentRef.setInput('dropdown', false);
    fixture.detectChanges();
    component.onValueChange('Angular');
    expect(component.isDropdownOpen()).toBe(false);
  });

  it('should handle onValueChange with falsy value using empty string fallback', () => {
    // value || '' — when value is null
    component.onValueChange(null);
    expect(component.searchValue()).toBe('');
  });
});

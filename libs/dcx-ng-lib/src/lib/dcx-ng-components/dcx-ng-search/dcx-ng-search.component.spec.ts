import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSearchComponent } from './dcx-ng-search.component';

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

  it('should update search value on input', () => {
    const input = fixture.nativeElement.querySelector('.dcx-search__input') as HTMLInputElement;
    input.value = 'test search';
    input.dispatchEvent(new Event('input'));
    
    expect(component.searchValue()).toBe('test search');
  });

  it('should emit searchChange event on input', (done) => {
    component.searchChange.subscribe((value: string) => {
      expect(value).toBe('test');
      done();
    });

    const input = fixture.nativeElement.querySelector('.dcx-search__input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
  });

  it('should emit search event on button click', (done) => {
    component.searchValue.set('test query');
    component.search.subscribe((value: string) => {
      expect(value).toBe('test query');
      done();
    });

    const searchButton = fixture.nativeElement.querySelector('.dcx-search__search-button button') as HTMLButtonElement;
    searchButton.click();
  });

  it('should emit search event on Enter key', (done) => {
    component.searchValue.set('test query');
    component.search.subscribe((value: string) => {
      expect(value).toBe('test query');
      done();
    });

    const input = fixture.nativeElement.querySelector('.dcx-search__input') as HTMLInputElement;
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    input.dispatchEvent(event);
  });

  it('should disable input when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.dcx-search__input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('should apply custom placeholder', () => {
    fixture.componentRef.setInput('placeholder', 'Custom placeholder');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.dcx-search__input') as HTMLInputElement;
    expect(input.placeholder).toBe('Custom placeholder');
  });

  it('should apply size classes', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();

    const host = fixture.nativeElement;
    expect(host.classList.contains('dcx-search--size-l')).toBe(true);
  });
});

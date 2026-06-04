import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgChipComponent } from './dcx-ng-chip.component';

describe('DcxNgChipComponent', () => {
  let component: DcxNgChipComponent;
  let fixture: ComponentFixture<DcxNgChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgChipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.label()).toBe('');
    expect(component.color()).toBe('primary');
    expect(component.removable()).toBe(false);
    expect(component.icon()).toBe('');
    expect(component.image()).toBe('');
  });

  it('should determine chip type correctly', () => {
    fixture.componentRef.setInput('label', 'Test');
    fixture.detectChanges();
    expect(component.chipType()).toBe('label-only');

    fixture.componentRef.setInput('icon', 'home');
    fixture.detectChanges();
    expect(component.chipType()).toBe('with-icon');

    fixture.componentRef.setInput('image', 'test.jpg');
    fixture.detectChanges();
    expect(component.chipType()).toBe('with-image');
  });

  it('should emit removeChip when variant is filter', () => {
    const spy = jest.fn();
    component.removeChip.subscribe(spy);
    fixture.componentRef.setInput('variant', 'filter');
    fixture.detectChanges();
    component.handleRemove(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should emit removeChip when removable=true (without variant=filter)', () => {
    const spy = jest.fn();
    component.removeChip.subscribe(spy);
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
    component.handleRemove(new Event('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit removeChip when variant is choice and removable is false', () => {
    const spy = jest.fn();
    component.removeChip.subscribe(spy);
    fixture.componentRef.setInput('variant', 'choice');
    fixture.componentRef.setInput('removable', false);
    fixture.detectChanges();
    component.handleRemove(new Event('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should handle remove without event argument', () => {
    const spy = jest.fn();
    component.removeChip.subscribe(spy);
    fixture.componentRef.setInput('variant', 'filter');
    fixture.detectChanges();
    component.handleRemove();
    expect(spy).toHaveBeenCalled();
  });

  describe('WCAG AA', () => {
    it('should not have tabindex on chip container', () => {
      const chip = fixture.nativeElement.querySelector('.dcx-ng-chip') as HTMLElement;
      expect(chip.hasAttribute('tabindex')).toBe(false);
    });

    it('should show remove button when removable=true', () => {
      fixture.componentRef.setInput('removable', true);
      fixture.componentRef.setInput('label', 'Tag');
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('.dcx-ng-chip__remove-btn');
      expect(btn).toBeTruthy();
    });

    it('should not show remove button when variant=choice and removable=false', () => {
      fixture.componentRef.setInput('variant', 'choice');
      fixture.componentRef.setInput('removable', false);
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('.dcx-ng-chip__remove-btn');
      expect(btn).toBeNull();
    });

    it('icon should have aria-hidden="true"', () => {
      fixture.componentRef.setInput('icon', 'house');
      fixture.detectChanges();
      const icon = fixture.nativeElement.querySelector('.dcx-ng-chip__icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    });
  });
});

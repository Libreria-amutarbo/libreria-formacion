import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgChipComponent } from './dcx-ng-chip.component';
 
describe('DcxNgChipComponent', () => {
  let component: DcxNgChipComponent;
  let fixture: ComponentFixture<DcxNgChipComponent>;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgChipComponent]
    })
    .compileComponents();
 
    fixture = TestBed.createComponent(DcxNgChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should have default values', () => {
    expect(component.label()).toBe('');
    expect(component.color()).toBe('gray');
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
 
  it('should emit onRemove when remove button is clicked and removable is true', () => {
    const spy = jest.fn();
    component.onRemove.subscribe(spy);
   
    fixture.componentRef.setInput('removable', true);
    fixture.detectChanges();
 
    const mockEvent = new Event('click');
    component.handleRemove(mockEvent);
 
    expect(spy).toHaveBeenCalled();
  });
 
  it('should not emit onRemove when removable is false', () => {
    const spy = jest.fn();
    component.onRemove.subscribe(spy);
   
    fixture.componentRef.setInput('removable', false);
    fixture.detectChanges();
 
    const mockEvent = new Event('click');
    component.handleRemove(mockEvent);
 
    expect(spy).not.toHaveBeenCalled();
  });
});
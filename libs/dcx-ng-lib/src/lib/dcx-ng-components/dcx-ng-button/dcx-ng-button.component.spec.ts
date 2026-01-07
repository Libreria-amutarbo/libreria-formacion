import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgButtonComponent } from './dcx-ng-button.component';
import { By } from '@angular/platform-browser';

describe('DcxNgButtonComponent', () => {
  let component: DcxNgButtonComponent;
  let fixture: ComponentFixture<DcxNgButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DcxNgButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the button component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the button label', () => {
    fixture.componentRef.setInput('label', 'Click Me');
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent).toContain('Click Me');
  });

  it('should disable the button when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
  });

  it('should emit an event when clicked', () => {
    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button'));
    const mockEvent = new MouseEvent('click');
    buttonElement.triggerEventHandler('click', mockEvent);
    expect(emitSpy).toHaveBeenCalledWith(mockEvent);
  });

  it('should not emit event when disabled', () => {
    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    const mockEvent = new MouseEvent('click');
    buttonElement.triggerEventHandler('click', mockEvent);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should apply ARIA label correctly', () => {
    fixture.componentRef.setInput('ariaLabel', 'Submit Button');
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.getAttribute('aria-label')).toBe(
      'Submit Button',
    );
  });

  it('should apply custom classes', () => {
    fixture.componentRef.setInput('class', 'custom-class');
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('custom-class');
  });
});

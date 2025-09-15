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
    component.label = 'Click Me';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent).toContain('Click Me');
  });

  it('should disable the button when disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.disabled).toBeTruthy();
  });

  it('should emit an event when clicked', () => {
    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit event when disabled', () => {
    const emitSpy = jest.spyOn(component.buttonClick, 'emit');
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.triggerEventHandler('click', null);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should apply ARIA label correctly', () => {
    component.ariaLabel = 'Submit Button';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.getAttribute('aria-label')).toBe(
      'Submit Button',
    );
  });

  it('should apply custom classes', () => {
    component.class = 'custom-class';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.classList).toContain('custom-class');
  });
});

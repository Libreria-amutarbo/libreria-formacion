import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DcxNgCardComponent } from './dcx-ng-card.component';

describe('DcxNgCardComponent', () => {
  let component: DcxNgCardComponent;
  let fixture: ComponentFixture<DcxNgCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render default footer buttons', () => {
    const cancelButton = fixture.debugElement.query(By.css('.dcx-btn--secondary'));
    const acceptButton = fixture.debugElement.query(By.css('.dcx-btn--primary'));

    expect(cancelButton).toBeTruthy();
    expect(acceptButton).toBeTruthy();
    expect(cancelButton.nativeElement.textContent.trim()).toBe('Cancelar');
    expect(acceptButton.nativeElement.textContent.trim()).toBe('Aceptar');
  });

  it('should emit events when buttons are clicked', () => {
    let acceptEmitted = false;
    let cancelEmitted = false;
    
    component.onAccept.subscribe(() => acceptEmitted = true);
    component.onCancel.subscribe(() => cancelEmitted = true);
    
    fixture.detectChanges();

    const acceptButton = fixture.debugElement.query(By.css('.dcx-btn--primary'));
    const cancelButton = fixture.debugElement.query(By.css('.dcx-btn--secondary'));
    
    acceptButton.nativeElement.click();
    cancelButton.nativeElement.click();

    expect(acceptEmitted).toBe(true);
    expect(cancelEmitted).toBe(true);
  });

  it('should have correct default values', () => {
    expect(component.header).toBe('');
    expect(component.subheader).toBe('');
    expect(component.iconClass).toBe('');
    expect(component.closable).toBe(false);
    expect(component.visible).toBe(true);
  });

  it('should render body section', () => {
    const bodyElement = fixture.debugElement.query(By.css('.dcx-card-body'));
    expect(bodyElement).toBeTruthy();
  });

  it('should show card when visible is true', () => {
    component.visible = true;
    fixture.detectChanges();

    const cardElement = fixture.debugElement.query(By.css('.dcx-card'));
    expect(cardElement).toBeTruthy();
  });

  it('should update component properties', () => {
    component.header = 'New Header';
    component.subheader = 'New Subheader';
    component.iconClass = 'new-icon';
    component.closable = true;
    component.visible = false;

    expect(component.header).toBe('New Header');
    expect(component.subheader).toBe('New Subheader');
    expect(component.iconClass).toBe('new-icon');
    expect(component.closable).toBe(true);
    expect(component.visible).toBe(false);
  });

  it('should test handleAccept method directly', () => {
    let acceptEmitted = false;
    component.onAccept.subscribe(() => acceptEmitted = true);
    
    component.handleAccept();
    
    expect(acceptEmitted).toBe(true);
  });

  it('should test handleCancel method directly', () => {
    let cancelEmitted = false;
    component.onCancel.subscribe(() => cancelEmitted = true);
    
    component.handleCancel();
    
    expect(cancelEmitted).toBe(true);
  });

  it('should test handleClose method directly', () => {
    let closeEmitted = false;
    component.onClose.subscribe(() => closeEmitted = true);
    component.visible = true;
    
    component.handleClose();
    
    expect(closeEmitted).toBe(true);
    expect(component.visible).toBe(false);
  });

  it('should maintain visible state when set to true', () => {
    component.visible = true;
    expect(component.visible).toBe(true);
    
    component.visible = false;
    expect(component.visible).toBe(false);
  });

  it('should allow setting all properties at once', () => {
    const config = {
      header: 'Test Title',
      subheader: 'Test Subtitle', 
      iconClass: 'fa fa-test',
      closable: true,
      visible: false
    };

    Object.assign(component, config);

    expect(component.header).toBe(config.header);
    expect(component.subheader).toBe(config.subheader);
    expect(component.iconClass).toBe(config.iconClass);
    expect(component.closable).toBe(config.closable);
    expect(component.visible).toBe(config.visible);
  });

  it('should emit multiple events in sequence', () => {
    let acceptCount = 0;
    let cancelCount = 0;
    let closeCount = 0;

    component.onAccept.subscribe(() => acceptCount++);
    component.onCancel.subscribe(() => cancelCount++);
    component.onClose.subscribe(() => closeCount++);

    component.handleAccept();
    component.handleCancel();
    component.handleClose();
    component.handleAccept();

    expect(acceptCount).toBe(2);
    expect(cancelCount).toBe(1);
    expect(closeCount).toBe(1);
  });

  it('should render footer buttons with correct classes', () => {
    fixture.detectChanges();
    
    const footerElement = fixture.debugElement.query(By.css('.dcx-card-footer--default'));
    const cancelButton = fixture.debugElement.query(By.css('.dcx-btn--secondary'));
    const acceptButton = fixture.debugElement.query(By.css('.dcx-btn--primary'));

    expect(footerElement).toBeTruthy();
    expect(cancelButton.nativeElement.classList.contains('dcx-btn')).toBe(true);
    expect(cancelButton.nativeElement.classList.contains('dcx-btn--secondary')).toBe(true);
    expect(acceptButton.nativeElement.classList.contains('dcx-btn')).toBe(true);
    expect(acceptButton.nativeElement.classList.contains('dcx-btn--primary')).toBe(true);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcxNgMessageComponent } from './dcx-ng-message.component';

describe('DcxNgMessageComponent', () => {
  let component: DcxNgMessageComponent;
  let fixture: ComponentFixture<DcxNgMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgMessageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('body', 'Test message body');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default type as "notification"', () => {
    expect(component.type()).toBe('notification');
  });

  it('should accept body input', () => {
    expect(component.body()).toBe('Test message body');
  });

  it('should accept type input', () => {
    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();
    expect(component.type()).toBe('error');
  });

  it('should compute messageData for notification type', () => {
    fixture.componentRef.setInput('type', 'notification');
    fixture.detectChanges();
    expect(component.messageData().role).toBe('notification');
  });

  it('should compute messageData for error type', () => {
    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();
    expect(component.messageData().role).toBe('error');
  });

  it('should compute messageData for warning type', () => {
    fixture.componentRef.setInput('type', 'warning');
    fixture.detectChanges();
    expect(component.messageData().role).toBe('warning');
  });

  it('should compute messageData for success type', () => {
    fixture.componentRef.setInput('type', 'success');
    fixture.detectChanges();
    expect(component.messageData().role).toBe('success');
  });

  it('should default icon to false', () => {
    expect(component.icon()).toBe(false);
  });

  it('should default showClose to false', () => {
    expect(component.showClose()).toBe(false);
  });

  it('should accept title input', () => {
    fixture.componentRef.setInput('title', 'Alert');
    fixture.detectChanges();
    expect(component.title()).toBe('Alert');
  });

  it('should accept link input', () => {
    fixture.componentRef.setInput('link', 'https://example.com');
    fixture.detectChanges();
    expect(component.link()).toBe('https://example.com');
  });
});

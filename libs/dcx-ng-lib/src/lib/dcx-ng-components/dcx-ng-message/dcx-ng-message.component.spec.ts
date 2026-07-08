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

  it('should map notification/success to role "status"', () => {
    fixture.componentRef.setInput('type', 'notification');
    fixture.detectChanges();
    expect(component.messageData().role).toBe('status');

    fixture.componentRef.setInput('type', 'success');
    fixture.detectChanges();
    expect(component.messageData().role).toBe('status');
  });

  it('should map error/warning to role "alert"', () => {
    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();
    expect(component.messageData().role).toBe('alert');

    fixture.componentRef.setInput('type', 'warning');
    fixture.detectChanges();
    expect(component.messageData().role).toBe('alert');
  });

  it('should provide a default icon per severity', () => {
    fixture.componentRef.setInput('type', 'success');
    fixture.detectChanges();
    expect(component.messageData().icon).toBe('check-circle');

    fixture.componentRef.setInput('type', 'error');
    fixture.detectChanges();
    expect(component.messageData().icon).toBe('x-circle');
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

  it('should accept iconName input', () => {
    fixture.componentRef.setInput('iconName', 'x-circle');
    fixture.detectChanges();
    expect(component.iconName()).toBe('x-circle');
  });

  describe('accesibilidad (WCAG)', () => {
    const containerEl = (): HTMLElement =>
      fixture.nativeElement.querySelector('.message__container');

    it('should announce notification/success with role="status" and polite live region', () => {
      fixture.componentRef.setInput('type', 'notification');
      fixture.detectChanges();
      expect(containerEl().getAttribute('role')).toBe('status');
      expect(containerEl().getAttribute('aria-live')).toBe('polite');
    });

    it('should announce warning/error with role="alert" and assertive live region', () => {
      fixture.componentRef.setInput('type', 'error');
      fixture.detectChanges();
      expect(containerEl().getAttribute('role')).toBe('alert');
      expect(containerEl().getAttribute('aria-live')).toBe('assertive');
    });

    it('should NOT set role/aria-live when announce is false', () => {
      fixture.componentRef.setInput('announce', false);
      fixture.detectChanges();
      expect(containerEl().getAttribute('role')).toBeNull();
      expect(containerEl().getAttribute('aria-live')).toBeNull();
    });

    it('should apply the severity class from type()', () => {
      fixture.componentRef.setInput('type', 'warning');
      fixture.detectChanges();
      expect(containerEl().classList.contains('warning')).toBe(true);
    });

    it('should render the title as a paragraph, not a heading', () => {
      fixture.componentRef.setInput('title', 'Aviso');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('h3')).toBeNull();
      const title = fixture.nativeElement.querySelector(
        '.message__container__title',
      );
      expect(title?.tagName).toBe('P');
    });
  });

  describe('close', () => {
    it('should emit closed and hide the message when the close button is clicked', () => {
      fixture.componentRef.setInput('showClose', true);
      fixture.detectChanges();

      const closedSpy = jest.fn();
      component.closed.subscribe(closedSpy);

      const closeBtn = fixture.nativeElement.querySelector(
        '.icon__container__close button',
      ) as HTMLButtonElement;
      closeBtn.click();
      fixture.detectChanges();

      expect(closedSpy).toHaveBeenCalled();
      expect(component.dismissed()).toBe(true);
      expect(fixture.nativeElement.querySelector('.message__container')).toBeNull();
    });
  });
});

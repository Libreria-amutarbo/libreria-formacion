import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgBadgeComponent } from './dcx-ng-badge.component';

describe('DcxNgBadgeComponent', () => {
  let component: DcxNgBadgeComponent;
  let fixture: ComponentFixture<DcxNgBadgeComponent>;

  const getSpan = (): HTMLElement =>
    fixture.nativeElement.querySelector('.dcx-badge');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('value input', () => {
    it('should render the value text', () => {
      fixture.componentRef.setInput('value', '5');
      fixture.detectChanges();
      expect(getSpan().textContent?.trim()).toBe('5');
    });

    it('should render empty when no value provided', () => {
      expect(getSpan().textContent?.trim()).toBe('');
    });
  });

  describe('severity input', () => {
    it('should apply primary class by default', () => {
      expect(getSpan().classList).toContain('dcx-badge--primary');
    });

    it('should apply the given severity class', () => {
      fixture.componentRef.setInput('severity', 'danger');
      fixture.detectChanges();
      expect(getSpan().classList).toContain('dcx-badge--danger');
    });

    it.each(['primary', 'secondary', 'success', 'info', 'warn', 'danger'])(
      'should apply class for severity %s',
      severity => {
        fixture.componentRef.setInput('severity', severity);
        fixture.detectChanges();
        expect(getSpan().classList).toContain(`dcx-badge--${severity}`);
      },
    );
  });

  describe('size input', () => {
    it('should apply md class by default', () => {
      expect(getSpan().classList).toContain('dcx-badge--md');
    });

    it.each(['sm', 'md', 'lg', 'xl'])(
      'should apply class for size %s',
      size => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        expect(getSpan().classList).toContain(`dcx-badge--${size}`);
      },
    );
  });

  describe('badgeClasses computed', () => {
    it('should include base class and modifier classes', () => {
      fixture.componentRef.setInput('severity', 'success');
      fixture.componentRef.setInput('size', 'lg');
      fixture.detectChanges();
      const classes = component.badgeClasses();
      expect(classes).toContain('dcx-badge');
      expect(classes).toContain('dcx-badge--success');
      expect(classes).toContain('dcx-badge--lg');
    });
  });

  describe('Accessibility (WCAG AA)', () => {
    describe('computedAriaLabel', () => {
      it('should generate default aria-label as "value, severity" when no explicit label', () => {
        fixture.componentRef.setInput('value', '3');
        fixture.componentRef.setInput('severity', 'danger');
        fixture.detectChanges();
        expect(getSpan().getAttribute('aria-label')).toBe('3, danger');
      });

      it('should generate default aria-label as severity only when value is empty', () => {
        fixture.componentRef.setInput('severity', 'warn');
        fixture.detectChanges();
        expect(getSpan().getAttribute('aria-label')).toBe('warn');
      });

      it('should use explicit ariaLabel when provided', () => {
        fixture.componentRef.setInput('value', '3');
        fixture.componentRef.setInput('ariaLabel', '3 mensajes sin leer');
        fixture.detectChanges();
        expect(getSpan().getAttribute('aria-label')).toBe('3 mensajes sin leer');
      });

      it('should suppress aria-label when ariaHidden is true', () => {
        fixture.componentRef.setInput('value', '3');
        fixture.componentRef.setInput('ariaHidden', true);
        fixture.detectChanges();
        expect(getSpan().getAttribute('aria-label')).toBeNull();
      });
    });

    describe('ariaHidden input', () => {
      it('should set aria-hidden attribute when true', () => {
        fixture.componentRef.setInput('ariaHidden', true);
        fixture.detectChanges();
        expect(getSpan().getAttribute('aria-hidden')).toBe('true');
      });

      it('should not render aria-hidden attribute when false', () => {
        expect(getSpan().getAttribute('aria-hidden')).toBeNull();
      });
    });

    describe('role input', () => {
      it('should set role attribute when provided', () => {
        fixture.componentRef.setInput('role', 'status');
        fixture.detectChanges();
        expect(getSpan().getAttribute('role')).toBe('status');
      });

      it('should set role="alert" when provided', () => {
        fixture.componentRef.setInput('role', 'alert');
        fixture.detectChanges();
        expect(getSpan().getAttribute('role')).toBe('alert');
      });

      it('should not render role attribute when null', () => {
        expect(getSpan().getAttribute('role')).toBeNull();
      });
    });
  });
});

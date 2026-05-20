import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgBadgeComponent } from './dcx-ng-badge.component';

describe('DcxNgBadgeComponent', () => {
  let component: DcxNgBadgeComponent;
  let fixture: ComponentFixture<DcxNgBadgeComponent>;

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
      const span = fixture.nativeElement.querySelector('.dcx-badge');
      expect(span.textContent.trim()).toBe('5');
    });

    it('should render empty when no value provided', () => {
      fixture.detectChanges();
      const span = fixture.nativeElement.querySelector('.dcx-badge');
      expect(span.textContent.trim()).toBe('');
    });
  });

  describe('severity input', () => {
    it('should apply primary class by default', () => {
      fixture.detectChanges();
      const span = fixture.nativeElement.querySelector('.dcx-badge');
      expect(span.classList).toContain('dcx-badge--primary');
    });

    it('should apply the given severity class', () => {
      fixture.componentRef.setInput('severity', 'danger');
      fixture.detectChanges();
      const span = fixture.nativeElement.querySelector('.dcx-badge');
      expect(span.classList).toContain('dcx-badge--danger');
    });

    it.each(['primary', 'secondary', 'success', 'info', 'warn', 'danger'])(
      'should apply class for severity %s',
      (severity) => {
        fixture.componentRef.setInput('severity', severity);
        fixture.detectChanges();
        const span = fixture.nativeElement.querySelector('.dcx-badge');
        expect(span.classList).toContain(`dcx-badge--${severity}`);
      }
    );
  });

  describe('size input', () => {
    it('should apply md class by default', () => {
      fixture.detectChanges();
      const span = fixture.nativeElement.querySelector('.dcx-badge');
      expect(span.classList).toContain('dcx-badge--md');
    });

    it.each(['sm', 'md', 'lg', 'xl'])(
      'should apply class for size %s',
      (size) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();
        const span = fixture.nativeElement.querySelector('.dcx-badge');
        expect(span.classList).toContain(`dcx-badge--${size}`);
      }
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
});

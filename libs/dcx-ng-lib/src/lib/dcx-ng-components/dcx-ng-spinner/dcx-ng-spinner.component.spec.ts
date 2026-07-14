import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgSpinnerComponent } from './dcx-ng-spinner.component';

describe('DcxNgSpinnerComponent', () => {
  let component: DcxNgSpinnerComponent;
  let fixture: ComponentFixture<DcxNgSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSpinnerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    fixture.detectChanges();
    expect(component.size()).toBe('m');
    expect(component.wrapper()).toBe(false);
    expect(component.delay()).toBe(1300);
    expect(component.color()).toBeNull();
    expect(component.title()).toBe('');
    expect(component.description()).toBe('');
    expect(component.ariaLabel()).toBeNull();
  });

  it('should compute spinnerClasses with size', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    expect(component.spinnerClasses()).toContain('dcx-ng-spinner--l');
  });

  it('should compute spinnerClasses with wrapper', () => {
    fixture.componentRef.setInput('wrapper', true);
    fixture.detectChanges();
    expect(component.spinnerClasses()).toContain('dcx-ng-spinner--wrapper');
  });

  it('should compute spinnerClasses base class always present', () => {
    fixture.detectChanges();
    expect(component.spinnerClasses()).toContain('dcx-ng-spinner');
  });

  it('should compute hasContent as false when no title and no description', () => {
    fixture.detectChanges();
    expect(component.hasContent()).toBe(false);
  });

  it('should compute hasContent as true when title is set', () => {
    fixture.componentRef.setInput('title', 'Cargando');
    fixture.detectChanges();
    expect(component.hasContent()).toBe(true);
  });

  it('should compute hasContent as true when description is set', () => {
    fixture.componentRef.setInput('description', 'Espera un momento');
    fixture.detectChanges();
    expect(component.hasContent()).toBe(true);
  });

  describe('computedAriaLabel', () => {
    it('should use ariaLabel when present, even if title is also set', () => {
      fixture.componentRef.setInput('title', 'Cargando datos');
      fixture.componentRef.setInput('ariaLabel', 'Guardando cambios');
      fixture.detectChanges();
      expect(component.computedAriaLabel()).toBe('Guardando cambios');
    });

    it('should fall back to title when there is no ariaLabel', () => {
      fixture.componentRef.setInput('title', 'Cargando datos');
      fixture.detectChanges();
      expect(component.computedAriaLabel()).toBe('Cargando datos');
    });

    it('should fall back to "Cargando…" when there is no ariaLabel or title', () => {
      fixture.detectChanges();
      expect(component.computedAriaLabel()).toBe('Cargando…');
    });
  });

  describe('delay / visible', () => {
    it('should not be visible before delay elapses', fakeAsync(() => {
      fixture.componentRef.setInput('delay', 300);
      fixture.detectChanges();

      expect(component.visible()).toBe(false);
      tick(299);
      expect(component.visible()).toBe(false);
    }));

    it('should become visible after delay elapses', fakeAsync(() => {
      fixture.componentRef.setInput('delay', 300);
      fixture.detectChanges();

      tick(300);
      expect(component.visible()).toBe(true);
    }));

    it('should become visible synchronously when delay is 0', () => {
      fixture.componentRef.setInput('delay', 0);
      fixture.detectChanges();

      expect(component.visible()).toBe(true);
    });

    it('should reset the timer when delay changes', fakeAsync(() => {
      fixture.componentRef.setInput('delay', 300);
      fixture.detectChanges();
      tick(200); // 100ms left on the original timer

      // Changing delay restarts the wait from zero with the new duration —
      // if the old timer weren't cleared, this would flip to visible at the
      // 100ms mark instead of waiting the full new delay.
      fixture.componentRef.setInput('delay', 500);
      fixture.detectChanges();
      tick(200);
      expect(component.visible()).toBe(false);

      tick(300);
      expect(component.visible()).toBe(true);
    }));

    it('should not render the circle before visible', fakeAsync(() => {
      fixture.componentRef.setInput('delay', 300);
      fixture.detectChanges();

      const circle = fixture.debugElement.query(By.css('.circle'));
      expect(circle).toBeNull();

      tick(300);
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.circle'))).toBeTruthy();
    }));

    it('should not throw when destroyed while a delay timer is pending', fakeAsync(() => {
      fixture.componentRef.setInput('delay', 300);
      fixture.detectChanges();

      expect(() => fixture.destroy()).not.toThrow();
      tick(300);
    }));
  });

  describe('Accessibility (WCAG AA)', () => {
    it('should have role="status" and aria-live="polite" on the host', () => {
      fixture.componentRef.setInput('delay', 0);
      fixture.detectChanges();
      const host = fixture.debugElement.query(By.css('.dcx-ng-spinner'))
        .nativeElement as HTMLElement;
      expect(host.getAttribute('role')).toBe('status');
      expect(host.getAttribute('aria-live')).toBe('polite');
    });

    it('should mark the circle as aria-hidden in standalone mode', () => {
      fixture.componentRef.setInput('delay', 0);
      fixture.detectChanges();
      const circle = fixture.debugElement.query(By.css('.circle'))
        .nativeElement as HTMLElement;
      expect(circle.getAttribute('aria-hidden')).toBe('true');
    });

    it('should mark the circle as aria-hidden in wrapper mode', () => {
      fixture.componentRef.setInput('wrapper', true);
      fixture.componentRef.setInput('delay', 0);
      fixture.detectChanges();
      const circle = fixture.debugElement.query(By.css('.overlay .circle'))
        .nativeElement as HTMLElement;
      expect(circle.getAttribute('aria-hidden')).toBe('true');
    });
  });
});

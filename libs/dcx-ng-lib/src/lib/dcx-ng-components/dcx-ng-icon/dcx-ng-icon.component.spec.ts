import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgIconComponent } from './dcx-ng-icon.component';

describe('DcxNgIconComponent', () => {
  let component: DcxNgIconComponent;
  let fixture: ComponentFixture<DcxNgIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgIconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'home');
    fixture.detectChanges();
  });

  it('should create the icon component', () => {
    expect(component).toBeTruthy();
  });

  it('should include base "bi" class', () => {
    expect(component.iconClass()).toContain('bi');
  });

  it('should include icon name class "bi-home"', () => {
    expect(component.iconClass()).toContain('bi-home');
  });

  it('should include dcx-icon class', () => {
    expect(component.iconClass()).toContain('dcx-icon');
  });

  it('should include default size class "dcx-icon--size-m"', () => {
    expect(component.iconClass()).toContain('dcx-icon--size-m');
  });

  it('should update icon name class when name changes', () => {
    fixture.componentRef.setInput('name', 'star');
    fixture.detectChanges();
    expect(component.iconClass()).toContain('bi-star');
  });

  it('should include size class for "l"', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    expect(component.iconClass()).toContain('dcx-icon--size-l');
  });

  it('should include spacing class when spacing is not "none"', () => {
    fixture.componentRef.setInput('spacing', 'compact');
    fixture.detectChanges();
    expect(component.iconClass()).toContain('dcx-icon--spacing-compact');
  });

  it('should NOT include spacing class when spacing is "none"', () => {
    fixture.componentRef.setInput('spacing', 'none');
    fixture.detectChanges();
    expect(component.iconClass()).not.toContain('dcx-icon--spacing-none');
  });

  it('should include extraClass when set', () => {
    fixture.componentRef.setInput('extraClass', 'custom-class');
    fixture.detectChanges();
    expect(component.iconClass()).toContain('custom-class');
  });

  it('should NOT include extraClass when empty', () => {
    fixture.componentRef.setInput('extraClass', '');
    fixture.detectChanges();
    const classes = component.iconClass();
    expect(
      classes
        .trim()
        .split(/\s+/)
        .filter(c => c === ''),
    ).toHaveLength(0);
  });

  it('should set color style on host via color input', () => {
    fixture.componentRef.setInput('color', '#ff0000');
    fixture.detectChanges();
    expect(component.color()).toBe('#ff0000');
  });

  it('should include size class "dcx-icon--size-auto" when size is "auto"', () => {
    fixture.componentRef.setInput('size', 'auto');
    fixture.detectChanges();
    expect(component.iconClass()).toContain('dcx-icon--size-auto');
  });

  describe('WCAG AA — accesibilidad', () => {
    const getIcon = (): HTMLElement =>
      fixture.nativeElement.querySelector('i');

    it('should be decorative by default (no ariaLabel)', () => {
      expect(component.decorative()).toBe(true);
    });

    it('should mark icon as aria-hidden and have no role/aria-label when decorative', () => {
      fixture.detectChanges();
      const icon = getIcon();
      expect(icon.getAttribute('aria-hidden')).toBe('true');
      expect(icon.getAttribute('role')).toBeNull();
      expect(icon.getAttribute('aria-label')).toBeNull();
    });

    it('should become meaningful (role="img" + aria-label) when ariaLabel is set', () => {
      fixture.componentRef.setInput('ariaLabel', 'Configuración');
      fixture.detectChanges();
      const icon = getIcon();
      expect(component.decorative()).toBe(false);
      expect(icon.getAttribute('role')).toBe('img');
      expect(icon.getAttribute('aria-label')).toBe('Configuración');
      expect(icon.getAttribute('aria-hidden')).toBeNull();
    });

    it('should treat a blank ariaLabel as decorative', () => {
      fixture.componentRef.setInput('ariaLabel', '   ');
      fixture.detectChanges();
      expect(component.decorative()).toBe(true);
      expect(getIcon().getAttribute('aria-hidden')).toBe('true');
    });
  });
});

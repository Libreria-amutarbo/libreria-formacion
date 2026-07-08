import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgNavbarComponent } from './dcx-ng-navbar.component';
import { DcxNavItem } from '../../core/interfaces/navbar';

describe('DcxNgNavbarComponent', () => {
  let component: DcxNgNavbarComponent;
  let fixture: ComponentFixture<DcxNgNavbarComponent>;

  const items: DcxNavItem[] = [
    { label: 'Inicio', value: 'home', icon: 'house' },
    { label: 'Componentes', value: 'components', icon: 'grid' },
    { label: 'Bloqueado', value: 'blocked', disabled: true },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgNavbarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Functional', () => {
    it('should toggle isMenuOpen when toggleMenu is called', () => {
      expect(component.isMenuOpen()).toBe(false);
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(true);
      component.toggleMenu();
      expect(component.isMenuOpen()).toBe(false);
    });

    it('should close the menu and emit itemClick when onItemClick is called', () => {
      const emitSpy = jest.spyOn(component.itemClick, 'emit');
      component.toggleMenu();

      component.onItemClick('components');

      expect(component.isMenuOpen()).toBe(false);
      expect(emitSpy).toHaveBeenCalledWith('components');
    });

    it('should emit brandClick when the brand button is clicked', () => {
      const emitSpy = jest.spyOn(component.brandClick, 'emit');
      const compiled = fixture.nativeElement as HTMLElement;
      const brandButton = compiled.querySelector(
        '.dcx-ng-navbar__brand',
      ) as HTMLButtonElement;

      brandButton.click();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should not expose a mutable setter on isMenuOpen', () => {
      expect((component.isMenuOpen as unknown as { set?: unknown }).set).toBeUndefined();
    });

    it('should close the menu and return focus to the toggle button on Escape', () => {
      component.toggleMenu();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const toggleButton = compiled.querySelector(
        '.dcx-ng-navbar__toggle button',
      ) as HTMLButtonElement;

      component.onToggleEscape();
      fixture.detectChanges();

      expect(component.isMenuOpen()).toBe(false);
      expect(document.activeElement).toBe(toggleButton);
    });
  });

  describe('Accessibility (WCAG AA)', () => {
    it('should render the brand as a native <button> element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const brandButton = compiled.querySelector('button.dcx-ng-navbar__brand');
      expect(brandButton).toBeTruthy();
    });

    it('should not set aria-label on <nav> when ariaLabel input is not provided', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const nav = compiled.querySelector('nav') as HTMLElement;
      expect(nav.hasAttribute('aria-label')).toBe(false);
    });

    it('should reflect the ariaLabel input on <nav>', () => {
      fixture.componentRef.setInput('ariaLabel', 'Navegación principal');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const nav = compiled.querySelector('nav') as HTMLElement;
      expect(nav.getAttribute('aria-label')).toBe('Navegación principal');
    });

    it('should set aria-expanded="false" on the toggle button by default', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleButton = compiled.querySelector(
        '.dcx-ng-navbar__toggle button',
      ) as HTMLButtonElement;
      expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('should set aria-expanded="true" on the toggle button after opening the menu', () => {
      component.toggleMenu();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const toggleButton = compiled.querySelector(
        '.dcx-ng-navbar__toggle button',
      ) as HTMLButtonElement;
      expect(toggleButton.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have aria-controls on the toggle button referencing the items list id', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const toggleButton = compiled.querySelector(
        '.dcx-ng-navbar__toggle button',
      ) as HTMLButtonElement;
      const list = compiled.querySelector('.dcx-ng-navbar__items') as HTMLElement;

      const controlsId = toggleButton.getAttribute('aria-controls');
      expect(controlsId).toBe(list.id);
    });

    it('should set aria-current="page" on the active item', () => {
      fixture.componentRef.setInput('activeValue', 'components');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.dcx-ng-navbar__item-btn button');
      expect((buttons[1] as HTMLButtonElement).getAttribute('aria-current')).toBe('page');
    });

    it('should not set aria-current on inactive items', () => {
      fixture.componentRef.setInput('activeValue', 'components');
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.dcx-ng-navbar__item-btn button');
      expect((buttons[0] as HTMLButtonElement).hasAttribute('aria-current')).toBe(false);
    });

    it('should set native disabled attribute on disabled items', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const buttons = compiled.querySelectorAll('.dcx-ng-navbar__item-btn button');
      expect((buttons[2] as HTMLButtonElement).disabled).toBe(true);
    });

    it('should render the items list with role="list"', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const list = compiled.querySelector('.dcx-ng-navbar__items') as HTMLElement;
      expect(list.getAttribute('role')).toBe('list');
    });
  });
});

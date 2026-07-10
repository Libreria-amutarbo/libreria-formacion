import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DcxNgScrollTopDownComponent } from './dcx-ng-scroll-top-down.component';

describe('DcxNgScrollTopDownComponent', () => {
  let component: DcxNgScrollTopDownComponent;
  let fixture: ComponentFixture<DcxNgScrollTopDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgScrollTopDownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgScrollTopDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.smooth()).toBe(true);
    expect(component.size()).toBe('m');
    expect(component.iconSize()).toBe('s');
    expect(component.showTop()).toBe(true);
    expect(component.showBottom()).toBe(true);
  });

  it('should default to Spanish labels and chevron icons (design)', () => {
    expect(component.topLabel()).toBe('Ir arriba');
    expect(component.bottomLabel()).toBe('Ir abajo');
    expect(component.topIcon()).toBe('chevron-up');
    expect(component.bottomIcon()).toBe('chevron-down');
    expect(component.groupLabel()).toBe('Controles de desplazamiento');
  });

  it('should include base and size classes', () => {
    expect(component.scrollClasses()).toContain('dcx-ng-scroll-top-down');
    expect(component.scrollClasses()).toContain('dcx-ng-scroll-top-down--m');
  });

  it('should hide top button when at the top', () => {
    fixture.detectChanges();
    expect(component.isTopVisible()).toBe(false);
    
    const topButton = fixture.nativeElement.querySelector('.dcx-ng-scroll-top-down__button--top');
    expect(topButton).toBeFalsy();
  });

  it('should show top button when scrolled down', fakeAsync(() => {
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.isTopVisible()).toBe(true);
    const topButton = fixture.nativeElement.querySelector('.dcx-ng-scroll-top-down__button--top');
    expect(topButton).toBeTruthy();
  }));

  it('should hide bottom button when at the bottom', fakeAsync(() => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 400, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 600, configurable: true });
    
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.isBottomVisible()).toBe(false);
    const bottomButton = fixture.nativeElement.querySelector('.dcx-ng-scroll-top-down__button--bottom');
    expect(bottomButton).toBeFalsy();
  }));

  it('should show both buttons when in the middle', fakeAsync(() => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 400, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 300, configurable: true });
    
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.isTopVisible()).toBe(true);
    expect(component.isBottomVisible()).toBe(true);
    
    const topButton = fixture.nativeElement.querySelector('.dcx-ng-scroll-top-down__button--top');
    const bottomButton = fixture.nativeElement.querySelector('.dcx-ng-scroll-top-down__button--bottom');
    expect(topButton).toBeTruthy();
    expect(bottomButton).toBeTruthy();
  }));

  it('should apply size class to rendered buttons', fakeAsync(() => {
    Object.defineProperty(window, 'scrollY', { value: 300, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      '.dcx-ng-scroll-top-down__button',
    );

    expect(buttons.length).toBe(2);
    expect(buttons[0].classList.contains('dcx-ng-scroll-top-down__button--l')).toBe(true);
    expect(buttons[1].classList.contains('dcx-ng-scroll-top-down__button--l')).toBe(true);
  }));

  it('should add top-only class when bottom is hidden by scroll', fakeAsync(() => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 400, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 600, configurable: true });
    
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.scrollClasses()).toContain(
      'dcx-ng-scroll-top-down--top-only',
    );
  }));

  it('should add hidden class when both are hidden', fakeAsync(() => {
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 400, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 400, configurable: true });
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.scrollClasses()).toContain('dcx-ng-scroll-top-down--hidden');
  }));

  it('should scroll window to top', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation();

    component.scrollToTop();

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('should scroll window to bottom', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation();
    const documentElement = document.documentElement;
    const body = document.body;

    Object.defineProperty(documentElement, 'scrollHeight', {
      value: 1200,
      configurable: true,
    });
    Object.defineProperty(body, 'scrollHeight', {
      value: 1100,
      configurable: true,
    });

    component.scrollToBottom();

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 1200,
      behavior: 'smooth',
    });
  });

  it('should use auto behavior when smooth is false', () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo').mockImplementation();
    fixture.componentRef.setInput('smooth', false);
    fixture.detectChanges();

    component.scrollToTop();

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'auto',
    });
  });

  describe('WCAG AA', () => {
    const showButtons = () => {
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 1000, configurable: true });
      Object.defineProperty(document.documentElement, 'clientHeight', { value: 400, configurable: true });
      Object.defineProperty(window, 'scrollY', { value: 300, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();
    };

    it('renders native <button> controls with an aria-label and a hidden icon', fakeAsync(() => {
      showButtons();
      tick();
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('button.dcx-ng-scroll-top-down__button');
      expect(buttons.length).toBe(2);
      expect(buttons[0].getAttribute('aria-label')).toBe('Ir arriba');
      expect(buttons[1].getAttribute('aria-label')).toBe('Ir abajo');
      expect(buttons[0].getAttribute('type')).toBe('button');

      const icon = buttons[0].querySelector('dcx-ng-icon');
      expect(icon?.getAttribute('aria-hidden')).toBe('true');
    }));

    it('exposes the group with role="group" and aria-label', () => {
      const group = fixture.nativeElement.querySelector('.dcx-ng-scroll-top-down__group');
      expect(group.getAttribute('role')).toBe('group');
      expect(group.getAttribute('aria-label')).toBe('Controles de desplazamiento');
    });

    it('forces instant scroll when prefers-reduced-motion is active', () => {
      const original = window.matchMedia;
      (window as unknown as { matchMedia: unknown }).matchMedia = (query: string) =>
        ({ matches: query.includes('reduce'), media: query, addEventListener() {}, removeEventListener() {} }) as unknown as MediaQueryList;

      try {
        fixture.componentRef.setInput('smooth', true);
        fixture.detectChanges();
        expect(component.scrollBehavior()).toBe('auto');
      } finally {
        (window as unknown as { matchMedia: unknown }).matchMedia = original;
      }
    });
  });
});

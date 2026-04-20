import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should include base and size classes', () => {
    expect(component.scrollClasses()).toContain('dcx-ng-scroll-top-down');
    expect(component.scrollClasses()).toContain('dcx-ng-scroll-top-down--m');
  });

  it('should apply size class to rendered buttons', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll(
      'dcx-ng-button.dcx-ng-scroll-top-down__button',
    );

    expect(buttons.length).toBe(2);
    expect(buttons[0].classList.contains('dcx-ng-scroll-top-down__button--l')).toBe(true);
    expect(buttons[1].classList.contains('dcx-ng-scroll-top-down__button--l')).toBe(true);
  });

  it('should add top-only class when bottom is hidden', () => {
    fixture.componentRef.setInput('showBottom', false);
    fixture.detectChanges();

    expect(component.scrollClasses()).toContain(
      'dcx-ng-scroll-top-down--top-only',
    );
  });

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

  it('should scroll a container to top and bottom', () => {
    const container = document.createElement('div');
    const scrollToSpy = jest.fn();
    Object.defineProperty(container, 'scrollTo', {
      value: scrollToSpy,
      configurable: true,
    });
    Object.defineProperty(container, 'scrollHeight', {
      value: 900,
      configurable: true,
    });
    Object.defineProperty(container, 'clientHeight', {
      value: 300,
      configurable: true,
    });

    fixture.componentRef.setInput('container', container);
    fixture.detectChanges();

    component.scrollToTop();
    component.scrollToBottom();

    expect(scrollToSpy).toHaveBeenNthCalledWith(1, {
      top: 0,
      behavior: 'smooth',
    });
    expect(scrollToSpy).toHaveBeenNthCalledWith(2, {
      top: 600,
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
});

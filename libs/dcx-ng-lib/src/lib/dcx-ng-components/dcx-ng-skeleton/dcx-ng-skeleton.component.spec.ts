import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSkeletonComponent } from './dcx-ng-skeleton.component';

describe('DcxNgSkeletonComponent', () => {
  let component: DcxNgSkeletonComponent;
  let fixture: ComponentFixture<DcxNgSkeletonComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgSkeletonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSkeletonComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    expect(component.shape()).toBe('rectangle');
    expect(component.width()).toBe('100%');
    expect(component.height()).toBe('1rem');
    expect(component.size()).toBeNull();
    expect(component.borderRadius()).toBeNull();
    expect(component.animation()).toBe('wave');
  });

  it('should render the base and wave classes by default', () => {
    expect(hostElement.classList.contains('dcx-skeleton')).toBe(true);
    expect(hostElement.classList.contains('dcx-skeleton--wave')).toBe(true);
    expect(hostElement.classList.contains('dcx-skeleton--circle')).toBe(
      false,
    );
  });

  it('should compute width and height from inputs when size is not provided', () => {
    fixture.componentRef.setInput('width', '10rem');
    fixture.componentRef.setInput('height', '4rem');
    fixture.detectChanges();

    expect(component.computedWidth()).toBe('10rem');
    expect(component.computedHeight()).toBe('4rem');
    expect(hostElement.style.getPropertyValue('--dcx-skeleton-width')).toBe(
      '10rem',
    );
    expect(hostElement.style.getPropertyValue('--dcx-skeleton-height')).toBe(
      '4rem',
    );
  });

  it('should compute size as width and height when size is provided', () => {
    fixture.componentRef.setInput('width', '10rem');
    fixture.componentRef.setInput('height', '4rem');
    fixture.componentRef.setInput('size', '3rem');
    fixture.detectChanges();

    expect(component.computedWidth()).toBe('3rem');
    expect(component.computedHeight()).toBe('3rem');
    expect(hostElement.style.getPropertyValue('--dcx-skeleton-width')).toBe(
      '3rem',
    );
    expect(hostElement.style.getPropertyValue('--dcx-skeleton-height')).toBe(
      '3rem',
    );
  });

  it('should render circle class and pill radius when shape is circle', () => {
    fixture.componentRef.setInput('shape', 'circle');
    fixture.detectChanges();

    expect(hostElement.classList.contains('dcx-skeleton--circle')).toBe(true);
    expect(component.computedBorderRadius()).toBe('var(--r-pill, 999px)');
  });

  it('should use custom border radius for rectangles', () => {
    fixture.componentRef.setInput('borderRadius', '16px');
    fixture.detectChanges();

    expect(component.computedBorderRadius()).toBe('16px');
    expect(
      hostElement.style.getPropertyValue('--dcx-skeleton-border-radius'),
    ).toBe('16px');
  });

  it('should render no animation class when animation is none', () => {
    fixture.componentRef.setInput('animation', 'none');
    fixture.detectChanges();

    expect(hostElement.classList.contains('dcx-skeleton--none')).toBe(true);
    expect(hostElement.classList.contains('dcx-skeleton--wave')).toBe(false);
  });

  it('should set aria-hidden on the host', () => {
    expect(hostElement.getAttribute('aria-hidden')).toBe('true');
  });
});

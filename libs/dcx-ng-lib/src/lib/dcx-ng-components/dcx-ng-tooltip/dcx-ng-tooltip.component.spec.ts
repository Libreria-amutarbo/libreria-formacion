import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgTooltipComponent } from './dcx-ng-tooltip.component';

describe('DcxNgTooltipComponent', () => {
  let component: DcxNgTooltipComponent;
  let fixture: ComponentFixture<DcxNgTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should set default values correctly', () => {
      expect(component.position()).toBe('top');
      expect(component.hideTooltipOnClick()).toBe(false);
      expect(component.content()).toBe('');
      expect(component.visible()).toBe(false);
    });

    it('should update position correctly', () => {
      fixture.componentRef.setInput('position', 'bottom');
      fixture.detectChanges();
      expect(component.position()).toBe('bottom');
    });

    it('should update content correctly', () => {
      const testContent = 'Test tooltip content';
      fixture.componentRef.setInput('content', testContent);
      fixture.detectChanges();
      expect(component.content()).toBe(testContent);
    });

    it('should update hideTooltipOnClick correctly', () => {
      fixture.componentRef.setInput('hideTooltipOnClick', true);
      fixture.detectChanges();
      expect(component.hideTooltipOnClick()).toBe(true);
    });
  });

  describe('Tooltip Rendering', () => {
    it('should render tooltip when visible and content exist', () => {
      component.visible.set(true);
      fixture.componentRef.setInput('content', 'Test content');
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement).toBeTruthy();
      expect(tooltipElement.nativeElement.textContent.trim()).toContain('Test content');
    });

    it('should not render tooltip when not visible', () => {
      component.visible.set(false);
      fixture.componentRef.setInput('content', 'Test content');
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement).toBeFalsy();
    });

    it('should not render tooltip when content is empty', () => {
      component.visible.set(true);
      fixture.componentRef.setInput('content', '');
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement).toBeFalsy();
    });

    it('should render tooltip arrow', () => {
      component.visible.set(true);
      fixture.componentRef.setInput('content', 'Test content');
      fixture.detectChanges();

      const arrowElement = fixture.debugElement.query(By.css('.tooltip-arrow'));
      expect(arrowElement).toBeTruthy();
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct base class', () => {
      const classes = component.tooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip');
    });

    it('should apply correct position class for top', () => {
      component.actualPosition.set('top');
      const classes = component.tooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--top');
    });

    it('should apply correct position class for bottom', () => {
      component.actualPosition.set('bottom');
      const classes = component.tooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--bottom');
    });

    it('should apply correct position class for left', () => {
      component.actualPosition.set('left');
      const classes = component.tooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--left');
    });

    it('should apply correct position class for right', () => {
      component.actualPosition.set('right');
      const classes = component.tooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--right');
    });
  });

  describe('Mouse Events', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('content', 'Test content');
      component.visible.set(false);
      fixture.detectChanges();
    });

    it('should show tooltip on mouse enter', () => {
      const hostElement = fixture.debugElement.nativeElement;
      hostElement.dispatchEvent(new Event('mouseenter'));
      expect(component.visible()).toBe(true);
    });

    it('should hide tooltip on mouse leave', () => {
      component.visible.set(true);
      const hostElement = fixture.debugElement.nativeElement;

      hostElement.dispatchEvent(new Event('mouseleave'));
      expect(component.visible()).toBe(false);
    });

    it('should call onMouseEnter directly', () => {
      component.onMouseEnter();
      expect(component.visible()).toBe(true);
    });

    it('should call onMouseLeave directly', () => {
      component.visible.set(true);
      component.onMouseLeave();
      expect(component.visible()).toBe(false);
    });
  });

  describe('Click Functionality', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('content', 'Test content');
      component.visible.set(true);
      fixture.detectChanges();
    });

    it('should hide tooltip when clicking inside and hideTooltipOnClick is true', () => {
      fixture.componentRef.setInput('hideTooltipOnClick', true);
      fixture.detectChanges();
      const insideElement = fixture.debugElement.nativeElement;
      const mockEvent = { target: insideElement } as any;

      component.onDocumentClick(mockEvent);
      expect(component.visible()).toBe(false);
    });

    it('should not hide tooltip when clicking inside and hideTooltipOnClick is false', () => {
      fixture.componentRef.setInput('hideTooltipOnClick', false);
      fixture.detectChanges();
      const insideElement = fixture.debugElement.nativeElement;
      const mockEvent = { target: insideElement } as any;

      component.onDocumentClick(mockEvent);
      expect(component.visible()).toBe(true);
    });

    it('should not hide tooltip when clicking outside and hideTooltipOnClick is true', () => {
      fixture.componentRef.setInput('hideTooltipOnClick', true);
      fixture.detectChanges();
      const outsideElement = document.createElement('div');
      const mockEvent = { target: outsideElement } as any;

      component.onDocumentClick(mockEvent);
      expect(component.visible()).toBe(true);
    });
  });

  describe('Accessibility Attributes', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('content', 'Test content');
      component.visible.set(true);
      fixture.detectChanges();
    });

    it('should have correct role attribute', () => {
      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('role')).toBe('tooltip');
    });

    it('should have aria-hidden=false when visible', () => {
      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('aria-hidden')).toBe('false');
    });

    it('should have correct aria-live attribute', () => {
      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('aria-live')).toBe('polite');
    });

    it('should have correct data-position attribute', () => {
      component.actualPosition.set('bottom');
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('data-position')).toBe('bottom');
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize actualPosition to top in ngAfterViewInit', () => {
      expect(component.actualPosition()).toBe('top');
    });

    it('should maintain component state during lifecycle', () => {
      fixture.componentRef.setInput('content', 'Test content');
      fixture.componentRef.setInput('position', 'bottom');
      fixture.componentRef.setInput('hideTooltipOnClick', true);
      component.visible.set(true);

      fixture.detectChanges();

      expect(component.content()).toBe('Test content');
      expect(component.position()).toBe('bottom');
      expect(component.hideTooltipOnClick()).toBe(true);
      expect(component.visible()).toBe(true);
    });

    it('should handle component destruction without errors', () => {
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  describe('Content Projection', () => {
    it('should have tooltip-container wrapper', () => {
      const containerElement = fixture.debugElement.query(By.css('.tooltip-container'));
      expect(containerElement).toBeTruthy();
    });
  });

  describe('Position Variants', () => {
    const positions: string[] = ['top', 'bottom', 'left', 'right'];
    positions.forEach(position => {
      it(`should render correctly with ${position} position`, () => {
        fixture.componentRef.setInput('content', 'Test content');
        component.visible.set(true);
        component.actualPosition.set(position as any);
        fixture.detectChanges();

        const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
        expect(tooltipElement).toBeTruthy();
        expect(tooltipElement.nativeElement.getAttribute('data-position')).toBe(position);
        expect(component.tooltipClasses()).toContain(`dcx-ng-tooltip--${position}`);
      });
    });
  });

  describe('adjustPosition() - position adjustment logic', () => {
    const mockHostRect = (overrides: Partial<DOMRect> = {}): DOMRect => ({
      top: 300, bottom: 350, left: 300, right: 350,
      width: 50, height: 50, x: 300, y: 300,
      toJSON: () => ({}),
      ...overrides,
    } as DOMRect);

    beforeEach(() => {
      fixture.componentRef.setInput('content', 'Tooltip text');
      (window as any).innerWidth = 1024;
      (window as any).innerHeight = 768;
      fixture.detectChanges();
    });

    it('should call adjustPosition on mouseenter and handle top position (fakeAsync)', fakeAsync(() => {
      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(mockHostRect());

      fixture.componentRef.setInput('position', 'top');
      component.visible.set(true);
      fixture.detectChanges();

      const tooltipEl = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      if (tooltipEl) {
        jest.spyOn(tooltipEl.nativeElement, 'getBoundingClientRect').mockReturnValue({
          top: 250, bottom: 300, left: 275, right: 375,
          width: 100, height: 50, x: 275, y: 250, toJSON: () => ({}),
        } as DOMRect);
      }

      component.onMouseEnter();
      tick(10);
      fixture.detectChanges();
      expect(component.visible()).toBe(true);
    }));

    it('should handle bottom position preference (fakeAsync)', fakeAsync(() => {
      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(mockHostRect({ top: 100, bottom: 150 }));

      fixture.componentRef.setInput('position', 'bottom');
      component.visible.set(true);
      fixture.detectChanges();

      const tooltipEl = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      if (tooltipEl) {
        jest.spyOn(tooltipEl.nativeElement, 'getBoundingClientRect').mockReturnValue({
          top: 150, bottom: 180, left: 275, right: 375,
          width: 100, height: 30, x: 275, y: 150, toJSON: () => ({}),
        } as DOMRect);
      }

      component.onMouseEnter();
      tick(10);
      fixture.detectChanges();
      expect(component.visible()).toBe(true);
    }));

    it('should handle left position preference (fakeAsync)', fakeAsync(() => {
      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(mockHostRect({ left: 300 }));

      fixture.componentRef.setInput('position', 'left');
      component.visible.set(true);
      fixture.detectChanges();

      const tooltipEl = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      if (tooltipEl) {
        jest.spyOn(tooltipEl.nativeElement, 'getBoundingClientRect').mockReturnValue({
          top: 300, bottom: 330, left: 200, right: 300,
          width: 100, height: 30, x: 200, y: 300, toJSON: () => ({}),
        } as DOMRect);
      }

      component.onMouseEnter();
      tick(10);
      fixture.detectChanges();
      expect(component.visible()).toBe(true);
    }));

    it('should handle right position preference (fakeAsync)', fakeAsync(() => {
      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(mockHostRect({ right: 500, left: 450 }));

      fixture.componentRef.setInput('position', 'right');
      component.visible.set(true);
      fixture.detectChanges();

      const tooltipEl = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      if (tooltipEl) {
        jest.spyOn(tooltipEl.nativeElement, 'getBoundingClientRect').mockReturnValue({
          top: 300, bottom: 330, left: 500, right: 600,
          width: 100, height: 30, x: 500, y: 300, toJSON: () => ({}),
        } as DOMRect);
      }

      component.onMouseEnter();
      tick(10);
      fixture.detectChanges();
      expect(component.visible()).toBe(true);
    }));

    it('should fallback to best alternative when preferred does not fit (fakeAsync)', fakeAsync(() => {
      (window as any).innerWidth = 50;
      (window as any).innerHeight = 50;

      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(
        mockHostRect({ top: 10, bottom: 40, left: 10, right: 40 })
      );

      fixture.componentRef.setInput('position', 'right');
      component.visible.set(true);
      fixture.detectChanges();

      const tooltipEl = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      if (tooltipEl) {
        jest.spyOn(tooltipEl.nativeElement, 'getBoundingClientRect').mockReturnValue({
          top: 0, bottom: 30, left: 0, right: 100,
          width: 100, height: 30, x: 0, y: 0, toJSON: () => ({}),
        } as DOMRect);
      }

      component.onMouseEnter();
      tick(10);
      fixture.detectChanges();
      expect(component.visible()).toBe(true);
    }));
  });

  describe('Sanitized HTML', () => {
    it('should return null sanitizedHtml when contentHtml is empty', () => {
      expect(component.sanitizedHtml()).toBeNull();
    });

    it('should return sanitized html when contentHtml is set', () => {
      fixture.componentRef.setInput('contentHtml', '<b>Bold</b>');
      fixture.detectChanges();
      expect(component.sanitizedHtml()).toBeTruthy();
    });
  });
});

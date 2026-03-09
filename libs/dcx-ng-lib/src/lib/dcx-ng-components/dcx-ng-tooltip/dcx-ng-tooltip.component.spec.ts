import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxPosition } from '../../core/interfaces';
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

  // Tests para propiedades de entrada
  describe('Input Properties', () => {
    it('should set default values correctly', () => {
      expect(component.position).toBe('top');
      expect(component.hideTooltipOnClick).toBe(false);
      expect(component.content).toBe('');
      expect(component.visible).toBe(false);
    });

    it('should update position correctly', () => {
      component.position = 'bottom';
      fixture.detectChanges();
      expect(component.position).toBe('bottom');
    });

    it('should update content correctly', () => {
      const testContent = 'Test tooltip content';
      component.content = testContent;
      fixture.detectChanges();
      expect(component.content).toBe(testContent);
    });

    it('should update hideTooltipOnClick correctly', () => {
      component.hideTooltipOnClick = true;
      fixture.detectChanges();
      expect(component.hideTooltipOnClick).toBe(true);
    });
  });

  // Tests para renderizado del tooltip
  describe('Tooltip Rendering', () => {
    it('should render tooltip when visible and content exist', () => {
      component.visible = true;
      component.content = 'Test content';
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement).toBeTruthy();
      expect(tooltipElement.nativeElement.textContent.trim()).toContain('Test content');
    });

    it('should not render tooltip when not visible', () => {
      component.visible = false;
      component.content = 'Test content';
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement).toBeFalsy();
    });

    it('should not render tooltip when content is empty', () => {
      component.visible = true;
      component.content = '';
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement).toBeFalsy();
    });

    it('should render tooltip arrow', () => {
      component.visible = true;
      component.content = 'Test content';
      fixture.detectChanges();

      const arrowElement = fixture.debugElement.query(By.css('.tooltip-arrow'));
      expect(arrowElement).toBeTruthy();
    });
  });

  // Tests para clases CSS
  describe('CSS Classes', () => {
    it('should apply correct base class', () => {
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip');
    });

    it('should apply correct position class for TOP', () => {
      component.actualPosition = DcxPosition.TOP;
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--top');
    });

    it('should apply correct position class for BOTTOM', () => {
      component.actualPosition = DcxPosition.BOTTOM;
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--bottom');
    });

    it('should apply correct position class for LEFT', () => {
      component.actualPosition = DcxPosition.LEFT;
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--left');
    });

    it('should apply correct position class for RIGHT', () => {
      component.actualPosition = DcxPosition.RIGHT;
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--right');
    });
  });

  // Tests para eventos de mouse
  describe('Mouse Events', () => {
    beforeEach(() => {
      component.content = 'Test content';
      component.visible = false;
      fixture.detectChanges();
    });

    it('should show tooltip on mouse enter', () => {
      const hostElement = fixture.debugElement.nativeElement;
      hostElement.dispatchEvent(new Event('mouseenter'));
      expect(component.visible).toBe(true);
    });

    it('should hide tooltip on mouse leave', () => {
      component.visible = true;
      const hostElement = fixture.debugElement.nativeElement;

      hostElement.dispatchEvent(new Event('mouseleave'));
      expect(component.visible).toBe(false);
    });

    it('should call onMouseEnter directly', () => {
      component.onMouseEnter();
      expect(component.visible).toBe(true);
    });

    it('should call onMouseLeave directly', () => {
      component.visible = true;
      component.onMouseLeave();
      expect(component.visible).toBe(false);
    });
  });

  // Tests para funcionalidad de clic
  describe('Click Functionality', () => {
    beforeEach(() => {
      component.content = 'Test content';
      component.visible = true;
      fixture.detectChanges();
    });

    it('should hide tooltip when clicking inside and hideTooltipOnClick is true', () => {
      component.hideTooltipOnClick = true;
      const insideElement = fixture.debugElement.nativeElement;
      const mockEvent = { target: insideElement } as any;

      component.onDocumentClick(mockEvent);
      expect(component.visible).toBe(false);
    });

    it('should not hide tooltip when clicking inside and hideTooltipOnClick is false', () => {
      component.hideTooltipOnClick = false;
      const insideElement = fixture.debugElement.nativeElement;
      const mockEvent = { target: insideElement } as any;

      component.onDocumentClick(mockEvent);
      expect(component.visible).toBe(true);
    });

    it('should not hide tooltip when clicking outside and hideTooltipOnClick is true', () => {
      component.hideTooltipOnClick = true;
      const outsideElement = document.createElement('div');
      const mockEvent = { target: outsideElement } as any;

      component.onDocumentClick(mockEvent);
      expect(component.visible).toBe(true);
    });
  });

  // Tests para atributos de accesibilidad
  describe('Accessibility Attributes', () => {
    beforeEach(() => {
      component.content = 'Test content';
      component.visible = true;
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
      component.actualPosition = DcxPosition.BOTTOM;
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('data-position')).toBe('bottom');
    });
  });

  // Tests para el ciclo de vida del componente
  describe('Component Lifecycle', () => {
    it('should initialize actualPosition to TOP in ngAfterViewInit', () => {
      expect(component.actualPosition).toBe(DcxPosition.TOP);
    });

    it('should maintain component state during lifecycle', () => {
      component.content = 'Test content';
      component.position = 'bottom';
      component.hideTooltipOnClick = true;
      component.visible = true;

      fixture.detectChanges();

      expect(component.content).toBe('Test content');
      expect(component.position).toBe('bottom');
      expect(component.hideTooltipOnClick).toBe(true);
      expect(component.visible).toBe(true);
    });

    it('should handle component destruction without errors', () => {
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });
  });

  // Tests para el contenido proyectado
  describe('Content Projection', () => {
    it('should have tooltip-container wrapper', () => {
      const containerElement = fixture.debugElement.query(By.css('.tooltip-container'));
      expect(containerElement).toBeTruthy();
    });
  });

  describe('Position Variants', () => {
    Object.values(DcxPosition).forEach(position => {
      it(`should render correctly with ${position} position`, () => {
        component.content = 'Test content';
        component.visible = true;
        component.actualPosition = position;
        fixture.detectChanges();

        const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
        expect(tooltipElement).toBeTruthy();
        expect(tooltipElement.nativeElement.getAttribute('data-position')).toBe(position);
        expect(component.getTooltipClasses()).toContain(`dcx-ng-tooltip--${position}`);
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
      component.content = 'Tooltip text';
      (window as any).innerWidth = 1024;
      (window as any).innerHeight = 768;
      fixture.detectChanges();
    });

    it('should call adjustPosition on mouseenter and handle TOP position (fakeAsync)', fakeAsync(() => {
      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(mockHostRect());

      component.position = DcxPosition.TOP;
      component.visible = true;
      fixture.detectChanges();

      // Mock the tooltip element's getBoundingClientRect
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
      expect(component.visible).toBe(true);
    }));

    it('should handle BOTTOM position preference (fakeAsync)', fakeAsync(() => {
      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(mockHostRect({ top: 100, bottom: 150 }));

      component.position = DcxPosition.BOTTOM;
      component.visible = true;
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
      expect(component.visible).toBe(true);
    }));

    it('should handle LEFT position preference (fakeAsync)', fakeAsync(() => {
      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(mockHostRect({ left: 300 }));

      component.position = DcxPosition.LEFT;
      component.visible = true;
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
      expect(component.visible).toBe(true);
    }));

    it('should handle RIGHT position preference (fakeAsync)', fakeAsync(() => {
      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(mockHostRect({ right: 500, left: 450 }));

      component.position = DcxPosition.RIGHT;
      component.visible = true;
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
      expect(component.visible).toBe(true);
    }));

    it('should fallback to best alternative when preferred does not fit (fakeAsync)', fakeAsync(() => {
      (window as any).innerWidth = 50;
      (window as any).innerHeight = 50;

      const hostEl = fixture.debugElement.nativeElement;
      jest.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue(
        mockHostRect({ top: 10, bottom: 40, left: 10, right: 40 })
      );

      component.position = DcxPosition.RIGHT;
      component.visible = true;
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
      expect(component.visible).toBe(true);
    }));
  });
});

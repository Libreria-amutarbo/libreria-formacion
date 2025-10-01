import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgTooltipComponent, TooltipPosition } from './dcx-ng-tooltip.component';

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
      expect(component.position).toBe(TooltipPosition.TOP);
      expect(component.hideTooltipOnClick).toBe(false);
      expect(component.content).toBe('');
      expect(component.visible).toBe(false);
    });

    it('should update position correctly', () => {
      component.position = TooltipPosition.BOTTOM;
      fixture.detectChanges();
      expect(component.position).toBe(TooltipPosition.BOTTOM);
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
      expect(tooltipElement.nativeElement.textContent.trim()).toBe('Test content');
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
      component.position = TooltipPosition.TOP;
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--top');
    });

    it('should apply correct position class for BOTTOM', () => {
      component.position = TooltipPosition.BOTTOM;
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--bottom');
    });

    it('should apply correct position class for LEFT', () => {
      component.position = TooltipPosition.LEFT;
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--left');
    });

    it('should apply correct position class for RIGHT', () => {
      component.position = TooltipPosition.RIGHT;
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

    it('should show tooltip on mouse enter with delay', fakeAsync(() => {
      const hostElement = fixture.debugElement.nativeElement;
      
      hostElement.dispatchEvent(new Event('mouseenter'));
      expect(component.visible).toBe(true);
    }));

    it('should hide tooltip on mouse leave', () => {
      component.visible = true;
      const hostElement = fixture.debugElement.nativeElement;
      
      hostElement.dispatchEvent(new Event('mouseleave'));
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

    it('should setup click listener when hideTooltipOnClick is true', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      
      component.hideTooltipOnClick = true;
      component.ngOnInit();
      
      expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
      
      addEventListenerSpy.mockRestore();
    });

    it('should not setup click listener when hideTooltipOnClick is false', () => {
      const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
      
      component.hideTooltipOnClick = false;
      component.ngOnInit();
      
      expect(addEventListenerSpy).not.toHaveBeenCalled();
      
      addEventListenerSpy.mockRestore();
    });

    it('should hide tooltip when document is clicked and hideTooltipOnClick is true', () => {
      component.hideTooltipOnClick = true;
      component.ngOnInit();
      
      document.dispatchEvent(new Event('click'));
      expect(component.visible).toBe(false);
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

    it('should have correct aria-hidden attribute when visible', () => {
      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('aria-hidden')).toBe('false');
    });

    it('should have correct aria-live attribute', () => {
      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('aria-live')).toBe('polite');
    });

    it('should have correct data-position attribute', () => {
      component.position = TooltipPosition.BOTTOM;
      fixture.detectChanges();
      
      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('data-position')).toBe('bottom');
    });
  });

  // Tests para el ciclo de vida del componente
  describe('Component Lifecycle', () => {
    it('should remove event listener on destroy', () => {
      const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
      
      component.hideTooltipOnClick = true;
      component.ngOnInit();
      component.ngOnDestroy();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
      
      removeEventListenerSpy.mockRestore();
    });

    it('should handle destroy without listener gracefully', () => {
      component.hideTooltipOnClick = false;
      expect(() => component.ngOnDestroy()).not.toThrow();
    });
  });

  // Tests para el contenido proyectado
  describe('Content Projection', () => {
    it('should project content using ng-content', () => {
      const containerElement = fixture.debugElement.query(By.css('.tooltip-container'));
      expect(containerElement).toBeTruthy();
    });
  });

  // Tests para diferentes posiciones
  describe('Position Variants', () => {
    beforeEach(() => {
      component.content = 'Test content';
      component.visible = true;
    });

    Object.values(TooltipPosition).forEach(position => {
      it(`should render correctly with ${position} position`, () => {
        component.position = position;
        fixture.detectChanges();

        const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
        expect(tooltipElement).toBeTruthy();
        expect(tooltipElement.nativeElement.getAttribute('data-position')).toBe(position);
        expect(component.getTooltipClasses()).toContain(`dcx-ng-tooltip--${position}`);
      });
    });
  });
});

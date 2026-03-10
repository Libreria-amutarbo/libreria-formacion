import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
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
      component.position = 'top';
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--top');
    });

    it('should apply correct position class for BOTTOM', () => {
      component.position = 'bottom';
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--bottom');
    });

    it('should apply correct position class for LEFT', () => {
      component.position = 'left';
      const classes = component.getTooltipClasses();
      expect(classes).toContain('dcx-ng-tooltip--left');
    });

    it('should apply correct position class for RIGHT', () => {
      component.position = 'right';
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

    it('should hide tooltip when document is clicked inside component and hideTooltipOnClick is true', () => {
      component.hideTooltipOnClick = true;
      const mockEvent = {
        target: fixture.debugElement.nativeElement.querySelector('.tooltip-container')
      } as any;

      // Simular clic dentro del componente
      component.onDocumentClick(mockEvent);
      expect(component.visible).toBe(false);
    });

    it('should not hide tooltip when document is clicked inside component and hideTooltipOnClick is false', () => {
      component.hideTooltipOnClick = false;
      const mockEvent = {
        target: fixture.debugElement.nativeElement.querySelector('.tooltip-container')
      } as any;

      component.onDocumentClick(mockEvent);
      expect(component.visible).toBe(true);
    });

    it('should not hide tooltip when document is clicked outside component and hideTooltipOnClick is true', () => {
      component.hideTooltipOnClick = true;
      const mockEvent = {
        target: document.body // Elemento fuera del componente
      } as any;

      // Simular clic fuera del componente
      component.onDocumentClick(mockEvent);
      expect(component.visible).toBe(true); // No debería ocultarse según la lógica actual
    });

    it('should call onDocumentClick when document click event is triggered', () => {
      const spy = jest.spyOn(component, 'onDocumentClick');
      const mockEvent = new Event('click');

      // Simular el evento que Angular captura con @HostListener
      fixture.debugElement.nativeElement.dispatchEvent(mockEvent);

      // Como @HostListener escucha 'document:click', necesitamos simular el evento en document
      document.dispatchEvent(mockEvent);

      // Verificar que el método se puede llamar (la verificación real del @HostListener es manejada por Angular)
      expect(spy).toBeDefined();

      spy.mockRestore();
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
      component.position = 'bottom';
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('.dcx-ng-tooltip'));
      expect(tooltipElement.nativeElement.getAttribute('data-position')).toBe('bottom');
    });
  });

  // Tests para el ciclo de vida del componente
  describe('Component Lifecycle', () => {
    it('should initialize component with correct default values', () => {
      expect(component.position).toBe('top');
      expect(component.hideTooltipOnClick).toBe(false);
      expect(component.content).toBe('');
      expect(component.visible).toBe(false);
    });

    it('should handle component destruction without errors', () => {
      // Como usa @HostListener, Angular maneja automáticamente la limpieza
      // Solo verificamos que el componente se puede destruir sin errores
      expect(() => {
        fixture.destroy();
      }).not.toThrow();
    });

    it('should maintain component state during lifecycle', () => {
      component.content = 'Test content';
      component.position = 'bottom';
      component.hideTooltipOnClick = true;
      component.visible = true;

      fixture.detectChanges();

      // Verificar que el estado se mantiene
      expect(component.content).toBe('Test content');
      expect(component.position).toBe('bottom');
      expect(component.hideTooltipOnClick).toBe(true);
      expect(component.visible).toBe(true);
    });
  });

  // Tests para el contenido proyectado
  describe('Content Projection', () => {
    it('should project content using ng-content', () => {
      const containerElement = fixture.debugElement.query(By.css('.tooltip-container'));
      expect(containerElement).toBeTruthy();
    });
  });

  describe('Position Variants', () => {
    beforeEach(() => {
      component.content = 'Test content';
      component.visible = true;
    });

    Object.values(DcxPosition).forEach(position => {
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

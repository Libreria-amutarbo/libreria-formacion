import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgProgressbarComponent, DcxProgressStep } from './dcx-ng-progressbar.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DcxNgProgressbarComponent', () => {
  let component: DcxNgProgressbarComponent;
  let fixture: ComponentFixture<DcxNgProgressbarComponent>;
  let compiled: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgProgressbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgProgressbarComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs - Default values', () => {
    it('should have default variant as "default"', () => {
      expect(component.variant()).toBe('default');
    });

    it('should have default value as 0', () => {
      expect(component.value()).toBe(0);
    });

    it('should have segments as 5 by default', () => {
      expect(component.segments()).toBe(5);
    });
  });

  describe('Inputs - Update values', () => {
    it('should update variant to segmented', () => {
      fixture.componentRef.setInput('variant', 'segmented');
      expect(component.variant()).toBe('segmented');
    });

    it('should update value', () => {
      fixture.componentRef.setInput('value', 75);
      expect(component.value()).toBe(75);
    });

    it('should update segments', () => {
      fixture.componentRef.setInput('segments', 10);
      expect(component.segments()).toBe(10);
    });
  });

  describe('Computed - progressPercentage', () => {
    it('should return value when in range 0-100', () => {
      fixture.componentRef.setInput('value', 50);
      expect(component.progressPercentage()).toBe(50);
    });

    it('should clamp negative values to 0', () => {
      fixture.componentRef.setInput('value', -10);
      expect(component.progressPercentage()).toBe(0);
    });

    it('should clamp values above 100 to 100', () => {
      fixture.componentRef.setInput('value', 150);
      expect(component.progressPercentage()).toBe(100);
    });
  });

  describe('Computed - variant flags', () => {
    it('isDefaultVariant should be true when variant is default', () => {
      fixture.componentRef.setInput('variant', 'default');
      expect(component.isDefaultVariant()).toBe(true);
    });

    it('isSegmentedVariant should be true when variant is segmented', () => {
      fixture.componentRef.setInput('variant', 'segmented');
      expect(component.isSegmentedVariant()).toBe(true);
    });

    it('isStepperVariant should be true when variant is stepper', () => {
      fixture.componentRef.setInput('variant', 'stepper');
      expect(component.isStepperVariant()).toBe(true);
    });
  });

  describe('Computed - segmentArray', () => {
    it('should generate array with default 5 elements', () => {
      expect(component.segmentArray()).toHaveLength(5);
    });

    it('should generate array with 3 elements when segments is 3', () => {
      fixture.componentRef.setInput('segments', 3);
      expect(component.segmentArray()).toHaveLength(3);
    });
  });

  describe('Computed - stepProgress', () => {
    it('should return 0 when steps array is empty', () => {
      fixture.componentRef.setInput('steps', []);
      expect(component.stepProgress()).toBe(0);
    });

    it('should calculate progress correctly', () => {
      const steps: DcxProgressStep[] = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
        { label: 'Step 4' },
      ];
      fixture.componentRef.setInput('steps', steps);
      fixture.componentRef.setInput('currentStep', 2);
      expect(component.stepProgress()).toBe(50);
    });
  });

  describe('Methods - isStepCompleted', () => {
    beforeEach(() => {
      const steps: DcxProgressStep[] = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ];
      fixture.componentRef.setInput('steps', steps);
    });

    it('should return true for completed steps', () => {
      fixture.componentRef.setInput('currentStep', 3);
      expect(component.isStepCompleted(0)).toBe(true);
      expect(component.isStepCompleted(1)).toBe(true);
    });

    it('should return false for current step', () => {
      fixture.componentRef.setInput('currentStep', 2);
      expect(component.isStepCompleted(1)).toBe(false);
    });
  });

  describe('Methods - isStepActive', () => {
    beforeEach(() => {
      const steps: DcxProgressStep[] = [
        { label: 'Step 1' },
        { label: 'Step 2' },
        { label: 'Step 3' },
      ];
      fixture.componentRef.setInput('steps', steps);
    });

    it('should return true for current step', () => {
      fixture.componentRef.setInput('currentStep', 2);
      expect(component.isStepActive(1)).toBe(true);
    });

    it('should return false for completed steps', () => {
      fixture.componentRef.setInput('currentStep', 3);
      expect(component.isStepActive(0)).toBe(false);
    });
  });

  describe('Rendering - Default variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'default');
      fixture.componentRef.setInput('value', 60);
      fixture.detectChanges();
    });

    it('should render progress track', () => {
      const track = compiled.query(By.css('.dcx-progressbar__track'));
      expect(track).toBeTruthy();
    });

    it('should render progress fill with correct width', () => {
      const fill = compiled.query(By.css('.dcx-progressbar__fill'));
      expect(fill).toBeTruthy();
      expect(fill.nativeElement.style.getPropertyValue('--progress-width')).toBe('60%');
    });
  });

  describe('Rendering - Segmented variant', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'segmented');
      fixture.componentRef.setInput('segments', 5);
      fixture.detectChanges();
    });

    it('should render correct number of segment dividers', () => {
      const segmentElements = compiled.queryAll(By.css('.dcx-progressbar__segment'));
      expect(segmentElements.length).toBe(5);
    });

    it('should render 3 segments when segments input is 3', () => {
      fixture.componentRef.setInput('segments', 3);
      fixture.detectChanges();
      const segmentElements = compiled.queryAll(By.css('.dcx-progressbar__segment'));
      expect(segmentElements.length).toBe(3);
    });
  });

  describe('Rendering - Tooltip and Label', () => {
    it('should render tooltip when showTooltip is true', () => {
      fixture.componentRef.setInput('variant', 'default');
      fixture.componentRef.setInput('value', 75);
      fixture.componentRef.setInput('showTooltip', true);
      fixture.detectChanges();

      const tooltip = compiled.query(By.css('.dcx-progressbar__tooltip'));
      expect(tooltip).toBeTruthy();
      expect(tooltip.nativeElement.textContent.trim()).toBe('75%');
    });

    it('should render label when showLabel is true', () => {
      fixture.componentRef.setInput('variant', 'default');
      fixture.componentRef.setInput('value', 85);
      fixture.componentRef.setInput('showLabel', true);
      fixture.detectChanges();

      const label = compiled.query(By.css('.dcx-progressbar__label'));
      expect(label).toBeTruthy();
      expect(label.nativeElement.textContent.trim()).toBe('85%');
    });
  });

  describe('Rendering - Stepper variant', () => {
    const steps: DcxProgressStep[] = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ];

    beforeEach(() => {
      fixture.componentRef.setInput('variant', 'stepper');
      fixture.componentRef.setInput('steps', steps);
      fixture.componentRef.setInput('currentStep', 2);
      fixture.detectChanges();
    });

    it('should render correct number of steps', () => {
      const stepElements = compiled.queryAll(By.css('.dcx-progressbar__step'));
      expect(stepElements.length).toBe(3);
    });

    it('should render step labels', () => {
      const labels = compiled.queryAll(By.css('.dcx-progressbar__step-label'));
      expect(labels.length).toBe(3);
      expect(labels[0].nativeElement.textContent.trim()).toBe('Step 1');
    });

    it('should mark completed and active steps with correct classes', () => {
      const steps = compiled.queryAll(By.css('.dcx-progressbar__step'));
      expect(steps[0].nativeElement.classList.contains('dcx-progressbar__step--completed')).toBe(true);
      expect(steps[1].nativeElement.classList.contains('dcx-progressbar__step--active')).toBe(true);
    });

    it('should render checkmarks when showCheckmarks is true', () => {
      fixture.componentRef.setInput('showCheckmarks', true);
      fixture.detectChanges();
      const checkmarks = compiled.queryAll(By.css('.dcx-progressbar__checkmark'));
      expect(checkmarks.length).toBeGreaterThan(0);
    });
  });
});

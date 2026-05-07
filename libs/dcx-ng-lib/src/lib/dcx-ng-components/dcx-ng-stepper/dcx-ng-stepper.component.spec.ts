import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { DcxNgStepperComponent } from './dcx-ng-stepper.component';
import {
  DcxStepperChangeEvent,
  DcxStepperItem,
} from '../../core/interfaces/stepper';

describe('DcxNgStepperComponent', () => {
  let component: DcxNgStepperComponent;
  let fixture: ComponentFixture<DcxNgStepperComponent>;
  let compiled: DebugElement;

  const mockSteps: DcxStepperItem[] = [
    { id: '1', label: 'Step 1', description: 'Description 1' },
    { id: '2', label: 'Step 2', description: 'Description 2' },
    { id: '3', label: 'Step 3', description: 'Description 3' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgStepperComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all step headers', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();

    const stepButtons = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    );
    expect(stepButtons.length).toBe(3);
  });

  it('should activate first enabled step by default', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();

    const firstStepButton = compiled.nativeElement.querySelector(
      '.dcx-stepper__step--active',
    );
    expect(firstStepButton?.textContent).toContain('Step 1');
  });

  it('should activate specified activeStepId', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('activeStepId', '2');
    fixture.detectChanges();

    const activeStepButton = compiled.nativeElement.querySelector(
      '.dcx-stepper__step--active',
    );
    expect(activeStepButton?.textContent).toContain('Step 2');
  });

  it('should emit stepClick when clicking on a step', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();

    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');
    const secondStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[1];

    secondStepButton.click();

    expect(stepClickSpy).toHaveBeenCalledWith(mockSteps[1]);
  });

  it('should emit stepChange with correct event data', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();

    const stepChangeSpy = jest.spyOn(component.stepChange, 'emit');
    const secondStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[1];

    secondStepButton.click();

    const expectedEvent: DcxStepperChangeEvent = {
      previousStepId: '1',
      currentStepId: '2',
      previousIndex: 0,
      currentIndex: 1,
    };

    expect(stepChangeSpy).toHaveBeenCalledWith(expectedEvent);
  });

  it('should not allow click on disabled step', () => {
    const stepsWithDisabled: DcxStepperItem[] = [
      { id: '1', label: 'Step 1' },
      { id: '2', label: 'Step 2', disabled: true },
      { id: '3', label: 'Step 3' },
    ];

    fixture.componentRef.setInput('steps', stepsWithDisabled);
    fixture.detectChanges();

    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');
    const disabledStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[1];

    disabledStepButton.click();

    expect(stepClickSpy).not.toHaveBeenCalled();
  });

  it('should apply disabled class for disabled steps', () => {
    const stepsWithDisabled: DcxStepperItem[] = [
      { id: '1', label: 'Step 1' },
      { id: '2', label: 'Step 2', disabled: true },
    ];

    fixture.componentRef.setInput('steps', stepsWithDisabled);
    fixture.detectChanges();

    const disabledStep = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[1];
    expect(disabledStep.classList.contains('dcx-stepper__step--disabled')).toBe(
      true,
    );
  });

  it('should apply completed class for completed steps', () => {
    const stepsWithCompleted: DcxStepperItem[] = [
      { id: '1', label: 'Step 1', completed: true },
      { id: '2', label: 'Step 2' },
    ];

    fixture.componentRef.setInput('steps', stepsWithCompleted);
    fixture.detectChanges();

    const completedStep = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[0];
    expect(completedStep.classList.contains('dcx-stepper__step--completed')).toBe(
      true,
    );
  });

  it('should apply error class for error steps', () => {
    const stepsWithError: DcxStepperItem[] = [
      { id: '1', label: 'Step 1', error: true },
      { id: '2', label: 'Step 2' },
    ];

    fixture.componentRef.setInput('steps', stepsWithError);
    fixture.detectChanges();

    const errorStep = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[0];
    expect(errorStep.classList.contains('dcx-stepper__step--error')).toBe(true);
  });

  it('should not allow jumping steps in linear mode', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('linear', true);
    fixture.detectChanges();

    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');
    const thirdStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[2];

    thirdStepButton.click();

    expect(stepClickSpy).not.toHaveBeenCalled();
  });

  it('should not allow moving to the next step in linear mode when the current step is not completed', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('linear', true);
    fixture.detectChanges();

    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');
    const secondStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[1];

    secondStepButton.click();

    expect(stepClickSpy).not.toHaveBeenCalled();
  });

  it('should allow moving to the next step in linear mode when previous steps are completed', () => {
    const linearSteps: DcxStepperItem[] = [
      { id: '1', label: 'Step 1', completed: true },
      { id: '2', label: 'Step 2' },
      { id: '3', label: 'Step 3' },
    ];

    fixture.componentRef.setInput('steps', linearSteps);
    fixture.componentRef.setInput('linear', true);
    fixture.detectChanges();

    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');
    const secondStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[1];

    secondStepButton.click();

    expect(stepClickSpy).toHaveBeenCalledWith(linearSteps[1]);
  });

  it('should render step descriptions when provided', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();

    const descriptions = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__label-description',
    );
    expect(descriptions.length).toBe(3);
    expect(descriptions[0].textContent).toContain('Description 1');
  });

  it('should show step numbers by default', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();

    const numbers = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__number',
    );
    expect(numbers.length).toBeGreaterThan(0);
    expect(numbers[0].textContent).toContain('1');
  });

  it('should hide step numbers when showStepNumbers is false', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('showStepNumbers', false);
    fixture.detectChanges();

    const numbers = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__number',
    );
    expect(numbers.length).toBe(0);
  });

  it('should navigate with arrow keys in horizontal mode', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('orientation', 'horizontal');
    fixture.detectChanges();

    const firstStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[0];
    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');

    const arrowRightEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
    });
    firstStepButton.dispatchEvent(arrowRightEvent);

    expect(stepClickSpy).toHaveBeenCalled();
  });

  it('should navigate with arrow keys in vertical mode', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const firstStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[0];
    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');

    const arrowDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
    });
    firstStepButton.dispatchEvent(arrowDownEvent);

    expect(stepClickSpy).toHaveBeenCalled();
  });

  it('should apply correct orientation class', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const stepper = compiled.nativeElement.querySelector('.dcx-stepper');
    expect(stepper.classList.contains('dcx-stepper--vertical')).toBe(true);
  });

  it('should apply correct size class', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();

    const stepper = compiled.nativeElement.querySelector('.dcx-stepper');
    expect(stepper.classList.contains('dcx-stepper--l')).toBe(true);
  });

  it('should apply correct xl size class', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.componentRef.setInput('size', 'xl');
    fixture.detectChanges();

    const stepper = compiled.nativeElement.querySelector('.dcx-stepper');
    expect(stepper.classList.contains('dcx-stepper--xl')).toBe(true);
  });

  it('should not render content container when active step has no template', () => {
    const stepsWithoutTemplate: DcxStepperItem[] = [{ id: '1', label: 'Step 1' }];

    fixture.componentRef.setInput('steps', stepsWithoutTemplate);
    fixture.componentRef.setInput('activeStepId', '1');
    fixture.detectChanges();

    const content = compiled.nativeElement.querySelector('.dcx-stepper__content');
    expect(content).toBeNull();
  });

  it('should activate next step on Enter key', () => {
    fixture.componentRef.setInput('steps', mockSteps);
    fixture.detectChanges();

    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');
    const firstStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[0];

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    firstStepButton.dispatchEvent(enterEvent);

    expect(stepClickSpy).toHaveBeenCalled();
  });

  it('should skip disabled steps when navigating', () => {
    const stepsWithDisabled: DcxStepperItem[] = [
      { id: '1', label: 'Step 1' },
      { id: '2', label: 'Step 2', disabled: true },
      { id: '3', label: 'Step 3' },
    ];

    fixture.componentRef.setInput('steps', stepsWithDisabled);
    fixture.detectChanges();

    const stepClickSpy = jest.spyOn(component.stepClick, 'emit');
    const firstStepButton = compiled.nativeElement.querySelectorAll(
      '.dcx-stepper__step',
    )[0];

    const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    firstStepButton.dispatchEvent(arrowRightEvent);

    expect(stepClickSpy).toHaveBeenCalledWith(stepsWithDisabled[2]);
  });
});

import { LitElement } from 'lit';
import { DcxStepperItem, DcxStepperSize } from '../../core/interfaces/stepper';
export declare class DcxWebStepper extends LitElement {
    accessor steps: DcxStepperItem[];
    accessor activeStepId: string | number;
    accessor orientation: 'horizontal' | 'vertical';
    accessor linear: boolean;
    accessor showStepNumbers: boolean;
    accessor size: DcxStepperSize;
    accessor ariaLabel: string | null;
    accessor internalActiveStepId: string | number | null;
    static styles: import('lit').CSSResult;
    connectedCallback(): void;
    updated(changed: Map<string, unknown>): void;
    get activeStepIndex(): number;
    get activeStep(): DcxStepperItem | null;
    get activeStepContent(): boolean;
    get stepperClasses(): string;
    get headerClasses(): string;
    get contentClasses(): string;
    emit(name: string, detail?: unknown): void;
    private syncActiveStepId;
    private setFirstEnabledStepAsActive;
    isActive(stepId: string | number): boolean;
    getStepClasses(step: DcxStepperItem): string;
    onStepClick(step: DcxStepperItem, index: number): void;
    onStepKeydown(event: KeyboardEvent, step: DcxStepperItem, index: number): void;
    private navigateByArrowKey;
    private activateStepAtIndex;
    private findNextEnabledStep;
    private findFirstEnabledStep;
    private findLastEnabledStep;
    private canNavigateToIndex;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-stepper': DcxWebStepper;
    }
}

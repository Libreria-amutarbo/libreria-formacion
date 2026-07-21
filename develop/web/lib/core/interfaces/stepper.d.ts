export type DcxStepperSize = 's' | 'm' | 'l' | 'xl';
export interface DcxStepperItem {
    id: string | number;
    label: string;
    description?: string;
    disabled?: boolean;
    completed?: boolean;
    error?: boolean;
    optional?: boolean;
    icon?: string;
    contentTpl?: unknown;
}
export interface DcxStepperChangeEvent {
    previousStepId: string | number | null;
    currentStepId: string | number;
    previousIndex: number;
    currentIndex: number;
}

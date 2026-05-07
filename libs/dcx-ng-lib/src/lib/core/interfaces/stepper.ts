import { TemplateRef } from '@angular/core';

export interface DcxStepperItem {
  id: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  completed?: boolean;
  error?: boolean;
  optional?: boolean;
  icon?: string;
  contentTpl?: TemplateRef<unknown>;
}

export interface DcxStepperChangeEvent {
  previousStepId: string | number | null;
  currentStepId: string | number;
  previousIndex: number;
  currentIndex: number;
}

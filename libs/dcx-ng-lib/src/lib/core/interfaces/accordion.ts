import { TemplateRef } from '@angular/core';

export type DcxAccordionTransition = 'smooth' | 'fast' | 'slow' | 'none';
export type DcxAccordionVariant = 'default' | 'flush';

export interface DcxNgAccordionItem {
  id: string;
  title: string;
  description?: string;
  content?: string;
  contentTemplate?: TemplateRef<any>;
  disabled?: boolean;
  disabledContent?: boolean;
  icon?: string;
  expanded?: boolean;
  maxContentHeight?: string;
}

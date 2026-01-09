import { TemplateRef } from '@angular/core';

export type AccordionTransition = 'smooth' | 'fast' | 'slow' | 'none';

export interface DcxNgAccordionItem {
  id: string;
  title: string;
  content?: string;
  contentTemplate?: TemplateRef<any>;
  disabled?: boolean;
  disabledContent?: boolean;
  icon?: string;
  expanded?: boolean;
}

export type DcxWebAccordionTransition = 'smooth' | 'fast' | 'slow' | 'none';
export type DcxWebAccordionVariant = 'default' | 'flush';
export interface DcxWebAccordionItem {
    id: string;
    title: string;
    description?: string;
    content?: string;
    contentTemplate?: any;
    disabled?: boolean;
    disabledContent?: boolean;
    icon?: string;
    expanded?: boolean;
    maxContentHeight?: string;
}

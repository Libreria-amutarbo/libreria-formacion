import { LitElement } from 'lit';
import { DcxButtonType, DcxButtonVariant, DcxIconPosition } from '../../core/interfaces/button';
import { DcxSize } from '../../core/interfaces/generic';
import { DcxIconSpacing } from '../../core/interfaces/icon';
export declare class DcxWebButton extends LitElement {
    accessor label: string;
    accessor ariaLabel: string;
    accessor type: DcxButtonType;
    accessor disabled: boolean;
    accessor pressed: boolean;
    accessor hover: boolean;
    accessor focused: boolean;
    accessor variant: DcxButtonVariant;
    accessor size: DcxSize;
    accessor extraClass: string;
    accessor isCheckbox: boolean;
    accessor checkboxError: boolean;
    accessor ariaChecked: 'true' | 'false' | 'mixed' | null;
    accessor icon: boolean;
    accessor iconName: string;
    accessor iconSize: DcxSize | undefined;
    accessor iconSpacing: DcxIconSpacing;
    accessor iconColor: string;
    accessor iconPosition: DcxIconPosition;
    accessor iconRightName: string;
    static styles: import('lit').CSSResult;
    handleClick(e: Event): void;
    render(): import('lit-html').TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-button': DcxWebButton;
    }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const ICON_POSITION = {
    start: 'start',
    end: 'end',
};
export class DcxNgButtonComponent {
    label = '';
    ariaLabel = '';
    type = 'button';
    disabled = false;
    variant;
    size = 'medium';
    class = '';
    iconName;
    iconPosition = ICON_POSITION.start;
    iconSize;
    iconSpacing = 'none';
    iconColor = '';
    set icon(_legacy) { }
    buttonClick = new EventEmitter();
    IconPos = ICON_POSITION;
    get computedAriaLabel() {
        if (this.label)
            return null;
        return this.ariaLabel ? this.ariaLabel : 'Button';
    }
    sizeToIconMap = {
        small: 's',
        medium: 'm',
        large: 'l',
        block: 'm',
    };
    get effectiveIconSize() {
        return this.iconSize || this.sizeToIconMap[this.size];
    }
    get buttonClasses() {
        return [
            'dcx-ng-button',
            this.variant ? `dcx-ng-button--${this.variant}` : '',
            this.size ? `dcx-ng-button--${this.size}` : '',
            !this.label && this.iconName ? 'dcx-ng-button--icon-only' : '',
            this.class || '',
        ]
            .filter(Boolean)
            .join(' ');
    }
    onClick() {
        if (!this.disabled) {
            this.buttonClick.emit({ clicked: true });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgButtonComponent, isStandalone: true, selector: "dcx-ng-button", inputs: { label: "label", ariaLabel: "ariaLabel", type: "type", disabled: "disabled", variant: "variant", size: "size", class: "class", iconName: "iconName", iconPosition: "iconPosition", iconSize: "iconSize", iconSpacing: "iconSpacing", iconColor: "iconColor", icon: "icon" }, outputs: { buttonClick: "buttonClick" }, ngImport: i0, template: "<button\r\n  [type]=\"type\"\r\n  [disabled]=\"disabled\"\r\n  [ngClass]=\"buttonClasses\"\r\n  (click)=\"onClick()\"\r\n  [attr.aria-label]=\"computedAriaLabel\"\r\n>\r\n  @if (iconName && iconPosition === IconPos.start) {\r\n    <dcx-ng-icon\r\n      class=\"dcx-ng-button__icon dcx-ng-button__icon--start\"\r\n      [name]=\"iconName\"\r\n      [size]=\"effectiveIconSize\"\r\n      [spacing]=\"iconSpacing\"\r\n      [color]=\"iconColor\"\r\n      aria-hidden=\"true\"\r\n    ></dcx-ng-icon>\r\n  }\r\n\r\n  @if (label) {\r\n    <span class=\"dcx-ng-button__label\">{{ label }}</span>\r\n  }\r\n\r\n  @if (iconName && iconPosition === IconPos.end) {\r\n    <dcx-ng-icon\r\n      class=\"dcx-ng-button__icon dcx-ng-button__icon--end\"\r\n      [name]=\"iconName\"\r\n      [size]=\"effectiveIconSize\"\r\n      [spacing]=\"iconSpacing\"\r\n      [color]=\"iconColor\"\r\n      aria-hidden=\"true\"\r\n    ></dcx-ng-icon>\r\n  }\r\n\r\n  <ng-content select=\"dcx-ng-icon\"></ng-content>\r\n  <ng-content select=\"[button-trailing]\"></ng-content>\r\n</button>", styles: [":host{--dcx-button-padding: .5rem 1rem;--dcx-button-font-size: 1rem;--dcx-button-bg: transparent;--dcx-button-color: inherit;--dcx-button-border: 1px solid currentColor;display:inline-block}.dcx-ng-button{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:var(--dcx-button-padding);font-size:var(--dcx-button-font-size);background-color:var(--dcx-button-bg);color:var(--dcx-button-color);border:var(--dcx-button-border);cursor:pointer;border-radius:4px;line-height:1}.dcx-ng-button--primary{--dcx-button-bg: #0056b3;--dcx-button-color: #fff}.dcx-ng-button--secondary{--dcx-button-bg: #6c757d;--dcx-button-color: #fff}.dcx-ng-button--link{--dcx-button-bg: transparent;--dcx-button-color: #0056b3;border:none}.dcx-ng-button:disabled{opacity:.5;cursor:not-allowed;pointer-events:none;background-color:var(--button-disabled-bg, #e0e0e0);color:var(--button-disabled-text, #a0a0a0);border-color:var(--button-disabled-border, #cccccc)}.dcx-ng-button--small{--dcx-button-padding: .25rem .5rem;--dcx-button-font-size: .875rem}.dcx-ng-button--medium{--dcx-button-padding: .5rem 1rem;--dcx-button-font-size: 1rem}.dcx-ng-button--large{--dcx-button-padding: .75rem 1.25rem;--dcx-button-font-size: 1.125rem}.dcx-ng-button--icon-only{min-width:2.25rem;min-height:2.25rem;padding:.5rem}.dcx-ng-button--icon-only .dcx-ng-button__label{display:none}.dcx-ng-button__icon{display:inline-flex;align-items:center;justify-content:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: DcxNgIconComponent, selector: "dcx-ng-icon", inputs: ["size", "spacing", "color", "name"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-button', standalone: true, imports: [CommonModule, DcxNgIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\r\n  [type]=\"type\"\r\n  [disabled]=\"disabled\"\r\n  [ngClass]=\"buttonClasses\"\r\n  (click)=\"onClick()\"\r\n  [attr.aria-label]=\"computedAriaLabel\"\r\n>\r\n  @if (iconName && iconPosition === IconPos.start) {\r\n    <dcx-ng-icon\r\n      class=\"dcx-ng-button__icon dcx-ng-button__icon--start\"\r\n      [name]=\"iconName\"\r\n      [size]=\"effectiveIconSize\"\r\n      [spacing]=\"iconSpacing\"\r\n      [color]=\"iconColor\"\r\n      aria-hidden=\"true\"\r\n    ></dcx-ng-icon>\r\n  }\r\n\r\n  @if (label) {\r\n    <span class=\"dcx-ng-button__label\">{{ label }}</span>\r\n  }\r\n\r\n  @if (iconName && iconPosition === IconPos.end) {\r\n    <dcx-ng-icon\r\n      class=\"dcx-ng-button__icon dcx-ng-button__icon--end\"\r\n      [name]=\"iconName\"\r\n      [size]=\"effectiveIconSize\"\r\n      [spacing]=\"iconSpacing\"\r\n      [color]=\"iconColor\"\r\n      aria-hidden=\"true\"\r\n    ></dcx-ng-icon>\r\n  }\r\n\r\n  <ng-content select=\"dcx-ng-icon\"></ng-content>\r\n  <ng-content select=\"[button-trailing]\"></ng-content>\r\n</button>", styles: [":host{--dcx-button-padding: .5rem 1rem;--dcx-button-font-size: 1rem;--dcx-button-bg: transparent;--dcx-button-color: inherit;--dcx-button-border: 1px solid currentColor;display:inline-block}.dcx-ng-button{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;padding:var(--dcx-button-padding);font-size:var(--dcx-button-font-size);background-color:var(--dcx-button-bg);color:var(--dcx-button-color);border:var(--dcx-button-border);cursor:pointer;border-radius:4px;line-height:1}.dcx-ng-button--primary{--dcx-button-bg: #0056b3;--dcx-button-color: #fff}.dcx-ng-button--secondary{--dcx-button-bg: #6c757d;--dcx-button-color: #fff}.dcx-ng-button--link{--dcx-button-bg: transparent;--dcx-button-color: #0056b3;border:none}.dcx-ng-button:disabled{opacity:.5;cursor:not-allowed;pointer-events:none;background-color:var(--button-disabled-bg, #e0e0e0);color:var(--button-disabled-text, #a0a0a0);border-color:var(--button-disabled-border, #cccccc)}.dcx-ng-button--small{--dcx-button-padding: .25rem .5rem;--dcx-button-font-size: .875rem}.dcx-ng-button--medium{--dcx-button-padding: .5rem 1rem;--dcx-button-font-size: 1rem}.dcx-ng-button--large{--dcx-button-padding: .75rem 1.25rem;--dcx-button-font-size: 1.125rem}.dcx-ng-button--icon-only{min-width:2.25rem;min-height:2.25rem;padding:.5rem}.dcx-ng-button--icon-only .dcx-ng-button__label{display:none}.dcx-ng-button__icon{display:inline-flex;align-items:center;justify-content:center}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], type: [{
                type: Input
            }], disabled: [{
                type: Input
            }], variant: [{
                type: Input
            }], size: [{
                type: Input
            }], class: [{
                type: Input
            }], iconName: [{
                type: Input
            }], iconPosition: [{
                type: Input
            }], iconSize: [{
                type: Input
            }], iconSpacing: [{
                type: Input
            }], iconColor: [{
                type: Input
            }], icon: [{
                type: Input
            }], buttonClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGN4LW5nLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL2RjeC1uZy1saWIvc3JjL2xpYi9kY3gtbmctY29tcG9uZW50cy9kY3gtbmctYnV0dG9uL2RjeC1uZy1idXR0b24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9kY3gtbmctbGliL3NyYy9saWIvZGN4LW5nLWNvbXBvbmVudHMvZGN4LW5nLWJ1dHRvbi9kY3gtbmctYnV0dG9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7O0FBUTFFLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRztJQUMzQixLQUFLLEVBQUUsT0FBTztJQUNkLEdBQUcsRUFBRSxLQUFLO0NBQ0YsQ0FBQztBQVdYLE1BQU0sT0FBTyxvQkFBb0I7SUFDdEIsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNYLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFZixJQUFJLEdBQWUsUUFBUSxDQUFDO0lBQzVCLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFFakIsT0FBTyxDQUFpQjtJQUN4QixJQUFJLEdBQWUsUUFBUSxDQUFDO0lBRTVCLEtBQUssR0FBRyxFQUFFLENBQUM7SUFFWCxRQUFRLENBQVU7SUFFbEIsWUFBWSxHQUFpQixhQUFhLENBQUMsS0FBSyxDQUFDO0lBRWpELFFBQVEsQ0FBWTtJQUNwQixXQUFXLEdBQWdCLE1BQU0sQ0FBQztJQUNsQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXhCLElBQWEsSUFBSSxDQUFDLE9BQWUsSUFBRyxDQUFDO0lBRTNCLFdBQVcsR0FBRyxJQUFJLFlBQVksRUFBd0IsQ0FBQztJQUV4RCxPQUFPLEdBQUcsYUFBYSxDQUFDO0lBRWpDLElBQUksaUJBQWlCO1FBQ25CLElBQUksSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLElBQUksQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUNwRCxDQUFDO0lBR2MsYUFBYSxHQUFpQztRQUM3RCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxHQUFHO1FBQ1gsS0FBSyxFQUFFLEdBQUc7UUFDVixLQUFLLEVBQUUsR0FBRztLQUNYLENBQUM7SUFFRixJQUFJLGlCQUFpQjtRQUNuQixPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUdDLElBQUksYUFBYTtRQUNmLE9BQU87WUFDTCxlQUFlO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsa0JBQWtCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzlDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7U0FDakI7YUFDRSxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNILENBQUM7d0dBNURVLG9CQUFvQjs0RkFBcEIsb0JBQW9CLHdZQzlCakMsdWlDQW1DUywrOUNEVkcsWUFBWSw2SEFBRSxrQkFBa0I7OzRGQUsvQixvQkFBb0I7a0JBUmhDLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxtQkFHMUIsdUJBQXVCLENBQUMsTUFBTTs4QkFHdEMsS0FBSztzQkFBYixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFFRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsUUFBUTtzQkFBaEIsS0FBSztnQkFFRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVPLElBQUk7c0JBQWhCLEtBQUs7Z0JBRUksV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IERjeE5nSWNvbkNvbXBvbmVudCB9IGZyb20gJy4uL2RjeC1uZy1pY29uL2RjeC1uZy1pY29uLmNvbXBvbmVudCc7XHJcblxyXG50eXBlIEJ1dHRvblR5cGUgPSAnYnV0dG9uJyB8ICdzdWJtaXQnIHwgJ3Jlc2V0JztcclxudHlwZSBCdXR0b25WYXJpYW50ID0gJ3ByaW1hcnknIHwgJ3NlY29uZGFyeScgfCAnbGluaycgfCAnaWNvbic7XHJcbnR5cGUgQnV0dG9uU2l6ZSA9ICdzbWFsbCcgfCAnbWVkaXVtJyB8ICdsYXJnZScgfCAnYmxvY2snO1xyXG50eXBlIEljb25TaXplID0gJ3MnIHwgJ20nIHwgJ2wnIHwgJ3hsJztcclxudHlwZSBJY29uU3BhY2luZyA9ICdub25lJyB8ICdjb21wYWN0JyB8ICdzcGFjaW91cyc7XHJcblxyXG5leHBvcnQgY29uc3QgSUNPTl9QT1NJVElPTiA9IHtcclxuICBzdGFydDogJ3N0YXJ0JyxcclxuICBlbmQ6ICdlbmQnLFxyXG59IGFzIGNvbnN0O1xyXG5leHBvcnQgdHlwZSBJY29uUG9zaXRpb24gPSB0eXBlb2YgSUNPTl9QT1NJVElPTltrZXlvZiB0eXBlb2YgSUNPTl9QT1NJVElPTl07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RjeC1uZy1idXR0b24nLFxyXG4gIHN0YW5kYWxvbmU6IHRydWUsXHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRGN4TmdJY29uQ29tcG9uZW50XSxcclxuICBzdHlsZVVybHM6IFsnLi9kY3gtbmctYnV0dG9uLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2RjeC1uZy1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGN4TmdCdXR0b25Db21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGxhYmVsID0gJyc7XHJcbiAgQElucHV0KCkgYXJpYUxhYmVsID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIHR5cGU6IEJ1dHRvblR5cGUgPSAnYnV0dG9uJztcclxuICBASW5wdXQoKSBkaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKSB2YXJpYW50PzogQnV0dG9uVmFyaWFudDtcclxuICBASW5wdXQoKSBzaXplOiBCdXR0b25TaXplID0gJ21lZGl1bSc7XHJcblxyXG4gIEBJbnB1dCgpIGNsYXNzID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpIGljb25OYW1lPzogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBpY29uUG9zaXRpb246IEljb25Qb3NpdGlvbiA9IElDT05fUE9TSVRJT04uc3RhcnQ7XHJcblxyXG4gIEBJbnB1dCgpIGljb25TaXplPzogSWNvblNpemU7XHJcbiAgQElucHV0KCkgaWNvblNwYWNpbmc6IEljb25TcGFjaW5nID0gJ25vbmUnO1xyXG4gIEBJbnB1dCgpIGljb25Db2xvciA9ICcnO1xyXG5cclxuICBASW5wdXQoKSBzZXQgaWNvbihfbGVnYWN5OiBzdHJpbmcpIHt9XHJcblxyXG4gIEBPdXRwdXQoKSBidXR0b25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8eyBjbGlja2VkOiBib29sZWFuIH0+KCk7XHJcblxyXG4gIHJlYWRvbmx5IEljb25Qb3MgPSBJQ09OX1BPU0lUSU9OO1xyXG5cclxuICBnZXQgY29tcHV0ZWRBcmlhTGFiZWwoKTogc3RyaW5nIHwgbnVsbCB7XHJcbiAgICBpZiAodGhpcy5sYWJlbCkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gdGhpcy5hcmlhTGFiZWwgPyB0aGlzLmFyaWFMYWJlbCA6ICdCdXR0b24nO1xyXG4gIH1cclxuXHJcbiAgXHJcbnByaXZhdGUgcmVhZG9ubHkgc2l6ZVRvSWNvbk1hcDogUmVjb3JkPEJ1dHRvblNpemUsIEljb25TaXplPiA9IHtcclxuICBzbWFsbDogJ3MnLFxyXG4gIG1lZGl1bTogJ20nLFxyXG4gIGxhcmdlOiAnbCcsXHJcbiAgYmxvY2s6ICdtJyxcclxufTtcclxuXHJcbmdldCBlZmZlY3RpdmVJY29uU2l6ZSgpOiBJY29uU2l6ZSB7XHJcbiAgcmV0dXJuIHRoaXMuaWNvblNpemUgfHwgdGhpcy5zaXplVG9JY29uTWFwW3RoaXMuc2l6ZV07XHJcbn1cclxuXHJcblxyXG4gIGdldCBidXR0b25DbGFzc2VzKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAnZGN4LW5nLWJ1dHRvbicsXHJcbiAgICAgIHRoaXMudmFyaWFudCA/IGBkY3gtbmctYnV0dG9uLS0ke3RoaXMudmFyaWFudH1gIDogJycsXHJcbiAgICAgIHRoaXMuc2l6ZSA/IGBkY3gtbmctYnV0dG9uLS0ke3RoaXMuc2l6ZX1gIDogJycsXHJcbiAgICAgICF0aGlzLmxhYmVsICYmIHRoaXMuaWNvbk5hbWUgPyAnZGN4LW5nLWJ1dHRvbi0taWNvbi1vbmx5JyA6ICcnLFxyXG4gICAgICB0aGlzLmNsYXNzIHx8ICcnLFxyXG4gICAgXVxyXG4gICAgICAuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICAgIC5qb2luKCcgJyk7XHJcbiAgfVxyXG5cclxuICBvbkNsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XHJcbiAgICAgIHRoaXMuYnV0dG9uQ2xpY2suZW1pdCh7IGNsaWNrZWQ6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIjxidXR0b25cclxuICBbdHlwZV09XCJ0eXBlXCJcclxuICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gIFtuZ0NsYXNzXT1cImJ1dHRvbkNsYXNzZXNcIlxyXG4gIChjbGljayk9XCJvbkNsaWNrKClcIlxyXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiY29tcHV0ZWRBcmlhTGFiZWxcIlxyXG4+XHJcbiAgQGlmIChpY29uTmFtZSAmJiBpY29uUG9zaXRpb24gPT09IEljb25Qb3Muc3RhcnQpIHtcclxuICAgIDxkY3gtbmctaWNvblxyXG4gICAgICBjbGFzcz1cImRjeC1uZy1idXR0b25fX2ljb24gZGN4LW5nLWJ1dHRvbl9faWNvbi0tc3RhcnRcIlxyXG4gICAgICBbbmFtZV09XCJpY29uTmFtZVwiXHJcbiAgICAgIFtzaXplXT1cImVmZmVjdGl2ZUljb25TaXplXCJcclxuICAgICAgW3NwYWNpbmddPVwiaWNvblNwYWNpbmdcIlxyXG4gICAgICBbY29sb3JdPVwiaWNvbkNvbG9yXCJcclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID48L2RjeC1uZy1pY29uPlxyXG4gIH1cclxuXHJcbiAgQGlmIChsYWJlbCkge1xyXG4gICAgPHNwYW4gY2xhc3M9XCJkY3gtbmctYnV0dG9uX19sYWJlbFwiPnt7IGxhYmVsIH19PC9zcGFuPlxyXG4gIH1cclxuXHJcbiAgQGlmIChpY29uTmFtZSAmJiBpY29uUG9zaXRpb24gPT09IEljb25Qb3MuZW5kKSB7XHJcbiAgICA8ZGN4LW5nLWljb25cclxuICAgICAgY2xhc3M9XCJkY3gtbmctYnV0dG9uX19pY29uIGRjeC1uZy1idXR0b25fX2ljb24tLWVuZFwiXHJcbiAgICAgIFtuYW1lXT1cImljb25OYW1lXCJcclxuICAgICAgW3NpemVdPVwiZWZmZWN0aXZlSWNvblNpemVcIlxyXG4gICAgICBbc3BhY2luZ109XCJpY29uU3BhY2luZ1wiXHJcbiAgICAgIFtjb2xvcl09XCJpY29uQ29sb3JcIlxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPjwvZGN4LW5nLWljb24+XHJcbiAgfVxyXG5cclxuICA8bmctY29udGVudCBzZWxlY3Q9XCJkY3gtbmctaWNvblwiPjwvbmctY29udGVudD5cclxuICA8bmctY29udGVudCBzZWxlY3Q9XCJbYnV0dG9uLXRyYWlsaW5nXVwiPjwvbmctY29udGVudD5cclxuPC9idXR0b24+Il19
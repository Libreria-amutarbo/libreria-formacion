import { Component, Input, Output, EventEmitter, HostBinding, HostListener, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export var TogglePosition;
(function (TogglePosition) {
    TogglePosition["TOP"] = "top";
    TogglePosition["BOTTOM"] = "bottom";
    TogglePosition["LEFT"] = "left";
    TogglePosition["RIGHT"] = "right";
})(TogglePosition || (TogglePosition = {}));
export class DcxNgToggleComponent {
    checked = false;
    disabled = false;
    label = null;
    size = 'medium';
    color = '#000';
    ariaLabel = '';
    textPosition = TogglePosition.RIGHT;
    toggled = new EventEmitter();
    get ariaLabelBinding() {
        return this.ariaLabel || 'Toggle';
    }
    get sizeClasses() {
        return [
            'dcx-ng-toggle',
            this.size ? `dcx-ng-toggle--${this.size}` : '',
            `dcx-ng-toggle--${this.textPosition}`
        ].join(' ');
    }
    toggle() {
        if (this.disabled)
            return;
        this.checked = !this.checked;
        this.toggled.emit(this.checked);
    }
    handleKeyboardToggle(event) {
        if (!this.disabled) {
            event.preventDefault();
            this.toggle();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgToggleComponent, isStandalone: true, selector: "dcx-ng-toggle", inputs: { checked: "checked", disabled: "disabled", label: "label", size: "size", color: "color", ariaLabel: "ariaLabel", textPosition: "textPosition" }, outputs: { toggled: "toggled" }, host: { listeners: { "keydown.enter": "handleKeyboardToggle($event)", "keydown.space": "handleKeyboardToggle($event)" }, properties: { "attr.aria-label": "this.ariaLabelBinding" } }, ngImport: i0, template: "<div\r\n  [class]=\"sizeClasses\"\r\n  [class.disabled]=\"disabled\"\r\n  role=\"switch\"\r\n  [attr.aria-checked]=\"checked\"\r\n  [attr.aria-label]=\"ariaLabelBinding\"\r\n  [attr.tabindex]=\"disabled ? -1 : 0\"\r\n  (click)=\"toggle()\"\r\n>\r\n  <div\r\n    class=\"dcx-ng-toggle__track\"\r\n    [ngStyle]=\"{ backgroundColor: checked ? color : '#ccc' }\"\r\n  >\r\n    <div class=\"dcx-ng-toggle__thumb\" [class.checked]=\"checked\"></div>\r\n  </div>\r\n\r\n  @if (label) {\r\n    <span class=\"dcx-ng-toggle__label\">{{ label }}</span>\r\n  }\r\n</div>\r\n", styles: [":host{display:inline-flex;cursor:pointer;--toggle-width: 2.5rem;--toggle-height: 1.5rem;--thumb-size: 1.5rem}.dcx-ng-toggle{display:inline-flex;align-items:center;gap:.5rem}.dcx-ng-toggle.disabled{cursor:not-allowed;opacity:.6}.dcx-ng-toggle--small{--toggle-width: 2.5rem;--toggle-height: 1rem;--thumb-size: .65rem}.dcx-ng-toggle--medium{--toggle-width: 4rem;--toggle-height: 1.75rem;--thumb-size: 1rem}.dcx-ng-toggle--large{--toggle-width: 6rem;--toggle-height: 2.5rem;--thumb-size: 1.75rem}.dcx-ng-toggle--top{flex-direction:column-reverse;align-items:center}.dcx-ng-toggle--bottom{flex-direction:column;align-items:center}.dcx-ng-toggle--left{flex-direction:row-reverse}.dcx-ng-toggle--right{flex-direction:row}.dcx-ng-toggle__track{width:var(--toggle-width);height:var(--toggle-height);background-color:#ccc;border-radius:999px;position:relative;transition:background-color .3s}.dcx-ng-toggle__thumb{width:var(--thumb-size);height:var(--thumb-size);background-color:#fff;border-radius:50%;position:absolute;top:50%;left:.125rem;transform:translateY(-50%);transition:left .3s}.dcx-ng-toggle__thumb.checked{left:calc(100% - var(--thumb-size) - .125rem)}.dcx-ng-toggle__label{font-size:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-toggle', standalone: true, imports: [CommonModule], template: "<div\r\n  [class]=\"sizeClasses\"\r\n  [class.disabled]=\"disabled\"\r\n  role=\"switch\"\r\n  [attr.aria-checked]=\"checked\"\r\n  [attr.aria-label]=\"ariaLabelBinding\"\r\n  [attr.tabindex]=\"disabled ? -1 : 0\"\r\n  (click)=\"toggle()\"\r\n>\r\n  <div\r\n    class=\"dcx-ng-toggle__track\"\r\n    [ngStyle]=\"{ backgroundColor: checked ? color : '#ccc' }\"\r\n  >\r\n    <div class=\"dcx-ng-toggle__thumb\" [class.checked]=\"checked\"></div>\r\n  </div>\r\n\r\n  @if (label) {\r\n    <span class=\"dcx-ng-toggle__label\">{{ label }}</span>\r\n  }\r\n</div>\r\n", styles: [":host{display:inline-flex;cursor:pointer;--toggle-width: 2.5rem;--toggle-height: 1.5rem;--thumb-size: 1.5rem}.dcx-ng-toggle{display:inline-flex;align-items:center;gap:.5rem}.dcx-ng-toggle.disabled{cursor:not-allowed;opacity:.6}.dcx-ng-toggle--small{--toggle-width: 2.5rem;--toggle-height: 1rem;--thumb-size: .65rem}.dcx-ng-toggle--medium{--toggle-width: 4rem;--toggle-height: 1.75rem;--thumb-size: 1rem}.dcx-ng-toggle--large{--toggle-width: 6rem;--toggle-height: 2.5rem;--thumb-size: 1.75rem}.dcx-ng-toggle--top{flex-direction:column-reverse;align-items:center}.dcx-ng-toggle--bottom{flex-direction:column;align-items:center}.dcx-ng-toggle--left{flex-direction:row-reverse}.dcx-ng-toggle--right{flex-direction:row}.dcx-ng-toggle__track{width:var(--toggle-width);height:var(--toggle-height);background-color:#ccc;border-radius:999px;position:relative;transition:background-color .3s}.dcx-ng-toggle__thumb{width:var(--thumb-size);height:var(--thumb-size);background-color:#fff;border-radius:50%;position:absolute;top:50%;left:.125rem;transform:translateY(-50%);transition:left .3s}.dcx-ng-toggle__thumb.checked{left:calc(100% - var(--thumb-size) - .125rem)}.dcx-ng-toggle__label{font-size:1rem}\n"] }]
        }], propDecorators: { checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], textPosition: [{
                type: Input
            }], toggled: [{
                type: Output
            }], ariaLabelBinding: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }], handleKeyboardToggle: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGN4LW5nLXRvZ2dsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9saWJzL2RjeC1uZy1saWIvc3JjL2xpYi9kY3gtbmctY29tcG9uZW50cy9kY3gtbmctdG9nZ2xlL2RjeC1uZy10b2dnbGUuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9kY3gtbmctbGliL3NyYy9saWIvZGN4LW5nLWNvbXBvbmVudHMvZGN4LW5nLXRvZ2dsZS9kY3gtbmctdG9nZ2xlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUNMLE1BQU0sRUFDTixZQUFZLEVBQ1osV0FBVyxFQUNYLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQUcvQyxNQUFNLENBQU4sSUFBWSxjQUtYO0FBTEQsV0FBWSxjQUFjO0lBQ3hCLDZCQUFXLENBQUE7SUFDWCxtQ0FBaUIsQ0FBQTtJQUNqQiwrQkFBYSxDQUFBO0lBQ2IsaUNBQWUsQ0FBQTtBQUNqQixDQUFDLEVBTFcsY0FBYyxLQUFkLGNBQWMsUUFLekI7QUFTRCxNQUFNLE9BQU8sb0JBQW9CO0lBQ3RCLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDaEIsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixLQUFLLEdBQWtCLElBQUksQ0FBQztJQUM1QixJQUFJLEdBQWUsUUFBUSxDQUFDO0lBQzVCLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDZixTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ2YsWUFBWSxHQUFtQixjQUFjLENBQUMsS0FBSyxDQUFDO0lBRW5ELE9BQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBRWhELElBQW9DLGdCQUFnQjtRQUNsRCxPQUFPLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPO1lBQ0wsZUFBZTtZQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDOUMsa0JBQWtCLElBQUksQ0FBQyxZQUFZLEVBQUU7U0FDdEMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBSUQsb0JBQW9CLENBQUMsS0FBb0I7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7SUFDSCxDQUFDO3dHQXBDVSxvQkFBb0I7NEZBQXBCLG9CQUFvQiwyYkN6QmpDLHFqQkFvQkEsbXVDRENZLFlBQVk7OzRGQUlYLG9CQUFvQjtrQkFQaEMsU0FBUzsrQkFDRSxlQUFlLGNBQ2IsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDOzhCQUtkLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFFSSxPQUFPO3NCQUFoQixNQUFNO2dCQUU2QixnQkFBZ0I7c0JBQW5ELFdBQVc7dUJBQUMsaUJBQWlCO2dCQW9COUIsb0JBQW9CO3NCQUZuQixZQUFZO3VCQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7c0JBQ3hDLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgT3V0cHV0LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0QmluZGluZyxcclxuICBIb3N0TGlzdGVuZXIsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG50eXBlIFRvZ2dsZVNpemUgPSAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnO1xyXG5leHBvcnQgZW51bSBUb2dnbGVQb3NpdGlvbiB7XHJcbiAgVE9QID0gJ3RvcCcsXHJcbiAgQk9UVE9NID0gJ2JvdHRvbScsXHJcbiAgTEVGVCA9ICdsZWZ0JyxcclxuICBSSUdIVCA9ICdyaWdodCdcclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkY3gtbmctdG9nZ2xlJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kY3gtbmctdG9nZ2xlLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybDogJy4vZGN4LW5nLXRvZ2dsZS5jb21wb25lbnQuc2NzcycsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEY3hOZ1RvZ2dsZUNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgY2hlY2tlZCA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xyXG4gIEBJbnB1dCgpIHNpemU6IFRvZ2dsZVNpemUgPSAnbWVkaXVtJztcclxuICBASW5wdXQoKSBjb2xvciA9ICcjMDAwJztcclxuICBASW5wdXQoKSBhcmlhTGFiZWwgPSAnJztcclxuICBASW5wdXQoKSB0ZXh0UG9zaXRpb246IFRvZ2dsZVBvc2l0aW9uID0gVG9nZ2xlUG9zaXRpb24uUklHSFQ7XHJcblxyXG4gIEBPdXRwdXQoKSB0b2dnbGVkID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbCcpIGdldCBhcmlhTGFiZWxCaW5kaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJpYUxhYmVsIHx8ICdUb2dnbGUnO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHNpemVDbGFzc2VzKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICAnZGN4LW5nLXRvZ2dsZScsXHJcbiAgICAgIHRoaXMuc2l6ZSA/IGBkY3gtbmctdG9nZ2xlLS0ke3RoaXMuc2l6ZX1gIDogJycsXHJcbiAgICAgIGBkY3gtbmctdG9nZ2xlLS0ke3RoaXMudGV4dFBvc2l0aW9ufWBcclxuICAgIF0uam9pbignICcpO1xyXG4gIH1cclxuXHJcbiAgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuZGlzYWJsZWQpIHJldHVybjtcclxuICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XHJcbiAgICB0aGlzLnRvZ2dsZWQuZW1pdCh0aGlzLmNoZWNrZWQpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5zcGFjZScsIFsnJGV2ZW50J10pXHJcbiAgaGFuZGxlS2V5Ym9hcmRUb2dnbGUoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0aGlzLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8ZGl2XHJcbiAgW2NsYXNzXT1cInNpemVDbGFzc2VzXCJcclxuICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gIHJvbGU9XCJzd2l0Y2hcIlxyXG4gIFthdHRyLmFyaWEtY2hlY2tlZF09XCJjaGVja2VkXCJcclxuICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbEJpbmRpbmdcIlxyXG4gIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gLTEgOiAwXCJcclxuICAoY2xpY2spPVwidG9nZ2xlKClcIlxyXG4+XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJkY3gtbmctdG9nZ2xlX190cmFja1wiXHJcbiAgICBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogY2hlY2tlZCA/IGNvbG9yIDogJyNjY2MnIH1cIlxyXG4gID5cclxuICAgIDxkaXYgY2xhc3M9XCJkY3gtbmctdG9nZ2xlX190aHVtYlwiIFtjbGFzcy5jaGVja2VkXT1cImNoZWNrZWRcIj48L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgQGlmIChsYWJlbCkge1xyXG4gICAgPHNwYW4gY2xhc3M9XCJkY3gtbmctdG9nZ2xlX19sYWJlbFwiPnt7IGxhYmVsIH19PC9zcGFuPlxyXG4gIH1cclxuPC9kaXY+XHJcbiJdfQ==
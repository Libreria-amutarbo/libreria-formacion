import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class DcxNgDividerComponent {
    color = '#ff0000';
    size = 'auto';
    orientation = 'horizontal';
    thickness = 0.25;
    ariaLabel = '';
    get dividerColor() {
        return this.color;
    }
    get dividerThickness() {
        return `${this.thickness}rem`;
    }
    get ariaLabelBinding() {
        return this.ariaLabel || 'Divider';
    }
    get dividerClasses() {
        return [
            'dcx-ng-divider',
            this.orientation ? `dcx-ng-divider--${this.orientation}` : '',
            this.size ? `dcx-ng-divider--${this.size}` : '',
        ].join(' ');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: DcxNgDividerComponent, isStandalone: true, selector: "dcx-ng-divider", inputs: { color: "color", size: "size", orientation: "orientation", thickness: "thickness", ariaLabel: "ariaLabel" }, host: { properties: { "style.--dcx-divider-color": "this.dividerColor", "style.--dcx-divider-thickness": "this.dividerThickness", "attr.aria-label": "this.ariaLabelBinding" } }, ngImport: i0, template: "<hr\r\n  [ngClass]=\"dividerClasses\"\r\n  [attr.aria-label]=\"ariaLabelBinding\"\r\n  role=\"separator\"\r\n/>\r\n", styles: [":host{--dcx-divider-color: #ff0000;--dcx-divider-thickness: .6px;--dcx-divider-size: 100px;display:block}.dcx-ng-divider{background-color:var(--dcx-divider-color);margin:0;border:none;display:block}.dcx-ng-divider--horizontal{height:var(--dcx-divider-thickness);width:var(--dcx-divider-size)}.dcx-ng-divider--vertical{width:var(--dcx-divider-thickness);height:var(--dcx-divider-size)}.dcx-ng-divider--small{--dcx-divider-size: 5rem}.dcx-ng-divider--medium{--dcx-divider-size: 15rem}.dcx-ng-divider--large{--dcx-divider-size: 30rem}.dcx-ng-divider--auto.dcx-ng-divider--horizontal{width:100%}.dcx-ng-divider--auto.dcx-ng-divider--vertical{height:100%}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgDividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-divider', standalone: true, imports: [CommonModule], template: "<hr\r\n  [ngClass]=\"dividerClasses\"\r\n  [attr.aria-label]=\"ariaLabelBinding\"\r\n  role=\"separator\"\r\n/>\r\n", styles: [":host{--dcx-divider-color: #ff0000;--dcx-divider-thickness: .6px;--dcx-divider-size: 100px;display:block}.dcx-ng-divider{background-color:var(--dcx-divider-color);margin:0;border:none;display:block}.dcx-ng-divider--horizontal{height:var(--dcx-divider-thickness);width:var(--dcx-divider-size)}.dcx-ng-divider--vertical{width:var(--dcx-divider-thickness);height:var(--dcx-divider-size)}.dcx-ng-divider--small{--dcx-divider-size: 5rem}.dcx-ng-divider--medium{--dcx-divider-size: 15rem}.dcx-ng-divider--large{--dcx-divider-size: 30rem}.dcx-ng-divider--auto.dcx-ng-divider--horizontal{width:100%}.dcx-ng-divider--auto.dcx-ng-divider--vertical{height:100%}\n"] }]
        }], propDecorators: { color: [{
                type: Input
            }], size: [{
                type: Input
            }], orientation: [{
                type: Input
            }], thickness: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], dividerColor: [{
                type: HostBinding,
                args: ['style.--dcx-divider-color']
            }], dividerThickness: [{
                type: HostBinding,
                args: ['style.--dcx-divider-thickness']
            }], ariaLabelBinding: [{
                type: HostBinding,
                args: ['attr.aria-label']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGN4LW5nLWRpdmlkZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9kY3gtbmctbGliL3NyYy9saWIvZGN4LW5nLWNvbXBvbmVudHMvZGN4LW5nLWRpdmlkZXIvZGN4LW5nLWRpdmlkZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9kY3gtbmctbGliL3NyYy9saWIvZGN4LW5nLWNvbXBvbmVudHMvZGN4LW5nLWRpdmlkZXIvZGN4LW5nLWRpdmlkZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBWS9DLE1BQU0sT0FBTyxxQkFBcUI7SUFDdkIsS0FBSyxHQUFHLFNBQVMsQ0FBQztJQUNsQixJQUFJLEdBQWdCLE1BQU0sQ0FBQztJQUMzQixXQUFXLEdBQXVCLFlBQVksQ0FBQztJQUMvQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFeEIsSUFBOEMsWUFBWTtRQUN4RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQWtELGdCQUFnQjtRQUNoRSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFvQyxnQkFBZ0I7UUFDbEQsT0FBTyxJQUFJLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE9BQU87WUFDTCxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM3RCxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBQ2hELENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2QsQ0FBQzt3R0F6QlUscUJBQXFCOzRGQUFyQixxQkFBcUIsa1hDYmxDLHFIQUtBLHFzQkRJWSxZQUFZOzs0RkFJWCxxQkFBcUI7a0JBUGpDLFNBQVM7K0JBQ0UsZ0JBQWdCLGNBQ2QsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDOzhCQUtkLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRXdDLFlBQVk7c0JBQXpELFdBQVc7dUJBQUMsMkJBQTJCO2dCQUlVLGdCQUFnQjtzQkFBakUsV0FBVzt1QkFBQywrQkFBK0I7Z0JBSVIsZ0JBQWdCO3NCQUFuRCxXQUFXO3VCQUFDLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG50eXBlIERpdmlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XHJcbnR5cGUgRGl2aWRlclNpemUgPSAnc21hbGwnIHwgJ21lZGl1bScgfCAnbGFyZ2UnIHwgJ2F1dG8nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkY3gtbmctZGl2aWRlcicsXHJcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGN4LW5nLWRpdmlkZXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsOiAnLi9kY3gtbmctZGl2aWRlci5jb21wb25lbnQuc2NzcycsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEY3hOZ0RpdmlkZXJDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGNvbG9yID0gJyNmZjAwMDAnO1xyXG4gIEBJbnB1dCgpIHNpemU6IERpdmlkZXJTaXplID0gJ2F1dG8nO1xyXG4gIEBJbnB1dCgpIG9yaWVudGF0aW9uOiBEaXZpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XHJcbiAgQElucHV0KCkgdGhpY2tuZXNzID0gMC4yNTtcclxuICBASW5wdXQoKSBhcmlhTGFiZWwgPSAnJztcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS4tLWRjeC1kaXZpZGVyLWNvbG9yJykgZ2V0IGRpdmlkZXJDb2xvcigpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbG9yO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS4tLWRjeC1kaXZpZGVyLXRoaWNrbmVzcycpIGdldCBkaXZpZGVyVGhpY2tuZXNzKCkge1xyXG4gICAgcmV0dXJuIGAke3RoaXMudGhpY2tuZXNzfXJlbWA7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbCcpIGdldCBhcmlhTGFiZWxCaW5kaW5nKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuYXJpYUxhYmVsIHx8ICdEaXZpZGVyJztcclxuICB9XHJcblxyXG4gIGdldCBkaXZpZGVyQ2xhc3NlcygpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgJ2RjeC1uZy1kaXZpZGVyJyxcclxuICAgICAgdGhpcy5vcmllbnRhdGlvbiA/IGBkY3gtbmctZGl2aWRlci0tJHt0aGlzLm9yaWVudGF0aW9ufWAgOiAnJyxcclxuICAgICAgdGhpcy5zaXplID8gYGRjeC1uZy1kaXZpZGVyLS0ke3RoaXMuc2l6ZX1gIDogJycsXHJcbiAgICBdLmpvaW4oJyAnKTtcclxuICB9XHJcbn1cclxuIiwiPGhyXHJcbiAgW25nQ2xhc3NdPVwiZGl2aWRlckNsYXNzZXNcIlxyXG4gIFthdHRyLmFyaWEtbGFiZWxdPVwiYXJpYUxhYmVsQmluZGluZ1wiXHJcbiAgcm9sZT1cInNlcGFyYXRvclwiXHJcbi8+XHJcbiJdfQ==
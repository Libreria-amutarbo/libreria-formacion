import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class DcxNgIconComponent {
    size = 'm';
    spacing = 'none';
    color = '';
    name = '';
    get iconClass() {
        const base = ['material-icons', `material-icons--${this.size}`];
        if (this.spacing !== 'none') {
            base.push(`material-icons--${this.spacing}`);
        }
        return base.join(' ');
    }
    get iconColor() {
        return this.color || '#010101';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.14", type: DcxNgIconComponent, isStandalone: true, selector: "dcx-ng-icon", inputs: { size: "size", spacing: "spacing", color: "color", name: "name" }, host: { properties: { "class": "this.iconClass", "style.color": "this.iconColor" } }, ngImport: i0, template: "<link\r\n  rel=\"stylesheet\"\r\n  href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"\r\n/>\r\n\r\n<i [ngClass]=\"iconClass\">\r\n  {{name}}\r\n</i>\r\n", styles: [".material-icons{font-family:Material Icons;vertical-align:middle}.material-icons--s{font-size:.75rem}.material-icons--m{font-size:1.5rem}.material-icons--l{font-size:3rem}.material-icons--xl{font-size:6rem}.material-icons--compact{margin:.25rem}.material-icons--spacious{margin:.75rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgIconComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-icon', standalone: true, imports: [CommonModule], template: "<link\r\n  rel=\"stylesheet\"\r\n  href=\"https://fonts.googleapis.com/icon?family=Material+Icons\"\r\n/>\r\n\r\n<i [ngClass]=\"iconClass\">\r\n  {{name}}\r\n</i>\r\n", styles: [".material-icons{font-family:Material Icons;vertical-align:middle}.material-icons--s{font-size:.75rem}.material-icons--m{font-size:1.5rem}.material-icons--l{font-size:3rem}.material-icons--xl{font-size:6rem}.material-icons--compact{margin:.25rem}.material-icons--spacious{margin:.75rem}\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], spacing: [{
                type: Input
            }], color: [{
                type: Input
            }], name: [{
                type: Input
            }], iconClass: [{
                type: HostBinding,
                args: ['class']
            }], iconColor: [{
                type: HostBinding,
                args: ['style.color']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGN4LW5nLWljb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9kY3gtbmctbGliL3NyYy9saWIvZGN4LW5nLWNvbXBvbmVudHMvZGN4LW5nLWljb24vZGN4LW5nLWljb24uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9kY3gtbmctbGliL3NyYy9saWIvZGN4LW5nLWNvbXBvbmVudHMvZGN4LW5nLWljb24vZGN4LW5nLWljb24uY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBWS9DLE1BQU0sT0FBTyxrQkFBa0I7SUFDcEIsSUFBSSxHQUFhLEdBQUcsQ0FBQztJQUNyQixPQUFPLEdBQWdCLE1BQU0sQ0FBQztJQUM5QixLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ1gsSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUVuQixJQUEwQixTQUFTO1FBQ2pDLE1BQU0sSUFBSSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFnQyxTQUFTO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUM7SUFDakMsQ0FBQzt3R0FqQlUsa0JBQWtCOzRGQUFsQixrQkFBa0IseU9DYi9CLHdLQVFBLHdWRENZLFlBQVk7OzRGQUlYLGtCQUFrQjtrQkFQOUIsU0FBUzsrQkFDRSxhQUFhLGNBQ1gsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDOzhCQUtkLElBQUk7c0JBQVosS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFFb0IsU0FBUztzQkFBbEMsV0FBVzt1QkFBQyxPQUFPO2dCQVNZLFNBQVM7c0JBQXhDLFdBQVc7dUJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG50eXBlIEljb25TaXplID0gJ3MnIHwgJ20nIHwgJ2wnIHwgJ3hsJztcclxudHlwZSBJY29uU3BhY2luZyA9ICdub25lJyB8ICdjb21wYWN0JyB8ICdzcGFjaW91cyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2RjeC1uZy1pY29uJyxcclxuICBzdGFuZGFsb25lOiB0cnVlLFxyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kY3gtbmctaWNvbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmw6ICcuL2RjeC1uZy1pY29uLmNvbXBvbmVudC5zY3NzJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIERjeE5nSWNvbkNvbXBvbmVudCB7XHJcbiAgQElucHV0KCkgc2l6ZTogSWNvblNpemUgPSAnbSc7XHJcbiAgQElucHV0KCkgc3BhY2luZzogSWNvblNwYWNpbmcgPSAnbm9uZSc7XHJcbiAgQElucHV0KCkgY29sb3IgPSAnJztcclxuICBASW5wdXQoKSBuYW1lID0gJyc7XHJcblxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKSBnZXQgaWNvbkNsYXNzKCkge1xyXG4gICAgY29uc3QgYmFzZSA9IFsnbWF0ZXJpYWwtaWNvbnMnLCBgbWF0ZXJpYWwtaWNvbnMtLSR7dGhpcy5zaXplfWBdO1xyXG4gICAgaWYgKHRoaXMuc3BhY2luZyAhPT0gJ25vbmUnKSB7XHJcbiAgICAgIGJhc2UucHVzaChgbWF0ZXJpYWwtaWNvbnMtLSR7dGhpcy5zcGFjaW5nfWApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiYXNlLmpvaW4oJyAnKTtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnc3R5bGUuY29sb3InKSBnZXQgaWNvbkNvbG9yKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sb3IgfHwgJyMwMTAxMDEnO1xyXG4gIH1cclxufVxyXG4iLCI8bGlua1xyXG4gIHJlbD1cInN0eWxlc2hlZXRcIlxyXG4gIGhyZWY9XCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2ljb24/ZmFtaWx5PU1hdGVyaWFsK0ljb25zXCJcclxuLz5cclxuXHJcbjxpIFtuZ0NsYXNzXT1cImljb25DbGFzc1wiPlxyXG4gIHt7bmFtZX19XHJcbjwvaT5cclxuIl19
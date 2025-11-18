import * as i0 from '@angular/core';
import { Component, Input, HostBinding, EventEmitter, ChangeDetectionStrategy, Output, HostListener, inject, ChangeDetectorRef, forwardRef, ViewChild, ContentChild, input, computed, signal } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class DcxNgIconComponent {
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

const ICON_POSITION = {
    start: 'start',
    end: 'end',
};
class DcxNgButtonComponent {
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

class DcxNgDividerComponent {
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

var TogglePosition;
(function (TogglePosition) {
    TogglePosition["TOP"] = "top";
    TogglePosition["BOTTOM"] = "bottom";
    TogglePosition["LEFT"] = "left";
    TogglePosition["RIGHT"] = "right";
})(TogglePosition || (TogglePosition = {}));
class DcxNgToggleComponent {
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

class DcxNgRadioComponent {
    name = '';
    value = null;
    label = null;
    disabled = false;
    size = 'l';
    ariaLabel = '';
    unstyled = false;
    formControl = new FormControl(null);
    onChange = () => { };
    onTouched = () => { };
    cdr = inject(ChangeDetectorRef);
    constructor() {
        this.formControl.valueChanges
            .pipe(takeUntilDestroyed())
            .subscribe(value => {
            this.onChange(value);
        });
    }
    get isChecked() {
        return this.formControl.value === this.value;
    }
    get sizeClass() {
        return `dcx-ng-radio--${this.size}`;
    }
    get ariaLabelBinding() {
        return this.ariaLabel || 'Radio button';
    }
    onInputChange(value) {
        if (!this.disabled) {
            this.formControl.setValue(value);
        }
    }
    writeValue(value) {
        this.formControl.setValue(value, { emitEvent: false });
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        isDisabled ? this.formControl.disable({ emitEvent: false }) : this.formControl.enable({ emitEvent: false });
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgRadioComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgRadioComponent, isStandalone: true, selector: "dcx-ng-radio", inputs: { name: "name", value: "value", label: "label", disabled: "disabled", size: "size", ariaLabel: "ariaLabel", unstyled: "unstyled" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DcxNgRadioComponent),
                multi: true,
            },
        ], ngImport: i0, template: "<label\r\n  class=\"dcx-ng-radio\"\r\n  [ngClass]=\"sizeClass\"\r\n  [class.unstyled]=\"unstyled\"\r\n  [attr.aria-label]=\"ariaLabelBinding\"\r\n  [attr.aria-disabled]=\"disabled\"\r\n>\r\n  <input\r\n    type=\"radio\"\r\n    [name]=\"name\"\r\n    [value]=\"value\"\r\n    [formControl]=\"formControl\"\r\n    [disabled]=\"disabled\"\r\n    (blur)=\"onTouched()\"\r\n  />\r\n  \r\n  @if (label) {\r\n    <span>{{ label }}</span>\r\n  }\r\n  \r\n</label>", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:host{display:inline-block}.dcx-ng-radio{display:inline-flex;align-items:center;gap:.3rem;cursor:pointer}.dcx-ng-radio input[type=radio]{width:var(--dcx-radio-size, 1rem);height:var(--dcx-radio-size, 1rem);accent-color:#0070AD}.dcx-ng-radio input[type=radio]:disabled{cursor:not-allowed;opacity:.6}.dcx-ng-radio.unstyled input[type=radio]{accent-color:#666666}.dcx-ng-radio--s{--dcx-radio-size: .875rem}.dcx-ng-radio--m{--dcx-radio-size: 1rem}.dcx-ng-radio--l{--dcx-radio-size: 1.25rem}.dcx-ng-radio.unstyled{color:#666}.dcx-ng-radio:has(input:disabled){cursor:not-allowed;color:#ccc}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-radio', standalone: true, imports: [CommonModule, ReactiveFormsModule, FormsModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DcxNgRadioComponent),
                            multi: true,
                        },
                    ], template: "<label\r\n  class=\"dcx-ng-radio\"\r\n  [ngClass]=\"sizeClass\"\r\n  [class.unstyled]=\"unstyled\"\r\n  [attr.aria-label]=\"ariaLabelBinding\"\r\n  [attr.aria-disabled]=\"disabled\"\r\n>\r\n  <input\r\n    type=\"radio\"\r\n    [name]=\"name\"\r\n    [value]=\"value\"\r\n    [formControl]=\"formControl\"\r\n    [disabled]=\"disabled\"\r\n    (blur)=\"onTouched()\"\r\n  />\r\n  \r\n  @if (label) {\r\n    <span>{{ label }}</span>\r\n  }\r\n  \r\n</label>", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:host{display:inline-block}.dcx-ng-radio{display:inline-flex;align-items:center;gap:.3rem;cursor:pointer}.dcx-ng-radio input[type=radio]{width:var(--dcx-radio-size, 1rem);height:var(--dcx-radio-size, 1rem);accent-color:#0070AD}.dcx-ng-radio input[type=radio]:disabled{cursor:not-allowed;opacity:.6}.dcx-ng-radio.unstyled input[type=radio]{accent-color:#666666}.dcx-ng-radio--s{--dcx-radio-size: .875rem}.dcx-ng-radio--m{--dcx-radio-size: 1rem}.dcx-ng-radio--l{--dcx-radio-size: 1.25rem}.dcx-ng-radio.unstyled{color:#666}.dcx-ng-radio:has(input:disabled){cursor:not-allowed;color:#ccc}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"] }]
        }], ctorParameters: () => [], propDecorators: { name: [{
                type: Input
            }], value: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], size: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], unstyled: [{
                type: Input
            }] } });

var InputType;
(function (InputType) {
    InputType["TEXT"] = "text";
    InputType["NUMBER"] = "number";
    InputType["EMAIL"] = "email";
    InputType["PASSWORD"] = "password";
    InputType["SEARCH"] = "search";
    InputType["TEL"] = "tel";
    InputType["URL"] = "url";
})(InputType || (InputType = {}));
var InputSize;
(function (InputSize) {
    InputSize["SMALL"] = "s";
    InputSize["MEDIUM"] = "m";
    InputSize["LARGE"] = "l";
    InputSize["EXTRA_LARGE"] = "xl";
    InputSize["AUTO"] = "auto";
})(InputSize || (InputSize = {}));
class DcxNgInputComponent {
    type = InputType.TEXT;
    placeholder = null;
    size = InputSize.MEDIUM;
    disabled = false;
    required = false;
    label = null;
    errorMessages = [];
    set value(val) {
        if (this.inputControl) {
            this.inputControl.setValue(val, { emitEvent: false });
        }
    }
    valueChange = new EventEmitter();
    inputControl = new FormControl('');
    isFocused = false;
    inputId;
    destroy$ = new Subject();
    constructor() {
        this.inputId = `dcx-input-${Math.random().toString(36).substr(2, 9)}`;
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    ngOnInit() {
        this.setupFormControl();
        this.setupValueChanges();
    }
    setupFormControl() {
        const validators = [];
        // Agregar validadores de formato primero para que tengan prioridad
        if (this.type === InputType.EMAIL) {
            validators.push(Validators.email);
        }
        if (this.type === InputType.NUMBER) {
            // Patrón más estricto que no permite números terminados en punto decimal
            validators.push(Validators.pattern(/^-?(?:\d+(?:\.\d+)?|\.\d+)$/));
        }
        // Agregar required al final para que los errores de formato tengan prioridad
        if (this.required) {
            validators.push(Validators.required);
        }
        this.inputControl = new FormControl('', validators);
        if (this.disabled) {
            this.inputControl.disable();
        }
    }
    setupValueChanges() {
        this.inputControl.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(value => {
            this.valueChange.emit(value);
        });
    }
    ngOnChanges(changes) {
        if (changes['required'] || changes['type'] || changes['disabled']) {
            this.setupFormControl();
        }
    }
    getErrorMessage() {
        if (!this.inputControl.errors) {
            return null;
        }
        const value = this.inputControl.value;
        // Si hay contenido pero es inválido, priorizar errores de formato
        if (value && value.trim() !== '') {
            console.log(value);
            if (this.inputControl.hasError('pattern') && this.type === InputType.NUMBER) {
                return this.errorMessages.find(msg => msg.type === 'pattern')?.message || 'Formato numérico inválido';
            }
            if (this.inputControl.hasError('email')) {
                return this.errorMessages.find(msg => msg.type === 'email')?.message || 'Formato correo inválido';
            }
        }
        // Si está vacío o solo tiene espacios, mostrar error required
        if (this.inputControl.hasError('required')) {
            return this.errorMessages.find(msg => msg.type === 'required')?.message || 'Campo obligatorio';
        }
        return null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgInputComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgInputComponent, isStandalone: true, selector: "dcx-ng-input", inputs: { type: "type", placeholder: "placeholder", size: "size", disabled: "disabled", required: "required", label: "label", errorMessages: "errorMessages" }, outputs: { valueChange: "valueChange" }, usesOnChanges: true, ngImport: i0, template: "<div class=\"input-container\">\r\n  @if (label) {\r\n    <label [for]=\"inputId\" class=\"input-label\">\r\n      {{ label }}\r\n      @if (required) {\r\n        <span class=\"required-icon\" aria-hidden=\"true\">*</span>\r\n        <span class=\"visually-hidden\">(required)</span>\r\n      }\r\n    </label>\r\n  }\r\n\r\n  <input\r\n    [id]=\"inputId\"\r\n    class=\"dcx-ng-input\"\r\n    [class.disabled]=\"disabled\"\r\n    [type]=\"type\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"inputControl\"\r\n    [ngClass]=\"'dcx-ng-input-size--' + size\"\r\n    [class.required]=\"inputControl.touched && !isFocused && required && !inputControl.value\"\r\n    [class.invalid]=\"inputControl.invalid && inputControl.touched\"\r\n    [attr.aria-required]=\"required\"\r\n    [attr.aria-invalid]=\"inputControl.invalid && inputControl.touched\"\r\n    [attr.aria-label]=\"label || placeholder\"\r\n  />\r\n\r\n  @if (inputControl.invalid && inputControl.touched) {\r\n    <span class=\"invalid-message\">{{ getErrorMessage() }}</span>\r\n  }\r\n</div>\r\n", styles: ["p{font-size:var(--font-size-body-large)}.input-container{display:flex;flex-direction:column;gap:var(--spacing-xs);margin-bottom:var(--spacing-m)}.dcx-ng-input{box-sizing:content-box;--input-height: var(--spacing-s);--input-width: var(--spacing-m);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-m);border-radius:var(--border-radius-sm);background-color:var(--color-background);border:2px solid var(--color-primary-light);color:var(--color-text-primary);height:var(--input-height);width:calc(var(--input-width) * 5);font-size:var(--input-font-size);padding:var(--input-padding-vertical) var(--input-padding-horizontal)}.dcx-ng-input-size--s{--input-height: var(--spacing-xs);--input-width: var(--spacing-s);--input-font-size: var(--font-size-body-small);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-s)}.dcx-ng-input-size--m{--input-height: var(--spacing-xs);--input-width: var(--spacing-m);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--l{--input-height: var(--spacing-s);--input-width: var(--spacing-l);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--xl{--input-height: var(--spacing-s);--input-width: var(--spacing-xl);--input-font-size: var(--font-size-body-large);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--auto{--input-height: var(--spacing-s);--input-font-size: var(--font-size-body-large);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m);width:calc(100% - var(--input-padding-horizontal) * 2)}.dcx-ng-input--no-styles{background-color:transparent;border:2px solid black;color:#000}.dcx-ng-input:focus{border:2px solid var(--color-primary);background-color:var(--color-gray-lighter);outline:none}.required{border:2px solid var(--color-error)}.required-icon{color:var(--color-error);font-size:var(--font-size-body-small)}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.disabled{background-color:var(--color-gray-light);border:2px solid var(--color-primary-light);color:var(--color-text-disabled);pointer-events:none}.invalid{border:2px solid var(--color-error);color:var(--color-error)}.invalid-message{width:auto;color:var(--color-error);font-size:var(--font-size-body-small)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-input', standalone: true, imports: [CommonModule, ReactiveFormsModule], template: "<div class=\"input-container\">\r\n  @if (label) {\r\n    <label [for]=\"inputId\" class=\"input-label\">\r\n      {{ label }}\r\n      @if (required) {\r\n        <span class=\"required-icon\" aria-hidden=\"true\">*</span>\r\n        <span class=\"visually-hidden\">(required)</span>\r\n      }\r\n    </label>\r\n  }\r\n\r\n  <input\r\n    [id]=\"inputId\"\r\n    class=\"dcx-ng-input\"\r\n    [class.disabled]=\"disabled\"\r\n    [type]=\"type\"\r\n    [placeholder]=\"placeholder\"\r\n    [formControl]=\"inputControl\"\r\n    [ngClass]=\"'dcx-ng-input-size--' + size\"\r\n    [class.required]=\"inputControl.touched && !isFocused && required && !inputControl.value\"\r\n    [class.invalid]=\"inputControl.invalid && inputControl.touched\"\r\n    [attr.aria-required]=\"required\"\r\n    [attr.aria-invalid]=\"inputControl.invalid && inputControl.touched\"\r\n    [attr.aria-label]=\"label || placeholder\"\r\n  />\r\n\r\n  @if (inputControl.invalid && inputControl.touched) {\r\n    <span class=\"invalid-message\">{{ getErrorMessage() }}</span>\r\n  }\r\n</div>\r\n", styles: ["p{font-size:var(--font-size-body-large)}.input-container{display:flex;flex-direction:column;gap:var(--spacing-xs);margin-bottom:var(--spacing-m)}.dcx-ng-input{box-sizing:content-box;--input-height: var(--spacing-s);--input-width: var(--spacing-m);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-m);border-radius:var(--border-radius-sm);background-color:var(--color-background);border:2px solid var(--color-primary-light);color:var(--color-text-primary);height:var(--input-height);width:calc(var(--input-width) * 5);font-size:var(--input-font-size);padding:var(--input-padding-vertical) var(--input-padding-horizontal)}.dcx-ng-input-size--s{--input-height: var(--spacing-xs);--input-width: var(--spacing-s);--input-font-size: var(--font-size-body-small);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-s)}.dcx-ng-input-size--m{--input-height: var(--spacing-xs);--input-width: var(--spacing-m);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-xs);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--l{--input-height: var(--spacing-s);--input-width: var(--spacing-l);--input-font-size: var(--font-size-body);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--xl{--input-height: var(--spacing-s);--input-width: var(--spacing-xl);--input-font-size: var(--font-size-body-large);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m)}.dcx-ng-input-size--auto{--input-height: var(--spacing-s);--input-font-size: var(--font-size-body-large);--input-padding-vertical: var(--spacing-inset-s);--input-padding-horizontal: var(--spacing-inset-m);width:calc(100% - var(--input-padding-horizontal) * 2)}.dcx-ng-input--no-styles{background-color:transparent;border:2px solid black;color:#000}.dcx-ng-input:focus{border:2px solid var(--color-primary);background-color:var(--color-gray-lighter);outline:none}.required{border:2px solid var(--color-error)}.required-icon{color:var(--color-error);font-size:var(--font-size-body-small)}.visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.disabled{background-color:var(--color-gray-light);border:2px solid var(--color-primary-light);color:var(--color-text-disabled);pointer-events:none}.invalid{border:2px solid var(--color-error);color:var(--color-error)}.invalid-message{width:auto;color:var(--color-error);font-size:var(--font-size-body-small)}\n"] }]
        }], ctorParameters: () => [], propDecorators: { type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }], required: [{
                type: Input
            }], label: [{
                type: Input
            }], errorMessages: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

var TooltipPosition;
(function (TooltipPosition) {
    TooltipPosition["TOP"] = "top";
    TooltipPosition["BOTTOM"] = "bottom";
    TooltipPosition["LEFT"] = "left";
    TooltipPosition["RIGHT"] = "right";
})(TooltipPosition || (TooltipPosition = {}));
class DcxNgTooltipComponent {
    elementRef;
    position = TooltipPosition.TOP;
    hideTooltipOnClick = false;
    content = '';
    visible = false;
    actualPosition = TooltipPosition.TOP;
    tooltipElement;
    onMouseEnter() {
        this.visible = true;
        this.adjustPosition();
    }
    onMouseLeave() {
        this.visible = false;
    }
    onDocumentClick(event) {
        if (this.hideTooltipOnClick) {
            const clickedInside = this.elementRef.nativeElement.contains(event.target);
            if (clickedInside) {
                this.visible = false;
            }
        }
    }
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        this.actualPosition = this.position;
    }
    adjustPosition() {
        setTimeout(() => {
            const tooltipEl = this.tooltipElement.nativeElement;
            const hostEl = this.elementRef.nativeElement;
            // Get viewport dimensions
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            // Get host element position and dimensions
            const hostRect = hostEl.getBoundingClientRect();
            // Get tooltip dimensions
            const tooltipRect = tooltipEl.getBoundingClientRect();
            // Calculate available space in each direction
            const spaceTop = hostRect.top;
            const spaceBottom = viewport.height - hostRect.bottom;
            const spaceLeft = hostRect.left;
            const spaceRight = viewport.width - hostRect.right;
            // Determine the best position based on available space
            const optimalPosition = this.calculateOptimalPosition(this.position, tooltipRect, { spaceTop, spaceBottom, spaceLeft, spaceRight });
            if (optimalPosition !== this.actualPosition) {
                this.actualPosition = optimalPosition;
            }
        }, 10);
    }
    calculateOptimalPosition(preferredPosition, tooltipRect, availableSpace) {
        const margin = 10; // Safety margin
        const tooltipHeight = tooltipRect.height;
        const tooltipWidth = tooltipRect.width;
        // Check if preferred position fits
        switch (preferredPosition) {
            case TooltipPosition.TOP:
                if (availableSpace.spaceTop >= tooltipHeight + margin) {
                    return TooltipPosition.TOP;
                }
                break;
            case TooltipPosition.BOTTOM:
                if (availableSpace.spaceBottom >= tooltipHeight + margin) {
                    return TooltipPosition.BOTTOM;
                }
                break;
            case TooltipPosition.LEFT:
                if (availableSpace.spaceLeft >= tooltipWidth + margin) {
                    return TooltipPosition.LEFT;
                }
                break;
            case TooltipPosition.RIGHT:
                if (availableSpace.spaceRight >= tooltipWidth + margin) {
                    return TooltipPosition.RIGHT;
                }
                break;
        }
        // If preferred position doesn't fit, find the best alternative
        const alternatives = [
            { position: TooltipPosition.TOP, space: availableSpace.spaceTop },
            { position: TooltipPosition.BOTTOM, space: availableSpace.spaceBottom },
            { position: TooltipPosition.LEFT, space: availableSpace.spaceLeft },
            { position: TooltipPosition.RIGHT, space: availableSpace.spaceRight }
        ];
        // Sort by available space (descending)
        alternatives.sort((a, b) => b.space - a.space);
        // Return the position with the most space that fits
        for (const alt of alternatives) {
            const requiredSpace = (alt.position === TooltipPosition.LEFT || alt.position === TooltipPosition.RIGHT)
                ? tooltipWidth + margin
                : tooltipHeight + margin;
            if (alt.space >= requiredSpace) {
                return alt.position;
            }
        }
        // If nothing fits perfectly, return the one with most space
        return alternatives[0].position;
    }
    getTooltipClasses() {
        const baseClass = 'dcx-ng-tooltip';
        const positionClass = `${baseClass}--${this.actualPosition}`;
        return `${baseClass} ${positionClass}`.trim();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgTooltipComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgTooltipComponent, isStandalone: true, selector: "dcx-ng-tooltip", inputs: { position: "position", hideTooltipOnClick: "hideTooltipOnClick", content: "content" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()", "document:click": "onDocumentClick($event)" } }, viewQueries: [{ propertyName: "tooltipElement", first: true, predicate: ["tooltipElement"], descendants: true }], ngImport: i0, template: "<div class=\"tooltip-container\">\r\n  <ng-content></ng-content>\r\n  @if (visible && content) {\r\n    <div\r\n      #tooltipElement\r\n      [class]=\"getTooltipClasses()\"\r\n      [attr.data-position]=\"actualPosition\"\r\n      role=\"tooltip\"\r\n      [attr.aria-hidden]=\"!visible\"\r\n      [attr.aria-live]=\"'polite'\"\r\n    >\r\n      {{ content }}\r\n      <div class=\"tooltip-arrow\"></div>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}.tooltip-container{position:relative;display:inline-block;margin:var(--spacing-inset-s)}.dcx-ng-tooltip{--tooltip-bg-color: var(--color-primary-light);--tooltip-text-color: var(--color-text-inverse);--tooltip-padding: var(--spacing-inset-s) var(--spacing-inset-m);--tooltip-border-radius: var(--border-radius-sm);--tooltip-font-size: var(--font-size-body-small);--tooltip-arrow-size: 6px;--tooltip-max-width: 250px;background-color:var(--tooltip-bg-color);color:var(--tooltip-text-color);border-radius:var(--tooltip-border-radius);padding:var(--tooltip-padding);font-size:var(--tooltip-font-size);max-width:var(--tooltip-max-width);width:max-content;word-wrap:break-word;position:absolute;z-index:1000;animation:fade-in linear .2s}.dcx-ng-tooltip--top{bottom:100%;left:50%;transform:translate(-50%);margin-bottom:var(--tooltip-arrow-size);position:absolute}.dcx-ng-tooltip--top[data-position=top]{left:max(8px,min(50%,100vw - var(--tooltip-max-width) - 8px));transform:translate(max(-50%,-50vw + 8px))}.dcx-ng-tooltip--top .tooltip-arrow{bottom:-3px;left:50%;transform:translate(-50%);border-width:4px 4px 0 4px;border-color:var(--tooltip-bg-color) transparent transparent transparent}.dcx-ng-tooltip--bottom{top:100%;left:50%;transform:translate(-50%);margin-top:var(--tooltip-arrow-size)}.dcx-ng-tooltip--bottom[data-position=bottom]{left:max(8px,min(50%,100vw - var(--tooltip-max-width) - 8px));transform:translate(max(-50%,-50vw + 8px))}.dcx-ng-tooltip--bottom .tooltip-arrow{top:-3.5px;left:50%;transform:translate(-50%) rotateX(180deg);border-width:4px 4px 0 4px;border-color:var(--tooltip-bg-color) transparent transparent transparent}.dcx-ng-tooltip--left{right:100%;top:50%;transform:translateY(-50%);margin-right:var(--tooltip-arrow-size)}.dcx-ng-tooltip--left[data-position=left]{top:max(8px,min(50%,100vh - 60px));transform:translateY(max(-50%,-45vh))}.dcx-ng-tooltip--left .tooltip-arrow{right:-3.5px;top:50%;transform:translateY(-50%);border-width:4px 0 4px 4px;border-color:transparent transparent transparent var(--tooltip-bg-color)}.dcx-ng-tooltip--right{left:100%;top:50%;transform:translateY(-50%);margin-left:var(--tooltip-arrow-size)}.dcx-ng-tooltip--right[data-position=right]{top:max(8px,min(50%,100vh - 60px));transform:translateY(max(-50%,-45vh))}.dcx-ng-tooltip--right .tooltip-arrow{left:-3.5px;top:50%;transform:translateY(-50%);border-width:4px 4px 4px 0;border-color:transparent var(--tooltip-bg-color) transparent transparent}.dcx-ng-tooltip--no-styles{--tooltip-bg-color: black;border:2px solid black;color:#000;background-color:#fff}.tooltip-arrow{position:absolute;width:0;height:0;border-style:solid;content:\"\";display:block}@media (max-width: 768px){.dcx-ng-tooltip{--tooltip-max-width: 200px;--tooltip-font-size: var(--font-size-body-small, 11px)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgTooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-tooltip', standalone: true, imports: [CommonModule], template: "<div class=\"tooltip-container\">\r\n  <ng-content></ng-content>\r\n  @if (visible && content) {\r\n    <div\r\n      #tooltipElement\r\n      [class]=\"getTooltipClasses()\"\r\n      [attr.data-position]=\"actualPosition\"\r\n      role=\"tooltip\"\r\n      [attr.aria-hidden]=\"!visible\"\r\n      [attr.aria-live]=\"'polite'\"\r\n    >\r\n      {{ content }}\r\n      <div class=\"tooltip-arrow\"></div>\r\n    </div>\r\n  }\r\n</div>\r\n", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}.tooltip-container{position:relative;display:inline-block;margin:var(--spacing-inset-s)}.dcx-ng-tooltip{--tooltip-bg-color: var(--color-primary-light);--tooltip-text-color: var(--color-text-inverse);--tooltip-padding: var(--spacing-inset-s) var(--spacing-inset-m);--tooltip-border-radius: var(--border-radius-sm);--tooltip-font-size: var(--font-size-body-small);--tooltip-arrow-size: 6px;--tooltip-max-width: 250px;background-color:var(--tooltip-bg-color);color:var(--tooltip-text-color);border-radius:var(--tooltip-border-radius);padding:var(--tooltip-padding);font-size:var(--tooltip-font-size);max-width:var(--tooltip-max-width);width:max-content;word-wrap:break-word;position:absolute;z-index:1000;animation:fade-in linear .2s}.dcx-ng-tooltip--top{bottom:100%;left:50%;transform:translate(-50%);margin-bottom:var(--tooltip-arrow-size);position:absolute}.dcx-ng-tooltip--top[data-position=top]{left:max(8px,min(50%,100vw - var(--tooltip-max-width) - 8px));transform:translate(max(-50%,-50vw + 8px))}.dcx-ng-tooltip--top .tooltip-arrow{bottom:-3px;left:50%;transform:translate(-50%);border-width:4px 4px 0 4px;border-color:var(--tooltip-bg-color) transparent transparent transparent}.dcx-ng-tooltip--bottom{top:100%;left:50%;transform:translate(-50%);margin-top:var(--tooltip-arrow-size)}.dcx-ng-tooltip--bottom[data-position=bottom]{left:max(8px,min(50%,100vw - var(--tooltip-max-width) - 8px));transform:translate(max(-50%,-50vw + 8px))}.dcx-ng-tooltip--bottom .tooltip-arrow{top:-3.5px;left:50%;transform:translate(-50%) rotateX(180deg);border-width:4px 4px 0 4px;border-color:var(--tooltip-bg-color) transparent transparent transparent}.dcx-ng-tooltip--left{right:100%;top:50%;transform:translateY(-50%);margin-right:var(--tooltip-arrow-size)}.dcx-ng-tooltip--left[data-position=left]{top:max(8px,min(50%,100vh - 60px));transform:translateY(max(-50%,-45vh))}.dcx-ng-tooltip--left .tooltip-arrow{right:-3.5px;top:50%;transform:translateY(-50%);border-width:4px 0 4px 4px;border-color:transparent transparent transparent var(--tooltip-bg-color)}.dcx-ng-tooltip--right{left:100%;top:50%;transform:translateY(-50%);margin-left:var(--tooltip-arrow-size)}.dcx-ng-tooltip--right[data-position=right]{top:max(8px,min(50%,100vh - 60px));transform:translateY(max(-50%,-45vh))}.dcx-ng-tooltip--right .tooltip-arrow{left:-3.5px;top:50%;transform:translateY(-50%);border-width:4px 4px 4px 0;border-color:transparent var(--tooltip-bg-color) transparent transparent}.dcx-ng-tooltip--no-styles{--tooltip-bg-color: black;border:2px solid black;color:#000;background-color:#fff}.tooltip-arrow{position:absolute;width:0;height:0;border-style:solid;content:\"\";display:block}@media (max-width: 768px){.dcx-ng-tooltip{--tooltip-max-width: 200px;--tooltip-font-size: var(--font-size-body-small, 11px)}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { position: [{
                type: Input
            }], hideTooltipOnClick: [{
                type: Input
            }], content: [{
                type: Input
            }], tooltipElement: [{
                type: ViewChild,
                args: ['tooltipElement']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], onDocumentClick: [{
                type: HostListener,
                args: ['document:click', ['$event']]
            }] } });

class DcxNgCardComponent {
    header = '';
    subheader = '';
    iconClass = '';
    closable = false;
    visible = true;
    onClose = new EventEmitter();
    onAccept = new EventEmitter();
    onCancel = new EventEmitter();
    cardBodyTemplate = null;
    cardFooterTemplate = null;
    handleClose() {
        this.visible = false;
        this.onClose.emit();
    }
    handleAccept() {
        this.onAccept.emit();
    }
    handleCancel() {
        this.onCancel.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgCardComponent, isStandalone: true, selector: "dcx-ng-card", inputs: { header: "header", subheader: "subheader", iconClass: "iconClass", closable: "closable", visible: "visible" }, outputs: { onClose: "onClose", onAccept: "onAccept", onCancel: "onCancel" }, queries: [{ propertyName: "cardBodyTemplate", first: true, predicate: ["cardBody"], descendants: true }, { propertyName: "cardFooterTemplate", first: true, predicate: ["cardFooter"], descendants: true }], ngImport: i0, template: "<div class=\"dcx-card\" [class.dcx-card--hidden]=\"!visible\">\r\n  @if (visible) {\r\n    <div class=\"dcx-card-header\">\r\n      @if (header || closable) {\r\n        <div class=\"dcx-card-header__content\">\r\n          @if (iconClass) {\r\n            <div class=\"dcx-card-header__icon\">\r\n              <i [class]=\"iconClass\" aria-hidden=\"true\"></i>\r\n            </div>\r\n          }\r\n\r\n          <div class=\"dcx-card-header__titles\">\r\n            @if (header) {\r\n              <h3 class=\"dcx-card-header__title\">{{ header }}</h3>\r\n            }\r\n            @if (subheader) {\r\n              <h4 class=\"dcx-card-header__subtitle\">{{ subheader }}</h4>\r\n            }\r\n          </div>\r\n        </div>\r\n\r\n        @if (closable) {\r\n          <button\r\n            type=\"button\"\r\n            class=\"dcx-card-header__close-btn\"\r\n            (click)=\"handleClose()\"\r\n            aria-label=\"Cerrar\"\r\n          >\r\n            <i class=\"dcx-icon-close\" aria-hidden=\"true\">\u2715</i>\r\n          </button>\r\n        }\r\n      }\r\n    </div>\r\n\r\n    <div class=\"dcx-card-body\">\r\n      @if (cardBodyTemplate) {\r\n        <ng-container *ngTemplateOutlet=\"cardBodyTemplate\"></ng-container>\r\n      } @else {\r\n        <ng-content></ng-content>\r\n      }\r\n    </div>\r\n\r\n    @if (cardFooterTemplate) {\r\n      <div class=\"dcx-card-footer\">\r\n        <ng-container *ngTemplateOutlet=\"cardFooterTemplate\"></ng-container>\r\n      </div>\r\n    } @else {\r\n      <div class=\"dcx-card-footer dcx-card-footer--default\">\r\n        <button\r\n          type=\"button\"\r\n          class=\"dcx-btn dcx-btn--secondary dcx-card-footer__btn\"\r\n          (click)=\"handleCancel()\"\r\n        >\r\n          Cancelar\r\n        </button>\r\n        <button\r\n          type=\"button\"\r\n          class=\"dcx-btn dcx-btn--primary dcx-card-footer__btn\"\r\n          (click)=\"handleAccept()\"\r\n        >\r\n          Aceptar\r\n        </button>\r\n      </div>\r\n    }\r\n  }\r\n</div>", styles: [":host{display:block}.dcx-card{background:var(--color-background);border-radius:var(--border-radius-md);box-shadow:var(--shadow-md);overflow:hidden}.dcx-card--hidden{display:none}.dcx-card-header{padding:var(--spacing-inset-m) var(--spacing-inset-l);border-bottom:1px solid var(--color-border);background:var(--color-background-alt);display:flex;align-items:center;justify-content:space-between}.dcx-card-header__content{display:flex;align-items:center;flex:1}.dcx-card-header__icon{margin-right:var(--spacing-inline-m)}.dcx-card-header__icon i{font-size:var(--font-size-h5);color:var(--color-text-secondary)}.dcx-card-header__titles{flex:1}.dcx-card-header__title{margin:0;font-size:var(--font-size-h6);font-weight:var(--font-weight-semibold);color:var(--color-text-primary)}.dcx-card-header__subtitle{margin:var(--spacing-stack-xs) 0 0 0;font-size:var(--font-size-body-small);color:var(--color-text-secondary)}.dcx-card-header__close-btn{background:transparent;border:none;padding:var(--spacing-inset-xs);cursor:pointer;border-radius:var(--border-radius-sm)}.dcx-card-header__close-btn:hover{background:var(--color-border-light)}.dcx-card-header__close-btn .dcx-icon-close{font-size:var(--font-size-body);color:var(--color-text-secondary);font-style:normal}.dcx-card-body{padding:var(--spacing-inset-l);min-height:60px}.dcx-card-footer{padding:var(--spacing-inset-m) var(--spacing-inset-l);border-top:1px solid var(--color-border);background:var(--color-background-alt)}.dcx-card-footer--default{display:flex;justify-content:flex-end;gap:var(--spacing-inline-m)}.dcx-btn{padding:var(--spacing-inset-xs) var(--spacing-inset-m);border-radius:var(--border-radius-sm);font-size:var(--font-size-body-small);font-weight:var(--font-weight-medium);cursor:pointer;border:1px solid transparent}.dcx-btn--primary{background:var(--color-primary);color:var(--color-text-inverse)}.dcx-btn--primary:hover{background:var(--color-primary-dark)}.dcx-btn--secondary{background:var(--color-background);color:var(--color-text-primary);border-color:var(--color-border)}.dcx-btn--secondary:hover{background:var(--color-background-alt)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-card', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"dcx-card\" [class.dcx-card--hidden]=\"!visible\">\r\n  @if (visible) {\r\n    <div class=\"dcx-card-header\">\r\n      @if (header || closable) {\r\n        <div class=\"dcx-card-header__content\">\r\n          @if (iconClass) {\r\n            <div class=\"dcx-card-header__icon\">\r\n              <i [class]=\"iconClass\" aria-hidden=\"true\"></i>\r\n            </div>\r\n          }\r\n\r\n          <div class=\"dcx-card-header__titles\">\r\n            @if (header) {\r\n              <h3 class=\"dcx-card-header__title\">{{ header }}</h3>\r\n            }\r\n            @if (subheader) {\r\n              <h4 class=\"dcx-card-header__subtitle\">{{ subheader }}</h4>\r\n            }\r\n          </div>\r\n        </div>\r\n\r\n        @if (closable) {\r\n          <button\r\n            type=\"button\"\r\n            class=\"dcx-card-header__close-btn\"\r\n            (click)=\"handleClose()\"\r\n            aria-label=\"Cerrar\"\r\n          >\r\n            <i class=\"dcx-icon-close\" aria-hidden=\"true\">\u2715</i>\r\n          </button>\r\n        }\r\n      }\r\n    </div>\r\n\r\n    <div class=\"dcx-card-body\">\r\n      @if (cardBodyTemplate) {\r\n        <ng-container *ngTemplateOutlet=\"cardBodyTemplate\"></ng-container>\r\n      } @else {\r\n        <ng-content></ng-content>\r\n      }\r\n    </div>\r\n\r\n    @if (cardFooterTemplate) {\r\n      <div class=\"dcx-card-footer\">\r\n        <ng-container *ngTemplateOutlet=\"cardFooterTemplate\"></ng-container>\r\n      </div>\r\n    } @else {\r\n      <div class=\"dcx-card-footer dcx-card-footer--default\">\r\n        <button\r\n          type=\"button\"\r\n          class=\"dcx-btn dcx-btn--secondary dcx-card-footer__btn\"\r\n          (click)=\"handleCancel()\"\r\n        >\r\n          Cancelar\r\n        </button>\r\n        <button\r\n          type=\"button\"\r\n          class=\"dcx-btn dcx-btn--primary dcx-card-footer__btn\"\r\n          (click)=\"handleAccept()\"\r\n        >\r\n          Aceptar\r\n        </button>\r\n      </div>\r\n    }\r\n  }\r\n</div>", styles: [":host{display:block}.dcx-card{background:var(--color-background);border-radius:var(--border-radius-md);box-shadow:var(--shadow-md);overflow:hidden}.dcx-card--hidden{display:none}.dcx-card-header{padding:var(--spacing-inset-m) var(--spacing-inset-l);border-bottom:1px solid var(--color-border);background:var(--color-background-alt);display:flex;align-items:center;justify-content:space-between}.dcx-card-header__content{display:flex;align-items:center;flex:1}.dcx-card-header__icon{margin-right:var(--spacing-inline-m)}.dcx-card-header__icon i{font-size:var(--font-size-h5);color:var(--color-text-secondary)}.dcx-card-header__titles{flex:1}.dcx-card-header__title{margin:0;font-size:var(--font-size-h6);font-weight:var(--font-weight-semibold);color:var(--color-text-primary)}.dcx-card-header__subtitle{margin:var(--spacing-stack-xs) 0 0 0;font-size:var(--font-size-body-small);color:var(--color-text-secondary)}.dcx-card-header__close-btn{background:transparent;border:none;padding:var(--spacing-inset-xs);cursor:pointer;border-radius:var(--border-radius-sm)}.dcx-card-header__close-btn:hover{background:var(--color-border-light)}.dcx-card-header__close-btn .dcx-icon-close{font-size:var(--font-size-body);color:var(--color-text-secondary);font-style:normal}.dcx-card-body{padding:var(--spacing-inset-l);min-height:60px}.dcx-card-footer{padding:var(--spacing-inset-m) var(--spacing-inset-l);border-top:1px solid var(--color-border);background:var(--color-background-alt)}.dcx-card-footer--default{display:flex;justify-content:flex-end;gap:var(--spacing-inline-m)}.dcx-btn{padding:var(--spacing-inset-xs) var(--spacing-inset-m);border-radius:var(--border-radius-sm);font-size:var(--font-size-body-small);font-weight:var(--font-weight-medium);cursor:pointer;border:1px solid transparent}.dcx-btn--primary{background:var(--color-primary);color:var(--color-text-inverse)}.dcx-btn--primary:hover{background:var(--color-primary-dark)}.dcx-btn--secondary{background:var(--color-background);color:var(--color-text-primary);border-color:var(--color-border)}.dcx-btn--secondary:hover{background:var(--color-background-alt)}\n"] }]
        }], propDecorators: { header: [{
                type: Input
            }], subheader: [{
                type: Input
            }], iconClass: [{
                type: Input
            }], closable: [{
                type: Input
            }], visible: [{
                type: Input
            }], onClose: [{
                type: Output
            }], onAccept: [{
                type: Output
            }], onCancel: [{
                type: Output
            }], cardBodyTemplate: [{
                type: ContentChild,
                args: ['cardBody']
            }], cardFooterTemplate: [{
                type: ContentChild,
                args: ['cardFooter']
            }] } });

var ThemeColors;
(function (ThemeColors) {
    ThemeColors["PRIMARY"] = "primary";
    ThemeColors["SECONDARY"] = "secondary";
    ThemeColors["SUCCESS"] = "success";
    ThemeColors["WARNING"] = "warning";
    ThemeColors["ERROR"] = "error";
    ThemeColors["INFO"] = "info";
    ThemeColors["GRAY"] = "gray";
    ThemeColors["GRAY_LIGHT"] = "gray-light";
})(ThemeColors || (ThemeColors = {}));
class DcxNgChipComponent {
    label = input('');
    color = input(ThemeColors.PRIMARY);
    removable = input(false);
    icon = input('');
    image = input('');
    onRemove = new EventEmitter();
    ThemeColors = ThemeColors;
    ChipTypeValues = {
        LABEL_ONLY: 'label-only',
        WITH_ICON: 'with-icon',
        WITH_IMAGE: 'with-image'
    };
    chipType = computed(() => {
        if (this.image())
            return this.ChipTypeValues.WITH_IMAGE;
        if (this.icon())
            return this.ChipTypeValues.WITH_ICON;
        return this.ChipTypeValues.LABEL_ONLY;
    });
    get chipClasses() {
        return `dcx-ng-chip--${this.color()}`;
    }
    handleRemove(event) {
        event.stopPropagation();
        if (this.removable()) {
            this.onRemove.emit();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgChipComponent, isStandalone: true, selector: "dcx-ng-chip", inputs: { label: { classPropertyName: "label", publicName: "label", isSignal: true, isRequired: false, transformFunction: null }, color: { classPropertyName: "color", publicName: "color", isSignal: true, isRequired: false, transformFunction: null }, removable: { classPropertyName: "removable", publicName: "removable", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, image: { classPropertyName: "image", publicName: "image", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { onRemove: "onRemove" }, ngImport: i0, template: "<div class=\"dcx-ng-chip\" [ngClass]=\"chipClasses\" [attr.data-chip-type]=\"chipType()\">\r\n\r\n    @if (chipType() === ChipTypeValues.WITH_IMAGE && image()) {\r\n    <img class=\"dcx-ng-chip__image\" [src]=\"image()\" [alt]=\"label() || 'Chip image'\" loading=\"lazy\">\r\n    }\r\n\r\n    @if (chipType() === ChipTypeValues.WITH_ICON && icon()) {\r\n    <dcx-ng-icon class=\"dcx-ng-chip__icon\" [name]=\"icon()\" size=\"s\">\r\n    </dcx-ng-icon>\r\n    }\r\n\r\n    @if (label()) {\r\n    <span class=\"dcx-ng-chip__label\">{{ label() }}</span>\r\n    }\r\n\r\n    @if (removable()) {\r\n    <button type=\"button\" class=\"dcx-ng-chip__remove-btn\" [attr.aria-label]=\"'Remover ' + label()\"\r\n        (click)=\"handleRemove($event)\">\r\n        <dcx-ng-icon name=\"close\" size=\"s\">\r\n        </dcx-ng-icon>\r\n    </button>\r\n    }\r\n</div>", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:host{display:inline-flex}.dcx-ng-chip{display:inline-flex;align-items:center;gap:.5rem;height:2rem;padding:.5rem .75rem;border-radius:1rem;font-size:.875rem;font-weight:500;border:1px solid transparent;cursor:default}.dcx-ng-chip--primary{background-color:#0070ad;color:#fff}.dcx-ng-chip--secondary{background-color:#2b0a3d;color:#fff}.dcx-ng-chip--success{background-color:#00a76f;color:#fff}.dcx-ng-chip--warning{background-color:#ffa726;color:#1a1a1a}.dcx-ng-chip--error{background-color:#ef4444;color:#fff}.dcx-ng-chip--info{background-color:#12abdb;color:#fff}.dcx-ng-chip--gray{background-color:#666;color:#fff}.dcx-ng-chip--gray-light{background-color:#ccc;color:#1a1a1a}.dcx-ng-chip__image{width:1.5rem;height:1.5rem;border-radius:50%;object-fit:cover;flex-shrink:0}.dcx-ng-chip__icon{flex-shrink:0;display:flex;align-items:center}.dcx-ng-chip__label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dcx-ng-chip__remove-btn{display:flex;align-items:center;justify-content:center;border:none;background:none;color:#000;cursor:pointer;padding:0;margin:0;margin-left:.25rem;flex-shrink:0;font-size:.875rem;line-height:1;transform:translateY(-.2rem)}.dcx-ng-chip__remove-btn:hover{opacity:.7}.dcx-ng-chip__remove-btn:focus{outline:none}.dcx-ng-chip__remove-btn:active{opacity:.5}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: DcxNgIconComponent, selector: "dcx-ng-icon", inputs: ["size", "spacing", "color", "name"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgChipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-chip', standalone: true, imports: [CommonModule, DcxNgIconComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"dcx-ng-chip\" [ngClass]=\"chipClasses\" [attr.data-chip-type]=\"chipType()\">\r\n\r\n    @if (chipType() === ChipTypeValues.WITH_IMAGE && image()) {\r\n    <img class=\"dcx-ng-chip__image\" [src]=\"image()\" [alt]=\"label() || 'Chip image'\" loading=\"lazy\">\r\n    }\r\n\r\n    @if (chipType() === ChipTypeValues.WITH_ICON && icon()) {\r\n    <dcx-ng-icon class=\"dcx-ng-chip__icon\" [name]=\"icon()\" size=\"s\">\r\n    </dcx-ng-icon>\r\n    }\r\n\r\n    @if (label()) {\r\n    <span class=\"dcx-ng-chip__label\">{{ label() }}</span>\r\n    }\r\n\r\n    @if (removable()) {\r\n    <button type=\"button\" class=\"dcx-ng-chip__remove-btn\" [attr.aria-label]=\"'Remover ' + label()\"\r\n        (click)=\"handleRemove($event)\">\r\n        <dcx-ng-icon name=\"close\" size=\"s\">\r\n        </dcx-ng-icon>\r\n    </button>\r\n    }\r\n</div>", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}:host{display:inline-flex}.dcx-ng-chip{display:inline-flex;align-items:center;gap:.5rem;height:2rem;padding:.5rem .75rem;border-radius:1rem;font-size:.875rem;font-weight:500;border:1px solid transparent;cursor:default}.dcx-ng-chip--primary{background-color:#0070ad;color:#fff}.dcx-ng-chip--secondary{background-color:#2b0a3d;color:#fff}.dcx-ng-chip--success{background-color:#00a76f;color:#fff}.dcx-ng-chip--warning{background-color:#ffa726;color:#1a1a1a}.dcx-ng-chip--error{background-color:#ef4444;color:#fff}.dcx-ng-chip--info{background-color:#12abdb;color:#fff}.dcx-ng-chip--gray{background-color:#666;color:#fff}.dcx-ng-chip--gray-light{background-color:#ccc;color:#1a1a1a}.dcx-ng-chip__image{width:1.5rem;height:1.5rem;border-radius:50%;object-fit:cover;flex-shrink:0}.dcx-ng-chip__icon{flex-shrink:0;display:flex;align-items:center}.dcx-ng-chip__label{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dcx-ng-chip__remove-btn{display:flex;align-items:center;justify-content:center;border:none;background:none;color:#000;cursor:pointer;padding:0;margin:0;margin-left:.25rem;flex-shrink:0;font-size:.875rem;line-height:1;transform:translateY(-.2rem)}.dcx-ng-chip__remove-btn:hover{opacity:.7}.dcx-ng-chip__remove-btn:focus{outline:none}.dcx-ng-chip__remove-btn:active{opacity:.5}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"] }]
        }], propDecorators: { onRemove: [{
                type: Output
            }] } });

class DcxNgMessageComponent {
    body = input.required();
    type = input('notification');
    title = input();
    link = input();
    icon = input(false);
    showClose = input(false);
    messageData = computed(() => {
        const messageOptions = {
            notification: {
                icon: '',
                role: 'notification',
            },
            error: {
                icon: '',
                role: 'error',
            },
            warning: {
                icon: '',
                role: 'warning',
            },
            success: {
                icon: '',
                role: 'success',
            },
        };
        return messageOptions[this.type()];
    });
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgMessageComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgMessageComponent, isStandalone: true, selector: "dcx-ng-message", inputs: { body: { classPropertyName: "body", publicName: "body", isSignal: true, isRequired: true, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, title: { classPropertyName: "title", publicName: "title", isSignal: true, isRequired: false, transformFunction: null }, link: { classPropertyName: "link", publicName: "link", isSignal: true, isRequired: false, transformFunction: null }, icon: { classPropertyName: "icon", publicName: "icon", isSignal: true, isRequired: false, transformFunction: null }, showClose: { classPropertyName: "showClose", publicName: "showClose", isSignal: true, isRequired: false, transformFunction: null } }, ngImport: i0, template: "<div\r\n  [ngClass]=\"['message__container', messageData().role]\"\r\n  [attr.aria-role]=\"messageData().role\"\r\n>\r\n  @if (icon()) {\r\n    <dcx-ng-icon\r\n      class=\"icon__container\"\r\n      [name]=\"messageData().icon || 'info'\"\r\n      size=\"m\"\r\n      color=\"inherit\"\r\n    ></dcx-ng-icon>\r\n  }\r\n\r\n  <div class=\"message__container__body\">\r\n    @if (title()) {\r\n      <h3 class=\"message__container__title\">{{ title() }}</h3>\r\n    }\r\n\r\n    <p class=\"message__container__paragraph\">{{ body() }}</p>\r\n\r\n    @if (link()) {\r\n      <a [href]=\"link()\" class=\"message__container__link\">{{link()}}</a>\r\n    }\r\n  </div>\r\n\r\n  @if (showClose()) {\r\n    <button class=\"icon__container__close\" type=\"button\">\r\n      <dcx-ng-icon name=\"close\" size=\"m\" color=\"inherit\"></dcx-ng-icon>\r\n    </button>\r\n  }\r\n</div>\r\n", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}.message__container__link{text-decoration:underline;font-size:.7rem}.message__container{border-radius:.25rem;padding:.5rem;display:flex;gap:.5rem;align-items:flex-start}.message__container__title{font-weight:600;margin:0 0 .25rem;font-size:.875rem}.message__container__paragraph{margin:0;font-size:.875rem;line-height:1.4}.message__container__body{flex:1}.error{border:1px solid #EF4444;color:#ef4444}.error .icon__container__close{color:#ef4444}.error .icon__container__close:hover{background:#ef44441a;color:#ef4444}.error .icon__container__close:active{background:#ef444433;color:#ef4444}.warning{border:1px solid #FFA726;color:#ffa726}.warning .icon__container__close{color:#ffa726}.warning .icon__container__close:hover{background:#ffa7261a;color:#ffa726}.warning .icon__container__close:active{background:#ffa72633;color:#ffa726}.notification{border:1px solid #12ABDB;color:#12abdb}.notification .icon__container__close{color:#12abdb}.notification .icon__container__close:hover{background:#12abdb1a;color:#12abdb}.notification .icon__container__close:active{background:#12abdb33;color:#12abdb}.success{border:1px solid #00A76F;color:#00a76f}.success .icon__container__close{color:#00a76f}.success .icon__container__close:hover{background:#00a76f1a;color:#00a76f}.success .icon__container__close:active{background:#00a76f33;color:#00a76f}.icon__container{display:flex;align-items:flex-start;flex-shrink:0;margin-top:.125rem;padding:.125rem;border-radius:.25rem}.icon__container__close{display:flex;align-items:center;justify-content:center;width:1.5rem;height:3rem;border:none;border-radius:.25rem;background:transparent;padding:0;margin-left:auto}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: DcxNgIconComponent, selector: "dcx-ng-icon", inputs: ["size", "spacing", "color", "name"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-message', standalone: true, imports: [CommonModule, DcxNgIconComponent], template: "<div\r\n  [ngClass]=\"['message__container', messageData().role]\"\r\n  [attr.aria-role]=\"messageData().role\"\r\n>\r\n  @if (icon()) {\r\n    <dcx-ng-icon\r\n      class=\"icon__container\"\r\n      [name]=\"messageData().icon || 'info'\"\r\n      size=\"m\"\r\n      color=\"inherit\"\r\n    ></dcx-ng-icon>\r\n  }\r\n\r\n  <div class=\"message__container__body\">\r\n    @if (title()) {\r\n      <h3 class=\"message__container__title\">{{ title() }}</h3>\r\n    }\r\n\r\n    <p class=\"message__container__paragraph\">{{ body() }}</p>\r\n\r\n    @if (link()) {\r\n      <a [href]=\"link()\" class=\"message__container__link\">{{link()}}</a>\r\n    }\r\n  </div>\r\n\r\n  @if (showClose()) {\r\n    <button class=\"icon__container__close\" type=\"button\">\r\n      <dcx-ng-icon name=\"close\" size=\"m\" color=\"inherit\"></dcx-ng-icon>\r\n    </button>\r\n  }\r\n</div>\r\n", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}.message__container__link{text-decoration:underline;font-size:.7rem}.message__container{border-radius:.25rem;padding:.5rem;display:flex;gap:.5rem;align-items:flex-start}.message__container__title{font-weight:600;margin:0 0 .25rem;font-size:.875rem}.message__container__paragraph{margin:0;font-size:.875rem;line-height:1.4}.message__container__body{flex:1}.error{border:1px solid #EF4444;color:#ef4444}.error .icon__container__close{color:#ef4444}.error .icon__container__close:hover{background:#ef44441a;color:#ef4444}.error .icon__container__close:active{background:#ef444433;color:#ef4444}.warning{border:1px solid #FFA726;color:#ffa726}.warning .icon__container__close{color:#ffa726}.warning .icon__container__close:hover{background:#ffa7261a;color:#ffa726}.warning .icon__container__close:active{background:#ffa72633;color:#ffa726}.notification{border:1px solid #12ABDB;color:#12abdb}.notification .icon__container__close{color:#12abdb}.notification .icon__container__close:hover{background:#12abdb1a;color:#12abdb}.notification .icon__container__close:active{background:#12abdb33;color:#12abdb}.success{border:1px solid #00A76F;color:#00a76f}.success .icon__container__close{color:#00a76f}.success .icon__container__close:hover{background:#00a76f1a;color:#00a76f}.success .icon__container__close:active{background:#00a76f33;color:#00a76f}.icon__container{display:flex;align-items:flex-start;flex-shrink:0;margin-top:.125rem;padding:.125rem;border-radius:.25rem}.icon__container__close{display:flex;align-items:center;justify-content:center;width:1.5rem;height:3rem;border:none;border-radius:.25rem;background:transparent;padding:0;margin-left:auto}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"] }]
        }] });

class DcxNgSelectComponent {
    options = [];
    placeholder = '';
    /** Texto visible encima del select */
    label = '';
    /** Nombre accesible (solo si NO hay label visible) */
    ariaLabel = '';
    /** id único para asociar <label for> con <select id> */
    selectId = `dcx-select-${Math.random().toString(36).slice(2)}`;
    disabled = false;
    value = null;
    onChange = () => { };
    onTouched = () => { };
    writeValue(value) {
        this.value = value ?? null;
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    handleChange(event) {
        const select = event.target;
        const raw = select.value;
        const newValue = raw ?? null;
        this.value = newValue;
        this.onChange(this.value);
    }
    handleBlur() {
        this.onTouched();
    }
    trackByValue(_index, option) {
        return option.value;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgSelectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgSelectComponent, isStandalone: true, selector: "dcx-ng-select", inputs: { options: "options", placeholder: "placeholder", label: "label", ariaLabel: "ariaLabel" }, host: { properties: { "attr.disabled": "disabled ? \"\" : null" } }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DcxNgSelectComponent),
                multi: true,
            },
        ], ngImport: i0, template: "@if (label) {\r\n  <label class=\"dcx-ng-select__label\" [attr.for]=\"selectId\">\r\n    {{ label }}\r\n  </label>\r\n}\r\n\r\n<div class=\"dcx-ng-select__wrapper\" [class.is-disabled]=\"disabled\">\r\n  <select\r\n    [id]=\"selectId\"\r\n    class=\"dcx-ng-select\"\r\n    [disabled]=\"disabled\"\r\n    (change)=\"handleChange($event)\"\r\n    (blur)=\"handleBlur()\"\r\n    [attr.aria-label]=\"ariaLabel || null\"\r\n  >\r\n    @if (placeholder) {\r\n      <option value=\"\" disabled hidden [selected]=\"value === null\">\r\n        {{ placeholder }}\r\n      </option>\r\n    }\r\n\r\n    @for (option of options; track option.value) {\r\n      <option [value]=\"option.value\" [selected]=\"option.value === value\">\r\n        {{ option.label }}\r\n      </option>\r\n    }\r\n  </select>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";:host{display:inline-block;width:100%;color:var(--color-text-primary)}.dcx-ng-select__label{display:inline-block;margin-bottom:var(--spacing-inset-xs, 4px)}.dcx-ng-select__wrapper{position:relative}.dcx-ng-select{width:100%;padding:var(--spacing-inset-m);padding-right:calc(var(--spacing-inset-m) * 2 + 20px);font-family:var(--font-family-base);font-size:var(--font-size-base);color:var(--color-text-primary);background-color:var(--color-background);border:1px solid var(--color-border);border-radius:4px;cursor:pointer;appearance:none;-webkit-appearance:none;-moz-appearance:none;background-repeat:no-repeat;background-position:right 12px center;background-size:12px}.dcx-ng-select:hover:not(:disabled){border-color:var(--color-primary)}.dcx-ng-select:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 2px var(--color-primary-light)}.dcx-ng-select:disabled{opacity:.5;cursor:not-allowed;background-color:var(--color-gray-lighter);color:var(--color-text-disabled)}.dcx-ng-select__wrapper:after{content:\"\";pointer-events:none;position:absolute;top:50%;right:16px;transform:translateY(-50%);width:15px;height:15px;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\");background-repeat:no-repeat;background-size:25px 25px;background-position:center center;opacity:.95}.dcx-ng-select__wrapper.is-disabled:after{opacity:.5;filter:grayscale(100%)}:host(.theme-dark) .dcx-ng-select__wrapper:after{background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")}\n"], dependencies: [{ kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-select', standalone: true, imports: [ReactiveFormsModule, CommonModule], providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => DcxNgSelectComponent),
                            multi: true,
                        },
                    ], host: {
                        '[attr.disabled]': 'disabled ? "" : null',
                    }, template: "@if (label) {\r\n  <label class=\"dcx-ng-select__label\" [attr.for]=\"selectId\">\r\n    {{ label }}\r\n  </label>\r\n}\r\n\r\n<div class=\"dcx-ng-select__wrapper\" [class.is-disabled]=\"disabled\">\r\n  <select\r\n    [id]=\"selectId\"\r\n    class=\"dcx-ng-select\"\r\n    [disabled]=\"disabled\"\r\n    (change)=\"handleChange($event)\"\r\n    (blur)=\"handleBlur()\"\r\n    [attr.aria-label]=\"ariaLabel || null\"\r\n  >\r\n    @if (placeholder) {\r\n      <option value=\"\" disabled hidden [selected]=\"value === null\">\r\n        {{ placeholder }}\r\n      </option>\r\n    }\r\n\r\n    @for (option of options; track option.value) {\r\n      <option [value]=\"option.value\" [selected]=\"option.value === value\">\r\n        {{ option.label }}\r\n      </option>\r\n    }\r\n  </select>\r\n</div>\r\n", styles: ["@charset \"UTF-8\";:host{display:inline-block;width:100%;color:var(--color-text-primary)}.dcx-ng-select__label{display:inline-block;margin-bottom:var(--spacing-inset-xs, 4px)}.dcx-ng-select__wrapper{position:relative}.dcx-ng-select{width:100%;padding:var(--spacing-inset-m);padding-right:calc(var(--spacing-inset-m) * 2 + 20px);font-family:var(--font-family-base);font-size:var(--font-size-base);color:var(--color-text-primary);background-color:var(--color-background);border:1px solid var(--color-border);border-radius:4px;cursor:pointer;appearance:none;-webkit-appearance:none;-moz-appearance:none;background-repeat:no-repeat;background-position:right 12px center;background-size:12px}.dcx-ng-select:hover:not(:disabled){border-color:var(--color-primary)}.dcx-ng-select:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 2px var(--color-primary-light)}.dcx-ng-select:disabled{opacity:.5;cursor:not-allowed;background-color:var(--color-gray-lighter);color:var(--color-text-disabled)}.dcx-ng-select__wrapper:after{content:\"\";pointer-events:none;position:absolute;top:50%;right:16px;transform:translateY(-50%);width:15px;height:15px;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\");background-repeat:no-repeat;background-size:25px 25px;background-position:center center;opacity:.95}.dcx-ng-select__wrapper.is-disabled:after{opacity:.5;filter:grayscale(100%)}:host(.theme-dark) .dcx-ng-select__wrapper:after{background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")}\n"] }]
        }], propDecorators: { options: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], label: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }] } });

class DcxNgSpinnerComponent {
    size = 'm';
    wrapper = false;
    delay = 100;
    label = null;
    isVisible = false;
    ngOnInit() {
        setTimeout(() => (this.isVisible = true), this.delay);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgSpinnerComponent, isStandalone: true, selector: "dcx-ng-spinner", inputs: { size: "size", wrapper: "wrapper", delay: "delay", label: "label" }, ngImport: i0, template: "@if (isVisible) {\r\n  <div\r\n    class=\"dcx-ng-spinner dcx-ng-spinner--{{ size }}\"\r\n    [class.dcx-ng-spinner--wrapper]=\"wrapper\"\r\n    role=\"status\"\r\n    [attr.aria-label]=\"label || 'loading'\"\r\n  >\r\n    <!-- Spinner standalone -->\r\n    @if (!wrapper) {\r\n      <div class=\"dcx-ng-spinner__circle\"></div>\r\n      @if (label) {\r\n        <span class=\"dcx-ng-spinner__label\">\r\n          {{ label }}\r\n        </span>\r\n      }\r\n    }\r\n\r\n    <!-- Spinner as overlay on projected content -->\r\n    @if (wrapper) {\r\n      <ng-content></ng-content>\r\n      <div class=\"dcx-ng-spinner__overlay\">\r\n        <div class=\"dcx-ng-spinner__circle\"></div>\r\n        @if (label) {\r\n          <span class=\"dcx-ng-spinner__label\">\r\n            {{ label }}\r\n          </span>\r\n        }\r\n      </div>\r\n    }\r\n  </div>\r\n}\r\n", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}.dcx-ng-spinner{display:inline-flex;align-items:center}.dcx-ng-spinner--xs{font-size:var(--spacing-xs)}.dcx-ng-spinner--s{font-size:var(--spacing-s)}.dcx-ng-spinner--m{font-size:var(--spacing-m)}.dcx-ng-spinner--l{font-size:var(--spacing-l)}.dcx-ng-spinner--xl{font-size:var(--spacing-xl)}.dcx-ng-spinner__circle{width:1em;height:1em;border:.2em solid var(--color-primary);border-top-color:var(--color-accent);border-radius:50%;animation:spin .6s linear infinite}.dcx-ng-spinner__label{margin-left:.5em;font-size:1em}@keyframes spin{to{transform:rotate(360deg)}}.dcx-ng-spinner--wrapper{position:relative;display:block}.dcx-ng-spinner--wrapper .dcx-ng-spinner__overlay{position:absolute;inset:0;background-color:var(--color-gray-lighter);opacity:.9;display:flex;align-items:center;justify-content:center}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-spinner', standalone: true, imports: [CommonModule], template: "@if (isVisible) {\r\n  <div\r\n    class=\"dcx-ng-spinner dcx-ng-spinner--{{ size }}\"\r\n    [class.dcx-ng-spinner--wrapper]=\"wrapper\"\r\n    role=\"status\"\r\n    [attr.aria-label]=\"label || 'loading'\"\r\n  >\r\n    <!-- Spinner standalone -->\r\n    @if (!wrapper) {\r\n      <div class=\"dcx-ng-spinner__circle\"></div>\r\n      @if (label) {\r\n        <span class=\"dcx-ng-spinner__label\">\r\n          {{ label }}\r\n        </span>\r\n      }\r\n    }\r\n\r\n    <!-- Spinner as overlay on projected content -->\r\n    @if (wrapper) {\r\n      <ng-content></ng-content>\r\n      <div class=\"dcx-ng-spinner__overlay\">\r\n        <div class=\"dcx-ng-spinner__circle\"></div>\r\n        @if (label) {\r\n          <span class=\"dcx-ng-spinner__label\">\r\n            {{ label }}\r\n          </span>\r\n        }\r\n      </div>\r\n    }\r\n  </div>\r\n}\r\n", styles: [":root{--font-family-primary: \"Source Sans Pro\", sans-serif;--font-family-secondary: \"Open Sans\", sans-serif;--font-family-system: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;--font-family-monospace: \"Source Code Pro\", monospace;--font-weight-light: 300;--font-weight-regular: 400;--font-weight-medium: 500;--font-weight-semibold: 600;--font-weight-bold: 700;--font-size-h1: 2.5rem;--font-size-h2: 2rem;--font-size-h3: 1.75rem;--font-size-h4: 1.5rem;--font-size-h5: 1.25rem;--font-size-h6: 1.125rem;--font-size-body-large: 1.125rem;--font-size-body: 1rem;--font-size-body-small: .875rem;--font-size-caption: .75rem;--font-size-overline: .625rem;--line-height-tight: 1.2;--line-height-normal: 1.5;--line-height-relaxed: 1.75;--letter-spacing-tight: -.025em;--letter-spacing-normal: 0;--letter-spacing-wide: .025em;--letter-spacing-wider: .05em;--color-primary: #0070AD;--color-secondary: #2B0A3D;--color-accent: #12ABDB;--color-primary-light: #0088D1;--color-primary-dark: #005A8C;--color-gray-dark: #1A1A1A;--color-gray: #666666;--color-gray-light: #CCCCCC;--color-gray-lighter: #F2F2F2;--color-success: #00A76F;--color-warning: #FFA726;--color-error: #EF4444;--color-info: #12ABDB;--color-background: #FFFFFF;--color-background-alt: #F8F9FA;--color-surface: #FFFFFF;--color-text-primary: #1A1A1A;--color-text-secondary: #666666;--color-text-disabled: #999999;--color-text-inverse: #FFFFFF;--color-border: #E5E7EB;--color-border-light: #F3F4F6;--spacing-base: .25rem;--spacing-xs: .5rem;--spacing-s: 1rem;--spacing-m: 1.5rem;--spacing-l: 2rem;--spacing-xl: 3rem;--spacing-section-xs: 1.5rem;--spacing-section-s: 2rem;--spacing-section-m: 3rem;--spacing-section-l: 4rem;--spacing-section-xl: 6rem;--spacing-inset-xs: .5rem;--spacing-inset-s: .75rem;--spacing-inset-m: 1rem;--spacing-inset-l: 1.5rem;--spacing-inset-xl: 2rem;--spacing-stack-xs: .25rem;--spacing-stack-s: .5rem;--spacing-stack-m: 1rem;--spacing-stack-l: 1.5rem;--spacing-stack-xl: 2rem;--spacing-inline-xs: .25rem;--spacing-inline-s: .5rem;--spacing-inline-m: .75rem;--spacing-inline-l: 1rem;--spacing-inline-xl: 1.5rem;--font-family-base: var(--font-family-primary);--font-size-base: var(--font-size-body);--font-weight-base: var(--font-weight-regular);--line-height-base: var(--line-height-normal);--color-base: var(--color-text-primary);--color-background-base: var(--color-background);--spacing-base: var(--spacing-base);--border-radius-sm: 4px;--border-radius-md: 8px;--border-radius-lg: 12px;--border-radius-full: 9999px;--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, .05);--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06);--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);--transition-fast: .15s;--transition-normal: .25s;--transition-slow: .35s;--transition-timing: cubic-bezier(.4, 0, .2, 1);--z-index-dropdown: 1000;--z-index-sticky: 1020;--z-index-fixed: 1030;--z-index-modal-backdrop: 1040;--z-index-modal: 1050;--z-index-popover: 1060;--z-index-tooltip: 1070}html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:before,blockquote:after,q:before,q:after{content:\"\";content:none}table{border-collapse:collapse;border-spacing:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}.dcx-ng-spinner{display:inline-flex;align-items:center}.dcx-ng-spinner--xs{font-size:var(--spacing-xs)}.dcx-ng-spinner--s{font-size:var(--spacing-s)}.dcx-ng-spinner--m{font-size:var(--spacing-m)}.dcx-ng-spinner--l{font-size:var(--spacing-l)}.dcx-ng-spinner--xl{font-size:var(--spacing-xl)}.dcx-ng-spinner__circle{width:1em;height:1em;border:.2em solid var(--color-primary);border-top-color:var(--color-accent);border-radius:50%;animation:spin .6s linear infinite}.dcx-ng-spinner__label{margin-left:.5em;font-size:1em}@keyframes spin{to{transform:rotate(360deg)}}.dcx-ng-spinner--wrapper{position:relative;display:block}.dcx-ng-spinner--wrapper .dcx-ng-spinner__overlay{position:absolute;inset:0;background-color:var(--color-gray-lighter);opacity:.9;display:flex;align-items:center;justify-content:center}\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n"] }]
        }], propDecorators: { size: [{
                type: Input
            }], wrapper: [{
                type: Input
            }], delay: [{
                type: Input
            }], label: [{
                type: Input
            }] } });

// eslint-disable-next-line @nx/enforce-module-boundaries
var SortType;
(function (SortType) {
    SortType["Ascending"] = "ascending";
    SortType["Descending"] = "descending";
    SortType["None"] = "none";
})(SortType || (SortType = {}));
class DcxNgTableComponent {
    headers;
    rows;
    showGrid = false;
    showStripped = false;
    scroll = false;
    scrollHeight = '320px';
    headerTemplate;
    cellTemplate;
    menuCellTemplate;
    sortChange = new EventEmitter();
    sort = signal({ key: null, dir: null });
    ngOnInit() {
        this.ensureRowIds();
    }
    sortedRows() {
        const _rows = [...this.rows];
        const { key, dir } = this.sort();
        if (!key || !dir)
            return _rows;
        const header = this.headers.find(h => h.key === key);
        const type = header?.type ?? this.inferType(_rows, key);
        _rows.sort((a, b) => this.compare(a?.[key], b?.[key], type));
        if (dir === 'desc')
            _rows.reverse();
        return _rows;
    }
    onHeaderClick(header) {
        if (!header.sortable)
            return;
        let nextDirection;
        if (this.sort().key !== header.key) {
            nextDirection = 'asc';
        }
        else {
            switch (this.sort().dir) {
                case 'asc':
                    nextDirection = 'desc';
                    break;
                case 'desc':
                    nextDirection = null;
                    break;
                default:
                    nextDirection = 'asc';
            }
        }
        this.sort.set({ key: header.key ?? null, dir: nextDirection });
        this.sortChange.emit(this.sort());
    }
    ariaSort(header) {
        const currentSort = this.sort();
        if (currentSort.key !== header.key || !currentSort.dir)
            return SortType.None;
        return currentSort.dir === 'asc' ? SortType.Ascending : SortType.Descending;
    }
    ensureRowIds() {
        this.rows.forEach((row, index) => {
            if (row.id === undefined || row.id === null) {
                row.id = index;
            }
        });
    }
    inferType(rows, key) {
        const first = rows.find(r => r?.[key] !== null && r?.[key] !== undefined)?.[key];
        return typeof first === 'number' ? 'number' : 'string';
    }
    compare(leftValue, rightValue, valueType) {
        const leftIsNull = leftValue === null || leftValue === undefined;
        const rightIsNull = rightValue === null || rightValue === undefined;
        if (leftIsNull && rightIsNull)
            return 0;
        if (leftIsNull)
            return 1;
        if (rightIsNull)
            return -1;
        if (valueType === 'number') {
            const leftNumber = Number(leftValue);
            const rightNumber = Number(rightValue);
            const leftIsNaN = Number.isNaN(leftNumber);
            const rightIsNaN = Number.isNaN(rightNumber);
            if (leftIsNaN && rightIsNaN)
                return 0;
            if (leftIsNaN)
                return 1;
            if (rightIsNaN)
                return -1;
            if (leftNumber === rightNumber)
                return 0;
            return leftNumber < rightNumber ? -1 : 1;
        }
        const leftText = String(leftValue);
        const rightText = String(rightValue);
        return leftText.localeCompare(rightText, undefined, {
            sensitivity: 'base',
            numeric: true,
        });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.14", type: DcxNgTableComponent, isStandalone: true, selector: "dcx-ng-table", inputs: { headers: "headers", rows: "rows", showGrid: "showGrid", showStripped: "showStripped", scroll: "scroll", scrollHeight: "scrollHeight", headerTemplate: "headerTemplate", cellTemplate: "cellTemplate", menuCellTemplate: "menuCellTemplate" }, outputs: { sortChange: "sortChange" }, ngImport: i0, template: "<div\r\n  class=\"table-wrapper\"\r\n  [class.scroll]=\"scroll\"\r\n  [style.max-height]=\"scroll ? scrollHeight : null\"\r\n>\r\n  <table [class.grid]=\"showGrid\" [class.striped]=\"showStripped\">\r\n    <thead>\r\n      <tr>\r\n        @for (header of headers; track header.key) {\r\n          <th\r\n            scope=\"col\"\r\n            (click)=\"onHeaderClick(header)\"\r\n            (keydown.enter)=\"onHeaderClick(header)\"\r\n            (keydown.space)=\"onHeaderClick(header); $event.preventDefault()\"\r\n            [class.sortable]=\"header.sortable\"\r\n            [attr.aria-sort]=\"ariaSort(header)\"\r\n            [attr.tabindex]=\"header.sortable ? 0 : null\"\r\n          >\r\n            <ng-container\r\n              *ngTemplateOutlet=\"headerTemplate || defaultHeaderTpl; context: { $implicit: header }\"\r\n            ></ng-container>\r\n          </th>\r\n        }\r\n\r\n        <th class=\"menu-col\" scope=\"col\"></th>\r\n      </tr>\r\n    </thead>\r\n\r\n    <tbody>\r\n      @if (sortedRows().length === 0) {\r\n        <tr>\r\n          <td [attr.colspan]=\"headers.length + 1\" class=\"empty-cell\">\r\n            No hay datos\r\n          </td>\r\n        </tr>\r\n      } @else {\r\n        @for (row of sortedRows(); track row.id) {\r\n          <tr class=\"table-row\">\r\n            @for (header of headers; track header.key) {\r\n              <td>\r\n                <ng-container\r\n                  *ngTemplateOutlet=\"cellTemplate || defaultCellTpl; context: { $implicit: row, key: header.key }\"\r\n                ></ng-container>\r\n              </td>\r\n            }\r\n            <td class=\"menu-col\">\r\n              <ng-container\r\n                *ngTemplateOutlet=\"menuCellTemplate || defaultMenuCellTpl; context: { $implicit: row, index: $index }\"\r\n              ></ng-container>\r\n            </td>\r\n          </tr>\r\n        }\r\n      }\r\n    </tbody>\r\n  </table>\r\n</div>\r\n\r\n<ng-template #defaultHeaderTpl let-header>\r\n  <strong>{{ header.name }}</strong>\r\n  @if (header.sortable) {\r\n    <span class=\"sort-indicator\" aria-hidden=\"true\">\r\n      @if (ariaSort(header) === 'ascending') {\r\n        \u25B2\r\n      } @else if (ariaSort(header) === 'descending') {\r\n        \u25BC\r\n      } @else {\r\n        \u2195\r\n      }\r\n    </span>\r\n  }\r\n</ng-template>\r\n\r\n<ng-template #defaultCellTpl let-row let-key=\"key\">\r\n  {{ row?.[key] }}\r\n</ng-template>\r\n\r\n<ng-template #defaultMenuCellTpl>\r\n  <button\r\n    type=\"button\"\r\n    class=\"btn icon\"\r\n    title=\"Context menu (TODO)\"\r\n    disabled\r\n    aria-disabled=\"true\"\r\n  >\r\n    \u22EE\r\n  </button>\r\n</ng-template>\r\n", styles: [".table-wrapper{width:100%;overflow:hidden}.table-wrapper.scroll{overflow:auto}table{width:100%;border-collapse:collapse}table.grid td,table.grid th{border:1px solid var(--table-border, #e3e3e3)}table.striped tbody tr:nth-child(odd){background:var(--table-striped, #fafafa)}thead th{position:sticky;top:0;z-index:1;background:var(--surface, #fff);text-align:left;padding:.5rem .75rem;font-weight:700;line-height:1.2;border-bottom:2px solid var(--table-divider, #e3e3e3)}thead th.sortable{cursor:pointer}tbody td{padding:.5rem .75rem;vertical-align:top}.table-row:hover{background:var(--table-row-hover, #f6f6f6)}.menu-col{white-space:nowrap;text-align:right;width:.1%}.sort-indicator{margin-left:.375rem;opacity:.7}.btn.icon{background:none;border:none;color:#555;cursor:not-allowed;padding:0 .25rem;font:inherit}.empty-cell{text-align:center;color:#777;padding:1rem}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: DcxNgTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'dcx-ng-table', standalone: true, imports: [CommonModule], template: "<div\r\n  class=\"table-wrapper\"\r\n  [class.scroll]=\"scroll\"\r\n  [style.max-height]=\"scroll ? scrollHeight : null\"\r\n>\r\n  <table [class.grid]=\"showGrid\" [class.striped]=\"showStripped\">\r\n    <thead>\r\n      <tr>\r\n        @for (header of headers; track header.key) {\r\n          <th\r\n            scope=\"col\"\r\n            (click)=\"onHeaderClick(header)\"\r\n            (keydown.enter)=\"onHeaderClick(header)\"\r\n            (keydown.space)=\"onHeaderClick(header); $event.preventDefault()\"\r\n            [class.sortable]=\"header.sortable\"\r\n            [attr.aria-sort]=\"ariaSort(header)\"\r\n            [attr.tabindex]=\"header.sortable ? 0 : null\"\r\n          >\r\n            <ng-container\r\n              *ngTemplateOutlet=\"headerTemplate || defaultHeaderTpl; context: { $implicit: header }\"\r\n            ></ng-container>\r\n          </th>\r\n        }\r\n\r\n        <th class=\"menu-col\" scope=\"col\"></th>\r\n      </tr>\r\n    </thead>\r\n\r\n    <tbody>\r\n      @if (sortedRows().length === 0) {\r\n        <tr>\r\n          <td [attr.colspan]=\"headers.length + 1\" class=\"empty-cell\">\r\n            No hay datos\r\n          </td>\r\n        </tr>\r\n      } @else {\r\n        @for (row of sortedRows(); track row.id) {\r\n          <tr class=\"table-row\">\r\n            @for (header of headers; track header.key) {\r\n              <td>\r\n                <ng-container\r\n                  *ngTemplateOutlet=\"cellTemplate || defaultCellTpl; context: { $implicit: row, key: header.key }\"\r\n                ></ng-container>\r\n              </td>\r\n            }\r\n            <td class=\"menu-col\">\r\n              <ng-container\r\n                *ngTemplateOutlet=\"menuCellTemplate || defaultMenuCellTpl; context: { $implicit: row, index: $index }\"\r\n              ></ng-container>\r\n            </td>\r\n          </tr>\r\n        }\r\n      }\r\n    </tbody>\r\n  </table>\r\n</div>\r\n\r\n<ng-template #defaultHeaderTpl let-header>\r\n  <strong>{{ header.name }}</strong>\r\n  @if (header.sortable) {\r\n    <span class=\"sort-indicator\" aria-hidden=\"true\">\r\n      @if (ariaSort(header) === 'ascending') {\r\n        \u25B2\r\n      } @else if (ariaSort(header) === 'descending') {\r\n        \u25BC\r\n      } @else {\r\n        \u2195\r\n      }\r\n    </span>\r\n  }\r\n</ng-template>\r\n\r\n<ng-template #defaultCellTpl let-row let-key=\"key\">\r\n  {{ row?.[key] }}\r\n</ng-template>\r\n\r\n<ng-template #defaultMenuCellTpl>\r\n  <button\r\n    type=\"button\"\r\n    class=\"btn icon\"\r\n    title=\"Context menu (TODO)\"\r\n    disabled\r\n    aria-disabled=\"true\"\r\n  >\r\n    \u22EE\r\n  </button>\r\n</ng-template>\r\n", styles: [".table-wrapper{width:100%;overflow:hidden}.table-wrapper.scroll{overflow:auto}table{width:100%;border-collapse:collapse}table.grid td,table.grid th{border:1px solid var(--table-border, #e3e3e3)}table.striped tbody tr:nth-child(odd){background:var(--table-striped, #fafafa)}thead th{position:sticky;top:0;z-index:1;background:var(--surface, #fff);text-align:left;padding:.5rem .75rem;font-weight:700;line-height:1.2;border-bottom:2px solid var(--table-divider, #e3e3e3)}thead th.sortable{cursor:pointer}tbody td{padding:.5rem .75rem;vertical-align:top}.table-row:hover{background:var(--table-row-hover, #f6f6f6)}.menu-col{white-space:nowrap;text-align:right;width:.1%}.sort-indicator{margin-left:.375rem;opacity:.7}.btn.icon{background:none;border:none;color:#555;cursor:not-allowed;padding:0 .25rem;font:inherit}.empty-cell{text-align:center;color:#777;padding:1rem}\n"] }]
        }], propDecorators: { headers: [{
                type: Input,
                args: [{ required: true }]
            }], rows: [{
                type: Input,
                args: [{ required: true }]
            }], showGrid: [{
                type: Input
            }], showStripped: [{
                type: Input
            }], scroll: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], cellTemplate: [{
                type: Input
            }], menuCellTemplate: [{
                type: Input
            }], sortChange: [{
                type: Output
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { DcxNgButtonComponent, DcxNgCardComponent, DcxNgChipComponent, DcxNgDividerComponent, DcxNgIconComponent, DcxNgInputComponent, DcxNgMessageComponent, DcxNgRadioComponent, DcxNgSelectComponent, DcxNgSpinnerComponent, DcxNgTableComponent, DcxNgToggleComponent, DcxNgTooltipComponent, ICON_POSITION, InputSize, InputType, SortType, ThemeColors, TogglePosition, TooltipPosition };
//# sourceMappingURL=dcx-ng-components-source.mjs.map

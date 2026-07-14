import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgIconFieldComponent } from './dcx-ng-iconField.component';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';

describe('DcxNgIconFieldComponent', () => {
  let component: DcxNgIconFieldComponent;
  let fixture: ComponentFixture<DcxNgIconFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgIconFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgIconFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default Values', () => {
    it('should have default iconName as "search"', () => {
      expect(component.iconName()).toBe('search');
    });

    it('should have default iconPosition as "left"', () => {
      expect(component.iconPosition()).toBe('left');
    });

    it('should have default iconSize as "m"', () => {
      expect(component.iconSize()).toBe('m');
    });

    it('should have iconClickable false by default', () => {
      expect(component.iconClickable()).toBe(false);
    });

    it('should have disabled false by default', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should have iconAriaLabel null by default', () => {
      expect(component.iconAriaLabel()).toBeNull();
    });
  });

  describe('iconClick output', () => {
    it('should emit iconClick when onIconClick is called', () => {
      const spy = jest.fn();
      component.iconClick.subscribe(spy);
      component.onIconClick();
      expect(spy).toHaveBeenCalled();
    });

    it('should not emit iconClick when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const spy = jest.fn();
      component.iconClick.subscribe(spy);
      component.onIconClick();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('Template rendering', () => {
    it('should render the icon-field wrapper', () => {
      const wrapper = fixture.debugElement.query(By.css('.icon-field'));
      expect(wrapper).toBeTruthy();
    });

    it('should render a decorative dcx-ng-icon by default (not a button)', () => {
      const icon = fixture.debugElement.query(By.css('dcx-ng-icon'));
      const button = fixture.debugElement.query(By.css('dcx-ng-button'));
      expect(icon).toBeTruthy();
      expect(button).toBeFalsy();
    });

    it('should apply has-left class only when position is left', () => {
      const wrapper = fixture.debugElement.query(By.css('.icon-field'));
      expect(wrapper.nativeElement.classList.contains('has-left')).toBe(true);
      expect(wrapper.nativeElement.classList.contains('has-right')).toBe(
        false,
      );
    });

    it('should apply has-right class only when position is right', () => {
      fixture.componentRef.setInput('iconPosition', 'right');
      fixture.detectChanges();
      const wrapper = fixture.debugElement.query(By.css('.icon-field'));
      expect(wrapper.nativeElement.classList.contains('has-right')).toBe(
        true,
      );
      expect(wrapper.nativeElement.classList.contains('has-left')).toBe(
        false,
      );
    });

    it('should render dcx-ng-button when iconClickable is true', () => {
      fixture.componentRef.setInput('iconClickable', true);
      fixture.componentRef.setInput('iconAriaLabel', 'Buscar');
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('dcx-ng-button'));
      const directIcon = fixture.debugElement.query(
        By.css('.icon-field > dcx-ng-icon'),
      );
      expect(button).toBeTruthy();
      expect(directIcon).toBeFalsy();
    });

    it('should set aria-label on the button from iconAriaLabel', () => {
      fixture.componentRef.setInput('iconClickable', true);
      fixture.componentRef.setInput('iconAriaLabel', 'Buscar');
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('dcx-ng-button'));
      expect(button.componentInstance.ariaLabel()).toBe('Buscar');
    });

    it('should render icon on the right when position is right', () => {
      fixture.componentRef.setInput('iconPosition', 'right');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('dcx-ng-icon'));
      expect(icon).toBeTruthy();
    });

    it('should not render an icon when iconName is empty', () => {
      fixture.componentRef.setInput('iconName', '');
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('dcx-ng-icon'));
      const button = fixture.debugElement.query(By.css('dcx-ng-button'));
      expect(icon).toBeFalsy();
      expect(button).toBeFalsy();
    });

    it('should disable the button when disabled and iconClickable are true', () => {
      fixture.componentRef.setInput('iconClickable', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('dcx-ng-button'));
      expect(button.componentInstance.disabled()).toBe(true);
    });
  });

  describe('Input properties', () => {
    it('should update iconName', () => {
      fixture.componentRef.setInput('iconName', 'star');
      fixture.detectChanges();
      expect(component.iconName()).toBe('star');
    });

    it('should update iconSize', () => {
      const sizes: ('s' | 'm' | 'l' | 'xl')[] = ['s', 'm', 'l', 'xl'];
      sizes.forEach(size => {
        fixture.componentRef.setInput('iconSize', size);
        fixture.detectChanges();
        expect(component.iconSize()).toBe(size);
      });
    });

    it('should update iconPosition', () => {
      fixture.componentRef.setInput('iconPosition', 'right');
      fixture.detectChanges();
      expect(component.iconPosition()).toBe('right');
    });
  });
});

@Component({
  standalone: true,
  imports: [DcxNgIconFieldComponent, DcxNgInputComponent],
  template: `
    <dcx-ng-icon-field>
      <dcx-ng-input [isInvalid]="invalid" label="Email"></dcx-ng-input>
    </dcx-ng-icon-field>
  `,
})
class TestHostComponent {
  invalid = false;
}

describe('DcxNgIconFieldComponent - projected invalid input', () => {
  it('should reflect the invalid state of the projected input on the container', async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestHostComponent);
    const host = fixture.componentInstance;
    host.invalid = true;
    fixture.detectChanges();

    const control = fixture.nativeElement.querySelector(
      '.dcx-ng-input__control',
    );
    expect(control.classList.contains('is-invalid')).toBe(true);
  });
});

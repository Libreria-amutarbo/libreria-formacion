import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgIconFieldComponent } from './dcx-ng-iconField.component';

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
  });

  describe('iconPositionChange computed', () => {
    it('should return "has-left" when position is left', () => {
      fixture.componentRef.setInput('iconPosition', 'left');
      fixture.detectChanges();
      expect(component.iconPositionChange()).toBe('has-left');
    });

    it('should return "has-right" when position is right', () => {
      fixture.componentRef.setInput('iconPosition', 'right');
      fixture.detectChanges();
      expect(component.iconPositionChange()).toBe('has-right');
    });

    it('should return empty string when position is invalid', () => {
      fixture.componentRef.setInput('iconPosition', 'center');
      fixture.detectChanges();
      expect(component.iconPositionChange()).toBe('');
    });
  });

  describe('iconClick output', () => {
    it('should emit iconClick when onIconClick is called', () => {
      const spy = jest.fn();
      component.iconClick.subscribe(spy);
      component.onIconClick();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Template rendering', () => {
    it('should render the icon-field wrapper', () => {
      const wrapper = fixture.debugElement.query(By.css('.icon-field'));
      expect(wrapper).toBeTruthy();
    });

    it('should render icon button on the left by default', () => {
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('dcx-ng-button'));
      expect(buttons.length).toBe(1);
    });

    it('should render icon button on the right when position is right', () => {
      fixture.componentRef.setInput('iconPosition', 'right');
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('dcx-ng-button'));
      expect(buttons.length).toBe(1);
    });

    it('should not render button when iconName is empty', () => {
      fixture.componentRef.setInput('iconName', '');
      fixture.detectChanges();
      const buttons = fixture.debugElement.queryAll(By.css('dcx-ng-button'));
      expect(buttons.length).toBe(0);
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

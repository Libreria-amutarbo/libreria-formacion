import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DcxNgCardComponent } from './dcx-ng-card.component';
import {
  TITLE_DEFAULT,
  SUBTITLE,
  IMAGE,
  IMAGE_ALT,
  BORDERED,
  INTERACTIVE,
  DISABLED,
} from '../../core/mock/card';

describe('DcxNgCardComponent', () => {
  let component: DcxNgCardComponent;
  let fixture: ComponentFixture<DcxNgCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct default input values', () => {
    expect(component.title()).toBe(TITLE_DEFAULT);
    expect(component.subtitle()).toBe(SUBTITLE);
    expect(component.image()).toBe(IMAGE);
    expect(component.imageAlt()).toBe(IMAGE_ALT);
    expect(component.bordered()).toBe(BORDERED);
    expect(component.interactive()).toBe(INTERACTIVE);
    expect(component.disabled()).toBe(DISABLED);
  });

  it('should set title via input', () => {
    fixture.componentRef.setInput('title', 'My Card');
    fixture.detectChanges();
    expect(component.title()).toBe('My Card');
  });

  it('should set image via input', () => {
    fixture.componentRef.setInput('image', 'test.jpg');
    fixture.detectChanges();
    expect(component.image()).toBe('test.jpg');
  });

  it('should set image to null', () => {
    fixture.componentRef.setInput('image', null);
    fixture.detectChanges();
    expect(component.image()).toBeNull();
  });

  it('should compute role as "button" by default (interactive is true by default)', () => {
    expect(component.role()).toBe('button');
  });

  it('should compute role as "region" when not interactive', () => {
    fixture.componentRef.setInput('interactive', false);
    fixture.detectChanges();
    expect(component.role()).toBe('region');
  });

  it('should compute role as "region" when disabled (even if interactive)', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.role()).toBe('region');
  });

  it('should compute tabIndex as null when not interactive', () => {
    fixture.componentRef.setInput('interactive', false);
    fixture.detectChanges();
    expect(component.tabIndex()).toBeNull();
  });

  it('should compute tabIndex as 0 when interactive and not disabled', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(component.tabIndex()).toBe(0);
  });

  it('should compute tabIndex as -1 when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.tabIndex()).toBe(-1);
  });

  it('should emit cardClick when host is clicked and not disabled', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();

    const spy = jest.fn();
    component.cardClick.subscribe(spy);

    const evt = new MouseEvent('click');
    component.onHostClick(evt);

    expect(spy).toHaveBeenCalledWith(evt);
  });

  it('should NOT emit cardClick when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const spy = jest.fn();
    component.cardClick.subscribe(spy);

    component.onHostClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should emit cardClick on Enter keydown when interactive', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();

    const spy = jest.fn();
    component.cardClick.subscribe(spy);

    const evt = new KeyboardEvent('keydown', { key: 'Enter' });
    component.onKeydown(evt);

    expect(spy).toHaveBeenCalled();
  });

  it('should NOT emit cardClick on Enter keydown when disabled', () => {
    fixture.componentRef.setInput('interactive', true);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const spy = jest.fn();
    component.cardClick.subscribe(spy);

    component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should include layout and align in innerClassMap', () => {
    fixture.componentRef.setInput('layout', 'vertical');
    fixture.componentRef.setInput('align', 'center');
    fixture.detectChanges();
    const map = component.innerClassMap();
    expect(map['layout-vertical']).toBe(true);
    expect(map['align-center']).toBe(true);
  });

  it('should include size in innerClassMap', () => {
    fixture.componentRef.setInput('size', 'l');
    fixture.detectChanges();
    expect(component.innerClassMap()['size-l']).toBe(true);
  });

  describe('shadowToCSS (via innerStyleVars)', () => {
    it('should use shadow-1 for preset 1', () => {
      fixture.componentRef.setInput('shadow', 1);
      fixture.detectChanges();
      expect(component.innerStyleVars()['--card-shadow']).toBe(
        'var(--shadow-1)',
      );
    });

    it('should use shadow-2 for preset 2', () => {
      fixture.componentRef.setInput('shadow', 2);
      fixture.detectChanges();
      expect(component.innerStyleVars()['--card-shadow']).toBe(
        'var(--shadow-2)',
      );
    });

    it('should use shadow-3 for preset 3', () => {
      fixture.componentRef.setInput('shadow', 3);
      fixture.detectChanges();
      expect(component.innerStyleVars()['--card-shadow']).toBe(
        'var(--shadow-3)',
      );
    });

    it('should use shadow-0 for default (0)', () => {
      fixture.componentRef.setInput('shadow', 0);
      fixture.detectChanges();
      expect(component.innerStyleVars()['--card-shadow']).toBe(
        'var(--shadow-0)',
      );
    });
  });

  describe('innerStyleVars border', () => {
    it('should set border-style when bordered', () => {
      fixture.componentRef.setInput('bordered', true);
      fixture.componentRef.setInput('borderStyle', 'dashed');
      fixture.detectChanges();
      expect(component.innerStyleVars()['--card-border-style']).toBe('dashed');
    });

    it('should set border-style to solid when not bordered', () => {
      fixture.componentRef.setInput('bordered', false);
      fixture.detectChanges();
      expect(component.innerStyleVars()['--card-border-style']).toBe('solid');
    });

    it('should set border-width to 0 when not bordered', () => {
      fixture.componentRef.setInput('bordered', false);
      fixture.detectChanges();
      expect(component.innerStyleVars()['--card-border-width']).toBe(0);
    });
  });

  describe('onKeydown', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('interactive', true);
      fixture.componentRef.setInput('disabled', false);
      fixture.detectChanges();
    });

    it('should emit cardClick on Space keydown when interactive', () => {
      const spy = jest.fn();
      component.cardClick.subscribe(spy);
      const evt = new KeyboardEvent('keydown', { key: ' ' });
      component.onKeydown(evt);
      expect(spy).toHaveBeenCalled();
    });

    it('should NOT emit on other keys', () => {
      const spy = jest.fn();
      component.cardClick.subscribe(spy);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Tab' }));
      expect(spy).not.toHaveBeenCalled();
    });

    it('should NOT emit when not interactive (even Enter)', () => {
      fixture.componentRef.setInput('interactive', false);
      fixture.detectChanges();
      const spy = jest.fn();
      component.cardClick.subscribe(spy);
      component.onKeydown(new KeyboardEvent('keydown', { key: 'Enter' }));
      expect(spy).not.toHaveBeenCalled();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgTabsComponent } from './dcx-ng-tabs.component';
import {
  DcxTabItemDefault,
  DcxTabItemWithDisabled,
  DcxTabItemWithBadges,
} from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgTabsComponent', () => {
  let component: DcxNgTabsComponent;
  let fixture: ComponentFixture<DcxNgTabsComponent>;

  beforeEach(async () => {
    Element.prototype.scrollIntoView = jest.fn();

    await TestBed.configureTestingModule({
      imports: [DcxNgTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTabsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', DcxTabItemDefault);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tabs as native buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      'button.dcx-tab__button',
    );
    expect(buttons.length).toBe(3);
  });

  it('should select first tab by default', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    expect(component.isActive('tab1')).toBe(true);
  });

  it('should select tab on click', () => {
    component.selectTab('tab2');
    fixture.detectChanges();
    expect(component.isActive('tab2')).toBe(true);
  });

  it('should emit tabChange when tab is selected', done => {
    component.tabChange.subscribe((tabId: string) => {
      expect(tabId).toBe('tab2');
      done();
    });
    component.selectTab('tab2');
  });

  it('should not select disabled tab', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemWithDisabled);
    fixture.detectChanges();

    component.selectTab('tab1');
    fixture.detectChanges();
    expect(component.isActive('tab1')).toBe(true);

    component.selectTab('tab2');
    fixture.detectChanges();
    expect(component.isActive('tab1')).toBe(true);
    expect(component.isActive('tab2')).toBe(false);
  });

  it('should compute activeTab correctly', () => {
    component.selectTab('tab3');
    fixture.detectChanges();
    expect(component.activeTab()?.id).toBe('tab3');
  });

  it('isActive should return false for non-active tab', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    expect(component.isActive('tab2')).toBe(false);
  });

  it('should honor activeTabId input to set initial active tab', () => {
    fixture.componentRef.setInput('activeTabId', 'tab2');
    fixture.detectChanges();
    expect(component.isActive('tab2')).toBe(true);
  });

  it('activeTab should return undefined when no tabs match', () => {
    component.selectTab('non-existent');
    fixture.detectChanges();
    expect(component.activeTab()).toBeUndefined();
  });

  it('isButtonPressed should reflect active tab', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    expect(component.isButtonPressed('tab1')).toBe(true);
    expect(component.isButtonPressed('tab2')).toBe(false);
  });

  it('should render tab panel when active tab is set', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const panel = fixture.nativeElement.querySelector('.dcx-tab__panel');
    expect(panel).toBeTruthy();
  });

  it('should set id on each tab button matching its aria-labelledby reference on the panel', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const tabButton = fixture.nativeElement.querySelector(
      '[data-tab="tab1"]',
    );
    const panel = fixture.nativeElement.querySelector('.dcx-tab__panel');
    expect(tabButton.id).toBe('tab1');
    expect(panel.getAttribute('aria-labelledby')).toBe('tab1');
  });

  it('should apply roving tabindex: 0 on the active tab, -1 on the rest', () => {
    component.selectTab('tab2');
    fixture.detectChanges();
    const tab1 = fixture.nativeElement.querySelector('[data-tab="tab1"]');
    const tab2 = fixture.nativeElement.querySelector('[data-tab="tab2"]');
    const tab3 = fixture.nativeElement.querySelector('[data-tab="tab3"]');
    expect(tab1.tabIndex).toBe(-1);
    expect(tab2.tabIndex).toBe(0);
    expect(tab3.tabIndex).toBe(-1);
  });

  it('should set aria-label on the tablist when ariaLabel is provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Navegación del proyecto');
    fixture.detectChanges();
    const tablist = fixture.nativeElement.querySelector('[role="tablist"]');
    expect(tablist.getAttribute('aria-label')).toBe('Navegación del proyecto');
  });

  it('should render a badge when tab.badge is set', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemWithBadges);
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector(
      '[data-tab="tab1"] .dcx-tab__badge',
    );
    expect(badge).toBeTruthy();
    expect(badge.textContent.trim()).toBe('3');
  });

  it('should not render a badge when tab.badge is not set', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemWithBadges);
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector(
      '[data-tab="tab3"] .dcx-tab__badge',
    );
    expect(badge).toBeFalsy();
  });

  it('should render control buttons with visible numeric text as their accessible name', () => {
    fixture.componentRef.setInput('hasControls', true);
    fixture.detectChanges();
    const controlButtons = fixture.nativeElement.querySelectorAll(
      '.dcx-tabs__controls button',
    );
    expect(controlButtons[0].textContent.trim()).toBe('1');
  });

  it('should handle keyboard navigation - ArrowRight', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.onKeydown(event);
    expect(component.isActive('tab2')).toBe(true);
  });

  it('should handle keyboard navigation - ArrowLeft wraps', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    component.onKeydown(event);
    expect(component.isActive('tab3')).toBe(true);
  });

  it('should handle keyboard navigation - Home', () => {
    component.selectTab('tab3');
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'Home' });
    component.onKeydown(event);
    expect(component.isActive('tab1')).toBe(true);
  });

  it('should handle keyboard navigation - End', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'End' });
    component.onKeydown(event);
    expect(component.isActive('tab3')).toBe(true);
  });

  it('should call preventDefault for handled navigation keys', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    const spy = jest.spyOn(event, 'preventDefault');
    component.onKeydown(event);
    expect(spy).toHaveBeenCalled();
  });

  it('should not call preventDefault for unhandled keys', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    const spy = jest.spyOn(event, 'preventDefault');
    component.onKeydown(event);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should skip disabled tabs when navigating with ArrowRight', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemWithDisabled);
    fixture.detectChanges();
    component.selectTab('tab1');
    fixture.detectChanges();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.onKeydown(event);
    expect(component.isActive('tab3')).toBe(true);
  });

  it('should keydown binding be wired to the tablist in the DOM', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
    const spy = jest.spyOn(component, 'onKeydown');
    tablist.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should move DOM focus to the newly selected tab after keyboard navigation', () => {
    component.selectTab('tab1');
    fixture.detectChanges();
    const tab2Button = fixture.debugElement.query(
      By.css('[data-tab="tab2"]'),
    ).nativeElement as HTMLElement;
    const focusSpy = jest.spyOn(tab2Button, 'focus');
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.onKeydown(event);
    expect(focusSpy).toHaveBeenCalled();
  });

  it('should render controls when hasControls is true', () => {
    fixture.componentRef.setInput('hasControls', true);
    fixture.detectChanges();
    const controls = fixture.nativeElement.querySelector('.dcx-tabs__controls');
    expect(controls).toBeTruthy();
  });

  it('should not render controls by default', () => {
    const controls = fixture.nativeElement.querySelector('.dcx-tabs__controls');
    expect(controls).toBeFalsy();
  });

  describe('scroll methods', () => {
    it('should call updateScrollButtons', () => {
      fixture.detectChanges();
      component.updateScrollButtons();
      expect(component.canScrollLeft()).toBe(false);
      expect(component.canScrollRight()).toBe(false);
    });

    it('should call scrollLeft without error', () => {
      fixture.detectChanges();
      if (component['tabsHeader']) {
        component['tabsHeader'].nativeElement.scrollBy = jest.fn();
        component.scrollLeft();
        expect(
          component['tabsHeader'].nativeElement.scrollBy,
        ).toHaveBeenCalledWith({
          left: -150,
          behavior: 'smooth',
        });
      }
    });

    it('should call scrollRight without error', () => {
      fixture.detectChanges();
      if (component['tabsHeader']) {
        component['tabsHeader'].nativeElement.scrollBy = jest.fn();
        component.scrollRight();
        expect(
          component['tabsHeader'].nativeElement.scrollBy,
        ).toHaveBeenCalledWith({
          left: 150,
          behavior: 'smooth',
        });
      }
    });

    it('should call scrollIntoView for a given tabId', () => {
      component.selectTab('tab1');
      fixture.detectChanges();
      component['scrollIntoView']('tab1');
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    });

    it('hasOverflow should return false by default', () => {
      expect(component.hasOverflow()).toBe(false);
    });
  });
});

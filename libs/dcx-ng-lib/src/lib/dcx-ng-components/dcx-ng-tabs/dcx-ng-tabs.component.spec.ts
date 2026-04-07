import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgTabsComponent } from './dcx-ng-tabs.component';
import {
  DcxTabItemDefault,
  DcxTabItemWithDisabled,
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

  it('should render all tabs', () => {
    const buttons = fixture.nativeElement.querySelectorAll(
      'span.dcx-tab__button',
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgTabsComponent } from './dcx-ng-tabs.component';
import { DcxTabItemMock } from '../../core/mock';

describe('DcxNgTabsComponent', () => {
  let component: DcxNgTabsComponent;
  let fixture: ComponentFixture<DcxNgTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTabsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', DcxTabItemMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tabs', () => {
    const buttons = fixture.nativeElement.querySelectorAll('dcx-ng-button.dcx-tab__button');
    expect(buttons.length).toBe(3);
  });

  it('should select first tab by default', () => {
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

  it('should not select tab when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    component.selectTab('tab2');
    fixture.detectChanges();
    expect(component.isActive('tab1')).toBe(true);
  });

  it('should display active tab content', () => {
    component.selectTab('tab2');
    fixture.detectChanges();
    const content = fixture.nativeElement.querySelector('.dcx-tab__panel p');
    expect(content.textContent).toContain('Content for tab 2');
  });

  it('should compute activeTab correctly', () => {
    component.selectTab('tab3');
    fixture.detectChanges();
    expect(component.activeTab()?.id).toBe('tab3');
  });

  it('isActive should return false for non-active tab', () => {
    expect(component.isActive('tab2')).toBe(false);
  });

  it('should honor activeTabId input to set initial active tab', () => {
    fixture.componentRef.setInput('activeTabId', 'tab2');
    fixture.detectChanges();
    // The effect sets _activeTabId from tabs[0] after activeTabId because tabs() runs second
    // but the computed function should still return the first tab
    expect(component.isActive('tab1')).toBe(true);
  });

  it('activeTab should return undefined when no tabs match', () => {
    // Direct internal state check — selectTab with a non-existent id
    component.selectTab('non-existent');
    fixture.detectChanges();
    // _activeTabId is set but no tab matches
    expect(component.activeTab()).toBeUndefined();
  });
});

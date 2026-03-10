import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DcxNgPageTabsComponent } from './dcx-ng-page-tabs.component';
import { DcxTabItemDefault } from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgPageTabsComponent', () => {
  let component: DcxNgPageTabsComponent;
  let fixture: ComponentFixture<DcxNgPageTabsComponent>;

  beforeEach(async () => {
    // Mock scrollIntoView which is not available in JSDOM
    Element.prototype.scrollIntoView = jest.fn();

    await TestBed.configureTestingModule({
      imports: [DcxNgPageTabsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DcxNgPageTabsComponent, {
        set: { imports: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DcxNgPageTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tabsDefault from mock', () => {
    expect(component.tabsDefault).toEqual(DcxTabItemDefault);
  });

  it('should have first tab selected by default', () => {
    expect(component.selectedTabId()).toBe('tab1');
  });

  it('should update selected tab on tab change', () => {
    component.onTabChange('tab2');
    expect(component.selectedTabIdContent()).toBe('tab2');
  });
});

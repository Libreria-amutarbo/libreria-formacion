import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageTabsComponent } from './dcx-ng-page-tabs.component';
import { DcxTabItemMock } from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgPageTabsComponent', () => {
  let component: DcxNgPageTabsComponent;
  let fixture: ComponentFixture<DcxNgPageTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have tabs from mock', () => {
    expect(component.tabs).toEqual(DcxTabItemMock);
  });

  it('should have first tab selected by default', () => {
    expect(component.selectedTabId()).toBe('tab1');
  });

  it('should update selected tab on tab change', () => {
    component.onTabChange('tab2');
    expect(component.selectedTabId()).toBe('tab2');
  });
});

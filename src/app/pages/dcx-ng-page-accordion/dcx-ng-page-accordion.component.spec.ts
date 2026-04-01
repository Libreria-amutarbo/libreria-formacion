import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DcxNgPageAccordionComponent } from './dcx-ng-page-accordion.component';
import {
  DcxAccordionDefault,
  DcxAccordionItemsWithIcon,
  DcxAccordionItemsDisabled,
  DcxAccordionItemsWithExpanded,
  DcxAccordionLargeContent,
} from '@dcx-ng-components/dcx-ng-lib';

xdescribe('DcxNgPageAccordionComponent', () => {
  let component: DcxNgPageAccordionComponent;
  let fixture: ComponentFixture<DcxNgPageAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageAccordionComponent, BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DcxNgPageAccordionComponent, {
        set: { imports: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DcxNgPageAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defaultItems initialized with DcxAccordionDefault', () => {
    expect(component.defaultItems).toBe(DcxAccordionDefault);
  });

  it('should have all item sets initialized correctly', () => {
    expect(component.withIcons).toBe(DcxAccordionItemsWithIcon);
    expect(component.WithDisabledItems).toBe(DcxAccordionItemsDisabled);
    expect(component.multipleOpenItems).toBe(DcxAccordionItemsWithExpanded);
    expect(component.largeContentItems).toBe(DcxAccordionLargeContent);
  });
});

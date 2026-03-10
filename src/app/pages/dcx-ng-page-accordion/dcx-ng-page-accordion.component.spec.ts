import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DcxNgPageAccordionComponent } from './dcx-ng-page-accordion.component';

describe('DcxNgPageAccordionComponent', () => {
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

  it('should have defaultItems initialized', () => {
    expect(component.defaultItems).toBeDefined();
    expect(component.defaultItems.length).toBe(4);
  });

  it('should have correct titles in defaultItems', () => {
    const titles = component.defaultItems.map((item) => item.title);
    expect(titles).toContain('Item 1');
    expect(titles).toContain('Item 2');
  });

  it('should have all item sets defined', () => {
    expect(component.withIcons).toBeDefined();
    expect(component.WithDisabledItems).toBeDefined();
    expect(component.multipleOpenItems).toBeDefined();
    expect(component.largeContentItems).toBeDefined();
  });
});

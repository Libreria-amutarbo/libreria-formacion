import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DcxNgPageAccordionComponent } from './dcx-ng-page-accordion.component';
import { DcxNgAccordionComponent } from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgPageAccordionComponent', () => {
  let component: DcxNgPageAccordionComponent;
  let fixture: ComponentFixture<DcxNgPageAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageAccordionComponent, BrowserAnimationsModule, DcxNgAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have accordion items initialized', () => {
    expect(component.defaultItems).toBeDefined();
    expect(component.defaultItems.length).toBe(3);
  });

  it('should have correct titles', () => {
    const titles = component.defaultItems.map((item) => item.title);

    expect(titles).toContain('Item 1');
    expect(titles).toContain('Item 2');
    expect(titles).toContain('Item 3 (Disabled)');
  });

  it('should have all item sets defined', () => {
    expect(component.withIconsItems).toBeDefined();
    expect(component.withDisabledItems).toBeDefined();
    expect(component.multipleOpenItems).toBeDefined();
    expect(component.defaultExpandedItems).toBeDefined();
    expect(component.largeContentItems).toBeDefined();
  });
});

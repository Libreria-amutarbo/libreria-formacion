import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageAccordion } from './dcx-ng-page-accordion';

describe('DcxNgPageAccordion', () => {
  let component: DcxNgPageAccordion;
  let fixture: ComponentFixture<DcxNgPageAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageAccordion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

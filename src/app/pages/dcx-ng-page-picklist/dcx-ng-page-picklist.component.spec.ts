import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPagePickListComponent } from './dcx-ng-page-picklist.component';

describe('DcxNgPagePickListComponent', () => {
  let fixture: ComponentFixture<DcxNgPagePickListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPagePickListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPagePickListComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});

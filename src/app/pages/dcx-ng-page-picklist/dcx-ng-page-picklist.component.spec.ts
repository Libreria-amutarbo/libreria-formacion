import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PICKLIST_AVAILABLE_COURSES } from '@dcx-ng-components/dcx-ng-lib';
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

  it('should update basic source from picklist output handlers', () => {
    const nextSource = PICKLIST_AVAILABLE_COURSES.slice(0, 2);

    fixture.componentInstance.updateBasicSource(nextSource);

    expect(fixture.componentInstance.basicSource()).toEqual(nextSource);
  });
});

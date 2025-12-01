import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageDialogComponent } from './dcx-ng-page-dialog.component';

describe('DcxNgPageDialogComponent', () => {
  let component: DcxNgPageDialogComponent;
  let fixture: ComponentFixture<DcxNgPageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

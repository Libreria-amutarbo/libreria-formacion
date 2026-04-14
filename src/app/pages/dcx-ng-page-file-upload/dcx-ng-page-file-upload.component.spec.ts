import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageFileUploadComponent } from './dcx-ng-page-file-upload.component';

describe('DcxNgPageFileUpload', () => {
  let component: DcxNgPageFileUploadComponent;
  let fixture: ComponentFixture<DcxNgPageFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageFileUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render showcase sections', () => {
    const headings = fixture.nativeElement.querySelectorAll('h2');

    expect(headings.length).toBe(5);
  });
});

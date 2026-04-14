import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageFileUpload } from './dcx-ng-page-file-upload';

describe('DcxNgPageFileUpload', () => {
  let component: DcxNgPageFileUpload;
  let fixture: ComponentFixture<DcxNgPageFileUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageFileUpload],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageFileUpload);
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

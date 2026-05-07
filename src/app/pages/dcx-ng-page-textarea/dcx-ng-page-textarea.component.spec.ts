import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageTextareaComponent } from './dcx-ng-page-textarea.component';

describe('DcxNgPageTextareaComponent', () => {
  let component: DcxNgPageTextareaComponent;
  let fixture: ComponentFixture<DcxNgPageTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageButtonComponent } from './dcx-ng-page-button.component';

describe('DcxNgPageButtonComponent', () => {
  let component: DcxNgPageButtonComponent;
  let fixture: ComponentFixture<DcxNgPageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

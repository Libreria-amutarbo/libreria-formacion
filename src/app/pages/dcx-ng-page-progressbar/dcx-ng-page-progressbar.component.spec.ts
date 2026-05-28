import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageProgressbarComponent } from './dcx-ng-page-progressbar.component';

describe('DcxNgPageProgressbarComponent', () => {
  let component: DcxNgPageProgressbarComponent;
  let fixture: ComponentFixture<DcxNgPageProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageProgressbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DcxNgPageRadioComponent } from './dcx-ng-page-radio.component';

describe('DcxNgPageRadioComponent', () => {
  let component: DcxNgPageRadioComponent;
  let fixture: ComponentFixture<DcxNgPageRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageRadioComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

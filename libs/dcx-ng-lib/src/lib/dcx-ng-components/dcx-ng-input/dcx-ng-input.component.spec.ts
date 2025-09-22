import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgInputComponent } from './dcx-ng-input.component';

describe('DcxNgInputComponent', () => {
  let component: DcxNgInputComponent;
  let fixture: ComponentFixture<DcxNgInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

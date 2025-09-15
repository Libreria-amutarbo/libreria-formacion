import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageToggleComponent } from './dcx-ng-page-toggle.component';

describe('DcxNgPageToggleComponent', () => {
  let component: DcxNgPageToggleComponent;
  let fixture: ComponentFixture<DcxNgPageToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

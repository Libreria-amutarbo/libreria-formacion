import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgProgressbarComponent } from './dcx-ng-progressbar.component';

describe('DcxNgProgressbarComponent', () => {
  let component: DcxNgProgressbarComponent;
  let fixture: ComponentFixture<DcxNgProgressbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgProgressbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

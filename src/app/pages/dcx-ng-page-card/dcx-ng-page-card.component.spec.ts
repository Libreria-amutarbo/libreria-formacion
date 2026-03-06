import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageCardComponent } from './dcx-ng-page-card.component';

describe('DcxNgPageCardComponent', () => {
  let component: DcxNgPageCardComponent;
  let fixture: ComponentFixture<DcxNgPageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

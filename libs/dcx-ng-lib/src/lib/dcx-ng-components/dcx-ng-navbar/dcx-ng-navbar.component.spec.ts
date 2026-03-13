import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgNavbarComponent } from './dcx-ng-navbar.component';

describe('DcxNgNavbarComponent', () => {
  let component: DcxNgNavbarComponent;
  let fixture: ComponentFixture<DcxNgNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageNavbarComponent } from './dcx-ng-page-navbar.component';

describe('DcxNgPageNavbarComponent', () => {
  let component: DcxNgPageNavbarComponent;
  let fixture: ComponentFixture<DcxNgPageNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

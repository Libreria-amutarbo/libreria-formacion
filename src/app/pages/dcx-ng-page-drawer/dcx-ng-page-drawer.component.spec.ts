import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageDrawerComponent } from './dcx-ng-page-drawer.component';

describe('DcxNgPageDrawerComponent', () => {
  let component: DcxNgPageDrawerComponent;
  let fixture: ComponentFixture<DcxNgPageDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

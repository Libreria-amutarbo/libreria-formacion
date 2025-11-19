import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageListComponent } from './dcx-ng-page-list.component';

describe('DcxNgPageListComponent', () => {
  let component: DcxNgPageListComponent;
  let fixture: ComponentFixture<DcxNgPageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

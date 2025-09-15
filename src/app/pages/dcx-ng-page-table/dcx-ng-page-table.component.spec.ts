import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcxNgPageTableComponent } from './dcx-ng-page-table.component';

describe('DcxNgPageTableComponent', () => {
  let component: DcxNgPageTableComponent;
  let fixture: ComponentFixture<DcxNgPageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcxNgPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

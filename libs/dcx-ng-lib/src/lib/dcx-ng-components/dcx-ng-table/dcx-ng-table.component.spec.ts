import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcxNgTableComponent } from './dcx-ng-table.component';

describe('DcxNgTableComponent', () => {
  let component: DcxNgTableComponent;
  let fixture: ComponentFixture<DcxNgTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DcxNgTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

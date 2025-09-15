import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcxNgPageMessageComponent } from './dcx-ng-page-message.component';

describe('DcxNgPageMessageComponent', () => {
  let component: DcxNgPageMessageComponent;
  let fixture: ComponentFixture<DcxNgPageMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

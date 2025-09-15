import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcxNgMessageComponent } from './dcx-ng-message.component';

describe('DcxNgMessageComponent', () => {
  let component: DcxNgMessageComponent;
  let fixture: ComponentFixture<DcxNgMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

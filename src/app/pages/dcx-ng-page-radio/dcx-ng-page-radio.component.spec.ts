import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { DcxNgPageRadioComponent } from './dcx-ng-page-radio.component';

describe('DcxNgPageRadioComponent', () => {
  let component: DcxNgPageRadioComponent;
  let fixture: ComponentFixture<DcxNgPageRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DcxNgPageRadioComponent, {
        set: {
          imports: [ReactiveFormsModule],
          schemas: [NO_ERRORS_SCHEMA],
          template: '<div></div>',
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DcxNgPageRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

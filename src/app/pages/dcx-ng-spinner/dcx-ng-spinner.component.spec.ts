import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgSpinnerComponent } from './dcx-ng-spinner.component';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('DcxNgSpinnerComponent', () => {
  let component: DcxNgSpinnerComponent;
  let fixture: ComponentFixture<DcxNgSpinnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DcxNgSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the spinner when isVisible is true', () => {
    component.isVisible = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.dcx-ng-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should not display the spinner when isVisible is false', () => {
    component.isVisible = false;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('.dcx-ng-spinner'));
    expect(spinner).toBeFalsy();
  });
});

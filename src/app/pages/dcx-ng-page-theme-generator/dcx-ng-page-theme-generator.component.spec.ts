import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageThemeGeneratorComponent } from './dcx-ng-page-theme-generator.component';

describe('DcxNgPageThemeGeneratorComponent', () => {
  let component: DcxNgPageThemeGeneratorComponent;
  let fixture: ComponentFixture<DcxNgPageThemeGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageThemeGeneratorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageThemeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

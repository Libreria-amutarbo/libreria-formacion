import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { DcxNgPageFullTableComponent } from './dcx-ng-page-full-table.component';

registerLocaleData(localeEs);

describe('DcxNgPageFullTableComponent', () => {
  let component: DcxNgPageFullTableComponent;
  let fixture: ComponentFixture<DcxNgPageFullTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageFullTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageFullTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageEditorComponent } from './dcx-ng-page-editor.component';

describe('DcxNgPageEditorComponent', () => {
  let component: DcxNgPageEditorComponent;
  let fixture: ComponentFixture<DcxNgPageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value', () => {
    component.onValueChange('<p>Nuevo contenido</p>');

    expect(component.value).toBe('<p>Nuevo contenido</p>');
  });
});

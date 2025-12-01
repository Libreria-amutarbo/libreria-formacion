import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DcxNgDialogComponent } from './dcx-ng-dialog.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <dcx-ng-dialog [title]="dialogTitle" [visible]="dialogVisible" (onClose)="handleClose()">
      <div dialog-body>Contenido por defecto</div>
      <div dialog-footer>Footer por defecto</div>

      <ng-template #customBody>Contenido custom</ng-template>
      <ng-template #customFooter>Footer custom</ng-template>
    </dcx-ng-dialog>
  `,
})
class TestHostComponent {
  dialogTitle = 'Título de prueba';
  dialogVisible = true;
  closed = false;

  @ViewChild('customBody') customBody!: TemplateRef<any>;
  @ViewChild('customFooter') customFooter!: TemplateRef<any>;

  handleClose() {
    this.closed = true;
  }
}

describe('DcxNgDialogComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgDialogComponent],
      declarations: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse el componente', () => {
    expect(fixture).toBeTruthy();
  });

  it('debe mostrar el título cuando visible = true', () => {
    const titleEl = fixture.debugElement.query(
      By.css('.dialog-header h3'),
    ).nativeElement;
    expect(titleEl.textContent).toContain(host.dialogTitle);
  });

  it('no debe renderizar contenido cuando visible = false', () => {
    host.dialogVisible = false;
    fixture.detectChanges();
    const dialogContent = fixture.debugElement.query(By.css('.dialog-header'));
    expect(dialogContent).toBeNull();
  });

  it('debe usar ng-content para body si no hay bodyTemplate', () => {
    const bodyEl = fixture.debugElement.query(
      By.css('.dialog-body'),
    ).nativeElement;
    expect(bodyEl.textContent).toContain('Contenido por defecto');
  });

  it('debe usar ng-content para footer si no hay footerTemplate', () => {
    const footerEl = fixture.debugElement.query(
      By.css('[dialog-footer]'),
    ).nativeElement;
    expect(footerEl.textContent).toContain('Footer por defecto');
  });

  it('debe renderizar bodyTemplate si se asigna', () => {
    const dialogComponent = fixture.debugElement.query(
      By.directive(DcxNgDialogComponent),
    ).componentInstance;
    dialogComponent.bodyTemplate = host.customBody;
    fixture.detectChanges();
    const bodyEl = fixture.debugElement.query(
      By.css('.dialog-body'),
    ).nativeElement;
    expect(bodyEl.textContent).toContain('Contenido custom');
  });

  it('debe renderizar footerTemplate si se asigna', () => {
    const dialogComponent = fixture.debugElement.query(
      By.directive(DcxNgDialogComponent),
    ).componentInstance;
    dialogComponent.footerTemplate = host.customFooter;
    fixture.detectChanges();
    const footerEl = fixture.debugElement.query(
      By.css('.dialog-footer'),
    ).nativeElement;
    expect(footerEl.textContent).toContain('Footer custom');
  });

  it('debe emitir onClose y ocultar el diálogo al hacer click en cerrar', () => {
    const closeBtn = fixture.debugElement.query(
      By.css('.dialog-close'),
    ).nativeElement;
    closeBtn.click();
    fixture.detectChanges();
    expect(host.closed).toBe(true);
  });

  it('close() debe cambiar visible a false y emitir evento', () => {
    const dialogComponent = fixture.debugElement.query(
      By.directive(DcxNgDialogComponent),
    ).componentInstance;
    jest.spyOn(dialogComponent.onClose, 'emit');
    dialogComponent.close();
    expect(dialogComponent.visible).toBe(false);
    expect(dialogComponent.onClose.emit).toHaveBeenCalled();
  });
});

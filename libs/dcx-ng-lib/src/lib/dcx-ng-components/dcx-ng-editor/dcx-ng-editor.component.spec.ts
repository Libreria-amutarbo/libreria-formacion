import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgEditorComponent } from './dcx-ng-editor.component';

describe('DcxNgEditorComponent', () => {
  let component: DcxNgEditorComponent;
  let fixture: ComponentFixture<DcxNgEditorComponent>;

  const getEditor = (): HTMLElement =>
    fixture.debugElement.query(By.css('.dcx-ng-editor__content'))
      .nativeElement as HTMLElement;

  const selectEditorContents = (editor: HTMLElement): void => {
    const range = document.createRange();
    range.selectNodeContents(editor);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    component.saveSelection();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgEditorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label when set', () => {
    fixture.componentRef.setInput('label', 'Contenido');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.dcx-ng-editor__label'));
    expect(label.nativeElement.textContent).toContain('Contenido');
  });

  it('should emit valueChange on input', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const editor = fixture.debugElement.query(
      By.css('.dcx-ng-editor__content'),
    ).nativeElement as HTMLElement;

    editor.innerHTML = '<p>Texto</p>';
    editor.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('<p>Texto</p>');
    expect(spy).toHaveBeenCalledWith('<p>Texto</p>');
  });

  it('should prevent toolbar mousedown to keep editor selection', () => {
    const event = new MouseEvent('mousedown', { cancelable: true });

    component.onToolbarMouseDown(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('should apply toolbar command on pointerdown', () => {
    const item = component.toolbarItems()[0];
    const event = new MouseEvent('pointerdown', {
      cancelable: true,
    }) as PointerEvent;
    const spy = jest.spyOn(component, 'applyCommand');

    component.onToolbarPointerDown(event, item);

    expect(event.defaultPrevented).toBe(true);
    expect(spy).toHaveBeenCalledWith(item);
  });

  it('should apply inline format using the current selection', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const editor = getEditor();
    editor.textContent = 'Texto';
    selectEditorContents(editor);

    component.applyCommand({
      action: 'bold',
      icon: 'type-bold',
      ariaLabel: 'Negrita',
    });

    expect(editor.innerHTML).toBe('<strong>Texto</strong>');
    expect(component.value()).toBe('<strong>Texto</strong>');
    expect(spy).toHaveBeenCalledWith('<strong>Texto</strong>');
  });

  it('should remove format from selected content', () => {
    const editor = getEditor();
    editor.innerHTML = '<strong>Texto</strong>';
    selectEditorContents(editor);

    component.applyCommand({
      action: 'removeFormat',
      icon: 'eraser',
      ariaLabel: 'Quitar formato',
    });

    expect(editor.innerHTML).toBe('Texto');
    expect(component.value()).toBe('Texto');
  });

  it('should wrap selected content in an unordered list', () => {
    const editor = getEditor();
    editor.textContent = 'Texto';
    selectEditorContents(editor);

    component.applyCommand({
      action: 'unorderedList',
      icon: 'list-ul',
      ariaLabel: 'Lista con viñetas',
    });

    expect(editor.innerHTML).toBe('<ul><li>Texto</li></ul>');
    expect(component.value()).toBe('<ul><li>Texto</li></ul>');
  });

  it('should mark contenteditable as false when disabled', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const editor = fixture.debugElement.query(
      By.css('.dcx-ng-editor__content'),
    ).nativeElement as HTMLElement;

    expect(editor.getAttribute('contenteditable')).toBe('false');
  });

  it('should make editable content focusable', () => {
    const editor = fixture.debugElement.query(
      By.css('.dcx-ng-editor__content'),
    ).nativeElement as HTMLElement;

    expect(editor.getAttribute('tabindex')).toBe('0');
  });

  it('should remove content from tab order when disabled', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const editor = fixture.debugElement.query(
      By.css('.dcx-ng-editor__content'),
    ).nativeElement as HTMLElement;

    expect(editor.hasAttribute('tabindex')).toBe(false);
  });

  it('should show error message when invalid', () => {
    fixture.componentRef.setInput('isInvalid', true);
    fixture.componentRef.setInput('errorMessage', 'Campo requerido');
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.dcx-ng-editor__error'));
    expect(error.nativeElement.textContent).toContain('Campo requerido');
  });

  it('should implement ControlValueAccessor writeValue', () => {
    component.writeValue('<p>Valor</p>');
    fixture.detectChanges();

    expect(component.value()).toBe('<p>Valor</p>');
  });

  it('should call touched callback on blur', () => {
    const touched = jest.fn();
    component.registerOnTouched(touched);

    component.onBlur();

    expect(touched).toHaveBeenCalled();
  });
});

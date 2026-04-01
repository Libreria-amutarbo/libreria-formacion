import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgDividerComponent } from './dcx-ng-divider.component';
import { By } from '@angular/platform-browser';

describe('DcxNgDividerComponent', () => {
  let component: DcxNgDividerComponent;
  let fixture: ComponentFixture<DcxNgDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ─── Creation ────────────────────────────────────────────────────────────────

  it('should create the divider component', () => {
    expect(component).toBeTruthy();
  });

  // ─── Template branching ───────────────────────────────────────────────────────

  it('should render a plain span when no label is provided', () => {
    const span = fixture.debugElement.query(By.css('span.dcx-ng-divider'));
    expect(span).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.labeled'))).toBeNull();
  });

  it('should render the labeled branch when label input is set', () => {
    fixture.componentRef.setInput('label', 'Section');
    fixture.detectChanges();

    const labeled = fixture.debugElement.query(
      By.css('.dcx-ng-divider.labeled'),
    );
    expect(labeled).toBeTruthy();
    expect(labeled.nativeElement.textContent.trim()).toContain('Section');
    expect(
      fixture.debugElement.query(By.css('span.dcx-ng-divider:not(.labeled)')),
    ).toBeNull();
  });

  // it('should render two __line spans with aria-hidden in the labeled branch', () => {
  //   fixture.componentRef.setInput('label', 'OR');
  //   fixture.detectChanges();

  //   const lines = fixture.debugElement.queryAll(
  //     By.css('.dcx-ng-divider__line'),
  //   );
  //   expect(lines.length).toBe(2);
  //   lines.forEach(line =>
  //     expect(line.nativeElement.getAttribute('aria-hidden')).toBe('true'),
  //   );
  // });

  it('should render the __label span with the correct text', () => {
    fixture.componentRef.setInput('label', 'My Label');
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('.dcx-ng-divider__label'));
    expect(label.nativeElement.textContent.trim()).toBe('My Label');
  });

  // ─── ARIA attributes ──────────────────────────────────────────────────────────

  it('should set aria-orientation to horizontal by default on the plain span', () => {
    const span = fixture.debugElement.query(By.css('span.dcx-ng-divider'));
    expect(span.nativeElement.getAttribute('aria-orientation')).toBe(
      'horizontal',
    );
  });

  it('should set aria-orientation to vertical on the plain span when orientation is vertical', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span.dcx-ng-divider'));
    expect(span.nativeElement.getAttribute('aria-orientation')).toBe(
      'vertical',
    );
  });

  it('should set aria-orientation on the labeled branch', () => {
    fixture.componentRef.setInput('label', 'OR');
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const labeled = fixture.debugElement.query(
      By.css('.dcx-ng-divider.labeled'),
    );
    expect(labeled.nativeElement.getAttribute('aria-orientation')).toBe(
      'vertical',
    );
  });

  it('should set role="separator" on the plain span', () => {
    const span = fixture.debugElement.query(By.css('span.dcx-ng-divider'));
    expect(span.nativeElement.getAttribute('role')).toBe('separator');
  });

  it('should set role="separator" on the labeled element', () => {
    fixture.componentRef.setInput('label', 'Section');
    fixture.detectChanges();

    const labeled = fixture.debugElement.query(
      By.css('.dcx-ng-divider.labeled'),
    );
    expect(labeled.nativeElement.getAttribute('role')).toBe('separator');
  });

  it('should bind aria-label from ariaLabel input', () => {
    fixture.componentRef.setInput('ariaLabel', 'My divider');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span.dcx-ng-divider'));
    expect(span.nativeElement.getAttribute('aria-label')).toBe('My divider');
  });

  it('should fall back aria-label to label value when ariaLabel is empty', () => {
    fixture.componentRef.setInput('label', 'Section');
    fixture.detectChanges();

    const labeled = fixture.debugElement.query(
      By.css('.dcx-ng-divider.labeled'),
    );
    expect(labeled.nativeElement.getAttribute('aria-label')).toBe('Section');
  });

  it('should fall back aria-label to "dcx-divider" when both ariaLabel and label are empty', () => {
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('span.dcx-ng-divider'));
    expect(span.nativeElement.getAttribute('aria-label')).toBe('dcx-divider');
  });

  // ─── ariaLabelBinding computed ────────────────────────────────────────────────

  it('should prioritise ariaLabel over label in ariaLabelBinding', () => {
    fixture.componentRef.setInput('ariaLabel', 'Explicit');
    fixture.componentRef.setInput('label', 'Section');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('Explicit');
  });

  it('should use label as ariaLabelBinding when ariaLabel is empty', () => {
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.componentRef.setInput('label', 'Section');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('Section');
  });

  it('should fall back ariaLabelBinding to "dcx-divider" when both are empty', () => {
    fixture.componentRef.setInput('ariaLabel', '');
    fixture.componentRef.setInput('label', '');
    fixture.detectChanges();
    expect(component.ariaLabelBinding()).toBe('dcx-divider');
  });

  // ─── Host class bindings ──────────────────────────────────────────────────────

  it('should add "horizontal" host class by default', () => {
    expect((fixture.nativeElement as HTMLElement).classList).toContain(
      'horizontal',
    );
  });

  it('should add "vertical" host class when orientation is vertical', () => {
    fixture.componentRef.setInput('orientation', 'vertical');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.classList).toContain('vertical');
    expect(host.classList).not.toContain('horizontal');
  });

  it('should add "has-label" host class when label is set', () => {
    fixture.componentRef.setInput('label', 'Section');
    fixture.detectChanges();

    expect((fixture.nativeElement as HTMLElement).classList).toContain(
      'has-label',
    );
  });

  it('should not add "has-label" host class when label is empty', () => {
    expect((fixture.nativeElement as HTMLElement).classList).not.toContain(
      'has-label',
    );
  });

  // ─── CSS variable bindings ────────────────────────────────────────────────────

  it('should bind --dcx-divider-thickness from thickness input', () => {
    fixture.componentRef.setInput('thickness', 0.5);
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--dcx-divider-thickness')).toBe(
      '0.5rem',
    );
  });

  it('should bind --dcx-divider-color from color input', () => {
    fixture.componentRef.setInput('color', '#0056b3');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--dcx-divider-color')).toBe('#0056b3');
  });

  it('should bind --dcx-divider-size as "5rem" for size="s"', () => {
    fixture.componentRef.setInput('size', 's');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--dcx-divider-size')).toBe('5rem');
  });

  it('should bind --dcx-divider-size as "100%" for size="auto"', () => {
    fixture.componentRef.setInput('size', 'auto');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--dcx-divider-size')).toBe('100%');
  });

  it('should bind --dcx-divider-style as "solid" for type="default"', () => {
    fixture.componentRef.setInput('type', 'default');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--dcx-divider-style')).toBe('solid');
  });

  it('should bind --dcx-divider-style as "dotted" for type="dot"', () => {
    fixture.componentRef.setInput('type', 'dot');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--dcx-divider-style')).toBe('dotted');
  });

  it('should bind --dcx-divider-style as "dashed" for type="dash"', () => {
    fixture.componentRef.setInput('type', 'dash');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    expect(host.style.getPropertyValue('--dcx-divider-style')).toBe('dashed');
  });
});

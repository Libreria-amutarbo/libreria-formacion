import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgIconComponent } from './dcx-ng-icon.component';

describe('DcxNgIconComponent', () => {
  let component: DcxNgIconComponent;
  let fixture: ComponentFixture<DcxNgIconComponent>;
  let hostElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgIconComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create the icon component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default classes with bootstrap-icons selector', () => {
    expect(hostElement.classList.contains('bi')).toBe(true);
    expect(hostElement.classList.contains('bi--m')).toBe(true);
    expect(hostElement.classList.contains('bi--none')).toBe(false);
  });

  it('should have default color', () => {
    expect(hostElement.classList.contains('bi--color-010101')).toBe(false);
  });

  it('should set correct color via input signal', () => {
    fixture.componentRef.setInput('color', '#ff0000');
    fixture.detectChanges();

    expect(hostElement.classList.contains('bi--color-ff0000')).toBe(true);
  });

  it('should set correct size via input signal', () => {
    fixture.componentRef.setInput('size', 'xl');
    fixture.detectChanges();

    expect(hostElement.classList.contains('bi--xl')).toBe(true);
  });

  it('should set correct spacing via input signal', () => {
    fixture.componentRef.setInput('spacing', 'compact');
    fixture.detectChanges();

    expect(hostElement.classList.contains('bi--compact')).toBe(true);
  });

  it('should set correct name via input signal', () => {
    fixture.componentRef.setInput('name', 'home');
    fixture.detectChanges();

    expect(hostElement.classList.contains('bi-home')).toBe(true);
  });

  it('should compute iconClass correctly', () => {
    fixture.componentRef.setInput('name', 'star');
    fixture.componentRef.setInput('size', 'l');
    fixture.componentRef.setInput('spacing', 'spacious');
    fixture.detectChanges();

    const classes = hostElement.className;
    expect(classes).toContain('bi');
    expect(classes).toContain('bi-star');
    expect(classes).toContain('bi--l');
    expect(classes).toContain('bi--spacious');
  });

  it('should handle empty color with default', () => {
    fixture.componentRef.setInput('color', '');
    fixture.detectChanges();

    expect(hostElement.classList.contains('bi--color-')).toBe(false);
  });
});

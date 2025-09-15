import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgIconComponent } from './dcx-ng-icon.component';
import { By } from '@angular/platform-browser';

describe('DcxNgIconComponent', () => {
  let component: DcxNgIconComponent;
  let fixture: ComponentFixture<DcxNgIconComponent>;
  let nativeElement: HTMLElement;
  let iconElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgIconComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    iconElement = fixture.debugElement.query(By.css('i')).nativeElement;

    fixture.detectChanges();
  });

  it('should create the icon component', () => {
    expect(component).toBeTruthy();
  });

  it('should have default classes and color', () => {
    expect(nativeElement.classList).toContain('material-icons');

    expect(nativeElement.classList).toContain('material-icons--m');

    expect(nativeElement.classList).not.toContain('material-icons--compact');

    expect(nativeElement.classList).not.toContain('material-icons--spacious');

    expect(nativeElement.style.color).toBe('rgb(1, 1, 1)');
  });

  it('should set correct color', () => {
    component.color = '#ff0000';
    fixture.detectChanges();

    expect(nativeElement.style.color).toBe('rgb(255, 0, 0)');
  });

  it('should set correct size', () => {
    component.size = 'xl';
    fixture.detectChanges();

    expect(nativeElement.classList).toContain('material-icons--xl');
  });

  it('should set correct spacing', () => {
    component.spacing = 'compact';
    fixture.detectChanges();

    expect(nativeElement.classList).toContain('material-icons--compact');
  });

  it('should render the name', () => {
    component.name = 'home';
    fixture.detectChanges();

    expect(iconElement.textContent?.trim()).toBe('home');
  });
});

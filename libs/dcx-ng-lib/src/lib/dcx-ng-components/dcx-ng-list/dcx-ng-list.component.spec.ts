import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgListComponent } from './dcx-ng-list.component';

describe('DcxNgListComponent', () => {
  let fixture: ComponentFixture<DcxNgListComponent>;
  let component: DcxNgListComponent;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.items = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders list items', () => {
    component.items = ['A', 'B', 'C'];
    fixture.detectChanges();

    const lis = host().querySelectorAll('li');
    expect(lis.length).toBe(3);
    expect(lis[0].textContent?.trim()).toBe('A');
    expect(lis[2].textContent?.trim()).toBe('C');
  });

  it('renders numbers too', () => {
    component.items = [1, 2, 3];
    fixture.detectChanges();

    const lis = host().querySelectorAll('li');
    expect(lis.length).toBe(3);
    expect(lis[1].textContent?.trim()).toBe('2');
  });
});

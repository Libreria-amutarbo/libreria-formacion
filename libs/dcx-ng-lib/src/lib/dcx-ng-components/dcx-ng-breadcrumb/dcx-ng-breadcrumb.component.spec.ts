import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  DcxNgBreadcrumbComponent,
  BreadcrumbItem,
} from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgBreadcrumbComponent', () => {
  let fixture: ComponentFixture<DcxNgBreadcrumbComponent>;
  let component: DcxNgBreadcrumbComponent;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgBreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.items = [];
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('renders links for all but last, and last as current', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' },
    ];
    component.items = items;
    fixture.detectChanges();

    const nav = host().querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb');

    const links = host().querySelectorAll('a.dcx-bc__link');
    expect(links.length).toBe(2);
    expect(links[0].textContent?.trim()).toBe('Home');
    expect(links[1].textContent?.trim()).toBe('Library');

    const current = host().querySelector('.dcx-bc__current');
    expect(current?.textContent?.trim()).toBe('Data');
    expect(current?.getAttribute('aria-current')).toBe('page');

    const seps = host().querySelectorAll('.dcx-bc__sep');
    expect(seps.length).toBe(2);
  });

  it('renders intermediate item without href as plain text', () => {
    component.items = [
      { label: 'Home', href: '/' },
      { label: 'Section' },
      { label: 'Page' },
    ];
    fixture.detectChanges();

    const text = host().querySelector('.dcx-bc__text');
    expect(text?.textContent?.trim()).toBe('Section');
    const current = host().querySelector('.dcx-bc__current');
    expect(current?.textContent?.trim()).toBe('Page');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DcxNgBreadcrumbComponent } from './dcx-ng-breadcrumb.component';
import {
  DcxBreadCrumbItemDefault,
  DcxBreadChevronSlashIcon,
  DcxBreadcrumbItem,
} from '@dcx-ng-components/dcx-ng-lib';

describe('DcxNgBreadcrumbComponent', () => {
  let fixture: ComponentFixture<DcxNgBreadcrumbComponent>;
  let component: DcxNgBreadcrumbComponent;
  const host = () => fixture.nativeElement as HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgBreadcrumbComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', DcxBreadCrumbItemDefault);
    fixture.componentRef.setInput('iconSeparator', DcxBreadChevronSlashIcon);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit itemSelected when an item is clicked', () => {
    const spy = jest.fn();
    component.itemSelected.subscribe(spy);
    const item = DcxBreadCrumbItemDefault[0];
    component.onItemClick(item);
    expect(spy).toHaveBeenCalledWith(item);
  });

  it('should render items', () => {
    const items: DcxBreadcrumbItem[] = [
      { label: 'Home', href: '/', disabled: false },
      { label: 'Library', href: '/lib', disabled: false },
      { label: 'Data', disabled: false },
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    const nav = host().querySelector('nav');
    expect(nav).toBeTruthy();
  });

  it('should accept different iconSeparator values', () => {
    fixture.componentRef.setInput('iconSeparator', 'slash-lg');
    fixture.detectChanges();
    expect(component.iconSeparator()).toBe('slash-lg');
  });

  it('should accept items input signal', () => {
    const items: DcxBreadcrumbItem[] = [
      { label: 'A', disabled: false },
      { label: 'B', disabled: false },
    ];
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();
    expect(component.items().length).toBe(2);
  });

  it('should show all items when there are three or fewer', () => {
    const items: DcxBreadcrumbItem[] = [
      { label: 'Home', href: '/', disabled: false },
      { label: 'Library', href: '/lib', disabled: false },
      { label: 'Data', disabled: false },
    ];

    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    expect(component.showEllipsis()).toBe(false);
    expect(component.visibleItems().map(item => item.label)).toEqual([
      'Home',
      'Library',
      'Data',
    ]);
    expect(host().querySelector('.dcx-bc__item--ellipsis')).toBeNull();
  });

  it('should show ellipsis and only the last three items when there are more than three', () => {
    const items: DcxBreadcrumbItem[] = [
      { label: 'Home', href: '/', disabled: false },
      { label: 'Section', href: '/section', disabled: false },
      { label: 'Library', href: '/library', disabled: false },
      { label: 'Category', href: '/category', disabled: false },
      { label: 'Data', disabled: false },
    ];

    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    expect(component.showEllipsis()).toBe(true);
    expect(component.visibleItems().map(item => item.label)).toEqual([
      'Library',
      'Category',
      'Data',
    ]);
    expect(host().querySelector('.dcx-bc__item--ellipsis')).toBeTruthy();
  });

  it('should keep aria-current on the last visible item when collapsed', () => {
    const items: DcxBreadcrumbItem[] = [
      { label: 'Home', href: '/', disabled: false },
      { label: 'Section', href: '/section', disabled: false },
      { label: 'Library', href: '/library', disabled: false },
      { label: 'Category', href: '/category', disabled: false },
      { label: 'Data', disabled: false },
    ];

    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const currentItem = host().querySelector('.dcx-bc__current');

    expect(currentItem).toBeTruthy();
    expect(currentItem?.textContent).toContain('Data');
    expect(currentItem?.getAttribute('aria-current')).toBe('page');
  });

  it('should open hidden breadcrumb list when clicking ellipsis', () => {
    const items: DcxBreadcrumbItem[] = [
      { label: 'Home', disabled: false },
      { label: 'Section', disabled: false },
      { label: 'Library', disabled: false },
      { label: 'Category', disabled: false },
      { label: 'Data', disabled: false },
    ];

    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const ellipsisButton = host().querySelector(
      '.dcx-bc__ellipsis-btn',
    ) as HTMLButtonElement;

    expect(ellipsisButton).toBeTruthy();

    ellipsisButton.click();
    fixture.detectChanges();

    const overflowMenu = host().querySelector('.dcx-context-menu');

    expect(component.isEllipsisMenuOpen()).toBe(true);
    expect(overflowMenu).toBeTruthy();
    expect(overflowMenu?.textContent).toContain('Home');
    expect(overflowMenu?.textContent).toContain('Section');
  });

  it('should emit itemSelected when selecting an item from hidden list', () => {
    const items: DcxBreadcrumbItem[] = [
      { label: 'Home', disabled: false },
      { label: 'Section', disabled: false },
      { label: 'Library', disabled: false },
      { label: 'Category', disabled: false },
      { label: 'Data', disabled: false },
    ];
    const spy = jest.fn();

    component.itemSelected.subscribe(spy);
    fixture.componentRef.setInput('items', items);
    fixture.detectChanges();

    const ellipsisButton = host().querySelector(
      '.dcx-bc__ellipsis-btn',
    ) as HTMLButtonElement;

    ellipsisButton.click();
    fixture.detectChanges();

    const hiddenItemButton = host().querySelector(
      '.dcx-context-menu .dcx-list-item.selectable',
    ) as HTMLElement;

    hiddenItemButton.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(items[0]);
    expect(component.isEllipsisMenuOpen()).toBe(false);
  });
});

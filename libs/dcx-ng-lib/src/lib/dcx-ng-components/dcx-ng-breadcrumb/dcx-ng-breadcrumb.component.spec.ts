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

  it('should return a TemplateRef from getItemContentTpl', () => {
    const tpl = component.getItemContentTpl();
    expect(tpl).toBeTruthy();
  });
});

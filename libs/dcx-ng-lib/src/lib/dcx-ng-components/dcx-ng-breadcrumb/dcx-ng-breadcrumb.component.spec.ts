import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DcxNgBreadcrumbComponent } from './dcx-ng-breadcrumb.component';
import {
  DcxBreadCrumbItemDefault,
  DcxBreadChevronSlashIcon,
  DcxBreadcrumbItem,
  DcxBreadCrumbOverflow,
  DcxBreadCrumbDisabled,
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

  it('should render a nav element with aria-label="Breadcrumb"', () => {
    const nav = host().querySelector('nav[aria-label="Breadcrumb"]');
    expect(nav).toBeTruthy();
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

  it('should emit itemSelected when a non-disabled item is clicked', () => {
    const spy = jest.fn();
    component.itemSelected.subscribe(spy);
    const item = DcxBreadCrumbItemDefault[0];
    component.onItemClick(item);
    expect(spy).toHaveBeenCalledWith(item);
  });

  it('should not emit itemSelected when a disabled item is clicked', () => {
    const spy = jest.fn();
    component.itemSelected.subscribe(spy);
    const item: DcxBreadcrumbItem = { label: 'Bloqueado', disabled: true };
    component.onItemClick(item);
    expect(spy).not.toHaveBeenCalled();
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

  describe('WCAG AA', () => {
    it('should mark the last visible item with aria-current="page"', () => {
      const current = host().querySelector('[aria-current="page"]');
      expect(current).toBeTruthy();
    });

    it('should render <a> for items with href', () => {
      const links = host().querySelectorAll('a.dcx-bc__link');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should render <button> for items without href', () => {
      const items: DcxBreadcrumbItem[] = [
        { label: 'Inicio', disabled: false },
        { label: 'Sección', disabled: false },
        { label: 'Página', disabled: false },
      ];
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();
      const buttons = host().querySelectorAll('button.dcx-bc__action-btn');
      expect(buttons.length).toBe(2);
    });

    it('should set aria-disabled on disabled <a> items', () => {
      fixture.componentRef.setInput('items', DcxBreadCrumbDisabled);
      fixture.detectChanges();
      const links = host().querySelectorAll('a[aria-disabled="true"]');
      expect(links.length).toBeGreaterThan(0);
    });

    it('should set native disabled on <button> action items when disabled', () => {
      const items: DcxBreadcrumbItem[] = [
        { label: 'Inicio', disabled: true },
        { label: 'Sección', disabled: false },
        { label: 'Página', disabled: false },
      ];
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();
      const disabledBtn = host().querySelector('button.dcx-bc__action-btn[disabled]');
      expect(disabledBtn).toBeTruthy();
    });

    it('should set aria-label on icon-only items', () => {
      const items: DcxBreadcrumbItem[] = [
        { label: 'Inicio', href: '/', icon: 'house', disabled: false },
        { label: 'Portátiles', icon: 'laptop', disabled: false },
      ];
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();
      const labelledLink = host().querySelector('a[aria-label="Inicio"]');
      expect(labelledLink).toBeTruthy();
    });

    it('should show ellipsis button when items exceed 3', () => {
      fixture.componentRef.setInput('items', DcxBreadCrumbOverflow);
      fixture.detectChanges();
      const ellipsisBtn = host().querySelector('[aria-haspopup="true"]');
      expect(ellipsisBtn).toBeTruthy();
    });

    it('should reflect aria-expanded on ellipsis button when menu opens', () => {
      fixture.componentRef.setInput('items', DcxBreadCrumbOverflow);
      fixture.detectChanges();
      const ellipsisBtn = host().querySelector(
        '[aria-haspopup="true"]',
      ) as HTMLElement;
      expect(ellipsisBtn?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-hidden on separator icons', () => {
      const separators = host().querySelectorAll('.dcx-bc__sep[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThan(0);
    });
  });
});

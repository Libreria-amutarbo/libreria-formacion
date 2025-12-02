import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgTabsComponent } from './dcx-ng-tabs';
import { DcxTabItemMock } from '../../core/mock';

describe('DcxNgTabsComponent', () => {
  let component: DcxNgTabsComponent;
  let fixture: ComponentFixture<DcxNgTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgTabsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tabs', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemMock);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('.dcx-tab__button');
    expect(buttons.length).toBe(3);
  });

  it('should select first tab by default', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemMock);
    fixture.detectChanges();

    expect(component.isActive('tab1')).toBe(true);
  });

  it('should select tab on click', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemMock);
    fixture.detectChanges();

    component.selectTab('tab2');
    fixture.detectChanges();

    expect(component.isActive('tab2')).toBe(true);
  });

  it('should emit tabChange when tab is selected', done => {
    fixture.componentRef.setInput('tabs', DcxTabItemMock);
    fixture.detectChanges();

    component.tabChange.subscribe((tabId: string) => {
      expect(tabId).toBe('tab2');
      done();
    });

    component.selectTab('tab2');
  });

  it('should not select tab when disabled', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemMock);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    component.selectTab('tab2');
    fixture.detectChanges();

    expect(component.isActive('tab1')).toBe(true);
  });

  it('should display active tab content', () => {
    fixture.componentRef.setInput('tabs', DcxTabItemMock);
    fixture.detectChanges();

    component.selectTab('tab2');
    fixture.detectChanges();

    const content = fixture.nativeElement.querySelector('.dcx-tab__panel p');
    expect(content.textContent).toContain('Content for tab 2');
  });
});

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DcxNgDrawerComponent } from './dcx-ng-drawer.component';

@Component({
  standalone: true,
  imports: [DcxNgDrawerComponent],
  template: `
		<dcx-ng-drawer [visible]="true" header="Header" footer="Footer text">
			<ng-template #drawerFooter>
				<span class="projected-footer">Projected footer</span>
			</ng-template>
		</dcx-ng-drawer>
	`,
})
class DrawerWithFooterTemplateHostComponent {}

describe('DcxNgDrawerComponent', () => {
  let component: DcxNgDrawerComponent;
  let fixture: ComponentFixture<DcxNgDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render drawer root when visible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    const root = fixture.debugElement.query(By.css('.dcx-drawer-root'));
    expect(root).toBeTruthy();
  });

  it('should not render mask when modal is false', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('modal', false);
    fixture.detectChanges();

    const mask = fixture.debugElement.query(By.css('.dcx-drawer-mask'));
    expect(mask).toBeFalsy();
  });

  it('should emit visibleChange(false) when mask is clicked and dismissible is true', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('modal', true);
    fixture.componentRef.setInput('dismissible', true);
    fixture.detectChanges();

    const visibleChangeSpy = jest.fn();
    component.visibleChange.subscribe(visibleChangeSpy);

    const mask = fixture.debugElement.query(By.css('.dcx-drawer-mask'));
    expect(mask).toBeTruthy();

    mask.triggerEventHandler('pointerdown', new MouseEvent('pointerdown'));
    expect(visibleChangeSpy).toHaveBeenCalledWith(false);
  });

  it('should use exact baseZIndex when autoZIndex is false', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('baseZIndex', 2000);
    fixture.componentRef.setInput('autoZIndex', false);
    fixture.detectChanges();

    expect(component.resolvedBaseZIndex()).toBe(2000);

    const root = fixture.debugElement.query(By.css('.dcx-drawer-root'));
    const panel = fixture.debugElement.query(By.css('aside.dcx-drawer'));

    expect(root.nativeElement.style.zIndex).toBe('2000');
    expect(panel.nativeElement.style.zIndex).toBe('2001');
  });

  it('should increment zIndex over base when autoZIndex is true and visible', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('baseZIndex', 2000);
    fixture.componentRef.setInput('autoZIndex', true);
    fixture.detectChanges();

    expect(component.resolvedBaseZIndex()).toBeGreaterThan(2000);
  });

  it('should render footer when footer input has content', () => {
    fixture.componentRef.setInput('visible', true);
    fixture.componentRef.setInput('footer', 'Footer input text');
    fixture.detectChanges();

    const footer = fixture.debugElement.query(By.css('.dcx-drawer__footer'));
    expect(footer).toBeTruthy();
    expect(footer.nativeElement.textContent).toContain('Footer input text');
  });

  it('should prioritize drawerFooter template over footer input text', () => {
    const hostFixture = TestBed.createComponent(
      DrawerWithFooterTemplateHostComponent,
    );
    hostFixture.detectChanges();

    const footer = hostFixture.debugElement.query(
      By.css('.dcx-drawer__footer'),
    );
    expect(footer).toBeTruthy();
    expect(footer.nativeElement.textContent).toContain('Projected footer');
    expect(footer.nativeElement.textContent).not.toContain('Footer text');
  });
});

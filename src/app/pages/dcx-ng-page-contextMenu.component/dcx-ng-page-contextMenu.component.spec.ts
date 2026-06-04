import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageContextMenuComponent } from './dcx-ng-page-contextMenu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DcxNgPageContextMenuComponent', () => {
  let component: DcxNgPageContextMenuComponent;
  let fixture: ComponentFixture<DcxNgPageContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageContextMenuComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(DcxNgPageContextMenuComponent, {
        set: { imports: [], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DcxNgPageContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have menuItems defined', () => {
    expect(component.menuItems).toBeDefined();
    expect(component.menuItems.length).toBeGreaterThan(0);
  });

  it('should have advancedMenuItems defined', () => {
    expect(component.advancedMenuItems).toBeDefined();
    expect(component.advancedMenuItems.length).toBeGreaterThan(0);
  });

  it('should have nestedMenuItems defined', () => {
    expect(component.nestedMenuItems).toBeDefined();
    expect(component.nestedMenuItems.length).toBeGreaterThan(0);
  });

  it('should have disabledMenuItems defined', () => {
    expect(component.disabledMenuItems).toBeDefined();
    expect(component.disabledMenuItems.some(i => i.disabled)).toBe(true);
  });

  it('should have dangerMenuItems defined', () => {
    expect(component.dangerMenuItems).toBeDefined();
    expect(component.dangerMenuItems.some(i => i.variant === 'danger')).toBe(true);
  });

  it('should call onItemSelected without throwing when item has text', () => {
    expect(() => component.onItemSelected({ text: 'Abrir' })).not.toThrow();
  });

  it('should call onItemSelected without throwing when item has no text', () => {
    expect(() => component.onItemSelected({ divider: true })).not.toThrow();
  });
});

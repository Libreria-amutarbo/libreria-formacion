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

  it('should have initial menu positions', () => {
    expect(component.menuPosition1).toEqual({ x: 0, y: 0 });
    expect(component.menuPosition2).toEqual({ x: 0, y: 0 });
    expect(component.menuPosition3).toEqual({ x: 0, y: 0 });
  });

  it('should set selectedItem when item has text', () => {
    const item = { text: 'Abrir' };

    component.onItemSelected(item);

    expect(component.selectedItem).toEqual(item);
  });

  it('should ignore item without text', () => {
    const dividerItem = { divider: true };

    component.onItemSelected(dividerItem);

    expect(component.selectedItem).toBeNull();
  });
});

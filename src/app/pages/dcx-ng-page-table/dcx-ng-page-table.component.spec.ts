import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageTableComponent } from './dcx-ng-page-table.component';

describe('DcxNgPageTableComponent', () => {
  let component: DcxNgPageTableComponent;
  let fixture: ComponentFixture<DcxNgPageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DcxNgPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedIds when onSelectionChange is called', () => {
    component.onSelectionChange([2, 3]);
    expect(component.selectedIds()).toEqual([2, 3]);
  });

  it('should apply a cell edit to the row', () => {
    const row = { id: 1, project: 'Old name' };
    component.onCellEdit({
      row,
      key: 'project',
      oldValue: 'Old name',
      newValue: 'New name',
      rowIndex: 0,
    });
    expect(row['project']).toBe('New name');
  });
});

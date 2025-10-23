import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DcxNgPageChipComponent } from './dcx-ng-page-chip.component';

describe('DcxNgPageChipComponent', () => {
  let component: DcxNgPageChipComponent;
  let fixture: ComponentFixture<DcxNgPageChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DcxNgPageChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DcxNgPageChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle chip removal', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    component.onChipRemove('Test Chip');
    
    expect(consoleSpy).toHaveBeenCalledWith('Chip removido: Test Chip');
    
    consoleSpy.mockRestore();
  });
});
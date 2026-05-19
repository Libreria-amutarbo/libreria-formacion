import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { DcxNgCarouselComponent } from './dcx-ng-carousel.component';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  imports: [DcxNgCarouselComponent, CommonModule],
  template: `
    <dcx-ng-carousel [value]="items" [circular]="circular">
      <ng-template #item let-data>
        <div class="test-item" style="width: 100px; height: 100px;">{{ data }}</div>
      </ng-template>
    </dcx-ng-carousel>
  `
})
class TestHostComponent {
  @Input() items: any[] = [1, 2, 3, 4, 5];
  @Input() circular = false;
  @ViewChild(DcxNgCarouselComponent) carousel!: DcxNgCarouselComponent;
}

describe('DcxNgCarouselComponent', () => {
  let component: DcxNgCarouselComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, DcxNgCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    component = hostComponent.carousel;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render items from value', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.dcx-carousel-item');
    expect(items.length).toBe(5);
  });

  it('should change page on next()', () => {
    component.next();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(1);
  });

  it('should change page on prev()', () => {
    component.setPage(2);
    fixture.detectChanges();
    expect(component.currentPage()).toBe(2);
    
    component.prev();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(1);
  });

  it('should respect circular property on next()', () => {
    hostComponent.circular = true;
    fixture.detectChanges();
    
    component.setPage(4);
    fixture.detectChanges();
    
    component.next();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(0);
  });

  it('should respect circular property on prev()', () => {
    hostComponent.circular = true;
    fixture.detectChanges();
    
    component.setPage(0);
    fixture.detectChanges();
    
    component.prev();
    fixture.detectChanges();
    expect(component.currentPage()).toBe(4);
  });

  it('should emit pageChange event', () => {
    const spy = jest.fn();
    component.pageChange.subscribe(spy);
    
    component.next();
    expect(spy).toHaveBeenCalledWith({ page: 1 });
  });
});

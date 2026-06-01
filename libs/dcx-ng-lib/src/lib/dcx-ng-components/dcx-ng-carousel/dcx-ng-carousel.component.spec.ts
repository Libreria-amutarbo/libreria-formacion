import { ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';
import { DcxNgCarouselComponent } from './dcx-ng-carousel.component';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  standalone: true,
  imports: [DcxNgCarouselComponent, CommonModule],
  template: `
    <dcx-ng-carousel [value]="items" [circular]="circular" [autoplayInterval]="autoplayInterval">
      <ng-template #item let-data>
        <div class="test-item" style="width: 100px; height: 100px;">{{ data }}</div>
      </ng-template>
    </dcx-ng-carousel>
  `
})
class TestHostComponent {
  @Input() items: any[] = [1, 2, 3, 4, 5];
  @Input() circular = false;
  @Input() autoplayInterval = 0;
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

  describe('WCAG AA', () => {
    it('should have aria-label on the carousel region equal to ariaLabel input', () => {
      const region = fixture.nativeElement.querySelector('[role="region"]') as HTMLElement;
      expect(region.getAttribute('aria-label')).toBe('Carousel');
    });

    it('should set aria-hidden on non-current slides', () => {
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.dcx-carousel-item') as NodeListOf<HTMLElement>;
      expect(items[0].getAttribute('aria-hidden')).toBeNull();
      expect(items[1].getAttribute('aria-hidden')).toBe('true');
      expect(items[2].getAttribute('aria-hidden')).toBe('true');
    });

    it('should remove aria-hidden on the current slide after navigation', () => {
      component.next();
      fixture.detectChanges();
      const items = fixture.nativeElement.querySelectorAll('.dcx-carousel-item') as NodeListOf<HTMLElement>;
      expect(items[0].getAttribute('aria-hidden')).toBe('true');
      expect(items[1].getAttribute('aria-hidden')).toBeNull();
    });

    it('should call prev() on ArrowLeft keydown (horizontal)', () => {
      component.setPage(2);
      fixture.detectChanges();
      const spy = jest.spyOn(component, 'prev');
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(spy).toHaveBeenCalled();
    });

    it('should call next() on ArrowRight keydown (horizontal)', () => {
      const spy = jest.spyOn(component, 'next');
      component.onKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(spy).toHaveBeenCalled();
    });

    it('should pause autoplay on pauseAutoplay() and resume on resumeAutoplay()', fakeAsync(() => {
      hostComponent.autoplayInterval = 1000;
      fixture.detectChanges();
      tick(0);

      component.pauseAutoplay();
      tick(2000);
      const pageAfterPause = component.currentPage();

      component.resumeAutoplay();
      tick(1100);
      expect(component.currentPage()).toBeGreaterThan(pageAfterPause);

      discardPeriodicTasks();
    }));
  });
});

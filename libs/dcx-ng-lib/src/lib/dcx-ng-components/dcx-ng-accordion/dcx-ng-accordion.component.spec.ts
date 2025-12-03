import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DcxNgAccordionComponent, DcxNgAccordionItem } from './dcx-ng-accordion.component';
import { Component } from '@angular/core';
import { DcxAccordionMock } from '@dcx-ng-components/dcx-ng-lib';

// describe('DcxNgAccordionComponent', () => {
//   let component: DcxNgAccordionComponent;
//   let fixture: ComponentFixture<TestHostComponent>;

//   @Component({
//     selector: 'test-host',
//     template: `<dcx-ng-accordion [items]="items" (itemToggled)="onItemToggled($event)" />`,
//     imports: [DcxNgAccordionComponent]
//   })
//   class TestHostComponent {
//     items = DcxAccordionMock;
//     toggledItem: DcxNgAccordionItem | null = null;

//     onItemToggled(item: DcxNgAccordionItem) {
//       this.toggledItem = item;
//     }
//   }

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [DcxNgAccordionComponent, BrowserAnimationsModule, TestHostComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(TestHostComponent);
//     fixture.detectChanges();
//     component = fixture.debugElement.children[0].componentInstance;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('toggleItem', () => {
//     it('should toggle item expansion (open/close)', () => {
//       const item = DcxAccordionMock[0];

//       component.toggleItem(item);
//       fixture.detectChanges();
//       expect(component.isExpanded(item.id)).toBe(true);

//       component.toggleItem(item);
//       fixture.detectChanges();
//       expect(component.isExpanded(item.id)).toBe(false);
//     });

//     it('should not toggle disabled items', () => {
//       const disabledItem = DcxAccordionMock[2];
//       component.toggleItem(disabledItem);
//       fixture.detectChanges();

//       expect(component.isExpanded(disabledItem.id)).toBe(false);
//     });

//     it('should allow multiple items expanded simultaneously', () => {
//       const item1 = DcxAccordionMock[0];
//       const item2 = DcxAccordionMock[1];

//       component.toggleItem(item1);
//       component.toggleItem(item2);
//       fixture.detectChanges();

//       expect(component.isExpanded(item1.id)).toBe(true);
//       expect(component.isExpanded(item2.id)).toBe(true);
//     });

//     it('should allow closing an item independently', () => {
//       const item1 = DcxAccordionMock[0];
//       const item2 = DcxAccordionMock[1];

//       component.toggleItem(item1);
//       component.toggleItem(item2);
//       fixture.detectChanges();

//       component.toggleItem(item1);
//       fixture.detectChanges();
//       expect(component.isExpanded(item1.id)).toBe(false);
//       expect(component.isExpanded(item2.id)).toBe(true);
//     });

//     it('should emit itemToggled event when item is toggled', () => {
//       spyOn(component.itemToggled, 'emit');
//       const item = DcxAccordionMock[0];

//       component.toggleItem(item);

//       expect(component.itemToggled.emit).toHaveBeenCalledWith(item);
//     });
//   });

//   describe('isExpanded', () => {
//     it('should return true if item is expanded', () => {
//       const item = DcxAccordionMock[0];
//       component.toggleItem(item);
//       fixture.detectChanges();

//       expect(component.isExpanded(item.id)).toBe(true);
//     });

//     it('should return false if item is not expanded', () => {
//       const item = DcxAccordionMock[0];

//       expect(component.isExpanded(item.id)).toBe(false);
//     });
//   });

//   describe('getAnimationState', () => {
//     it('should return "expanded" when item is expanded', () => {
//       const item = DcxAccordionMock[0];
//       component.toggleItem(item);
//       fixture.detectChanges();

//       expect(component.getAnimationState(item.id)).toBe('expanded');
//     });

//     it('should return "collapsed" when item is not expanded', () => {
//       const item = DcxAccordionMock[0];

//       expect(component.getAnimationState(item.id)).toBe('collapsed');
//     });
//   });

//   describe('Rendering', () => {
//     it('should render all accordion items', () => {
//       const items = fixture.nativeElement.querySelectorAll('.accordion-item');

//       expect(items.length).toBe(DcxAccordionMock.length);
//     });

//     it('should render accordion headers with correct titles', () => {
//       const headers = fixture.nativeElement.querySelectorAll('.accordion-header');

//       DcxAccordionMock.forEach((item, index) => {
//         expect(headers[index].textContent).toContain(item.title);
//       });
//     });

//     it('should apply disabled class to disabled items', () => {
//       const disabledItems = fixture.nativeElement.querySelectorAll(
//         '.accordion-item.disabled'
//       );

//       expect(disabledItems.length).toBe(1);
//     });

//     it('should disable header button for disabled items', () => {
//       const buttons = fixture.nativeElement.querySelectorAll(
//         '.accordion-header'
//       );
//       const disabledButton = buttons[2];

//       expect(disabledButton.disabled).toBe(true);
//     });

//     it('should set aria-expanded attribute correctly', () => {
//       const item = DcxAccordionMock[0];
//       const headers = fixture.nativeElement.querySelectorAll(
//         '.accordion-header'
//       );
//       const header = headers[0];

//       expect(header.getAttribute('aria-expanded')).toBe('false');

//       component.toggleItem(item);
//       fixture.detectChanges();

//       expect(header.getAttribute('aria-expanded')).toBe('true');
//     });

//     it('should set aria-controls attribute correctly', () => {
//       const headers = fixture.nativeElement.querySelectorAll(
//         '.accordion-header'
//       );

//       DcxAccordionMock.forEach((item, index) => {
//         expect(headers[index].getAttribute('aria-controls')).toBe(
//           `accordion-${item.id}`
//         );
//       });
//     });
//   });

//   describe('Input Properties', () => {
//     it('should accept items input', () => {
//       expect(component.items()).toEqual(DcxAccordionMock);
//     });
//   });
// });

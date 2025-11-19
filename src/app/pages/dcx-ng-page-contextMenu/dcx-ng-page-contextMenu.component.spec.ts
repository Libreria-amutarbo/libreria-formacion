import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageContextMenuComponent } from './dcx-ng-page-contextMenu.component';

describe('PageContextMenuComponent', () => {
  let component: PageContextMenuComponent;
  let fixture: ComponentFixture<PageContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageContextMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('DCX NG Library');
    expect(compiled.querySelector('h2')?.textContent).toContain('Designs — Dev');
  });

  it('should render grid with cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBe(component.cards.length);
  });

  it('should have correct card content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const firstCard = compiled.querySelector('.card') as HTMLElement;
    expect(firstCard.querySelector('.card-icon i')).toBeTruthy();
    expect(firstCard.querySelector('.card-name')?.textContent).toBe('Accordion');
  });

  it('should return all cards when search term is empty', () => {
    component.onSearch('   ');
    fixture.detectChanges();

    expect(component.filteredCards().length).toBe(component.cards.length);
  });

  it('should filter cards by name or route when search term matches', () => {
    component.onSearch('accordion');
    fixture.detectChanges();

    const results = component.filteredCards();
    expect(results.length).toBeGreaterThan(0);
    expect(results.some(card => card.route === 'accordion')).toBe(true);
  });

  it('should return no cards when search term does not match', () => {
    component.onSearch('zzzz-no-match');
    fixture.detectChanges();

    expect(component.filteredCards()).toEqual([]);
  });
});
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

interface BootstrapIcon {
  name: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private readonly BOOTSTRAP_ICONS_URL = 
    'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json';
  
  private iconsCache$ = new BehaviorSubject<string[]>([]);
  public icons$ = this.iconsCache$.asObservable();

  constructor(private http: HttpClient) {
    this.loadIcons();
  }

  private loadIcons(): void {
    this.http.get<BootstrapIcon[]>(this.BOOTSTRAP_ICONS_URL).pipe(
      map(icons => icons.map(icon => icon.name)),
      tap(icons => this.iconsCache$.next(icons)),
      catchError(error => {
        console.error('Error loading Bootstrap Icons:', error);
        return [];
      })
    ).subscribe();
  }

  getAvailableIcons(): Observable<string[]> {
    return this.icons$;
  }

  getIconsSync(): string[] {
    return this.iconsCache$.value;
  }
}

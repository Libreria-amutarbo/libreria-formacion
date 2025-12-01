import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

interface BootstrapIcon {
  name: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private readonly http = inject(HttpClient);
  private readonly BOOTSTRAP_ICONS_URL =
    'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json';

  private readonly _icons = signal<string[] | null>(null);
  readonly icons = this._icons.asReadonly();

  constructor() { }

  loadIcons(): Observable<string[]> {
    if(this._icons() !== null) {
      return of(this._icons()!);
    }

    return this.http.get<BootstrapIcon[]>(this.BOOTSTRAP_ICONS_URL).pipe(
      map(icons => icons.map(icon => icon.name)),
      tap(icons => this._icons.set(icons)),
      catchError(error => {
        this._icons.set([]);
        return of([]);
      })
    );
  }

  getIconsSync(): string[] {
    return this._icons() ?? [];
  }
}

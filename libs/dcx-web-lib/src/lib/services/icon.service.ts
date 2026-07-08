import { from, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

interface BootstrapIcon {
  name: string;
  [key: string]: any;
}

function signal<T>(initialValue: T) {
  let value = initialValue;
  const getter = () => value;
  getter.set = (newValue: T) => {
    value = newValue;
  };
  getter.asReadonly = () => {
    return () => value;
  };
  return getter;
}

export class IconService {
  private readonly BOOTSTRAP_ICONS_URL =
    'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json';

  private readonly _icons = signal<string[] | null>(null);
  readonly icons = this._icons.asReadonly();

  private readonly http = {
    get: <T>(url: string): Observable<T> => {
      return from(
        fetch(url).then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json() as Promise<T>;
        }),
      );
    },
  };

  loadIcons(): Observable<string[]> {
    if (this._icons() !== null) {
      return of(this._icons()!);
    }

    return this.http.get<BootstrapIcon[]>(this.BOOTSTRAP_ICONS_URL).pipe(
      map(icons => icons.map(icon => icon.name)),
      tap(icons => this._icons.set(icons)),
      catchError(_error => {
        this._icons.set([]);
        return of([]);
      }),
    );
  }

  getIconsSync(): string[] {
    return this._icons() ?? [];
  }
}

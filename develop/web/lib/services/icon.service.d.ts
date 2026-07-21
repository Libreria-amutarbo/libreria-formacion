import { Observable } from 'rxjs';
export declare class IconService {
    private readonly BOOTSTRAP_ICONS_URL;
    private readonly _icons;
    readonly icons: () => string[] | null;
    private readonly http;
    loadIcons(): Observable<string[]>;
    getIconsSync(): string[];
}

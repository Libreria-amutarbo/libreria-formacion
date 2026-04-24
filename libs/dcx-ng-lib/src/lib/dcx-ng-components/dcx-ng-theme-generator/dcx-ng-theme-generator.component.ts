import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GROUPS, GROUP_LABELS } from '../../core/constants/theme-generator';
import { CAPGEMINI_THEME_TOKENS } from '../../core/mock/theme-tokens';
import {
  ThemeToken,
  ThemeTokenGroup,
} from '../../core/interfaces/theme-generator';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';


@Component({
  selector: 'dcx-ng-theme-generator',
  standalone: true,
  imports: [FormsModule, DcxNgButtonComponent, DcxNgInputComponent],
  templateUrl: './dcx-ng-theme-generator.component.html',
  styleUrls: ['./dcx-ng-theme-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgThemeGeneratorComponent {
  private readonly el = inject(ElementRef);

  tokens = input<ThemeToken[]>(CAPGEMINI_THEME_TOKENS);
  showPreview = input<boolean>(true);
  downloadFileName = input<string>('theme-client.css');

  themeChanged = output<ThemeToken[]>();
  cssGenerated = output<string>();

  readonly groups = GROUPS;
  readonly groupLabels = GROUP_LABELS;

  _tokens = signal<ThemeToken[]>([]);
  activeGroup = signal<ThemeTokenGroup>('background');

  tokensForActiveGroup = computed(() =>
    this._tokens().filter(t => t.group === this.activeGroup()),
  );

  modifiedTokens = computed(() =>
    this._tokens().filter(t => t.value !== t.defaultValue),
  );

  hasChanges = computed(() => this.modifiedTokens().length > 0);

  modifiedCountByGroup = computed(() => {
    const counts: Partial<Record<ThemeTokenGroup, number>> = {};
    this.modifiedTokens().forEach(t => {
      counts[t.group] = (counts[t.group] ?? 0) + 1;
    });
    return counts;
  });

  generatedCss = computed(() => {
    const modified = this.modifiedTokens();
    if (modified.length === 0) return '';
    const lines = modified.map(t => `  ${t.name}: ${t.value};`).join('\n');
    return `:root {\n${lines}\n}`;
  });

  private readonly _tokenMutation = effect(() => {
    this._tokens.set(this.tokens().map(t => ({ ...t })));
  });

  private readonly _cssVarSync = effect(() => {
    const el = this.el.nativeElement as HTMLElement;
    this._tokens().forEach(t => {
      el.style.setProperty(t.name, t.value);
    });
  });

  setGroup(group: ThemeTokenGroup): void {
    this.activeGroup.set(group);
  }

  isModified(token: ThemeToken): boolean {
    return token.value !== token.defaultValue;
  }

  onColorInput(event: Event, tokenName: string): void {
    const value = (event.target as HTMLInputElement).value;
    this.updateToken(tokenName, value);
  }

  onHexChange(event: Event, tokenName: string): void {
    const raw = (event.target as HTMLInputElement).value.trim();
    const value = raw.startsWith('#') ? raw : `#${raw}`;
    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      this.updateToken(tokenName, value);
    }
  }

  updateToken(name: string, value: string): void {
    this._tokens.update(tokens =>
      tokens.map(t => (t.name === name ? { ...t, value } : t)),
    );
    this.themeChanged.emit(this._tokens());
  }

  resetToken(name: string): void {
    this._tokens.update(tokens =>
      tokens.map(t => (t.name === name ? { ...t, value: t.defaultValue } : t)),
    );
    this.themeChanged.emit(this._tokens());
  }

  resetAll(): void {
    this._tokens.update(tokens =>
      tokens.map(t => ({ ...t, value: t.defaultValue })),
    );
    this.themeChanged.emit(this._tokens());
  }

  copyCss(): void {
    const css = this.generatedCss();
    if (!css) return;

    navigator.clipboard.writeText(css);
    this.cssGenerated.emit(css);
  }

  downloadCss(): void {
    const css = this.generatedCss();
    if (!css) return;

    const blob = new Blob([css], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.downloadFileName();
    a.click();
    URL.revokeObjectURL(url);
    this.cssGenerated.emit(css);
  }
}

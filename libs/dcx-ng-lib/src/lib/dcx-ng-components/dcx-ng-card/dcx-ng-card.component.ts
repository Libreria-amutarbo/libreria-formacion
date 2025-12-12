import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  input,
  computed,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BorderStyleCard,
  ShadowPresetCard,
  Variant,
} from '../../core/interfaces/card';
import { TITLE } from '../../core/mock/card';

@Component({
  selector: 'dcx-ng-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-card.component.html',
  styleUrl: './dcx-ng-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCardComponent {
  image = input<string | null>(null);
  imageAlt = input<string>('Imagen de la card');
  title = input<string>(TITLE);
  subtitle = input<string>('');

  /** Visual */
  variant = input<Variant>('elevated'); // 'elevated' | 'outlined' | 'subtle'
  layout = input<'vertical' | 'horizontal'>('vertical');
  align = input<'start' | 'center' | 'end'>('center');
  size = input<'sm' | 'md' | 'lg'>('md');

  maxContentWidth = input<string>('640px');
  maxImageWidth = input<string>('100%');

  bordered = input<boolean>(false);
  borderWidth = input<number>(1);
  borderStyle = input<BorderStyleCard>('solid');
  borderColor = input<string>('');

  shadow = input<ShadowPresetCard | 'custom'>(0);
  shadowValue = input<string>('0 2px 8px rgba(0,0,0,.10)');

  /** Interacción */
  interactive = input<boolean>(false);
  disabled = input<boolean>(false);

  /** Slots TemplateRef */
  header = input<TemplateRef<any> | null>(null);
  content = input<TemplateRef<any> | null>(null);
  footer = input<TemplateRef<any> | null>(null);

  /** Eventos */
  cardClick = output<MouseEvent | KeyboardEvent>();

  /** IDs A11y */
  headingId = computed(() =>
    this.title() ? this._id('card-title') : undefined,
  );
  descId = computed(() => this._id('card-desc'));

  role = computed<'button' | 'link' | 'region'>(() => {
    if (this.disabled()) return 'region';
    if (this.interactive()) return 'button';
    return 'region';
  });

  tabIndex = computed<number | null>(() => {
    if (this.disabled()) return -1;
    const r = this.role();
    return r === 'button' || r === 'link' ? 0 : null;
  });

  /** Clases que gobiernan layout, align, size y variant */
  innerClassMap = computed<Record<string, boolean>>(() => ({
    'layout-vertical': this.layout() === 'vertical',
    'layout-horizontal': this.layout() === 'horizontal',

    'variant-elevated': this.variant() === 'elevated',
    'variant-outline': this.variant() === 'outlined',
    'variant-subtle': this.variant() === 'subtle',

    'align-start': this.align() === 'start',
    'align-center': this.align() === 'center',
    'align-end': this.align() === 'end',

    'size-sm': this.size() === 'sm',
    'size-md': this.size() === 'md',
    'size-lg': this.size() === 'lg',
  }));

  /**
   * Variables CSS inline:
   * - Sombra: fuente única (--card-shadow) para evitar conflictos.
   * - Regla: si shadow=0 → preset según variant; si 1/2/3 o 'custom' → respetar.
   */
  innerStyleVars = computed(() => {
    // Borde: si no está bordered, width = 0; outlined => 1px si no hay bordered
    let widthPx = this.bordered() ? this.borderWidth() : 0;
    if (this.variant() === 'outlined' && !this.bordered()) widthPx = 1;

    // Sombra efectiva
    const sh = this.shadow();
    let shadowVar = 'var(--shadow-0)';

    if (sh === 'custom') {
      shadowVar = this.shadowValue();
    } else {
      shadowVar = `var(--shadow-${sh})`;
      if (sh === 0) {
        const v = this.variant();
        if (v === 'elevated') shadowVar = 'var(--shadow-1)'; // elevated por defecto con sombra 1
        if (v === 'subtle') shadowVar = 'var(--shadow-0)'; // subtle sin sombra
        // outlined: mantiene 0 si no se indica
      }
    }

    return {
      '--card-border-width': `${widthPx}px`,
      '--card-border-style': this.borderStyle(),
      '--card-border-color': this.borderColor(),

      '--card-shadow': shadowVar, // ← ÚNICA fuente de box-shadow

      '--card-max-content-width': this.maxContentWidth(),
      '--card-max-image-width': this.maxImageWidth(),
    } as Record<string, string>;
  });

  onHostClick(event: MouseEvent) {
    if (this.disabled()) return;
    if (this.interactive()) this.cardClick.emit(event);
  }

  onKeydown(event: KeyboardEvent) {
    if (this.disabled()) return;
    const key = event.key;
    if (this.role() === 'button' && (key === 'Enter' || key === ' ')) {
      event.preventDefault();
      this.cardClick.emit(event);
    }
    if (this.role() === 'link' && key === 'Enter') {
      event.preventDefault();
    }
  }

  /** Utils */
  private _id(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  }
  private _navigate(url: string, target: string) {
    if (target === '_blank') window.open(url, '_blank', 'noopener');
    else window.location.assign(url);
  }
}

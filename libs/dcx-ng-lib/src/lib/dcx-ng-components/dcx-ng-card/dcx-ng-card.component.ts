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
  variant = input<Variant>('elevated');
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

  /** Salida (activación) */
  cardClick = output<MouseEvent | KeyboardEvent>();

  /** IDs A11y (auto) */
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

  innerStyleVars = computed(() => {
    // Borde: si no está bordered, width = 0
    let widthPx = this.bordered() ? this.borderWidth() : 0;
    if (this.variant() === 'outlined' && !this.bordered()) widthPx = 1;

    // Sombra: preset (CSS var) o literal custom
    const sh = this.shadow();
    const shadowVar =
      sh === 'custom' ? this.shadowValue() : `var(--shadow-${sh})`;

    return {
      '--card-border-width': `${widthPx}px`,
      '--card-border-style': this.borderStyle(),
      '--card-border-color': this.borderColor(),
      '--card-shadow': shadowVar,

      // límites de ancho (ahora globales)
      '--card-max-content-width': this.maxContentWidth(),
      '--card-max-image-width': this.maxImageWidth(),

      // tipografía según size
      '--card-title-font-size':
        this.size() === 'sm'
          ? '1rem'
          : this.size() === 'lg'
            ? '1.25rem'
            : '1.1rem',
      '--card-subtitle-font-size':
        this.size() === 'sm'
          ? '0.85rem'
          : this.size() === 'lg'
            ? '1rem'
            : '0.9rem',
      '--card-title-font-weight': '600',
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

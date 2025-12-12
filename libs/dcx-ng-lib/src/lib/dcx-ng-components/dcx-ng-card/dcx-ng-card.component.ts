import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  input,
  computed,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderStyleCard, ShadowPresetCard } from '../../core/interfaces/card';
import { TITLE_DEFAULT } from '../../core/mock/card';
import { DcxAlign, DcxLayout, DcxSize } from '../../core/interfaces';

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
  title = input<string>(TITLE_DEFAULT);
  subtitle = input<string>('');

  /** Visual */
  layout = input<DcxLayout>('vertical');
  align = input<DcxAlign>('center');
  size = input<DcxSize>('m');

  maxContentWidth = input<string>('640px');
  maxImageWidth = input<string>('100%');

  bordered = input<boolean>(false);
  borderWidth = input<number>(1);
  borderStyle = input<BorderStyleCard>('solid');

  shadow = input<ShadowPresetCard>(0);

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

    'align-start': this.align() === 'start',
    'align-center': this.align() === 'center',
    'align-end': this.align() === 'end',

    'size-s': this.size() === 's',
    'size-m': this.size() === 'm',
    'size-l': this.size() === 'l',
  }));

  innerStyleVars = computed(() => {
    // Sombra efectiva
    const sh = this.shadow();
    let shadowVar = 'var(--shadow-0)';

    shadowVar = `var(--shadow-${sh})`;

    return {
      '--card-border-width': `${this.bordered() ? this.borderWidth() : 0}px`,
      '--card-border-style': this.borderStyle(),

      '--card-shadow': shadowVar,

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

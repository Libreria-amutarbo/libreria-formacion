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

  layout = input<DcxLayout>('vertical');
  align = input<DcxAlign>('center');
  size = input<DcxSize>('m');

  maxContentWidth = input<string>('640px');
  maxImageWidth = input<string>('100%');

  bordered = input<boolean>(false);
  borderWidth = input<number>(1);
  borderStyle = input<BorderStyleCard>('solid');

  shadow = input<ShadowPresetCard>(0);

  interactive = input<boolean>(false);
  disabled = input<boolean>(false);

  header = input<TemplateRef<any> | null>(null);
  content = input<TemplateRef<any> | null>(null);
  footer = input<TemplateRef<any> | null>(null);

  cardClick = output<MouseEvent | KeyboardEvent>();

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

    'align-start': this.align() === 'start',
    'align-center': this.align() === 'center',
    'align-end': this.align() === 'end',

    'size-s': this.size() === 's',
    'size-m': this.size() === 'm',
    'size-l': this.size() === 'l',
  }));

  /**
   * Mapea inputs a variables CSS consumidas en el SCSS.
   * Mantiene compatibilidad con las vars existentes del :host.
   */
  innerStyleVars = computed<Record<string, string | number>>(() => ({
    '--card-max-content-width': this.maxContentWidth(),
    '--card-max-image-width': this.maxImageWidth(),
    '--card-border-style': this.bordered() ? this.borderStyle() : 'solid',
    '--card-border-width': this.bordered() ? `${this.borderWidth()}px` : 0,
    '--card-shadow': this.shadowToCSS(this.shadow()),
  }));

  private shadowToCSS(preset: ShadowPresetCard): string {
    switch (preset) {
      case 1:
        return 'var(--shadow-1)';
      case 2:
        return 'var(--shadow-2)';
      case 3:
        return 'var(--shadow-3)';
      default:
        return 'var(--shadow-0)';
    }
  }

  // Eventos de interacción básicos
  onHostClick(evt: MouseEvent) {
    if (this.disabled()) return;
    this.cardClick.emit(evt);
  }

  onKeydown(evt: KeyboardEvent) {
    if (this.disabled()) return;
    // ENTER o SPACE activan click "accesible" si es interactivo
    const key = evt.key.toLowerCase();
    if (this.interactive() && (key === 'enter' || key === ' ')) {
      evt.preventDefault();
      this.cardClick.emit(evt);
    }
  }
}

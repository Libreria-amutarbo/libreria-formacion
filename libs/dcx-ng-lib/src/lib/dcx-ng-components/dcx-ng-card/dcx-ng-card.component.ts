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
  BORDER_STYLE_DEFAULT,
  BORDER_WIDTH,
  BORDERED,
  IMAGE,
  IMAGE_ALT,
  INTERACTIVE,
  MAX_CONTENT_WIDTH,
  MAX_IMAGE_WIDTH,
  SHADOW_DEFAULT,
  SUBTITLE,
  TITLE_DEFAULT,
  DcxAlign,
  DcxLayout,
  DcxSize,
  LAYOUT_DEFAULT,
  ALIGN_DEFAULT,
  SIZE_DEFAULT,
  BorderStyleCard,
  ShadowPresetCard,
  DISABLED,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-card.component.html',
  styleUrl: './dcx-ng-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCardComponent {
  image = input<string | null>(IMAGE);
  imageAlt = input<string>(IMAGE_ALT);
  title = input<string>(TITLE_DEFAULT);
  subtitle = input<string>(SUBTITLE);

  layout = input<DcxLayout>(LAYOUT_DEFAULT);
  align = input<DcxAlign>(ALIGN_DEFAULT);
  size = input<DcxSize>(SIZE_DEFAULT);

  maxContentWidth = input<string>(MAX_CONTENT_WIDTH);
  maxImageWidth = input<string>(MAX_IMAGE_WIDTH);

  bordered = input<boolean>(BORDERED);
  borderWidth = input<number>(BORDER_WIDTH);
  borderStyle = input<BorderStyleCard>(BORDER_STYLE_DEFAULT);

  shadow = input<ShadowPresetCard>(SHADOW_DEFAULT);

  interactive = input<boolean>(INTERACTIVE);
  disabled = input<boolean>(DISABLED);

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

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  contentChild,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { DcxPosition } from '../../core/interfaces/generic';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';

@Component({
  selector: 'dcx-ng-drawer',
  standalone: true,
  imports: [NgTemplateOutlet, DcxNgButtonComponent],
  templateUrl: './dcx-ng-drawer.component.html',
  styleUrl: './dcx-ng-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgDrawerComponent {
  private static globalZIndex = 0;

  readonly visible = input<boolean>(false);
  readonly position = input<DcxPosition>('left');
  readonly modal = input<boolean>(true);
  readonly dismissible = input<boolean>(true);
  readonly showCloseIcon = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly blockScroll = input<boolean>(true);
  readonly fullScreen = input<boolean>(false);
  readonly size = input<string>('22rem');
  readonly baseZIndex = input<number>(1000);
  readonly autoZIndex = input<boolean>(true);
  readonly header = input<string>('');
  readonly footer = input<string>('');

  readonly visibleChange = output<boolean>();
  readonly show = output<void>();
  readonly hide = output<void>();

  readonly headerTemplate = contentChild<TemplateRef<unknown>>('drawerHeader');
  readonly footerTemplate = contentChild<TemplateRef<unknown>>('drawerFooter');

  private wasVisible = false;
  private hideAlreadyEmitted = false;
  private readonly currentZIndex = signal(1000);

  readonly drawerClasses = computed(() => {
    const base = 'dcx-drawer';

    return [
      base,
      `${base}--${this.position()}`,
      this.fullScreen() ? `${base}--fullscreen` : '',
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly maskClasses = computed(() => 'dcx-drawer-mask');

  readonly resolvedBaseZIndex = computed(() => this.currentZIndex());

  readonly _zIndexEffect = effect(() => {
    const baseZIndex = this.baseZIndex();
    const isVisible = this.visible();
    const autoZIndex = this.autoZIndex();

    if (!isVisible || !autoZIndex) {
      this.currentZIndex.set(baseZIndex);
      return;
    }

    DcxNgDrawerComponent.globalZIndex = Math.max(
      DcxNgDrawerComponent.globalZIndex,
      baseZIndex,
    );
    DcxNgDrawerComponent.globalZIndex += 2;
    this.currentZIndex.set(DcxNgDrawerComponent.globalZIndex);
  });

  readonly panelWidth = computed(() => {
    if (this.fullScreen()) return '100%';

    const position = this.position();
    if (position === 'left' || position === 'right') return this.size();
    return null;
  });

  readonly panelHeight = computed(() => {
    if (this.fullScreen()) return '100%';

    const position = this.position();
    if (position === 'top' || position === 'bottom') return this.size();
    return null;
  });

  readonly hasHeader = computed(
    () => !!this.headerTemplate() || !!this.header() || this.showCloseIcon(),
  );

  readonly hasFooter = computed(
    () => !!this.footerTemplate() || !!this.footer(),
  );

  readonly _visibilityEffect = effect(() => {
    const isVisible = this.visible();

    if (isVisible && !this.wasVisible) {
      this.show.emit();
    }

    if (!isVisible && this.wasVisible) {
      if (this.hideAlreadyEmitted) {
        this.hideAlreadyEmitted = false;
      } else {
        this.hide.emit();
      }
    }

    this.wasVisible = isVisible;
  });

  readonly _escapeEffect = effect(onCleanup => {
    if (!this.visible() || !this.closeOnEscape()) return;

    const handleKeydown = (event: KeyboardEvent): void => {
      if (event.key !== 'Escape') return;
      this.close();
    };

    document.addEventListener('keydown', handleKeydown);

    onCleanup(() => {
      document.removeEventListener('keydown', handleKeydown);
    });
  });

  readonly _blockScrollEffect = effect(onCleanup => {
    if (!this.visible() || !this.modal() || !this.blockScroll()) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    onCleanup(() => {
      document.body.style.overflow = previousOverflow;
    });
  });

  readonly ariaModal = computed<'true' | null>(() =>
    this.modal() ? 'true' : null,
  );

  get ariaModalValue(): 'true' | null {
    return this.ariaModal();
  }

  close = (): void => {
    if (!this.visible()) return;

    this.hideAlreadyEmitted = true;
    this.visibleChange.emit(false);
    this.hide.emit();
  };

  onMaskPointerDown = (event: MouseEvent): void => {
    event.stopPropagation();
    if (!this.dismissible()) return;
    this.close();
  };
}

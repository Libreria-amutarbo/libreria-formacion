import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  DcxPosition,
  DcxNgButtonComponent,
} from '@dcx-ng-components/dcx-ng-lib';

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
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private appliedHostStyleClasses: string[] = [];
  private appliedHostMaskClasses: string[] = [];

  readonly visible = input<boolean>(false);
  readonly position = input<DcxPosition>('left');
  readonly modal = input<boolean>(true);
  readonly dismissible = input<boolean>(true);
  readonly showCloseIcon = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly blockScroll = input<boolean>(true);
  readonly fullScreen = input<boolean>(false);
  readonly size = input<string>('22rem');
  readonly styleClass = input<string>('');
  readonly maskStyleClass = input<string>('');
  readonly baseZIndex = input<number>(1000);
  readonly autoZIndex = input<boolean>(true);
  readonly header = input<string>('');

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
      this.styleClass().trim(),
    ]
      .filter(Boolean)
      .join(' ');
  });

  readonly maskClasses = computed(() => {
    const base = 'dcx-drawer-mask';

    return [base, this.maskStyleClass().trim()].filter(Boolean).join(' ');
  });

  readonly _hostClassEffect = effect(() => {
    const host = this.hostElement.nativeElement;
    const nextStyleClasses = this.styleClass()
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const nextMaskClasses = this.maskStyleClass()
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    for (const className of this.appliedHostStyleClasses) {
      if (!nextStyleClasses.includes(className)) {
        host.classList.remove(className);
      }
    }

    for (const className of this.appliedHostMaskClasses) {
      if (!nextMaskClasses.includes(className)) {
        host.classList.remove(className);
      }
    }

    for (const className of nextStyleClasses) {
      host.classList.add(className);
    }

    for (const className of nextMaskClasses) {
      host.classList.add(className);
    }

    this.appliedHostStyleClasses = nextStyleClasses;
    this.appliedHostMaskClasses = nextMaskClasses;
  });

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

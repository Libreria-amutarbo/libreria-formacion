import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
  signal,
  TemplateRef,
  untracked,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  DcxInputType,
  DcxSelectOptions,
  DcxSpacing,
} from '../../core/interfaces';
import {
  PLACEHOLDER,
  SEARCHABLE,
  CLEARABLE,
  DISABLED,
  REQUIRED,
  ISINVALID,
  ERRORICON,
  VALUEINPUT,
  SPACING_DEFAULT,
} from '../../core/defaults';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgInputComponent } from '../dcx-ng-input/dcx-ng-input.component';

type DcxSelectValue = string | number | null;
type MoveDirection = 'next' | 'prev' | 'first' | 'last';

// Debajo del control por defecto; si no cabe, se voltea encima. El panel
// se renderiza vía CDK Overlay (portal a document.body) para no depender
// de que ningún ancestro tenga overflow visible (diálogos, tarjetas, etc.).
const PANEL_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
];

@Component({
  selector: 'dcx-ng-select',
  standalone: true,
  templateUrl: './dcx-ng-select.component.html',
  styleUrls: ['./dcx-ng-select.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DcxNgButtonComponent,
    DcxNgIconComponent,
    DcxNgInputComponent,
  ],
  providers: [
    {
      /**Con ControlValueAccessor podemos usar ese select en:

* - Reactive Forms
   * - Template-driven forms
   * - formControlName
   * - ngModel

        */
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcxNgSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgSelectComponent implements OnDestroy {
  private readonly el: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly inputType = DcxInputType;

  // Inputs
  label = input('');
  options = input<DcxSelectOptions[]>([]);
  placeholder = input(PLACEHOLDER);
  ariaLabel = input<string | null>(null);
  searchable = input(SEARCHABLE, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  clearable = input(CLEARABLE, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  disabled = input(DISABLED, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  required = input(REQUIRED, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  isInvalid = input(ISINVALID, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });
  errorMessage = input<string | null>('');
  // Icono del mensaje de error (por defecto info-circle)
  errorIcon = input<string>(ERRORICON);
  valueInput = input<DcxSelectValue>(VALUEINPUT);
  spacing = input<DcxSpacing>(SPACING_DEFAULT);

  // Control de estado
  /**
   * Si viene de Angular Form el valor llega a writeValue()
   * Si no usan Form llegará aqui
   */
  value = signal<DcxSelectValue>(null);

  private receivedFromForm = signal(false);
  isOpen = signal(false);
  search = signal('');

  // Opción resaltada por teclado mientras el panel está abierto (patrón
  // aria-activedescendant); distinta de `value`, que solo cambia al confirmar.
  activeIndex = signal(-1);

  filtered = computed(() => {
    const term = this.search().toLowerCase();
    return this.options().filter(o => o.label.toLowerCase().includes(term));
  });

  selectedLabel = computed(() => {
    const val = this.value();
    if (val === null) return this.placeholder();

    const opt = this.options().find(o => o.value === val);
    return opt?.label ?? this.placeholder();
  });

  selectControlClasses = computed<string>(() => {
    const base = 'dcx-ng-select__control';
    const sizeValue = this.spacing();
    return [base, `${base}--${sizeValue}`].filter(Boolean).join(' ');
  });

  //IDs accesibles
  selectId = `select-${Math.random().toString(36).substring(2)}`;
  labelId = `${this.selectId}-label`;

  // Eventos
  valueChange = output<string | number | null>();
  clear = output<void>();

  @ViewChild('controlEl') controlEl!: ElementRef<HTMLElement>;
  @ViewChild('panelTemplate') panelTemplate!: TemplateRef<unknown>;
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  private overlayRef: OverlayRef | null = null;

  // Si NO ha venido desde writeValue() (no es formControlName) pero sí viene
  // un valor desde [valueInput], se usa como valor actual. Reactivo: un
  // cambio posterior de [valueInput] también se aplica, salvo que el
  // formulario ya haya tomado el control.
  private readonly _initEffect = effect(() => {
    const initial = this.valueInput();
    const fromForm = untracked(() => this.receivedFromForm());
    if (!fromForm && initial !== null) {
      this.value.set(initial);
    }
  });

  // ControlValueAccessor
  private onChange: (value: DcxSelectValue) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  ngOnDestroy(): void {
    this.overlayRef?.dispose();
  }

  // Escribe en la signal value el valor desde el formulario
  writeValue(val: DcxSelectValue): void {
    this.receivedFromForm.set(true);
    this.value.set(val);
  }

  // Se notifica cuando el valor se ha modificado
  registerOnChange(fn: (value: DcxSelectValue) => void): void {
    this.onChange = fn;
  }

  // Se notifica cuando se hace click en el componente
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  toggle(): void {
    if (this.disabled()) return;
    if (this.isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  private open(): void {
    const opts = this.filtered();
    const currentIndex = opts.findIndex(o => o.value === this.value());
    this.activeIndex.set(currentIndex >= 0 ? currentIndex : 0);
    this.isOpen.set(true);

    const width = this.controlEl.nativeElement.getBoundingClientRect().width;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.controlEl)
      .withPositions(PANEL_POSITIONS)
      .withFlexibleDimensions(false)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width,
    });

    this.overlayRef
      .outsidePointerEvents()
      .subscribe(() => this.close());

    this.overlayRef.attach(
      new TemplatePortal(this.panelTemplate, this.viewContainerRef),
    );

    if (this.searchable()) {
      queueMicrotask(() => this.searchInput?.nativeElement?.focus());
    }

    queueMicrotask(() => {
      document
        .getElementById(`${this.selectId}-opt-${this.activeIndex()}`)
        ?.scrollIntoView({ block: 'nearest' });
    });
  }

  // Al seleccionar una opción del listado se actualizan las signals, se notifica al formulario y se emite el evento de cambio
  selectOption(opt: { value: string | number }): void {
    this.value.set(opt.value);
    this.onChange(opt.value);
    this.valueChange.emit(opt.value);
    this.close();
  }

  //Limpia el valor actual del select
  clearValue(ev: Event): void {
    this.search.set('');
    ev.stopPropagation();
    this.value.set(null);
    this.onChange(null);
    this.clear.emit();
  }

  onSearchChange(value: string | number | null): void {
    this.search.set(value === null ? '' : String(value));
    this.activeIndex.set(this.filtered().length > 0 ? 0 : -1);
  }

  @HostListener('keydown', ['$event'])
  onKey(ev: KeyboardEvent): void {
    if (!this.isOpen()) {
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') {
        ev.preventDefault();
        this.open();
      }
      return;
    }

    switch (ev.key) {
      case 'ArrowDown':
        ev.preventDefault();
        this.moveActive('next');
        break;
      case 'ArrowUp':
        ev.preventDefault();
        this.moveActive('prev');
        break;
      case 'Home':
        ev.preventDefault();
        this.moveActive('first');
        break;
      case 'End':
        ev.preventDefault();
        this.moveActive('last');
        break;
      case 'Enter':
        ev.preventDefault();
        this.confirmActive();
        break;
      case 'Escape':
        ev.preventDefault();
        this.close();
        this.controlEl.nativeElement.focus();
        break;
    }
  }

  private close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.isOpen.set(false);
    this.activeIndex.set(-1);
  }

  private moveActive(direction: MoveDirection): void {
    const opts = this.filtered();
    const enabledIndices = opts
      .map((o, i) => (o.disabled ? -1 : i))
      .filter(i => i >= 0);
    if (!enabledIndices.length) return;

    const currentPos = enabledIndices.indexOf(this.activeIndex());
    let nextPos: number;

    switch (direction) {
      case 'next':
        nextPos =
          currentPos < 0 ? 0 : (currentPos + 1) % enabledIndices.length;
        break;
      case 'prev':
        nextPos =
          currentPos < 0
            ? enabledIndices.length - 1
            : (currentPos - 1 + enabledIndices.length) % enabledIndices.length;
        break;
      case 'first':
        nextPos = 0;
        break;
      case 'last':
        nextPos = enabledIndices.length - 1;
        break;
    }

    this.activeIndex.set(enabledIndices[nextPos]);
  }

  private confirmActive(): void {
    const opt = this.filtered()[this.activeIndex()];
    if (opt && !opt.disabled) this.selectOption(opt);
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  OnInit,
  output,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {
  DcxNgButtonComponent,
  DcxNgIconComponent,
  DcxSelectOptions,
  CLEARABLE,
  ERRORICON,
  ISINVALID,
  PLACEHOLDER,
  REQUIRED,
  SEARCHABLE,
  SPACING,
  VALUEINPUT,
  DcxSpacing,
  DISABLED,
} from '@dcx-ng-components/dcx-ng-lib';

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
})
export class DcxNgSelectComponent implements OnInit {
  //Inputs
  label = input('');
  options = input<DcxSelectOptions[]>([]);
  placeholder = input(PLACEHOLDER);
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
  valueInput = input<string | null>(VALUEINPUT);
  spacing = input<DcxSpacing>(SPACING);

  // Control de estado
  /**
   * Si viene de Angular Form el valor llega a writeValue()
   * Si no usan Form llegará aqui
   */
  value = signal<string | null>(null);

  private receivedFromForm = signal(false);
  isOpen = signal(false);
  search = signal('');

  filtered = computed(() => {
    const term = this.search().toLowerCase();
    return this.options().filter(o => o.label.toLowerCase().includes(term));
  });

  selectedLabel = computed(() => {
    const val = this.value();
    if (!val) return this.placeholder();

    const opt = this.options().find(o => o.value === val);
    return opt?.label ?? this.placeholder();
  });

  selectContolClasses = computed<string>(() => {
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

  // Input de búsqueda
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  @ViewChildren('optionEl') optionEls!: QueryList<ElementRef<HTMLDivElement>>;

  ngOnInit(): void {
    // Si NO ha venido desde writeValue() (no es formControlName)
    // pero sí viene un valor desde [value], úsalo como predeterminado
    const initial = this.valueInput();
    if (!this.receivedFromForm() && initial !== null) {
      this.value.set(initial);
    }
  }

  // ControlValueAccessor
  onChange = (_v: any) => { };
  onTouched = () => { };

  onOptionSpace(event: Event, opt: any) {
    (event as KeyboardEvent).preventDefault();

    if (!opt.disabled) {
      this.selectOption(opt);
    }
  }

  // Escribe en la signal value el valor desde el formulario
  writeValue(val: any) {
    this.receivedFromForm.set(true);
    this.value.set(val);
  }

  // Se notifica cuando el valor se ha modificado
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // Se notifica cuando se hace click en el componente
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  toggle(): void {
    if (this.disabled()) return;

    this.isOpen.update(v => !v);

    if (this.isOpen()) {
      //Si el listado se abre y el componente es searchable, se hace focus en el input de búsqueda
      if (this.searchable()) {
        queueMicrotask(() => this.searchInput?.nativeElement?.focus());
      }

      // 2) Scroll hacia la opción seleccionada (si existe)
      queueMicrotask(() => {
        const selected = this.optionEls?.find(el =>
          el.nativeElement.classList.contains('is-selected'),
        );

        if (selected) {
          selected.nativeElement.scrollIntoView({ block: 'nearest' });
        }
      });
    }
  }

  // Al seleccionar una opción del listado se actualizan las signals, se notifica al formulario y se emite el evento de cambio
  selectOption(opt: { value: string }) {
    this.value.set(opt.value);
    this.onChange(opt.value);
    this.valueChange.emit(opt.value);
    this.isOpen.set(false);
  }

  //Limpia el valor actual del select
  clearValue(ev: Event) {
    this.search.set('');
    ev.stopPropagation();
    this.value.set(null);
    this.onChange(null);
    this.clear.emit();
  }

  @HostListener('keydown', ['$event'])
  onKey(ev: KeyboardEvent): void {
    if (!this.isOpen()) return;

    const opts = this.filtered();
    const idx = opts.findIndex(o => o.value === this.value());

    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      const next = opts[idx + 1] ?? opts[0];
      this.value.set(next.value);
    }

    if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      const prev = opts[idx - 1] ?? opts[opts.length - 1]!;
      this.value.set(prev.value);
    }

    if (ev.key === 'Enter') {
      ev.preventDefault();
      const selected = opts.find(o => o.value === this.value());
      if (selected) this.selectOption(selected);
    }

    if (ev.key === 'Escape') this.isOpen.set(false);
  }
}

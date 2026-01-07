import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { DcxDropdownOptions, DropdownTrigger } from '../../core/interfaces/dropdown';
import { ButtonVariant } from '../../core/interfaces/button';

@Component({
  selector: 'dcx-ng-dropdown',
  standalone: true,
  imports: [CommonModule, DcxNgButtonComponent, DcxNgIconComponent],
  templateUrl: './dcx-ng-dropdown.component.html',
  styleUrls: ['./dcx-ng-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class DcxNgDropdownComponent {
  // Inputs
  readonly dropdownOptions = input.required<DcxDropdownOptions[]>();
  readonly placeholder = input<string>('Select an option');
  readonly disabled = input<boolean>(false);
  readonly selectedKey = input<string | null>(null);
  readonly buttonIcon = input<string>(''); // Icono del botón principal
  readonly trigger = input<DropdownTrigger>('click'); // 'click' o 'hover'
  readonly buttonVariant = input<ButtonVariant>('secondary');
  readonly buttonSize = input<'s' | 'm' | 'l'>('m');

  // Outputs
  readonly selectedKeyChange = output<string | null>();
  readonly optionSelected = output<DcxDropdownOptions>();
  readonly opened = output<void>();
  readonly closed = output<void>();

  // Internal state
  private readonly _open = signal<boolean>(false);
  private hoverTimeout: any = null;

  // Computed
  readonly isOpen = computed(() => this._open());
  
  readonly displayLabel = computed(() => {
    const key = this.selectedKey();
    if (!key) return this.placeholder();

    const opt = this.findByKey(key);
    return opt ? this.valueToString(opt.value) : this.placeholder();
  });

  readonly displayIcon = computed(() => {
    const key = this.selectedKey();
    const buttonIcon = this.buttonIcon();
    
    // Prioridad: icono del botón > icono de la opción seleccionada
    if (buttonIcon) return buttonIcon;
    
    if (!key) return '';
    
    const opt = this.findByKey(key);
    return opt?.icon || '';
  });

  readonly visibleOptions = computed(() => {
    return this.dropdownOptions().filter(opt => !opt.divider);
  });

  constructor(private host: ElementRef<HTMLElement>) {
    // Effect to sync selectedKey changes
    effect(() => {
      const key = this.selectedKey();
      // Se puede usar para validación o lógica adicional
    });
  }

  onDocumentClick(ev: MouseEvent): void {
    if (!this._open()) return;
    if (this.trigger() === 'hover') return; // No cerrar con click si es hover

    const root = this.host.nativeElement;
    const target = ev.target as Node | null;
    if (target && !root.contains(target)) {
      this.close();
    }
  }

  onMouseEnter(): void {
    if (this.trigger() !== 'hover' || this.disabled()) return;
    
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    
    this.open();
  }

  onMouseLeave(): void {
    if (this.trigger() !== 'hover' || this.disabled()) return;
    
    this.hoverTimeout = setTimeout(() => {
      this.close();
    }, 200); // Pequeño delay para evitar cierre accidental
  }

  toggle(): void {
    if (this.disabled()) return;
    if (this.trigger() !== 'click') return; // Solo toggle en modo click

    if (this._open()) {
      this.close();
    } else {
      this.open();
    }
  }

  open(): void {
    if (this.disabled() || this._open()) return;
    
    this._open.set(true);
    this.opened.emit();
  }

  close(): void {
    if (!this._open()) return;
    
    this._open.set(false);
    this.closed.emit();
  }

  select(item: DcxDropdownOptions): void {
    if (this.disabled() || item.disabled || item.divider) return;

    this.selectedKeyChange.emit(item.key);
    this.optionSelected.emit(item);
    this.close();
  }

  findByKey(key: string): DcxDropdownOptions | undefined {
    return this.dropdownOptions().find(o => o.key === key);
  }

  isSelected(item: DcxDropdownOptions): boolean {
    return this.selectedKey() === item.key;
  }

  isDivider(item: DcxDropdownOptions): boolean {
    return item.divider === true;
  }

  valueToString(v: string | number): string {
    return String(v);
  }

  getTriggerLabel(): string {
    return this.trigger() === 'hover' ? 'Hover to open' : 'Click to open';
  }
}

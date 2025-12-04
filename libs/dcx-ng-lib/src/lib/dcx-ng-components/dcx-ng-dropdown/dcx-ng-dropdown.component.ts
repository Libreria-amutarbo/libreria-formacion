import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { DcxNgButtonComponent } from '../dcx-ng-button/dcx-ng-button.component';
import { DcxDropdownOptions } from '../../core/interfaces/dropdown';

@Component({
  selector: 'dcx-ng-dropdown',
  standalone: true,
  imports: [DcxNgButtonComponent],
  templateUrl: './dcx-ng-dropdown.component.html',
  styleUrls: ['./dcx-ng-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgDropdownComponent {
  @Input({ required: true }) dropdownOptions: DcxDropdownOptions[] = [];
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() set selectedKey(key: string | null | undefined) {
    this._selectedKey.set(key ?? null);
  }

    get selectedKey(): string | null {
    return this._selectedKey();
  }

  @Output() selectedKeyChange = new EventEmitter<string | null>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(ev: MouseEvent): void {
    if (!this._open()) return;

    const root = this.host.nativeElement;
    const target = ev.target as Node | null;
    if (target && !root.contains(target)) {
      this._open.set(false);
    }
  }



  _open: WritableSignal<boolean> = signal(false);
  _selectedKey: WritableSignal<string | null> = signal<string | null>(null);

  displayLabel: Signal<string> = computed(() => {
    const key = this._selectedKey();
    if (!key) return this.placeholder;

    const opt = this.findByKey(key);
    return opt ? this.valueToString(opt.value) : this.placeholder;
  });

  constructor(private host: ElementRef<HTMLElement>) { }

  toggle(): void {
    if (this.disabled) return;

    this._open.set(!this._open());
  }

  select(item: DcxDropdownOptions): void {
    if (this.disabled) return;

    this._selectedKey.set(item.key);
    this.selectedKeyChange.emit(item.key);
    this._open.set(false);
  }

  findByKey(key: string): DcxDropdownOptions | undefined {
    return this.dropdownOptions.find(o => o.key === key);
  }

  isSelected(item: DcxDropdownOptions): boolean {
    return this._selectedKey() === item.key;
  }

  valueToString(v: string | number): string {
    return String(v);
  }
}

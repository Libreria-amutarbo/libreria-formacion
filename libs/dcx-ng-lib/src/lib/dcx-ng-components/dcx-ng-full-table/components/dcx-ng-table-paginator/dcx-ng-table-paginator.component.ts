import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { DcxNgIconComponent } from '../../../dcx-ng-icon/dcx-ng-icon.component';
import { DcxNgSelectComponent } from '../../../dcx-ng-select/dcx-ng-select.component';

@Component({
  selector: 'dcx-ng-table-paginator',
  standalone: true,
  imports: [DcxNgIconComponent, DcxNgSelectComponent],
  templateUrl: './dcx-ng-table-paginator.component.html',
  styleUrl: './dcx-ng-table-paginator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgTablePaginatorComponent {
  // ============ INPUTS ============
  readonly length = input.required<number>();

  /** Índice de página actual */
  readonly pageIndex = input(0);

  /** Tamaño de página actual */
  readonly pageSize = input(10);

  /** Opciones de tamaño de página */
  readonly pageSizeOptions = input<readonly number[]>([5, 10, 20]);

  /** Texto de la etiqueta de filas por página */
  readonly rowsPerPageLabel = input('Filas:');

  /** Permite ocultar el paginador de forma declarativa */
  readonly show = input(true);

  // ============ OUTPUTS ============
  readonly pageChange = output<number>();

  /** Emite el nuevo tamaño de página cuando el usuario lo cambia */
  readonly rowsPerPageChange = output<number>();

  // ============ DERIVADOS ============
  readonly totalPages = computed(() => {
    const total = this.length();
    const size = this.pageSize() || 10;
    return Math.max(1, Math.ceil(total / size));
  });

  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i),
  );

  readonly pageStart = computed(() => {
    const total = this.length();
    return total ? this.pageIndex() * this.pageSize() + 1 : 0;
  });

  readonly pageEnd = computed(() => {
    const total = this.length();
    return total
      ? Math.min((this.pageIndex() + 1) * this.pageSize(), total)
      : 0;
  });

  readonly rowsPerPageOptionsFormatted = computed(() =>
    this.pageSizeOptions().map(value => ({ value, label: String(value) })),
  );

  // ============ HANDLERS ============
  onRowsPerPageSelect(size: number | string | null): void {
    if (size === null) return;
    const parsed = Number(size);
    const validSize = Number.isFinite(parsed) && parsed > 0 ? parsed : 10;
    this.rowsPerPageChange.emit(validSize);
  }

  goToPage(page: number): void {
    const clamped = Math.max(0, Math.min(page, this.totalPages() - 1));
    if (clamped === this.pageIndex()) return;
    this.pageChange.emit(clamped);
  }
}

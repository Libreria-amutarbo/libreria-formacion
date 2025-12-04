import { Directive, TemplateRef, input } from '@angular/core';

/**
 * Directiva para registrar templates externos de la tabla.
 *
 * Uso:
 * ```html
 * <ng-template dcxNgFullTableTemplate="price" let-row>
 *   {{ row.amount | currency }}
 * </ng-template>
 * ```
 */
@Directive({
  selector: 'ng-template[dcxNgFullTableTemplate]',
  standalone: true,
})
export class DcxNgFullTableTemplateDirective {
  /**
   * Nombre del template. Debe coincidir con `header.template`,
   * `header.headerTemplate` o claves internas como 'cell-default', 'header-default', 'menu-default'.
   */
  readonly dcxNgFullTableTemplate = input.required<string>();

  get type(): string {
    return this.dcxNgFullTableTemplate();
  }

  constructor(public readonly template: TemplateRef<unknown>) {}
}

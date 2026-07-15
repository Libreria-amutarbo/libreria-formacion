import { Directive, TemplateRef, input } from '@angular/core';

/**
 * Directiva para registrar templates externos de la tabla.
 *
 * Uso:
 * ```html
 * <ng-template dcxNgTableTemplate="price" let-row>
 *   {{ row.amount | currency }}
 * </ng-template>
 * ```
 */
@Directive({
  selector: 'ng-template[dcxNgTableTemplate]',
  standalone: true,
})
export class DcxNgTableTemplateDirective {
  /**
   * Nombre del template. Debe coincidir con `header.template`,
   * `header.headerTemplate` o la clave interna `'empty'`.
   */
  readonly dcxNgTableTemplate = input.required<string>();

  get type(): string {
    return this.dcxNgTableTemplate();
  }

  constructor(public readonly template: TemplateRef<unknown>) {}
}

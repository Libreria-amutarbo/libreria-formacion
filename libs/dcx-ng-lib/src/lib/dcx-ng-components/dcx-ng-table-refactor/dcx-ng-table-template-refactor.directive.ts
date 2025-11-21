import { Directive, TemplateRef, input } from '@angular/core';

/* eslint-disable @angular-eslint/directive-selector */

/**
 * Directiva para registrar templates externos de la tabla.
 *
 * Uso:
 * ```html
 * <ng-template dcxNgTableTemplateRefactor="price" let-row>
 *   {{ row.amount | currency }}
 * </ng-template>
 * ```
 */
@Directive({
  selector: 'ng-template[dcxNgTableTemplateRefactor]',
  standalone: true,
})
export class DcxNgTableTemplateRefactorDirective {
  /**
   * Nombre del template. Debe coincidir con `header.template`,
   * `header.headerTemplate` o claves internas como 'cell-default', 'header-default', 'menu-default'.
   */
  readonly dcxNgTableTemplateRefactor = input.required<string>();

  get type(): string {
    return this.dcxNgTableTemplateRefactor();
  }

  constructor(public readonly template: TemplateRef<unknown>) {}
}

import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import '../../../../libs/dcx-web-lib/src/lib/dcx-web-components/dcx-web-picklist/dcx-web-picklist.component';

import type { DcxPickListItem } from '../../../../libs/dcx-web-lib/src/lib/core/interfaces/picklist';
import {
  PICKLIST_AVAILABLE_COURSES,
  PICKLIST_SELECTED_COURSES,
} from '../../../../libs/dcx-web-lib/src/lib/core/fixtures/picklist';

@customElement('dcx-web-page-picklist')
export class DcxWebPagePicklist extends LitElement {
  @state()
  accessor basicSource: DcxPickListItem[] = PICKLIST_AVAILABLE_COURSES.slice(0, 4);

  @state()
  accessor basicTarget: DcxPickListItem[] = PICKLIST_SELECTED_COURSES.slice(0, 1);

  @state()
  accessor filterSource: DcxPickListItem[] = PICKLIST_AVAILABLE_COURSES;

  @state()
  accessor filterTarget: DcxPickListItem[] = PICKLIST_SELECTED_COURSES;

  @state()
  accessor templateSource: DcxPickListItem[] = PICKLIST_AVAILABLE_COURSES;

  @state()
  accessor templateTarget: DcxPickListItem[] = PICKLIST_SELECTED_COURSES;

  @state()
  accessor disabledSource: DcxPickListItem[] = PICKLIST_AVAILABLE_COURSES.slice(0, 4);

  @state()
  accessor disabledTarget: DcxPickListItem[] = PICKLIST_SELECTED_COURSES.slice(0, 1);

  @state()
  accessor itemDisabledSource: DcxPickListItem[] = PICKLIST_AVAILABLE_COURSES.map((item, index) => ({
    ...item,
    disabled: index === 1,
  }));

  @state()
  accessor itemDisabledTarget: DcxPickListItem[] = PICKLIST_SELECTED_COURSES;

  @state()
  accessor controlsSource: DcxPickListItem[] = PICKLIST_AVAILABLE_COURSES;

  @state()
  accessor controlsTarget: DcxPickListItem[] = PICKLIST_SELECTED_COURSES;

  static override styles = css`
    :host {
      display: block;
      padding: var(--sp-8, 32px);
      font-family: var(--ff-base, 'Inter', sans-serif);
      color: var(--text-dark, #2a2e33);
    }

    .demo-page {
      width: 100%;
      max-width: 980px;
      padding-bottom: var(--sp-12, 48px);
    }

    .demo-page-header {
      margin-bottom: var(--sp-8, 32px);
    }

    .demo-page-header__kicker {
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-semibold, 600);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-muted, #696e75);
      margin-bottom: var(--sp-1, 4px);
    }

    .demo-page-header__title {
      font-size: var(--fs-2xl, 24px);
      font-weight: var(--fw-bold, 700);
      color: var(--text-dark, #2a2e33);
      margin: 0 0 var(--sp-2, 8px);
    }

    .demo-page-header__desc {
      font-size: var(--fs-base, 14px);
      line-height: 1.65;
      color: var(--text-muted, #696e75);
      max-width: 760px;
      margin: 0 0 var(--sp-5, 20px);
    }

    .demo-page-header__divider {
      border: none;
      border-top: 1px solid var(--border-light, #d1d5db);
      margin: 0;
    }

    .demo-section {
      background: var(--bg-default, #ffffff);
      border: 1px solid var(--border-light, #d1d5db);
      border-radius: var(--r-lg, 8px);
      margin-bottom: var(--sp-5, 20px);
      overflow: hidden;
    }

    .demo-section__header {
      display: flex;
      align-items: center;
      gap: var(--sp-2, 8px);
      padding: var(--sp-2, 8px) var(--sp-4, 16px);
      background: var(--bg-surface, #f4f5f7);
      border-bottom: 1px solid var(--border-light, #d1d5db);
    }

    .demo-section__num {
      font-size: 10px;
      font-weight: var(--fw-bold, 700);
      color: var(--text-muted, #696e75);
      background: var(--bg-sidebar, #f0f2f5);
      border-radius: var(--r-sm, 4px);
      padding: 2px var(--sp-2, 8px);
    }

    .demo-section__title {
      font-size: var(--fs-sm, 12px);
      font-weight: var(--fw-semibold, 600);
      color: var(--text-dark, #2a2e33);
    }

    .demo-section__desc {
      padding: var(--sp-2, 8px) var(--sp-4, 16px) 0;
      font-size: var(--fs-sm, 12px);
      line-height: 1.55;
      color: var(--text-muted, #696e75);
      margin: 0;
    }

    .demo-section__body {
      padding: var(--sp-5, 20px) var(--sp-4, 16px);
    }

    .course-option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      min-width: 0;
      padding: 0.5rem 0.75rem;
    }

    .course-option--selected {
      background: rgba(0, 88, 171, 0.04);
    }

    .course-option__initial {
      display: inline-flex;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 6px;
      background: var(--color-info-bg, #eff6ff);
      color: var(--bg-primary, #0058ab);
      font-weight: var(--fw-bold, 700);
    }

    .course-option__content {
      display: flex;
      flex: 1;
      min-width: 0;
      flex-direction: column;
    }

    .course-option__content strong,
    .course-option__content small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .course-option__content small {
      color: var(--text-muted, #696e75);
    }

    .course-option__badge {
      flex: 0 0 auto;
      padding: 0.125rem 0.5rem;
      border-radius: 999px;
      background: var(--color-success-bg, #f0fdf4);
      color: var(--color-success, #16a34a);
      font-size: var(--fs-xs, 11px);
      font-weight: var(--fw-bold, 700);
    }

    dcx-web-picklist {
      display: block;
      width: 100%;
    }
  `;

  private onBasicSourceChange = (event: CustomEvent<DcxPickListItem[]>) => {
    this.basicSource = [...(event.detail ?? [])];
  };

  private onBasicTargetChange = (event: CustomEvent<DcxPickListItem[]>) => {
    this.basicTarget = [...(event.detail ?? [])];
  };

  private onFilterSourceChange = (_event: CustomEvent<{ value: DcxPickListItem[] }>) => {
    // Keep the full source list intact; filtering is visual-only inside the component.
    this.filterSource = [...this.filterSource];
  };

  private onFilterTargetChange = (_event: CustomEvent<{ value: DcxPickListItem[] }>) => {
    // Keep the full target list intact; filtering is visual-only inside the component.
    this.filterTarget = [...this.filterTarget];
  };

  private onTemplateSourceChange = (event: CustomEvent<DcxPickListItem[]>) => {
    this.templateSource = [...(event.detail ?? [])];
  };

  private onTemplateTargetChange = (event: CustomEvent<DcxPickListItem[]>) => {
    this.templateTarget = [...(event.detail ?? [])];
  };

  private onItemDisabledSourceChange = (event: CustomEvent<DcxPickListItem[]>) => {
    this.itemDisabledSource = [...(event.detail ?? [])];
  };

  private onItemDisabledTargetChange = (event: CustomEvent<DcxPickListItem[]>) => {
    this.itemDisabledTarget = [...(event.detail ?? [])];
  };

  private onControlsSourceChange = (event: CustomEvent<DcxPickListItem[]>) => {
    this.controlsSource = [...(event.detail ?? [])];
  };

  private onControlsTargetChange = (event: CustomEvent<DcxPickListItem[]>) => {
    this.controlsTarget = [...(event.detail ?? [])];
  };

  private courseItemTemplate = ({ item, selected }: { item: DcxPickListItem; selected: boolean }) => html`
    <div
      style="display:flex; align-items:center; gap:0.75rem; width:100%; min-width:0; padding:0.5rem 0.75rem; border-radius:6px; ${selected ? 'background: rgba(0, 88, 171, 0.04);' : 'background: transparent;'}"
    >
      <span
        style="display:inline-flex; flex:0 0 auto; align-items:center; justify-content:center; width:2.25rem; height:2.25rem; border-radius:6px; background: var(--color-info-bg, #eff6ff); color: var(--bg-primary, #0058ab); font-weight:700;"
      >
        ${String(item.label ?? '').charAt(0).toUpperCase()}
      </span>
      <span style="display:flex; flex:1; min-width:0; flex-direction:column; overflow:hidden;">
        <strong style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--text-dark, #2a2e33);">${item.label}</strong>
        <small style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color: var(--text-muted, #696e75);">${item.description ?? ''}</small>
      </span>
      ${selected ? html`<span style="flex:0 0 auto; padding:0.125rem 0.5rem; border-radius:999px; background:var(--color-success-bg, #f0fdf4); color:var(--color-success, #16a34a); font-size:11px; font-weight:700;">Incluido</span>` : nothing}
    </div>
  `;

  private renderSection(num: string, title: string, body: unknown, description?: string) {
    return html`
      <div class="demo-section">
        <div class="demo-section__header">
          <span class="demo-section__num">${num}</span>
          <span class="demo-section__title">${title}</span>
        </div>

        ${description
          ? html`<p class="demo-section__desc">${description}</p>`
          : ''}

        <div class="demo-section__body">
          ${body}
        </div>
      </div>
    `;
  }

  override render() {
    return html`
      <div class="demo-page">
        <header class="demo-page-header">
          <p class="demo-page-header__kicker">Components</p>
          <h1 class="demo-page-header__title">PickList</h1>
          <p class="demo-page-header__desc">
            Lista de transferencia (dual listbox) para mover elementos entre un panel
            origen y uno destino, con selección múltiple, filtros, reordenación,
            arrastrar y soltar y plantillas de ítem personalizadas.
          </p>
          <hr class="demo-page-header__divider" />
        </header>

        ${this.renderSection(
          '01',
          'Default',
          html`
            <dcx-web-picklist
              sourceHeader="Disponibles"
              targetHeader="Asignados"
              .source=${this.basicSource}
              .target=${this.basicTarget}
              @sourceChange=${this.onBasicSourceChange}
              @targetChange=${this.onBasicTargetChange}
            ></dcx-web-picklist>
          `,
        )}

        ${this.renderSection(
          '02',
          'With Filters',
          html`
            <dcx-web-picklist
              sourceHeader="Cursos disponibles"
              targetHeader="Plan formativo"
              filterBy="label,description,category"
              sourceFilterPlaceholder="Buscar cursos"
              targetFilterPlaceholder="Buscar seleccionados"
              scrollHeight="20rem"
              ?dragdrop=${true}
              ?showSourceFilter=${true}
              ?showTargetFilter=${true}
              .source=${this.filterSource}
              .target=${this.filterTarget}
              @sourceChange=${this.onFilterSourceChange}
              @targetChange=${this.onFilterTargetChange}
            ></dcx-web-picklist>
          `,
          'Con showSourceFilter/showTargetFilter y dragdrop se habilitan búsqueda y arrastrar/soltar.',
        )}

        ${this.renderSection(
          '03',
          'Custom Template',
          html`
            <dcx-web-picklist
              sourceHeader="Cursos disponibles"
              targetHeader="Plan formativo"
              filterBy="label,description,category"
              scrollHeight="20rem"
              ?dragdrop=${true}
              .source=${this.templateSource}
              .target=${this.templateTarget}
              .itemTemplate=${this.courseItemTemplate}
              @sourceChange=${this.onTemplateSourceChange}
              @targetChange=${this.onTemplateTargetChange}
            ></dcx-web-picklist>
          `,
          'La plantilla #item permite renderizar cada elemento con un diseño propio.',
        )}

        ${this.renderSection(
          '04',
          'Disabled',
          html`
            <dcx-web-picklist
              ?disabled=${true}
              .source=${this.disabledSource}
              .target=${this.disabledTarget}
            ></dcx-web-picklist>
          `,
          'Con [disabled]="true" todo el componente queda inerte.',
        )}

        ${this.renderSection(
          '05',
          'Item Disabled',
          html`
            <dcx-web-picklist
              .source=${this.itemDisabledSource}
              .target=${this.itemDisabledTarget}
              @sourceChange=${this.onItemDisabledSourceChange}
              @targetChange=${this.onItemDisabledTargetChange}
            ></dcx-web-picklist>
          `,
          'Los ítems con disabled: true no se pueden seleccionar ni mover.',
        )}

        ${this.renderSection(
          '06',
          'Without Controls',
          html`
            <dcx-web-picklist
              ?showSourceControls=${false}
              ?showTargetControls=${false}
              ?dragdrop=${true}
              .source=${this.controlsSource}
              .target=${this.controlsTarget}
              @sourceChange=${this.onControlsSourceChange}
              @targetChange=${this.onControlsTargetChange}
            ></dcx-web-picklist>
          `,
          'Ocultando los controles de reordenar (showSourceControls/showTargetControls) la transferencia se realiza solo por arrastrar y soltar.',
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dcx-web-page-picklist': DcxWebPagePicklist;
  }
}

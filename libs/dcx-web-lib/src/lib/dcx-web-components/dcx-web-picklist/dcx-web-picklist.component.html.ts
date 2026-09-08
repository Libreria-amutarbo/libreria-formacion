import { html, nothing } from 'lit';
import type { DcxWebPicklist } from './dcx-web-picklist.component';

export const template = (host: DcxWebPicklist) => html`
  <div class="dcx-picklist ${host.responsive ? 'dcx-picklist--responsive' : ''} ${host.disabled ? 'dcx-picklist--disabled' : ''} ${host.dragdrop ? 'dcx-picklist--dragdrop' : ''}">
    ${
      host.showSourceControls
        ? html`
      <div class="dcx-picklist__reorder-controls dcx-picklist__reorder-controls--source" aria-label="Reordenar disponibles">
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-up" aria-label="Mover arriba los seleccionados del origen" ?disabled="${host.disabled || !host.selectedSourceIds.length}" @click="${() => host.moveTop('source')}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-up" aria-label="Mover uno arriba los seleccionados del origen" ?disabled="${host.disabled || !host.selectedSourceIds.length}" @click="${() => host.moveUp('source')}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-down" aria-label="Mover uno abajo los seleccionados del origen" ?disabled="${host.disabled || !host.selectedSourceIds.length}" @click="${() => host.moveDown('source')}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-down" aria-label="Mover abajo los seleccionados del origen" ?disabled="${host.disabled || !host.selectedSourceIds.length}" @click="${() => host.moveBottom('source')}"></dcx-web-button>
      </div>
    `
        : nothing
    }

    <div class="dcx-picklist__panel dcx-picklist__panel--source">
      <header class="dcx-picklist__header" id="${host.sourceHeadingId}">
        <h3>${host.sourceHeader}</h3>
        <span>${host.sourceItems.length}</span>
      </header>

      ${host.showSourceFilter ? html`<div class="dcx-picklist__filter"><dcx-web-input type="search" aria-label="${host.sourceFilterPlaceholder}" placeholder="${host.sourceFilterPlaceholder}" @input="${(e: any) => host.onFilterChange('source', e.target?.value)}"></dcx-web-input></div>` : nothing}

      <div class="dcx-picklist__list-wrap" style="max-height:${host.listScrollHeight}; overflow:auto;">
        <dcx-web-list
          class="dcx-picklist__list dcx-picklist__list--source"
          id="${host.sourceListId}"
          .items="${host.visibleSourceItems}"
          .selectable="${true}"
          .externalSelection="${true}"
          .isItemSelected="${(item: any) => host.selectedSourceIds.includes(item.id)}"
          .itemTemplate="${
            host.itemTemplate
              ? (context: any) =>
                  host.itemTemplate?.({
                    item: context.item,
                    index: context.index,
                    selected: context.selected,
                    side: 'source',
                  })
              : null
          }"
          .dragEnabled="${host.dragdrop}"
          .cdkDropListData="${host.sourceItems}"
          @itemSelected="${(e: Event) => host.onWebListSelect(e as CustomEvent, 'source')}"
          @itemDeselected="${(e: Event) => host.onWebListDeselect(e as CustomEvent, 'source')}"
          @cdkDropListDropped="${(e: Event) => host.onWebListDrop(e as CustomEvent, 'source')}"
        ></dcx-web-list>

        ${host.visibleSourceItems.length === 0 ? html`<p class="dcx-picklist__empty">${host.sourceQuery ? 'Sin resultados' : 'No hay elementos disponibles'}</p>` : nothing}
      </div>
    </div>

    <div class="dcx-picklist__transfer-controls" aria-label="Transferir elementos">
      <dcx-web-button variant="secondary" size="s" icon-name="chevron-right" aria-label="Mover seleccionados al destino" ?disabled="${host.disabled || !host.selectedSourceIds.length}" @click="${() => host.moveSelectedToTarget()}"></dcx-web-button>
      <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-right" aria-label="Mover todos al destino" ?disabled="${host.disabled || !host.sourceItems.length}" @click="${() => host.moveEveryItemToTarget()}"></dcx-web-button>
      <dcx-web-button variant="secondary" size="s" icon-name="chevron-left" aria-label="Mover seleccionados al origen" ?disabled="${host.disabled || !host.selectedTargetIds.length}" @click="${() => host.moveSelectedToSource()}"></dcx-web-button>
      <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-left" aria-label="Mover todos al origen" ?disabled="${host.disabled || !host.targetItems.length}" @click="${() => host.moveEveryItemToSource()}"></dcx-web-button>
    </div>

    <div class="dcx-picklist__panel dcx-picklist__panel--target">
      <header class="dcx-picklist__header" id="${host.targetHeadingId}">
        <h3>${host.targetHeader}</h3>
        <span>${host.targetItems.length}</span>
      </header>

      ${host.showTargetFilter ? html`<div class="dcx-picklist__filter"><dcx-web-input type="search" aria-label="${host.targetFilterPlaceholder}" placeholder="${host.targetFilterPlaceholder}" @input="${(e: any) => host.onFilterChange('target', e.target?.value)}"></dcx-web-input></div>` : nothing}

      <div class="dcx-picklist__list-wrap" style="max-height:${host.listScrollHeight}; overflow:auto;">
        <dcx-web-list
          class="dcx-picklist__list dcx-picklist__list--target"
          id="${host.targetListId}"
          .items="${host.visibleTargetItems}"
          .selectable="${true}"
          .externalSelection="${true}"
          .isItemSelected="${(item: any) => host.selectedTargetIds.includes(item.id)}"
          .itemTemplate="${
            host.itemTemplate
              ? (context: any) =>
                  host.itemTemplate?.({
                    item: context.item,
                    index: context.index,
                    selected: context.selected,
                    side: 'target',
                  })
              : null
          }"
          .dragEnabled="${host.dragdrop}"
          .cdkDropListData="${host.targetItems}"
          @itemSelected="${(e: Event) => host.onWebListSelect(e as CustomEvent, 'target')}"
          @itemDeselected="${(e: Event) => host.onWebListDeselect(e as CustomEvent, 'target')}"
          @cdkDropListDropped="${(e: Event) => host.onWebListDrop(e as CustomEvent, 'target')}"
        ></dcx-web-list>

        ${host.visibleTargetItems.length === 0 ? html`<p class="dcx-picklist__empty">${host.targetQuery ? 'Sin resultados' : 'No hay elementos seleccionados'}</p>` : nothing}
      </div>
    </div>

    ${
      host.showTargetControls
        ? html`
      <div class="dcx-picklist__reorder-controls dcx-picklist__reorder-controls--target" aria-label="Reordenar seleccionados">
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-up" aria-label="Mover arriba los seleccionados del destino" ?disabled="${host.disabled || !host.selectedTargetIds.length}" @click="${() => host.moveTop('target')}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-up" aria-label="Mover uno arriba los seleccionados del destino" ?disabled="${host.disabled || !host.selectedTargetIds.length}" @click="${() => host.moveUp('target')}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-down" aria-label="Mover uno abajo los seleccionados del destino" ?disabled="${host.disabled || !host.selectedTargetIds.length}" @click="${() => host.moveDown('target')}"></dcx-web-button>
        <dcx-web-button variant="secondary" size="s" icon-name="chevron-double-down" aria-label="Mover abajo los seleccionados del destino" ?disabled="${host.disabled || !host.selectedTargetIds.length}" @click="${() => host.moveBottom('target')}"></dcx-web-button>
      </div>
    `
        : nothing
    }
  </div>
`;

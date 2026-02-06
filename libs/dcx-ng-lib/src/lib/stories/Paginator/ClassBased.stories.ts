import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  DcxNgPaginatorComponent,
  DcxPaginator,
  defaultPaginator,
  knowPageSelected,
  limitedPaginator,
  selectPerPage,
  DcxNgSelectComponent,
  optionsValue,
} from '@dcx-ng-components/dcx-ng-lib';

const meta: Meta<DcxNgPaginatorComponent> = {
  title: 'DCXLibrary/Paginator/ClassBased',
  component: DcxNgPaginatorComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DcxNgSelectComponent, DcxNgPaginatorComponent],
    }),
  ],
  argTypes: {
    paginator: {
      control: { type: 'object' },
      description: 'Elementos de la paginación',
      table: { category: 'Attributes', type: { summary: 'DcxPaginator' } },
    },
    limitedButtons: {
      control: { type: 'boolean' },
      description: 'Botones de límite',
      table: { category: 'Attributes' },
    },
    showItemsPerPageInfo: {
      control: { type: 'boolean' },
      description: 'Mostrar items por página',
      table: { category: 'Attributes' },
    },
    showPageInfo: {
      control: { type: 'boolean' },
      description: 'Mostrar página que se está consultando',
      table: { category: 'Attributes' },
    },
  },
  args: {
    paginator: defaultPaginator,
  },
};

export default meta;
type Story = StoryObj<DcxNgPaginatorComponent>;

export const ClassBased: Story = {};

// Componente wrapper para WithSelectorOfElements
@Component({
  selector: 'dcx-ng-paginator-selector-wrapper',
  standalone: true,
  imports: [CommonModule, DcxNgPaginatorComponent, DcxNgSelectComponent],
  template: `
    <div class="paginator-control">
      <dcx-ng-paginator [paginator]="selectPerPageSignal()" [showItemsPerPageInfo]="true" />
      <dcx-ng-select
        [options]="optionsValue"
        (valueChange)="itemsPerPageChange($event)"
      />
    </div>
  `,
  styles: [
    `
    .paginator-control {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  `,
  ],
})
class SelectorWrapperComponent {
  selectPerPageSignal = signal<DcxPaginator>(selectPerPage);
  optionsValue = optionsValue;

  itemsPerPageChange(event: string | number | null) {
    this.selectPerPageSignal.update(current => ({
      ...current,
      itemsPerPage: Number(event),
    }));
  }
}

export const WithSelectorOfElements: Story = {
  render: () => ({
    props: {},
    template: `<dcx-ng-paginator-selector-wrapper />`,
  }),
  decorators: [
    moduleMetadata({
      imports: [SelectorWrapperComponent],
    }),
  ],
};

export const LimitedButtons: Story = {
  args: {
    paginator: limitedPaginator,
    limitedButtons: true,
  },
};

// Componente wrapper para CurrentPageInformation
@Component({
  selector: 'dcx-ng-paginator-info-wrapper',
  standalone: true,
  imports: [CommonModule, DcxNgPaginatorComponent],
  template: `
    <div class="paginator-control">
      <dcx-ng-paginator
      [showPageInfo]="true"
        [paginator]="knowPageSelectedSignal()"
        (pageChange)="onPageChange($event)"
        (totalPagesChange)="onTotalPagesChange($event)"
      />
    </div>
  `,
})
class CurrentPageWrapperComponent {
  knowPageSelectedSignal = signal<DcxPaginator>(knowPageSelected);
  totalPages = signal(0);

  onPageChange(page: number) {
    this.knowPageSelectedSignal.update(current => ({
      ...current,
      currentPage: page,
    }));
  }

  onTotalPagesChange(totalPages: number) {
    this.totalPages.set(totalPages);
  }
}

export const CurrentPageInformation: Story = {
  render: () => ({
    props: {},
    template: `<dcx-ng-paginator-info-wrapper />`,
  }),
  decorators: [
    moduleMetadata({
      imports: [CurrentPageWrapperComponent],
    }),
  ],
};

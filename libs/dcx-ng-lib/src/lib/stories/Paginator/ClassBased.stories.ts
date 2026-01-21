import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DcxNgPaginatorComponent } from '../../dcx-ng-components/dcx-ng-paginator/dcx-ng-paginator.component';
import { Component, signal } from '@angular/core';
import {
  defaultPaginator,
  knowPageSelected,
  limitedPaginator,
  selectPerPage,
} from '../../core/mock';
import { DcxNgSelectComponent } from '../../dcx-ng-components/dcx-ng-select/dcx-ng-select.component';
import { CommonModule } from '@angular/common';
import { DcxPaginator } from '@dcx-ng-components/dcx-ng-lib';

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
      <dcx-ng-paginator [paginator]="selectPerPageSignal()" />
      <dcx-ng-select
      [value]="5"
        [options]="[{value: 5, label:'5'},{value: 10, label:'10'}, {value: 20, label:'20'}]"
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
        [paginator]="knowPageSelectedSignal()"
        (pageChange)="onPageChange($event)"
        (totalPagesChange)="onTotalPagesChange($event)"
      />
      <span>Página {{knowPageSelectedSignal().currentPage}} de {{totalPages()}}</span>
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

// @Component({
//   selector: 'dcx-ng-paginator-interactive',
//   standalone: true,
//   imports: [DcxNgPaginatorComponent],
//   template: `
//     <div>
//       <p>Página actual: <strong>{{ currentPage() }}</strong></p>

//       <dcx-ng-paginator
//         [currentPage]="currentPage()"
//         [totalPages]="totalPages"
//         [itemsPerPage]="itemsPerPage"
//         [disabled]="disabled"
//         [nextButton]="nextButton"
//         [prevButton]="prevButton"
//         (pageChange)="currentPage.set($event)">
//       </dcx-ng-paginator>
//     </div>
//   `,
// })
// class PaginatorInteractiveComponent {
//   @Input() totalPages!: number;
//   @Input() itemsPerPage!: number;
//   @Input() disabled!: boolean;
//   @Input() nextButton!: string;
//   @Input() prevButton!: string;
//   currentPage = signal(1);
// }

// export const Default: Story = {
//   render: args => ({
//     props: {
//       ...args,
//     },
//     moduleMetadata: {
//       imports: [PaginatorInteractiveComponent],
//     },
//     template: `
//       <dcx-ng-paginator-interactive
//         [totalPages]="totalPages"
//         [itemsPerPage]="itemsPerPage"
//         [disabled]="disabled"
//         [nextButton]="nextButton"
//         [prevButton]="prevButton">
//       </dcx-ng-paginator-interactive>
//     `,
//   }),
//   args: {
//     currentPageInput: 4,
//     //totalPages: 10,
//     itemsPerPage: 10,
//     disabled: false,
//   },
// };

// export const Disabled: Story = {
//   args: {
//     currentPageInput: 3,
//     //totalPages: 10,
//     itemsPerPage: 10,
//     disabled: true,
//   },
//};

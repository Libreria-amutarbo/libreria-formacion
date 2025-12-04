import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgPaginatorComponent } from '../../dcx-ng-components/dcx-ng-paginator/dcx-ng-paginator.component';
import { Component, Input, signal } from '@angular/core';

const meta: Meta<DcxNgPaginatorComponent> = {
  title: 'DCXLibrary/Paginator/ClassBased',
  component: DcxNgPaginatorComponent,
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Página actual',
    },
    totalPages: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Total de páginas',
    },
    itemsPerPage: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Items por página',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilitado',
    },
    nextButton: {
      control: 'text',
      description: 'Texto botón siguiente',
    },
    prevButton: {
      control: 'text',
      description: 'Texto botón anterior',
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgPaginatorComponent>;

@Component({
  selector: 'paginator-interactive',
  standalone: true,
  imports: [DcxNgPaginatorComponent],
  template: `
    <div>
      <p>Página actual: <strong>{{ currentPage() }}</strong></p>
      
      <dcx-ng-paginator 
        [currentPage]="currentPage()" 
        [totalPages]="totalPages"
        [itemsPerPage]="itemsPerPage"
        [disabled]="disabled"
        [nextButton]="nextButton"
        [prevButton]="prevButton"
        (pageChange)="currentPage.set($event)">
      </dcx-ng-paginator>
    </div>
  `,
})
class PaginatorInteractiveComponent {
  @Input() totalPages!: number;
  @Input() itemsPerPage!: number;
  @Input() disabled!: boolean;
  @Input() nextButton!: string;
  @Input() prevButton!: string;
  currentPage = signal(1);
}

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [PaginatorInteractiveComponent],
    },
    template: `
      <paginator-interactive
        [totalPages]="totalPages"
        [itemsPerPage]="itemsPerPage"
        [disabled]="disabled"
        [nextButton]="nextButton"
        [prevButton]="prevButton">
      </paginator-interactive>
    `,
  }),
  args: {
    currentPage: 1,
    totalPages: 10,
    itemsPerPage: 10,
    disabled: false,
    nextButton: 'Siguiente',
    prevButton: 'Anterior',
  },
};

export const Disabled: Story = {
  args: {
    currentPage: 3,
    totalPages: 10,
    itemsPerPage: 10,
    disabled: true,
    nextButton: 'Siguiente',
    prevButton: 'Anterior',
  },
};

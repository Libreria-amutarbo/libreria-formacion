import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgPaginatorComponent } from '../../dcx-ng-components/dcx-ng-paginator/dcx-ng-paginator.component';
import { Component, Input, signal } from '@angular/core';

const meta: Meta<DcxNgPaginatorComponent> = {
  title: 'DCXLibrary/Paginator/UnStyled',
  component: DcxNgPaginatorComponent,
  parameters: {
    docs: {
      description: {
        component: 'Paginador sin estilos, aspecto nativo del navegador.',
      },
    },
  },
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 50 },
      description: 'Total de páginas',
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<DcxNgPaginatorComponent>;

@Component({
  selector: 'paginator-unstyled-demo',
  standalone: true,
  imports: [DcxNgPaginatorComponent],
  template: `
    <div>
      <p>Página actual: <strong>{{ currentPage() }}</strong></p>
      
      <dcx-ng-paginator 
        [currentPage]="currentPage()" 
        [totalPages]="totalPages"
        [disabled]="disabled"
        (pageChange)="currentPage.set($event)">
      </dcx-ng-paginator>
    </div>
  `,
})
class PaginatorUnstyledDemoComponent {
  @Input() totalPages!: number;
  @Input() disabled!: boolean;
  currentPage = signal(1);
}

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [PaginatorUnstyledDemoComponent],
    },
    template: `
      <paginator-unstyled-demo
        [totalPages]="totalPages"
        [disabled]="disabled">
      </paginator-unstyled-demo>
    `,
  }),
  args: {
    totalPages: 5,
    disabled: false,
  },
};

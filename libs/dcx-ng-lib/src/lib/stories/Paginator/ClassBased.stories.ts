import type { Meta, StoryObj } from '@storybook/angular';
import { DcxNgPaginatorComponent } from '../../dcx-ng-components/dcx-ng-paginator/dcx-ng-paginator.component';
import { Component, signal } from '@angular/core';

const meta: Meta<DcxNgPaginatorComponent> = {
  title: 'DCXLibrary/Paginator/ClassBased',
  component: DcxNgPaginatorComponent,
};

export default meta;
type Story = StoryObj<DcxNgPaginatorComponent>;

@Component({
  selector: 'paginator-demo',
  standalone: true,
  imports: [DcxNgPaginatorComponent],
  template: `
    <div style="padding: 20px;">
      <h3>Página actual: <span style="color: #2196F3; font-weight: bold;">{{ currentPage() }}</span></h3>
      
      <dcx-ng-paginator 
        [currentPage]="currentPage()" 
        [totalPages]="10"
        (pageChange)="currentPage.set($event)">
      </dcx-ng-paginator>
    </div>
  `,
})
class PaginatorDemoComponent {
  currentPage = signal(1);
}

export const Default: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [PaginatorDemoComponent],
    },
    template: '<paginator-demo></paginator-demo>',
  }),
};

@Component({
  selector: 'paginator-disabled-demo',
  standalone: true,
  imports: [DcxNgPaginatorComponent],
  template: `
    <div style="padding: 20px;">
      <h3>Paginador deshabilitado</h3>
      
      <dcx-ng-paginator 
        [currentPage]="3" 
        [totalPages]="10"
        [disabled]="true">
      </dcx-ng-paginator>
    </div>
  `,
})
class PaginatorDisabledDemoComponent { }

export const Disabled: Story = {
  render: () => ({
    moduleMetadata: {
      imports: [PaginatorDisabledDemoComponent],
    },
    template: '<paginator-disabled-demo></paginator-disabled-demo>',
  }),
};

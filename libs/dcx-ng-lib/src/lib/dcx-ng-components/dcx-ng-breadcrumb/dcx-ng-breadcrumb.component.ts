import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  output,
  Output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  DcxBreadcrumbItem,
  DcxBreadCrumbSeparatorIcons,
} from '../../core/interfaces';
import { DcxNgIconComponent } from '@dcx-ng-components/dcx-ng-lib';
import { NgTemplateOutlet } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [DcxNgIconComponent, NgTemplateOutlet, RouterModule],
  selector: 'dcx-ng-breadcrumb',
  templateUrl: './dcx-ng-breadcrumb.component.html',
  styleUrl: './dcx-ng-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgBreadcrumbComponent {
  private readonly itemContent =
    viewChild.required<TemplateRef<unknown>>('itemContent');

  items = input.required<DcxBreadcrumbItem[]>();
  iconSeparator = input.required<DcxBreadCrumbSeparatorIcons>();

  itemSelected = output<DcxBreadcrumbItem>();

  onItemClick(item: DcxBreadcrumbItem) {
    this.itemSelected.emit(item);
  }

  getItemContentTpl(): TemplateRef<unknown> {
    return this.itemContent();
  }
}

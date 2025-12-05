import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  DcxBreadcrumbItem,
  DcxBreadCrumbSeparatorIcons,
} from '../../core/interfaces';
import { DcxNgIconComponent } from '../dcx-ng-icon/dcx-ng-icon.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  imports: [DcxNgIconComponent, NgTemplateOutlet],
  selector: 'dcx-ng-breadcrumb',
  templateUrl: './dcx-ng-breadcrumb.component.html',
  styleUrl: './dcx-ng-breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgBreadcrumbComponent {
  private readonly itemContent =
    viewChild.required<TemplateRef<unknown>>('itemContent');

  @Input({ required: true }) items: DcxBreadcrumbItem[] = [];
  iconSeparator = input.required<DcxBreadCrumbSeparatorIcons>();

  getItemContentTpl(): TemplateRef<unknown> {
    return this.itemContent();
  }
}

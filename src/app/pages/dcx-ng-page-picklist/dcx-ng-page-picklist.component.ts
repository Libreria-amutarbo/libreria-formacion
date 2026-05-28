import { Component, signal } from '@angular/core';
import {
  DcxNgDividerComponent,
  DcxNgPickListComponent,
  DcxPickListItem,
  PICKLIST_AVAILABLE_COURSES,
  PICKLIST_SELECTED_COURSES,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-picklist',
  standalone: true,
  imports: [DcxNgPickListComponent, DcxNgDividerComponent],
  templateUrl: './dcx-ng-page-picklist.component.html',
  styleUrl: './dcx-ng-page-picklist.component.scss',
})
export class DcxNgPagePickListComponent {
  readonly basicSource = signal<DcxPickListItem[]>(
    PICKLIST_AVAILABLE_COURSES.slice(0, 4),
  );
  readonly basicTarget = signal<DcxPickListItem[]>(
    PICKLIST_SELECTED_COURSES.slice(0, 1),
  );
  readonly filterSource = signal<DcxPickListItem[]>(PICKLIST_AVAILABLE_COURSES);
  readonly filterTarget = signal<DcxPickListItem[]>(PICKLIST_SELECTED_COURSES);
  readonly templateSource = signal<DcxPickListItem[]>(
    PICKLIST_AVAILABLE_COURSES,
  );
  readonly templateTarget = signal<DcxPickListItem[]>(
    PICKLIST_SELECTED_COURSES,
  );

  updateBasicSource(items: DcxPickListItem[]): void {
    this.basicSource.set(items);
  }

  updateBasicTarget(items: DcxPickListItem[]): void {
    this.basicTarget.set(items);
  }

  updateFilterSource(items: DcxPickListItem[]): void {
    this.filterSource.set(items);
  }

  updateFilterTarget(items: DcxPickListItem[]): void {
    this.filterTarget.set(items);
  }

  updateTemplateSource(items: DcxPickListItem[]): void {
    this.templateSource.set(items);
  }

  updateTemplateTarget(items: DcxPickListItem[]): void {
    this.templateTarget.set(items);
  }
}

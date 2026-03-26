import {
  Component,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DcxNgAccordionComponent,
  DcxAccordionTransitionList,
  DcxAccordionDefault,
  DcxAccordionItemsWithIcon,
  DcxAccordionItemsWithExpanded,
  DcxAccordionItemsDisabled,
  DcxAccordionLargeContent,
  DcxAccordionItemsContentDisabled,
  DcxNgButtonComponent,
  DcxNgListComponent,
  DcxNgInputComponent,
  DcxInputType,
  DcxNgAccordionItem,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-accordion-page',
  standalone: true,
  imports: [
    CommonModule,
    DcxNgAccordionComponent,
    DcxNgButtonComponent,
    DcxNgListComponent,
    DcxNgInputComponent,
  ],
  templateUrl: './dcx-ng-page-accordion.component.html',
  styleUrl: './dcx-ng-page-accordion.component.scss',
})
export class DcxNgPageAccordionComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}
  defaultItems = DcxAccordionDefault;

  withIcons = DcxAccordionItemsWithIcon;

  WithDisabledItems = DcxAccordionItemsDisabled;
  WithContentDisabledItems = DcxAccordionItemsContentDisabled;

  multipleOpenItems = DcxAccordionItemsWithExpanded;

  fastTransitionItems = DcxAccordionDefault;

  slowTransitionItems = DcxAccordionDefault;

  noTransitionItems = DcxAccordionDefault;

  largeContentItems = DcxAccordionLargeContent;

  // templates grabbed via ViewChild
  @ViewChild('buttonTemplate', { read: TemplateRef })
  buttonTemplate!: TemplateRef<any>;

  @ViewChild('formTemplate', { read: TemplateRef })
  formTemplate!: TemplateRef<any>;

  @ViewChild('listTemplate', { read: TemplateRef })
  listTemplate!: TemplateRef<any>;

  withComponents: DcxNgAccordionItem[] = [];

  listItems = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' },
  ];
  DcxInputType = DcxInputType;

  ngAfterViewInit(): void {
    // avoid ExpressionChangedAfterItHasBeenChecked by running assignment later
    Promise.resolve().then(() => {
      this.withComponents = [
        {
          id: '1',
          title: 'Interactive Buttons',
          icon: 'hand-pointer',
          contentTemplate: this.buttonTemplate,
        },
        {
          id: '2',
          title: 'Form Components',
          icon: 'file-text',
          contentTemplate: this.formTemplate,
        },
        {
          id: '3',
          title: 'Dynamic List',
          icon: 'list',
          contentTemplate: this.listTemplate,
        },
      ];
      this.cdr.detectChanges();
      console.log('Hola mundo');
    });
  }
}

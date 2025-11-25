import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dcx-ng-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-dialog.component.html',
  styleUrl: './dcx-ng-dialog.component.scss',
})
export class DcxNgDialogComponent {
  @Input() title = '';
  @Input() visible = false;

  @Output() onClose = new EventEmitter<void>();

  @ContentChild('dialogBody') bodyTemplate?: TemplateRef<any>;
  @ContentChild('dialogFooter') footerTemplate?: TemplateRef<any>;

  close(): void {
    this.visible = false;
    this.onClose.emit();
  }
}

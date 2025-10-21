import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dcx-ng-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-card.component.html',
  styleUrl: './dcx-ng-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgCardComponent {
  @Input() header: string = '';
  @Input() subheader: string = '';
  @Input() iconClass: string = '';
  @Input() closable: boolean = false;
  @Input() visible: boolean = true;

  @Output() onClose = new EventEmitter<void>();
  @Output() onAccept = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  @ContentChild('cardBody') cardBodyTemplate: TemplateRef<any> | null = null;
  @ContentChild('cardFooter') cardFooterTemplate: TemplateRef<any> | null = null;

  handleClose(): void {
    this.visible = false;
    this.onClose.emit();
  }

  handleAccept(): void {
    this.onAccept.emit();
  }

  handleCancel(): void {
    this.onCancel.emit();
  }
}

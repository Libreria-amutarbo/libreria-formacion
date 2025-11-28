import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, TemplateRef, ContentChild, signal } from '@angular/core';
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
  @Input() header = '';
  @Input() subheader = '';
  @Input() iconClass = '';
  @Input() closable = false;
  @Input() visible = true;

   private readonly _allProducts = signal<any[]>([]);

  @Output() cardClose = new EventEmitter<void>();
  @Output() cardAccept = new EventEmitter<void>();
  @Output() cardCancel = new EventEmitter<void>();

  @ContentChild('cardBody') cardBodyTemplate: TemplateRef<any> | null = null;
  @ContentChild('cardFooter') cardFooterTemplate: TemplateRef<any> | null = null;

  handleClose(): void {
    this.visible = false;
    this.cardClose.emit();
  }

  handleAccept(): void {
    this.cardAccept.emit();
  }

  handleCancel(): void {
    this.cardCancel.emit();
  }
}

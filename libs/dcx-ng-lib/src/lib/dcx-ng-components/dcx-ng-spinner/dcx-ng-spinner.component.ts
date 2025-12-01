import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcxSize } from '../../core/interfaces';

@Component({
  selector: 'dcx-ng-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-spinner.component.html',
  styleUrls: ['./dcx-ng-spinner.component.scss'],
})
export class DcxNgSpinnerComponent implements OnInit {
  @Input() size: DcxSize = 'm';
  @Input() wrapper = false;
  @Input() delay = 100;
  @Input() label: string | null = null;

  isVisible = false;

  ngOnInit() {
    setTimeout(() => (this.isVisible = true), this.delay);
  }
}
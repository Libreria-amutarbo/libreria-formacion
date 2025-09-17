import {CommonModule} from '@angular/common';
import {Component, input, Input, OnInit, Signal} from '@angular/core';
import {timer} from 'rxjs';

type Size = 'xs' | 's' | 'm' | 'l' | 'xl';
type SpinnerType =
  | 'ring'
  | 'dual-ring'
  | 'facebook'
  | 'heart'
  | 'circle'
  | 'roller'
  | 'hourglass'
  | 'ellipsis'
  | 'grid'
  | 'ripple'
  | 'spinner'
  | 'default';

interface DcxNgSpinnerComponentInputs {
  delay: Signal<number>;
  size: Signal<Size>;
  wrapper: Signal<boolean>;
  label: Signal<string>;
  type: Signal<SpinnerType>;
  color: Signal<string>;
  backgroundColor: Signal<string>;
}

@Component({
  selector: 'app-dcx-ng-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dcx-ng-spinner.component.html',
  styleUrls: ['./dcx-ng-spinner.component.css'],
})
export class DcxNgSpinnerComponent
  implements OnInit, DcxNgSpinnerComponentInputs
{
  delay = input<number>(100);
  size = input<Size>('m');
  wrapper = input<boolean>(false);
  label = input<string>('');
  type = input<SpinnerType>('default');
  color = input<string>('black');
  backgroundColor = input<string>('rgba(64, 61, 61, 0.06)');

  isVisible: boolean = false;

  private sizeClasses: Record<Size, string> = {
    xs: 'spinner-xs',
    s: 'spinner-s',
    m: 'spinner-m',
    l: 'spinner-l',
    xl: 'spinner-xl',
  };

  private sizeFont: Record<Size, string> = {
    xs: 'font-xs',
    s: 'font-s',
    m: 'font-m',
    l: 'font-l',
    xl: 'font-xl',
  };

  ngOnInit(): void {
    this.getSpinnerSizeClass();
    this.isVisible = true;

    timer(this.delay()).subscribe(() => {
      this.isVisible = false;
    });
  }

  getSpinnerSizeClass(): string {
    return this.sizeClasses[this.size()] || this.sizeClasses['m'];
  }

  getSpinnerFontSizeClass(): string {
    return this.sizeFont[this.size()] || this.sizeFont['m'];
  }
}

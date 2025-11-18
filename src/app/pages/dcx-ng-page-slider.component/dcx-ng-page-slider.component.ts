import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgSliderComponent } from 'libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-slider/dcx-ng-slider.component';

interface SliderConfig {
  label: string;
  value: number;
  step: number;
  vertical: boolean;
}

@Component({
  selector: 'app-dcx-ng-page-slider',
  standalone: true,
  imports: [DcxNgSliderComponent],
  templateUrl: './dcx-ng-page-slider.component.html',
  styleUrl: './dcx-ng-page-slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageSliderComponent {
  sliders: SliderConfig[] = [
    {
      label: 'Horizontal Slider',
      value: 0,
      step: 1,
      vertical: false
    },
    {
      label: 'Vertical Slider',
      value: 0,
      step: 5,
      vertical: true
    }
  ];

  onSliderValueChange(index: number, value: number): void {
    this.sliders[index].value = value;
  }
}

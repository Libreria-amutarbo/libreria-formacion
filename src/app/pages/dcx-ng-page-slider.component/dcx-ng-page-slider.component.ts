import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgSliderComponent } from '@dcx-ng-components/dcx-ng-lib';

interface SliderConfig {
  label: string;
  showLabel: boolean;
  min: number;
  max: number;
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
      label: 'Horizontal',
      showLabel: true,
      value: 0,
      step: 1,
      vertical: false,
      min: 0,
      max: 100,
    },

    {
      label: 'Sin label',
      showLabel: false,
      value: 0,
      step: 1,
      vertical: false,
      min: 0,
      max: 100,
    },
    {
      label: 'Min y max distintos de 0 y 100',
      showLabel: true,
      value: 10,
      step: 1,
      vertical: false,
      min: 10,
      max: 50,
    },
    {
      label: 'Step de 5 en 5',
      showLabel: true,
      value: 0,
      step: 5,
      vertical: false,
      min: 10,
      max: 50,
    },
    {
      label: 'Vertical',
      showLabel: true,
      value: 0,
      step: 1,
      vertical: true,
      min: 0,
      max: 100,
    },
  ];

  onSliderValueChange(index: number, value: number): void {
    this.sliders[index].value = value;
  }
}

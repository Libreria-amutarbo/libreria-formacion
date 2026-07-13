import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgSliderComponent } from '@dcx-ng-components/dcx-ng-lib';

interface SliderConfig {
  label: string;
  showLabel: boolean;
  ariaLabel?: string;
  min: number;
  max: number;
  value: number;
  step: number;
  vertical: boolean;
  disabled?: boolean;
  valueSuffix?: string;
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
  basic: SliderConfig = {
    label: 'Horizontal',
    showLabel: true,
    value: 0,
    step: 1,
    vertical: false,
    min: 0,
    max: 100,
  };

  withoutLabel: SliderConfig = {
    label: 'Sin label',
    showLabel: false,
    ariaLabel: 'Volumen',
    value: 0,
    step: 1,
    vertical: false,
    min: 0,
    max: 100,
  };

  customRange: SliderConfig = {
    label: 'Min y max distintos de 0 y 100',
    showLabel: true,
    value: 10,
    step: 1,
    vertical: false,
    min: 10,
    max: 50,
  };

  steppedRange: SliderConfig = {
    label: 'Step de 5 en 5',
    showLabel: true,
    value: 10,
    step: 5,
    vertical: false,
    min: 10,
    max: 50,
  };

  vertical: SliderConfig = {
    label: 'Vertical',
    showLabel: true,
    value: 0,
    step: 1,
    vertical: true,
    min: 0,
    max: 100,
  };

  budget: SliderConfig = {
    label: 'Presupuesto (k€)',
    showLabel: true,
    value: 60,
    step: 1,
    vertical: false,
    min: 0,
    max: 100,
    valueSuffix: 'k€',
  };

  team: SliderConfig = {
    label: 'Equipo',
    showLabel: true,
    value: 8,
    step: 1,
    vertical: false,
    min: 1,
    max: 20,
    valueSuffix: ' personas',
  };

  duration: SliderConfig = {
    label: 'Duración (deshabilitado)',
    showLabel: true,
    value: 12,
    step: 1,
    vertical: false,
    min: 1,
    max: 24,
    valueSuffix: ' meses',
    disabled: true,
  };

  onValueChange(config: SliderConfig, value: number): void {
    config.value = value;
  }
}

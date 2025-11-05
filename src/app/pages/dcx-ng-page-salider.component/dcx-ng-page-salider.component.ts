import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DcxNgSliderComponent } from 'libs/dcx-ng-lib/src/lib/dcx-ng-components/dcx-ng-slider/dcx-ng-slider.component';

@Component({
  selector: 'app-dcx-ng-page-salider.component',
  standalone: true,
  imports: [DcxNgSliderComponent],
  templateUrl: './dcx-ng-page-salider.component.html',
  styleUrls: ['./dcx-ng-page-salider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageSaliderComponent {
  sliderValue = 0;
  verticalValue = 0;
}

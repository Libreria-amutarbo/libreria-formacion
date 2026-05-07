import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DcxNgDividerComponent,
  DcxNgStepperComponent,
  STEPPER_BASIC_STEPS,
  STEPPER_WITH_COMPLETED,
  STEPPER_WITH_DISABLED,
  STEPPER_WITH_ERROR,
  STEPPER_WITH_ICONS,
  STEPPER_WITH_OPTIONAL,
} from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-stepper',
  standalone: true,
  imports: [DcxNgStepperComponent, DcxNgDividerComponent],
  templateUrl: './dcx-ng-page-stepper.component.html',
  styleUrl: './dcx-ng-page-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageStepperComponent {
  readonly basicSteps = STEPPER_BASIC_STEPS;
  readonly completedSteps = STEPPER_WITH_COMPLETED;
  readonly disabledSteps = STEPPER_WITH_DISABLED;
  readonly errorSteps = STEPPER_WITH_ERROR;
  readonly optionalSteps = STEPPER_WITH_OPTIONAL;
  readonly iconSteps = STEPPER_WITH_ICONS;
}

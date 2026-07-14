import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  DcxNgStepperComponent,
  DcxStepperItem,
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
  imports: [DcxNgStepperComponent],
  templateUrl: './dcx-ng-page-stepper.component.html',
  styleUrl: './dcx-ng-page-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DcxNgPageStepperComponent implements AfterViewInit {
  readonly basicSteps = STEPPER_BASIC_STEPS;
  readonly completedSteps = STEPPER_WITH_COMPLETED;
  readonly disabledSteps = STEPPER_WITH_DISABLED;
  readonly errorSteps = STEPPER_WITH_ERROR;
  readonly optionalSteps = STEPPER_WITH_OPTIONAL;
  readonly iconSteps = STEPPER_WITH_ICONS;

  @ViewChild('addressTpl', { read: TemplateRef })
  addressTpl!: TemplateRef<unknown>;

  contentSteps: DcxStepperItem[] = [];

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.contentSteps = [
        {
          id: '1',
          label: 'Datos personales',
          description: 'Completado',
          completed: true,
        },
        {
          id: '2',
          label: 'Dirección de envío',
          description: 'Introduce tu dirección',
          contentTpl: this.addressTpl,
        },
        {
          id: '3',
          label: 'Método de pago',
          description: 'Pendiente',
        },
      ];
    });
  }
}

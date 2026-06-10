import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  type NgForm,
} from '@angular/forms';
import { DcxNgInputOtpComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-page-input-otp',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DcxNgInputOtpComponent],
  templateUrl: './dcx-ng-page-input-otp.component.html',
  styleUrls: ['./dcx-ng-page-input-otp.component.scss'],
})
export class DcxNgPageInputOtpComponent {
  defaultValue = '';
  maskedValue = '';
  numericValue = '123456';
  smallValue = '';
  mediumValue = '';
  largeValue = '';
  interactiveValue = '';
  completedCode = '';
  templateFormValue = '';
  templateFormSubmitted = false;
  sampleValue = '';

  readonly reactiveForm = new FormGroup({
    value: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
  });

  reactiveFormSubmitted = false;

  onCompleted = (value: string): void => {
    this.completedCode = value;
  };

  clearInteractiveCode = (): void => {
    this.interactiveValue = '';
    this.completedCode = '';
  };

  onTemplateFormSubmit = (form: NgForm): void => {
    this.templateFormSubmitted = true;
    if (!form.valid) {
      return;
    }

    form.resetForm();
    this.templateFormSubmitted = false;
  };

  isReactiveInvalid = (): boolean => {
    const control = this.reactiveForm.get('value');
    return !!control && control.invalid && (control.touched || this.reactiveFormSubmitted);
  };

  onReactiveSubmit = (): void => {
    this.reactiveFormSubmitted = true;
    if (this.reactiveForm.invalid) {
      return;
    }

    this.reactiveForm.reset({ value: '' });
    this.reactiveFormSubmitted = false;
  };

  resendCode = (): void => undefined;

  submitSampleCode = (): void => undefined;
}

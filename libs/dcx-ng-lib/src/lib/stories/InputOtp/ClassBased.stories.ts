import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { fn } from '@storybook/test';
import {
  DcxNgButtonComponent,
  DcxNgInputOtpComponent,
} from '@dcx-ng-components/dcx-ng-lib';

const ActionsData = {
  valueChange: fn(),
  completed: fn(),
  focusEvent: fn(),
  blurEvent: fn(),
};

const meta: Meta<DcxNgInputOtpComponent> = {
  title: 'DCXLibrary/Components/InputOtp',
  component: DcxNgInputOtpComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DcxNgButtonComponent,
        DcxNgInputOtpComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  argTypes: {
    length: {
      control: { type: 'number' },
      description: 'Número de casillas OTP a renderizar.',
      table: {
        category: 'Atributos',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Tamaño visual de las casillas OTP.',
      table: {
        category: 'Atributos',
        type: { summary: `'small' | 'medium' | 'large'` },
        defaultValue: { summary: 'medium' },
      },
    },
    integerOnly: {
      control: { type: 'boolean' },
      description: 'Restringe la entrada a dígitos.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    mask: {
      control: { type: 'boolean' },
      description: 'Oculta visualmente el valor introducido en cada casilla.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Aplica el estado visual de error al componente.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita la interacción con todas las casillas.',
      table: {
        category: 'Atributos',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder que se replica en cada casilla.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    ariaLabel: {
      control: { type: 'text' },
      description: 'Etiqueta accesible del grupo OTP.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: 'Código de un solo uso' },
      },
    },
    errorMessage: {
      control: { type: 'text' },
      description:
        'Mensaje de error. Si `invalid` es true y hay texto, se muestra bajo el grupo con `role="alert"` y se enlaza por `aria-describedby`.',
      table: {
        category: 'Atributos',
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    valueChange: {
      action: 'valueChange',
      description: 'Se emite cuando cambia el valor agregado del OTP.',
      table: {
        category: 'Eventos',
        type: { summary: 'string' },
      },
    },
    completed: {
      action: 'completed',
      description: 'Se emite cuando todas las posiciones quedan completas.',
      table: {
        category: 'Eventos',
        type: { summary: 'string' },
      },
    },
    focusEvent: {
      action: 'focusEvent',
      description: 'Se emite con el índice de la casilla enfocada.',
      table: {
        category: 'Eventos',
        type: { summary: 'number' },
      },
    },
    blurEvent: {
      action: 'blurEvent',
      description: 'Se emite con el índice de la casilla que pierde el foco.',
      table: {
        category: 'Eventos',
        type: { summary: 'number' },
      },
    },
  },
  args: {
    length: 4,
    size: 'medium',
    integerOnly: false,
    mask: false,
    invalid: false,
    disabled: false,
    placeholder: '',
    ariaLabel: 'Código de un solo uso',
    errorMessage: '',
  },
};

export default meta;
type Story = StoryObj<DcxNgInputOtpComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      otpValue: '',
      valueChange: (value: string) => {
        ActionsData.valueChange(value);
      },
      completed: (value: string) => {
        ActionsData.completed(value);
      },
      focusEvent: (index: number) => {
        ActionsData.focusEvent(index);
      },
      blurEvent: (index: number) => {
        ActionsData.blurEvent(index);
      },
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; max-width:320px;">
        <dcx-ng-input-otp
          [(ngModel)]="otpValue"
          [length]="length"
          [size]="size"
          [integerOnly]="integerOnly"
          [mask]="mask"
          [invalid]="invalid"
          [disabled]="disabled"
          [placeholder]="placeholder"
          [ariaLabel]="ariaLabel"
          (valueChange)="valueChange($event)"
          (completed)="completed($event)"
          (focusEvent)="focusEvent($event)"
          (blurEvent)="blurEvent($event)"
        ></dcx-ng-input-otp>
        <p style="margin:0; color:#696e75; font-size:12px;">Valor actual: {{ otpValue || 'Sin completar' }}</p>
      </div>
    `,
  }),
};

export const IntegerOnly: Story = {
  args: {
    length: 6,
    integerOnly: true,
    ariaLabel: 'Código numérico de verificación',
  },
  render: (args) => ({
    props: {
      ...args,
      otpValue: '123456',
      valueChange: (value: string) => {
        ActionsData.valueChange(value);
      },
      completed: (value: string) => {
        ActionsData.completed(value);
      },
      focusEvent: (index: number) => {
        ActionsData.focusEvent(index);
      },
      blurEvent: (index: number) => {
        ActionsData.blurEvent(index);
      },
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; max-width:360px;">
        <dcx-ng-input-otp
          [(ngModel)]="otpValue"
          [length]="length"
          [size]="size"
          [integerOnly]="integerOnly"
          [mask]="mask"
          [invalid]="invalid"
          [disabled]="disabled"
          [placeholder]="placeholder"
          [ariaLabel]="ariaLabel"
          (valueChange)="valueChange($event)"
          (completed)="completed($event)"
          (focusEvent)="focusEvent($event)"
          (blurEvent)="blurEvent($event)"
        ></dcx-ng-input-otp>
        <p style="margin:0; color:#696e75; font-size:12px;">Código precargado: {{ otpValue }}</p>
      </div>
    `,
  }),
};

export const Masked: Story = {
  args: {
    mask: true,
    placeholder: '•',
    ariaLabel: 'Código OTP enmascarado',
  },
  render: (args) => ({
    props: {
      ...args,
      otpValue: '',
      valueChange: (value: string) => {
        ActionsData.valueChange(value);
      },
      completed: (value: string) => {
        ActionsData.completed(value);
      },
      focusEvent: (index: number) => {
        ActionsData.focusEvent(index);
      },
      blurEvent: (index: number) => {
        ActionsData.blurEvent(index);
      },
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:12px; max-width:320px;">
        <dcx-ng-input-otp
          [(ngModel)]="otpValue"
          [length]="length"
          [size]="size"
          [integerOnly]="integerOnly"
          [mask]="mask"
          [invalid]="invalid"
          [disabled]="disabled"
          [placeholder]="placeholder"
          [ariaLabel]="ariaLabel"
          (valueChange)="valueChange($event)"
          (completed)="completed($event)"
          (focusEvent)="focusEvent($event)"
          (blurEvent)="blurEvent($event)"
        ></dcx-ng-input-otp>
        <p style="margin:0; color:#696e75; font-size:12px;">Valor real: {{ otpValue || 'Sin completar' }}</p>
      </div>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    length: 4,
    integerOnly: true,
    ariaLabel: 'Código interactivo de verificación',
  },
  render: (args) => ({
    props: {
      ...args,
      otpValue: '',
      completedCode: '',
      valueChange: (value: string) => {
        ActionsData.valueChange(value);
      },
      completed: function (value: string) {
        this['completedCode'] = value;
        ActionsData.completed(value);
      },
      focusEvent: (index: number) => {
        ActionsData.focusEvent(index);
      },
      blurEvent: (index: number) => {
        ActionsData.blurEvent(index);
      },
      clearCode: function () {
        this['otpValue'] = '';
        this['completedCode'] = '';
      },
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:360px;">
        <dcx-ng-input-otp
          [(ngModel)]="otpValue"
          [length]="length"
          [size]="size"
          [integerOnly]="integerOnly"
          [mask]="mask"
          [invalid]="invalid"
          [disabled]="disabled"
          [placeholder]="placeholder"
          [ariaLabel]="ariaLabel"
          (valueChange)="valueChange($event)"
          (completed)="completed($event)"
          (focusEvent)="focusEvent($event)"
          (blurEvent)="blurEvent($event)"
        ></dcx-ng-input-otp>
        <div style="display:flex; flex-direction:column; gap:6px; font-size:12px; color:#696e75;">
          <span>Valor actual: {{ otpValue || 'Sin completar' }}</span>
          <span>Último código completo: {{ completedCode || 'Pendiente' }}</span>
        </div>
        <dcx-ng-button
          label="Limpiar código"
          type="button"
          variant="secondary"
          size="s"
          (buttonClick)="clearCode()"
        ></dcx-ng-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    props: {
      smallValue: '',
      mediumValue: '',
      largeValue: '',
    },
    template: `
      <div style="display:flex; flex-direction:column; gap:16px; align-items:flex-start;">
        <dcx-ng-input-otp [(ngModel)]="smallValue" size="small" ariaLabel="OTP small"></dcx-ng-input-otp>
        <dcx-ng-input-otp [(ngModel)]="mediumValue" size="medium" ariaLabel="OTP medium"></dcx-ng-input-otp>
        <dcx-ng-input-otp [(ngModel)]="largeValue" size="large" ariaLabel="OTP large"></dcx-ng-input-otp>
      </div>
    `,
  }),
};

export const TemplateDrivenForm: Story = {
  render: () => ({
    props: {
      otpValue: '',
      submitted: false,
      onSubmit(form: { valid: boolean; resetForm: () => void }) {
        this['submitted'] = true;
        if (!form.valid) {
          return;
        }

        ActionsData.completed(this['otpValue']);
        form.resetForm();
        this['submitted'] = false;
      },
    },
    template: `
      <form
        #exampleForm="ngForm"
        (ngSubmit)="onSubmit(exampleForm)"
        style="display:flex; flex-direction:column; gap:12px; max-width:360px;"
      >
        <dcx-ng-input-otp
          #otpModel="ngModel"
          [(ngModel)]="otpValue"
          name="otpValue"
          required
          [length]="4"
          [integerOnly]="true"
          [invalid]="otpModel.invalid && (otpModel.touched || submitted)"
          ariaLabel="OTP con formulario template-driven"
        ></dcx-ng-input-otp>
        <p style="margin:0; min-height:18px; color:#c81e1e; font-size:12px;">
          {{ otpModel.invalid && (otpModel.touched || submitted) ? 'Passcode is required.' : '' }}
        </p>
        <dcx-ng-button
          label="Submit"
          type="submit"
          variant="primary"
          size="s"
        ></dcx-ng-button>
      </form>
    `,
  }),
};

export const ReactiveForm: Story = {
  render: () => ({
    props: {
      formSubmitted: false,
      exampleForm: new FormGroup({
        value: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(4)],
        }),
      }),
      isInvalid(controlName: string) {
        const control = this['exampleForm'].get(controlName);
        return !!control && control.invalid && (control.touched || this['formSubmitted']);
      },
      onSubmit() {
        this['formSubmitted'] = true;
        if (this['exampleForm'].invalid) {
          return;
        }

        ActionsData.completed(this['exampleForm'].value.value || '');
        this['exampleForm'].reset({ value: '' });
        this['formSubmitted'] = false;
      },
    },
    template: `
      <form
        [formGroup]="exampleForm"
        (ngSubmit)="onSubmit()"
        style="display:flex; flex-direction:column; gap:12px; max-width:360px;"
      >
        <dcx-ng-input-otp
          formControlName="value"
          [integerOnly]="true"
          [invalid]="isInvalid('value')"
          ariaLabel="OTP con reactive forms"
        ></dcx-ng-input-otp>
        <p style="margin:0; min-height:18px; color:#c81e1e; font-size:12px;">
          {{ isInvalid('value') ? 'Passcode is required.' : '' }}
        </p>
        <dcx-ng-button
          label="Submit"
          type="submit"
          variant="primary"
          size="s"
        ></dcx-ng-button>
      </form>
    `,
  }),
};

export const SampleLayout: Story = {
  render: () => ({
    props: {
      otpValue: '',
      resendCode: fn(),
      submitCode: fn(),
    },
    template: `
      <div style="display:flex; justify-content:center; padding:16px;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:12px; width:100%; max-width:420px;">
          <div style="font-size:24px; font-weight:700; text-align:center;">Authenticate Your Account</div>
          <p style="margin:0 0 12px; color:#696e75; text-align:center;">Please enter the code sent to your phone.</p>
          <dcx-ng-input-otp [(ngModel)]="otpValue" [length]="6" [integerOnly]="true" ariaLabel="Código de autenticación de 6 dígitos">
            <ng-template #input let-token let-index="index" let-events="events" let-attrs="attrs">
              <div style="display:flex; align-items:center; gap:12px;">
                <input
                  #otpInput
                  [attr.type]="attrs.type"
                  [value]="token"
                  [disabled]="attrs.disabled"
                  [attr.maxlength]="attrs.maxlength"
                  [attr.inputmode]="attrs.inputmode"
                  [attr.autocomplete]="attrs.autocomplete"
                  [attr.placeholder]="attrs.placeholder"
                  [attr.aria-label]="attrs.ariaLabel"
                  (input)="events.input($event)"
                  (keydown)="events.keydown($event)"
                  (paste)="events.paste($event)"
                  (focus)="events.focus()"
                  (blur)="events.blur()"
                  style="width:52px; height:56px; border:1px solid #cbd2d9; border-radius:10px; text-align:center; font-size:20px; font-weight:600;"
                />
                @if (index === 2) {
                  <span style="font-size:18px; color:#52606d;">-</span>
                }
              </div>
            </ng-template>
          </dcx-ng-input-otp>
          <div style="display:flex; justify-content:space-between; gap:12px; width:100%; margin-top:12px;">
            <dcx-ng-button
              label="Resend Code"
              type="button"
              variant="text"
              size="s"
              (buttonClick)="resendCode()"
            ></dcx-ng-button>
            <dcx-ng-button
              label="Submit Code"
              type="button"
              variant="primary"
              size="s"
              (buttonClick)="submitCode(otpValue)"
            ></dcx-ng-button>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    length: 4,
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
    length: 4,
    errorMessage: 'El código introducido no es correcto.',
  },
};

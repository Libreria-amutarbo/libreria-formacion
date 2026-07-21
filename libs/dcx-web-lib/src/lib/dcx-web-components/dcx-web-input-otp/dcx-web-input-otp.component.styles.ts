import { css } from 'lit';

export const dcxWebInputOtpStyles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--sp-2, 8px);
  }

  .dcx-input-otp__group {
    display: inline-flex;
    gap: var(--sp-3, 12px);
  }

  .dcx-input-otp__error {
    color: var(--color-error, #dc2626);
    font-size: var(--fs-sm, 12px);
  }

  .dcx-input-otp__input {
    width: 48px;
    height: 48px;
    padding: 0;

    border: 1px solid
      var(--border-input, #d1d5db);

    border-radius: var(--r-lg, 8px);

    background: var(
      --bg-default,
      #ffffff
    );

    color: var(
      --text-dark,
      #2a2e33
    );

    box-shadow: var(
      --shadow-sm,
      0 1px 2px rgba(0, 0, 0, 0.06)
    );

    font-family: var(
      --ff-base,
      'Inter',
      sans-serif
    );

    font-size: var(
      --fs-lg,
      18px
    );

    font-weight: var(
      --fw-semibold,
      600
    );

    text-align: center;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;
  }

  .dcx-input-otp__input--small {
    width: 40px;
    height: 40px;
    font-size: var(--fs-md, 16px);
  }

  .dcx-input-otp__input--large {
    width: 56px;
    height: 56px;
    font-size: var(--fs-xl, 20px);
  }

  .dcx-input-otp__input--filled:not(
      .dcx-input-otp__input--invalid
    ) {
    border-color: var(
      --color-primary,
      #0058ab
    );
  }

  .dcx-input-otp__input--invalid {
    border-color: var(
      --border-error,
      #dc2626
    );
  }

  .dcx-input-otp__input--invalid:focus-visible {
    border-color: var(
      --border-error,
      #dc2626
    );

    box-shadow: 0 0 0 3px
      color-mix(
        in srgb,
        var(--border-error, #dc2626) 20%,
        transparent
      );
  }

  .dcx-input-otp__input:disabled {
    opacity: 0.6;
    cursor: not-allowed;

    background: var(
      --bg-disabled,
      #f3f4f6
    );

    color: var(
      --text-disabled,
      #696e75
    );
  }

  .dcx-input-otp__input::placeholder {
    color: var(
      --text-placeholder,
      #9ca3af
    );
  }

  .dcx-input-otp__input:focus-visible {
    outline: none;

    border-color: var(
      --border-focus,
      #1db8f2
    );

    box-shadow: 0 0 0 3px
      color-mix(
        in srgb,
        var(--border-focus, #1db8f2) 18%,
        transparent
      );
  }

  .dcx-input-otp__input--invalid:focus-visible {
    border-color: var(
      --border-error,
      #dc2626
    );

    box-shadow: 0 0 0 3px
      color-mix(
        in srgb,
        var(--border-error, #dc2626) 18%,
        transparent
      );
  }
`;
import { css } from 'lit';

export const styles = css`
  dcx-web-icon {
    display: inline-block;
    color: var(--color-primary, #0058ab);
  }

  .dcx-icon {
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
  }

  .dcx-icon--size-s {
    font-size: var(--size-s, 0.5rem);
  }

  .dcx-icon--size-m {
    font-size: var(--size-m, 1rem);
  }

  .dcx-icon--size-l {
    font-size: var(--size-l, 1.5rem);
  }

  .dcx-icon--size-xl {
    font-size: var(--size-xl, 2rem);
  }

  .dcx-icon--size-auto {
    font-size: inherit;
  }

  .dcx-icon--spacing-compact {
    margin: 0 0.25rem;
  }

  .dcx-icon--spacing-spacious {
    margin: 0 0.75rem;
  }
`;

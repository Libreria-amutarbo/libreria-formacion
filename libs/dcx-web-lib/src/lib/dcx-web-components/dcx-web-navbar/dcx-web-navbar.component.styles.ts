import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    font-family: var(--ff-base, 'Inter', sans-serif);
  }

  .dcx-navbar {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: 3.5rem;

    padding: 0 var(--sp-4, 16px);

    background-color: var(
      --bg-default,
      #ffffff
    );

    border-bottom: 1px solid
      var(--border-light, #d1d5db);
  }

  .dcx-navbar__brand {
    display: flex;
    align-items: center;
    gap: var(--sp-2, 8px);

    background: none;
    border: none;

    padding: 0;

    cursor: pointer;

    border-radius: var(--r-sm, 4px);

    flex-shrink: 0;
  }

  .dcx-navbar__brand:focus-visible {
    outline: 2px solid
      var(--border-focus, #1db8f2);

    outline-offset: 2px;
  }

  .dcx-navbar__brand-logo {
    width: auto;
    height: 2rem;
    object-fit: contain;
  }

  .dcx-navbar__brand-title {
    color: var(--text-dark, #2a2e33);

    font-size: var(--fs-base, 14px);

    font-weight: var(--fw-bold, 700);

    white-space: nowrap;
  }

  .dcx-navbar__items {
    display: flex;

    align-items: center;

    justify-content: center;

    flex: 1;

    gap: var(--sp-2, 8px);

    margin: 0;
    padding: 0;

    list-style: none;
  }

  .dcx-navbar__item {
    display: flex;
  }

  /* Native button used for navbar items */
  .dcx-navbar__item-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--sp-2, 8px);
    padding: 5px 10px;
    background: transparent;
    border: none;
    border-radius: var(--r-sm, 4px);
    color: var(--text-body, #2a2e33);
    font-size: var(--fs-base, 14px);
    font-weight: var(--fw-regular, 400);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    white-space: nowrap;
  }

  .dcx-navbar__item-btn:hover:not(:disabled) {
    background: var(--bg-hover, #f7f8fa);
  }

  .dcx-navbar__item-btn:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: 2px;
  }

  .dcx-navbar__item-btn:disabled {
    background: transparent;
    color: var(--text-disabled, #696e75);
    opacity: 0.6;
    cursor: not-allowed;
  }

  .dcx-navbar__item-icon {
    width: 14px;
    height: 14px;
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
    flex-shrink: 0;
  }

  .dcx-navbar__item-label {
    display: inline-flex;
    align-items: center;
  }

  .dcx-navbar__item-btn.is-active {
    border-bottom: 2px solid
      var(--background-primary, #0058ab);
  }

  .dcx-navbar__actions {
    display: flex;
    align-items: center;
    gap: var(--sp-3, 12px);

    flex-shrink: 0;
  }

  /* Toggle native button */
  .dcx-navbar__toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--r-sm, 4px);
    cursor: pointer;
    color: var(--text-body, #2a2e33);
  }

  .dcx-navbar__toggle:hover {
    background: var(--bg-hover, #f7f8fa);
  }

  .dcx-navbar__toggle:focus-visible {
    outline: 2px solid var(--border-focus, #1db8f2);
    outline-offset: 2px;
  }

  .dcx-navbar__toggle-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: currentColor;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: contain;
    mask-size: contain;
    -webkit-mask-position: center;
    mask-position: center;
  }

  @media (min-width: 768px) {
    .dcx-navbar__toggle {
      display: none;
    }
  }

  @media (max-width: 767px) {
    .dcx-navbar {
      height: 3rem;
      flex-wrap: wrap;
    }

    .dcx-navbar__items {
      display: none;

      width: 100%;

      flex-direction: column;

      align-items: stretch;

      padding: var(--sp-3, 12px) 0;

      background: var(
        --bg-default,
        #ffffff
      );

      box-shadow: var(
        --shadow-md,
        0 4px 6px rgba(0, 0, 0, 0.1)
      );
    }

    .dcx-navbar__item {
      width: 100%;
    }

    .dcx-navbar__actions {
      margin-left: auto;
      margin-right: var(--sp-3, 12px);
    }

    .is-menu-open .dcx-navbar__items {
      display: flex;
    }
  }

  .dcx-navbar--vertical {
    flex-direction: column;

    align-items: stretch;

    justify-content: flex-start;

    width: 15rem;

    height: 100%;

    padding: var(--sp-4, 16px)
      var(--sp-3, 12px);

    border-bottom: none;

    box-shadow: var(
      --shadow-md,
      0 4px 6px rgba(0, 0, 0, 0.1)
    );
  }

  .dcx-navbar--vertical
    .dcx-navbar__brand {
    flex-direction: column;

    padding-bottom: var(--sp-4, 16px);

    margin-bottom: var(--sp-3, 12px);

    border-bottom: 1px solid
      var(--border-light, #d1d5db);
  }

  .dcx-navbar--vertical
    .dcx-navbar__items {
    flex-direction: column;

    align-items: stretch;

    justify-content: flex-start;

    gap: var(--sp-2, 8px);
  }

  .dcx-navbar--vertical
    .dcx-navbar__actions {
    flex-direction: column;

    align-items: stretch;

    padding-top: var(--sp-4, 16px);

    margin-top: var(--sp-3, 12px);

    border-top: 1px solid
      var(--border-light, #d1d5db);
  }

  .dcx-navbar--vertical
    .dcx-navbar__toggle {
    display: none;
  }
`;

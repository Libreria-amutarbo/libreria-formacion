import { css } from 'lit';

export const styles = css`
  :host {
    --dcx-skeleton-background: var(--bg-surface, #f4f5f7);
    --dcx-skeleton-highlight: var(--bg-default, #ffffff);

    display: block;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;

    width: var(--dcx-skeleton-width, 100%);
    height: var(--dcx-skeleton-height, 1rem);

    border-radius: var(--dcx-skeleton-border-radius);

    background: var(--dcx-skeleton-background);

    line-height: 1;
  }

  :host(.dcx-skeleton--wave)::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);

    background: linear-gradient(
      90deg,
      transparent,
      color-mix(
        in srgb,
        var(--dcx-skeleton-highlight) 72%,
        transparent
      ),
      transparent
    );

    animation: dcx-skeleton-wave 1.4s ease-in-out infinite;
  }

  :host(.dcx-skeleton--none)::after {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    :host(.dcx-skeleton--wave)::after {
      animation: none;
    }
  }

  @keyframes dcx-skeleton-wave {
    100% {
      transform: translateX(100%);
    }
  }
`;

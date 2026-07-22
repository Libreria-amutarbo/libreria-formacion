import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { DcxWebButton } from './dcx-web-button.component';

export const template = (host: DcxWebButton) => {
  const isIconOnly = host.variant === 'icon-only';

  const effectiveIconName = host.iconName || (host.icon ? 'star-fill' : '');

  const classes = {
    'dcx-button': true,
    [`dcx-button--${host.variant}`]: true,
    [`dcx-button--${host.isCheckbox ? 'checkbox' : host.size}`]: true,
    'dcx-button--icon-only': isIconOnly,
    [`dcx-button--icon-${host.iconPosition}`]: !!host.iconPosition,
    'dcx-button--pressed': host.pressed,
    'dcx-button--hover': host.hover,
    'dcx-button--focused': host.focused,
    'dcx-button--checkbox': host.isCheckbox,
    [`dcx-button--checkbox-error--${host.variant}`]:
      host.isCheckbox && host.checkboxError,
    [host.extraClass]: !!host.extraClass,
  };

  const resolvedIconSize = host.iconSize ?? host.size;
  const computedAriaLabel =
    host.label && !isIconOnly
      ? undefined
      : host.ariaLabel || host.label || 'Button';

  const renderIcon = (name: string, positionClass: string) => {
    const url = `https://unpkg.com/bootstrap-icons@1.11.3/icons/${name}.svg`;
    return html`
      <span class="dcx-button__icon ${positionClass} dcx-icon dcx-icon--size-${resolvedIconSize} dcx-icon--spacing-${host.iconSpacing}"
            style="-webkit-mask-image: url(${url});
                   mask-image: url(${url});
                   ${host.iconColor ? `background-color: ${host.iconColor}` : ''}"
            aria-hidden="true">
      </span>
    `;
  };

  return html`
    <button
      type="${host.type}"
      ?disabled="${host.disabled}"
      class="${classMap(classes)}"
      aria-label="${ifDefined(computedAriaLabel)}"
      aria-pressed="${host.pressed || nothing}"
      role="${host.isCheckbox ? 'checkbox' : nothing}"
      aria-checked="${host.isCheckbox ? ifDefined(host.ariaChecked ?? undefined) : nothing}"
      @click="${host.handleClick}"
    >
      ${
        effectiveIconName &&
        (host.iconPosition === 'left' || host.iconPosition === 'top')
          ? renderIcon(effectiveIconName, `dcx-button__icon--${host.iconPosition}`)
          : nothing
      }

      ${
        host.label && !isIconOnly
          ? html`<span class="dcx-button__label">${host.label}</span>`
          : nothing
      }

      ${
        host.iconRightName
          ? renderIcon(host.iconRightName, 'dcx-button__icon--right')
          : nothing
      }

      ${
        effectiveIconName &&
        ((host.iconPosition === 'right' && !host.iconRightName) ||
          host.iconPosition === 'bottom')
          ? renderIcon(effectiveIconName, `dcx-button__icon--${host.iconPosition}`)
          : nothing
      }

      <slot name="dcx-icon"></slot>
      <slot name="button-trailing"></slot>
    </button>
  `;
};

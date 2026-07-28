import { LitElement } from 'lit';
import {
    customElement,
    property,
    state,
} from 'lit/decorators.js';

import { template } from './dcx-web-message.component.html';
import { styles } from './dcx-web-message.component.styles';

import '../dcx-web-icon/dcx-web-icon.component';
import '../dcx-web-button/dcx-web-button.component';

import type { DcxMessageType } from '../../core/interfaces/message';

@customElement('dcx-web-message')
export class DcxWebMessage extends LitElement {
    @property({ type: String })
    accessor body = '';

    @property({ type: String })
    accessor type: DcxMessageType =
        'notification';

    @property({ type: String })
    override accessor title = '';

    @property({ type: String })
    accessor link = '';

    @property({ type: Boolean })
    accessor icon = false;

    @property({ type: String })
    accessor iconName = '';

    @property({ type: Boolean })
    accessor showClose = false;

    @property({ type: Boolean })
    accessor announce = true;

    @state()
    accessor dismissed = false;

    static override styles = styles;

    get messageData() {
        const messageOptions = {
            notification: {
                icon: 'info-circle',
                role: 'status',
                ariaLive: 'polite',
            },
            success: {
                icon: 'check-circle',
                role: 'status',
                ariaLive: 'polite',
            },
            warning: {
                icon: 'exclamation-triangle',
                role: 'alert',
                ariaLive: 'assertive',
            },
            error: {
                icon: 'x-circle',
                role: 'alert',
                ariaLive: 'assertive',
            },
        } as const;

        return messageOptions[this.type];
    }

    public emit(
        name: string,
        detail?: unknown,
    ) {
        this.dispatchEvent(
            new CustomEvent(name, {
                detail,
                bubbles: true,
                composed: true,
            }),
        );
    }

    public onClose = () => {
        this.dismissed = true;

        this.emit('closed');
    };

    override render() {
        return template(this);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dcx-web-message': DcxWebMessage;
    }
}

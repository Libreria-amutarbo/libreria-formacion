import './dcx-web-message.component';

import { DcxWebMessage } from './dcx-web-message.component';

describe('DcxWebMessage', () => {
    let element: DcxWebMessage;

    beforeEach(async () => {
        element = document.createElement(
            'dcx-web-message',
        ) as DcxWebMessage;

        element.body = 'Test message body';

        document.body.appendChild(element);

        await element.updateComplete;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('should be defined', () => {
        expect(element).toBeInstanceOf(
            DcxWebMessage,
        );
    });

    describe('Default Properties', () => {
        it('should have default type as notification', () => {
            expect(element.type).toBe(
                'notification',
            );
        });

        it('should default icon to false', () => {
            expect(element.icon).toBe(false);
        });

        it('should default showClose to false', () => {
            expect(element.showClose).toBe(false);
        });

        it('should default announce to true', () => {
            expect(element.announce).toBe(true);
        });
    });

    describe('Inputs', () => {
        it('should accept body input', () => {
            expect(element.body).toBe(
                'Test message body',
            );
        });

        it('should accept title', async () => {
            element.title = 'Alert';

            await element.updateComplete;

            expect(element.title).toBe('Alert');
        });

        it('should accept link', async () => {
            element.link =
                'https://example.com';

            await element.updateComplete;

            expect(element.link).toBe(
                'https://example.com',
            );
        });

        it('should accept iconName', async () => {
            element.iconName = 'x-circle';

            await element.updateComplete;

            expect(element.iconName).toBe(
                'x-circle',
            );
        });
    });

    describe('Rendering', () => {
        it('should render body', async () => {
            const paragraph =
                element.shadowRoot?.querySelector(
                    '.dcx-message__paragraph',
                );

            expect(
                paragraph?.textContent,
            ).toContain('Test message body');
        });

        it('should render title when provided', async () => {
            element.title = 'Aviso';

            await element.updateComplete;

            const title =
                element.shadowRoot?.querySelector(
                    '.dcx-message__title',
                );

            expect(title?.tagName).toBe('P');
        });

        it('should render icon', async () => {
            element.icon = true;

            await element.updateComplete;

            expect(
                element.shadowRoot?.querySelector(
                    'dcx-web-icon',
                ),
            ).toBeTruthy();
        });
    });

    describe('WCAG', () => {
        it('should map notification to status', async () => {
            await element.updateComplete;

            const container =
                element.shadowRoot?.querySelector(
                    '.dcx-message',
                );

            expect(
                container?.getAttribute('role'),
            ).toBe('status');

            expect(
                container?.getAttribute(
                    'aria-live',
                ),
            ).toBe('polite');
        });

        it('should map error to alert', async () => {
            element.type = 'error';

            await element.updateComplete;

            const container =
                element.shadowRoot?.querySelector(
                    '.dcx-message',
                );

            expect(
                container?.getAttribute('role'),
            ).toBe('alert');
        });

        it('should remove aria attributes when announce is false', async () => {
            element.announce = false;

            await element.updateComplete;

            const container =
                element.shadowRoot?.querySelector(
                    '.dcx-message',
                );

            expect(
                container?.getAttribute('role'),
            ).toBeNull();

            expect(
                container?.getAttribute(
                    'aria-live',
                ),
            ).toBeNull();
        });
    });

    describe('Close', () => {
        it('should emit closed', () => {
            const spy = jest.fn();

            element.addEventListener(
                'closed',
                spy,
            );

            element.onClose();

            expect(spy).toHaveBeenCalled();
        });

        it('should dismiss component after close', async () => {
            element.onClose();

            await element.updateComplete;

            expect(element.dismissed).toBe(true);

            const container =
                element.shadowRoot?.querySelector(
                    '.dcx-message',
                );

            expect(container).toBeFalsy();
        });
    });

    describe('Severity Mapping', () => {
        it('should map success icon', () => {
            element.type = 'success';

            expect(
                element.messageData.icon,
            ).toBe('check-circle');
        });

        it('should map error icon', () => {
            element.type = 'error';

            expect(
                element.messageData.icon,
            ).toBe('x-circle');
        });
    });
});
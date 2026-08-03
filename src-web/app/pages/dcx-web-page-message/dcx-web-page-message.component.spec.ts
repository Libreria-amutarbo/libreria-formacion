import './dcx-web-page-message.component';

import { DcxWebPageMessage } from './dcx-web-page-message.component';

describe('DcxWebPageMessage', () => {
    let element: DcxWebPageMessage;

    beforeEach(async () => {
        element = document.createElement(
            'dcx-web-page-message',
        ) as DcxWebPageMessage;

        document.body.appendChild(element);

        await element.updateComplete;
    });

    afterEach(() => {
        document.body.removeChild(element);
    });

    it('should create', () => {
        expect(element).toBeTruthy();
    });

    it('should render page title', () => {
        const title =
            element.shadowRoot?.querySelector(
                '.demo-page-header__title',
            );

        expect(title?.textContent).toContain(
            'Message',
        );
    });

    it('should render page description', () => {
        const description =
            element.shadowRoot?.querySelector(
                '.demo-page-header__desc',
            );

        expect(description?.textContent).toContain(
            'cuatro severidades',
        );
    });

    it('should render all demo sections', () => {
        const sections =
            element.shadowRoot?.querySelectorAll(
                '.demo-section',
            );

        expect(sections?.length).toBe(7);
    });

    it('should render all message demos', () => {
        const messages =
            element.shadowRoot?.querySelectorAll(
                'dcx-web-message',
            );

        expect(messages?.length).toBe(7);
    });

    it('should render notification demo', () => {
        expect(
            element.shadowRoot?.textContent,
        ).toContain('Notification');
    });

    it('should render success demo', () => {
        expect(
            element.shadowRoot?.textContent,
        ).toContain('Success');
    });

    it('should render warning demo', () => {
        expect(
            element.shadowRoot?.textContent,
        ).toContain('Warning');
    });

    it('should render error demo', () => {
        expect(
            element.shadowRoot?.textContent,
        ).toContain('Error');
    });

    it('should render with link demo', () => {
        expect(
            element.shadowRoot?.textContent,
        ).toContain('With Link');
    });

    it('should render closable demo', () => {
        expect(
            element.shadowRoot?.textContent,
        ).toContain('Closable');
    });

    it('should render closed event description', () => {
        expect(
            element.shadowRoot?.textContent,
        ).toContain('evento closed');
    });
});
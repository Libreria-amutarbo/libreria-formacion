import './dcx-web-page-file-upload.component';
import { DcxWebPageFileUpload } from './dcx-web-page-file-upload.component';

describe('DcxWebPageFileUpload', () => {
  let element: DcxWebPageFileUpload;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-file-upload') as DcxWebPageFileUpload;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebPageFileUpload);
  });

  it('should render title', () => {
    const title = element.shadowRoot?.querySelector('.demo-page-header__title');
    expect(title?.textContent?.trim()).toBe('File Upload');
  });

  it('should render all showcase sections', () => {
    const sections = element.shadowRoot?.querySelectorAll('.demo-section');
    expect(sections?.length).toBe(8);
  });

  it('should render dcx-web-file-upload components', () => {
    const fileUploads = element.shadowRoot?.querySelectorAll('dcx-web-file-upload');
    expect(fileUploads?.length).toBe(8);
  });
});

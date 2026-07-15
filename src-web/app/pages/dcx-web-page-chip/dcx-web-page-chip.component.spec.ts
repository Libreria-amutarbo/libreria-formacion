import './dcx-web-page-chip.component';
import { DcxWebPageChip } from './dcx-web-page-chip.component';

describe('DcxWebPageChip', () => {
  let element: DcxWebPageChip;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-chip') as DcxWebPageChip;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeInstanceOf(DcxWebPageChip);
  });

  it('should render the page wrapper', () => {
    const page = element.shadowRoot?.querySelector('.demo-page');
    expect(page).toBeTruthy();
  });

  it('should render the page title', () => {
    const title = element.shadowRoot?.querySelector('.demo-page-header__title');
    expect(title?.textContent?.trim()).toBe('Chip (Web Component)');
  });

  it('should render 6 demo sections', () => {
    const sections = element.shadowRoot?.querySelectorAll('.demo-section');
    expect(sections?.length).toBe(6);
  });

  it('should call console.log when _handleRemove is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    (element as any)._handleRemove('Test Chip');

    expect(consoleSpy).toHaveBeenCalledWith('Chip removido: Test Chip');

    consoleSpy.mockRestore();
  });

  it('should update _logs state when _handleRemove is called', async () => {
    (element as any)._handleRemove('Angular');
    await element.updateComplete;

    expect((element as any)._logs).toContain('Chip removido: Angular');
  });

  it('should accumulate multiple log entries', async () => {
    (element as any)._handleRemove('Tag1');
    (element as any)._handleRemove('Tag2');
    await element.updateComplete;

    const logs = (element as any)._logs as string[];
    expect(logs).toHaveLength(2);
    expect(logs[0]).toBe('Chip removido: Tag1');
    expect(logs[1]).toBe('Chip removido: Tag2');
  });

  it('should call console.log when a dcx-chip-remove event is dispatched from a filter chip', async () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const filterChip = element.shadowRoot?.querySelector(
      'dcx-web-chip[variant="filter"]',
    ) as HTMLElement;
    expect(filterChip).toBeTruthy();

    filterChip.dispatchEvent(
      new CustomEvent('dcx-chip-remove', { bubbles: true, composed: true }),
    );

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
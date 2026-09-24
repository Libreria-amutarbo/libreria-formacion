import './dcx-web-page-picklist.component';

import { DcxWebPagePicklist } from './dcx-web-page-picklist.component';

describe('DcxWebPagePicklist', () => {
  let element: DcxWebPagePicklist;

  beforeEach(async () => {
    element = document.createElement('dcx-web-page-picklist') as DcxWebPagePicklist;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create', () => {
    expect(element).toBeTruthy();
  });

  it('should render the page title', () => {
    expect(element.textContent).toContain('PickList');
  });

  it('should render the page description', () => {
    expect(element.textContent).toContain('Lista de transferencia');
  });

  it('should render all demo sections', () => {
    expect(element.querySelectorAll('.demo-section').length).toBe(6);
  });

  it('should render all picklist demos', () => {
    expect(element.querySelectorAll('dcx-web-picklist').length).toBe(6);
  });

  it('should render the default example', () => {
    expect(element.textContent).toContain('Default');
  });

  it('should render the filters example', () => {
    expect(element.textContent).toContain('With Filters');
  });

  it('should render the custom template example', () => {
    expect(element.textContent).toContain('Custom Template');
  });

  it('should render the disabled example', () => {
    expect(element.textContent).toContain('Disabled');
  });

  it('should render the item disabled example', () => {
    expect(element.textContent).toContain('Item Disabled');
  });

  it('should render the without controls example', () => {
    expect(element.textContent).toContain('Without Controls');
  });

  it('should update the demo source from sourceChange', async () => {
    const nextSource = element.basicSource.slice(0, 2);
    const event = new CustomEvent('sourceChange', {
      detail: nextSource,
      bubbles: true,
      composed: true,
    });

    const picklist = element.querySelector('dcx-web-picklist');
    picklist?.dispatchEvent(event);
    await element.updateComplete;

    expect(element.basicSource).toEqual(nextSource);
  });

  it('should update the demo target from targetChange', async () => {
    const nextTarget = element.basicTarget.slice();
    const event = new CustomEvent('targetChange', {
      detail: nextTarget,
      bubbles: true,
      composed: true,
    });

    const picklists = element.querySelectorAll('dcx-web-picklist');
    picklists[0]?.dispatchEvent(event);
    await element.updateComplete;

    expect(element.basicTarget).toEqual(nextTarget);
  });

  it('should receive filter events', async () => {
    const event = new CustomEvent('sourceFilter', {
      detail: { query: 'angular', value: element.filterSource.slice(0, 1), side: 'source' },
      bubbles: true,
      composed: true,
    });

    const picklists = element.querySelectorAll('dcx-web-picklist');
    picklists[1]?.dispatchEvent(event);
    await element.updateComplete;

    expect(element.filterSource.length).toBeGreaterThan(0);
  });
});

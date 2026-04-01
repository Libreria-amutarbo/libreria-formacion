import { TableComparatorService } from './table-comparator.service';

describe('TableComparatorService', () => {
  let service: TableComparatorService;

  beforeEach(() => {
    service = new TableComparatorService();
  });

  it('should compare two strings', () => {
    expect(service.compare('Alice', 'Bob', 'string')).toBeLessThan(0);
    expect(service.compare('Bob', 'Alice', 'string')).toBeGreaterThan(0);
    expect(service.compare('Alice', 'Alice', 'string')).toBe(0);
  });

  it('should compare two numbers', () => {
    expect(service.compare(5, 10, 'number')).toBeLessThan(0);
    expect(service.compare(10, 5, 'number')).toBeGreaterThan(0);
    expect(service.compare(5, 5, 'number')).toBe(0);
  });

  it('should handle null left as greater (sort to end)', () => {
    expect(service.compare(null, 'Alice', 'string')).toBeGreaterThan(0);
  });

  it('should handle null right as lesser (sort to front)', () => {
    expect(service.compare('Alice', null, 'string')).toBeLessThan(0);
  });

  it('should handle both null as equal', () => {
    expect(service.compare(null, null, 'string')).toBe(0);
  });

  it('should handle NaN numbers', () => {
    expect(service.compare('abc', 5, 'number')).toBeGreaterThan(0);
    expect(service.compare(5, 'abc', 'number')).toBeLessThan(0);
    expect(service.compare('abc', 'xyz', 'number')).toBe(0);
  });
});

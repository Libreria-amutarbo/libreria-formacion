import { TableComparatorService } from './table-comparator.service';
import { TableDataPipelineService } from './table-data-pipeline.service';
import { DcxHeaderData, DcxTableRow } from '../../../core/interfaces';

describe('TableDataPipelineService', () => {
  let service: TableDataPipelineService;

  beforeEach(() => {
    service = new TableDataPipelineService();
  });

  describe('normalize()', () => {
    it('should add id when missing and keep existing id', () => {
      const rows = [
        { name: 'Alice' },
        { id: 99, name: 'Bob' },
      ] as DcxTableRow[];
      const result = service.normalize(rows);
      expect(result[0].id).toBe(0);
      expect(result[1].id).toBe(99);
    });
  });

  describe('filter()', () => {
    const rows: DcxTableRow[] = [
      { id: 1, name: 'Alice', city: 'Madrid' },
      { id: 2, name: 'Bob', city: 'Barcelona' },
    ];

    it('should filter rows matching filter value', () => {
      const result = service.filter(rows, { name: 'alice' });
      expect(result).toHaveLength(1);
      expect(result[0]['name'] as string).toBe('Alice');
    });

    it('should return empty when no match', () => {
      const result = service.filter(rows, { name: 'xyz' });
      expect(result).toHaveLength(0);
    });

    it('should handle null cell values', () => {
      const rowsWithNull: DcxTableRow[] = [{ id: 1, name: null }];
      const result = service.filter(rowsWithNull, { name: 'alice' });
      expect(result).toHaveLength(0);
    });
  });

  describe('sort()', () => {
    const rows: DcxTableRow[] = [
      { id: 1, name: 'Charlie', age: 35 },
      { id: 2, name: 'Alice', age: 25 },
      { id: 3, name: 'Bob', age: 30 },
    ];
    const headers: DcxHeaderData[] = [
      { key: 'name', name: 'Name', type: 'string' },
      { key: 'age', name: 'Age', type: 'number' },
    ];
    const compareFn = (left: unknown, right: unknown, type: any) => {
      const svc = new TableComparatorService();
      return svc.compare(left, right, type);
    };

    it('should sort ascending by name', () => {
      const result = service.sort(
        rows,
        { key: 'name', dir: 'asc' },
        headers,
        compareFn,
      );
      expect(result[0]['name'] as string).toBe('Alice');
      expect(result[2]['name'] as string).toBe('Charlie');
    });

    it('should infer type when header has no type', () => {
      const headersNoType: DcxHeaderData[] = [{ key: 'age', name: 'Age' }];
      const result = service.sort(
        rows,
        { key: 'age', dir: 'asc' },
        headersNoType,
        compareFn,
      );
      expect(result[0]['age'] as number).toBe(25);
    });
  });

  describe('paginate()', () => {
    const rows: DcxTableRow[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Row ${i}`,
    }));

    it('should return first page', () => {
      const result = service.paginate(rows, 0, 5);
      expect(result).toHaveLength(5);
      expect(result[0].id).toBe(0);
    });

    it('should return remaining items on last page', () => {
      const result = service.paginate(rows, 2, 4);
      expect(result).toHaveLength(2);
    });
  });
});

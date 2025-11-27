import { Injectable } from '@angular/core';

@Injectable()
export class TableComparatorService {
  compare(left: unknown, right: unknown, type: 'string' | 'number'): number {
    if (left == null && right == null) return 0;
    if (left == null) return 1;
    if (right == null) return -1;

    if (type === 'number') return this.compareNumbers(left, right);
    return this.compareStrings(left, right);
  }

  private compareNumbers(left: unknown, right: unknown): number {
    const [leftNum, rightNum] = [Number(left), Number(right)];

    if (Number.isNaN(leftNum) && Number.isNaN(rightNum)) return 0;
    if (Number.isNaN(leftNum)) return 1;
    if (Number.isNaN(rightNum)) return -1;

    return leftNum - rightNum;
  }

  private compareStrings(left: unknown, right: unknown): number {
    return String(left).localeCompare(String(right), undefined, {
      sensitivity: 'base',
      numeric: true,
    });
  }
}

import { DcxSelectOptions, DcxPaginator } from '@dcx-ng-components/dcx-ng-lib';

export const defaultPaginator: DcxPaginator = {
  totalItems: 100,
  itemsPerPage: 10,
  currentPage: 2,
};

export const optionsValue: DcxSelectOptions[] = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
];

export const selectPerPage: DcxPaginator = {
  totalItems: 21,
  itemsPerPage: 5,
  currentPage: 1,
};

export const limitedPaginator: DcxPaginator = {
  totalItems: 100,
  itemsPerPage: 10,
  currentPage: 2,
};

export const knowPageSelected: DcxPaginator = {
  totalItems: 100,
  itemsPerPage: 10,
  currentPage: 2,
};

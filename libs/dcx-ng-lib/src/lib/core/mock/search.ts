import { SearchItem } from '../interfaces/search';
import { generatePersonRows, PersonRow } from './table';

export const SEARCH_ITEMS: SearchItem[] = generatePersonRows(20).map((person: PersonRow) => ({
  id: person.id ?? 0,
  label: `${person.name} (${person.country})`,
  data: person
}));

export const SEARCH_DEFAULTARGS = {
  placeholder: 'Buscar...',
  disabled: false,
  size: 'm' as const,
  dropdown: false,
  showClear: true,
  items: SEARCH_ITEMS,
};

import { describe, expect, it } from 'vitest';

import { FiltersState } from '@snack-uikit/chips';

import { defaultParser, defaultSerializer } from '../src/components/Toolbar/hooks/usePersistState/utils';
import { PersistedFilterState } from '../src/components/Toolbar/types';

const BASE_URL = 'https://example.com/table';
const QUERY_KEY = 'state';

const writeStateToUrl = (state: PersistedFilterState<FiltersState>) => {
  const url = new URL(BASE_URL);
  url.searchParams.set(QUERY_KEY, defaultSerializer(state));
  return url;
};

const readStateFromUrl = (href: string) => defaultParser(new URL(href).searchParams.get(QUERY_KEY) ?? '');

const paginationState: PersistedFilterState<FiltersState> = {
  pagination: { limit: 25, offset: 0 },
  search: '',
  filter: {},
};

const roundTripCases: { name: string; state: PersistedFilterState<FiltersState> }[] = [
  { name: 'pagination', state: paginationState },
  {
    name: 'ordering',
    state: {
      ordering: [
        { field: 'name', direction: '-' },
        { field: 'status', direction: '+' },
      ],
      search: '',
      filter: {},
    },
  },
  {
    name: 'filter with in and eq conditions',
    state: { search: '', filter: { status: ['active', 'inactive'], type: 'http' } },
  },
  { name: 'cyrillic search with space', state: { search: 'точка москва', filter: {} } },
  { name: 'search with plus, space and hash', state: { search: 'a+b #1', filter: {} } },
  { name: 'search with percent sign', state: { search: '100%', filter: {} } },
  { name: 'search with percent-encoded-like sequence', state: { search: 'a%41b', filter: {} } },
];

describe('persisted toolbar state in query param', () => {
  roundTripCases.forEach(({ name, state }) => {
    it(`should restore ${name} from url`, () => {
      const url = writeStateToUrl(state);

      expect(readStateFromUrl(url.href)).toEqual(state);
    });
  });

  roundTripCases
    .filter(({ state }) => !state.search?.includes('%'))
    .forEach(({ name, state }) => {
      it(`should not double-encode ${name} in url`, () => {
        const url = writeStateToUrl(state);

        expect(url.search).not.toContain('%25');
      });
    });

  it('should encode pagination once', () => {
    const url = writeStateToUrl(paginationState);

    expect(url.search).toBe('?state=limit%3D25%26offset%3D0');
  });

  it('should encode literal percent sign in search exactly once', () => {
    const url = writeStateToUrl({ search: '100%', filter: {} });

    expect(url.search.match(/%25/g)).toHaveLength(1);
    expect(readStateFromUrl(url.href).search).toBe('100%');
  });

  it('should truncate search containing ampersand and equals sign', () => {
    const url = writeStateToUrl({ search: 'a&b=c', filter: {} });

    expect(readStateFromUrl(url.href).search).toBe('a');
  });
});

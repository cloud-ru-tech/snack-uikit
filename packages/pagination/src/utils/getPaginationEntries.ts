import { getRange } from './getRange';

export enum PaginationEntryKind {
  Page = 'page',
  Break = 'break',
}

export type PaginationEntry =
  | { kind: PaginationEntryKind.Page; page: number }
  | { kind: PaginationEntryKind.Break; start: number; end: number };

function createPageEntry(page: number): PaginationEntry {
  return { kind: PaginationEntryKind.Page, page };
}

function createBreakEntry(start: number, end: number): PaginationEntry {
  return { kind: PaginationEntryKind.Break, start, end };
}

type PaginationOptions = {
  firstPage: number;
  lastPage: number;
  currentPage: number;
  maxLength: number;
};

enum GroupPosition {
  Left,
  Middle,
  Right,
}

type PaginationState = {
  firstPage: number;
  lastPage: number;
  currentPage: number;
  currentPageSiblingsCount: number;
  displayedPagesCount: number;
  groupPosition: GroupPosition | null;
};

function getPaginationState(options: PaginationOptions): PaginationState {
  const { firstPage, lastPage, currentPage, maxLength } = options;
  const currentPageSiblingsCount = maxLength - 5; /* First page, break, current page, break and last page. */
  const displayedPagesCount = maxLength - 2; /* First or last page and break. */

  function getGroupPosition() {
    if (lastPage <= maxLength) {
      return null;
    }

    if (currentPage < displayedPagesCount) {
      return GroupPosition.Left;
    }

    if (lastPage + firstPage - currentPage < displayedPagesCount) {
      return GroupPosition.Right;
    }

    return GroupPosition.Middle;
  }

  return {
    firstPage,
    lastPage,
    currentPage,
    currentPageSiblingsCount,
    displayedPagesCount,
    groupPosition: getGroupPosition(),
  };
}

function getEntriesGroupedOnTheLeft(state: PaginationState) {
  const { firstPage, lastPage, displayedPagesCount } = state;
  const groupFirstPage = firstPage;
  const groupLastPage = displayedPagesCount;
  const group = getRange(groupFirstPage, groupLastPage).map(createPageEntry);

  return [...group, createBreakEntry(groupLastPage + 1, lastPage - 1), createPageEntry(lastPage)];
}

function getEntriesGroupedInTheMiddle(state: PaginationState) {
  const { firstPage, lastPage, currentPage, currentPageSiblingsCount } = state;
  const groupFirstPage = currentPage - currentPageSiblingsCount / 2;
  const groupLastPage = currentPage + currentPageSiblingsCount / 2;
  const group = getRange(groupFirstPage, groupLastPage).map(createPageEntry);

  return [
    createPageEntry(firstPage),
    createBreakEntry(firstPage + 1, groupFirstPage - 1),
    ...group,
    createBreakEntry(groupLastPage + 1, lastPage - 1),
    createPageEntry(lastPage),
  ];
}

function getEntriesGroupedOnTheRight(state: PaginationState) {
  const { firstPage, lastPage, displayedPagesCount } = state;
  const groupFirstPage = lastPage + firstPage - displayedPagesCount;
  const groupLastPage = lastPage;
  const group = getRange(groupFirstPage, groupLastPage).map(createPageEntry);

  return [createPageEntry(firstPage), createBreakEntry(firstPage + 1, groupFirstPage - 1), ...group];
}

const getGroupedEntriesByGroupPosition: Record<GroupPosition, (state: PaginationState) => PaginationEntry[]> = {
  [GroupPosition.Left]: getEntriesGroupedOnTheLeft,
  [GroupPosition.Middle]: getEntriesGroupedInTheMiddle,
  [GroupPosition.Right]: getEntriesGroupedOnTheRight,
};

export function getPaginationEntries(options: PaginationOptions) {
  const state = getPaginationState(options);

  return state.groupPosition === null
    ? getRange(state.firstPage, state.lastPage).map(createPageEntry)
    : getGroupedEntriesByGroupPosition[state.groupPosition](state);
}

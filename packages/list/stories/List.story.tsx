import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ButtonFilled, ButtonOutline } from '@snack-uikit/button';
import { PlusSVG } from '@snack-uikit/icons';
import { TruncateStringProps } from '@snack-uikit/truncate-string';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { List, ListProps } from '../src/components';
import {
  BASE_OPTIONS,
  EmptyState,
  emptyStateSample,
  EXPAND_OPTIONS,
  GROUP_OPTIONS,
  LONG_LIST_OPTIONS,
  withDataTestId,
} from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/List/List',
  component: List,
};
export default meta;

const STORY_SELECTION_MODE = {
  single: 'single',
  multiple: 'multiple',
  none: 'none',
};

type StoryProps = ListProps & {
  showSearch?: boolean;
  showPinTopItems?: boolean;
  showPinBottomItems?: boolean;
  showFooter?: boolean;
  showSwitch?: boolean;
  truncateVariant?: TruncateStringProps['variant'];
  showGroups?: boolean;
  showEmptyList?: boolean;
  showCollapsedList?: boolean;
  showAsyncList?: boolean;
  showEmptyState?: EmptyState;
  showEmptyStateActionButton?: boolean;
  selectionMode: 'single' | 'multiple' | 'none';
  defaultValue?: string;
};

const Template: StoryFn<StoryProps> = ({
  showPinTopItems,
  showPinBottomItems,
  showSearch,
  showEmptyList,
  showFooter,
  showSwitch,
  showGroups,
  showCollapsedList,
  showAsyncList,
  showEmptyState = EmptyState.None,
  showEmptyStateActionButton,
  selectionMode,
  truncateVariant,
  defaultValue: defaultValueProp,
  ...args
}) => {
  const defaultValue = useMemo(() => {
    if (!defaultValueProp) {
      return selectionMode === 'single' ? undefined : [];
    }

    return selectionMode === 'single' ? defaultValueProp : [defaultValueProp];
  }, [defaultValueProp, selectionMode]);

  const [value, setValue] = useState<string | string[] | undefined>(defaultValue);

  const [collapse, setCollapseValue] = useState<Array<string | number>>();

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const [search, setSearch] = useState<string>();

  const groupItemsWithSwitch = useMemo(
    () =>
      GROUP_OPTIONS.map(group => ({
        ...group,
        truncate: { ...group.truncate, variant: truncateVariant },
        items: group.items.map(item => ({
          ...item,
          switch: showSwitch,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          content: { ...item.content, truncate: { ...item.content.truncate, variant: truncateVariant } },
        })),
      })),
    [showSwitch, truncateVariant],
  );

  const baseItemsWithSwitch = useMemo(
    () =>
      (showEmptyList ? [] : BASE_OPTIONS).map(item => ({
        ...item,
        switch: showSwitch,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        content: { ...item.content, truncate: { ...item.content.truncate, variant: truncateVariant } },
      })),
    [showEmptyList, showSwitch, truncateVariant],
  );

  const [items, setItems] = useState(LONG_LIST_OPTIONS);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const scrollRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLElement>(null);

  const observer = useRef<IntersectionObserver>();

  const fetchMore = async () => {
    setLoading(true);
    setTimeout(() => {
      setItems(items => items.concat(LONG_LIST_OPTIONS));

      setLoading(false);
    }, 1000);
  };

  const footerActiveItemRefs = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];

      if (target.isIntersecting) {
        setLoading(true);
        fetchMore();
      }
    };

    observer.current = new IntersectionObserver(handleObserver);

    if (scrollRef.current) {
      observer.current.observe(scrollRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [showAsyncList]);

  const unfilteredItems = useMemo(
    () =>
      withDataTestId(
        showGroups ? groupItemsWithSwitch : baseItemsWithSwitch,
        '',
        showPinBottomItems ? baseItemsWithSwitch.length : 0,
      ),
    [baseItemsWithSwitch, groupItemsWithSwitch, showGroups, showPinBottomItems],
  );

  const filteredItems = useMemo(() => {
    switch (showEmptyState) {
      case EmptyState.NotFound:
      case EmptyState.NoData:
        return [];

      case EmptyState.DataError:
      case EmptyState.None:
      default:
        return unfilteredItems;
    }
  }, [showEmptyState, unfilteredItems]);

  if (showAsyncList) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.listContainer}>
          Async List
          <List
            size={args.size}
            items={withDataTestId(items)}
            scroll
            loading={hasMore && loading}
            scrollRef={scrollRef}
            scrollContainerRef={scrollContainerRef}
            data-test-id={args['data-test-id']}
            footerActiveElementsRefs={[footerActiveItemRefs]}
            footer={
              <ButtonFilled
                ref={footerActiveItemRefs}
                className={styles.btn}
                label='Reset'
                onClick={() => {
                  setHasMore(true);
                  setItems([]);
                }}
              />
            }
          />
        </div>
      </div>
    );
  }

  if (showCollapsedList) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.listContainer}>
          Collapsed List
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <List
            items={withDataTestId(EXPAND_OPTIONS)}
            size={args.size}
            data-test-id={args['data-test-id']}
            scroll
            {...(selectionMode !== 'none'
              ? { selection: { value, onChange: setValue, mode: selectionMode } }
              : { selection: undefined })}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.listContainer}>
          Customizable List
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <List
            {...args}
            pinTop={showPinTopItems ? withDataTestId(baseItemsWithSwitch) : undefined}
            pinBottom={
              showPinBottomItems
                ? withDataTestId(
                    baseItemsWithSwitch,
                    '',
                    (showPinTopItems ? baseItemsWithSwitch.length : 0) +
                      (showGroups ? groupItemsWithSwitch : baseItemsWithSwitch).length,
                  )
                : undefined
            }
            search={showSearch ? { value: search, onChange: setSearch, placeholder: 'Placeholder' } : undefined}
            items={filteredItems}
            {...(selectionMode !== 'none'
              ? { selection: { value, onChange: setValue, mode: selectionMode } }
              : { selection: undefined })}
            footerActiveElementsRefs={showFooter ? [footerActiveItemRefs] : undefined}
            collapse={{
              value: collapse,
              onChange: setCollapseValue,
            }}
            dataError={showEmptyState === EmptyState.DataError || args.dataError}
            dataFiltered={args.dataFiltered ?? showEmptyState === EmptyState.NotFound}
            noDataState={showEmptyStateActionButton ? emptyStateSample : undefined}
            noResultsState={showEmptyStateActionButton ? emptyStateSample : undefined}
            errorDataState={showEmptyStateActionButton ? emptyStateSample : undefined}
            footer={
              showFooter ? (
                <ButtonOutline
                  tabIndex={-1}
                  className={styles.btn}
                  ref={footerActiveItemRefs}
                  icon={<PlusSVG />}
                  label={'Edit'}
                  data-test-id={'list__custom-footer'}
                />
              ) : undefined
            }
          />
        </div>
      </div>

      <>{JSON.stringify(value)}</>
    </>
  );
};

export const list = {
  render: Template,

  args: {
    showPinTopItems: true,
    showPinBottomItems: true,
    showSearch: true,
    showEmptyList: false,
    showFooter: true,
    showSwitch: false,
    showGroups: true,
    showEmptyState: EmptyState.None,
    showEmptyStateActionButton: false,
    truncateVariant: 'end',
    marker: true,
    loading: false,
    scroll: true,
    size: 's',
    showCollapsedList: false,
    showAsyncList: false,
    selectionMode: 'single',
    hasListInFocusChain: true,
    scrollToSelectedItem: false,
    defaultValue: '',
  },

  argTypes: {
    showPinTopItems: { name: '[Stories]: Show pinned top item', control: { type: 'boolean' } },
    showPinBottomItems: { name: '[Stories]: Show pinned bottom item', control: { type: 'boolean' } },
    showSearch: { name: '[Stories]: Show search', control: { type: 'boolean' } },
    showEmptyList: { name: '[Stories]: Show empty list', control: { type: 'boolean' } },
    showFooter: { name: '[Stories]: Show footer', control: { type: 'boolean' } },
    showSwitch: { name: '[Stories]: Show switch in items', control: { type: 'boolean' } },
    showGroups: { name: '[Stories]: Show group items', control: { type: 'boolean' } },
    showCollapsedList: { name: '[Stories]: Show collapsed list', control: { type: 'boolean' } },
    showAsyncList: { name: '[Stories]: Show async list', control: { type: 'boolean' } },
    showEmptyState: {
      name: '[Stories]: Empty state',
      control: { type: 'radio' },
      options: Object.values(EmptyState),
      defaultValue: EmptyState.None,
    },
    showEmptyStateActionButton: {
      name: '[Stories]: Show empty state action button',
      control: { type: 'boolean' },
      if: { arg: 'showEmptyState', neq: EmptyState.None },
    },
    truncateVariant: {
      name: '[Stories]: Truncate variant',
      control: { type: 'radio' },
      options: ['end', 'middle'],
    },
    items: { table: { disable: true } },
    pinTop: { table: { disable: true } },
    pinBottom: { table: { disable: true } },
    footer: { table: { disable: true } },
    search: { table: { disable: true } },
    scrollRef: { table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
    selection: { table: { disable: true } },
    noDataState: { table: { disable: true } },
    noResultsState: { table: { disable: true } },
    errorDataState: { table: { disable: true } },
    selectionMode: {
      name: '[Stories]: selection Mode',
      options: Object.keys(STORY_SELECTION_MODE),
      mapping: STORY_SELECTION_MODE,
      control: {
        type: 'select',
      },
    },
    defaultValue: {
      name: '[Stories]: default value',
      control: { type: 'text' },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.0.0?node-id=41%3A7631&mode=design',
    },
  },
};

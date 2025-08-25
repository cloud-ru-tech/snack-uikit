import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { PlaceholderSVG } from '@snack-uikit/icons';
import { toaster } from '@snack-uikit/toaster';
import { extractSupportProps } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toolbar, ToolbarProps } from '../src';
import { BULK_ACTIONS, FILTER_ROW, OPTIONS } from './constants';
import styles from './styles.module.scss';
import { TEST_ID_TOASTER } from './testIds';

const meta: Meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
};

export default meta;

type StoryProps = ToolbarProps & {
  showSearch: boolean;
  showOnRefresh: boolean;
  showBulkActions: boolean;
  showFilters: boolean;
  filterRowOpened: boolean;
  showManyBulkActions: boolean;
  showAfterActions: boolean;
  showMoreActions: boolean;
  enablePersist: boolean;
};

const Template: StoryFn<StoryProps> = ({
  showOnRefresh,
  showBulkActions,
  showManyBulkActions,
  showFilters,
  filterRowOpened,
  showAfterActions,
  showSearch,
  showMoreActions,
  outline,
  selectionMode,
  filterRow,
  enablePersist,
  ...args
}: StoryProps) => {
  const bulkActions = showManyBulkActions ? args.bulkActions : args.bulkActions?.slice(0, 3);
  const [{ checked, indeterminate }, updateArgs] = useArgs<StoryProps>();

  const [filtersValue, setFiltersValue] = useState<Record<string, unknown>>({});
  const [visibleFilters, setVisibleFilters] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');

  const toggleChecked = () => {
    updateArgs({ checked: !checked });
  };

  useEffect(() => {
    const setIndeterminate = (value: boolean) => {
      updateArgs({ indeterminate: value });
    };

    checked && setIndeterminate(false);
  }, [checked, updateArgs]);

  const onRefresh = () => toaster.userAction.neutral({ label: 'Refresh', 'data-test-id': TEST_ID_TOASTER.refresh });
  const onSubmit = () => toaster.userAction.success({ label: 'Submit', 'data-test-id': TEST_ID_TOASTER.submit });

  const afterActions = (
    <>
      <ButtonFunction icon={<PlaceholderSVG />} size='m' />
      <ButtonFunction icon={<PlaceholderSVG />} size='m' />
    </>
  );

  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Toolbar
        {...extractSupportProps(args)}
        outline={outline}
        selectionMode={selectionMode}
        {...(selectionMode === 'multiple'
          ? {
              checked,
              onCheck: toggleChecked,
              bulkActions: showBulkActions ? bulkActions : undefined,
              indeterminate,
            }
          : {})}
        search={
          showSearch
            ? {
                value: searchValue,
                onChange: setSearchValue,
                onSubmit,
              }
            : undefined
        }
        onRefresh={showOnRefresh ? onRefresh : undefined}
        after={showAfterActions ? afterActions : undefined}
        moreActions={showMoreActions ? OPTIONS : undefined}
        filterRow={
          showFilters && filterRow
            ? {
                ...filterRow,
                open: filterRowOpened,
                value: filtersValue,
                onChange: setFiltersValue,
                visibleFilters,
                onVisibleFiltersChange: setVisibleFilters,
              }
            : undefined
        }
        persist={
          enablePersist
            ? {
                id: 'toolbar_filters_story',
                filterQueryKey: 'filters',
                onLoad: ({ filter, search: searchValue }) => {
                  const filterValue = filter || {};
                  setFiltersValue(filterValue);
                  setVisibleFilters(Object.keys(filterValue));
                  setSearchValue(searchValue || '');
                },
              }
            : undefined
        }
      />
    </div>
  );
};

export const toolbar: StoryObj<StoryProps> = {
  render: Template,

  args: {
    outline: false,
    selectionMode: 'multiple',
    checked: false,
    indeterminate: false,
    showBulkActions: true,
    showManyBulkActions: true,
    bulkActions: BULK_ACTIONS,
    showSearch: true,
    search: {
      value: '',
      placeholder: 'Search',
      loading: false,
      onChange() {},
    },
    showFilters: true,
    filterRow: FILTER_ROW,
    filterRowOpened: undefined,
    showMoreActions: true,
    moreActions: OPTIONS,
    showOnRefresh: true,
    showAfterActions: true,
    'data-test-id': 'toolbar',
  },

  argTypes: {
    checked: {
      if: {
        arg: 'selectionMode',
        eq: 'multiple',
      },
    },
    indeterminate: {
      if: {
        arg: 'selectionMode',
        eq: 'multiple',
      },
    },
    showBulkActions: {
      name: '[Story]: Show bulk actions',
      type: 'boolean',
    },
    showManyBulkActions: {
      name: '[Story]: Show many bulk actions to display droplist',
      type: 'boolean',
      if: {
        arg: 'showBulkActions',
        eq: true,
      },
    },
    bulkActions: {
      if: {
        arg: 'showBulkActions',
        eq: true,
      },
    },
    showFilters: {
      name: '[Story]: Show filters',
      type: 'boolean',
    },
    filterRowOpened: {
      name: '[Story]: Filter row open',
      type: 'boolean',
      if: {
        arg: 'showFilters',
        eq: true,
      },
    },
    filterRow: {
      if: {
        arg: 'showFilters',
        eq: true,
      },
    },
    showOnRefresh: {
      name: '[Story]: Apply onRefresh callback',
      type: 'boolean',
    },
    showSearch: {
      name: '[Story]: Apply search props',
      type: 'boolean',
    },
    search: {
      table: { disable: true },
    },
    showAfterActions: {
      name: '[Story]: Show custom ReactNode "after" (on the right side)',
      type: 'boolean',
    },
    showMoreActions: {
      name: '[Story]: Show moreActions',
      type: 'boolean',
    },
    enablePersist: {
      name: '[Story]: Enable filters persist',
      type: 'boolean',
    },

    moreActions: {
      if: {
        arg: 'showMoreActions',
        eq: true,
      },
    },
    after: { table: { disable: true } },
    onCheck: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A224846&mode=design',
    },
  },
};

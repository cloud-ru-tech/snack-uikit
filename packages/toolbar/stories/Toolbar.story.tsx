import { useArgs } from '@storybook/preview-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

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

type StoryProps = ToolbarProps<Record<string, string>> & {
  showSearch: boolean;
  showOnRefresh: boolean;
  showBulkActions: boolean;
  showFilters: boolean;
  filterRowOpened: boolean;
  showManyBulkActions: boolean;
  showAfterActions: boolean;
  showMoreActions: boolean;
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
  bulkActions,
  filterRow,
  ...args
}: StoryProps) => {
  const [{ search, checked, indeterminate }, updateArgs] = useArgs<StoryProps>();

  const onSearchChange = (value: string) => {
    updateArgs({ search: { ...search, value, onChange() {} } });
  };

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
        {...(showBulkActions
          ? {
              checked,
              onCheck: toggleChecked,
              bulkActions: showManyBulkActions ? bulkActions : bulkActions?.slice(0, 3),
              indeterminate,
            }
          : {})}
        search={
          showSearch && search
            ? {
                ...search,
                value: search.value,
                onChange: onSearchChange,
                onSubmit,
              }
            : undefined
        }
        onRefresh={showOnRefresh ? onRefresh : undefined}
        after={showAfterActions ? afterActions : undefined}
        moreActions={showMoreActions ? OPTIONS : undefined}
        filterRow={showFilters && filterRow ? { ...filterRow, open: filterRowOpened } : undefined}
      />
    </div>
  );
};

export const toolbar: StoryObj<StoryProps> = {
  render: Template,

  args: {
    outline: false,
    selectionMode: 'multiple',
    showBulkActions: true,
    showManyBulkActions: true,
    bulkActions: BULK_ACTIONS,
    checked: false,
    indeterminate: false,
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
    checked: {
      if: {
        arg: 'showBulkActions',
        eq: true,
      },
    },
    indeterminate: {
      if: {
        arg: 'showBulkActions',
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
      if: {
        arg: 'showSearch',
        eq: true,
      },
    },
    showAfterActions: {
      name: '[Story]: Show custom ReactNode "after" (on the right side)',
      type: 'boolean',
    },
    showMoreActions: {
      name: '[Story]: Show moreActions',
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

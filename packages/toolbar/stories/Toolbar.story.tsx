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
import { OPTIONS } from './constants';
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
  showOnDelete: boolean;
  showBeforeActions: boolean;
  showAfterActions: boolean;
  showCheckbox: boolean;
  showMoreActions: boolean;
};

const Template: StoryFn<StoryProps> = ({
  showCheckbox,
  showOnRefresh,
  showOnDelete,
  showBeforeActions,
  showAfterActions,
  showSearch,
  showMoreActions,
  outline,
  selectionMode,
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

  const onSubmit = () => {
    toaster.userAction.success({ label: 'Submit action', 'data-test-id': TEST_ID_TOASTER.submit });
  };

  const onDelete = () => {
    toaster.userAction.warning({ label: 'Delete action', 'data-test-id': TEST_ID_TOASTER.delete });
  };

  const onRefresh = () => {
    toaster.userAction.neutral({ label: 'Refresh action', 'data-test-id': TEST_ID_TOASTER.refresh });
  };

  const actions = (
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
        {...(showCheckbox
          ? {
              checked,
              onCheck: toggleChecked,
              onDelete: showOnDelete ? onDelete : undefined,
              indeterminate,
            }
          : { checked: undefined, onCheck: undefined, onDelete: undefined })}
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
        after={showAfterActions ? actions : undefined}
        before={showBeforeActions ? actions : undefined}
        moreActions={showMoreActions ? OPTIONS : undefined}
      />
    </div>
  );
};

export const toolbar: StoryObj<StoryProps> = {
  render: Template,

  args: {
    search: {
      value: '',
      placeholder: 'Search',
      loading: false,
      onChange() {},
    },
    outline: false,
    selectionMode: 'multiple',
    showCheckbox: true,
    checked: false,
    indeterminate: false,
    showOnDelete: true,
    showMoreActions: true,
    moreActions: OPTIONS,
    showSearch: true,
    showOnRefresh: true,
    showBeforeActions: false,
    showAfterActions: true,
    'data-test-id': 'toolbar',
  },

  argTypes: {
    showCheckbox: {
      name: '[Story]: Show checkbox',
      type: 'boolean',
    },
    checked: {
      if: {
        arg: 'showCheckbox',
        eq: true,
      },
    },
    indeterminate: {
      if: {
        arg: 'showCheckbox',
        eq: true,
      },
    },
    onCheck: {
      if: {
        arg: 'showCheckbox',
        eq: true,
      },
    },
    showOnDelete: {
      name: '[Story]: Apply onDelete callback',
      type: 'boolean',
      if: {
        arg: 'showCheckbox',
        eq: true,
      },
    },
    onDelete: {
      if: {
        arg: 'showOnDelete',
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
    showAfterActions: {
      name: '[Story]: Show custom ReactNode "after" (on the right side)',
      type: 'boolean',
    },
    showBeforeActions: {
      name: '[Story]: Show ReactNode "before" (on the left side)',
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
    after: {
      if: {
        arg: 'showAfterActions',
        eq: true,
      },
    },
    before: {
      if: {
        arg: 'showBeforeActions',
        eq: true,
      },
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A224846&mode=design',
    },
  },
};

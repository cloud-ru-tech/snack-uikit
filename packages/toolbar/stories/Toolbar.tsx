import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ButtonFunction } from '@snack-ui/button';
import { PlaceholderSVG } from '@snack-ui/icons';
import { toaster } from '@snack-ui/toaster';
import { extractSupportProps } from '@snack-ui/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Toolbar, ToolbarProps } from '../src';
import { OPTIONS } from './constants';
import { extractToolbarArgs } from './helpers';
import styles from './styles.module.scss';
import { TEST_ID_TOASTER } from './testIds';

const meta: Meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
};

export default meta;

type StoryProps = ToolbarProps & {
  showOnRefresh: boolean;
  showOnDelete: boolean;
  showActions: boolean;
  showCheckbox: boolean;
  showMoreActions: boolean;
};

const Template: StoryFn<StoryProps> = ({
  showCheckbox,
  showOnRefresh,
  showOnDelete,
  showActions,
  showMoreActions,
  checked: checkedProp,
  indeterminate: indeterminateProp,
  value: valueProp,
  ...args
}: StoryProps) => {
  const [value, setValue] = useState<string>(valueProp || '');
  const [checked, setChecked] = useState<boolean>(checkedProp || false);
  const [indeterminate, setIndeterminate] = useState<boolean>(indeterminateProp || false);

  useEffect(() => {
    setChecked(checkedProp || false);
  }, [checkedProp]);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  useEffect(() => {
    setIndeterminate(indeterminateProp || false);
  }, [indeterminateProp]);

  useEffect(() => {
    checked && setIndeterminate(false);
  }, [checked]);

  const onSubmit = () => {
    toaster.userAction.success({ label: 'Submit action', 'data-test-id': TEST_ID_TOASTER.submit });
  };

  const onDelete = () => {
    toaster.userAction.warning({ label: 'Delete action', 'data-test-id': TEST_ID_TOASTER.delete });
  };

  const onRefresh = () => {
    toaster.userAction.neutral({ label: 'Refresh action', 'data-test-id': TEST_ID_TOASTER.refresh });
  };

  return (
    <div className={styles.wrapper}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Toolbar
        {...extractSupportProps(args)}
        {...extractToolbarArgs(args)}
        {...(showCheckbox
          ? {
              checked,
              onCheck: () => setChecked(v => !v),
              onDelete: showOnDelete ? onDelete : undefined,
              indeterminate,
            }
          : { checked: undefined, onCheck: undefined, onDelete: undefined })}
        value={value}
        onChange={setValue}
        onRefresh={showOnRefresh ? onRefresh : undefined}
        onSubmit={onSubmit}
        actions={
          showActions ? (
            <>
              <ButtonFunction icon={<PlaceholderSVG />} size={ButtonFunction.sizes.M} />
              <ButtonFunction icon={<PlaceholderSVG />} size={ButtonFunction.sizes.M} />
            </>
          ) : undefined
        }
        moreActions={showMoreActions ? OPTIONS : undefined}
      />
    </div>
  );
};

export const toolbar: StoryObj<StoryProps> = Template.bind({});

toolbar.args = {
  value: '',
  placeholder: 'Search',
  loading: false,
  showCheckbox: true,
  checked: false,
  indeterminate: false,
  showOnDelete: true,
  showMoreActions: true,
  moreActions: OPTIONS,
  showOnRefresh: true,
  showActions: true,
  'data-test-id': 'toolbar',
};

toolbar.argTypes = {
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
  showActions: {
    name: '[Story]: Show additional Actions (ReactNode)',
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
  actions: {
    if: {
      arg: 'showActions',
      eq: true,
    },
  },
};

toolbar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jXwdPVLYopxUCx5LOe1PQY/branch/JapbLcKnQw4h6ghzCPRTMD/Toolbar',
  },
};

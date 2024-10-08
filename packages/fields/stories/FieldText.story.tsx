import { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useEffect, useState } from 'react';

import { toaster } from '@snack-uikit/toaster';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldText, FieldTextProps } from '../src';
import { BUTTON_VARIANT } from '../src/constants';
import { ButtonVariant } from '../src/types';
import { COMMON_ARG_TYPES, ICONS, PREFIX_POSTFIX_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Text',
  component: FieldText,
};
export default meta;

type StoryProps = FieldTextProps & {
  localeName: undefined;
  buttonContent?: ReactElement;
  buttonVariant: ButtonVariant;
  showButtonItems: boolean;
};

const Template = ({ size, ...args }: StoryProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldText
        {...args}
        size={size}
        value={value}
        onChange={setValue}
        button={
          args.buttonContent
            ? {
                variant: args.buttonVariant,
                content: args.buttonContent,
                items: args.showButtonItems
                  ? [
                      {
                        id: '1',
                        content: { option: 'Option 1', caption: 'Caption' },
                        onClick: () => {
                          toaster.userAction.success({ label: 'Option 1 clicked' });
                        },
                      },
                      {
                        id: '2',
                        content: { option: 'Option 2', caption: 'Caption' },
                        onClick: () => {
                          toaster.userAction.success({ label: 'Option 2 clicked' });
                        },
                      },
                      {
                        id: '3',
                        content: { option: 'Option 3', caption: 'Caption' },
                        disabled: true,
                        onClick: () => {
                          toaster.userAction.success({ label: 'Option 2 clicked' });
                        },
                      },
                    ]
                  : undefined,
              }
            : undefined
        }
      />
    </div>
  );
};

export const fieldText: StoryObj<StoryProps> = {
  render: Template,

  args: {
    id: 'text',
    value: '',
    placeholder: 'Placeholder',
    maxLength: undefined,
    readonly: false,
    disabled: false,
    label: 'Label text',
    labelTooltip: 'Tooltip description',
    required: false,
    caption: 'Caption',
    hint: 'Hint text',
    size: 's',
    validationState: 'default',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prefixIcon: 'none',
    prefix: '',
    postfix: '',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    buttonContent: 'none',
    buttonVariant: 'before',
    showButtonItems: false,
    showCopyButton: true,
    showClearButton: true,
    allowMoreThanMaxLength: false,
  },

  argTypes: {
    ...PREFIX_POSTFIX_ARG_TYPES,
    ...COMMON_ARG_TYPES,
    localeName: {
      table: {
        disable: true,
      },
    },
    buttonContent: {
      name: '[Story]: Field button content',
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: 'select',
      },
    },
    buttonVariant: {
      options: Object.values(BUTTON_VARIANT),
      control: {
        type: 'radio',
      },
    },
    showButtonItems: {
      name: '[Story]: Show icon drop',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1',
    },
  },
};

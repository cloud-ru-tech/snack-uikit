import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import { getBuildCellProps } from '../../calendar/stories/helper';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldDate, FieldDateProps } from '../src';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Date',
  component: FieldDate,
};
export default meta;

type StoryProps = Omit<FieldDateProps, 'value'> & {
  prefixIcon: undefined;
  modeBuildCellProps: 'for-tests' | 'disable-past' | 'none';
  dateValue?: string;
  showSeconds?: boolean;
};

const Template = ({ size, modeBuildCellProps, ...args }: StoryProps) => {
  const argsNormalizedValue = useMemo(() => (args.dateValue ? new Date(args.dateValue) : undefined), [args.dateValue]);
  const [value, setValue] = useState(argsNormalizedValue);

  useEffect(() => {
    setValue(argsNormalizedValue);
  }, [argsNormalizedValue]);

  const buildCellProps = getBuildCellProps(modeBuildCellProps) || undefined;
  const validationState = value && buildCellProps?.(value, 'month')?.isDisabled ? 'error' : undefined;
  const hint = validationState === 'error' ? 'Дата не может быть выбрана' : args.hint;

  return (
    <div className={styles.wrapper} data-size={size} key={args.mode}>
      <FieldDate
        {...args}
        key={value?.toUTCString() ?? ''}
        showSeconds={'showSeconds' in args ? (args.showSeconds as boolean) : undefined}
        size={size}
        value={value}
        buildCellProps={buildCellProps}
        validationState={modeBuildCellProps === 'none' ? args.validationState : validationState}
        hint={modeBuildCellProps === 'none' ? args.hint : hint}
        onChange={value => {
          action('onChange')(value);
          setValue(value);
        }}
      />
    </div>
  );
};

export const fieldDate: StoryObj<StoryProps> = {
  render: Template,

  args: {
    mode: 'date',
    showSeconds: true,
    id: 'date',
    readonly: false,
    showCopyButton: true,
    disabled: false,
    label: 'Label text',
    labelTooltip: 'Tooltip description',
    required: false,
    caption: 'Caption',
    hint: 'Hint text',
    size: 's',
    validationState: 'default',
    showClearButton: true,
    modeBuildCellProps: 'none',
  },

  argTypes: {
    ...COMMON_ARG_TYPES,
    showSeconds: {
      if: {
        arg: 'mode',
        eq: 'date-time',
      },
    },
    prefixIcon: {
      table: {
        disable: true,
      },
    },
    modeBuildCellProps: {
      name: '[story] select buildCellProps operating mode',
      options: ['for-tests', 'disable-past', 'none'],
      control: { type: 'radio' },
    },
    dateValue: {
      name: 'value',
      control: { type: 'date' },
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=402%3A202402&mode=design',
    },
  },
};

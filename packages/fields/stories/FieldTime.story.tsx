import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldTime, FieldTimeProps } from '../src';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Time',
  component: FieldTime,
};
export default meta;

type StoryProps = FieldTimeProps & {
  prefixIcon: undefined;
  valueHours: number;
  valueMinutes: number;
  valueSeconds: number;
};

const Template = ({ size, valueHours, valueMinutes, valueSeconds, ...args }: StoryProps) => {
  const argsNormalizedValue: FieldTimeProps['value'] = useMemo(
    () =>
      [valueHours, valueMinutes, valueSeconds].every(value => value === undefined || String(value) === '')
        ? undefined
        : {
            hours: valueHours,
            minutes: valueMinutes,
            seconds: valueSeconds,
          },
    [valueHours, valueMinutes, valueSeconds],
  );

  const [value, setValue] = useState<FieldTimeProps['value']>(argsNormalizedValue);

  useEffect(() => {
    setValue(argsNormalizedValue);
  }, [argsNormalizedValue]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldTime
        {...args}
        size={size}
        value={value}
        onChange={value => {
          action('onChange')(value);
          setValue(value);
        }}
      />
    </div>
  );
};

export const fieldTime: StoryObj<StoryProps> = {
  render: Template,

  args: {
    id: 'date',
    showSeconds: true,
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
  },

  argTypes: {
    ...COMMON_ARG_TYPES,
    prefixIcon: { table: { disable: true } },
    value: { table: { disable: true } },
    valueHours: {
      name: '[value] hours',
      control: { type: 'number' },
    },
    valueMinutes: {
      name: '[value] minutes',
      control: { type: 'number' },
    },
    valueSeconds: {
      name: '[value] seconds',
      control: { type: 'number' },
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

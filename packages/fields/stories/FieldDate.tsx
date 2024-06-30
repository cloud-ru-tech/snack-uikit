import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import { getBuildCellProps } from '../../calendar/stories/helper';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldDate, FieldDateProps, parseDate } from '../src';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Date',
  component: FieldDate,
};
export default meta;

type StoryProps = Omit<FieldDateProps, 'locale'> & {
  localeName: 'ru-RU' | 'en-US';
  prefixIcon: undefined;
  modeBuildCellProps: 'for-tests' | 'disable-past' | 'none';
};

const Template = ({ size, localeName, modeBuildCellProps, ...args }: StoryProps) => {
  const locale = new Intl.Locale(localeName);

  const argsNormalizedValue = args.value?.replaceAll('-', '.');

  const [value, setValue] = useState(argsNormalizedValue);

  useEffect(() => {
    setValue(argsNormalizedValue);
  }, [argsNormalizedValue]);

  const buildCellProps = getBuildCellProps(modeBuildCellProps) || undefined;
  const validationState = buildCellProps?.(parseDate(value), 'month')?.isDisabled ? 'error' : undefined;
  const hint = validationState === 'error' ? 'Дата не может быть выбрана' : args.hint;

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldDate
        {...args}
        size={size}
        value={value}
        buildCellProps={buildCellProps}
        validationState={modeBuildCellProps === 'none' ? args.validationState : validationState}
        hint={modeBuildCellProps === 'none' ? args.hint : hint}
        onChange={value => {
          action('onChange')(value);
          setValue(value);
        }}
        locale={locale}
      />
    </div>
  );
};

export const fieldDate: StoryFn<StoryProps> = Template.bind({});

fieldDate.args = {
  id: 'date',
  value: '',
  readonly: false,
  disabled: false,
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  required: false,
  caption: 'Caption',
  hint: 'Hint text',
  size: 's',
  validationState: 'default',
  showCopyButton: true,
  showClearButton: true,
  localeName: 'en-US',
  modeBuildCellProps: 'none',
};

fieldDate.argTypes = {
  ...COMMON_ARG_TYPES,
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
};

fieldDate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=402%3A202402&mode=design',
  },
};

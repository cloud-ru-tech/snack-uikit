import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

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

type StoryProps = Omit<FieldDateProps, 'locale'> & {
  localeName: 'ru-RU' | 'en-US';
  prefixIcon: undefined;
};

const Template = ({ size, localeName, ...args }: StoryProps) => {
  const locale = new Intl.Locale(localeName);

  const argsNormalizedValue = args.value?.replaceAll('-', '.');

  const [value, setValue] = useState(argsNormalizedValue);

  useEffect(() => {
    setValue(argsNormalizedValue);
  }, [argsNormalizedValue]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldDate
        {...args}
        size={size}
        value={value}
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
  hint: 'Hint text',
  size: 's',
  validationState: 'default',
  showCopyButton: true,
  showClearButton: true,
  localeName: 'en-US',
};

fieldDate.argTypes = {
  ...COMMON_ARG_TYPES,
  prefixIcon: {
    table: {
      disable: true,
    },
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

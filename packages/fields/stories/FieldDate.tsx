import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldDate, FieldDateProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Date',
  component: FieldDate,
};
export default meta;

type StoryProps = Omit<FieldDateProps, 'locale'> & {
  localeName: 'ru-RU' | 'en-US';
};

const Template = ({ size, localeName, ...args }: StoryProps) => {
  const locale = new Intl.Locale(localeName);

  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldDate {...args} size={size} value={value} onChange={setValue} locale={locale} />
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
  labelTooltip: 'Hint',
  required: false,
  hint: 'Hint text',
  size: FieldDate.sizes.S,
  validationState: FieldDate.validationStates.Default,
  showCopyButton: true,
  localeName: 'en-US',
};

fieldDate.argTypes = {
  localeName: {
    options: ['ru-RU', 'en-US'],
    control: { type: 'radio' },
  },
};

fieldDate.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SYvC3aBKVp74sXjw9gJQpw/branch/sD5hKkFPUTZUqpvMwm1wY4/Fields?type=design&node-id=0-1&t=q929qY6j9vimlPMf-0',
  },
};

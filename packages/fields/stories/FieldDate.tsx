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

const Template = ({ size, ...args }: FieldDateProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldDate {...args} size={size} value={value} onChange={setValue} />
    </div>
  );
};

export const fieldDate: StoryFn<FieldDateProps> = Template.bind({});

fieldDate.args = {
  id: 'date',
  value: '',
  readonly: false,
  disabled: false,
  label: 'Label text',
  labelTooltip: 'Hint',
  required: true,
  hint: 'Hint text',
  size: FieldDate.sizes.S,
  validationState: FieldDate.validationStates.Default,
  showCopyButton: true,
};

fieldDate.argTypes = {};

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

import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldSelect, FieldSelectProps } from '../src';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Select',
  component: FieldSelect,
};
export default meta;

const DEFAULT_OPTIONS = [
  { value: 'op1', label: 'Option 1' },
  { value: 'op2', label: 'Option 2' },
  { value: 'op3', label: 'Option 3' },
];

const getValue = (value: string | undefined) => DEFAULT_OPTIONS.find(op => op.label === value)?.value;

const Template = ({ size, ...args }: FieldSelectProps) => {
  const [value, setValue] = useState(getValue(args.value));

  useEffect(() => {
    setValue(getValue(args.value));
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldSelect {...args} size={size} value={value} onChange={setValue} />
    </div>
  );
};

export const fieldSelect: StoryFn<FieldSelectProps> = Template.bind({});

fieldSelect.args = {
  id: 'select',
  value: undefined,
  placeholder: 'Placeholder',
  readonly: false,
  disabled: false,
  searchable: true,
  label: 'Label text',
  labelTooltip: 'Hint',
  required: true,
  hint: 'Hint text',
  size: FieldSelect.sizes.S,
  validationState: FieldSelect.validationState.Default,
  options: DEFAULT_OPTIONS,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  prefixIcon: 'none',
  showCopyButton: true,
};

fieldSelect.argTypes = {
  value: {
    name: 'value',
    options: DEFAULT_OPTIONS.map(option => option.label),
    control: {
      type: 'select',
    },
  },
  prefixIcon: {
    name: 'prefixIcon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
};

fieldSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SYvC3aBKVp74sXjw9gJQpw/branch/sD5hKkFPUTZUqpvMwm1wY4/Fields?type=design&node-id=0-1&t=q929qY6j9vimlPMf-0',
  },
};

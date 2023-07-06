import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldText, FieldTextProps } from '../src';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Text',
  component: FieldText,
};
export default meta;

const Template = ({ size, ...args }: FieldTextProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldText {...args} size={size} value={value} onChange={setValue} />
    </div>
  );
};

export const fieldText: StoryFn<FieldTextProps> = Template.bind({});

fieldText.args = {
  id: 'text',
  value: '',
  placeholder: 'Placeholder',
  maxLength: undefined,
  readonly: false,
  disabled: false,
  label: 'Label text',
  labelTooltip: 'Hint',
  required: true,
  hint: 'Hint text',
  size: FieldText.sizes.S,
  validationState: FieldText.validationStates.Default,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  prefixIcon: 'none',
  showCopyButton: true,
  allowMoreThanMaxLength: false,
};

fieldText.argTypes = {
  prefixIcon: {
    name: 'prefixIcon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
};

fieldText.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SYvC3aBKVp74sXjw9gJQpw/branch/sD5hKkFPUTZUqpvMwm1wY4/Fields?type=design&node-id=0-1&t=q929qY6j9vimlPMf-0',
  },
};

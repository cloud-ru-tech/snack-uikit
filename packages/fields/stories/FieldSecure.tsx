import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldSecure, FieldSecureProps } from '../src';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Secure',
  component: FieldSecure,
};
export default meta;

const Template = ({ size, ...args }: FieldSecureProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldSecure {...args} size={size} value={value} onChange={setValue} />
    </div>
  );
};

export const fieldSecure: StoryFn<FieldSecureProps> = Template.bind({});

fieldSecure.args = {
  id: 'password',
  value: '',
  placeholder: 'Placeholder',
  maxLength: undefined,
  readonly: false,
  disabled: false,
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  required: false,
  hint: 'Hint text',
  size: FieldSecure.sizes.S,
  validationState: FieldSecure.validationStates.Default,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  prefixIcon: 'none',
  showCopyButton: true,
  allowMoreThanMaxLength: false,
};

fieldSecure.argTypes = {
  prefixIcon: {
    name: 'prefixIcon',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
};

fieldSecure.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SYvC3aBKVp74sXjw9gJQpw/branch/sD5hKkFPUTZUqpvMwm1wY4/Fields?type=design&node-id=0-1&t=q929qY6j9vimlPMf-0',
  },
};

import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldStepper, FieldStepperProps } from '../src';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Stepper',
  component: FieldStepper,
};
export default meta;

type StoryProps = FieldStepperProps & {
  localeName: undefined;
  prefixIcon: undefined;
};

const Template = ({ size, ...args }: StoryProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldStepper {...args} size={size} value={value} onChange={setValue} />
    </div>
  );
};

export const fieldStepper: StoryFn<StoryProps> = Template.bind({});

fieldStepper.args = {
  id: 'text',
  value: 6,
  min: 0,
  max: 10,
  step: 1,
  readonly: false,
  disabled: false,
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  required: false,
  hint: 'Hint text',
  size: 's',
  validationState: 'default',
  allowMoreThanLimits: true,
};

fieldStepper.argTypes = {
  ...COMMON_ARG_TYPES,
  localeName: { table: { disable: true } },
  prefixIcon: { table: { disable: true } },
};

fieldStepper.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41-38747&mode=design',
  },
};

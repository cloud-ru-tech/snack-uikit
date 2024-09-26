import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldColor, FieldColorProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Color',
  component: FieldColor,
};
export default meta;

type StoryProps = FieldColorProps;

const Template = ({ size, ...args }: StoryProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldColor {...args} size={size} value={value} onChange={setValue} />
    </div>
  );
};

export const fieldColor: StoryFn<StoryProps> = Template.bind({});

fieldColor.args = {
  id: 'text',
  value: '#794ed3',
  autoApply: false,
  withAlpha: true,
  readonly: false,
  disabled: false,
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  placeholder: '#f5f5f5',
  required: false,
  caption: 'Caption',
  hint: 'Hint text',
  size: 's',

  validationState: 'default',
  showCopyButton: true,
  showClearButton: true,
};

fieldColor.argTypes = {
  labelTooltip: {
    control: {
      type: 'text',
    },
  },
};

fieldColor.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1',
  },
};

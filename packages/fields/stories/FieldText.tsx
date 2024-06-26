import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldText, FieldTextProps } from '../src';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Text',
  component: FieldText,
};
export default meta;

type StoryProps = FieldTextProps & {
  localeName: undefined;
};

const Template = ({ size, ...args }: StoryProps) => {
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

export const fieldText: StoryFn<StoryProps> = Template.bind({});

fieldText.args = {
  id: 'text',
  value: '',
  placeholder: 'Placeholder',
  maxLength: undefined,
  readonly: false,
  disabled: false,
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  required: false,
  caption: 'Caption',
  hint: 'Hint text',
  size: 's',
  validationState: 'default',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  prefixIcon: 'none',
  showCopyButton: true,
  showClearButton: true,
  allowMoreThanMaxLength: false,
};

fieldText.argTypes = {
  ...COMMON_ARG_TYPES,
  localeName: {
    table: {
      disable: true,
    },
  },
};

fieldText.parameters = {
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

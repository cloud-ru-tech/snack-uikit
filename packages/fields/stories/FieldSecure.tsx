import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldSecure, FieldSecureProps } from '../src';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Secure',
  component: FieldSecure,
};
export default meta;

type StoryProps = FieldSecureProps & {
  localeName: undefined;
  showAsyncValueExample: boolean;
};

const Template = ({ size, showAsyncValueExample, ...args }: StoryProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldSecure
        {...args}
        size={size}
        value={value}
        onChange={setValue}
        asyncValueGetter={
          showAsyncValueExample
            ? () =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve('async value');
                  }, 2000);
                })
            : undefined
        }
      />
    </div>
  );
};

export const fieldSecure: StoryFn<StoryProps> = Template.bind({});

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
  caption: 'Caption',
  hint: 'Hint text',
  size: 's',
  validationState: 'default',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  prefixIcon: 'none',
  showCopyButton: true,
  allowMoreThanMaxLength: false,
  showAsyncValueExample: false,
};

fieldSecure.argTypes = {
  ...COMMON_ARG_TYPES,
  localeName: {
    table: {
      disable: true,
    },
  },
  showAsyncValueExample: {
    name: '[Story]: Example with async value',
    control: {
      type: 'boolean',
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
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1',
  },
};

import { Meta, StoryFn } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldTextArea, FieldTextAreaProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Text Area',
  component: FieldTextArea,
};
export default meta;

const Template = ({ size, ...args }: FieldTextAreaProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  useEffect(() => {
    // for storybook purposes only - cleanup textarea height if it has been resized
    if (!args.resizable) {
      const resizableArea = document.querySelector('.os-host') as HTMLDivElement | undefined;

      if (resizableArea) {
        resizableArea.style.height = '';
      }
    }
  }, [args.resizable]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldTextArea {...args} size={size} value={value} onChange={setValue} />
    </div>
  );
};

export const fieldTextArea: StoryFn<FieldTextAreaProps> = Template.bind({});

fieldTextArea.args = {
  id: 'textarea',
  value: '',
  placeholder: 'Placeholder',
  maxLength: undefined,
  maxRows: undefined,
  readonly: false,
  disabled: false,
  resizable: false,
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  required: false,
  hint: 'Hint text',
  size: FieldTextArea.sizes.S,
  validationState: FieldTextArea.validationStates.Default,
  showCopyButton: true,
  allowMoreThanMaxLength: true,
};

fieldTextArea.argTypes = {};

fieldTextArea.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/SYvC3aBKVp74sXjw9gJQpw/branch/sD5hKkFPUTZUqpvMwm1wY4/Fields?type=design&node-id=0-1&t=q929qY6j9vimlPMf-0',
  },
};

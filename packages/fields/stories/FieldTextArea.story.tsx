import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldTextArea, FieldTextAreaProps } from '../src';
import { COMMON_ARG_TYPES } from './constants';
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

export const fieldTextArea: StoryObj<FieldTextAreaProps> = {
  render: Template,

  args: {
    id: 'textarea',
    value: '',
    placeholder: 'Placeholder',
    maxLength: undefined,
    minRows: 3,
    maxRows: 1000,
    readonly: false,
    showCopyButton: true,
    disabled: false,
    resizable: false,
    label: 'Label text',
    labelTooltip: 'Tooltip description',
    required: false,
    caption: 'Caption',
    hint: 'Hint text',
    size: 's',
    validationState: 'default',
    showClearButton: true,
    allowMoreThanMaxLength: true,
  },

  argTypes: {
    validationState: COMMON_ARG_TYPES.validationState,
    labelTooltip: COMMON_ARG_TYPES.labelTooltip,
    showCopyButton: COMMON_ARG_TYPES.showCopyButton,
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=402%3A202402&mode=design',
    },
  },
};

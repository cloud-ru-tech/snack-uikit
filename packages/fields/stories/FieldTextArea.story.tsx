import { Meta, StoryObj } from '@storybook/react';
import { MouseEvent, useEffect, useMemo, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldTextArea, FieldTextAreaProps } from '../src';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

type StoryProps = FieldTextAreaProps & {
  showActionsFooter: boolean;
};

const meta: Meta = {
  title: 'Components/Fields/Field Text Area',
  component: FieldTextArea,
};
export default meta;

function createStubAction(demoItemName: string) {
  return (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    window.alert(`${demoItemName} clicked!`);
  };
}

const Template = ({ size, showActionsFooter, ...args }: StoryProps) => {
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

  const footer: FieldTextAreaProps['footer'] = useMemo(() => {
    if (!showActionsFooter) {
      return null;
    }

    return (
      <div className={styles.footer}>
        <div className={styles.actionsWrapper} data-position='left'>
          <ButtonFunction icon={<PlaceholderSVG />} onClick={createStubAction('left')} />
        </div>
        <div className={styles.actionsWrapper} data-position='right'>
          <ButtonFunction icon={<PlaceholderSVG />} onClick={createStubAction('right 1')} />
          <ButtonFunction icon={<PlaceholderSVG />} onClick={createStubAction('right 2')} />
        </div>
      </div>
    );
  }, [showActionsFooter]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldTextArea {...args} size={size} value={value} onChange={setValue} footer={footer} />
    </div>
  );
};

export const fieldTextArea: StoryObj<StoryProps> = {
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
    showActionsFooter: false,
  },

  argTypes: {
    validationState: COMMON_ARG_TYPES.validationState,
    labelTooltip: COMMON_ARG_TYPES.labelTooltip,
    showCopyButton: COMMON_ARG_TYPES.showCopyButton,
    showActionsFooter: {
      name: '[Story]: Control actions slots visibility',
      control: { type: 'boolean' },
    },
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

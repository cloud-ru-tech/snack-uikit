import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { FieldTextArea } from '@snack-uikit/fields';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ColorPicker, ColorPickerProps, RawColor } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Color Picker',
  component: ColorPicker,
};
export default meta;

const Template: StoryFn<ColorPickerProps> = ({ ...args }: ColorPickerProps) => {
  const [value, setValue] = useState<string>('#000');
  const [rawValue, setRawValue] = useState<RawColor>({} as RawColor);

  const handleChange = (raw: RawColor) => {
    setValue(raw.hex);
    setRawValue(raw);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ColorPicker {...args} value={value} onChange={handleChange} />
      </div>

      <div className={styles.rawContainer}>
        <FieldTextArea readonly label='RawValue' value={JSON.stringify(rawValue, null, 2)} size='m' />
      </div>
    </div>
  );
};

export const colorPicker: StoryObj<ColorPickerProps> = Template.bind({});

colorPicker.args = {
  autoApply: false,
  withAlpha: true,
  value: '#000000',
};

colorPicker.argTypes = {
  value: {
    type: 'string',
  },
  onChange: {
    visibility: false,
  },
};

colorPicker.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/design/jtGxAPvFJOMir7V0eQFukN/branch/Rq5wXgsa8hopMLIL5iXxN2/Snack-UI-Kit-4.0.0?node-id=10776-174&node-type=canvas&m=dev',
  },
};

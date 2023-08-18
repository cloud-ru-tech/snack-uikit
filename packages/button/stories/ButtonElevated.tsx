import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonElevated, ButtonElevatedProps } from '../src';
import { ICONS } from './constants';
import { ControlledWrapper } from './helperComponents';

const REQUIRED_ICONS = { ...ICONS };
delete REQUIRED_ICONS.none;

const meta: Meta = {
  title: 'Components/Button/Button Elevated',
  component: ButtonElevated,
};
export default meta;

type StoryProps = ButtonElevatedProps & { testMode: boolean };
const Template: StoryFn<StoryProps> = ({ testMode, ...args }) => {
  const [count, setCount] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inc = (e: any) => {
    args.onClick && args.onClick(e);
    setCount(v => v + 1);
  };

  const opacity = testMode ? 1 : 0;

  return (
    <>
      <ControlledWrapper>
        <ButtonElevated {...args} onClick={inc} />
      </ControlledWrapper>

      <div style={{ opacity }}>
        <span>Controlled button presses: </span>
        <span data-test-id={'count'}>{count}</span>
      </div>
    </>
  );
};

export const buttonElevated: StoryObj<StoryProps> = Template.bind({});

buttonElevated.args = {
  disabled: false,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  icon: Object.entries(REQUIRED_ICONS)[0][0],
  size: ButtonElevated.sizes.S,
  testMode: false,
};

buttonElevated.argTypes = {
  testMode: {
    name: '[Stories]: Show onClick counter',
    control: {
      type: 'boolean',
    },
  },
  onClick: {
    table: {
      disable: true,
    },
  },
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(REQUIRED_ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
};

buttonElevated.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/L269NVTVGVM3Ui3MCCGGI0/Button?node-id=352%3A12377&t=Aka15kVBSuY1vUk1-0',
  },
};

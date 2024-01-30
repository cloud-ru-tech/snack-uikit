import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonElevated, ButtonElevatedProps } from '../src';
import { SIZE } from '../src/components/ButtonElevated/constants';
import { COMMON_ARG_TYPES, ICONS } from './constants';
import { ControlledWrapper } from './helperComponents';

const REQUIRED_ICONS = { ...ICONS };
delete REQUIRED_ICONS.none;

const meta: Meta = {
  title: 'Components/Button/Button Elevated',
  component: ButtonElevated,
};
export default meta;

type StoryProps = ButtonElevatedProps & { testMode: boolean; appearance: undefined };

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
  size: 's',
  testMode: false,
};

buttonElevated.argTypes = {
  ...COMMON_ARG_TYPES,
  appearance: {
    table: {
      disable: true,
    },
  },
  size: {
    options: Object.values(SIZE),
    control: {
      type: 'radio',
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
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A8268&mode=design',
  },
};

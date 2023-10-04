import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PlaceholderSVG } from '@snack-ui/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonSimple, ButtonSimpleProps } from '../src';
import { BUTTON_ARGS, ICONS, STORY_WITH_COUNTER_ARG_TYPES, StoryCounterProps } from './constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Components/Button/Button Simple',
  component: ButtonSimple,
};
export default meta;

type StoryProps = ButtonSimpleProps & StoryCounterProps & { testMode: boolean };
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
        <ButtonSimple {...args} onClick={inc} />
      </ControlledWrapper>

      <TableWrapper>
        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonSimple {...BUTTON_ARGS} icon={<PlaceholderSVG />} label={undefined} />
          </TableCell>
          <TableCell>
            <ButtonSimple {...BUTTON_ARGS} icon={<PlaceholderSVG />} label={undefined} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonSimple {...BUTTON_ARGS} icon={undefined} label='Label Text' />
          </TableCell>
          <TableCell>
            <ButtonSimple {...BUTTON_ARGS} icon={undefined} label='Label Text' />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label + Icon</TableCell>
          <TableCell>
            <ButtonSimple {...BUTTON_ARGS} icon={<PlaceholderSVG />} label='Label Text' />
          </TableCell>
          <TableCell>
            <ButtonSimple {...BUTTON_ARGS} icon={<PlaceholderSVG />} label='Label Text' />
          </TableCell>
        </TableColumn>
      </TableWrapper>

      <div style={{ opacity }}>
        <span>Controlled button presses: </span>
        <span data-test-id={'count'}>{count}</span>
      </div>
    </>
  );
};

export const buttonSimple: StoryObj<StoryProps> = Template.bind({});

buttonSimple.args = {
  label: 'Label text',
  disabled: false,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  icon: 'none',
  type: ButtonSimple.types.Button,
  appearance: ButtonSimple.appearances.Neutral,
  size: ButtonSimple.sizes.S,
  testMode: false,
};

buttonSimple.argTypes = {
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
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
  type: {
    control: {
      type: 'radio',
      options: ['neutral', 'primary', 'critical'],
    },
  },
  ...STORY_WITH_COUNTER_ARG_TYPES,
};
buttonSimple.parameters = {
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

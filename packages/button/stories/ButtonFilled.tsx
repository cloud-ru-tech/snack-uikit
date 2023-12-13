import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonFilled, ButtonFilledProps } from '../src';
import { BUTTON_ARGS, COMMON_ARG_TYPES } from './constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Components/Button/Button Filled',
  component: ButtonFilled,
};
export default meta;

type StoryProps = ButtonFilledProps & { testMode: boolean };
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
        <ButtonFilled {...args} onClick={inc} />
      </ControlledWrapper>

      <TableWrapper>
        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonFilled {...BUTTON_ARGS} icon={<PlaceholderSVG />} label={undefined} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonFilled {...BUTTON_ARGS} icon={undefined} label='Label Only' />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label + Icon</TableCell>
          <TableCell>
            <ButtonFilled {...BUTTON_ARGS} icon={<PlaceholderSVG />} label='IconAfter' />
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

export const buttonFilled: StoryObj<StoryProps> = Template.bind({});

buttonFilled.args = {
  label: 'Label text',
  disabled: false,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  icon: 'none',
  type: 'button',
  appearance: 'primary',
  size: 's',
  testMode: false,
};

buttonFilled.argTypes = COMMON_ARG_TYPES;

buttonFilled.parameters = {
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

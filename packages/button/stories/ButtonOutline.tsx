import { PlaceholderSVG } from '@snack-ui/icons';
import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonOutline, ButtonOutlineProps } from '../src';
import { ICONS } from './constants';
import { TableCell, TableColumn, TableWrapper } from './helperComponents';

export default {
  title: 'Components/Button/ButtonOutline',
  component: ButtonOutline,
} as Meta;

const Template: Story<ButtonOutlineProps & { testMode: boolean }> = ({ testMode, ...args }) => {
  const [count, setCount] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inc = (e: any) => {
    args.onClick && args.onClick(e);
    setCount(v => v + 1);
  };

  const opacity = testMode ? 1 : 0;

  return (
    <>
      <TableWrapper>
        <TableColumn>
          <TableCell>Controlled</TableCell>
          <TableCell>
            <ButtonOutline {...args} onClick={inc} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonOutline {...args} icon={args.icon ?? <PlaceholderSVG />} label={undefined} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonOutline {...args} icon={undefined} label='Label Only' />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon After</TableCell>
          <TableCell>
            <ButtonOutline {...args} icon={args.icon ?? <PlaceholderSVG />} label='IconAfter' />
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

export const buttonOutline = Template.bind({});

buttonOutline.args = {
  label: 'Button',
  disabled: false,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  icon: 'none',
  type: ButtonOutline.types.Primary,
  size: ButtonOutline.sizes.SizeS,
  testMode: false,
};

buttonOutline.argTypes = {
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
};
buttonOutline.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/L269NVTVGVM3Ui3MCCGGI0/Button?node-id=352%3A12377&t=Aka15kVBSuY1vUk1-0',
  },
};

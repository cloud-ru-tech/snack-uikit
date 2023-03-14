import { Meta, Story } from '@storybook/react/types-6-0';
import { useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonSupport, ButtonSupportProps } from '../src';
import { DemoIcon, StarIcon, TableCell, TableColumn, TableWrapper } from './helperComponents';

export default {
  title: 'Components/Button/ButtonSupport',
  component: ButtonSupport,
} as Meta;

const ICONS = {
  demo: <DemoIcon />,
  star: <StarIcon />,
  none: undefined,
};

const Template: Story<ButtonSupportProps & { testMode: boolean }> = ({ testMode, ...args }) => {
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
            <ButtonSupport {...args} onClick={inc} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonSupport {...args} icon={<DemoIcon />} label={undefined} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonSupport {...args} icon={undefined} label='Label Only' />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon Before</TableCell>
          <TableCell>
            <ButtonSupport
              {...args}
              icon={<DemoIcon />}
              iconPosition={ButtonSupport.iconPositions.Before}
              label='IconBefore'
            />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon After</TableCell>
          <TableCell>
            <ButtonSupport
              {...args}
              icon={<DemoIcon />}
              iconPosition={ButtonSupport.iconPositions.After}
              label='IconAfter'
            />
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

export const buttonSupport = Template.bind({});

buttonSupport.args = {
  label: 'Button',
  disabled: false,
  loading: false,
  icon: ICONS.demo,
  iconPosition: ButtonSupport.iconPositions.After,
  type: ButtonSupport.types.Neutral,
  size: ButtonSupport.sizes.SizeS,
  testMode: false,
};

buttonSupport.argTypes = {
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
      type: 'radio',
    },
  },
};
buttonSupport.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/L269NVTVGVM3Ui3MCCGGI0/Button?node-id=352%3A12377&t=Aka15kVBSuY1vUk1-0',
  },
};

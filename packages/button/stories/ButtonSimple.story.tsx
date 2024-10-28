import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonSimple, ButtonSimpleProps } from '../src';
import { BUTTON_ARGS, COMMON_ARG_TYPES, STORY_WITH_COUNTER_ARG_TYPES, StoryCounterProps } from './constants';
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
        </TableColumn>

        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonSimple {...BUTTON_ARGS} icon={undefined} label='Label Text' />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label + Icon</TableCell>
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

export const buttonSimple: StoryObj<StoryProps> = {
  render: Template,

  args: {
    label: 'Label text',
    disabled: false,
    loading: false,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'none',
    type: 'button',
    appearance: 'neutral',
    size: 's',
    fullWidth: false,
    testMode: false,
  },

  argTypes: {
    ...COMMON_ARG_TYPES,
    ...STORY_WITH_COUNTER_ARG_TYPES,
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A3976&mode=design',
    },
  },
};

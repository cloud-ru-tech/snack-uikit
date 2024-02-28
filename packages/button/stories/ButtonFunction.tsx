import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonFunction, ButtonFunctionProps } from '../src';
import { SIZE } from '../src/constants';
import { CounterInButtonProps } from '../src/types';
import {
  BUTTON_ARGS,
  COMMON_ARG_TYPES,
  COUNTER_ARGS,
  STORY_WITH_COUNTER_ARG_TYPES,
  StoryCounterProps,
} from './constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Components/Button/Button Function',
  component: ButtonFunction,
};
export default meta;

type StoryProps = ButtonFunctionProps & StoryCounterProps & { testMode: boolean };
const Template: StoryFn<StoryProps> = ({ testMode, ...args }) => {
  const [count, setCount] = useState<number>(0);
  const [counterProps, setCounterProps] = useState<CounterInButtonProps | undefined>(undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inc = (e: any) => {
    args.onClick && args.onClick(e);
    setCount(v => v + 1);
  };

  useEffect(() => {
    setCounterProps(
      args.counter
        ? {
            value: args.counterValue,
            appearance: args.counterAppearance,
            variant: args.counterVariant,
            plusLimit: args.counterPlusLimit,
          }
        : undefined,
    );
  }, [args.counter, args.counterAppearance, args.counterPlusLimit, args.counterValue, args.counterVariant]);

  const opacity = testMode ? 1 : 0;

  return (
    <>
      <ControlledWrapper>
        <ButtonFunction {...args} counter={counterProps} onClick={inc} />
      </ControlledWrapper>

      <TableWrapper>
        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonFunction {...BUTTON_ARGS} icon={<PlaceholderSVG />} label={undefined} />
          </TableCell>
          <TableCell>
            <ButtonFunction {...BUTTON_ARGS} icon={<PlaceholderSVG />} counter={COUNTER_ARGS} label={undefined} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonFunction {...BUTTON_ARGS} icon={undefined} label='Label Text' />
          </TableCell>
          <TableCell>
            <ButtonFunction {...BUTTON_ARGS} icon={undefined} counter={COUNTER_ARGS} label='Label Text' />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon Before</TableCell>
          <TableCell>
            <ButtonFunction {...BUTTON_ARGS} icon={<PlaceholderSVG />} iconPosition='before' label='Label Text' />
          </TableCell>
          <TableCell>
            <ButtonFunction
              {...BUTTON_ARGS}
              icon={<PlaceholderSVG />}
              iconPosition='before'
              counter={COUNTER_ARGS}
              label='Label Text'
            />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon After</TableCell>
          <TableCell>
            <ButtonFunction {...BUTTON_ARGS} icon={<PlaceholderSVG />} iconPosition='after' label='Label Text' />
          </TableCell>
          <TableCell>
            <ButtonFunction
              {...BUTTON_ARGS}
              icon={<PlaceholderSVG />}
              iconPosition='after'
              counter={COUNTER_ARGS}
              label='Label Text'
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

export const buttonFunction: StoryObj<StoryProps> = Template.bind({});

buttonFunction.args = {
  label: 'Label text',
  disabled: false,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  icon: 'none',
  iconPosition: 'after',
  type: 'button',
  appearance: 'neutral',
  size: 's',
  fullWidth: false,
  testMode: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  counter: true,
  counterValue: 1,
};

buttonFunction.argTypes = {
  ...COMMON_ARG_TYPES,
  size: {
    options: Object.values(SIZE),
    control: {
      type: 'radio',
    },
  },
  ...STORY_WITH_COUNTER_ARG_TYPES,
};

buttonFunction.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=9%3A5123&mode=design',
  },
};

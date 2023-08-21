import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { PlaceholderSVG } from '@snack-ui/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ButtonLight, ButtonLightProps } from '../src';
import { CounterInButtonProps } from '../src/types';
import { BUTTON_ARGS, COUNTER_ARGS, ICONS, STORY_WITH_COUNTER_ARG_TYPES, StoryCounterProps } from './constants';
import { ControlledWrapper, TableCell, TableColumn, TableWrapper } from './helperComponents';

const meta: Meta = {
  title: 'Components/Button/Button Light',
  component: ButtonLight,
};
export default meta;

type StoryProps = ButtonLightProps & StoryCounterProps & { testMode: boolean };
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
        <ButtonLight {...args} counter={counterProps} onClick={inc} />
      </ControlledWrapper>

      <TableWrapper>
        <TableColumn>
          <TableCell>Icon Only</TableCell>
          <TableCell>
            <ButtonLight {...BUTTON_ARGS} icon={<PlaceholderSVG />} label={undefined} />
          </TableCell>
          <TableCell>
            <ButtonLight {...BUTTON_ARGS} icon={<PlaceholderSVG />} counter={COUNTER_ARGS} label={undefined} />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Label Only</TableCell>
          <TableCell>
            <ButtonLight {...BUTTON_ARGS} icon={undefined} label='Label Text' />
          </TableCell>
          <TableCell>
            <ButtonLight {...BUTTON_ARGS} icon={undefined} counter={COUNTER_ARGS} label='Label Text' />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon Before</TableCell>
          <TableCell>
            <ButtonLight
              {...BUTTON_ARGS}
              icon={<PlaceholderSVG />}
              iconPosition={ButtonLight.iconPositions.Before}
              label='Label Text'
            />
          </TableCell>
          <TableCell>
            <ButtonLight
              {...BUTTON_ARGS}
              icon={<PlaceholderSVG />}
              iconPosition={ButtonLight.iconPositions.Before}
              counter={COUNTER_ARGS}
              label='Label Text'
            />
          </TableCell>
        </TableColumn>

        <TableColumn>
          <TableCell>Icon After</TableCell>
          <TableCell>
            <ButtonLight
              {...BUTTON_ARGS}
              icon={<PlaceholderSVG />}
              iconPosition={ButtonLight.iconPositions.After}
              label='Label Text'
            />
          </TableCell>
          <TableCell>
            <ButtonLight
              {...BUTTON_ARGS}
              icon={<PlaceholderSVG />}
              iconPosition={ButtonLight.iconPositions.After}
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

export const buttonLight: StoryObj<StoryProps> = Template.bind({});

buttonLight.args = {
  label: 'Label text',
  disabled: false,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  icon: 'none',
  iconPosition: ButtonLight.iconPositions.After,
  type: ButtonLight.types.Button,
  appearance: ButtonLight.appearances.Neutral,
  size: ButtonLight.sizes.S,
  testMode: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  counter: true,
  counterValue: 1,
};

buttonLight.argTypes = {
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

buttonLight.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/L269NVTVGVM3Ui3MCCGGI0/Button?node-id=352%3A12377&t=Aka15kVBSuY1vUk1-0',
  },
};

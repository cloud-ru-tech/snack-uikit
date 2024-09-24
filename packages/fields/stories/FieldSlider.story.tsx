import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FieldSlider, FieldSliderProps } from '../src';
import { COMMON_ARG_TYPES, ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Slider',
  component: FieldSlider,
};

export default meta;

type StoryProps = FieldSliderProps & {
  storyMarks: 'linear' | 'non-linear';
  moveByMarks: boolean;
};

const NON_LINEAR_MARKS: Record<number, string> = { 10: '1gb', 20: '2gb', 30: '4gb', 50: '16gb' };
const LINEAR_MARKS: Record<number, string> = { 10: '10', 20: '20', 30: '30', 40: '40', 50: '50' };

const STORY_MARKS = {
  linear: 'linear',
  'non-linear': 'non-linear',
};

const Template = ({ size, range, moveByMarks, storyMarks, step, ...args }: StoryProps) => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    if (range && typeof args.value === 'number') {
      setValue([10, 30]);
      return;
    }

    setValue(args.value);
  }, [args.value, range]);

  const marks = useMemo(() => {
    switch (storyMarks) {
      case 'non-linear':
        return NON_LINEAR_MARKS;

      case 'linear':
      default:
        return LINEAR_MARKS;
    }
  }, [storyMarks]);

  const textInputValueFormatter = useCallback(
    (value: number): string => {
      switch (storyMarks) {
        case 'non-linear':
          return NON_LINEAR_MARKS[value];

        case 'linear':
        default:
          return String(value);
      }
    },
    [storyMarks],
  );

  return (
    <div className={styles.wrapper} data-size={size}>
      <FieldSlider
        {...args}
        size={size}
        range={range}
        value={value}
        onChange={setValue}
        marks={marks}
        step={moveByMarks ? null : step}
        textInputFormatter={textInputValueFormatter}
      />
    </div>
  );
};

export const fieldSlider: StoryObj<StoryProps> = {
  render: Template,

  args: {
    id: 'slider',
    value: 10,
    min: 10,
    max: 50,
    step: 1,
    range: false,
    showScaleBar: true,
    moveByMarks: true,
    storyMarks: 'linear',
    readonly: false,
    disabled: false,
    label: 'Label text',
    labelTooltip: 'Tooltip description',
    required: false,
    caption: 'Caption',
    hint: 'Hint text',
    size: 's',
    postfixIcon: ICONS['PlaceholderSVG'],
  },

  argTypes: {
    labelTooltip: COMMON_ARG_TYPES.labelTooltip,
    moveByMarks: {
      name: '[Story]: change value only by marks',
      type: 'boolean',
      if: {
        arg: 'showScaleBar',
        eq: true,
      },
    },
    storyMarks: {
      name: '[Story]: example marks',
      options: Object.keys(STORY_MARKS),
      mapping: STORY_MARKS,
      control: {
        type: 'radio',
      },
      if: {
        arg: 'showScaleBar',
        eq: true,
      },
    },
    postfixIcon: {
      name: 'postfixIcon',
      options: Object.keys(ICONS),
      mapping: ICONS,
      control: {
        type: 'select',
      },
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1',
    },
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo, useState } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';
import { Tooltip } from '@snack-uikit/tooltip';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SegmentedControl, SegmentedControlProps } from '../src';
import { Segment } from '../src/types';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Segmented Control',
  component: SegmentedControl,
};
export default meta;

enum StoryType {
  Labels = 'labels',
  Icons = 'icons',
  LabelsAndIcons = 'labels and icons',
}

type StoryProps = SegmentedControlProps & {
  storyType: StoryType;
};
const Template: StoryFn<StoryProps> = ({ ...args }: StoryProps) => {
  const items = useMemo(
    () =>
      args.items.map(item => {
        if (args.storyType === StoryType.Labels) return { ...item, icon: undefined };
        if (args.storyType === StoryType.Icons) return { ...item, label: undefined };
        return item;
      }),
    [args.items, args.storyType],
  );
  const [selected, setSelected] = useState(args.defaultValue);

  return (
    <div className={styles.story}>
      <SegmentedControl {...args} items={items} onChange={setSelected} />
      <div className={styles.invisible} data-test-id='selected-segment'>
        {selected}
      </div>
    </div>
  );
};

export const segmentedControl: StoryObj<StoryProps> = {
  render: Template,

  args: {
    items: [
      { label: 'Chip', value: '1', icon: <PlaceholderSVG /> },
      { label: 'Gadget Hackwrench', value: '2', icon: <PlaceholderSVG /> },
      { label: 'Dale', value: '3', icon: <PlaceholderSVG /> },
      {
        label: 'Zipper',
        value: '4',
        icon: <PlaceholderSVG />,
        disabled: true,
        renderWrapSegment: segment => (
          <Tooltip tip='Not a rodent' placement='bottom'>
            {segment}
          </Tooltip>
        ),
      },
      { label: 'Monterey Jack', value: '5', icon: <PlaceholderSVG /> },
    ] satisfies Segment[],
    defaultValue: '1',
    size: 'm',
    outline: false,
    storyType: StoryType.LabelsAndIcons,
    width: 'auto',
  },

  argTypes: {
    className: {
      table: { disable: true },
    },
    storyType: {
      name: '[Story]: story type',
      options: Object.values(StoryType),
      control: { type: 'radio' },
      if: {
        arg: 'size',
        neq: 'xs',
      },
    },
    defaultValue: { type: 'string' },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/design/jtGxAPvFJOMir7V0eQFukN/branch/5GN8XXj3rBfLTWvJA7kliW/Snack-UI-Kit-3.1.0?node-id=3025-1827&t=z817Qjsi8DfuRDiK-0',
    },
  },
};

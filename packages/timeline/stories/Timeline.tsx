import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Timeline, TimelineProps } from '../src';
import { DemoComponent } from './helperComponents/DemoComponent';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Timeline/Timeline',
  component: Timeline,
};
export default meta;

type StoryProps = TimelineProps & {
  showOpposite: boolean;
};

const Opposite = () => <span>Opposite</span>;

const items = [
  {
    content: <DemoComponent key='start' title='Start' description='Description' />,
    dotAppearance: Timeline.dotAppearances.Primary,
  },
  {
    content: <DemoComponent key='center' title='Center' description='Description' />,
    lineStyle: Timeline.lineStyles.Dashed,
  },
  {
    content: (
      <DemoComponent key='subCenter' title='Sub Center' description='Some very long description compared to others' />
    ),
    lineStyle: Timeline.lineStyles.Dashed,
    dotVariant: Timeline.dotVariants.SubEvent,
    dotAppearance: Timeline.dotAppearances.Red,
  },
  {
    content: <DemoComponent key='end' title='End' description='Description' />,
  },
];

const itemsWithOpposite = items.map(item => ({ ...item, opposite: <Opposite /> }));

const Template: StoryFn<StoryProps> = ({
  showOpposite,
  contentPosition,
  fullWidth,
  alternate,
  ...args
}: StoryProps) => (
  <div className={styles.wrapper}>
    <Timeline
      {...args}
      contentPosition={contentPosition}
      items={showOpposite ? itemsWithOpposite : items}
      fullWidth={fullWidth}
      alternate={alternate}
    />
  </div>
);

export const timeline: StoryObj<StoryProps> = Template.bind({});

timeline.args = {
  alternate: false,
  fullWidth: false,
  showOpposite: false,
  contentPosition: Timeline.contentPositions.Right,
};

timeline.argTypes = {
  showOpposite: {
    name: '[Story]: Show opposite content',
    type: 'boolean',
  },
};

timeline.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/Fm6tDikhsAChOCjObxYQ9t/branch/SMFc2k6khLQ95eE18EshO1/Timeline',
  },
};

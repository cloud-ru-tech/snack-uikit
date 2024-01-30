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

const items: TimelineProps['items'] = [
  {
    content: <DemoComponent key='start' title='Start' description='Description' />,
    dotAppearance: 'primary',
  },
  {
    content: <DemoComponent key='center' title='Center' description='Description' />,
    lineStyle: 'dashed',
  },
  {
    content: (
      <DemoComponent key='subCenter' title='Sub Center' description='Some very long description compared to others' />
    ),
    lineStyle: 'dashed',
    dotVariant: 'subEvent',
    dotAppearance: 'red',
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
  contentPosition: 'right',
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
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A30522&mode=design',
  },
};

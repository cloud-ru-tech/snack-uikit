import { Meta, StoryFn, StoryObj } from '@storybook/react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TrackItem, TrackItemProps } from '../src/helperComponents/TrackItem';
import { DemoComponent } from './helperComponents/DemoComponent';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Timeline/Timeline Item',
  component: TrackItem,
};

export default meta;

type StoryProps = Omit<TrackItemProps, 'alternateMode'> & {
  contentTitle?: string;
  contentDescription?: string;
  showOpposite?: boolean;
};

const Template: StoryFn<StoryProps> = ({ contentTitle, contentDescription, showOpposite, ...args }: StoryProps) => (
  <div className={styles.wrapper}>
    <TrackItem
      {...args}
      content={<DemoComponent title={contentTitle} description={contentDescription} />}
      opposite={showOpposite ? <DemoComponent title={'Opposite'} description={'Description'} /> : undefined}
    />
  </div>
);

export const timelineItem: StoryObj<StoryProps> = {
  render: Template,

  args: {
    contentPosition: TrackItem.contentPositions.Right,
    role: TrackItem.roles.Start,
    lineStyle: TrackItem.lineStyles.Default,
    dotVariant: TrackItem.dotVariants.Default,
    dotAppearance: TrackItem.dotAppearances.Primary,
    contentTitle: 'Content title',
    contentDescription: 'Description',
    showOpposite: false,
  },

  argTypes: {
    contentTitle: {
      name: '[Story]: Content title',
      type: 'string',
    },
    contentDescription: {
      name: '[Story]: Content description',
      type: 'string',
    },
    showOpposite: {
      name: '[Story]: Show opposite',
      type: 'boolean',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A30522&mode=design',
    },
  },
};

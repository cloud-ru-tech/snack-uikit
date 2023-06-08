import { Meta, StoryFn } from '@storybook/react';

import { extractSupportProps } from '../../utils/src';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tabs, TabsProps } from '../src';
import { Type } from '../src/constants';
import styles from './styles.module.scss';

type StoryType = Omit<TabsProps, 'selectedTab'> & {
  defaultSelectedTab?: string;
  type: Type;
  'data-test-id'?: string;
};

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs,
};
export default meta;

const tabsData = [
  { id: 'tab1', label: 'Tab one', disabled: false, counter: 12 },
  { id: 'tab2', label: 'Second', disabled: false },
  { id: 'tab3', label: 'Disabled', disabled: true },
  { id: 'tab4', label: 'Very very long name of tab', disabled: false },
  { id: 'tab5', label: 'tab', disabled: false },
  { id: 'tab6', label: 's', disabled: false },
  { id: 'tab7', label: 'some tab', disabled: false },
  { id: 'tab8', label: 'Еще', disabled: false },
  { id: 'tab9', label: 'Последний', disabled: false },
  { id: 'tab10', label: 'Tab 10' },
  { id: 'tab11', label: 'Tab 11' },
  { id: 'tab12', label: 'Tab 12' },
  { id: 'tab13', label: 'Tab 13' },
  { id: 'tab14', label: 'Tab 14' },
  { id: 'tab15', label: 'Tab 15' },
  { id: 'tab16', label: 'Tab 16' },
];

const Template: StoryFn<StoryType> = function ({ type, defaultSelectedTab, ...args }) {
  return (
    <Tabs {...args} defaultSelectedTab={defaultSelectedTab}>
      <Tabs.TabBar type={type} {...extractSupportProps(args)}>
        {tabsData.map(props => (
          <Tabs.Tab key={props.id} {...props} />
        ))}
      </Tabs.TabBar>
      {tabsData.map(({ id }) => (
        <Tabs.TabContent className={styles.tab} key={id} value={id}>
          Content of {id}
        </Tabs.TabContent>
      ))}
    </Tabs>
  );
};
export const tabs: StoryFn<StoryType> = Template.bind({});

const tabIds = Object.values(tabsData).map(({ id }) => id);

tabs.args = {
  type: Type.Primary,
  defaultSelectedTab: tabIds[0],
};

tabs.argTypes = {
  type: {
    name: 'type',
    options: Object.values(Type),
    defaultValue: Type.Primary,
    control: {
      type: 'radio',
    },
  },
  'data-test-id': {
    name: 'data-test-id',
    control: {
      type: 'text',
    },
  },
  defaultSelectedTab: {
    name: 'defaultSelectedTab',
    options: tabIds,
    control: {
      type: 'select',
    },
  },
};

tabs.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/dwiwsxGwepNQdwHCGbydZE/Tabs',
  },
};

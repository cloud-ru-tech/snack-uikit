import { Meta, StoryFn } from '@storybook/react';

import { extractSupportProps } from '../../utils/src';
import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tabs, TabsProps } from '../src';
import { Type } from '../src/constants';
import styles from './styles.module.scss';

type StoryType = Omit<TabsProps, 'value'> & {
  defaultValue?: string;
  type: Type;
  'data-test-id'?: string;
};

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs,
};
export default meta;

const tabsData = [
  { value: 'tab1', label: 'Tab one', disabled: false, counter: 12 },
  { value: 'tab2', label: 'Second', disabled: false },
  { value: 'tab3', label: 'Disabled', disabled: true },
  { value: 'tab4', label: 'Very very long name of tab', disabled: false },
  { value: 'tab5', label: 'tab', disabled: false },
  { value: 'tab6', label: 's', disabled: false },
  { value: 'tab7', label: 'some tab', disabled: false },
  { value: 'tab8', label: 'Еще', disabled: false },
  { value: 'tab9', label: 'Последний', disabled: false },
  { value: 'tab10', label: 'Tab 10' },
  { value: 'tab11', label: 'Tab 11' },
  { value: 'tab12', label: 'Tab 12' },
  { value: 'tab13', label: 'Tab 13' },
  { value: 'tab14', label: 'Tab 14' },
  { value: 'tab15', label: 'Tab 15' },
  { value: 'tab16', label: 'Tab 16' },
];

const Template: StoryFn<StoryType> = function ({ type, defaultValue, ...args }) {
  return (
    <Tabs {...args} defaultValue={defaultValue}>
      <Tabs.TabBar type={type} {...extractSupportProps(args)}>
        {tabsData.map(props => (
          <Tabs.Tab key={props.value} {...props} />
        ))}
      </Tabs.TabBar>
      {tabsData.map(({ value }) => (
        <Tabs.TabContent className={styles.tab} key={value} value={value}>
          Content of {value}
        </Tabs.TabContent>
      ))}
    </Tabs>
  );
};
export const tabs: StoryFn<StoryType> = Template.bind({});

const tabIds = Object.values(tabsData).map(({ value }) => value);

tabs.args = {
  type: Type.Primary,
  defaultValue: tabIds[0],
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
  defaultValue: {
    name: 'defaultValue',
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
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/dwiwsxGwepNQdwHCGbydZE/Tabs',
  },
};

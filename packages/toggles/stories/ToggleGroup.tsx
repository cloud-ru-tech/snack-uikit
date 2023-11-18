import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { ToggleGroup, ToggleGroupProps } from '@snack-ui/toggles';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { SelectionMode } from '../src/constants';
import { ToggleCard } from './helperComponets';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Toggles/Toggle Group',
  component: ToggleGroup,
};

export default meta;

const ITEMS = [
  { id: '1', label: 'item1' },
  { id: '2', label: 'item2' },
  { id: '3', label: 'item3' },
  { id: '4', label: 'item4' },
];

const Template: StoryFn<ToggleGroupProps> = ({ selectionMode = SelectionMode.Single }) => {
  const [value, setValue] = useState<string | string[] | undefined>(undefined);

  useEffect(() => {
    setValue(undefined);
  }, [selectionMode]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ToggleGroup selectionMode={selectionMode} value={value} onChange={setValue}>
      <div className={styles.toggleGroup}>
        {ITEMS.map(props => (
          <ToggleCard key={props.id} {...props} />
        ))}
      </div>
    </ToggleGroup>
  );
};

export const toggleGroup: StoryObj<ToggleGroupProps> = Template.bind({});

toggleGroup.args = {
  selectionMode: ToggleGroup.selectionModes.Multiple,
};

toggleGroup.argTypes = {};

toggleGroup.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
};

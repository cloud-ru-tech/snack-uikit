import { Meta, StoryFn } from '@storybook/react';

import { useToggleGroup } from '@snack-ui/toggles';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Mode } from '../src/constants';
import { ToggleItemState } from '../src/types';
import styles from './styles.module.scss';

export default {
  title: 'Components/Toggle Group',
} as Meta;

type Data = {
  id: string;
  label: string;
};

export type ToggleGroupStoryProps = {
  mode: Mode;
  items: ToggleItemState<Data>[];
};

const Template: StoryFn<ToggleGroupStoryProps> = ({ ...args }) => {
  const items = useToggleGroup(args.mode, args.items);

  return (
    <>
      {items.map(({ checked, setChecked, data }) => (
        <button
          data-test-id={`item-${data.id}`}
          data-checked={checked}
          className={checked ? styles.checked : styles.unchecked}
          onClick={() => setChecked(!checked)}
          key={data.label}
        >
          {data.label}
        </button>
      ))}
    </>
  );
};

export const toggleGroup = Template.bind({});

toggleGroup.args = {
  mode: useToggleGroup.modes.Radio,
  items: [
    {
      checked: false,
      data: { id: '1', label: 'item1' },
    },
    {
      checked: false,
      data: { id: '2', label: 'item2' },
    },
    {
      checked: false,
      data: { id: '3', label: 'item3' },
    },
    {
      checked: false,
      data: { id: '4', label: 'item4' },
    },
  ],
};

toggleGroup.argTypes = {
  mode: { control: { type: 'radio' }, options: [useToggleGroup.modes.Radio, useToggleGroup.modes.Checkbox] },
};

toggleGroup.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
};

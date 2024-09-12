import { Meta, StoryFn } from '@storybook/react';
import React, { useLayoutEffect, useState } from 'react';

import { Avatar } from '@snack-uikit/avatar';
import { DaySVG } from '@snack-uikit/icons';
import { SelectionSingleValueType } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { BaseOptionProps, FieldSelect, FieldSelectProps, OptionProps } from '../src/components';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Fields/Field Select',
  component: FieldSelect,
};
export default meta;

const DEFAULT_OPTIONS: OptionProps[] = [
  {
    label: 'Group',
    type: 'group',
    options: [
      { value: 'op1', option: 'Option 1', caption: 'Green Tag', appearance: 'green' },
      { value: 'op2', option: 'Option 2', description: 'Description' },
      { value: 'op3', option: 'Option 3', caption: 'Caption' },
      {
        value: 'op4',
        option: 'Option 4',
        afterContent: <Tag label='Red Label' appearance='red' size='xs' />,
        appearance: 'red',
      },
    ],
  },
  {
    value: 'op5',
    option: 'Option 5',
    disabled: true,
    appearance: 'yellow',
    afterContent: <Tag label='Yellow Label' appearance='yellow' size='xs' />,
  },
  { value: 'op11', option: 'Option 11', beforeContent: <DaySVG /> },
  { value: 'op12', option: 'Option 12', beforeContent: <Avatar name='Will Wheaton' size='xs' /> },
];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MORE_OPTIONS: BaseOptionProps[] = [
  { value: 'op13', option: 'Option 13' },
  { value: 'op14', option: 'Option 14' },
  { value: 'op15', option: 'Option 15' },
  { value: 'op16', option: 'Option 16' },
  { value: 'op17', option: 'Option 17' },
  { value: 'op18', option: 'Option 18' },
  { value: 'op19', option: 'Option 19' },
  { value: 'op20', option: 'Option 20' },
  { value: 'op21', option: 'Option 21' },
  { value: 'op22', option: 'Option 22' },
  { value: 'op23', option: 'Option 23' },
  { value: 'op24', option: 'Option 24' },
  { value: 'op25', option: 'Option 25' },
  { value: 'op26', option: 'Option 26' },
  { value: 'op27', option: 'Option 27' },
  { value: 'op28', option: 'Option 28' },
  { value: 'op29', option: 'Option 29' },
  { value: 'op30', option: 'Option 30' },
];

type StoryProps = FieldSelectProps & {
  localeName: string;
  showMoreOptions: boolean;
};

const Template = ({ selection, showMoreOptions, value, size, ...args }: StoryProps) => {
  const [singleValue, setSingleValue] = useState<SelectionSingleValueType>();

  const [multipleValue, setMultipleValue] = useState<SelectionSingleValueType[]>([]);

  const options: OptionProps[] = showMoreOptions ? [...DEFAULT_OPTIONS, ...MORE_OPTIONS] : DEFAULT_OPTIONS;

  useLayoutEffect(() => {
    if (selection === 'single') {
      setSingleValue(value);
    }

    if (selection === 'multiple') {
      setMultipleValue(value ? String(value).split(',') : []);
    }
  }, [selection, value]);

  return (
    <div className={styles.wrapper} data-size={size || 's'}>
      {selection === 'single' && (
        <FieldSelect
          {...args}
          defaultValue={undefined}
          value={singleValue}
          onChange={setSingleValue}
          selection='single'
          options={options}
          size={size}
        />
      )}

      {selection === 'multiple' && (
        <FieldSelect
          {...args}
          defaultValue={undefined}
          value={multipleValue}
          onChange={setMultipleValue}
          selection='multiple'
          options={options}
          size={size}
        />
      )}
    </div>
  );
};

export const fieldSelect: StoryFn<StoryProps> = Template.bind({});

fieldSelect.args = {
  id: 'newSelect',
  label: 'Label text',
  labelTooltip: 'Tooltip description',
  placeholder: 'Placeholder',
  required: false,
  caption: 'Caption',
  hint: 'Hint text',
  size: 's',
  selection: 'single',
  searchable: true,
  readonly: false,
  validationState: 'default',
  value: undefined,
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  prefixIcon: 'none',
  showCopyButton: true,
  showClearButton: true,
  showMoreOptions: false,
  untouchableScrollbars: false,
  enableFuzzySearch: true,
};

fieldSelect.argTypes = {
  validationState: COMMON_ARG_TYPES.validationState,
  prefixIcon: COMMON_ARG_TYPES.prefixIcon,
  labelTooltip: COMMON_ARG_TYPES.labelTooltip,
  showMoreOptions: {
    name: '[Stories] add more options to see scroll',
    type: 'boolean',
  },
  value: {
    type: 'string',
  },
};

fieldSelect.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-2.0.0?type=design&node-id=41%3A38747&mode=design&t=8dDi5X6Lfgs6Cxji-1',
  },
};

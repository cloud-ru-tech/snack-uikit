import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useState } from 'react';

import { PlaceholderSVG } from '@snack-ui/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FilterChip, FilterChipProps, FilterOption } from '../src';
import { Variant } from '../src/constants';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const Size = FilterChip.sizes;

const meta: Meta = {
  title: 'Components/Chips/FilterChip',
  component: FilterChip,
};
export default meta;

type StoryProps = FilterChipProps & {
  value?: string | string[];
  showClickCounter?: boolean;
  customFormatter: boolean;
  valueSingle: string;
  valueMulti: string;
};

const STATE_TABLE_HEADERS = ['Default', 'Loading', 'Disabled', 'Label', 'Label + Loading', 'Label + Disabled'];

const VARIANTS_TABLE_HEADERS = Array(STATE_TABLE_HEADERS.length)
  .fill(Object.values(Variant))
  .flatMap(v => v);

const icon = <PlaceholderSVG size={16} />;

const options: FilterOption[] = [
  { icon, value: 'value1', label: 'Option number 1', caption: 'one', tagLabel: '+1' },
  { icon, value: 'value2', label: 'Option number 2', caption: 'two', tagLabel: '+2' },
  { icon, value: 'value3', label: 'Option number 3', caption: 'three', tagLabel: '+3' },
  { icon, value: 'value4', label: 'Option number 4', caption: 'four', tagLabel: '+4' },
  { icon, value: 'value5', label: 'Option number 5', caption: 'five', tagLabel: '+5' },
];

function FilterChips(props: FilterChipProps) {
  return (
    <>
      <div className={styles.cell}>
        <FilterChip {...props} options={options} />
      </div>

      <div className={styles.cell}>
        <FilterChip {...props} options={options} icon={<PlaceholderSVG />} />
      </div>
    </>
  );
}

const Template: StoryFn<StoryProps> = ({ showClickCounter, ...args }: StoryProps) => {
  const [clickCounter, setClickCounter] = useState(0);
  const increaseCounter = () => setClickCounter(prev => prev + 1);

  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  const formatter = args.customFormatter
    ? (option: { label: string } | { label: string }[]): string => {
        if (Array.isArray(option)) {
          return !option.length ? '-' : option.map(({ label }) => label).join(', ');
        }

        return option.label.toUpperCase();
      }
    : undefined;

  args.value =
    args.selectionMode === FilterChip.selectionModes.Single
      ? args.valueSingle || undefined
      : (args.valueMulti?.length && args.valueMulti?.split(',')) || undefined;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <FilterChip {...args} onClick={increaseCounter} options={options} labelFormatter={formatter} />
      </div>

      {showClickCounter && (
        <div>
          click count:
          <span data-test-id='click__counter'>{clickCounter}</span>
        </div>
      )}
      <div className={styles.table}>
        <div className={headerCellClassnames} style={{ gridRow: '1 / 3' }} />
        {STATE_TABLE_HEADERS.map((head, index) => (
          <div
            key={head}
            className={headerCellClassnames}
            style={{ gridColumnStart: index * 2 + 2, gridColumnEnd: index * 2 + 4 }}
          >
            {head}
          </div>
        ))}

        {VARIANTS_TABLE_HEADERS.map((variant, i) => (
          <div key={variant + i} className={headerCellClassnames}>
            {variant}
          </div>
        ))}

        {Object.values(Size).map(size => (
          <Fragment key={size}>
            <div className={headerCellClassnames}>{size}</div>

            <FilterChips options={[]} selectionMode={FilterChip.selectionModes.Single} size={size} />
            <FilterChips options={[]} selectionMode={FilterChip.selectionModes.Single} size={size} loading />
            <FilterChips options={[]} selectionMode={FilterChip.selectionModes.Single} size={size} disabled />
            <FilterChips options={[]} selectionMode={FilterChip.selectionModes.Multi} label='Label text' size={size} />
            <FilterChips
              options={[]}
              selectionMode={FilterChip.selectionModes.Multi}
              label='Label text'
              size={size}
              loading
            />
            <FilterChips
              options={[]}
              selectionMode={FilterChip.selectionModes.Multi}
              label='Label text'
              size={size}
              disabled
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const filterChip: StoryObj<StoryProps> = Template.bind({});

filterChip.args = {
  label: 'Label',
  size: FilterChip.sizes.S,
  disabled: false,
  loading: false,
  'data-test-id': 'filter-chip',
  tabIndex: undefined,
  className: undefined,
  onClick: undefined,
  showClickCounter: false,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selectionMode: FilterChip.selectionModes.Single,
  customFormatter: false,
  valueSingle: '',
  valueMulti: '',
};

filterChip.argTypes = {
  value: { table: { disable: true } },
  options: { table: { disable: true } },
  onClick: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  onChangeValue: { table: { disable: true } },
  labelFormatter: { table: { disable: true } },
  label: {
    if: { arg: 'selectionMode', eq: FilterChip.selectionModes.Multi },
  },
  size: { control: { type: 'radio' } },
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    if: { arg: 'size', eq: FilterChip.sizes.S },
    control: {
      type: 'select',
    },
  },
  customFormatter: {
    name: '[Stories]: Use custom formatter',
    control: {
      type: 'boolean',
    },
  },
  showClickCounter: {
    name: '[Stories]: Show click counter',
  },
  valueSingle: {
    name: 'value',
    control: { type: 'text' },
    if: { arg: 'selectionMode', eq: FilterChip.selectionModes.Single },
  },
  valueMulti: {
    name: 'value (через запятую)',
    control: { type: 'text' },
    if: { arg: 'selectionMode', eq: FilterChip.selectionModes.Multi },
  },
};

filterChip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/yoQDw4aDFiTQ1uWnxQtTmB/branch/7PiOcQdqgGzv8BmV02GFeI/Chips?type=design&node-id=875-5839&t=B2sJyLM0LLwNlQEq-0',
  },
};

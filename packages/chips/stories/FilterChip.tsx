import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useState } from 'react';

import { PlaceholderSVG } from '@snack-ui/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { FilterChip, FilterChipProps } from '../src';
import { Size } from '../src/components/FilterChip/constants';
import { Variant } from '../src/constants';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/FilterChip',
  component: FilterChip,
};
export default meta;

type StoryProps = FilterChipProps & { showClickCounter?: boolean };

const STATE_TABLE_HEADERS = ['Default', 'Loading', 'Disabled', 'Label', 'Label + Loading', 'Label + Disabled'];

const VARIANTS_TABLE_HEADERS = Array(STATE_TABLE_HEADERS.length)
  .fill(Object.values(Variant))
  .flatMap(v => v);

const noop = () => {};

function FilterChips(props: Pick<FilterChipProps, 'label' | 'size' | 'loading' | 'disabled'>) {
  return (
    <>
      <div className={styles.cell}>
        <FilterChip value='value' onClick={noop} {...props} />
      </div>

      <div className={styles.cell}>
        <FilterChip value='value' icon={<PlaceholderSVG />} onClick={noop} {...props} />
      </div>
    </>
  );
}

const Template: StoryFn<FilterChipProps> = ({ showClickCounter, ...args }: StoryProps) => {
  const [clickCounter, setClickCounter] = useState(0);
  const increaseCounter = () => setClickCounter(prev => prev + 1);

  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <FilterChip {...args} onClick={increaseCounter} />
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

            <FilterChips size={size} />
            <FilterChips size={size} loading />
            <FilterChips size={size} disabled />
            <FilterChips label='Label text' size={size} />
            <FilterChips label='Label text' size={size} loading />
            <FilterChips label='Label text' size={size} disabled />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const filterChip: StoryObj<StoryProps> = Template.bind({});

filterChip.args = {
  value: 'Value',
  label: undefined,
  size: FilterChip.sizes.S,
  disabled: false,
  loading: false,
  'data-test-id': 'filter-chip',
  tabIndex: undefined,
  className: undefined,
  onClick: undefined,
  showClickCounter: false,
};

filterChip.argTypes = {
  size: { control: { type: 'radio' } },
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
  showClickCounter: {
    name: '[Stories]: Show click counter',
  },
};

filterChip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/yoQDw4aDFiTQ1uWnxQtTmB/branch/7PiOcQdqgGzv8BmV02GFeI/Chips?type=design&node-id=875-5839&t=B2sJyLM0LLwNlQEq-0',
  },
};

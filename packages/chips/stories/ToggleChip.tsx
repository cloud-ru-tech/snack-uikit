import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useEffect, useState } from 'react';

import { PlaceholderSVG } from '@snack-ui/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ToggleChip, ToggleChipProps } from '../src';
import { Size, Variant } from '../src/constants';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/ToggleChip',
  component: ToggleChip,
};
export default meta;

const STATE_TABLE_HEADERS = ['Default', 'Checked', 'Loading', 'Disabled', 'Checked + Loading'];

const VARIANTS_TABLE_HEADERS = Array(STATE_TABLE_HEADERS.length)
  .fill(Object.values(Variant))
  .flatMap(v => v);

const noop = () => {};

function ToggleChips(props: Pick<ToggleChipProps, 'size' | 'loading' | 'disabled' | 'checked'>) {
  return (
    <>
      <div className={styles.cell}>
        <ToggleChip label='Label text' onChange={noop} {...props} />
      </div>

      <div className={styles.cell}>
        <ToggleChip label='Label text' icon={<PlaceholderSVG />} onChange={noop} {...props} />
      </div>
    </>
  );
}

const Template: StoryFn<ToggleChipProps> = ({ ...args }: ToggleChipProps) => {
  const [checked, setChecked] = useState(args.checked);

  useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <ToggleChip {...args} checked={checked} onChange={setChecked} />
      </div>

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

            <ToggleChips size={size} checked={false} />
            <ToggleChips size={size} checked />
            <ToggleChips size={size} checked={false} loading />
            <ToggleChips size={size} checked={false} disabled />
            <ToggleChips size={size} checked loading />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const toggleChip: StoryObj<ToggleChipProps> = Template.bind({});

toggleChip.args = {
  label: 'Label text',
  size: ToggleChip.sizes.S,
  disabled: false,
  loading: false,
  checked: false,
  'data-test-id': 'toggle-chip',
  tabIndex: undefined,
  className: undefined,
  onChange: undefined,
};

toggleChip.argTypes = {
  size: { control: { type: 'radio' } },
  icon: {
    name: '[Stories]: Show icon examples',
    options: Object.keys(ICONS),
    mapping: ICONS,
    control: {
      type: 'select',
    },
  },
};

toggleChip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/yoQDw4aDFiTQ1uWnxQtTmB/Chips?type=design&node-id=0%3A1&t=708nqQDclQju8nB3-1',
  },
};

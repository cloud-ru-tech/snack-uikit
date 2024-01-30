import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useEffect, useState } from 'react';

import { PlaceholderSVG } from '@snack-uikit/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ChipToggle, ChipToggleProps } from '../src';
import { SIZE, VARIANT } from '../src/constants';
import { COMMON_ARG_TYPES } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/ChipToggle',
  component: ChipToggle,
};
export default meta;

const STATE_TABLE_HEADERS = ['Default', 'Checked', 'Loading', 'Disabled', 'Checked + Loading'];

const VARIANTS_TABLE_HEADERS = Array(STATE_TABLE_HEADERS.length)
  .fill(Object.values(VARIANT))
  .flatMap(v => v);

const noop = () => {};

function ToggleChips(props: Pick<ChipToggleProps, 'size' | 'loading' | 'disabled' | 'checked'>) {
  return (
    <>
      <div className={styles.cell}>
        <ChipToggle label='Label text' onChange={noop} {...props} />
      </div>

      <div className={styles.cell}>
        <ChipToggle label='Label text' icon={<PlaceholderSVG />} onChange={noop} {...props} />
      </div>
    </>
  );
}

const Template: StoryFn<ChipToggleProps> = ({ ...args }: ChipToggleProps) => {
  const [checked, setChecked] = useState(args.checked);

  useEffect(() => {
    setChecked(args.checked);
  }, [args.checked]);

  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <ChipToggle {...args} checked={checked} onChange={setChecked} />
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

        {Object.values(SIZE).map(size => (
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

export const chipToggle: StoryObj<ChipToggleProps> = Template.bind({});

chipToggle.args = {
  label: 'Label text',
  size: SIZE.S,
  disabled: false,
  loading: false,
  checked: false,
  'data-test-id': 'chip-toggle',
  tabIndex: undefined,
  className: undefined,
  onChange: undefined,
};

chipToggle.argTypes = COMMON_ARG_TYPES;

chipToggle.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A152239&mode=design',
  },
};

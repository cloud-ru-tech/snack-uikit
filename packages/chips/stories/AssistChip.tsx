import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useState } from 'react';

import { PlaceholderSVG } from '@snack-ui/icons';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { AssistChip, AssistChipProps } from '../src';
import { Size, Variant } from '../src/constants';
import { ICONS } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Chips/AssistChip',
  component: AssistChip,
};
export default meta;

const STATE_TABLE_HEADERS = ['Default', 'Loading', 'Disabled'];

const VARIANTS_TABLE_HEADERS = Array(STATE_TABLE_HEADERS.length)
  .fill(Object.values(Variant))
  .flatMap(v => v);

type StoryProps = AssistChipProps & { showClickCounter?: boolean };

const noop = () => {};

function AssistChips(props: Pick<AssistChipProps, 'size' | 'loading' | 'disabled'>) {
  return (
    <>
      <div className={styles.cell}>
        <AssistChip label='Label text' onClick={noop} {...props} />
      </div>

      <div className={styles.cell}>
        <AssistChip label='Label text' icon={<PlaceholderSVG />} onClick={noop} {...props} />
      </div>
    </>
  );
}

const Template: StoryFn<StoryProps> = ({ showClickCounter, ...args }: StoryProps) => {
  const [clickCounter, setClickCounter] = useState(0);
  const increaseCounter = () => setClickCounter(prev => prev + 1);

  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <AssistChip {...args} onClick={increaseCounter} />
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

            <AssistChips size={size} />
            <AssistChips size={size} loading />
            <AssistChips size={size} disabled />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export const assistChip: StoryObj<StoryProps> = Template.bind({});

assistChip.args = {
  label: 'Label text',
  size: AssistChip.sizes.S,
  disabled: false,
  loading: false,
  'data-test-id': 'assist-chip',
  tabIndex: undefined,
  className: undefined,
  onClick: undefined,
  showClickCounter: false,
};

assistChip.argTypes = {
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

assistChip.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/yoQDw4aDFiTQ1uWnxQtTmB/Chips?type=design&node-id=0%3A1&t=708nqQDclQju8nB3-1',
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Link, LinkProps } from '../src';
import { APPEARANCE, PURPOSE, SIZE, TARGET, TEXT_MODE } from '../src/components/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Link',
  component: Link,
};
export default meta;

const DEFAULT_TEXT = 'Link text';
const DEFAULT_SIZE = SIZE.S;
const DEFAULT_PURPOSE = PURPOSE.Body;
const DEFAULT_TEXT_MODE = TEXT_MODE.Default;
const DEFAULT_APPEARANCE = APPEARANCE.Primary;

type StoryProps = LinkProps;

type Option = {
  header: string;
  props?: Partial<LinkProps>;
};

type TableProps = {
  header: string;
  options: Option[];
};

const colors = Object.values(APPEARANCE);
const sizes = Object.values(SIZE);
const surfaces = Object.values(TEXT_MODE);

function Table({ header, options }: TableProps) {
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <div className={styles.table}>
      <div className={headerCellClassnames} />
      <div className={headerCellClassnames}>{header}</div>

      {options.map(option => (
        <Fragment key={option.header}>
          <div className={headerCellClassnames}>{option.header}</div>
          <div
            className={styles.cell}
            data-appearance={option.props?.appearance}
            data-text-mode={option.props?.textMode}
          >
            <Link {...option.props} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

const Template: StoryFn<StoryProps> = ({ insideText, ...args }) => (
  <>
    <div className={styles.wrapper} data-appearance={args.appearance} data-text-mode={args.textMode}>
      {insideText ? (
        <span>
          Some text some text <Link {...args} insideText={true} /> some text some text
        </span>
      ) : (
        <Link {...args} />
      )}
    </div>

    <div>
      <Table
        header='Appearance'
        options={colors.map(color => ({
          header: color,
          props: { appearance: color, text: DEFAULT_TEXT, textMode: DEFAULT_TEXT_MODE, size: DEFAULT_SIZE },
        }))}
      />
      <Table
        header='Text Mode'
        options={surfaces.map(surface => ({
          header: surface,
          props: { appearance: DEFAULT_APPEARANCE, text: DEFAULT_TEXT, textMode: surface },
        }))}
      />
      <Table
        header='Size'
        options={sizes.map(size => ({
          header: size,
          props: { appearance: DEFAULT_APPEARANCE, text: DEFAULT_TEXT, size: size, textMode: DEFAULT_TEXT_MODE },
        }))}
      />
    </div>
  </>
);

export const link: StoryObj<StoryProps> = {
  render: Template,

  args: {
    textMode: DEFAULT_TEXT_MODE,
    href: '#',
    text: DEFAULT_TEXT,
    size: DEFAULT_SIZE,
    purpose: DEFAULT_PURPOSE,
    target: '_blank',
    appearance: DEFAULT_APPEARANCE,
    insideText: false,
    truncateVariant: 'end',
  },

  argTypes: {
    size: { control: { type: 'radio' } },
    target: {
      control: {
        type: 'select',
        options: Object.values(TARGET),
      },
    },
    download: {
      type: 'string',
    },
  },

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A9&mode=design',
    },
  },
};

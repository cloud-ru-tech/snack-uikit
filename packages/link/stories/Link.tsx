import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Link, LinkProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Link',
  component: Link,
};
export default meta;

const DEFAULT_TEXT = 'Link text';
const DEFAULT_SIZE = Link.sizes.S;
const DEFAULT_SURFACE = Link.onSurfaces.Background;
const DEFAULT_COLOR = Link.onColors.Primary;

type StoryProps = LinkProps;

type Option = {
  header: string;
  props?: Partial<LinkProps>;
};

type TableProps = {
  header: string;
  options: Option[];
};

const colors = Object.values(Link.onColors);
const sizes = Object.values(Link.sizes);
const surfaces = Object.values(Link.onSurfaces);

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
            data-appearance={option.props?.onColor}
            data-on-surface={option.props?.onSurface}
          >
            <Link {...option.props} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

const Template: StoryFn<StoryProps> = ({ ...args }) => (
  <>
    <div className={styles.wrapper} data-appearance={args.onColor} data-on-surface={args.onSurface}>
      <Link {...args} />
    </div>
    <Table
      header='onColor'
      options={colors.map(color => ({
        header: color,
        props: { onColor: color, text: DEFAULT_TEXT, onSurface: DEFAULT_SURFACE, size: DEFAULT_SIZE },
      }))}
    />
    <Table
      header='onSurface'
      options={surfaces.map(surface => ({
        header: surface,
        props: { onColor: DEFAULT_COLOR, text: DEFAULT_TEXT, onSurface: surface },
      }))}
    />
    <Table
      header='size'
      options={sizes.map(size => ({
        header: size,
        props: { onColor: DEFAULT_COLOR, text: DEFAULT_TEXT, size: size, onSurface: DEFAULT_SURFACE },
      }))}
    />
  </>
);

export const link: StoryObj<StoryProps> = Template.bind({});

link.args = {
  href: '#',
  text: DEFAULT_TEXT,
  size: Link.sizes.S,
  target: Link.targets.Blank,
  external: false,
  onColor: Link.onColors.Primary,
  onSurface: Link.onSurfaces.Background,
};

link.argTypes = {
  size: { control: { type: 'select' } },
  target: {
    control: {
      type: 'select',
      options: Object.values(Link.targets),
    },
  },
};

link.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/RLJd0LDs7HqOVJIRxD6zUq/Link?t=R0iG5gNrqucXW2DE-0',
  },
};

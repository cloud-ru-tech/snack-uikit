import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Avatar, AvatarProps } from '../src';
import { imagesConfig } from './images';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Avatar',
  component: Avatar,
};
export default meta;

const DEFAULT_NAME = 'Will Willow';
const DEFAULT_SIZE = Avatar.sizes.S;
const DEFAULT_SHAPE = Avatar.shapes.Round;
const DEFAULT_APPEARANCE = Avatar.appearances.Red;

type Option = {
  header: string;
  props?: Partial<AvatarProps>;
};

type TableProps = {
  header: string;
  options: Option[];
};

function Table({ header, options }: TableProps) {
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <div className={styles.table}>
      <div className={headerCellClassnames} />
      <div className={headerCellClassnames}>{header}</div>
      {options.map(option => (
        <Fragment key={option.header}>
          <div className={headerCellClassnames}>{option.header}</div>
          <div className={styles.cell}>
            <Avatar name={DEFAULT_NAME} {...option.props} />
          </div>
        </Fragment>
      ))}
    </div>
  );
}

type StoryProps = AvatarProps & { showImage: boolean; customSrc?: string };

const Template: StoryFn<StoryProps> = ({
  showImage,
  customSrc,
  shape = DEFAULT_SHAPE,
  appearance = DEFAULT_APPEARANCE,
  ...args
}) => {
  const shapes = Object.values(Avatar.shapes);
  const sizes = Object.values(Avatar.sizes);
  const appearances = Object.values(Avatar.appearances);
  const indicators = Object.values(Avatar.indicators);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.wrapper}>
        Controlled:
        <Avatar
          {...args}
          shape={shape}
          appearance={appearance}
          src={showImage ? customSrc || imagesConfig[shape][appearance] : undefined}
        />
      </div>

      <div className={styles.tableHorizontalGroup}>
        <div className={styles.tableVerticalGroup}>
          <Table
            header='Image'
            options={[
              { header: 'Yes', props: { src: imagesConfig[Avatar.shapes.Round][Avatar.appearances.Red] } },
              { header: 'No' },
            ]}
          />

          <Table header='Shape' options={shapes.map(shape => ({ header: shape, props: { shape } }))} />

          <Table
            header='Symbols'
            options={[
              { header: 'One', props: { showTwoSymbols: false } },
              { header: 'Two', props: { showTwoSymbols: true } },
            ]}
          />
        </div>

        <Table
          header='Appearance'
          options={appearances.map(appearance => ({ header: appearance, props: { appearance } }))}
        />

        <Table
          header='Indicator'
          options={[{ header: 'None' }, ...indicators.map(indicator => ({ header: indicator, props: { indicator } }))]}
        />

        <Table header='Size' options={sizes.map(size => ({ header: size, props: { size } }))} />
      </div>
    </div>
  );
};

export const avatar: StoryObj<StoryProps> = Template.bind({});

avatar.args = {
  showImage: false,
  customSrc: '',
  name: DEFAULT_NAME,
  size: DEFAULT_SIZE,
  appearance: DEFAULT_APPEARANCE,
  shape: DEFAULT_SHAPE,
  indicator: undefined,
  showTwoSymbols: false,
};

avatar.argTypes = {
  showImage: {
    type: 'boolean',
  },
  customSrc: {
    type: 'string',
    if: { arg: 'showImage' },
  },
  src: {
    table: {
      disable: true,
    },
  },
};

avatar.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/bCKjhXIy5N4WrrcEo7poZC/Avatar?node-id=3-2&t=8ldgzdsyQIEdBbUg-0',
  },
};

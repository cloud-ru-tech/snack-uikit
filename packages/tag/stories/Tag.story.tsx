import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useState } from 'react';

import { ValueOf } from '@snack-uikit/utils';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tag, TagProps } from '../src';
import { APPEARANCE, SIZE } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Tag/Tag',
  component: Tag,
};
export default meta;

const STORY_MODE = {
  Default: 'default',
  Removable: 'removable',
  Link: 'link',
} as const;

type StoryMode = ValueOf<typeof STORY_MODE>;

type StoryProps = TagProps & { storyMode: StoryMode };

const Template: StoryFn<StoryProps> = ({ storyMode: mode, ...args }) => {
  const sizes = Object.values(SIZE);
  const appearances = Object.values(APPEARANCE);
  const [visible, setVisible] = useState(true);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        {visible && (
          <Tag
            {...args}
            href={
              mode === STORY_MODE.Link
                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  args?.href || '#'
                : undefined
            }
            onDelete={mode === STORY_MODE.Removable ? () => setVisible(false) : undefined}
          />
        )}
      </div>

      <div className={styles.table} style={{ '--columns': 3 }}>
        <div className={headerCellClassnames} />
        {sizes.map(size => (
          <div key={size} className={headerCellClassnames}>
            {size}
          </div>
        ))}
        {appearances.map(appearance => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>
            {sizes.map(size => (
              <div key={size} className={styles.cell}>
                <Tag
                  size={size}
                  appearance={appearance}
                  label='Label text'
                  onClick={e => {
                    e.preventDefault();
                  }}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const tag: StoryObj<StoryProps> = {
  render: Template,

  args: {
    storyMode: STORY_MODE.Default,
    label: 'Tag Label',
    href: 'https://cloud.ru',
    target: '_blank',
  },

  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: {
        type: 'radio',
      },
    },
    storyMode: {
      name: '[Stories]: Story mode',
      options: Object.values(STORY_MODE),
      control: {
        type: 'radio',
      },
    },
    onDelete: {
      if: { arg: 'storyMode', eq: STORY_MODE.Removable },
    },
    href: {
      if: { arg: 'storyMode', eq: STORY_MODE.Link },
    },
    onClick: {
      if: { arg: 'storyMode', eq: STORY_MODE.Link },
    },
    target: {
      if: { arg: 'storyMode', eq: STORY_MODE.Link },
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A24551&mode=design',
    },
  },
};

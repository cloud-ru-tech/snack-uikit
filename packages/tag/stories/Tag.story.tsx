import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useState } from 'react';

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

type StoryProps = TagProps & { removableMode: boolean };

const Template: StoryFn<StoryProps> = ({ removableMode, ...args }) => {
  const sizes = Object.values(SIZE);
  const appearances = Object.values(APPEARANCE);
  const [visible, setVisible] = useState(true);
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        {visible && <Tag {...args} onDelete={removableMode ? () => setVisible(false) : undefined} />}
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
                <Tag size={size} appearance={appearance} label='Label text' />
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
    label: 'Tag Label',
    removableMode: false,
  },

  argTypes: {
    size: {
      options: Object.values(SIZE),
      control: {
        type: 'radio',
      },
    },
    removableMode: {
      name: '[Stories]: Show remove mode',
      control: {
        type: 'boolean',
      },
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

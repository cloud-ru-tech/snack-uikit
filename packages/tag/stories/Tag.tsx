import { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { Fragment, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Tag, TagProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Tag',
  component: Tag,
};
export default meta;

type StoryProps = TagProps & { removableMode: boolean };

const Template: StoryFn<StoryProps> = ({ removableMode, ...args }) => {
  const sizes = Object.values(Tag.sizes);
  const appearances = Object.values(Tag.appearances);
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

export const tag: StoryObj<StoryProps> = Template.bind({});

tag.args = {
  label: 'Tag Label',
  removableMode: false,
};

tag.argTypes = {
  removableMode: {
    name: '[Stories]: Show remove mode',
    control: {
      type: 'boolean',
    },
  },
};

tag.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/nuEhS6AUZLLN72JKDEGEaQ/Tag?type=design&t=xlAVX4yP4FyM5D01-0',
  },
};

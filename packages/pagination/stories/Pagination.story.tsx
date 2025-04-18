import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { MouseEvent, useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Pagination, PaginationProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
};
export default meta;

type StoryProps = PaginationProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const [page, setPage] = useState(args.page);

  const handleChange = (page: number, event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    setPage(page);
    event?.preventDefault();
  };

  useEffect(() => {
    setPage(args.page);
  }, [args.total, args.page]);

  return (
    <div className={styles.wrapper}>
      <Pagination {...args} page={page} onChange={handleChange} />
    </div>
  );
};

export const pagination: StoryObj<StoryProps> = {
  render: Template,

  args: {
    total: 10,
    page: 1,
    maxLength: 7,
    size: 's',
    variant: 'button',
    hrefFormatter: (page: number) => `/cases/${page}`,
  },

  argTypes: {},

  parameters: {
    readme: {
      sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
    },
    packageName: componentPackage.name,
    design: {
      name: 'Figma',
      type: 'figma',
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A17288&mode=design',
    },
  },
};

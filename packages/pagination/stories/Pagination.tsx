import { Meta, Story } from '@storybook/react/types-6-0';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Pagination, PaginationProps } from '../src';
import styles from './styles.module.scss';

export default {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
} as Meta;

const Template: Story<PaginationProps> = ({ ...args }) => {
  const [page, setPage] = useState(args.page);

  useEffect(() => {
    setPage(args.page);
  }, [args.total, args.page]);

  return (
    <div className={styles.wrapper}>
      <Pagination {...args} page={page} onChange={setPage} />
    </div>
  );
};
export const pagination = Template.bind({});

pagination.args = {
  total: 10,
  page: 1,
};

pagination.argTypes = {};

pagination.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/rFD4G7kFc2ylGYDkK8IeIX/Pagination?node-id=0-1&t=gmshbzdhCVJTradL-0',
  },
};
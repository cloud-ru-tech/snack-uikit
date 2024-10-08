import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { PaginationSlider, PaginationSliderProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Pagination/Pagination Slider',
  component: PaginationSlider,
};
export default meta;

type StoryProps = PaginationSliderProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const [page, setPage] = useState(args.page);

  useEffect(() => {
    setPage(args.page);
  }, [args.total, args.page]);

  return (
    <div className={styles.wrapper}>
      <PaginationSlider {...args} page={page} onChange={setPage} />
    </div>
  );
};

export const paginationSlider: StoryObj<StoryProps> = {
  render: Template,

  args: {
    total: 10,
    page: 1,
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

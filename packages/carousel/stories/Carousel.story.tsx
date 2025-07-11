import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Carousel, CarouselProps } from '../src';
import { STORY_TEST_IDS } from './constants';
import { StoryCard } from './helperComponents';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Carousel',
  component: Carousel,
};
export default meta;

type StoryProps = {
  page?: number;
  itemsCount?: number;
} & CarouselProps;

const Template: StoryFn<StoryProps> = ({ page: pageProp, itemsCount, ...args }: StoryProps) => {
  const [page, setPage] = useState<number>(pageProp ? pageProp - 1 : 0);

  useEffect(() => {
    setPage(pageProp ? pageProp - 1 : 0);
  }, [pageProp]);

  return (
    <div className={styles.wrapper}>
      <Carousel
        {...args}
        state={{
          page,
          onChange: setPage,
        }}
      >
        {Array.from({ length: itemsCount || 12 }).map((_, i) => (
          <StoryCard key={i} title={`Item ${i + 1}`} />
        ))}
      </Carousel>

      <span data-test-id={STORY_TEST_IDS.HiddenPageCounter} className={styles.hiddenPageCounter}>
        {page + 1}
      </span>
    </div>
  );
};

export const carousel: StoryObj<StoryProps> = {
  render: Template,

  args: {
    showItems: 2.5,
    scrollBy: 2,
    transition: 0.4,
    swipe: true,
    arrows: true,
    pagination: true,
    infiniteScroll: true,
    autoSwipe: 5,
    itemsCount: 12,
    page: 1,
    controlsVisibility: 'hover',
  },

  argTypes: {
    page: {
      name: '[Story]: pagination page as controlled state',
    },
    itemsCount: {
      name: '[Story]: count demo cards',
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
      url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=44%3A7537&mode=design',
    },
  },
};

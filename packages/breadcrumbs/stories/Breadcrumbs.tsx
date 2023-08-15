import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { HeartFilledSVG } from '@snack-ui/icons';
import { Scroll } from '@snack-ui/scroll';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Breadcrumbs, BreadcrumbsProps } from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
};
export default meta;

type StoryProps = BreadcrumbsProps & {
  storyBreadcrumbs: {
    label: string;
    shortLabel?: string;
  }[];
  storyUrl: boolean;
  storyIcon: boolean;
  storyOnClick: boolean;
  storyContainerWidth: string;
};

const Template = ({
  storyIcon,
  storyBreadcrumbs,
  storyUrl,
  storyOnClick,
  storyContainerWidth,
  ...rest
}: StoryProps) => {
  const onClick = action('onClick');
  const [lastClickedCrumb, setLastClickedCrumb] = useState('');

  const items: BreadcrumbsProps['items'] = storyBreadcrumbs.map((item, index) => ({
    ...item,
    id: `id${index}`,
    href: storyUrl ? `https://yandex.ru/search?text=${encodeURIComponent(item.label)}` : undefined,
    onClick: storyOnClick
      ? (...args) => {
          setLastClickedCrumb(item.label);
          onClick(...args);
        }
      : undefined,
  }));

  if (storyIcon) {
    items[0].icon = HeartFilledSVG;
  }

  delete items.at(-1)?.onClick;
  delete items.at(-1)?.href;

  return (
    <div>
      <style>{`.${styles.scroll} { width: ${storyContainerWidth}; }`}</style>
      <Scroll className={styles.scroll} resize={Scroll.resizes.Horizontal}>
        <div className={styles.container}>
          <Breadcrumbs {...rest} items={items} />
        </div>
      </Scroll>
      <div className={styles.crumbClickHolder} data-test-id='last-clicked-crumb'>
        {lastClickedCrumb}
      </div>
    </div>
  );
};

export const breadcrumbs: StoryFn<StoryProps> = Template.bind({});

breadcrumbs.args = {
  storyBreadcrumbs: [
    { label: 'Литература' },
    { label: 'Стихи' },
    { label: 'Золотой век русской поэзии', shortLabel: 'Золотой век' },
    { label: 'Михаил Лермонтов', shortLabel: 'Лермонтов' },
    { label: 'Тема "Одиночество"', shortLabel: 'Одиночество' },
    { label: 'Парус' },
  ],
  storyUrl: false,
  storyIcon: false,
  storyOnClick: false,
  storyContainerWidth: '100%',
  size: Breadcrumbs.sizes.S,
};

breadcrumbs.argTypes = {
  items: {
    table: {
      disable: true,
    },
  },
  storyBreadcrumbs: {
    name: '[story] Items',
  },
  storyUrl: {
    name: '[story] url',
    description: 'Передать урлы для айтемов',
  },
  storyOnClick: {
    name: '[story] onClick',
    description: 'Передать обработчики кликов для айтемов',
  },
  storyIcon: {
    name: '[story] icon',
    description: 'Передать иконку в первый айтем',
  },
  storyContainerWidth: {
    name: `[story] container width`,
  },
};

breadcrumbs.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gydu9jSAAS8vxjjJwOzvOH/Breadcrumbs?type=design&node-id=0-1&t=FCM75u3B9NYodjkI-0',
  },
};

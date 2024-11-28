import { Meta, StoryObj } from '@storybook/react';
import { PropsWithChildren } from 'react';

import { TruncateString } from '@snack-uikit/truncate-string';
import { PURPOSE, Purpose, SIZE, Size, Typography } from '@snack-uikit/typography';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  Skeleton,
  SkeletonContextProvider,
  SkeletonProps,
  SkeletonText,
  SkeletonTextProps,
  WithSkeleton,
} from '../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
};
export default meta;

const readmeAndDesign = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  // TODO: пока не знаем что показать в фигме
  //  design: {
  //    name: 'Figma',
  //    type: 'figma',
  //    url: 'https://www.figma.com/file/DoP0HM1utUGT8wbxgV8Rjz/branch/jSKlhpxNbw7Lea79kkplDJ/Skeleton?type=design&node-id=0-1&t=qJsTHT0zhjhYLNOu-0',
  //  },
};

const packageName = componentPackage.name;

function Template({ ...args }) {
  return (
    <Skeleton {...args}>
      <div data-test-id='children' />
    </Skeleton>
  );
}

export const skeleton: StoryObj<SkeletonProps> = {
  render: Template,
  args: { loading: true },
  argTypes: { width: { type: 'string' }, height: { type: 'string' }, borderRadius: { type: 'string' } },
  parameters: { ...readmeAndDesign, packageName, controls: { exclude: ['className'] } },
};

type skeletonTextStoryArgs = SkeletonTextProps & {
  text: string;
  textOpacity: number;
};

const VARIANT = Object.values(PURPOSE).reduce((res, purpose) => {
  Object.values(SIZE).forEach(size => {
    res.push([purpose, size].join('-'));
  });

  return res;
}, [] as string[]);

export const skeletonText = {
  render: ({ text, typography, textOpacity, ...args }: skeletonTextStoryArgs) => (
    <Typography
      family='sans'
      size={(typography?.split('-')[1] as Size) || 'm'}
      purpose={(typography?.split('-')[0] as Purpose) || 'body'}
    >
      <div
        className={styles.textContainer}
        style={{
          position: 'relative',
        }}
      >
        <div style={{ opacity: textOpacity / 100 }}>
          <TruncateString text={text} maxLines={args.lines} />
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        >
          <SkeletonText {...args} typography={typography}>
            <div data-test-id='children'>
              <TruncateString text={text} maxLines={args.lines} />
            </div>
          </SkeletonText>
        </div>
      </div>
    </Typography>
  ),

  args: {
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nesciunt consequuntur veniam libero aliquid perspiciatis earum quasi natus unde saepe provident, aliquam maiores dolor. Illum possimus modi saepe architecto voluptatibus!',
    textOpacity: 50,
    typography: 'body-m',
    lines: 3,
    loading: true,
  },

  parameters: {
    ...readmeAndDesign,
    packageName,
    controls: { exclude: ['width', 'height', 'className'] },
  },

  argTypes: {
    lines: { type: 'number' },
    text: {
      name: '[Stories]: demo text',
      type: 'string',
    },
    typography: {
      options: VARIANT,

      control: {
        type: 'select',
      },
    },
    textOpacity: {
      name: '[Stories]: demo text opacity',
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
};

function Card({ children }: PropsWithChildren) {
  return (
    <div data-test-id='children' className={styles.storyCard}>
      <div className={styles.storyCard_header}>
        <div className={styles.storyCard_avatar} />
        <div className={styles.storyCard_title}>{children}</div>
      </div>
    </div>
  );
}

export const withSkeleton = {
  render: ({ ...args }) => {
    const cardSkeleton = (
      <div data-test-id={args['data-test-id']} className={styles.storyCard}>
        <div className={styles.storyCard_header}>
          <Skeleton width={100} height={100} borderRadius={50} />
          <div className={styles.storyCard_title}>
            <SkeletonText lines={3} />
          </div>
        </div>
      </div>
    );

    return (
      <SkeletonContextProvider loading={args.loading}>
        {[
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, laboriosam iure!',
          'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi cupiditate qui amet.',
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, provident.',
        ].map(title => (
          <WithSkeleton key={title} skeleton={cardSkeleton}>
            <Card>{title}</Card>
          </WithSkeleton>
        ))}
      </SkeletonContextProvider>
    );
  },

  args: { loading: true },

  parameters: {
    ...readmeAndDesign,
    packageName,
    controls: { exclude: ['width', 'height', 'borderRadius', 'className'] },
  },
};

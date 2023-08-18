import { Meta, StoryFn } from '@storybook/react';
import { PropsWithChildren } from 'react';

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

export const skeleton: StoryFn<SkeletonProps> = Template.bind({});
skeleton.args = { loading: true };
skeleton.argTypes = { width: { type: 'string' }, height: { type: 'string' }, borderRadius: { type: 'string' } };
skeleton.parameters = { ...readmeAndDesign, packageName, controls: { exclude: ['className'] } };

type skeletonTextStoryArgs = SkeletonTextProps & {
  text: string;
  fontSize: string;
  lineHeight: string;
};
export const skeletonText = ({ text, fontSize, lineHeight, ...args }: skeletonTextStoryArgs) => (
  <div className={styles.textContainer} style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}>
    <div>{text}</div>
    <div>
      <SkeletonText {...args}>
        <div data-test-id='children'>{text}</div>
      </SkeletonText>
    </div>
  </div>
);
skeletonText.args = {
  text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati rerum, at sit aperiam doloribus.',
  fontSize: 16,
  lineHeight: 24,
  lines: 3,
  radius: '0.4em',
  loading: true,
};
skeletonText.parameters = {
  ...readmeAndDesign,
  packageName,
  controls: { exclude: ['width', 'height', 'className'] },
};
skeletonText.argTypes = {
  borderRadius: { type: 'string' },
  lines: { type: 'number' },
  text: { type: 'string' },
  fontSize: { type: 'number' },
  lineHeight: { type: 'number' },
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

export const withSkeleton = ({ ...args }) => {
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
};
withSkeleton.args = { loading: true };
withSkeleton.parameters = {
  ...readmeAndDesign,
  packageName,
  controls: { exclude: ['width', 'height', 'borderRadius', 'className'] },
};

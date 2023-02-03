import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import {
  H1_STYLES,
  H2_SEMIBOLD_STYLES,
  H2_STYLES,
  H3_SEMIBOLD_STYLES,
  H3_STYLES,
  H4_SEMIBOLD_STYLES,
  H4_STYLES,
  H5_STYLES,
} from '../src';
import { commonTemplate, TypographyStoryConfig } from './helpers/CommonTemplate';

export default {
  title: 'Typography/Headers',
} as Meta;

const headersConfig: TypographyStoryConfig = [
  {
    name: 'H1',
    Component: styled.h1`
      ${H1_STYLES};
    `,
    styles: H1_STYLES.toString(),
  },
  {
    name: 'H2',
    Component: styled.h2`
      ${H2_STYLES};
    `,
    styles: H2_STYLES.toString(),
  },
  {
    name: 'H2Semibold',
    Component: styled.h2`
      ${H2_SEMIBOLD_STYLES};
    `,
    styles: H2_SEMIBOLD_STYLES.toString(),
  },
  {
    name: 'H3',
    Component: styled.h3`
      ${H3_STYLES};
    `,
    styles: H3_STYLES.toString(),
  },
  {
    name: 'H3Semibold',
    Component: styled.h3`
      ${H3_SEMIBOLD_STYLES};
    `,
    styles: H3_SEMIBOLD_STYLES.toString(),
  },
  {
    name: 'H4',
    Component: styled.h4`
      ${H4_STYLES};
    `,
    styles: H4_STYLES.toString(),
  },
  {
    name: 'H4Semibold',
    Component: styled.h4`
      ${H4_SEMIBOLD_STYLES};
    `,
    styles: H4_SEMIBOLD_STYLES.toString(),
  },
  {
    name: 'H5',
    Component: styled.h5`
      ${H5_STYLES};
    `,
    styles: H5_STYLES.toString(),
  },
];

const Template: Story<{ value: string }> = commonTemplate(headersConfig);

export const headers = Template.bind({});
headers.args = {
  value: 'Пример',
};
headers.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  badges: [BADGE.STABLE],
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/gCc4XarYocwWbficnQPInC/%F0%9F%93%9A-%5BLIB%5D-Platform-Design-System?node-id=1015%3A2',
  },
};

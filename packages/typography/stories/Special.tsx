import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { CHARTS_GRID_STYLES, MONO_14_BOLD_STYLES, MONO_14_STYLES, NOTIFY_STYLES, TABLE_TEXT_STYLES } from '../src';
import { commonTemplate, TypographyStoryConfig } from './helpers/CommonTemplate';

export default {
  title: 'Typography/Special',
} as Meta;

const specialConfig: TypographyStoryConfig = [
  {
    name: 'TableText',
    Component: styled.div`
      ${TABLE_TEXT_STYLES};
    `,
    styles: TABLE_TEXT_STYLES.toString(),
  },
  {
    name: 'Notify',
    Component: styled.div`
      ${NOTIFY_STYLES};
    `,
    styles: NOTIFY_STYLES.toString(),
  },
  {
    name: 'Mono14',
    Component: styled.div`
      ${MONO_14_STYLES};
    `,
    styles: MONO_14_STYLES.toString(),
  },
  {
    name: 'Mono14Bold',
    Component: styled.div`
      ${MONO_14_BOLD_STYLES};
    `,
    styles: MONO_14_BOLD_STYLES.toString(),
  },
  {
    name: 'ChartsGrid',
    Component: styled.div`
      ${CHARTS_GRID_STYLES};
    `,
    styles: CHARTS_GRID_STYLES.toString(),
  },
];

const Template: Story<{ value: string }> = commonTemplate(specialConfig);

export const special = Template.bind({});
special.args = {
  value: 'Пример',
};
special.parameters = {
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

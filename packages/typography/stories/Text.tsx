import { styled } from '@linaria/react';
import { Meta, Story } from '@storybook/react';

import { BADGE } from '#storybookConstants';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { TEXT_1_STYLES, TEXT_2_STYLES, TEXT_3_STYLES, TEXT_4_STYLES } from '../src';
import { commonTemplate, TypographyStoryConfig } from './helpers/CommonTemplate';

export default {
  title: 'Typography/Text',
} as Meta;

const textConfig: TypographyStoryConfig = [
  {
    name: 'Text1',
    Component: styled.div`
      ${TEXT_1_STYLES};
    `,
    styles: TEXT_1_STYLES.toString(),
  },
  {
    name: 'Text2',
    Component: styled.div`
      ${TEXT_2_STYLES};
    `,
    styles: TEXT_2_STYLES.toString(),
  },
  {
    name: 'Text3',
    Component: styled.div`
      ${TEXT_3_STYLES};
    `,
    styles: TEXT_3_STYLES.toString(),
  },
  {
    name: 'Text4',
    Component: styled.div`
      ${TEXT_4_STYLES};
    `,
    styles: TEXT_4_STYLES.toString(),
  },
];

const Template: Story<{ value: string }> = commonTemplate(textConfig);
export const text = Template.bind({});
text.args = {
  value: 'Пример',
};
text.parameters = {
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

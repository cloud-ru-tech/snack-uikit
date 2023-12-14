import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useDarkMode } from 'storybook-dark-mode';

import Readme from '../../README.md';
import CloudRuFullLogoDark from '../assets/CloudRuFullLogoDark.svg';
import { Markdown } from './components';

const meta: Meta = {
  title: 'Documentation/Getting Started',
};
export default meta;

const PATTERN_TO_REPLACE = new RegExp(/!\[Cloud]\((?<imagePath>.+?)\)/);

const currentImagePath = PATTERN_TO_REPLACE.exec(Readme)?.groups?.imagePath;

const Template: StoryFn = () => {
  const isDark = useDarkMode();

  const readme = currentImagePath && isDark ? Readme.replace(currentImagePath, String(CloudRuFullLogoDark)) : Readme;

  return <Markdown md={readme} />;
};

export const gettingStarted: StoryObj = Template.bind({});
gettingStarted.args = {};
gettingStarted.argTypes = {};

import { ButtonFilled } from '@snack-ui/button';
import { useArgs } from '@storybook/client-api';
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ProgressBarPage, ProgressBarPageProps } from '../src';

export default {
  title: 'Components/Loaders/Progress Bar Page',
  component: ProgressBarPage,
} as Meta;

const Template: Story<ProgressBarPageProps> = ({ ...args }) => {
  const [{ inProgress }, updateArgs] = useArgs();

  return (
    <>
      <ProgressBarPage {...args} inProgress={inProgress} />
      <div style={{ display: 'flex', gap: 8 }}>
        <ButtonFilled
          disabled={inProgress}
          onClick={() => updateArgs({ inProgress: true })}
          label='start'
          data-test-id='start-button-test'
        />
        <ButtonFilled
          disabled={!inProgress}
          onClick={() => updateArgs({ inProgress: false })}
          label='stop'
          data-test-id='stop-button-test'
        />
      </div>
    </>
  );
};

export const progressBarPage = Template.bind({});

progressBarPage.args = {
  inProgress: false,
  animationDuration: 200,
  incrementDuration: 800,
  minimum: 0.08,
};

progressBarPage.argTypes = {
  inProgress: {
    name: 'inProgress',
    type: 'boolean',
  },
  animationDuration: {
    name: 'animationDuration',
    type: 'number',
  },
  incrementDuration: {
    name: 'incrementDuration',
    type: 'number',
  },
  minimum: {
    name: 'minimum',
    type: 'number',
  },
};

progressBarPage.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/FtPyS58ZZtQorzjQcFRr7o/Loader?node-id=23%3A336&t=svmSDrEJNhN7ANYz-0',
  },
};

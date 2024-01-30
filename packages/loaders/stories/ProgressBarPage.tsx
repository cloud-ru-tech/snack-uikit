import { useArgs } from '@storybook/client-api';
import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonFilled } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { ProgressBarPage, ProgressBarPageProps } from '../src';

const meta: Meta = {
  title: 'Components/Loaders/Progress Bar Page',
  component: ProgressBarPage,
};
export default meta;

type StoryProps = ProgressBarPageProps;
const Template: StoryFn<StoryProps> = ({ ...args }) => {
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

export const progressBarPage: StoryObj<StoryProps> = Template.bind({});

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
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=2%3A2&mode=design',
  },
};

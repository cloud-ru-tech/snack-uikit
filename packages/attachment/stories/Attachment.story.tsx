import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Attachment } from '../src';
import { DEFAULT_ARG_TYPES, DEFAULT_ARGS, DEFAULT_PARAMETERS, StoryProps, TemplateStory } from './TemplateStory';

const meta: Meta = {
  title: 'Components/Attachment/Attachment',
  component: Attachment,
};
export default meta;

const Template: StoryFn<StoryProps> = TemplateStory(Attachment);

export const attachment: StoryObj<StoryProps> = {
  render: Template,
  args: DEFAULT_ARGS,
  argTypes: DEFAULT_ARG_TYPES,
  parameters: DEFAULT_PARAMETERS,
};

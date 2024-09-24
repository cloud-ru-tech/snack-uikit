import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { AttachmentSquare } from '../src';
import { DEFAULT_ARG_TYPES, DEFAULT_ARGS, DEFAULT_PARAMETERS, StoryProps, TemplateStory } from './TemplateStory';

const meta: Meta = {
  title: 'Components/Attachment/AttachmentSquare',
  component: AttachmentSquare,
};
export default meta;
const Template: StoryFn<StoryProps> = TemplateStory(AttachmentSquare);

export const attachmentSquare: StoryObj<StoryProps> = {
  render: Template,
  args: DEFAULT_ARGS,
  argTypes: DEFAULT_ARG_TYPES,
  parameters: DEFAULT_PARAMETERS,
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { AttachmentSquare } from '../src';
import { DEFAULT_ARG_TYPES, DEFAULT_ARGS, DEFAULT_PARAMETERS, StoryProps, TemplateStory } from './TemplateStory';

const meta: Meta = {
  title: 'Components/Attachment/AttachmentSquare',
  component: AttachmentSquare,
};
export default meta;
const Template: StoryFn<StoryProps> = TemplateStory(AttachmentSquare);

export const attachmentSquare: StoryObj<StoryProps> = Template.bind({});

attachmentSquare.args = DEFAULT_ARGS;
attachmentSquare.argTypes = DEFAULT_ARG_TYPES;
attachmentSquare.parameters = DEFAULT_PARAMETERS;

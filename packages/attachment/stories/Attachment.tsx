import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { Attachment } from '../src';
import { DEFAULT_ARG_TYPES, DEFAULT_ARGS, DEFAULT_PARAMETERS, StoryProps, TemplateStory } from './TemplateStory';

const meta: Meta = {
  title: 'Components/Attachment/Attachment',
  component: Attachment,
};
export default meta;

const Template: StoryFn<StoryProps> = TemplateStory(Attachment);

export const attachment: StoryObj<StoryProps> = Template.bind({});

attachment.args = DEFAULT_ARGS;
attachment.argTypes = DEFAULT_ARG_TYPES;
attachment.parameters = DEFAULT_PARAMETERS;

import { addDecorator, addParameters } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { withDesign } from 'storybook-addon-designs';
import { addReadme } from 'storybook-readme';

addDecorator(addReadme);
addDecorator(withDesign);
addDecorator(Story => {
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: true,
    shouldUnregister: true,
  });
  return (
    // Add global styles and theme variables
    <div id='story-root'>
      <FormProvider {...methods}>
        {/* @ts-ignore */}
        <Story />
      </FormProvider>
    </div>
  );
});

addParameters({
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Components', 'Not stable'],
    },
  },
});

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonOutline } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Stepper, StepperProps, useStepperApi } from '../src';
import { StepValidationResult } from '../src/constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Stepper',
  component: Stepper,
};
export default meta;

type StoryProp = StepperProps & {
  isValid: boolean;
  validationTimeout: number;
};

function ControlPanel() {
  const { goPrev, goNext, isCompleted, currentStepIndex, resetValidation } = useStepperApi();

  return (
    <>
      <div>
        <div data-test-id='is-completed'>isCompleted: {isCompleted ? 'yes' : 'no'}</div>
        <div data-test-id='current-index'>current step index: {currentStepIndex}</div>
      </div>
      <div className={styles.panel}>
        <ButtonOutline data-test-id='prev' size={ButtonOutline.sizes.S} label='go prev' onClick={() => goPrev()} />
        <ButtonOutline
          data-test-id='reset-validation'
          size={ButtonOutline.sizes.S}
          label='reset validation'
          onClick={resetValidation}
        />
        <ButtonOutline data-test-id='next' size={ButtonOutline.sizes.S} label='go next' onClick={goNext} />
      </div>
    </>
  );
}

const Template: StoryFn<StoryProp> = ({ validationTimeout, isValid, ...args }: StoryProp) => {
  const validation = () =>
    new Promise<StepValidationResult>(resolve =>
      setTimeout(
        () => resolve(isValid ? StepValidationResult.Completed : StepValidationResult.Rejected),
        validationTimeout,
      ),
    );

  args.steps = args.steps.map(step => ({
    ...step,
    validation,
  }));

  return (
    <Stepper {...args}>
      {({
        stepper,
        /* You can also get api of stepper here */
        // goPrev, goNext, isCompleted, currentStepIndex, resetValidation
      }) => (
        <>
          <div className={styles.story}>{stepper}</div>
          <ControlPanel />
        </>
      )}
    </Stepper>
  );
};

export const stepper: StoryObj<StoryProp> = Template.bind({});

stepper.args = {
  steps: [
    {
      title: 'First step',
    },
    {
      title: 'Second step',
    },
    {
      title: 'Third step',
    },
    {
      title: 'Fours step',
    },
    {
      title: 'Fifth step',
    },
  ],
  isValid: true,
  validationTimeout: 1000,
};

stepper.argTypes = {
  isValid: {
    name: '[stories] is current step valid',
    control: {
      type: 'boolean',
    },
  },
  validationTimeout: {
    name: '[stories] validation timeout',
    control: {
      min: 0,
      type: 'number',
    },
  },
};

stepper.parameters = {
  readme: {
    sidebar: [`Latest version: ${componentPackage.version}`, componentReadme, componentChangelog],
  },
  packageName: componentPackage.name,
  design: {
    name: 'Figma',
    type: 'figma',
    url: 'https://www.figma.com/file/qPN8ou7BfyFzo9L0SFouHC/Stepper?type=design&node-id=0%3A1&mode=design&t=RCvihmv7i8kvJVxQ-1',
  },
};

import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { ButtonOutline } from '@snack-uikit/button';

import componentChangelog from '../CHANGELOG.md';
import componentPackage from '../package.json';
import componentReadme from '../README.md';
import { Stepper, StepperProps, useStepperApi } from '../src';
import { STEP_VALIDATION_RESULT } from '../src/constants';
import { StepValidationResult } from '../src/types';
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
        <ButtonOutline data-test-id='prev' size='s' label='go prev' onClick={() => goPrev()} />
        <ButtonOutline data-test-id='reset-validation' size='s' label='reset validation' onClick={resetValidation} />
        <ButtonOutline data-test-id='next' size='s' label='go next' onClick={goNext} />
      </div>
    </>
  );
}

const Template: StoryFn<StoryProp> = ({ validationTimeout, isValid, ...args }: StoryProp) => {
  const validation = () =>
    new Promise<StepValidationResult>(resolve =>
      setTimeout(
        () => resolve(isValid ? STEP_VALIDATION_RESULT.Completed : STEP_VALIDATION_RESULT.Rejected),
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
      description: 'First step long description two lines truncated',
    },
    {
      title: 'Second step',
      description: 'Second step long description two lines truncated',
    },
    {
      title: 'Third step',
      description: 'Third step long description two lines truncated',
    },
    {
      title: 'Fourth step',
      description: 'Fourth step long description two lines truncated',
    },
    {
      title: 'Fifth step',
      description: 'Fifth step long description two lines truncated',
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
    url: 'https://www.figma.com/file/jtGxAPvFJOMir7V0eQFukN/Snack-UI-Kit-1.1.0?node-id=41%3A33355&mode=design',
  },
};

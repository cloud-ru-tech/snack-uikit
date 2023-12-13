import cn from 'classnames';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { STEP_STATE, STEP_VALIDATION_RESULT } from '../../constants';
import { Step } from '../../helperComponents';
import { StepperContext } from '../../StepperContext';
import { StepData, StepperApi, StepState, StepViewData } from '../../types';
import styles from './styles.module.scss';

export type StepperState = StepperApi & {
  stepper: ReactElement;
};

export type StepperProps = WithSupportProps<{
  /** Массив шагов */
  steps: StepData[];
  /** Индекс текущего шага по-дефолту */
  defaultCurrentStepIndex: number;
  /** CSS-класс */
  className?: string;
  /**
   * Render function. Принимает аргументы: `stepper` - JSX-элемент степпера,
   * `goNext` - перейти на след. шаг, `goPrev` - перейти на пред. шаг, `resetValidation` - сбросить состояние валидации для текущего шага, `isCompleted` - окончен ли процесс, `currentStepIndex` - индекс текущего шага, `stepCount` - кол-во шагов.
   * @type ({stepper, ...api}) => ReactElement
   */
  children: (params: StepperState) => ReactElement;
  /** Колбек смены текущего степа */
  onChangeCurrentStep: (newValue: number, prevValue: number) => void;
  /** Колбек изменения завершенности */
  onCompleteChange: (isCompleted: boolean) => void;
}>;

export function Stepper({
  children,
  steps,
  className,
  onChangeCurrentStep,
  onCompleteChange,
  defaultCurrentStepIndex = 0,
  ...props
}: StepperProps) {
  const isCompletedByDefault = defaultCurrentStepIndex === steps.length - 1;
  const [currentStepState, setCurrentStepState] = useState<StepState>(
    isCompletedByDefault ? STEP_STATE.Completed : STEP_STATE.Current,
  );
  const [currentStepIndex, setCurrentStepIndexValue] = useState(defaultCurrentStepIndex);
  const [isCompleted, setIsCompleted] = useState(isCompletedByDefault);

  useEffect(() => {
    onCompleteChange?.(isCompleted);
  }, [isCompleted, onCompleteChange]);

  const setCurrentStepIndex = useCallback(
    (newValue: number) => {
      setCurrentStepIndexValue(prevValue => {
        if (prevValue !== newValue) {
          onChangeCurrentStep?.(newValue, prevValue);
        }
        return newValue;
      });
    },
    [onChangeCurrentStep],
  );

  const goNext = useCallback(() => {
    if (currentStepIndex >= steps.length || isCompleted) {
      return;
    }

    const currentStep = steps[currentStepIndex];

    const stepperValidPromise = currentStep.validation?.() ?? Promise.resolve(STEP_STATE.Completed);

    setCurrentStepState(STEP_STATE.Loading);

    stepperValidPromise
      .then(validationResult => {
        switch (validationResult) {
          case STEP_VALIDATION_RESULT.Completed:
            if (currentStepIndex === steps.length - 1) {
              // завершился последний шаг
              setCurrentStepState(STEP_STATE.Completed);
              setIsCompleted(true);
            } else {
              setCurrentStepIndex(currentStepIndex + 1);
              setCurrentStepState(STEP_STATE.Current);
            }
            return;
          case STEP_VALIDATION_RESULT.Rejected:
            setCurrentStepState(STEP_STATE.Rejected);
            return;
          default:
            setCurrentStepState(STEP_STATE.Current);
        }
      })
      .catch(() => setCurrentStepState(STEP_STATE.Rejected));
  }, [currentStepIndex, isCompleted, setCurrentStepIndex, steps]);

  const goPrev = useCallback(
    (index: number = currentStepIndex - 1) => {
      if (currentStepIndex === 0 || index < 0 || index > currentStepIndex) {
        return;
      }

      if (index === currentStepIndex && !isCompleted) {
        return;
      }

      if (isCompleted) {
        setIsCompleted(false);
      }

      setCurrentStepIndex(index);
      setCurrentStepState(STEP_STATE.Current);
    },
    [currentStepIndex, isCompleted, setCurrentStepIndex],
  );

  const stepsView: StepViewData[] = useMemo(
    () =>
      steps.map((step, index) => {
        const number = index + 1;

        if (index < currentStepIndex) {
          return { ...step, number, state: STEP_STATE.Completed, onClick: () => goPrev(index) };
        }

        if (index === currentStepIndex) {
          return { ...step, number, state: currentStepState, onClick: isCompleted ? () => goPrev(index) : undefined };
        }

        if (index - 1 === currentStepIndex) {
          return { ...step, number, state: STEP_STATE.Waiting, onClick: () => goNext() };
        }

        return { ...step, number, state: STEP_STATE.Waiting };
      }),
    [steps, currentStepIndex, goPrev, currentStepState, isCompleted, goNext],
  );

  const resetValidation = useCallback(() => {
    if (currentStepState === STEP_STATE.Rejected) {
      setCurrentStepState(STEP_STATE.Current);
    }
  }, [currentStepState]);

  const stepper = (
    <div className={cn(styles.stepper, className)} {...extractSupportProps(props)}>
      {stepsView.map((step, index, all) => (
        <Step
          key={step.title + index}
          step={step}
          isLast={all.length - 1 === index}
          data-test-id={props['data-test-id']}
        />
      ))}
    </div>
  );

  const stepperApi = { goNext, goPrev, currentStepIndex, isCompleted, resetValidation, stepCount: steps.length };

  return <StepperContext.Provider value={stepperApi}>{children({ stepper, ...stepperApi })}</StepperContext.Provider>;
}

import cn from 'classnames';
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { STEP_STATE } from '../../constants';
import { Step } from '../../helperComponents';
import { StepperContext } from '../../StepperContext';
import { StepData, StepperApi, StepState, StepsValidator, StepViewData } from '../../types';
import styles from './styles.module.scss';

export type StepperState = StepperApi & {
  stepper: ReactElement;
};

export type StepperProps = WithSupportProps<{
  /** Массив шагов */
  steps: StepData[];
  /** Индекс текущего шага по-дефолту */
  defaultCurrentStepIndex: number;
  /** Валидатор шагов. Выполняется при смене шага. Принимает первым аргументом индекс текущего, вторым - индекс нового шага.  */
  validator?: StepsValidator;
  /** CSS-класс */
  className?: string;
  /**
   * Render function. Принимает аргументы: `stepper` - JSX-элемент степпера,
   * `goNext(stepIndex?: number)` - перейти на след. шаг, `goPrev(stepIndex?: number)` - перейти на пред. шаг, `resetValidation` - сбросить состояние валидации для текущего шага, `setValidator` переопределяет функцию-валидатор, которая принимает в параметры индекс текущего шага и индекс нового, `isCompleted` - окончен ли процесс, `currentStepIndex` - индекс текущего шага, `stepCount` - кол-во шагов.
   * @type ({stepper, ...api}) => ReactElement
   */
  children: (params: StepperState) => ReactElement;
  /** Колбек смены текущего степа */
  onChangeCurrentStep?: (newValue: number, prevValue: number) => void;
  /** Колбек изменения завершенности */
  onCompleteChange?: (isCompleted: boolean) => void;
  /** Позволяет свободно переключаться между разными шагами без валидации */
  allowFreeNavigation?: boolean;
}>;

const DEFAULT_VALIDATOR = async () => true;

export function Stepper({
  children,
  steps,
  className,
  onChangeCurrentStep,
  onCompleteChange,
  defaultCurrentStepIndex = 0,
  validator: validatorProp = DEFAULT_VALIDATOR,
  allowFreeNavigation = false,
  ...props
}: StepperProps) {
  const isCompletedByDefault = defaultCurrentStepIndex === steps.length - 1;
  const [currentStepState, setCurrentStepState] = useState<StepState>(
    isCompletedByDefault ? STEP_STATE.Completed : STEP_STATE.Current,
  );
  const [currentStepIndex, setCurrentStepIndexValue] = useState(defaultCurrentStepIndex);
  const [isCompleted, setIsCompleted] = useState(isCompletedByDefault);
  const [stepsValidator, setStepsValidator] = useState<{ value: StepsValidator }>();

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

  const goNext = useCallback(
    (newStepIndexUnsafety: number = currentStepIndex + 1) => {
      if (currentStepIndex >= steps.length || isCompleted || newStepIndexUnsafety <= currentStepIndex) {
        return;
      }

      const newStepIndex = Math.min(steps.length - 1, newStepIndexUnsafety);

      setCurrentStepState(STEP_STATE.Loading);

      const validator = stepsValidator?.value || validatorProp;

      validator(currentStepIndex, newStepIndex)
        .catch(() => false)
        .then(isValid => {
          if (!isValid) {
            setCurrentStepState(STEP_STATE.Rejected);
            return;
          }

          if (currentStepIndex === steps.length - 1) {
            // завершился последний шаг
            setCurrentStepState(STEP_STATE.Completed);
            setIsCompleted(true);
          } else {
            setCurrentStepIndex(newStepIndex);
            setCurrentStepState(STEP_STATE.Current);
          }
        });
    },
    [currentStepIndex, isCompleted, setCurrentStepIndex, steps.length, stepsValidator?.value, validatorProp],
  );

  const moveToStep = useCallback(
    (stepIndex: number) => {
      if (isCompleted) {
        setIsCompleted(false);
      }

      setCurrentStepIndex(stepIndex);
      setCurrentStepState(STEP_STATE.Current);
    },
    [isCompleted, setCurrentStepIndex],
  );

  const goToStep = useCallback(
    (newStepIndex: number) => {
      if (newStepIndex < 0 || newStepIndex >= steps.length) {
        return;
      }

      if (newStepIndex === currentStepIndex) {
        return;
      }

      moveToStep(newStepIndex);
    },
    [currentStepIndex, steps, moveToStep],
  );

  const goPrev = useCallback(
    (index: number = currentStepIndex - 1) => {
      if (currentStepIndex === 0 || index < 0 || index > currentStepIndex) {
        return;
      }

      if (index === currentStepIndex && !isCompleted) {
        return;
      }

      moveToStep(index);
    },
    [currentStepIndex, isCompleted, moveToStep],
  );

  const getStepOnClick = useCallback(
    (stepIndex: number) => {
      if (allowFreeNavigation) {
        return () => goToStep(stepIndex);
      }

      if (stepIndex < currentStepIndex || (stepIndex === currentStepIndex && isCompleted)) {
        return () => goPrev(stepIndex);
      }

      if (stepIndex === currentStepIndex + 1) {
        return () => goNext();
      }

      return undefined;
    },
    [allowFreeNavigation, currentStepIndex, goNext, goPrev, goToStep, isCompleted],
  );

  const stepsView: StepViewData[] = useMemo(
    () =>
      steps.map((step, index) => {
        const number = index + 1;
        let state: StepState = STEP_STATE.Waiting;

        if (index < currentStepIndex) {
          state = STEP_STATE.Completed;
        } else if (index === currentStepIndex) {
          state = currentStepState;
        }

        return {
          ...step,
          number,
          state,
          onClick: getStepOnClick(index),
        };
      }),
    [steps, currentStepIndex, currentStepState, getStepOnClick],
  );

  const resetValidation = useCallback(() => {
    if (currentStepState === STEP_STATE.Rejected) {
      setCurrentStepState(STEP_STATE.Current);
    }
  }, [currentStepState]);

  const setValidator = useCallback((validator: StepsValidator) => {
    setStepsValidator({ value: validator });
  }, []);

  const stepper = (
    <div className={cn(styles.stepper, className)} {...extractSupportProps(props)}>
      {stepsView.map((step, index) => (
        <Step
          key={step.title + index}
          step={step}
          data-test-id={props['data-test-id']}
          hideTailLine={index === steps.length - 1}
        />
      ))}
    </div>
  );

  const stepperApi = {
    goNext,
    goPrev,
    currentStepIndex,
    isCompleted,
    resetValidation,
    stepCount: steps.length,
    stepper,
    setValidator,
    goToStep: allowFreeNavigation ? goToStep : undefined,
  };

  return <StepperContext.Provider value={stepperApi}>{children(stepperApi)}</StepperContext.Provider>;
}

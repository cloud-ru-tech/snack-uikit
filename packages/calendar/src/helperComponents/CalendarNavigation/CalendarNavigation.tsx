import { useContext } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@snack-uikit/icons';

import { GRID_SIZE, SIZE, VIEW_MODE } from '../../constants';
import { Button } from '../Button';
import { CalendarContext } from '../CalendarContext';
import { stringifyAddress } from '../Item/utils';
import { LEVEL_BUTTON_FOCUS_NAME, NEXT_PERIOD_BUTTON_FOCUS_NAME, PREV_PERIOD_BUTTON_FOCUS_NAME } from './constants';
import { usePeriodName } from './hooks';
import styles from './styles.module.scss';
import { getShift } from './utils';

const VIEW_MODE_MAP = {
  [VIEW_MODE.Month]: VIEW_MODE.Year,
  [VIEW_MODE.Year]: VIEW_MODE.Decade,
  [VIEW_MODE.Decade]: VIEW_MODE.Decade,
};

const ICONS = {
  UP: {
    [SIZE.S]: <ChevronUpSVG size={16} />,
    [SIZE.M]: <ChevronUpSVG />,
    [SIZE.L]: <ChevronUpSVG />,
  },
  DOWN: {
    [SIZE.S]: <ChevronDownSVG size={16} />,
    [SIZE.M]: <ChevronDownSVG />,
    [SIZE.L]: <ChevronDownSVG />,
  },
};

export function CalendarNavigation() {
  const {
    referenceDate,
    viewDate,
    viewShift,
    setViewShift,
    viewMode,
    setViewMode,
    focus,
    setFocus,
    getTestId,
    size,
    firstNotDisableCell,
  } = useContext(CalendarContext);
  const periodName = usePeriodName();

  const levelButtonDisabled = viewMode === VIEW_MODE.Decade;

  const isArrowButtonFocused = focus && [NEXT_PERIOD_BUTTON_FOCUS_NAME, PREV_PERIOD_BUTTON_FOCUS_NAME].includes(focus);

  return (
    <div className={styles.wrapper}>
      <Button
        disabled={levelButtonDisabled}
        onClick={() => {
          if (viewMode === VIEW_MODE.Year) {
            setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME);
          }
          setViewShift(getShift(referenceDate, viewDate, viewMode));
          setViewMode(VIEW_MODE_MAP[viewMode]);
        }}
        label={periodName}
        data-test-id={getTestId('period-level')}
        focusName={LEVEL_BUTTON_FOCUS_NAME}
        tabIndex={isArrowButtonFocused ? -1 : 0}
        icon={viewMode !== VIEW_MODE.Decade ? ICONS.DOWN[size] : undefined}
        onRightArrowKeyDown={() => setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME)}
        onDownArrowKeyDown={() => setFocus(stringifyAddress(firstNotDisableCell?.current ?? [0, 0]))}
        useNavigationStartRef
      />
      <div>
        <Button
          onClick={() => setViewShift(viewShift - 1)}
          data-test-id={getTestId('period-prev')}
          focusName={PREV_PERIOD_BUTTON_FOCUS_NAME}
          tabIndex={
            focus === PREV_PERIOD_BUTTON_FOCUS_NAME || (levelButtonDisabled && focus !== NEXT_PERIOD_BUTTON_FOCUS_NAME)
              ? 0
              : -1
          }
          icon={ICONS.UP[size]}
          onRightArrowKeyDown={() => setFocus(NEXT_PERIOD_BUTTON_FOCUS_NAME)}
          onLeftArrowKeyDown={() => setFocus(LEVEL_BUTTON_FOCUS_NAME)}
          onDownArrowKeyDown={() => {
            const rightGap = viewMode === VIEW_MODE.Month ? 2 : 1;
            setFocus(stringifyAddress([0, GRID_SIZE[viewMode].columns - rightGap]));
          }}
        />
        <Button
          onClick={() => setViewShift(viewShift + 1)}
          data-test-id={getTestId('period-next')}
          focusName={NEXT_PERIOD_BUTTON_FOCUS_NAME}
          tabIndex={focus === NEXT_PERIOD_BUTTON_FOCUS_NAME ? 0 : -1}
          icon={ICONS.DOWN[size]}
          onLeftArrowKeyDown={() => setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME)}
          onDownArrowKeyDown={() => setFocus(stringifyAddress([0, GRID_SIZE[viewMode].columns - 1]))}
        />
      </div>
    </div>
  );
}

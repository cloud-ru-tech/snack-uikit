import { useContext } from 'react';

import { ChevronDownSVG, ChevronUpSVG } from '@snack-ui/icons';

import { GRID_SIZE, Size, ViewLevel } from '../../constants';
import { Button } from '../Button';
import { CalendarContext } from '../CalendarContext';
import { stringifyAddress } from '../Item/utils';
import { LEVEL_BUTTON_FOCUS_NAME, NEXT_PERIOD_BUTTON_FOCUS_NAME, PREV_PERIOD_BUTTON_FOCUS_NAME } from './constants';
import { usePeriodName } from './hooks';
import styles from './styles.module.scss';
import { getShift } from './utils';

const VIEW_LEVEL_MAP = {
  [ViewLevel.Month]: ViewLevel.Year,
  [ViewLevel.Year]: ViewLevel.Decade,
  [ViewLevel.Decade]: ViewLevel.Decade,
};

const ICONS = {
  UP: {
    [Size.S]: <ChevronUpSVG size={16} />,
    [Size.M]: <ChevronUpSVG />,
  },
  DOWN: {
    [Size.S]: <ChevronDownSVG size={16} />,
    [Size.M]: <ChevronDownSVG />,
  },
};

export function CalendarNavigation() {
  const {
    referenceDate,
    viewDate,
    viewShift,
    setViewShift,
    viewLevel,
    setViewLevel,
    focus,
    setFocus,
    getTestId,
    size,
  } = useContext(CalendarContext);
  const periodName = usePeriodName();

  const levelButtonDisabled = viewLevel === ViewLevel.Decade;

  const isArrowButtonFocused = focus && [NEXT_PERIOD_BUTTON_FOCUS_NAME, PREV_PERIOD_BUTTON_FOCUS_NAME].includes(focus);

  return (
    <div className={styles.wrapper}>
      <Button
        disabled={levelButtonDisabled}
        onClick={() => {
          if (viewLevel === ViewLevel.Year) {
            setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME);
          }
          setViewShift(getShift(referenceDate, viewDate, viewLevel));
          setViewLevel(VIEW_LEVEL_MAP[viewLevel]);
        }}
        label={periodName}
        data-test-id={getTestId('period-level')}
        focusName={LEVEL_BUTTON_FOCUS_NAME}
        tabIndex={isArrowButtonFocused ? -1 : 0}
        icon={viewLevel !== ViewLevel.Decade ? ICONS.DOWN[size] : undefined}
        onRightArrowKeyDown={() => setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME)}
        onDownArrowKeyDown={() => setFocus(stringifyAddress([0, 0]))}
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
            const rightGap = viewLevel === ViewLevel.Month ? 2 : 1;
            setFocus(stringifyAddress([0, GRID_SIZE[viewLevel].columns - rightGap]));
          }}
        />
        <Button
          onClick={() => setViewShift(viewShift + 1)}
          data-test-id={getTestId('period-next')}
          focusName={NEXT_PERIOD_BUTTON_FOCUS_NAME}
          tabIndex={focus === NEXT_PERIOD_BUTTON_FOCUS_NAME ? 0 : -1}
          icon={ICONS.DOWN[size]}
          onLeftArrowKeyDown={() => setFocus(PREV_PERIOD_BUTTON_FOCUS_NAME)}
          onDownArrowKeyDown={() => setFocus(stringifyAddress([0, GRID_SIZE[viewLevel].columns - 1]))}
        />
      </div>
    </div>
  );
}

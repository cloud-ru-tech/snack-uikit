import { KeyboardEvent, RefObject, useCallback, useRef } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { MoreSVG } from '@snack-uikit/icons';
import { Droplist } from '@snack-uikit/list';
import { Checkbox } from '@snack-uikit/toggles';
import { Tooltip } from '@snack-uikit/tooltip';
import { useDynamicList } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { SELECTION_MODE } from './constants';
import styles from './styles.module.scss';
import { BulkActionsProps } from './types';

export function BulkActions({
  actions,
  checked,
  onCheck,
  indeterminate,
  selectionMode = SELECTION_MODE.Multiple,
  resizingContainerRef,
}: BulkActionsProps & {
  resizingContainerRef: RefObject<HTMLDivElement>;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        onCheck?.();
      }
    },
    [onCheck],
  );

  const parentContainerRef = useRef<HTMLDivElement>(null);

  const { visibleItems, hiddenItems } = useDynamicList({
    items: actions,
    resizingContainerRef,
    parentContainerRef,
    maxVisibleItems: 3,
  });

  return (
    <>
      {selectionMode === SELECTION_MODE.Multiple && (
        <div
          className={styles.checkboxWrapper}
          onClick={onCheck}
          tabIndex={0}
          role='checkbox'
          aria-checked={checked}
          onKeyDown={handleKeyDown}
          data-test-id={TEST_IDS.checkbox}
        >
          <Checkbox size='s' checked={checked} indeterminate={indeterminate} tabIndex={-1} />
        </div>
      )}

      {(checked || indeterminate) && (
        <div className={styles.bulkActionsWrapper} data-test-id={TEST_IDS.bulkActions} ref={parentContainerRef}>
          <div className={styles.bulkActions}>
            {visibleItems.map(({ label, icon: Icon, onClick, disabled, tooltip, 'data-test-id': testId }) => (
              <Tooltip
                tip={tooltip}
                key={label}
                open={tooltip ? undefined : false}
                placement='top'
                data-test-id={`${testId}-tooltip`}
              >
                <ButtonFunction
                  className={styles.action}
                  fullWidth
                  data-test-id={testId}
                  iconPosition='before'
                  icon={<Icon />}
                  label={label}
                  size='m'
                  onClick={onClick}
                  disabled={disabled}
                />
              </Tooltip>
            ))}
          </div>

          {hiddenItems.length > 0 && (
            <Droplist
              trigger='clickAndFocusVisible'
              closeDroplistOnItemClick
              items={hiddenItems.map(({ label, icon: Icon, onClick, disabled, tooltip, 'data-test-id': testId }) => ({
                id: label,
                content: { option: label },
                beforeContent: <Icon />,
                onClick,
                disabled,
                itemWrapRender: item => (
                  <Tooltip
                    tip={tooltip}
                    open={tooltip ? undefined : false}
                    placement='right'
                    data-test-id={`${testId}-tooltip`}
                  >
                    {item}
                  </Tooltip>
                ),
                'data-test-id': testId,
              }))}
            >
              <ButtonFunction
                className={styles.moreActionButton}
                size='m'
                icon={<MoreSVG />}
                data-test-id={TEST_IDS.moreBulkActionsButton}
              />
            </Droplist>
          )}
        </div>
      )}
    </>
  );
}

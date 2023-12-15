import { MouseEvent, useContext, useState } from 'react';

import { Droplist } from '@snack-uikit/droplist';

import { ELEMENT_TYPE, ITEM_RENDER_MODE } from '../../constants';
import { BreadcrumbsContext } from '../../context';
import { BreadcrumbsConfigChain, InnerItem } from '../../types';
import { getTestId } from '../../utils';
import { CrumbsTypography } from '../CrumbsTypography';
import styles from './styles.module.scss';

export type CollapseProps = {
  className?: string;
  currentConfig: BreadcrumbsConfigChain;
};

export function Collapse({ currentConfig, className }: CollapseProps) {
  const ctx = useContext(BreadcrumbsContext);
  const { hidden, size, testId } = ctx;

  const [open, setDroplistOpen] = useState<boolean>(false);

  const {
    handleTriggerKeyDown,
    handleDroplistItemKeyDown,
    handleDroplistItemClick,
    firstElementRefCallback,
    triggerElementRef,
    handleDroplistFocusLeave,
  } = Droplist.useKeyboardNavigation<HTMLButtonElement>({
    setDroplistOpen,
  });

  const collapsedItems = currentConfig
    .filter(node => node.element === ELEMENT_TYPE.Item && node.item.renderMode === ITEM_RENDER_MODE.Collapsed)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .map((node: { element: typeof ELEMENT_TYPE.Item; width: number; item: InnerItem }) => {
      const { id, label, onClick } = node.item;

      return (
        <Droplist.ItemSingle
          option={label}
          key={id}
          onKeyDown={handleDroplistItemKeyDown}
          onClick={(e: MouseEvent) => {
            handleDroplistItemClick(e, onClick);
          }}
        />
      );
    });

  return (
    <div className={className} data-test-id={getTestId('collapse', testId)} data-element-type={ELEMENT_TYPE.Collapse}>
      <BreadcrumbsContext.Provider value={{ ...ctx, testId: `${testId}-collapsed` }}>
        <Droplist
          trigger='hoverAndFocusVisible'
          size='s'
          open={open}
          onOpenChange={setDroplistOpen}
          firstElementRefCallback={firstElementRefCallback}
          onFocusLeave={handleDroplistFocusLeave}
          useScroll
          triggerRef={triggerElementRef}
          triggerElement={
            <button className={styles.collapse} tabIndex={hidden ? -1 : 0} onKeyDown={handleTriggerKeyDown}>
              <CrumbsTypography size={size}>...</CrumbsTypography>
            </button>
          }
        >
          {collapsedItems}
        </Droplist>
      </BreadcrumbsContext.Provider>
    </div>
  );
}

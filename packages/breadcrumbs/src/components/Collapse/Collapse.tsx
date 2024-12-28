import { useContext, useRef } from 'react';

import { Droplist, DroplistProps } from '@snack-uikit/list';

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
  const buttonRef = useRef(null);

  const collapsedItems: DroplistProps['items'] = currentConfig
    .filter(node => node.element === ELEMENT_TYPE.Item && node.item.renderMode === ITEM_RENDER_MODE.Collapsed)
    .map(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (node: { element: typeof ELEMENT_TYPE.Item; width: number; item: InnerItem }) => ({
        content: { option: node.item.label },
        ...(node.item.href
          ? {
              itemWrapRender: crumb => (
                <a href={node.item.href} onClick={node.item.onClick} className={styles.a}>
                  {crumb}
                </a>
              ),
            }
          : {
              onClick: node.item.onClick,
            }),
      }),
    );

  return (
    <div className={className} data-test-id={getTestId('collapse', testId)} data-element-type={ELEMENT_TYPE.Collapse}>
      <BreadcrumbsContext.Provider value={{ ...ctx, testId: `${testId}-collapsed` }}>
        <Droplist trigger='hoverAndFocusVisible' size='s' scroll triggerElemRef={buttonRef} items={collapsedItems}>
          <button type='button' ref={buttonRef} className={styles.collapse} tabIndex={hidden ? -1 : 0}>
            <CrumbsTypography size={size}>...</CrumbsTypography>
          </button>
        </Droplist>
      </BreadcrumbsContext.Provider>
    </div>
  );
}

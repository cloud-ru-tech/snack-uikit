import { MouseEvent, ReactElement, ReactNode, useCallback, useContext, useLayoutEffect, useRef, useState } from 'react';

import { KebabSVG } from '@snack-uikit/icons';
import { BaseItemProps, Droplist } from '@snack-uikit/list';
import { Tag } from '@snack-uikit/tag';

import { TEST_IDS } from '../../constants';
import { FunctionBadgeContext } from '../../context';
import styles from './styles.module.scss';

type Option = {
  tagLabel?: string;
  icon?: ReactElement;
} & Pick<BaseItemProps, 'onClick' | 'content' | 'disabled'>;

export type FunctionBadgeProps = {
  /** Иконка */
  icon?: ReactNode;
  /** Вложенные опции */
  options: Option[];
};

export function FunctionBadge({ icon, options }: FunctionBadgeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef(null);

  const { setVisible } = useContext(FunctionBadgeContext);

  useLayoutEffect(() => {
    setVisible && setVisible(isOpen);
  }, [isOpen, setVisible]);

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(isOpen => !isOpen);
  }, []);

  return (
    <span className={styles.wrapper}>
      <Droplist
        trigger='clickAndFocusVisible'
        open={isOpen}
        onOpenChange={setIsOpen}
        widthStrategy='gte'
        scroll
        data-test-id={TEST_IDS.droplist}
        placement='bottom-end'
        triggerElemRef={buttonRef}
        items={options.map(({ icon, tagLabel, onClick, ...item }) => ({
          ...item,
          className: styles.item,
          beforeContent: icon,
          afterContent: tagLabel ? <Tag label={tagLabel} /> : undefined,
          onClick: e => {
            e.stopPropagation();
            setIsOpen(false);
            onClick?.(e);
          },
        }))}
      >
        <button
          type='button'
          data-test-id={TEST_IDS.functionBadge}
          className={styles.button}
          onClick={onClick}
          ref={buttonRef}
        >
          {icon || <KebabSVG />}
        </button>
      </Droplist>
    </span>
  );
}

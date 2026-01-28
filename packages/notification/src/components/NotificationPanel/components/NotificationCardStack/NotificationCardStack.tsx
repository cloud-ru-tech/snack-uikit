import { Children, ReactNode, useMemo, useState } from 'react';

import { ButtonFunction } from '@snack-uikit/button';
import { ChevronDownSVG, ChevronUpSVG, KebabSVG } from '@snack-uikit/icons';

import { Action, ActionsButton } from '../../../../helperComponents/ActionsButton';
import { TEST_IDS } from '../../constants';
import { StackTail } from '../../helperComponents/StackTail';
import { useAnimatedOpening } from './hooks';
import styles from './styles.module.scss';
import { cloneCard } from './utils';

export type NotificationCardStackProps = {
  /**
   * Заголовок стопки карточек
   */
  title: string;
  /**
   * Состояние открыт/закрыт по умолчанию
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Колбек смены состояния открыт/закрыт
   * @type (open: boolean) => void
   */
  onOpenChanged?: (open: boolean) => void;
  /**
   * Карточки в стопке, видна первая карточка, остальные схлопываются под нее.
   */
  children: Iterable<ReactNode>;
  /**
   * Список действий в выпадающем меню
   */
  actions?: Action[];
};

const ANIMATION_DURATION = 0.3;

export function NotificationCardStack({
  children,
  defaultOpen,
  onOpenChanged,
  title,
  actions,
}: NotificationCardStackProps) {
  const [actionsOpen, setActionsOpen] = useState(false);
  const { open, toggleOpen, isVisible } = useAnimatedOpening({
    defaultOpen,
    onOpenChanged,
    duration: ANIMATION_DURATION * 1000,
  });

  const [first, ...stack] = useMemo(() => Children.toArray(children), [children]);

  if (!first) {
    return null;
  }

  if (!stack.length) {
    return <>{first}</>;
  }

  const firstCardElement = open ? first : cloneCard(first, { onClick: toggleOpen });

  return (
    <div
      className={styles.container}
      style={{ '--snack-notification-stack-animation-duration': `${ANIMATION_DURATION}s` }}
      data-test-id={TEST_IDS.cardStack.wrapper}
    >
      <div className={styles.header} data-test-id={TEST_IDS.cardStack.headline}>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <label className={styles.title} onClick={toggleOpen} data-test-id={TEST_IDS.cardStack.title}>
          {title}
        </label>
        <div className={styles.right}>
          {actions && actions.length > 0 && (
            <ActionsButton
              actions={actions}
              open={actionsOpen}
              setDroplistOpen={setActionsOpen}
              size='xs'
              icon={<KebabSVG />}
            />
          )}
          <ButtonFunction
            size='xs'
            onClick={toggleOpen}
            data-test-id={TEST_IDS.cardStack.openButton}
            icon={open ? <ChevronUpSVG /> : <ChevronDownSVG />}
          />
        </div>
      </div>
      <div className={styles.cards}>
        <div className={styles.first}>
          {/* there is column-reverse because of card focus outline should be placed over stack tail */}
          <StackTail open={open} count={stack.length} />
          {firstCardElement}
        </div>
        <div className={styles.stack} data-open={open || undefined} data-tail-size={stack.length}>
          <div className={styles.animationContainer}>{isVisible ? stack : []}</div>
        </div>
      </div>
    </div>
  );
}

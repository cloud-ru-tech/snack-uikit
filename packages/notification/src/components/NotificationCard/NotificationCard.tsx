import cn from 'classnames';
import { ElementType, MouseEventHandler, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { ButtonSimple, ButtonSimpleProps, ButtonTonal, ButtonTonalProps } from '@snack-uikit/button';
import { Link, PickLinkProps } from '@snack-uikit/link';
import { BaseItemProps } from '@snack-uikit/list';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { NotificationCardFunction } from './components';
import { APPEARANCE, TEST_IDS } from './constants';
import { getIcon } from './helpers';
import styles from './styles.module.scss';
import { Appearance } from './types';

type Action = {
  icon?: ReactElement;
  tagLabel?: string;
} & Pick<BaseItemProps, 'content' | 'onClick' | 'disabled'>;

export type NotificationCardProps<LinkElement extends ElementType = 'a'> = WithSupportProps<{
  /** Идентификатор уведомления */
  id: string;
  /** Тип уведомления */
  appearance?: Appearance;
  /** Лейбл перед заголовком */
  label?: string;
  /** Управление состоянием прочитано/не прочитано */
  unread?: boolean;
  /** Заголовок уведомления */
  title: string;
  /** Контент уведомления */
  content: ReactNode;
  /** Ссылка */
  link?: PickLinkProps<LinkElement, 'text' | 'insideText' | 'truncateVariant'>;
  /** Дата уведомления */
  date: string;
  /** Колбэк клика по карточке */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Колбэк при попадании карточки в область видимости на 80% */
  onVisible?(cardId: string): void;
  /** Кнопка главного действия у карточки */
  primaryButton?: Omit<ButtonTonalProps, 'size' | 'appearance' | 'data-test-id'>;
  /** Кнопка второстепенного действия у карточки */
  secondaryButton?: Omit<ButtonSimpleProps, 'size' | 'appearance' | 'data-test-id'>;
  /** Дополнительные действия у карточки */
  actions?: Action[];
  /** CSS-класс */
  className?: string;
}>;

/** Компонент карточки уведомления */
export function NotificationCard<LinkElement extends ElementType = 'a'>({
  id,
  appearance = APPEARANCE.Neutral,
  label,
  unread,
  title,
  content,
  link,
  date,
  onClick,
  primaryButton,
  secondaryButton,
  actions,
  onVisible,
  className,
  ...rest
}: NotificationCardProps<LinkElement>) {
  const icon = useMemo(() => getIcon(appearance), [appearance]);

  const [isDroplistOpen, setDroplistOpen] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!unread || !onVisible) {
      return;
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        onVisible(id);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.8,
      rootMargin: '0px',
    });

    observer.observe(cardRef.current as HTMLElement);

    return () => {
      observer.disconnect();
    };
  }, [id, onVisible, unread]);

  const showFooter = Boolean(link || date);

  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = e => {
    e.stopPropagation();

    link?.onClick?.(e);
  };

  return (
    <div
      ref={cardRef}
      role='button'
      onClick={onClick}
      tabIndex={0}
      {...extractSupportProps(rest)}
      data-appearance={appearance}
      data-unread={unread || undefined}
      data-clickable={Boolean(onClick) || undefined}
      data-droplist-open={isDroplistOpen || undefined}
      className={cn(styles.notificationCard, className)}
    >
      {actions?.length && (
        <NotificationCardFunction actions={actions} open={isDroplistOpen} setDroplistOpen={setDroplistOpen} />
      )}

      {label && (
        <Typography.LightLabelS tag='div' className={styles.notificationCardLabel}>
          <TruncateString maxLines={1} text={label} data-test-id={TEST_IDS.label} />
        </Typography.LightLabelS>
      )}

      <div className={styles.notificationCardTitle}>
        <div className={styles.notificationCardTitleIcon}>{icon}</div>

        <Typography.SansTitleS tag='div' className={styles.notificationCardTitleText}>
          <TruncateString maxLines={2} text={title} data-test-id={TEST_IDS.title} />
        </Typography.SansTitleS>
      </div>

      {content && (
        <Typography.SansBodyS tag='div' className={styles.notificationCardContent} data-test-id={TEST_IDS.content}>
          {content}
        </Typography.SansBodyS>
      )}

      {(primaryButton || secondaryButton) && (
        <div className={styles.notificationCardButtons}>
          {secondaryButton && (
            <ButtonSimple {...secondaryButton} appearance='neutral' size='s' data-test-id={TEST_IDS.primaryButton} />
          )}

          {primaryButton && (
            <ButtonTonal {...primaryButton} appearance='neutral' size='s' data-test-id={TEST_IDS.secondaryButton} />
          )}
        </div>
      )}

      {showFooter && (
        <div className={styles.notificationCardFooter}>
          {link && (
            <Link
              {...link}
              onClick={handleLinkClick}
              appearance='primary'
              textMode='accent'
              size='s'
              data-test-id={TEST_IDS.link}
            />
          )}

          {date && (
            <Typography.LightLabelS className={styles.notificationCardDate} data-test-id={TEST_IDS.date}>
              {date}
            </Typography.LightLabelS>
          )}
        </div>
      )}
    </div>
  );
}

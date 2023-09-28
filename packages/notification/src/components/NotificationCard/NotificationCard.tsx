import cn from 'classnames';
import { MouseEventHandler, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { ItemSingleProps } from '@snack-ui/droplist';
import { Link, LinkProps } from '@snack-ui/link';
import { TruncateString } from '@snack-ui/truncate-string';
import { Typography } from '@snack-ui/typography';
import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { NotificationCardFunction } from './components';
import { Appearance, TEST_IDS } from './constants';
import { getIcon } from './helpers';
import styles from './styles.module.scss';

export type NotificationCardProps = WithSupportProps<{
  /** Идентификатор уведомления */
  id: string;
  /** Тип уведомления */
  appearance?: Appearance;
  /** Лейбл перез заголовком */
  label?: string;
  /** Управление состоянием прочитано/не прочитано */
  unread?: boolean;
  /** Заголовок уведомления */
  title: string;
  /** Контент уведомления */
  content: ReactNode;
  /** Ссылка */
  link?: Omit<LinkProps, 'size' | 'onColor' | 'onSurface' | 'data-test-id'>;
  /** Дата уведомления */
  date: string;
  /** Колбэк клика по карточке */
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Колбэк при попадании карточки в область видимости на 80% */
  onVisible?(cardId: string): void;
  /** Дополнительные действия у карточки */
  actions?: Pick<
    ItemSingleProps,
    'option' | 'onClick' | 'disabled' | 'icon' | 'description' | 'caption' | 'tagLabel'
  >[];
  /** CSS-класс */
  className?: string;
}>;

/** Компонент карточки уведомления */
export function NotificationCard({
  id,
  appearance = Appearance.Neutral,
  label,
  unread,
  title,
  content,
  link,
  date,
  onClick,
  actions,
  onVisible,
  className,
  ...rest
}: NotificationCardProps) {
  const { icon, linkOnColor } = useMemo(
    () => ({
      icon: getIcon(appearance),
      linkOnColor: appearance === Appearance.ErrorCritical ? Link.onColors.Red : undefined,
    }),
    [appearance],
  );

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
      data-appearance={appearance}
      data-unread={unread || undefined}
      data-clickable={Boolean(onClick) || undefined}
      data-droplist-open={isDroplistOpen || undefined}
      className={cn(styles.notificationCard, className)}
      {...extractSupportProps(rest)}
    >
      {actions?.length && (
        <NotificationCardFunction actions={actions} open={isDroplistOpen} setDroplistOpen={setDroplistOpen} />
      )}

      {label && (
        <Typography.LightLabelS tag={Typography.tags.div} className={styles.notificationCardLabel}>
          <TruncateString maxLines={1} text={label} data-test-id={TEST_IDS.label} />
        </Typography.LightLabelS>
      )}

      <div className={styles.notificationCardTitle}>
        <div className={styles.notificationCardTitleIcon}>{icon}</div>

        <Typography.SansTitleS tag={Typography.tags.div} className={styles.notificationCardTitleText}>
          <TruncateString maxLines={2} text={title} data-test-id={TEST_IDS.title} />
        </Typography.SansTitleS>
      </div>

      {content && (
        <Typography.SansBodyS
          tag={Typography.tags.div}
          className={styles.notificationCardContent}
          data-test-id={TEST_IDS.content}
        >
          {content}
        </Typography.SansBodyS>
      )}

      {showFooter && (
        <div className={styles.notificationCardFooter}>
          {link && (
            <Link
              {...link}
              onClick={handleLinkClick}
              onColor={linkOnColor}
              onSurface={Link.onSurfaces.Decor}
              size={Link.sizes.S}
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

NotificationCard.appearances = Appearance;

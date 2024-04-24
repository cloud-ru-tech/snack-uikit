import cn from 'classnames';
import { MouseEventHandler, ReactNode, RefObject, useMemo } from 'react';

import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { ChipToggle, ChipToggleProps } from '@snack-uikit/chips';
import { Scroll } from '@snack-uikit/scroll';
import { SkeletonContextProvider, WithSkeleton } from '@snack-uikit/skeleton';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { NotificationCardSkeleton } from '../NotificationCard/components';
import {
  NotificationPanelBlank,
  NotificationPanelBlankProps,
  NotificationPanelSettings,
  NotificationPanelSettingsProps,
} from './components';
import { NotificationPanelDivider, NotificationPanelDividerProps } from './components/NotificationPanelDivider';
import { TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type { NotificationPanelBlankProps };

export type NotificationPanelProps = WithSupportProps<{
  /** Заголовок панели */
  title: string;
  /** Кнопка настроек и выпадающий список */
  settings?: NotificationPanelSettingsProps;
  /** Чипы для фильтрации */
  chips?: Omit<ChipToggleProps, 'size' | 'data-test-id'>[];
  /** Кнопка в "шапке" панели */
  readAllButton?: Omit<ButtonFunctionProps, 'data-test-id'> & {
    onClick: ButtonFunctionProps['onClick'];
  };
  /** Кнопка внизу панели */
  footerButton?: {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
  className?: string;
  /** Состояние загрузки */
  loading?: boolean;
  /** Контент для отрисовки (e.g NotificationCard | NotificationPanel.Blank) */
  content?: ReactNode;
  /** Количество скелетонов карточек для отображения при загрузке */
  skeletonsAmount?: number;
  /** Ссылка на элемент, обозначающий самый конец прокручиваемого списка */
  scrollEndRef?: RefObject<HTMLDivElement>;
  /** Ссылка на контейнер, который скроллится */
  scrollContainerRef?: RefObject<HTMLElement>;
}>;

/** Компонент панели для уведомлений */
export function NotificationPanel({
  title,
  settings,
  chips,
  readAllButton,
  footerButton,
  content,
  loading,
  skeletonsAmount = 2,
  scrollEndRef,
  scrollContainerRef,
  className,
  ...rest
}: NotificationPanelProps) {
  const skeletons = useMemo(() => Array.from({ length: skeletonsAmount }, (_, i) => i), [skeletonsAmount]);

  return (
    <div className={cn(styles.wrapper, className)} {...extractSupportProps(rest)}>
      <div className={styles.notificationPanelHeader}>
        <div className={styles.notificationPanelHeadline}>
          <Typography.SansHeadlineS className={styles.notificationPanelTitle}>
            <TruncateString text={title} data-test-id={TEST_IDS.title} />
          </Typography.SansHeadlineS>

          {settings && <NotificationPanelSettings {...settings} />}
        </div>

        <div className={styles.notificationPanelHeaderFunctions}>
          <div className={styles.notificationPanelChips}>
            {chips?.map(chip => (
              <ChipToggle
                {...chip}
                key={chip.label}
                data-test-id={`${TEST_IDS.chip}-${chip.label}`}
                size='xs'
                disabled={chip.disabled || loading}
              />
            ))}
          </div>

          {readAllButton && (
            <ButtonFunction
              {...readAllButton}
              disabled={readAllButton.disabled || loading}
              data-test-id={TEST_IDS.readAll}
            />
          )}
        </div>
      </div>

      <Scroll size='m' className={styles.notificationPanelBody} ref={scrollContainerRef}>
        {content}
        {loading && (
          <SkeletonContextProvider loading={loading || false}>
            {skeletons.map(skeleton => (
              <WithSkeleton key={skeleton} skeleton={<NotificationCardSkeleton />} />
            ))}
          </SkeletonContextProvider>
        )}

        <div className={styles.scrollStub} ref={scrollEndRef} />
      </Scroll>

      {footerButton && (
        <button
          type='button'
          onClick={footerButton.onClick}
          className={styles.notificationPanelFooterButton}
          data-test-id={TEST_IDS.footerButton}
        >
          <Typography.SansLabelS>{footerButton.label}</Typography.SansLabelS>
        </button>
      )}
    </div>
  );
}

export namespace NotificationPanel {
  export const Blank: typeof NotificationPanelBlank = NotificationPanelBlank;
  export type BlankProps = NotificationPanelBlankProps;
  export const Divider: typeof NotificationPanelDivider = NotificationPanelDivider;
  export type DividerProps = NotificationPanelDividerProps;
}

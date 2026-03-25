import cn from 'classnames';
import { MouseEventHandler, ReactNode, RefObject, useMemo } from 'react';

import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { ChipToggle } from '@snack-uikit/chips';
import { Scroll } from '@snack-uikit/scroll';
import { SegmentedControl, SegmentedControlProps } from '@snack-uikit/segmented-control';
import { SkeletonContextProvider, WithSkeleton } from '@snack-uikit/skeleton';
import { TooltipProps } from '@snack-uikit/tooltip';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { NotificationCardSkeleton } from '../NotificationCard/components';
import {
  NotificationCardStack,
  NotificationCardStackProps,
  NotificationPanelBlank,
  NotificationPanelBlankProps,
  NotificationPanelGroup,
  NotificationPanelGroupProps,
  NotificationPanelSettings,
  NotificationPanelSettingsProps,
} from './components';
import { NotificationPanelDivider, NotificationPanelDividerProps } from './components/NotificationPanelDivider';
import { TEST_IDS } from './constants';
import { WithTooltip } from './helperComponents';
import styles from './styles.module.scss';

export type { NotificationPanelBlankProps };

export type NotificationPanelProps = WithSupportProps<{
  /** Заголовок панели */
  title: string;
  /** Кнопка настроек и выпадающий список */
  settings?: NotificationPanelSettingsProps;
  /** Сегменты для фильтрации */
  segments?: Omit<SegmentedControlProps, 'size' | 'data-test-id'>;
  /** Переключатель для фильтрации */
  chipToggle?: {
    label: string;
    checked: boolean;
    defaultChecked?: boolean;
    onChange(checked: boolean): void;
  };
  /** Кнопка в "шапке" панели */
  readAllButton?: Omit<ButtonFunctionProps, 'data-test-id'> & {
    tooltip?: TooltipProps;
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
  segments,
  readAllButton,
  footerButton,
  content,
  loading,
  skeletonsAmount = 2,
  scrollEndRef,
  scrollContainerRef,
  className,
  chipToggle,
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

          <div className={styles.notificationPanelHeaderActions}>
            {readAllButton && (
              <WithTooltip tooltip={readAllButton.tooltip}>
                <ButtonFunction
                  {...readAllButton}
                  onClick={readAllButton.onClick}
                  size='xs'
                  disabled={readAllButton.disabled || loading}
                  data-test-id={TEST_IDS.readAll}
                />
              </WithTooltip>
            )}

            {settings && <NotificationPanelSettings {...settings} />}
          </div>
        </div>

        <div className={styles.actionsRow}>
          {segments && (
            <SegmentedControl
              {...segments}
              size='xs'
              items={segments.items.map(item => ({
                ...item,
                disabled: item.disabled || loading,
              }))}
              data-test-id={TEST_IDS.segments}
            />
          )}
          {chipToggle && (
            <ChipToggle
              size='xs'
              disabled={loading}
              label={chipToggle.label}
              onChange={chipToggle.onChange}
              checked={chipToggle.checked}
            />
          )}
        </div>
      </div>

      <Scroll size='m' ref={scrollContainerRef}>
        <div className={styles.notificationPanelBody}>
          {content}
          {loading && (
            <SkeletonContextProvider loading={loading || false}>
              {skeletons.map(skeleton => (
                <WithSkeleton key={skeleton} skeleton={<NotificationCardSkeleton />} />
              ))}
            </SkeletonContextProvider>
          )}

          <div className={styles.scrollStub} ref={scrollEndRef} />
        </div>
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
  export const Stack: typeof NotificationCardStack = NotificationCardStack;
  export type StackProps = NotificationCardStackProps;
  export const Group: typeof NotificationPanelGroup = NotificationPanelGroup;
  export type GroupProps = NotificationPanelGroupProps;
}

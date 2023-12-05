import { MouseEventHandler, ReactNode, useMemo } from 'react';

import { ButtonFunction, ButtonFunctionProps } from '@snack-uikit/button';
import { ChipToggle, ChipToggleProps } from '@snack-uikit/chips';
import { PopoverPrivate } from '@snack-uikit/popover-private';
import { Scroll } from '@snack-uikit/scroll';
import { SkeletonContextProvider, WithSkeleton } from '@snack-uikit/skeleton';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { NotificationPanelPopover, NotificationPanelPopoverProps } from '../../helperComponents';
import { NotificationCardSkeleton } from '../NotificationCard/components';
import {
  NotificationPanelBlank,
  NotificationPanelBlankProps,
  NotificationPanelSettings,
  NotificationPanelSettingsProps,
} from './components';
import { TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type { NotificationPanelBlankProps };

export type NotificationPanelProps = {
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
  /** Элемент для открытия панели */
  triggerElement: NotificationPanelPopoverProps['children'];
  /** Кнопка внизу панели */
  footerButton?: {
    label: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  };
  /** Состояние загрузки */
  loading?: boolean;
  /** Контент для отрисовки (e.g NotificationCard | NotificationPanel.Blank) */
  content?: ReactNode;
  /** Количество скелетонов карточек для отображения при загрузке */
  skeletonsAmount?: number;
} & Omit<NotificationPanelPopoverProps, 'children' | 'content'>;

/** Компонент панели для уведомлений */
export function NotificationPanel({
  title,
  triggerElement,
  settings,
  chips,
  readAllButton,
  footerButton,
  content,
  loading,
  skeletonsAmount = 2,
  ...rest
}: NotificationPanelProps) {
  const skeletons = useMemo(() => Array.from({ length: skeletonsAmount }, (_, i) => i), [skeletonsAmount]);

  return (
    <NotificationPanelPopover
      {...rest}
      content={
        <>
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
                    size={ChipToggle.sizes.Xs}
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

          <Scroll size={Scroll.sizes.M} className={styles.notificationPanelBody}>
            {loading ? (
              <SkeletonContextProvider loading={loading || false}>
                {skeletons.map(skeleton => (
                  <WithSkeleton key={skeleton} skeleton={<NotificationCardSkeleton />} />
                ))}
              </SkeletonContextProvider>
            ) : (
              content
            )}
          </Scroll>

          {!loading && footerButton && (
            <button className={styles.notificationPanelFooterButton} data-test-id={TEST_IDS.footerButton}>
              <Typography.SansLabelS>{footerButton.label}</Typography.SansLabelS>
            </button>
          )}
        </>
      }
    >
      {triggerElement}
    </NotificationPanelPopover>
  );
}

NotificationPanel.placements = PopoverPrivate.placements;
NotificationPanel.triggers = PopoverPrivate.triggers;
NotificationPanel.widthStrategies = PopoverPrivate.widthStrategies;

export namespace NotificationPanel {
  export const Blank: typeof NotificationPanelBlank = NotificationPanelBlank;
  export type BlankProps = NotificationPanelBlankProps;
}

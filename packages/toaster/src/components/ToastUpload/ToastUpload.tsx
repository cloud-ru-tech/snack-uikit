import cn from 'classnames';
import { MouseEvent } from 'react';
import { ToastContentProps as RtToastContentProps } from 'react-toastify';
import { useUncontrolledProp } from 'uncontrollable';

import { ChevronDownSVG, ChevronUpSVG, CrossSVG } from '@snack-uikit/icons';
import { useLocale } from '@snack-uikit/locale';
import { ProgressBar } from '@snack-uikit/progress-bar';
import { Scroll } from '@snack-uikit/scroll';
import { TruncateString } from '@snack-uikit/truncate-string';
import { extractSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TOAST_UPLOAD_TEST_IDS } from '../../testIds';
import { progressBarAppearanceByStatus } from './constants';
import { ButtonIcon } from './helperComponents/ButtonIcon';
import { ButtonTextNeutral, ButtonTextNeutralProps } from './helperComponents/ButtonTextNeutral';
import { FileItem } from './helperComponents/FileItem';
import { LoadingStatus } from './helperComponents/LoadingStatus';
import styles from './styles.module.scss';
import { ToastUploadStatus, UploadActions, UploadItem } from './types';
import { formatPercent } from './utils';

export type ToastUploadProps = Partial<RtToastContentProps> &
  WithSupportProps<{
    /**
     * Общий статус загрузки
     */
    status: ToastUploadStatus;
    /**
     * Заголовок тостера
     */
    title?: string;
    /**
     * Описание статуса загрузки
     */
    description: string;
    /**
     * Общий прогресс загрузки
     */
    progress: {
      current: number;
      total: number;
    };
    /**
     * Закрыть тостер
     */
    onCloseClick?(e: MouseEvent<HTMLButtonElement>, close?: () => void): void;
    /**
     * Показывать кнопку закрытия тостера
     */
    closable?: boolean;
    /**
     * CSS-класс контейнера
     */
    className?: string;
    /**
     * Загружаемые элементы
     */
    files: UploadItem[];
    /**
     * Тостер свернут/развернут
     */
    collapsed?: boolean;
    /**
     * Развернуть/свернуть тостер
     */
    onCollapsed?: (collapsed: boolean) => void;
    /**
     * Экшены для управления загрузкой
     */
    generalActions: Omit<UploadActions, 'onCancel'>;
    /**
     *  Отмена всей загрузки
     */
    cancelButton?: ButtonTextNeutralProps;
  }>;

export function ToastUpload({
  status,
  title,
  description,
  closeToast,
  onCloseClick,
  closable,
  className,
  files,
  collapsed,
  onCollapsed,
  generalActions,
  cancelButton,
  progress,
  ...rest
}: ToastUploadProps) {
  const [isCollapsed, setIsCollapsed] = useUncontrolledProp(collapsed, false, onCollapsed);

  const { t } = useLocale('ToastUpload');

  const showingTitle = title || t(`title.${status}`);

  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCloseClick ? onCloseClick(e, closeToast) : closeToast?.();
  };

  const handleCollapseClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  const progressPercent = Math.round((progress.current / progress.total) * 100);
  const isErrorUploaded = status === 'errorUploaded';

  return (
    <div
      className={cn(styles.container, className)}
      {...extractSupportProps(rest)}
      data-collapsed={isCollapsed || undefined}
    >
      <div className={styles.titleLine}>
        <div className={styles.titleLineBody}>
          <div className={styles.title} data-test-id={TOAST_UPLOAD_TEST_IDS.title}>
            {showingTitle}
          </div>

          {cancelButton && <ButtonTextNeutral {...cancelButton} />}

          <ButtonIcon onClick={handleCollapseClick} data-test-id={TOAST_UPLOAD_TEST_IDS.collapseButton}>
            {!isCollapsed ? <ChevronUpSVG /> : <ChevronDownSVG />}
          </ButtonIcon>

          {closable && (
            <ButtonIcon
              className={styles.buttonAction}
              onClick={handleCloseClick}
              data-test-id={TOAST_UPLOAD_TEST_IDS.close}
            >
              <CrossSVG />
            </ButtonIcon>
          )}
        </div>

        <div className={styles.generalProgress}>
          <div className={styles.statusLine}>
            <div className={styles.statusWrap}>
              <LoadingStatus status={status} actions={generalActions} />

              <TruncateString
                className={styles.description}
                data-status={status}
                text={description}
                data-test-id={TOAST_UPLOAD_TEST_IDS.description}
              />
            </div>

            <span className={styles.totalCounter} data-test-id={TOAST_UPLOAD_TEST_IDS.counter}>
              {`${progress.current}/${progress.total}`}
            </span>

            <span className={styles.totalPercentage} data-test-id={TOAST_UPLOAD_TEST_IDS.progress}>
              {formatPercent(isErrorUploaded ? 0 : progressPercent)}
            </span>
          </div>

          {isCollapsed && (
            <ProgressBar
              progress={isErrorUploaded ? 100 : progressPercent}
              size='xs'
              appearance={progressBarAppearanceByStatus[status]}
              data-test-id={TOAST_UPLOAD_TEST_IDS.progressBar}
            />
          )}
        </div>
      </div>

      <Scroll className={styles.list} size='s' data-test-id={TOAST_UPLOAD_TEST_IDS.list} barHideStrategy='never'>
        {files.map(item => (
          <FileItem key={item.id || item.title} item={item} />
        ))}
      </Scroll>
    </div>
  );
}

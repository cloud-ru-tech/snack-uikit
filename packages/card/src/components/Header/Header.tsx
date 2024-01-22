import cn from 'classnames';

import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';
import { excludeSupportProps, WithSupportProps } from '@snack-uikit/utils';

import { TEST_IDS } from '../../constants';
import { useCardContext } from '../../context';
import { Emblem, EmblemProps } from '../../helperComponents';
import { Size } from '../../types';
import { DESCRIPTION_SIZE_MAP, TITLE_SIZE_MAP, TRUNCATE_DEFAULTS } from './constants';
import styles from './styles.module.scss';

export type HeaderProps = WithSupportProps<{
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  description?: string;
  /** Метаинформация */
  metadata?: string;
  /**
   *  Максимальное кол-во строк
   * <br> - `title` - в заголовке
   * <br> - `description` - в описании
   * <br> - `metadata` - в подзаголовке
   * @default '{ <br>title: 1; <br>description: 2; <br>metadata: 1; }'
   */
  truncate?: {
    title?: number;
    description?: number;
    metadata?: number;
  };
  /** Эмблема иконка/картинка */
  emblem?: EmblemProps;
  /** CSS-класс для элемента с контентом */
  className?: string;
  /** Размер */
  size?: Size;
}>;

export function Header({
  title,
  description,
  metadata,
  truncate,
  emblem,
  className,
  size: sizeProp,
  ...rest
}: HeaderProps) {
  const { size: sizeContext } = useCardContext();

  const size = sizeProp || sizeContext;

  const truncateStrings = { ...TRUNCATE_DEFAULTS, ...truncate };

  return (
    <div className={cn(styles.titleLayout, className)} {...excludeSupportProps(rest)} data-size={size}>
      {emblem && <Emblem {...emblem} />}

      <div className={styles.contentLayout}>
        <Typography
          family='sans'
          size={TITLE_SIZE_MAP[size]}
          purpose='title'
          className={styles.title}
          data-test-id={TEST_IDS.title}
        >
          <TruncateString variant='end' maxLines={truncateStrings.title} text={title} />
        </Typography>

        {metadata && (
          <Typography.SansBodyS className={styles.metadata}>
            <TruncateString
              variant='end'
              maxLines={truncateStrings.metadata}
              text={metadata}
              data-test-id={TEST_IDS.metadata}
            />
          </Typography.SansBodyS>
        )}

        {description && (
          <Typography family='sans' size={DESCRIPTION_SIZE_MAP[size]} purpose='body' className={styles.description}>
            <TruncateString
              variant='end'
              maxLines={truncateStrings.description}
              text={description}
              data-test-id={TEST_IDS.description}
            />
          </Typography>
        )}
      </div>
    </div>
  );
}

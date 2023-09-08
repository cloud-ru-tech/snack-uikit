import cn from 'classnames';

import { TruncateString } from '@snack-ui/truncate-string';
import { Typography } from '@snack-ui/typography';
import { excludeSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Size, TEST_IDS } from '../../constants';
import { useCardContext } from '../../context';
import { Emblem, EmblemProps } from '../../helperComponents';
import { DESCRIPTION_SIZE_MAP, TITLE_SIZE_MAP } from './constants';
import styles from './styles.module.scss';

export type HeaderProps = WithSupportProps<{
  /** Заголовок */
  title: string;
  /** Подзаголовок */
  description?: string;
  /** Метаинформация */
  metadata?: string;
  /** Эмблема иконка/картинка */
  emblem?: EmblemProps;
  /** CSS-класс для элемента с контентом */
  className?: string;
  /** Размер */
  size?: Size;
}>;

export function Header({ title, description, metadata, emblem, className, size: sizeProp, ...rest }: HeaderProps) {
  const { size: sizeContext } = useCardContext();

  const size = sizeProp || sizeContext;

  return (
    <div className={cn(styles.titleLayout, className)} data-size={size} {...excludeSupportProps(rest)}>
      {emblem && <Emblem {...emblem} />}

      <div className={styles.contentLayout}>
        <Typography
          family={Typography.families.Sans}
          size={TITLE_SIZE_MAP[size]}
          role={Typography.roles.Title}
          className={styles.title}
          data-test-id={TEST_IDS.title}
        >
          <TruncateString variant={TruncateString.variants.End} maxLines={1} text={title} />
        </Typography>

        {metadata && (
          <Typography.SansBodyS className={styles.metadata}>
            <TruncateString
              variant={TruncateString.variants.End}
              maxLines={1}
              text={metadata}
              data-test-id={TEST_IDS.metadata}
            />
          </Typography.SansBodyS>
        )}

        {description && (
          <Typography
            family={Typography.families.Sans}
            size={DESCRIPTION_SIZE_MAP[size]}
            role={Typography.roles.Body}
            className={styles.description}
          >
            <TruncateString
              variant={TruncateString.variants.End}
              maxLines={2}
              text={description}
              data-test-id={TEST_IDS.description}
            />
          </Typography>
        )}
      </div>
    </div>
  );
}

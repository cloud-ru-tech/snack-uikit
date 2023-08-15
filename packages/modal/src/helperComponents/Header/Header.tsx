import cn from 'classnames';
import { ReactNode } from 'react';

import { IconPredefined, IconPredefinedProps } from '@snack-ui/icon-predefined';
import { QuestionSVG } from '@snack-ui/icons';
import { Tooltip, TooltipProps } from '@snack-ui/tooltip';
import { Typography } from '@snack-ui/typography';

import { ContentAlign, TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ModalHeaderProps = {
  title: ReactNode;
  titleTooltip?: TooltipProps['tip'];
  subtitle?: ReactNode;
  picture?:
    | IconPredefinedProps['icon']
    | {
        src: string;
        alt: string;
      };
  align?: ContentAlign;
  className?: string;
};

export function ModalHeader({
  title,
  titleTooltip,
  subtitle,
  align = ContentAlign.Default,
  picture,
  className,
}: ModalHeaderProps) {
  return (
    <div className={cn(styles.header, className)} data-test-id={TEST_IDS.header}>
      {picture &&
        (typeof picture === 'function' ? (
          <div className={styles.icon} data-test-id={TEST_IDS.icon}>
            <IconPredefined icon={picture} size={IconPredefined.sizes.L} />
          </div>
        ) : (
          <img src={picture.src} alt={picture.alt} className={styles.image} data-test-id={TEST_IDS.image} />
        ))}

      <div className={styles.headline} data-align={align}>
        <div className={styles.titleWrap}>
          <Typography
            family={Typography.families.Sans}
            role={Typography.roles.Headline}
            size={Typography.sizes.S}
            className={styles.title}
            data-test-id={TEST_IDS.title}
          >
            {title}
          </Typography>

          {titleTooltip && (
            <Tooltip tip={titleTooltip} data-test-id={TEST_IDS.tooltip} triggerClassName={styles.tooltipTrigger}>
              <QuestionSVG />
            </Tooltip>
          )}
        </div>

        {subtitle && (
          <Typography
            family={Typography.families.Sans}
            role={Typography.roles.Body}
            size={Typography.sizes.M}
            className={styles.subtitle}
            data-test-id={TEST_IDS.subtitle}
          >
            {subtitle}
          </Typography>
        )}
      </div>
    </div>
  );
}

ModalHeader.aligns = ContentAlign;

import React, { ReactNode } from 'react';

import { Typography } from '@snack-ui/typography';

import styles from './styles.module.scss';

type CardProps = {
  href?: string;
  onClick?(): void;
  children?: ReactNode;
  header: ReactNode;
  image?: string | ReactNode;
  small?: boolean;
};

export function Card({ href, image, onClick, children, header, small }: CardProps) {
  const img = typeof image === 'string' ? <img alt={String(header)} src={image} height={40} /> : image;

  const content = (
    <>
      <div className={styles.row}>
        {img}

        <Typography
          family={Typography.families.Sans}
          role={small ? Typography.roles.Headline : Typography.roles.Display}
          size={Typography.sizes.S}
        >
          {header}
        </Typography>
      </div>
      {children}
    </>
  );

  if (href) {
    return (
      <a className={styles.card} data-small={small || undefined} href={href} target='_blank' rel='noreferrer'>
        {content}
      </a>
    );
  }

  return (
    <button className={styles.card} data-small={small || undefined} onClick={onClick}>
      {content}
    </button>
  );
}

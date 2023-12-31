import { ReactNode } from 'react';

import { Typography } from '@snack-uikit/typography';

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

        <Typography family='sans' purpose={small ? 'headline' : 'display'} size='s'>
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

import { useState } from 'react';

import { Divider } from '@snack-uikit/divider';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import styles from './styles.module.scss';

const RGBA_REGEX = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/;

const rgba2hex = (rgba: string) =>
  `#${rgba
    .match(RGBA_REGEX)
    ?.slice(1)
    .map((n: string, i: number) =>
      (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n)).toString(16).padStart(2, '0').replace('NaN', ''),
    )
    .join('')}`;

function splitAndJoin(str: string): string {
  const arr = str.split(/(?=[A-Z])/);
  return arr.join('-');
}

type CardProps = {
  color: {
    description?: string;
  };
  tone?: string;
  palette: string;
};

export function Card({ color, tone = '', palette }: CardProps) {
  const [ref, setElementRef] = useState<HTMLDivElement>();
  const computedColor = ref ? getComputedStyle(ref, null).getPropertyValue('background-color') : null;
  const hex = computedColor && rgba2hex(computedColor);
  const cssVar = `var(--${['Sys', splitAndJoin(palette), splitAndJoin(tone)].filter(Boolean).join('-').toLowerCase()})`;
  const toneName = ['Sys', palette, tone].filter(Boolean).join('.');

  return (
    <div
      className={styles.card}
      ref={node => setElementRef(node as HTMLDivElement)}
      style={{
        backgroundColor: cssVar,
      }}
    >
      <div className={styles.content}>
        <Typography
          family={Typography.families.Sans}
          role={Typography.roles.Label}
          size={Typography.sizes.S}
          className={styles.title}
        >
          {toneName}
        </Typography>
        <Typography
          family={Typography.families.Light}
          role={Typography.roles.Label}
          size={Typography.sizes.S}
          className={styles.valueLabel}
        >
          <span>CSS:</span>
          <span className={styles.value}>
            <TruncateString text={cssVar} />
          </span>
        </Typography>
        <Typography
          family={Typography.families.Light}
          role={Typography.roles.Label}
          size={Typography.sizes.S}
          className={styles.valueLabel}
        >
          <span> HEX: </span>
          <span className={styles.value}>{hex}</span>
        </Typography>

        <Divider className={styles.divider} />

        <Typography
          family={Typography.families.Light}
          role={Typography.roles.Label}
          size={Typography.sizes.S}
          className={styles.description}
        >
          <TruncateString text={color?.description ?? (hex || '')} />
        </Typography>
      </div>
    </div>
  );
}

import { IconPredefined, IconPredefinedProps } from '@snack-uikit/icon-predefined';

import { TEST_IDS } from '../../constants';
import { useCardContext } from '../../context';
import styles from './styled.module.scss';

type PictureProps = {
  src: string;
  alt: string;
};

export type EmblemProps = PictureProps | Pick<IconPredefinedProps, 'icon' | 'decor' | 'appearance'>;

function isPictureProps(props: EmblemProps): props is PictureProps {
  return 'src' in props && 'alt' in props;
}

export function Emblem(props: EmblemProps) {
  const { size } = useCardContext();

  if (isPictureProps(props)) {
    return (
      <img
        src={props.src}
        alt={props.alt}
        data-size={size || undefined}
        className={styles.img}
        data-test-id={TEST_IDS.emblemPicture}
      />
    );
  }

  return (
    <IconPredefined
      icon={props.icon}
      appearance={props.appearance ?? 'primary'}
      decor={props.decor ?? true}
      size={size}
      data-test-id={TEST_IDS.emblemIcon}
    />
  );
}

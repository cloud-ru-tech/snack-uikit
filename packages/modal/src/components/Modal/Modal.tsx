import { ElementType } from 'react';

import { ButtonFilled, ButtonOutline, ButtonSimple } from '@snack-uikit/button';
import { Link } from '@snack-uikit/link';
import { TruncateString } from '@snack-uikit/truncate-string';
import { Typography } from '@snack-uikit/typography';

import { ALIGN, MODE, SIZE, TEST_IDS } from '../../constants';
import { getAlignProps, getButtonsSize, getPicture } from '../../utils';
import { ModalCustom } from '../ModalCustom';
import styles from './styles.module.scss';
import { ModalLProps, ModalMProps, ModalSProps } from './types';

export type ModalProps<LinkElement extends ElementType = 'a'> =
  | ModalSProps<LinkElement>
  | ModalMProps<LinkElement>
  | ModalLProps<LinkElement>;

export function Modal<LinkElement extends ElementType = 'a'>({
  open,
  onClose,
  size = SIZE.S,
  mode = MODE.Regular,
  align = ALIGN.Default,
  title,
  titleTooltip,
  subtitle,
  picture: pictureProp,
  content,
  approveButton,
  cancelButton,
  additionalButton,
  disclaimer,
  truncate,
  className,
  ...rest
}: ModalProps<LinkElement>) {
  const aligns = getAlignProps({ align, size });
  const buttonsSize = getButtonsSize({ align, size });
  const picture = getPicture({ size, picture: pictureProp });

  return (
    <ModalCustom open={open} onClose={onClose} size={size} mode={mode} className={className} {...rest}>
      <ModalCustom.Header
        title={<TruncateString text={title} maxLines={truncate?.title || 1} />}
        titleTooltip={titleTooltip}
        subtitle={subtitle ? <TruncateString text={subtitle} maxLines={truncate?.subtitle || 2} /> : undefined}
        picture={picture}
        align={aligns.header}
      />

      {Boolean(content) && <ModalCustom.Body content={content} align={aligns.body} />}

      <ModalCustom.Footer
        actions={
          <>
            <ButtonFilled
              appearance='primary'
              {...approveButton}
              size={buttonsSize}
              className={styles.footerButton}
              data-test-id={TEST_IDS.approveButton}
            />

            {cancelButton && (
              <ButtonOutline
                appearance='neutral'
                {...cancelButton}
                size={buttonsSize}
                className={styles.footerButton}
                data-test-id={TEST_IDS.cancelButton}
              />
            )}

            {additionalButton && (
              <ButtonSimple
                appearance='neutral'
                {...additionalButton}
                size={buttonsSize}
                className={styles.footerButton}
                data-test-id={TEST_IDS.additionalButton}
              />
            )}
          </>
        }
        disclaimer={
          disclaimer && (
            <>
              <Typography.SansBodyS data-test-id={TEST_IDS.disclaimerText}>{disclaimer.text}</Typography.SansBodyS>

              {disclaimer.link && <Link {...disclaimer.link} size='s' data-test-id={TEST_IDS.disclaimerLink} />}
            </>
          )
        }
        align={aligns.footer}
        className={styles.modalFooter}
      />
    </ModalCustom>
  );
}

import { ButtonFilled, ButtonLight, ButtonTonal } from '@snack-ui/button';
import { Link } from '@snack-ui/link';
import { TruncateString } from '@snack-ui/truncate-string';
import { Typography } from '@snack-ui/typography';

import { Align, Appearance, Size, TEST_IDS } from '../../constants';
import { getAlignProps, getButtonsSizes } from '../../utils';
import { ModalCustom } from '../ModalCustom';
import styles from './styles.module.scss';
import { ModalLProps, ModalMProps, ModalSProps } from './types';

export type ModalProps = ModalSProps | ModalMProps | ModalLProps;

export function Modal({
  open,
  onClose,
  size = Size.S,
  appearance = Appearance.Regular,
  align = Align.Default,
  title,
  titleTooltip,
  subtitle,
  picture,
  content,
  approveButton,
  cancelButton,
  additionalButton,
  disclaimer,
  className,
  ...rest
}: ModalProps) {
  const aligns = getAlignProps({ align, size });
  const buttonsSizes = getButtonsSizes(align);

  return (
    <ModalCustom open={open} onClose={onClose} size={size} appearance={appearance} className={className} {...rest}>
      <ModalCustom.Header
        title={<TruncateString text={title} />}
        titleTooltip={titleTooltip}
        subtitle={subtitle}
        picture={picture}
        align={aligns.header}
      />

      {Boolean(content) && <ModalCustom.Body content={content} align={aligns.body} />}

      <ModalCustom.Footer
        actions={
          <>
            {additionalButton && (
              <ButtonLight
                {...additionalButton}
                size={buttonsSizes.light}
                className={styles.footerButton}
                data-test-id={TEST_IDS.additionalButton}
              />
            )}

            {cancelButton && (
              <ButtonTonal
                {...cancelButton}
                size={buttonsSizes.tonal}
                className={styles.footerButton}
                data-test-id={TEST_IDS.cancelButton}
              />
            )}

            <ButtonFilled
              {...approveButton}
              size={buttonsSizes.filled}
              className={styles.footerButton}
              data-test-id={TEST_IDS.approveButton}
            />
          </>
        }
        disclaimer={
          disclaimer && (
            <>
              <Typography
                family={Typography.families.Sans}
                role={Typography.roles.Body}
                size={Typography.sizes.S}
                data-test-id={TEST_IDS.disclaimerText}
              >
                {disclaimer.text}
              </Typography>

              {disclaimer.link && (
                <Link {...disclaimer.link} size={Link.sizes.S} external data-test-id={TEST_IDS.disclaimerLink} />
              )}
            </>
          )
        }
        align={aligns.footer}
        className={styles.modalFooter}
      />
    </ModalCustom>
  );
}

Modal.aligns = Align;
Modal.appearances = Appearance;
Modal.sizes = Size;

import { ButtonFilled, ButtonSimple, ButtonTonal } from '@snack-ui/button';
import { Link } from '@snack-ui/link';
import { TruncateString } from '@snack-ui/truncate-string';
import { Typography } from '@snack-ui/typography';

import { Align, Mode, Size, TEST_IDS } from '../../constants';
import { getAlignProps, getButtonsSizes, getPicture } from '../../utils';
import { ModalCustom } from '../ModalCustom';
import styles from './styles.module.scss';
import { ModalLProps, ModalMProps, ModalSProps } from './types';

export type ModalProps = ModalSProps | ModalMProps | ModalLProps;

export function Modal({
  open,
  onClose,
  size = Size.S,
  mode = Mode.Regular,
  align = Align.Default,
  title,
  titleTooltip,
  subtitle,
  picture: pictureProp,
  content,
  approveButton,
  cancelButton,
  additionalButton,
  disclaimer,
  className,
  ...rest
}: ModalProps) {
  const aligns = getAlignProps({ align, size });
  const buttonsSizes = getButtonsSizes({ align, size });
  const picture = getPicture({ size, picture: pictureProp });

  return (
    <ModalCustom open={open} onClose={onClose} size={size} mode={mode} className={className} {...rest}>
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
            <ButtonFilled
              {...approveButton}
              size={buttonsSizes.filled}
              className={styles.footerButton}
              data-test-id={TEST_IDS.approveButton}
            />

            {cancelButton && (
              <ButtonTonal
                {...cancelButton}
                size={buttonsSizes.tonal}
                className={styles.footerButton}
                data-test-id={TEST_IDS.cancelButton}
              />
            )}

            {additionalButton && (
              <ButtonSimple
                {...additionalButton}
                size={buttonsSizes.light}
                className={styles.footerButton}
                data-test-id={TEST_IDS.additionalButton}
              />
            )}
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
Modal.modes = Mode;
Modal.sizes = Size;

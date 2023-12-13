import { ReactElement } from 'react';

import {
  ButtonFilled,
  ButtonFilledProps,
  ButtonOutline,
  ButtonOutlineProps,
  ButtonSimple,
  ButtonSimpleProps,
} from '@snack-uikit/button';
import { TruncateString } from '@snack-uikit/truncate-string';

import { NESTED_DRAWER_PUSH_DISTANCE, TEST_IDS } from '../../constants';
import { DrawerBodyProps, DrawerHeaderProps } from '../../helperComponents';
import { Size } from '../../types';
import { DrawerCustom, DrawerCustomProps } from '../DrawerCustom';

export type DrawerProps = Omit<DrawerCustomProps, 'size' | 'children' | 'nestedDrawer' | 'push'> &
  Pick<DrawerHeaderProps, 'titleTooltip' | 'image'> &
  Pick<DrawerBodyProps, 'content'> & {
    /** Заголовок */
    title: string;
    /** Подзаголовок */
    subtitle?: string;
    /** Размер */
    size?: Size;
    /** Основная кнопка */
    approveButton?: Omit<ButtonFilledProps, 'size' | 'data-test-id'>;
    /** Кнопка отмены */
    cancelButton?: Omit<ButtonOutlineProps, 'size' | 'data-test-id'>;
    /** Дополнительная кнопка */
    additionalButton?: Omit<ButtonSimpleProps, 'size' | 'data-test-id'>;
    /** Вложенный Drawer */
    nestedDrawer?: ReactElement<DrawerProps>;
  };

/** Готовый компонент Drawer */
export function Drawer({
  title,
  titleTooltip,
  subtitle,
  image,
  content,
  approveButton,
  cancelButton,
  additionalButton,
  nestedDrawer,
  ...rest
}: DrawerProps) {
  const needFooter = Boolean(approveButton) || Boolean(cancelButton) || Boolean(additionalButton);

  return (
    <DrawerCustom {...rest} push={Boolean(nestedDrawer) && { distance: NESTED_DRAWER_PUSH_DISTANCE }}>
      <DrawerCustom.Header
        title={<TruncateString text={title} />}
        titleTooltip={titleTooltip}
        subtitle={subtitle}
        image={image}
        data-test-id={TEST_IDS.header}
      />

      <DrawerCustom.Body content={content} data-test-id={TEST_IDS.content} />

      {needFooter && (
        <DrawerCustom.Footer
          data-test-id={TEST_IDS.footer}
          actions={
            <>
              {approveButton && <ButtonFilled {...approveButton} size='m' data-test-id={TEST_IDS.approveButton} />}

              {cancelButton && <ButtonOutline {...cancelButton} size='m' data-test-id={TEST_IDS.cancelButton} />}

              {additionalButton && (
                <ButtonSimple {...additionalButton} size='m' data-test-id={TEST_IDS.additionalButton} />
              )}
            </>
          }
        />
      )}

      {nestedDrawer}
    </DrawerCustom>
  );
}

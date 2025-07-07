import 'rc-drawer/assets/index.css';

import cn from 'classnames';
import RcDrawer, { DrawerProps as RcDrawerProps } from 'rc-drawer';
import { PropsWithChildren, ReactElement } from 'react';

import { extractSupportProps, usePopstateSubscription, WithSupportProps } from '@snack-uikit/utils';

import { MODE, POSITION, SIZE, SIZE_AS_VALUES } from '../../constants';
import {
  ButtonClose,
  DrawerBody,
  DrawerBodyProps,
  DrawerFooter,
  DrawerFooterProps,
  DrawerHeader,
  DrawerHeaderProps,
} from '../../helperComponents';
import { Mode, Position, Size } from '../../types';
import { motionProps } from './constants';
import styles from './styles.module.scss';

export type DrawerCustomProps = WithSupportProps<
  PropsWithChildren<{
    /** Управление состоянием показан/не показан. */
    open: boolean;
    /** Колбэк закрытия */
    onClose(): void;
    /** Режим отображения */
    mode?: Mode;
    /** Расположение открытого Drawer */
    position?: Position;
    /** CSS-класс для элемента с контентом */
    className?: string;
    /** CSS-класс для корневого элемента */
    rootClassName?: string;
    /** Размер */
    size?: Size | string | number;
    /** Смещение при открытии "вложенного" компонента */
    push?: RcDrawerProps['push'];
    /** Контейнер в котором будет рендерится Drawer. По-умолчанию - body */
    container?: string | HTMLElement;
    /** Вложенный Drawer */
    nestedDrawer?: ReactElement<DrawerCustomProps>;
    /** Закрывать дровер при перемещении по истории браузера */
    closeOnPopstate?: boolean;
  }>
>;

export function DrawerCustom({
  open,
  mode = MODE.Regular,
  position = POSITION.Right,
  onClose,
  rootClassName,
  className,
  size = SIZE.S,
  push,
  container,
  children,
  nestedDrawer,
  closeOnPopstate,
  ...rest
}: DrawerCustomProps) {
  const isRegular = mode === MODE.Regular;
  const isPredefinedSize = typeof size === 'string' && SIZE_AS_VALUES.includes(size);

  usePopstateSubscription(() => open && onClose(), Boolean(closeOnPopstate));

  return (
    <RcDrawer
      mask={isRegular}
      maskClosable={isRegular}
      maskClassName={styles.mask}
      keyboard={isRegular}
      width={isPredefinedSize ? 'null' : size}
      open={open}
      placement={position}
      destroyOnClose={true}
      push={push}
      onClose={onClose}
      getContainer={container}
      className={cn(styles.drawer, className)}
      rootClassName={cn(styles.drawerRoot, rootClassName)}
      {...extractSupportProps(rest)}
      data-content-wrapper={true}
      data-size={isPredefinedSize ? size : undefined}
      data-mode={mode}
      {...motionProps}
    >
      <div className={styles.headerElements}>
        <ButtonClose onClick={onClose} />
      </div>

      {children}

      {nestedDrawer}
    </RcDrawer>
  );
}

export namespace DrawerCustom {
  export type HeaderProps = DrawerHeaderProps;
  export type BodyProps = DrawerBodyProps;
  export type FooterProps = DrawerFooterProps;
  export const Header = DrawerHeader;
  export const Body = DrawerBody;
  export const Footer = DrawerFooter;
}

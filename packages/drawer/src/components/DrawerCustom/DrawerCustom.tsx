import 'rc-drawer/assets/index.css';

import cn from 'classnames';
import RcDrawer, { DrawerProps as RcDrawerProps } from 'rc-drawer';
import { PropsWithChildren, ReactElement } from 'react';

import { extractSupportProps, WithSupportProps } from '@snack-ui/utils';

import { Mode, Position, Size, SIZE_AS_VALUES } from '../../constants';
import {
  ButtonClose,
  DrawerBody,
  DrawerBodyProps,
  DrawerFooter,
  DrawerFooterProps,
  DrawerHeader,
  DrawerHeaderProps,
} from '../../helperComponents';
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
  }>
>;

function DrawerCustomComponent({
  open,
  mode = Mode.Regular,
  position = Position.Right,
  onClose,
  rootClassName,
  className,
  size = Size.S,
  push,
  container,
  children,
  nestedDrawer,
  ...rest
}: DrawerCustomProps) {
  const isRegular = mode === Mode.Regular;
  const isPredefinedSize = typeof size === 'string' && SIZE_AS_VALUES.includes(size);

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
      data-content-wrapper={true}
      data-size={isPredefinedSize ? size : undefined}
      {...motionProps}
      {...extractSupportProps(rest)}
    >
      <div className={styles.headerElements}>
        <ButtonClose onClick={onClose} />
      </div>

      {children}

      {nestedDrawer}
    </RcDrawer>
  );
}

/** Компонент-конструктор */
export const DrawerCustom = DrawerCustomComponent as typeof DrawerCustomComponent & {
  modes: typeof Mode;
  positions: typeof Position;
  sizes: typeof Size;
  Header: typeof DrawerHeader;
  Body: typeof DrawerBody;
  Footer: typeof DrawerFooter;
};

DrawerCustom.modes = Mode;
DrawerCustom.positions = Position;
DrawerCustom.sizes = Size;
DrawerCustom.Header = DrawerHeader;
DrawerCustom.Body = DrawerBody;
DrawerCustom.Footer = DrawerFooter;

export namespace DrawerCustom {
  export type HeaderProps = DrawerHeaderProps;
  export type BodyProps = DrawerBodyProps;
  export type FooterProps = DrawerFooterProps;
}

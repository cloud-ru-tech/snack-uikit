import { Placement, ReferenceType, useInteractions } from '@floating-ui/react';
import cn from 'classnames';
import {
  cloneElement,
  CSSProperties,
  HTMLProps,
  isValidElement,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  TouchEvent,
} from 'react';
import { isForwardRef, isValidElementType } from 'react-is';

import { isBrowser } from '@snack-uikit/utils';

import { PopoverPrivateProps } from './components';
import { TRIGGER } from './constants';
import { Trigger } from './types';

type Params = {
  placement: Placement;
  ref: MutableRefObject<HTMLDivElement | null>;
  x?: number;
  y?: number;
};

export function getArrowPositionStyles({ placement, x, y, ref }: Params): CSSProperties {
  if (!ref.current) {
    return {};
  }

  const width = ref.current.offsetWidth;

  switch (true) {
    case placement.startsWith('top'):
      return {
        left: x,
        bottom: -width,
        transform: 'rotate(-90deg)',
      };
    case placement.startsWith('bottom'):
      return {
        left: x,
        top: -width,
        transform: 'rotate(90deg)',
      };
    case placement.startsWith('left'):
      return {
        top: y,
        right: -(width - 1),
        transform: 'rotate(180deg)',
      };
    case placement.startsWith('right'):
    default:
      return {
        top: y,
        left: -(width - 1),
      };
  }
}

export const getPopoverRootElement = () => (isBrowser() ? document.body : undefined);

export const getArrowOffset = (arrowElement?: HTMLElement | null): number => arrowElement?.offsetWidth || 0;

type GetPopoverContentProps = {
  children: PopoverPrivateProps['children'];
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
  validElementWrapperClassName: string;
  setReference: (node: ReferenceType | null) => void;
  disableSpanWrapper?: boolean;
};

export const getPopoverTriggerJSX = ({
  children,
  getReferenceProps,
  setReference,
  validElementWrapperClassName,
  disableSpanWrapper,
}: GetPopoverContentProps): ReactNode => {
  if (isValidElement(children)) {
    if (isForwardRef(children) || isValidElementType(children) || disableSpanWrapper) {
      return cloneElement(children, {
        ...getReferenceProps({
          ...(children.props as HTMLProps<HTMLElement>),
          className: cn(children.props.className, validElementWrapperClassName),
        }),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref: setReference,
      });
    }

    return (
      <span className={validElementWrapperClassName} ref={setReference} {...getReferenceProps()}>
        {children}
      </span>
    );
  }

  if (typeof children === 'function') {
    return children({ getReferenceProps, ref: setReference });
  }

  return (
    <span className={validElementWrapperClassName} ref={setReference} {...getReferenceProps()}>
      {children}
    </span>
  );
};

type TriggerProps = {
  useHoverTrigger: boolean;
  useClickTrigger: boolean;
  useFocusTrigger: boolean;
  keyboardOnly: boolean;
};

export const getTriggerProps = (trigger: Trigger): TriggerProps => {
  const defaultProps = {
    useHoverTrigger: false,
    useClickTrigger: false,
    useFocusTrigger: false,
    keyboardOnly: true,
  };

  switch (trigger) {
    case TRIGGER.Hover:
      return { ...defaultProps, useHoverTrigger: true };
    case TRIGGER.Click:
      return { ...defaultProps, useClickTrigger: true };
    case TRIGGER.FocusVisible:
      return { ...defaultProps, useFocusTrigger: true };
    case TRIGGER.Focus:
      return { ...defaultProps, useFocusTrigger: true, keyboardOnly: false };
    case TRIGGER.ClickAndFocusVisible:
      return { ...defaultProps, useFocusTrigger: true, useClickTrigger: true };
    case TRIGGER.HoverAndFocusVisible:
      return { ...defaultProps, useFocusTrigger: true, useHoverTrigger: true };
    case TRIGGER.HoverAndFocus:
      return { ...defaultProps, useFocusTrigger: true, useHoverTrigger: true, keyboardOnly: false };
    default:
      return defaultProps;
  }
};

export const stopPropagationMouse = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();
export const stopPropagationTouch = (e: TouchEvent<HTMLElement>) => e.stopPropagation();

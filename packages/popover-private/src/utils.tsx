import { Placement, ReferenceType, useInteractions } from '@floating-ui/react';
import { cloneElement, CSSProperties, HTMLProps, isValidElement, MutableRefObject, ReactNode } from 'react';
import { isForwardRef, isValidElementType } from 'react-is';

import { PopoverPrivateProps } from './components';
import { Trigger } from './constants';

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

export const getPopoverRootElement = () => document?.body;

export const getArrowOffset = (arrowElement?: HTMLElement | null): number => arrowElement?.offsetWidth || 0;

type GetPopoverContentProps = {
  children: PopoverPrivateProps['children'];
  getReferenceProps: ReturnType<typeof useInteractions>['getReferenceProps'];
  validElementWrapperClassName: string;
  setReference: (node: ReferenceType | null) => void;
};

export const getPopoverTriggerJSX = ({
  children,
  getReferenceProps,
  setReference,
  validElementWrapperClassName,
}: GetPopoverContentProps): ReactNode => {
  if (isValidElement(children)) {
    if (isForwardRef(children) || isValidElementType(children)) {
      return cloneElement(children, {
        ...getReferenceProps(children.props as HTMLProps<HTMLElement>),
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
    case Trigger.Hover:
      return { ...defaultProps, useHoverTrigger: true };
    case Trigger.Click:
      return { ...defaultProps, useClickTrigger: true };
    case Trigger.FocusVisible:
      return { ...defaultProps, useFocusTrigger: true };
    case Trigger.Focus:
      return { ...defaultProps, useFocusTrigger: true, keyboardOnly: false };
    case Trigger.ClickAndFocusVisible:
      return { ...defaultProps, useFocusTrigger: true, useClickTrigger: true };
    case Trigger.HoverAndFocusVisible:
      return { ...defaultProps, useFocusTrigger: true, useHoverTrigger: true };
    case Trigger.HoverAndFocus:
      return { ...defaultProps, useFocusTrigger: true, useHoverTrigger: true, keyboardOnly: false };
    default:
      return defaultProps;
  }
};

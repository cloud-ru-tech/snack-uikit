import { cloneElement, isValidElement, ReactNode } from 'react';

type ComponentProps = Record<string, unknown>;

export const cloneCard = (element: ReactNode, props: (componentProps: ComponentProps) => ComponentProps) => {
  if (!isValidElement(element)) {
    return element;
  }

  return cloneElement(element, props(element.props));
};

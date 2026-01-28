import { cloneElement, isValidElement, ReactNode } from 'react';

export const cloneCard = (element: ReactNode, props: Record<string, unknown>) => {
  if (!isValidElement(element)) {
    return element;
  }

  return cloneElement(element, {
    ...element.props,
    ...props,
  });
};

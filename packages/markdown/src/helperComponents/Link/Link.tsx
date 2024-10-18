import { AnchorHTMLAttributes, ClassAttributes } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react';

import { Link as UIKitLink } from '@snack-uikit/link';

type LinkProps =
  | (ClassAttributes<HTMLAnchorElement> & AnchorHTMLAttributes<HTMLAnchorElement> & ReactMarkdownProps)
  | keyof JSX.IntrinsicElements
  | undefined;

export function Link(props: LinkProps) {
  if (typeof props === 'object' && 'children' in props) {
    return <UIKitLink size={'m'} textMode={'accent'} text={props.children as string} href={props.href || ''} />;
  }

  return <div />;
}

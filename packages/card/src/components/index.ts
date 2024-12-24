import { Card as CardComponent, CardProps } from './Card';
import { Footer } from './Footer';
import { FunctionBadge, FunctionBadgeProps as FunctionBadgeComponentProps } from './FunctionBadge';
import { Header, HeaderProps as HeaderComponentProps } from './Header';
import { Image, ImageProps as ImageComponentProps } from './Image';

// eslint-disable-next-line import/export
export const Card = CardComponent as typeof CardComponent & {
  Header: typeof Header;
  Image: typeof Image;
  Footer: typeof Footer;
  FunctionBadge: typeof FunctionBadge;
};

Card.Header = Header;
Card.Footer = Footer;
Card.Image = Image;
Card.FunctionBadge = FunctionBadge;

export { type CardProps };

// eslint-disable-next-line import/export
export namespace Card {
  export type HeaderProps = HeaderComponentProps;
  export type ImageProps = ImageComponentProps;
  export type FooterActionProps = Footer.ActionProps;
  export type FooterPromoProps = Footer.PromoProps;
  export type FooterCallToActionProps = Footer.CallToActionProps;
  export type FunctionBadgeProps = FunctionBadgeComponentProps;
}

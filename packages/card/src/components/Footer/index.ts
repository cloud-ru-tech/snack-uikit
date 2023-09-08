import {
  FooterAction,
  FooterActionProps,
  FooterCallToAction,
  FooterCallToActionProps,
  FooterPromo,
  FooterPromoProps,
} from './components';

export const Footer = {
  Promo: FooterPromo,
  Action: FooterAction,
  CallToAction: FooterCallToAction,
};

export namespace Footer {
  export type PromoProps = FooterPromoProps;
  export type ActionProps = FooterActionProps;
  export type CallToActionProps = FooterCallToActionProps;
}

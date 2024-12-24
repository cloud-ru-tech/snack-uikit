import {
  FooterAction,
  FooterActionProps,
  FooterCallToAction,
  FooterCallToActionProps,
  FooterPromo,
  FooterPromoProps,
} from './components';

export namespace Footer {
  export const Promo = FooterPromo;
  export const Action = FooterAction;
  export const CallToAction = FooterCallToAction;
  export type PromoProps = FooterPromoProps;
  export type ActionProps = FooterActionProps;
  export type CallToActionProps = FooterCallToActionProps;
}

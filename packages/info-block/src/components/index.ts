import { Footer, FooterProps as FooterComponentProps } from './Footer';
import { InfoBlock as InfoBlockComponent, InfoBlockProps } from './InfoBlock';

// eslint-disable-next-line import/export
export const InfoBlock = InfoBlockComponent as typeof InfoBlockComponent & {
  Footer: typeof Footer;
};

InfoBlock.Footer = Footer;

export { type InfoBlockProps };

// eslint-disable-next-line import/export
export namespace InfoBlock {
  export type FooterProps = FooterComponentProps;
}

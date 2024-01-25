import { Footer, FooterProps as FooterComponentProps } from './Footer';
import { InfoBlock as InfoBlockComponent, InfoBlockProps } from './InfoBlock';

export const InfoBlock = InfoBlockComponent as typeof InfoBlockComponent & {
  Footer: typeof Footer;
};

InfoBlock.Footer = Footer;

export { type InfoBlockProps };

export namespace InfoBlock {
  export type FooterProps = FooterComponentProps;
}

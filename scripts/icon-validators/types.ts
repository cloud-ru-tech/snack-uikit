type XML = {
  [key: `@_${string}`]: string;
  [key: string]: string | XML;
};

export type SVGIcon = {
  svg: XML;
};

export type IconInfo = {
  path: string;
  content: string;
  xml: SVGIcon;
};

export type Validator = {
  error: string;
  validate(props: { icon: IconInfo; allIcons: IconInfo[] }): boolean;
};

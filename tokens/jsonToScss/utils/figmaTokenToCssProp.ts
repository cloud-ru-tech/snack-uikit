import { TransformedToken } from 'style-dictionary';

const TEXT_ELEMENT_TYPES = ['display', 'body', 'label', 'headline', 'title', 'text'];
const SVG_ELEMENT_TYPES = ['icon'];
const VARIANT_TYPES = ['', 'main', 'support', 'light'];

const getColorProperty = (token: TransformedToken) => {
  const possibleTextNames = VARIANT_TYPES.flatMap(variant =>
    TEXT_ELEMENT_TYPES.map(element => (variant ? element + variant : element)),
  );
  const possibleSVGNames = VARIANT_TYPES.flatMap(variant =>
    SVG_ELEMENT_TYPES.map(element => (variant ? element + variant : element)),
  );

  const element = token.path[2]?.toLowerCase();

  if (possibleTextNames.includes(element)) {
    return 'color';
  }

  if (possibleSVGNames.includes(element)) {
    return 'fill';
  }

  return 'background-color';
};

export function figmaTokenToCssProp({ token, key }: { token: TransformedToken; key: string }) {
  return (
    {
      border: 'border-color',
      sizing: 'width',
      'item-spacing': 'gap',
      'text-case': 'text-transform',
      fill: getColorProperty(token),
    }[key] ?? key
  );
}

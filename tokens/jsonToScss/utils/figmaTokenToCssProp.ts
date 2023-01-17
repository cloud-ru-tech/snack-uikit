import { TransformedToken } from 'style-dictionary';

const TEXT_ELEMENT_TYPES = ['display', 'body', 'label', 'headline', 'title', 'icon', 'text'];
const TEXT_VARIANT_TYPES = ['main', 'support', 'light'];

export function figmaTokenToCssProp({ token, key }: { token: TransformedToken; key: string }) {
  const possibleNames = ['', ...TEXT_VARIANT_TYPES].flatMap(variant =>
    TEXT_ELEMENT_TYPES.map(element => (variant ? element + '_' + variant : element)),
  );
  const fillProperty = possibleNames.includes(token.path[3]?.toLowerCase()) ? 'color' : 'background-color';

  return (
    {
      border: 'border-color',
      sizing: 'width',
      'item-spacing': 'gap',
      'text-case': 'text-transform',
      fill: fillProperty,
    }[key] ?? key
  );
}

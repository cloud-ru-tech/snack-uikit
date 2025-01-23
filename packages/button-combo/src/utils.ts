import { Item } from './types';

export function extractDroplistItemProps(props: Item): Omit<Item, 'onClick'> {
  return Object.keys(props)
    .filter(item => !item.startsWith('on'))
    .reduce(
      (nextProps, prop) => ({
        ...nextProps,
        [prop]: props[prop as unknown as keyof Item],
      }),
      {},
    );
}

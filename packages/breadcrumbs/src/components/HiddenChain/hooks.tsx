import { useMemo } from 'react';

import { ItemRenderMode } from '../../constants';
import { Item } from '../../types';
import { Crumb } from '../Crumb';

type RenderModes = [ItemRenderMode, 'label' | 'shortLabel'][];

type UseItemModesRenderProps = { firstItemIconOnly: boolean };

/**
 * Варианты отображения для обычного айтема
 */
const NORMAL_MODES: RenderModes = [
  [ItemRenderMode.ShortLabel, 'shortLabel'],
  [ItemRenderMode.Ellipsis, 'label'],
  [ItemRenderMode.Full, 'label'],
];

/**
 * Варианты отображения айтемов состоящих из одной иконки
 */
const ICON_ONLY_MODES: RenderModes = [[ItemRenderMode.Full, 'label']];

const getItemModesRenderer = (firstItemIconOnly: boolean) => (item: Item, index: number) => {
  const isIconOnlyMode = !index && firstItemIconOnly;
  const modes: RenderModes = isIconOnlyMode ? ICON_ONLY_MODES : NORMAL_MODES;

  return modes.map(([mode, labelProp]) => {
    const label = item[labelProp];

    if (!label) {
      return null;
    }

    return <Crumb useIconOnly={isIconOnlyMode} renderMode={mode} key={item.id + mode} item={item} />;
  });
};

export const useItemModesRender = ({ firstItemIconOnly }: UseItemModesRenderProps) =>
  useMemo(() => getItemModesRenderer(firstItemIconOnly), [firstItemIconOnly]);

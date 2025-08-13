import debounce from 'lodash.debounce';
import { RefObject, useEffect, useMemo, useState } from 'react';

import { BreadcrumbsConfig, CurrentConfigState } from './types';
import { getMaxPossibleWidth } from './utils';

export type BreadcrumbsLayout = {
  setConfigs: (configs: BreadcrumbsConfig[]) => void;
  currentConfig?: CurrentConfigState;
};

const selectConfig = (containerWidth: number, configs: BreadcrumbsConfig[]): CurrentConfigState | undefined => {
  if (!configs.length) {
    return;
  }

  let [bestConfig] = configs;

  for (const config of configs) {
    if (config.width <= containerWidth) {
      if (bestConfig.width > containerWidth) {
        bestConfig = config;
      } else {
        if (bestConfig.weight > config.weight) {
          bestConfig = config;
        }
      }
    } else if (config.width < bestConfig.width) {
      bestConfig = config;
    }
  }

  if (bestConfig) {
    return { chain: bestConfig.chain, containerWidth, chainWidth: bestConfig.width };
  }
};

/**
 * Расчет способа отображения breadcrumbs работает следующим образом:
 * Каждый item может быть отображен в одном из режимов:
 *    full - целиком
 *    shortLabel - с использованием укороченного лейбла
 *    ellipsis - cо скруглением текста в ...
 *    collapse - спрятан в специальный узел "..." с тултипом.
 *  Для того чтоб эффективно распределить свободное по ширине пространство между айтемами в компоненте создается скрытый контейнер (HiddenChain),
 *  в котором рендерятся все айтемы во всех возможных способах отображения. Замеряется размер каждого из айтемов и записывается в sizeMap.
 *  Далее перебираются все возможные варианты отображения всей цепочки - конфиги (buildBreadcrumbsConfigs). У такого конфига есть два атрибута:
 *    width - суммарная ширина
 *    weight - вес, отображает общее количество сокращений, примененных к цепочке (например, отображение в режиме full - 0, сокращение shortLabel - +1, а ellipsis - +100 и тд)
 *  Для того чтоб отобразить breadcrumbs, нужно подобрать конфиг, максимальный по ширине, влезающий в контейнер, но с минимальным весом (наименьшим количеством сокращений).
 */
export function useBreadcrumbsLayout(containerRef: RefObject<HTMLElement>): BreadcrumbsLayout {
  const [configs, setConfigs] = useState<BreadcrumbsConfig[]>([]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const visibleContainer = containerRef.current?.parentElement;

    if (!visibleContainer) {
      return;
    }

    setWidth(getMaxPossibleWidth(visibleContainer));

    const reselectConfig = debounce(() => {
      setWidth(getMaxPossibleWidth(visibleContainer));
    }, 100);

    const visibleContainerObserver = new ResizeObserver(reselectConfig);
    visibleContainerObserver.observe(visibleContainer);
    visibleContainerObserver.observe(document.body);

    return () => visibleContainerObserver.disconnect();
  }, [containerRef]);

  const currentConfig = useMemo(() => selectConfig(width, configs), [width, configs]);

  return { setConfigs, currentConfig };
}

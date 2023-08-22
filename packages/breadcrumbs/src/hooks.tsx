import debounce from 'lodash.debounce';
import { RefObject, useCallback, useEffect, useState } from 'react';

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
  const [currentConfig, setCurrentConfig] = useState<CurrentConfigState | undefined>(undefined);
  const [configs, setConfigs] = useState<BreadcrumbsConfig[]>([]);

  const selectConfigForWidth = useCallback((width: number) => selectConfig(width, configs), [configs]);

  /**
   * Подбор подходящего конфига триггерится изменением ширины контейнера и изменением набора конфигов
   */
  useEffect(() => {
    const visibleContainer = containerRef.current?.parentElement;

    if (!visibleContainer) {
      return;
    }

    if (configs.length) {
      setCurrentConfig(selectConfig(getMaxPossibleWidth(visibleContainer), configs));
    }
  }, [configs, containerRef]);

  useEffect(() => {
    const visibleContainer = containerRef.current?.parentElement;

    if (!visibleContainer) {
      return;
    }

    const reselectConfig = debounce(() => {
      const width = getMaxPossibleWidth(visibleContainer);
      setCurrentConfig(prevConfig => {
        if (prevConfig?.containerWidth === width) {
          return prevConfig;
        }

        const newConf = selectConfigForWidth(width);
        return newConf || (prevConfig ? { ...prevConfig, containerWidth: width } : prevConfig);
      });
    }, 100);

    const visibleContainerObserver = new ResizeObserver(reselectConfig);

    visibleContainerObserver.observe(visibleContainer);
    visibleContainerObserver.observe(window.document.body);

    return () => visibleContainerObserver.disconnect();
  }, [containerRef, selectConfigForWidth]);

  return { setConfigs, currentConfig };
}
